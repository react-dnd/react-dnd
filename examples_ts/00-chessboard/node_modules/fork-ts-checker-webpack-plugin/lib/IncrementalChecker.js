"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const FilesRegister_1 = require("./FilesRegister");
const FilesWatcher_1 = require("./FilesWatcher");
const WorkSet_1 = require("./WorkSet");
const NormalizedMessage_1 = require("./NormalizedMessage");
const minimatch = require("minimatch");
const VueProgram_1 = require("./VueProgram");
const FsHelper_1 = require("./FsHelper");
class IncrementalChecker {
    constructor(typescript, createNormalizedMessageFromDiagnostic, createNormalizedMessageFromRuleFailure, programConfigFile, compilerOptions, linterConfigFile, linterAutoFix, watchPaths, workNumber = 0, workDivision = 1, checkSyntacticErrors = false, vue = false) {
        this.typescript = typescript;
        this.createNormalizedMessageFromDiagnostic = createNormalizedMessageFromDiagnostic;
        this.createNormalizedMessageFromRuleFailure = createNormalizedMessageFromRuleFailure;
        this.programConfigFile = programConfigFile;
        this.compilerOptions = compilerOptions;
        this.linterConfigFile = linterConfigFile;
        this.linterAutoFix = linterAutoFix;
        this.watchPaths = watchPaths;
        this.workNumber = workNumber;
        this.workDivision = workDivision;
        this.checkSyntacticErrors = checkSyntacticErrors;
        this.vue = vue;
        // it's shared between compilations
        this.files = new FilesRegister_1.FilesRegister(() => ({
            // data shape
            source: undefined,
            linted: false,
            lints: []
        }));
        // Use empty array of exclusions in general to avoid having
        // to check of its existence later on.
        this.linterExclusions = [];
    }
    static loadProgramConfig(typescript, configFile, compilerOptions) {
        const tsconfig = typescript.readConfigFile(configFile, typescript.sys.readFile).config;
        tsconfig.compilerOptions = tsconfig.compilerOptions || {};
        tsconfig.compilerOptions = Object.assign({}, tsconfig.compilerOptions, compilerOptions);
        const parsed = typescript.parseJsonConfigFileContent(tsconfig, typescript.sys, path.dirname(configFile));
        return parsed;
    }
    static loadLinterConfig(configFile) {
        // tslint:disable-next-line:no-implicit-dependencies
        const tslint = require('tslint');
        return tslint.Configuration.loadConfigurationFromPath(configFile);
    }
    static createProgram(typescript, programConfig, files, watcher, oldProgram) {
        const host = typescript.createCompilerHost(programConfig.options);
        const realGetSourceFile = host.getSourceFile;
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
            return files.getData(filePath).source;
        };
        return typescript.createProgram(programConfig.fileNames, programConfig.options, host, oldProgram // re-use old program
        );
    }
    createLinter(program) {
        // tslint:disable-next-line:no-implicit-dependencies
        const tslint = require('tslint');
        return new tslint.Linter({ fix: this.linterAutoFix }, program);
    }
    hasLinter() {
        return !!this.linter;
    }
    static isFileExcluded(filePath, linterExclusions) {
        return (filePath.endsWith('.d.ts') ||
            linterExclusions.some(matcher => matcher.match(filePath)));
    }
    nextIteration() {
        if (!this.watcher) {
            const watchExtensions = this.vue
                ? ['.ts', '.tsx', '.vue']
                : ['.ts', '.tsx'];
            this.watcher = new FilesWatcher_1.FilesWatcher(this.watchPaths, watchExtensions);
            // connect watcher with register
            this.watcher.on('change', (filePath, stats) => {
                this.files.setMtime(filePath, stats.mtime.valueOf());
            });
            this.watcher.on('unlink', (filePath) => {
                this.files.remove(filePath);
            });
            this.watcher.watch();
        }
        if (!this.linterConfig && this.linterConfigFile) {
            this.linterConfig = IncrementalChecker.loadLinterConfig(this.linterConfigFile);
            if (this.linterConfig.linterOptions &&
                this.linterConfig.linterOptions.exclude) {
                // Pre-build minimatch patterns to avoid additional overhead later on.
                // Note: Resolving the path is required to properly match against the full file paths,
                // and also deals with potential cross-platform problems regarding path separators.
                this.linterExclusions = this.linterConfig.linterOptions.exclude.map(pattern => new minimatch.Minimatch(path.resolve(pattern)));
            }
        }
        this.program = this.vue ? this.loadVueProgram() : this.loadDefaultProgram();
        if (this.linterConfig) {
            this.linter = this.createLinter(this.program);
        }
    }
    loadVueProgram() {
        this.programConfig =
            this.programConfig ||
                VueProgram_1.VueProgram.loadProgramConfig(this.typescript, this.programConfigFile, this.compilerOptions);
        return VueProgram_1.VueProgram.createProgram(this.typescript, this.programConfig, path.dirname(this.programConfigFile), this.files, this.watcher, this.program);
    }
    loadDefaultProgram() {
        this.programConfig =
            this.programConfig ||
                IncrementalChecker.loadProgramConfig(this.typescript, this.programConfigFile, this.compilerOptions);
        return IncrementalChecker.createProgram(this.typescript, this.programConfig, this.files, this.watcher, this.program);
    }
    getDiagnostics(cancellationToken) {
        const { program } = this;
        if (!program) {
            throw new Error('Invoked called before program initialized');
        }
        const diagnostics = [];
        // select files to check (it's semantic check - we have to include all files :/)
        const filesToCheck = program.getSourceFiles();
        // calculate subset of work to do
        const workSet = new WorkSet_1.WorkSet(filesToCheck, this.workNumber, this.workDivision);
        // check given work set
        workSet.forEach(sourceFile => {
            if (cancellationToken) {
                cancellationToken.throwIfCancellationRequested();
            }
            const diagnosticsToRegister = this
                .checkSyntacticErrors
                ? program
                    .getSemanticDiagnostics(sourceFile, cancellationToken)
                    .concat(program.getSyntacticDiagnostics(sourceFile, cancellationToken))
                : program.getSemanticDiagnostics(sourceFile, cancellationToken);
            diagnostics.push(...diagnosticsToRegister);
        });
        // normalize and deduplicate diagnostics
        return Promise.resolve(NormalizedMessage_1.NormalizedMessage.deduplicate(diagnostics.map(this.createNormalizedMessageFromDiagnostic)));
    }
    getLints(cancellationToken) {
        const { linter } = this;
        if (!linter) {
            throw new Error('Cannot get lints - checker has no linter.');
        }
        // select files to lint
        const filesToLint = this.files
            .keys()
            .filter(filePath => !this.files.getData(filePath).linted &&
            !IncrementalChecker.isFileExcluded(filePath, this.linterExclusions));
        // calculate subset of work to do
        const workSet = new WorkSet_1.WorkSet(filesToLint, this.workNumber, this.workDivision);
        // lint given work set
        workSet.forEach(fileName => {
            cancellationToken.throwIfCancellationRequested();
            try {
                // Assertion: `.lint` second parameter can be undefined
                linter.lint(fileName, undefined, this.linterConfig);
            }
            catch (e) {
                if (FsHelper_1.FsHelper.existsSync(fileName) &&
                    // check the error type due to file system lag
                    !(e instanceof Error) &&
                    !(e.constructor.name === 'FatalError') &&
                    !(e.message && e.message.trim().startsWith('Invalid source file'))) {
                    // it's not because file doesn't exist - throw error
                    throw e;
                }
            }
        });
        // set lints in files register
        linter.getResult().failures.forEach(lint => {
            const filePath = lint.getFileName();
            this.files.mutateData(filePath, data => {
                data.linted = true;
                data.lints.push(lint);
            });
        });
        // set all files as linted
        this.files.keys().forEach(filePath => {
            this.files.mutateData(filePath, data => {
                data.linted = true;
            });
        });
        // get all lints
        const lints = this.files
            .keys()
            .reduce((innerLints, filePath) => innerLints.concat(this.files.getData(filePath).lints), []);
        // normalize and deduplicate lints
        return NormalizedMessage_1.NormalizedMessage.deduplicate(lints.map(this.createNormalizedMessageFromRuleFailure));
    }
}
exports.IncrementalChecker = IncrementalChecker;
//# sourceMappingURL=IncrementalChecker.js.map