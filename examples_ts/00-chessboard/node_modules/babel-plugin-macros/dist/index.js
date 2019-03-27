'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var p = require('path');
var resolve = require('resolve');
// const printAST = require('ast-pretty-print')

var macrosRegex = /[./]macro(\.js)?$/;

// https://stackoverflow.com/a/32749533/971592

var MacroError = function (_Error) {
  _inherits(MacroError, _Error);

  function MacroError(message) {
    _classCallCheck(this, MacroError);

    var _this = _possibleConstructorReturn(this, (MacroError.__proto__ || Object.getPrototypeOf(MacroError)).call(this, message));

    _this.name = 'MacroError';
    /* istanbul ignore else */
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else if (!_this.stack) {
      _this.stack = new Error(message).stack;
    }
    return _this;
  }

  return MacroError;
}(Error);

function createMacro(macro) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (options.configName === 'options') {
    throw new Error(`You cannot use the configName "options". It is reserved for babel-plugin-macros.`);
  }
  macroWrapper.isBabelMacro = true;
  macroWrapper.options = options;
  return macroWrapper;

  function macroWrapper(args) {
    var source = args.source,
        isBabelMacrosCall = args.isBabelMacrosCall;

    if (!isBabelMacrosCall) {
      throw new MacroError(`The macro you imported from "${source}" is being executed outside the context of compilation with babel-plugin-macros. ` + `This indicates that you don't have the babel plugin "babel-plugin-macros" configured correctly. ` + `Please see the documentation for how to configure babel-plugin-macros properly: ` + 'https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md');
    }
    return macro(args);
  }
}

function nodeResolvePath(source, basedir) {
  return resolve.sync(source, { basedir });
}

function macrosPlugin(babel) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$require = _ref.require,
      _require = _ref$require === undefined ? require : _ref$require,
      _ref$resolvePath = _ref.resolvePath,
      resolvePath = _ref$resolvePath === undefined ? nodeResolvePath : _ref$resolvePath;

  function interopRequire(path) {
    // eslint-disable-next-line import/no-dynamic-require
    var o = _require(path);
    return o && o.__esModule && o.default ? o.default : o;
  }

  return {
    name: 'macros',
    visitor: {
      Program(progPath, state) {
        progPath.traverse({
          ImportDeclaration(path) {
            var isMacros = looksLike(path, {
              node: {
                source: {
                  value: function value(v) {
                    return macrosRegex.test(v);
                  }
                }
              }
            });
            if (!isMacros) {
              return;
            }
            var imports = path.node.specifiers.map(function (s) {
              return {
                localName: s.local.name,
                importedName: s.type === 'ImportDefaultSpecifier' ? 'default' : s.imported.name
              };
            });
            var source = path.node.source.value;
            var result = applyMacros({
              path,
              imports,
              source,
              state,
              babel,
              interopRequire,
              resolvePath
            });

            if (!result || !result.keepImports) {
              path.remove();
            }
          },
          VariableDeclaration(path) {
            var isMacros = function isMacros(child) {
              return looksLike(child, {
                node: {
                  init: {
                    callee: {
                      type: 'Identifier',
                      name: 'require'
                    },
                    arguments: function _arguments(args) {
                      return args.length === 1 && macrosRegex.test(args[0].value);
                    }
                  }
                }
              });
            };

            path.get('declarations').filter(isMacros).forEach(function (child) {
              var imports = child.node.id.name ? [{ localName: child.node.id.name, importedName: 'default' }] : child.node.id.properties.map(function (property) {
                return {
                  localName: property.value.name,
                  importedName: property.key.name
                };
              });

              var call = child.get('init');
              var source = call.node.arguments[0].value;
              var result = applyMacros({
                path: call,
                imports,
                source,
                state,
                babel,
                interopRequire,
                resolvePath
              });

              if (!result || !result.keepImports) {
                child.remove();
              }
            });
          }
        });
      }
    }
  };
}

