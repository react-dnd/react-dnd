//      
'use strict';

const path = require('path');
const isDirectory = require('is-directory');

module.exports = function getDirectory(
  filepath        ,
  sync          
)                           {
  if (sync === true) {
    return isDirectory.sync(filepath) ? filepath : path.dirname(filepath);
  }

  return new Promise((resolve, reject) => {
    return isDirectory(filepath, (err, filepathIsDirectory) => {
      if (err) {
        return reject(err);
      }
      return resolve(filepathIsDirectory ? filepath : path.dirname(filepath));
    });
  });
};
