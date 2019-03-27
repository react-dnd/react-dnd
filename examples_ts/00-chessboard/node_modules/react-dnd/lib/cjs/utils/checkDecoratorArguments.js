"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkDecoratorArguments(functionName, signature) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (process.env.NODE_ENV !== 'production') {
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            if (arg && arg.prototype && arg.prototype.render) {
                // tslint:disable-next-line no-console
                console.error('You seem to be applying the arguments in the wrong order. ' +
                    ("It should be " + functionName + "(" + signature + ")(Component), not the other way around. ") +
                    'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#you-seem-to-be-applying-the-arguments-in-the-wrong-order');
                return;
            }
        }
    }
}
exports.default = checkDecoratorArguments;
