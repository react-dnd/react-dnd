"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerTarget(type, target, manager) {
    var registry = manager.getRegistry();
    var targetId = registry.addTarget(type, target);
    return [targetId, function () { return registry.removeTarget(targetId); }];
}
exports.default = registerTarget;
