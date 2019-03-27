"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class VueProgram {
    static loadProgramConfig(typescript, configFile, compilerOptions) {
        const extraExtensions = ['vue'];
        const parseConfigHost = {
            fileExists: typescript.sys.fileExists,
            readFile: typescript.sys.readFile,
            useCaseSensitiveFileNames: typescript.sys.useCaseSensitiveFileNames,
            readDirectory: (rootDir, extensions, excludes, includes, depth) => {
                return typescript.sys.readDirectory(rootDir, extensions.concat(extraExtensions), excludes, includes, depth);
            }
        };
        const tsconfig = typescript.readConfigFile(configFile, typescript.sys.readFile).config;
        tsconfig.compilerOptions = tsconfig.compilerOptions || {};
        tsconfig.compilerOptions = Object.assign({}, tsconfig.compilerOptions, compilerOptions);
        const parsed = typescript.parseJsonConfigFileContent(tsconfig, parseConfigHost, path.dirname(configFile));
        parsed.options.allowNonTsExtensions = true;
        return parsed;
    }
    /**
     * Search for default wildcard or wildcard from options, we only search for that in tsconfig CompilerOptions.paths.
     * The path is resolved with thie given substitution and includes the CompilerOptions.baseUrl (if given).
     * If no paths given in tsconfig, then the default substitution is '[tsconfig directory]/src'.
     * (This is a fast, simplified inspiration of what's described here: https://github.com/Microsoft/TypeScript/issues/5039)
     */
    static resolveNonTsModuleName(moduleName, containingFile, basedir, options) {
        const baseUrl = options.baseUrl ? options.baseUrl : basedir;
        const discardedSymbols = ['.', '..', '/'];
        const wildcards = [];
        if (options.paths) {
            Object.keys(options.paths).forEach(key => {
                const pathSymbol = key[0];
                if (discardedSymbols.indexOf(pathSymbol) < 0 &&
                    wildcards.indexOf(pathSymbol) < 0) {
                    wildcards.push(pathSymbol);
                }
            });
        }
        else {
            wildcards.push('@');
        }
        const isRelative = !path.isAbsolute(moduleName);
        let correctWildcard;
        wildcards.forEach(wildcard => {
            if (moduleName.substr(0, 2) === `${wildcard}/`) {
                correctWildcard = wildcard;
            }
        });
        if (correctWildcard) {
            const pattern = options.paths
                ? options.paths[`${correctWildcard}/*`]
                : undefined;
            const substitution = pattern
                ? options.paths[`${correctWildcard}/*`][0].replace('*', '')
                : 'src';
            moduleName = path.resolve(baseUrl, substitution, moduleName.substr(2));
        }
        else if (isRelative) {
            moduleName = path.resolve(path.dirname(containingFile), moduleName);
        }
        return moduleName;
    }
    static isVue(filePath) {
        return path.extname(filePath) === '.vue';
    }
    static createProgram(typescript, programConfig, basedir, files, watcher, oldProgram) {
        const host = typescript.createCompilerHost(programConfig.options);
        const realGetSourceFile = host.getSourceFile;
        // We need a host that can parse Vue SFCs (single file components).
        host.getSourceFile = (filePath, languageVersion, onError) => {
            // first check if watcher is watching file - if not - check it's mtime
            if (!watcher.isWatchingFile(filePath)) {
                try {
                    const stats = fs.statSync(filePath);
                    files.setMtime(filePath, stats.mtime.valueOf());
                }
                catch (e) {
                    // probably file does not exists
                    files.remove(filePath);
                }
            }
            // get source file only if there is no source in files register
            if (!files.has(filePath) || !files.getData(filePath).source) {
                files.mutateData(filePath, data => {
                    data.source = realGetSourceFile(filePath, languageVersion, onError);
                });
            }
            let source = files.getData(filePath).source;
            // get typescript contents from Vue file
            if (source && VueProgram.isVue(filePath)) {
                const resolved = VueProgram.resolveScriptBlock(typescript, source.text);
                source = typescript.createSourceFile(filePath, resolved.content, languageVersion, true, resolved.scriptKind);
            }
            return source;
        };
        // We need a host with special module resolution for Vue files.
        host.resolveModuleNames = (moduleNames, containingFile) => {
            const resolvedModules = [];
            for (const moduleName of moduleNames) {
                // Try to use standard resolution.
                const { resolvedModule } = typescript.resolveModuleName(moduleName, containingFile, programConfig.options, {
                    fileExists(fileName) {
                        if (fileName.endsWith('.vue.ts')) {
                            return (host.fileExists(fileName.slice(0, -3)) ||
                                host.fileExists(fileName));
                        }
                        else {
                            return host.fileExists(fileName);
                        }
                    },
                    readFile(fileName) {
                        // This implementation is not necessary. Just for consistent behavior.
                        if (fileName.endsWith('.vue.ts') && !host.fileExists(fileName)) {
                            return host.readFile(fileName.slice(0, -3));
                        }
                        else {
                            return host.readFile(fileName);
                        }
                    }
                });
                if (resolvedModule) {
                    if (resolvedModule.resolvedFileName.endsWith('.vue.ts') &&
                        !host.fileExists(resolvedModule.resolvedFileName)) {
                        resolvedModule.resolvedFileName = resolvedModule.resolvedFileName.slice(0, -3);
                    }
                    resolvedModules.push(resolvedModule);
                }
                else {
                    // For non-ts extensions.
                    const absolutePath = VueProgram.resolveNonTsModuleName(moduleName, containingFile, basedir, programConfig.options);
                    if (VueProgram.isVue(moduleName)) {
                        resolvedModules.push({
                            resolvedFileName: absolutePath,
                            extension: '.ts'
                        });
                    }
                    else {
                        resolvedModules.push({
                            // If the file does exist, return an empty string (because we assume user has provided a ".d.ts" file for it).
                            resolvedFileName: host.fileExists(absolutePath)
                                ? ''
                                : absolutePath,
                            extension: '.ts'
                        });
                    }
                }
            }
            return resolvedModules;
        };
        return typescript.createProgram(programConfig.fileNames, programConfig.options, host, oldProgram // re-use old program
        );
    }
    static getScriptKindByLang(typescript, lang) {
        if (lang === 'ts') {
            return typescript.ScriptKind.TS;
        }
        else if (lang === 'tsx') {
            return typescript.ScriptKind.TSX;
        }
        else if (lang === 'jsx') {
            return typescript.ScriptKind.JSX;
        }
        else {
            // when lang is "js" or no lang specified
            return typescript.ScriptKind.JS;
        }
    }
    static resolveScriptBlock(typescript, content) {
        // We need to import vue-template-compiler lazily because it cannot be included it
        // as direct dependency because it is an optional dependency of fork-ts-checker-webpack-plugin.
        // Since its version must not mismatch with user-installed Vue.js,
        // we should let the users install vue-template-compiler by themselves.
        let parser;
        try {
            // tslint:disable-next-line
            parser = require('vue-template-compiler');
        }
        catch (err) {
            throw new Error('When you use `vue` option, make sure to install `vue-template-compiler`.');
        }
        const { script } = parser.parseComponent(content, {
            pad: 'space'
        });
        // No <script> block
        if (!script) {
            return {
                scriptKind: typescript.ScriptKind.JS,
                content: '/* tslint:disable */\nexport default {};\n'
            };
        }
        const scriptKind = VueProgram.getScriptKindByLang(typescript, script.lang);
        // There is src attribute
        if (script.attrs.src) {
            // import path cannot be end with '.ts[x]'
            const src = script.attrs.src.replace(/\.tsx?$/i, '');
            return {
                scriptKind,
                // For now, ignore the error when the src file is not found
                // since it will produce incorrect code location.
                // It's not a large problem since it's handled on webpack side.
                content: '/* tslint:disable */\n' +
                    '// @ts-ignore\n' +
                    `export { default } from '${src}';\n` +
                    '// @ts-ignore\n' +
                    `export * from '${src}';\n`
            };
        }
        // Pad blank lines to retain diagnostics location
        // We need to prepend `//` for each line to avoid
        // false positive of no-consecutive-blank-lines TSLint rule
        const offset = content.slice(0, script.start).split(/\r?\n/g).length;
        const paddedContent = Array(offset).join('//\n') + script.content.slice(script.start);
        return {
            scriptKind,
            content: paddedContent
        };
    }
}
exports.VueProgram = VueProgram;
//# sourceMappingURL=VueProgram.js.map