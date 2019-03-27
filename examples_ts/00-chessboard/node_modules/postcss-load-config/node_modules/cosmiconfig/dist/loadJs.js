//      
'use strict';

const requireFromString = require('require-from-string');
const readFile = require('./readFile');

module.exports = function loadJs(
  filepath        ,
  options                    
)                                                     {
  function parseJsFile(content         )                      {
    if (!content) return null;

    return {
      config: requireFromString(content, filepath),
      filepath,
    };
  }

  return !options.sync
    ? readFile(filepath).then(parseJsFile)
    : parseJsFile(readFile.sync(filepath));
};
