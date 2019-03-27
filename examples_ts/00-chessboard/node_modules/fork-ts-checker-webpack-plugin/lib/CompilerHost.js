"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LinkedList_1 = require("./LinkedList");
const VueProgram_1 = require("./VueProgram");
class CompilerHost {
    constructor(typescript, programConfigFile, compilerOptions, checkSyntacticErrors) {
        this.typescript = typescript;
        // intercept all watch events and collect them until we get notification to start compilation
        this.directoryWatchers = new LinkedList_1.LinkedList();
        this.fileWatchers = new LinkedList_1.LinkedList();
        this.knownFiles = new Set();
        this.gatheredDiagnostic = [];
        this.afterCompile = () => {
            /* do nothing */
        };
        this.compilationStarted = false;
        this.createProgram = this.typescript
            .createEmitAndSemanticDiagnosticsBuilderProgram;
        this.tsHost = typescript.createWatchCompilerHost(programConfigFile, compilerOptions, typescript.sys, typescript.createEmitAndSemanticDiagnosticsBuilderProgram, (diag) => {
            if (!checkSyntacticErrors && diag.code >= 1000 && diag.code < 2000) {
                return;
            }
            this.gatheredDiagnostic.push(diag);
        }, () => {
            // do nothing
        });
        this.configFileName = this.tsHost.configFileName;
        this.optionsToExtend = this.tsHost.optionsToExtend || {};
    }
    getProgram() {
        return this.program.getProgram().getProgram();
    }
    getAllKnownFiles() {
        return this.knownFiles;
    }
    processChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lastProcessing) {
                const initialCompile = new Promise(resolve => {
                    this.afterCompile = () => {
                        resolve(this.gatheredDiagnostic);
                        this.afterCompile = () => {
                            /* do nothing */
                        };
                        this.compilationStarted = false;
                    };
                });
                this.lastProcessing = initialCompile;
                this.program = this.typescript.createWatchProgram(this);
                const errors = yield initialCompile;
                return {
                    results: errors,
                    updatedFiles: Array.from(this.knownFiles),
                    removedFiles: []
                };
            }
            // since we do not have a way to pass cancellation token to typescript,
            // we just wait until previous compilation finishes.
            yield this.lastProcessing;
            const previousDiagnostic = this.gatheredDiagnostic;
            this.gatheredDiagnostic = [];
            const resultPromise = new Promise(resolve => {
                this.afterCompile = () => {
                    resolve(this.gatheredDiagnostic);
                    this.afterCompile = () => {
                        /* do nothing */
                    };
                    this.compilationStarted = false;
                };
            });
            this.lastProcessing = resultPromise;
            const files = [];
            this.directoryWatchers.forEach(item => {
                for (const e of item.events) {
                    item.callback(e.fileName);
                }
                item.events.length = 0;
            });
            const updatedFiles = [];
            const removedFiles = [];
            this.fileWatchers.forEach(item => {
                for (const e of item.events) {
                    item.callback(e.fileName, e.eventKind);
                    files.push(e.fileName);
                    if (e.eventKind === this.typescript.FileWatcherEventKind.Created ||
                        e.eventKind === this.typescript.FileWatcherEventKind.Changed) {
                        updatedFiles.push(e.fileName);
                    }
                    else if (e.eventKind === this.typescript.FileWatcherEventKind.Deleted) {
                        removedFiles.push(e.fileName);
                    }
                }
                item.events.length = 0;
            });
            // if the files are not relevant to typescript it may choose not to compile
            // in this case we need to trigger promise resolution from here
            if (!this.compilationStarted) {
                // keep diagnostic from previous run
                this.gatheredDiagnostic = previousDiagnostic;
                this.afterCompile();
                return {
                    results: this.gatheredDiagnostic,
                    updatedFiles: [],
                    removedFiles: []
                };
            }
            const results = yield resultPromise;
            return { results, updatedFiles, removedFiles };
        });
    }
    setTimeout(callback, _ms, ...args) {
        // There are 2 things we are hacking here:
        // 1. This method only called from watch program to wait until all files
        // are written to filesystem (for example, when doing 'save all')
        // We are intercepting all change notifications, and letting
        // them through only when webpack starts processing changes.
        // Therefore, at this point normally files are already all saved,
        // so we do not need to waste another 250ms (hardcoded in TypeScript).
        // On the other hand there may be occasional glitch, when our incremental
        // compiler will receive the notification too late, and process it when
        // next compilation would start.
        // 2. It seems to be only reliable way to intercept a moment when TypeScript
        // actually starts compilation.
        //
        // Ideally we probably should not let TypeScript call all those watching
        // methods by itself, and instead forward changes from webpack.
        // Unfortunately, at the moment TypeScript incremental API is quite
        // immature (for example, minor changes in how you use it cause
        // dramatic compilation time increase), so we have to stick with these
        // hacks for now.
        this.compilationStarted = true;
        return this.typescript.sys.setTimeout(callback, 1, args);
    }
    clearTimeout(timeoutId) {
        this.typescript.sys.clearTimeout(timeoutId);
    }
    onWatchStatusChange(_diagnostic, _newLine, _options) {
        // do nothing
    }
    watchDirectory(path, callback, recursive) {
        const slot = { callback, events: [] };
        const node = this.directoryWatchers.add(slot);
        this.tsHost.watchDirectory(path, fileName => {
            slot.events.push({ fileName });
        }, recursive);
        return {
            close: () => {
                node.detachSelf();
            }
        };
    }
    watchFile(path, callback, _pollingInterval) {
        const slot = { callback, events: [] };
        const node = this.fileWatchers.add(slot);
        this.knownFiles.add(path);
        this.tsHost.watchFile(path, (fileName, eventKind) => {
            if (eventKind === this.typescript.FileWatcherEventKind.Created) {
                this.knownFiles.add(fileName);
            }
            else if (eventKind === this.typescript.FileWatcherEventKind.Deleted) {
                this.knownFiles.delete(fileName);
            }
            slot.events.push({ fileName, eventKind });
        }, _pollingInterval);
        return {
            close: () => {
                node.detachSelf();
            }
        };
    }
    fileExists(path) {
        return this.tsHost.fileExists(path);
    }
    readFile(path, encoding) {
        const content = this.tsHost.readFile(path, encoding);
        // get typescript contents from Vue file
        if (content && VueProgram_1.VueProgram.isVue(path)) {
            const resolved = VueProgram_1.VueProgram.resolveScriptBlock(this.typescript, content);
            return resolved.content;
        }
        return content;
    }
    directoryExists(path) {
        return ((this.tsHost.directoryExists && this.tsHost.directoryExists(path)) ||
            false);
    }
    getDirectories(path) {
        return ((this.tsHost.getDirectories && this.tsHost.getDirectories(path)) || []);
    }
    readDirectory(path, extensions, exclude, include, depth) {
        return this.typescript.sys.readDirectory(path, extensions, exclude, include, depth);
    }
    getCurrentDirectory() {
        return this.tsHost.getCurrentDirectory();
    }
    getDefaultLibFileName(options) {
        return this.tsHost.getDefaultLibFileName(options);
    }
    getEnvironmentVariable(name) {
        return (this.tsHost.getEnvironmentVariable &&
            this.tsHost.getEnvironmentVariable(name));
    }
    getNewLine() {
        return this.tsHost.getNewLine();
    }
    realpath(path) {
        return this.tsHost.realpath(path);
    }
    trace(s) {
        if (this.tsHost.trace) {
            this.tsHost.trace(s);
        }
    }
    useCaseSensitiveFileNames() {
        return this.tsHost.useCaseSensitiveFileNames();
    }
    onUnRecoverableConfigFileDiagnostic(_diag) {
        // do nothing
    }
    afterProgramCreate(program) {
        // all actual diagnostics happens here
        this.tsHost.afterProgramCreate(program);
        this.afterCompile();
    }
    // the functions below are use internally by typescript. we cannot use non-emitting version of incremental watching API
    // because it is
    // - much slower for some reason,
    // - writes files anyway (o_O)
    // - has different way of providing diagnostics. (with this version we can at least reliably get it from afterProgramCreate)
    createDirectory(_path) {
        // pretend everything was ok
    }
    writeFile(_path, _data, _writeByteOrderMark) {
        // pretend everything was ok
    }
    onCachedDirectoryStructureHostCreate(_host) {
        // pretend everything was ok
    }
}
exports.CompilerHost = CompilerHost;
//# sourceMappingURL=CompilerHost.js.map