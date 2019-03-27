//      
'use strict';

const yaml = require('js-yaml');
const requireFromString = require('require-from-string');
const readFile = require('./readFile');
const parseJson = require('./parseJson');
const funcRunner = require('./funcRunner');

module.exports = function loadRc(
  filepath        ,
  options   
                   
                           
                           
   
)                                                     {
  if (!options.sync) {
    return readFile(filepath)
      .then(parseExtensionlessRcFile)
      .then(checkExtensionlessRcResult);
  } else {
    return checkExtensionlessRcResult(
      parseExtensionlessRcFile(readFile.sync(filepath))
    );
  }

  function checkExtensionlessRcResult(result) {
    if (result) return result;
    if (options.rcExtensions) return loadRcWithExtensions();
    return null;
  }

  function parseExtensionlessRcFile(content         )                      {
    if (!content) return null;
    const pasedConfig = options.rcStrictJson
      ? parseJson(content, filepath)
      : yaml.safeLoad(content, { filename: filepath });
    return {
      config: pasedConfig,
      filepath,
    };
  }

  function loadRcWithExtensions() {
    let foundConfig = null;
    return funcRunner(readRcFile('json'), [
      (jsonContent         ) => {
        // Since this is the first try, config cannot have been found, so don't
        // check `if (foundConfig)`.
        if (jsonContent) {
          const successFilepath = `${filepath}.json`;
          foundConfig = {
            config: parseJson(jsonContent, successFilepath),
            filepath: successFilepath,
          };
        } else {
          return readRcFile('yaml');
        }
      },
      (yamlContent         ) => {
        if (foundConfig) {
          return;
        } else if (yamlContent) {
          const successFilepath = `${filepath}.yaml`;
          foundConfig = {
            config: yaml.safeLoad(yamlContent, { filename: successFilepath }),
            filepath: successFilepath,
          };
        } else {
          return readRcFile('yml');
        }
      },
      (ymlContent         ) => {
        if (foundConfig) {
          return;
        } else if (ymlContent) {
          const successFilepath = `${filepath}.yml`;
          foundConfig = {
            config: yaml.safeLoad(ymlContent, { filename: successFilepath }),
            filepath: successFilepath,
          };
        } else {
          return readRcFile('js');
        }
      },
      (jsContent         ) => {
        if (foundConfig) {
          return;
        } else if (jsContent) {
          const successFilepath = `${filepath}.js`;
          foundConfig = {
            config: requireFromString(jsContent, successFilepath),
            filepath: successFilepath,
          };
        } else {
          return;
        }
      },
      () => foundConfig,
    ]);
  }

  function readRcFile(extension        )                             {
    const filepathWithExtension = `${filepath}.${extension}`;
    return !options.sync
      ? readFile(filepathWithExtension)
      : readFile.sync(filepathWithExtension);
  }
};
