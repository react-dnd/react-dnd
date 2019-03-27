"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
function setClientOffset(clientOffset, sourceClientOffset) {
    return {
        type: types_1.INIT_COORDS,
        payload: {
            sourceClientOffset: sourceClientOffset || null,
            clientOffset: clientOffset || null,
        },
    };
}
exports.setClientOffset = setClientOffset;
