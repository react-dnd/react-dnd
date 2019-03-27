//      
'use strict';

const os = require('os');
const createExplorer = require('./createExplorer');

const homedir = os.homedir();

module.exports = function cosmiconfig(
  moduleName        ,
  options   
                                 
                        
                        
                                    
                           
                           
                     
                    
                   
                                     
                        
   
) {
  options = Object.assign(
    {},
    {
      packageProp: moduleName,
      rc: `.${moduleName}rc`,
      js: `${moduleName}.config.js`,
      rcStrictJson: false,
      stopDir: homedir,
      cache: true,
      sync: false,
    },
    options
  );

  return createExplorer(options);
};
