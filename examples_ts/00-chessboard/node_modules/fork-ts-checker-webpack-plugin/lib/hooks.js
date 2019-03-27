"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapable_1 = require("tapable");
const compilerHookMap = new WeakMap();
exports.legacyHookMap = {
    serviceBeforeStart: 'fork-ts-checker-service-before-start',
    cancel: 'fork-ts-checker-cancel',
    serviceStartError: 'fork-ts-checker-service-start-error',
    waiting: 'fork-ts-checker-waiting',
    serviceStart: 'fork-ts-checker-service-start',
    receive: 'fork-ts-checker-receive',
    serviceOutOfMemory: 'fork-ts-checker-service-out-of-memory',
    emit: 'fork-ts-checker-emit',
    done: 'fork-ts-checker-done'
};
function createForkTsCheckerWebpackPluginHooks() {
    return {
        serviceBeforeStart: new tapable_1.AsyncSeriesHook([]),
        cancel: new tapable_1.SyncHook(['cancellationToken']),
        serviceStartError: new tapable_1.SyncHook(['error']),
        waiting: new tapable_1.SyncHook(['hasTsLint']),
        serviceStart: new tapable_1.SyncHook([
            'tsconfigPath',
            'tslintPath',
            'watchPaths',
            'workersNumber',
            'memoryLimit'
        ]),
        receive: new tapable_1.SyncHook(['diagnostics', 'lints']),
        serviceOutOfMemory: new tapable_1.SyncHook([]),
        emit: new tapable_1.SyncHook(['diagnostics', 'lints', 'elapsed']),
        done: new tapable_1.SyncHook(['diagnostics', 'lints', 'elapsed'])
    };
}
function getForkTsCheckerWebpackPluginHooks(compiler) {
    let hooks = compilerHookMap.get(compiler);
    if (hooks === undefined) {
        hooks = createForkTsCheckerWebpackPluginHooks();
        compilerHookMap.set(compiler, hooks);
    }
    return hooks;
}
exports.getForkTsCheckerWebpackPluginHooks = getForkTsCheckerWebpackPluginHooks;
//# sourceMappingURL=hooks.js.map