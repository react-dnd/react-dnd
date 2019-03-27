"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registry_1 = require("../actions/registry");
function refCount(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case registry_1.ADD_SOURCE:
        case registry_1.ADD_TARGET:
            return state + 1;
        case registry_1.REMOVE_SOURCE:
        case registry_1.REMOVE_TARGET:
            return state - 1;
        default:
            return state;
    }
}
exports.default = refCount;
