//      
'use strict';

const parseJson = require('parse-json');

module.exports = function parseJsonWrapper(
  json        ,
  filepath        
)         {
  try {
    return parseJson(json);
  } catch (err) {
    err.message = `JSON Error in ${filepath}:\n${err.message}`;
    throw err;
  }
};
