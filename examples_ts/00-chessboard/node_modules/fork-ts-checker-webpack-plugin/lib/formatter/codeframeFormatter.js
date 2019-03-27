"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const codeFrame = require("babel-code-frame");
const chalk_1 = require("chalk");
const fs = require("fs");
const FsHelper_1 = require("../FsHelper");
/**
 * Create new code frame formatter.
 *
 * @param options Options for babel-code-frame - see https://www.npmjs.com/package/babel-code-frame
 * @returns {codeframeFormatter}
 */
function createCodeframeFormatter(options) {
    return function codeframeFormatter(message, useColors) {
        const colors = new chalk_1.default.constructor({ enabled: useColors });
        const messageColor = message.isWarningSeverity()
            ? colors.bold.yellow
            : colors.bold.red;
        const positionColor = colors.dim;
        const file = message.file;
        const source = file && FsHelper_1.FsHelper.existsSync(file) && fs.readFileSync(file, 'utf-8');
        let frame = '';
        if (source) {
            frame = codeFrame(source, message.line, // Assertion: `codeFrame` allows passing undefined, typings are incorrect
            message.character, Object.assign({}, (options || {}), { highlightCode: useColors }))
                .split('\n')
                .map(str => '  ' + str)
                .join(os.EOL);
        }
        return (messageColor(message.severity.toUpperCase() + ' in ' + message.file) +
            os.EOL +
            positionColor(message.line + ':' + message.character) +
            ' ' +
            message.content +
            (frame ? os.EOL + frame : ''));
    };
}
exports.createCodeframeFormatter = createCodeframeFormatter;
//# sourceMappingURL=codeframeFormatter.js.map