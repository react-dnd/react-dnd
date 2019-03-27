"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const os = require("os");
/**
 * Creates new default formatter.
 *
 * @returns {defaultFormatter}
 */
function createDefaultFormatter() {
    return function defaultFormatter(message, useColors) {
        const colors = new chalk_1.default.constructor({ enabled: useColors });
        const messageColor = message.isWarningSeverity()
            ? colors.bold.yellow
            : colors.bold.red;
        const fileAndNumberColor = colors.bold.cyan;
        const codeColor = colors.grey;
        return [
            messageColor(`${message.severity.toUpperCase()} in `) +
                fileAndNumberColor(`${message.file}(${message.line},${message.character})`) +
                messageColor(':'),
            codeColor(message.getFormattedCode() + ': ') + message.content
        ].join(os.EOL);
    };
}
exports.createDefaultFormatter = createDefaultFormatter;
//# sourceMappingURL=defaultFormatter.js.map