// eslint-disable-next-line complexity
function applyMacros(_ref2) {
  var path = _ref2.path,
      imports = _ref2.imports,
      source = _ref2.source,
      state = _ref2.state,
      babel = _ref2.babel,
      interopRequire = _ref2.interopRequire,
      resolvePath = _ref2.resolvePath;

  /* istanbul ignore next (pretty much only useful for astexplorer I think) */
  var _state$file$opts$file = state.file.opts.filename,
      filename = _state$file$opts$file === undefined ? '' : _state$file$opts$file;

  var hasReferences = false;
  var referencePathsByImportName = imports.reduce(function (byName, _ref3) {
    var importedName = _ref3.importedName,
        localName = _ref3.localName;

    var binding = path.scope.getBinding(localName);

    byName[importedName] = binding.referencePaths;
    hasReferences = hasReferences || Boolean(byName[importedName].length);

    return byName;
  }, {});

  var isRelative = source.indexOf('.') === 0;
  var requirePath = resolvePath(source, p.dirname(getFullFilename(filename)));

  var macro = interopRequire(requirePath);
  if (!macro.isBabelMacro) {
    throw new Error(
    // eslint-disable-next-line prefer-template
    `The macro imported from "${source}" must be wrapped in "createMacro" ` + `which you can get from "babel-plugin-macros". ` + `Please refer to the documentation to see how to do this properly: https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#writing-a-macro`);
  }
  var config = getConfig(macro, filename, source);

  var result = void 0;
  try {
    /**
     * Other plugins that run before babel-plugin-macros might use path.replace, where a path is
     * put into its own replacement. Apparently babel does not update the scope after such
     * an operation. As a remedy, the whole scope is traversed again with an empty "Identifier"
     * visitor - this makes the problem go away.
     *
     * See: https://github.com/kentcdodds/import-all.macro/issues/7
     */
    state.file.scope.path.traverse({
      Identifier() {}
    });

    result = macro({
      references: referencePathsByImportName,
      source,
      state,
      babel,
      config,
      isBabelMacrosCall: true
    });
  } catch (error) {
    if (error.name === 'MacroError') {
      throw error;
    }
    error.message = `${source}: ${error.message}`;
    if (!isRelative) {
      error.message = `${error.message} Learn more: https://www.npmjs.com/package/${source.replace(
      // remove everything after package name
      // @org/package/macro -> @org/package
      // package/macro      -> package
      /^((?:@[^/]+\/)?[^/]+).*/, '$1')}`;
    }
    throw error;
  }
  return result;
}

// eslint-disable-next-line consistent-return
function getConfig(macro, filename, source) {
  if (macro.options.configName) {
    try {
      // lazy-loading it here to avoid perf issues of loading it up front.
      // No I did not measure. Yes I'm a bad person.
      // FWIW, this thing told me that cosmiconfig is 227.1 kb of minified JS
      // so that's probably significant... https://bundlephobia.com/result?p=cosmiconfig@3.1.0
      // Note that cosmiconfig will cache the babel-plugin-macros config 👍
      var explorer = require('cosmiconfig')('babel-plugin-macros', {
        searchPlaces: ['package.json', `.babel-plugin-macrosrc`, `.babel-plugin-macrosrc.json`, `.babel-plugin-macrosrc.yaml`, `.babel-plugin-macrosrc.yml`, `.babel-plugin-macrosrc.js`, `babel-plugin-macros.config.js`],
        packageProp: 'babelMacros',
        sync: true
      });
      var loaded = explorer.searchSync(filename);
      if (loaded) {
        return loaded.config[macro.options.configName];
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`There was an error trying to load the config "${macro.options.configName}" ` + `for the macro imported from "${source}. ` + `Please see the error thrown for more information.`);
      throw error;
    }
  }
}

/*
 istanbul ignore next
 because this is hard to test
 and not worth it...
 */
function getFullFilename(filename) {
  if (p.isAbsolute(filename)) {
    return filename;
  }
  return p.join(process.cwd(), filename);
}

function looksLike(a, b) {
  return a && b && Object.keys(b).every(function (bKey) {
    var bVal = b[bKey];
    var aVal = a[bKey];
    if (typeof bVal === 'function') {
      return bVal(aVal);
    }
    return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
  });
}

function isPrimitive(val) {
  // eslint-disable-next-line
  return val == null || /^[sbn]/.test(typeof val);
}

module.exports = macrosPlugin;
Object.assign(module.exports, {
  createMacro,
  MacroError
});