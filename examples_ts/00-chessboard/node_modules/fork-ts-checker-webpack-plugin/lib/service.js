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
const process = require("process");
const IncrementalChecker_1 = require("./IncrementalChecker");
const CancellationToken_1 = require("./CancellationToken");
const ApiIncrementalChecker_1 = require("./ApiIncrementalChecker");
const NormalizedMessageFactories_1 = require("./NormalizedMessageFactories");
const typescript = require(process.env.TYPESCRIPT_PATH);
// message factories
exports.createNormalizedMessageFromDiagnostic = NormalizedMessageFactories_1.makeCreateNormalizedMessageFromDiagnostic(typescript);
exports.createNormalizedMessageFromRuleFailure = NormalizedMessageFactories_1.makeCreateNormalizedMessageFromRuleFailure();
const checker = process.env.USE_INCREMENTAL_API === 'true'
    ? new ApiIncrementalChecker_1.ApiIncrementalChecker(typescript, exports.createNormalizedMessageFromDiagnostic, exports.createNormalizedMessageFromRuleFailure, process.env.TSCONFIG, JSON.parse(process.env.COMPILER_OPTIONS), process.env.TSLINT === '' ? false : process.env.TSLINT, process.env.TSLINTAUTOFIX === 'true', process.env.CHECK_SYNTACTIC_ERRORS === 'true')
    : new IncrementalChecker_1.IncrementalChecker(typescript, exports.createNormalizedMessageFromDiagnostic, exports.createNormalizedMessageFromRuleFailure, process.env.TSCONFIG, JSON.parse(process.env.COMPILER_OPTIONS), process.env.TSLINT === '' ? false : process.env.TSLINT, process.env.TSLINTAUTOFIX === 'true', process.env.WATCH === '' ? [] : process.env.WATCH.split('|'), parseInt(process.env.WORK_NUMBER, 10) || 0, parseInt(process.env.WORK_DIVISION, 10) || 1, process.env.CHECK_SYNTACTIC_ERRORS === 'true', process.env.VUE === 'true');
function run(cancellationToken) {
    return __awaiter(this, void 0, void 0, function* () {
        let diagnostics = [];
        let lints = [];
        checker.nextIteration();
        try {
            diagnostics = yield checker.getDiagnostics(cancellationToken);
            if (checker.hasLinter()) {
                lints = checker.getLints(cancellationToken);
            }
        }
        catch (error) {
            if (error instanceof typescript.OperationCanceledException) {
                return;
            }
            throw error;
        }
        if (!cancellationToken.isCancellationRequested()) {
            try {
                process.send({
                    diagnostics,
                    lints
                });
            }
            catch (e) {
                // channel closed...
                process.exit();
            }
        }
    });
}
process.on('message', message => {
    run(CancellationToken_1.CancellationToken.createFromJSON(typescript, message));
});
process.on('SIGINT', () => {
    process.exit();
});
//# sourceMappingURL=service.js.map