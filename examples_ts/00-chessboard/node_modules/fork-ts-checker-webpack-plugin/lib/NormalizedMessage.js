"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NormalizedMessage {
    constructor(data) {
        this.type = data.type;
        this.code = data.code;
        this.severity = data.severity;
        this.content = data.content;
        this.file = data.file;
        this.line = data.line;
        this.character = data.character;
    }
    static createFromJSON(json) {
        return new NormalizedMessage(json);
    }
    static compare(messageA, messageB) {
        if (!(messageA instanceof NormalizedMessage)) {
            return -1;
        }
        if (!(messageB instanceof NormalizedMessage)) {
            return 1;
        }
        return (NormalizedMessage.compareTypes(messageA.type, messageB.type) ||
            NormalizedMessage.compareOptionalStrings(messageA.file, messageB.file) ||
            NormalizedMessage.compareSeverities(messageA.severity, messageB.severity) ||
            NormalizedMessage.compareNumbers(messageA.line, messageB.line) ||
            NormalizedMessage.compareNumbers(messageA.character, messageB.character) ||
            // code can be string (lint failure) or number (typescript error) - should the following line cater for this in some way?
            NormalizedMessage.compareOptionalStrings(messageA.code, messageB.code) ||
            NormalizedMessage.compareOptionalStrings(messageA.content, messageB.content) ||
            0 /* EqualTo */);
    }
    static equals(messageA, messageB) {
        return this.compare(messageA, messageB) === 0;
    }
    static deduplicate(messages) {
        return messages.sort(NormalizedMessage.compare).filter((message, index) => {
            return (index === 0 || !NormalizedMessage.equals(message, messages[index - 1]));
        });
    }
    static compareTypes(typeA, typeB) {
        const priorities = [typeA, typeB].map(type => {
            return [
                NormalizedMessage.TYPE_LINT /* 0 */,
                NormalizedMessage.TYPE_DIAGNOSTIC /* 1 */
            ].indexOf(type);
        });
        return priorities[0] - priorities[1];
    }
    static compareSeverities(severityA, severityB) {
        const priorities = [severityA, severityB].map(type => {
            return [
                NormalizedMessage.SEVERITY_WARNING /* 0 */,
                NormalizedMessage.SEVERITY_ERROR /* 1 */
            ].indexOf(type);
        });
        return priorities[0] - priorities[1];
    }
    static compareOptionalStrings(stringA, stringB) {
        if (stringA === stringB) {
            return 0;
        }
        if (stringA === undefined || stringA === null) {
            return -1;
        }
        if (stringB === undefined || stringB === null) {
            return 1;
        }
        return stringA.toString().localeCompare(stringB.toString());
    }
    static compareNumbers(numberA, numberB) {
        if (numberA === numberB) {
            return 0;
        }
        if (numberA === undefined || numberA === null) {
            return -1;
        }
        if (numberB === undefined || numberB === null) {
            return 1;
        }
        return numberA - numberB;
    }
    toJSON() {
        return {
            type: this.type,
            code: this.code,
            severity: this.severity,
            content: this.content,
            file: this.file,
            line: this.line,
            character: this.character
        };
    }
    isDiagnosticType() {
        return NormalizedMessage.TYPE_DIAGNOSTIC === this.type;
    }
    isLintType() {
        return NormalizedMessage.TYPE_LINT === this.type;
    }
    getFormattedCode() {
        return this.isDiagnosticType() ? 'TS' + this.code : this.code;
    }
    isErrorSeverity() {
        return this.severity === NormalizedMessage.SEVERITY_ERROR;
    }
    isWarningSeverity() {
        return this.severity === NormalizedMessage.SEVERITY_WARNING;
    }
}
NormalizedMessage.TYPE_DIAGNOSTIC = 'diagnostic';
NormalizedMessage.TYPE_LINT = 'lint';
// severity types
NormalizedMessage.SEVERITY_ERROR = 'error';
NormalizedMessage.SEVERITY_WARNING = 'warning';
exports.NormalizedMessage = NormalizedMessage;
//# sourceMappingURL=NormalizedMessage.js.map