import * as webpack from 'webpack';
import { NormalizedMessage } from './NormalizedMessage';
type Formatter = (message: NormalizedMessage, useColors: boolean) => string;
interface Logger {
    error(message?: any): void;
    warn(message?: any): void;
    info(message?: any): void;
}
interface Options {
    typescript: string;
    tsconfig: string;
    compilerOptions: object;
    tslint: string | true;
    tslintAutoFix: boolean;
    watch: string | string[];
    async: boolean;
    ignoreDiagnostics: number[];
    ignoreLints: string[];
    reportFiles: string[];
    colors: boolean;
    logger: Logger;
    formatter: 'default' | 'codeframe' | Formatter;
    formatterOptions: any;
    silent: boolean;
    checkSyntacticErrors: boolean;
    memoryLimit: number;
    workers: number;
    vue: boolean;
    useTypescriptIncrementalApi: boolean;
    measureCompilationTime: boolean;
}
/**
 * ForkTsCheckerWebpackPlugin
 * Runs typescript type checker and linter (tslint) on separate process.
 * This speed-ups build a lot.
 *
 * Options description in README.md
 */
declare class ForkTsCheckerWebpackPlugin {
    static readonly DEFAULT_MEMORY_LIMIT = 2048;
    static readonly ONE_CPU = 1;
    static readonly ALL_CPUS: number;
    static readonly ONE_CPU_FREE: number;
    static readonly TWO_CPUS_FREE: number;
    static getCompilerHooks(compiler: webpack.Compiler): Record<"serviceBeforeStart" | "cancel" | "serviceStartError" | "waiting" | "serviceStart" | "receive" | "serviceOutOfMemory" | "emit" | "done", import("tapable").SyncHook<any, any, any> | import("tapable").AsyncSeriesHook<any, any, any>>;
    readonly options: Partial<Options>;
    private tsconfig;
    private compilerOptions;
    private tslint?;
    private tslintAutoFix;
    private watch;
    private ignoreDiagnostics;
    private ignoreLints;
    private reportFiles;
    private logger;
    private silent;
    private async;
    private checkSyntacticErrors;
    private workersNumber;
    private memoryLimit;
    private useColors;
    private colors;
    private formatter;
    private useTypescriptIncrementalApi;
    private tsconfigPath?;
    private tslintPath?;
    private watchPaths;
    private compiler;
    private started?;
    private elapsed?;
    private cancellationToken?;
    private isWatching;
    private checkDone;
    private compilationDone;
    private diagnostics;
    private lints;
    private emitCallback;
    private doneCallback;
    private typescriptPath;
    private typescript;
    private typescriptVersion;
    private tslintVersion;
    private service?;
    private vue;
    private measureTime;
    private performance;
    private startAt;
    constructor(options?: Partial<Options>);
    private validateVersions;
    private static createFormatter;
    apply(compiler: webpack.Compiler): void;
    private computeContextPath;
    private pluginStart;
    private pluginStop;
    private pluginCompile;
    private pluginEmit;
    private pluginDone;
    private spawnService;
    private killService;
    private handleServiceMessage;
    private handleServiceExit;
    private createEmitCallback;
    private createNoopEmitCallback;
    private createDoneCallback;
}
export = ForkTsCheckerWebpackPlugin;
declare namespace ForkTsCheckerWebpackPlugin { }
