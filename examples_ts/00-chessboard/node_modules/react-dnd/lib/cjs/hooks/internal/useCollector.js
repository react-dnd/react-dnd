"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// declare var require: any
// const shallowEqual = require('shallowequal')
var react_1 = require("react");
/**
 *
 * @param monitor The monitor to colelct state from
 * @param collect The collecting function
 * @param onUpdate A method to invoke when updates occur
 */
function useCollector(monitor, collect, onUpdate) {
    var _a = react_1.useState(function () { return collect(monitor); }), collected = _a[0], setCollected = _a[1];
    var updateCollected = function () {
        var nextValue = collect(monitor);
        // TODO: we need this shallowequal check to work
        // so that we can operate performantly, but the examples
        // are broken with it in currently
        // if (!shallowEqual(collected, nextValue)) {
        setCollected(nextValue);
        if (onUpdate) {
            onUpdate();
        }
        // }
    };
    return [collected, updateCollected];
}
exports.useCollector = useCollector;
