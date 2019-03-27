"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
    var result = typesToTry.reduce(function (resultSoFar, typeToTry) { return resultSoFar || dataTransfer.getData(typeToTry); }, '');
    return result != null ? result : defaultValue;
}
exports.getDataFromDataTransfer = getDataFromDataTransfer;
