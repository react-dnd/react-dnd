//      
'use strict';

const path = require('path');
const loadPackageProp = require('./loadPackageProp');
const loadRc = require('./loadRc');
const loadJs = require('./loadJs');
const loadDefinedFile = require('./loadDefinedFile');
const funcRunner = require('./funcRunner');
const getDirectory = require('./getDirectory');

module.exports = function createExplorer(options   
                               
                      
                      
                                  
                         
                         
                   
                  
                 
                                   
                      
 ) {
  // When `options.sync` is `false` (default),
  // these cache Promises that resolve with results, not the results themselves.
  const fileCache = options.cache ? new Map() : null;
  const directoryCache = options.cache ? new Map() : null;
  const transform = options.transform || identity;
  const packageProp = options.packageProp;

  function clearFileCache() {
    if (fileCache) fileCache.clear();
  }

  function clearDirectoryCache() {
    if (directoryCache) directoryCache.clear();
  }

  function clearCaches() {
    clearFileCache();
    clearDirectoryCache();
  }

  function throwError(error) {
    if (options.sync) {
      throw error;
    } else {
      return Promise.reject(error);
    }
  }

  function load(
    searchPath        ,
    configPath         
  )                                                     {
    if (!searchPath) searchPath = process.cwd();
    if (!configPath && options.configPath) configPath = options.configPath;

    if (configPath) {
      const absoluteConfigPath = path.resolve(process.cwd(), configPath);
      if (fileCache && fileCache.has(absoluteConfigPath)) {
        return fileCache.get(absoluteConfigPath);
      }

      let load;
      if (path.basename(absoluteConfigPath) === 'package.json') {
        if (!packageProp) {
          return throwError(
            new Error(
              'Please specify the packageProp option. The configPath argument cannot point to a package.json file if packageProp is false.'
            )
          );
        }
        load = () =>
          loadPackageProp(path.dirname(absoluteConfigPath), {
            packageProp,
            sync: options.sync,
          });
      } else {
        load = () =>
          loadDefinedFile(absoluteConfigPath, {
            sync: options.sync,
            format: options.format,
          });
      }

      const loadResult = load();
      const result =
        loadResult instanceof Promise
          ? loadResult.then(transform)
          : transform(loadResult);
      if (fileCache) fileCache.set(absoluteConfigPath, result);
      return result;
    }

    const absoluteSearchPath = path.resolve(process.cwd(), searchPath);
    const searchPathDir = getDirectory(absoluteSearchPath, options.sync);

    return searchPathDir instanceof Promise
      ? searchPathDir.then(searchDirectory)
      : searchDirectory(searchPathDir);
  }

  function searchDirectory(
    directory        
  )                                                     {
    if (directoryCache && directoryCache.has(directory)) {
      return directoryCache.get(directory);
    }

    const result = funcRunner(!options.sync ? Promise.resolve() : undefined, [
      () => {
        if (!packageProp) return;
        return loadPackageProp(directory, {
          packageProp,
          sync: options.sync,
        });
      },
      result => {
        if (result || !options.rc) return result;
        return loadRc(path.join(directory, options.rc), {
          sync: options.sync,
          rcStrictJson: options.rcStrictJson,
          rcExtensions: options.rcExtensions,
        });
      },
      result => {
        if (result || !options.js) return result;
        return loadJs(path.join(directory, options.js), { sync: options.sync });
      },
      result => {
        if (result) return result;

        const nextDirectory = path.dirname(directory);

        if (nextDirectory === directory || directory === options.stopDir)
          return null;

        return searchDirectory(nextDirectory);
      },
      transform,
    ]);

    if (directoryCache) directoryCache.set(directory, result);
    return result;
  }

  return {
    load,
    clearFileCache,
    clearDirectoryCache,
    clearCaches,
  };
};

function identity(x) {
  return x;
}
