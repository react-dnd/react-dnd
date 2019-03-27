"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorkResult {
    constructor(workDomain) {
        this.workDomain = workDomain;
        this.workResult = {};
    }
    supports(workName) {
        return this.workDomain.includes(workName);
    }
    set(workName, result) {
        if (!this.supports(workName)) {
            throw new Error('Cannot set result - work "' + workName + '" is not supported.');
        }
        this.workResult[workName] = result;
    }
    has(workName) {
        return this.supports(workName) && undefined !== this.workResult[workName];
    }
    get(workName) {
        if (!this.supports(workName)) {
            throw new Error('Cannot get result - work "' + workName + '" is not supported.');
        }
        return this.workResult[workName];
    }
    hasAll() {
        return this.workDomain.every(key => this.has(key));
    }
    clear() {
        this.workResult = {};
    }
    reduce(reducer, initial) {
        return this.workDomain.reduce((reduced, workName) => {
            return reducer(reduced, this.workResult[workName]);
        }, initial);
    }
}
exports.WorkResult = WorkResult;
//# sourceMappingURL=WorkResult.js.map