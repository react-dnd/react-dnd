import * as ts from 'typescript';
import { RuleFailure } from 'tslint';
import { IncrementalCheckerInterface } from './IncrementalCheckerInterface';
import { CancellationToken } from './CancellationToken';
import { NormalizedMessage } from './NormalizedMessage';
export declare class ApiIncrementalChecker implements IncrementalCheckerInterface {
    private createNormalizedMessageFromDiagnostic;
    private createNormalizedMessageFromRuleFailure;
    private linterConfigFile;
    private linterAutoFix;
    private linterConfig?;
    private readonly tsIncrementalCompiler;
    private linterExclusions;
    private currentLintErrors;
    private lastUpdatedFiles;
    private lastRemovedFiles;
    constructor(typescript: typeof ts, createNormalizedMessageFromDiagnostic: (diagnostic: ts.Diagnostic) => NormalizedMessage, createNormalizedMessageFromRuleFailure: (ruleFailure: RuleFailure) => NormalizedMessage, programConfigFile: string, compilerOptions: ts.CompilerOptions, linterConfigFile: string | false, linterAutoFix: boolean, checkSyntacticErrors: boolean);
    private initLinterConfig;
    private static loadLinterConfig;
    private createLinter;
    hasLinter(): boolean;
    isFileExcluded(filePath: string): boolean;
    nextIteration(): void;
    getDiagnostics(_cancellationToken: CancellationToken): Promise<NormalizedMessage[]>;
    getLints(_cancellationToken: CancellationToken): NormalizedMessage[];
}
