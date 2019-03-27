export declare type ErrorType = 'diagnostic' | 'lint';
export declare type Severity = 'error' | 'warning';
interface NormalizedMessageJson {
    type: ErrorType;
    code: string | number;
    severity: Severity;
    content: string;
    file?: string;
    line?: number;
    character?: number;
}
export declare class NormalizedMessage {
    static readonly TYPE_DIAGNOSTIC: ErrorType;
    static readonly TYPE_LINT: ErrorType;
    static readonly SEVERITY_ERROR: Severity;
    static readonly SEVERITY_WARNING: Severity;
    readonly type: ErrorType;
    readonly code: string | number;
    readonly severity: Severity;
    readonly content: string;
    readonly file?: string;
    readonly line?: number;
    readonly character?: number;
    constructor(data: NormalizedMessageJson);
    static createFromJSON(json: NormalizedMessageJson): NormalizedMessage;
    static compare(messageA: NormalizedMessage, messageB: NormalizedMessage): number;
    static equals(messageA: NormalizedMessage, messageB: NormalizedMessage): boolean;
    static deduplicate(messages: NormalizedMessage[]): NormalizedMessage[];
    static compareTypes(typeA: ErrorType, typeB: ErrorType): number;
    static compareSeverities(severityA: Severity, severityB: Severity): number;
    static compareOptionalStrings(stringA?: string, stringB?: string): number;
    static compareNumbers(numberA?: number, numberB?: number): number;
    toJSON(): NormalizedMessageJson;
    isDiagnosticType(): boolean;
    isLintType(): boolean;
    getFormattedCode(): string | number;
    isErrorSeverity(): boolean;
    isWarningSeverity(): boolean;
}
export {};
