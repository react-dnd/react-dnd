"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerSource(type, source, manager) {
    var registry = manager.getRegistry();
    var sourceId = registry.addSource(type, source);
    return [sourceId, function () { return registry.removeSource(sourceId); }];
}
exports.default = registerSource;
