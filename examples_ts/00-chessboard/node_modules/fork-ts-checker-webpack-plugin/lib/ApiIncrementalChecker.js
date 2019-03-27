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
const minimatch = require("minimatch");
const path = require("path");
const NormalizedMessage_1 = require("./NormalizedMessage");
const CompilerHost_1 = require("./CompilerHost");
const FsHelper_1 = require("./FsHelper");
class ApiIncrementalChecker {
    constructor(typescript, createNormalizedMessageFromDiagnostic, createNormalizedMessageFromRuleFailure, programConfigFile, compilerOptions, linterConfigFile, linterAutoFix, checkSyntacticErrors) {
        this.createNormalizedMessageFromDiagnostic = createNormalizedMessageFromDiagnostic;
        this.createNormalizedMessageFromRuleFailure = createNormalizedMessageFromRuleFailure;
        this.linterConfigFile = linterConfigFile;
        this.linterAutoFix = linterAutoFix;
        this.linterExclusions = [];
        this.currentLintErrors = new Map();
        this.lastUpdatedFiles = [];
        this.lastRemovedFiles = [];
        this.initLinterConfig();
        this.tsIncrementalCompiler = new CompilerHost_1.CompilerHost(typescript, programConfigFile, compilerOptions, checkSyntacticErrors);
    }
    initLinterConfig() {
        if (!this.linterConfig && this.linterConfigFile) {
            this.linterConfig = ApiIncrementalChecker.loadLinterConfig(this.linterConfigFile);
            if (this.linterConfig.linterOptions &&
                this.linterConfig.linterOptions.exclude) {
                // Pre-build minimatch patterns to avoid additional overhead later on.
                // Note: Resolving the path is required to properly match against the full file paths,
                // and also deals with potential cross-platform problems regarding path separators.
                this.linterExclusions = this.linterConfig.linterOptions.exclude.map(pattern => new minimatch.Minimatch(path.resolve(pattern)));
            }
        }
    }
    static loadLinterConfig(configFile) {
        // tslint:disable-next-line:no-implicit-dependencies
        const tslint = require('tslint');
        return tslint.Configuration.loadConfigurationFromPath(configFile);
    }
    createLinter(program) {
        // tslint:disable-next-line:no-implicit-dependencies
        const tslint = require('tslint');
        return new tslint.Linter({ fix: this.linterAutoFix }, program);
    }
    hasLinter() {
        return !!this.linterConfig;
    }
    isFileExcluded(filePath) {
        return (filePath.endsWith('.d.ts') ||
            this.linterExclusions.some(matcher => matcher.match(filePath)));
    }
    nextIteration() {
        // do nothing
    }
    getDiagnostics(_cancellationToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const diagnostics = yield this.tsIncrementalCompiler.processChanges();
            this.lastUpdatedFiles = diagnostics.updatedFiles;
            this.lastRemovedFiles = diagnostics.removedFiles;
            return NormalizedMessage_1.NormalizedMessage.deduplicate(diagnostics.results.map(this.createNormalizedMessageFromDiagnostic));
        });
    }
    getLints(_cancellationToken) {
        if (!this.linterConfig) {
            return [];
        }
        for (const updatedFile of this.lastUpdatedFiles) {
            if (this.isFileExcluded(updatedFile)) {
                continue;
            }
            try {
                const linter = this.createLinter(this.tsIncrementalCompiler.getProgram());
                // const source = fs.readFileSync(updatedFile, 'utf-8');
                linter.lint(updatedFile, undefined, this.linterConfig);
                const lints = linter.getResult();
                this.currentLintErrors.set(updatedFile, lints);
            }
            catch (e) {
                if (FsHelper_1.FsHelper.existsSync(updatedFile) &&
                    // check the error type due to file system lag
                    !(e instanceof Error) &&
                    !(e.constructor.name === 'FatalError') &&
                    !(e.message && e.message.trim().startsWith('Invalid source file'))) {
                    // it's not because file doesn't exist - throw error
                    throw e;
                }
            }
            for (const removedFile of this.lastRemovedFiles) {
                this.currentLintErrors.delete(removedFile);
            }
        }
        const allLints = [];
        for (const [, value] of this.currentLintErrors) {
            allLints.push(...value.failures);
        }
        return NormalizedMessage_1.NormalizedMessage.deduplicate(allLints.map(this.createNormalizedMessageFromRuleFailure));
    }
}
exports.ApiIncrementalChecker = ApiIncrementalChecker;
//# sourceMappingURL=ApiIncrementalChecker.js.map