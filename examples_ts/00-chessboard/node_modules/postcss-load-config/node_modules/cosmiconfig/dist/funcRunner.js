//      
'use strict';

const chainFuncsAsync = (result, func) => result.then(func);
const chainFuncsSync = (result, func) => func(result);

/**
 * Runs the given functions sequentially. If the `init` param is a promise,
 * functions are chained using `p.then()`. Otherwise, functions are chained by passing
 * the result of each function to the next.
 */
module.exports = function funcRunner(
  init                ,
  funcs                 
)                 {
  const isAsync = init instanceof Promise;

  return funcs.reduce(
    isAsync === true ? chainFuncsAsync : chainFuncsSync,
    init
  );
};
