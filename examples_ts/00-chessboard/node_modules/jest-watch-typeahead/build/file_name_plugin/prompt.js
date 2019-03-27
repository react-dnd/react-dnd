"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _ansiEscapes = _interopRequireDefault(require("ansi-escapes"));

var _stringLength = _interopRequireDefault(require("string-length"));

var _jestWatcher = require("jest-watcher");

var _utils = require("../lib/utils");

var _pattern_mode_helpers = require("../lib/pattern_mode_helpers");

var _scroll2 = _interopRequireDefault(require("../lib/scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FileNamePatternPrompt extends _jestWatcher.PatternPrompt {
  constructor(pipe, prompt) {
    super(pipe, prompt);
    this._entityName = 'filenames';
    this._searchSources = [];
  }

  _onChange(pattern, options) {
    super._onChange(pattern, options);

    this._printTypeahead(pattern, options);
  }

  _printTypeahead(pattern, options) {
    const matchedTests = this._getMatchedTests(pattern);

    const total = matchedTests.length;
    const pipe = this._pipe;
    const prompt = this._prompt;
    (0, _jestWatcher.printPatternCaret)(pattern, pipe);
    pipe.write(_ansiEscapes.default.cursorLeft);

    if (pattern) {
      (0, _pattern_mode_helpers.printPatternMatches)(total, 'file', pipe);
      const prefix = `  ${_chalk.default.dim('\u203A')} `;
      const padding = (0, _stringLength.default)(prefix) + 2;
      const width = (0, _utils.getTerminalWidth)(pipe);

      const _scroll = (0, _scroll2.default)(total, options),
            start = _scroll.start,
            end = _scroll.end,
            index = _scroll.index;

      prompt.setPromptLength(total);
      matchedTests.slice(start, end).map(({
        path,
        context
      }) => {
        const filePath = (0, _utils.trimAndFormatPath)(padding, context.config, path, width);
        return (0, _utils.highlight)(path, filePath, pattern, context.config.rootDir);
      }).map((item, i) => (0, _pattern_mode_helpers.formatTypeaheadSelection)(item, i, index, prompt)).forEach(item => (0, _pattern_mode_helpers.printTypeaheadItem)(item, pipe));

      if (total > end) {
        (0, _pattern_mode_helpers.printMore)('file', pipe, total - end);
      }
    } else {
      (0, _pattern_mode_helpers.printStartTyping)('filename', pipe);
    }

    (0, _jestWatcher.printRestoredPatternCaret)(pattern, this._currentUsageRows, pipe);
  }

  _getMatchedTests(pattern) {
    let regex;

    try {
      regex = new RegExp(pattern, 'i');
    } catch (e) {
      return [];
    }

    return this._searchSources.reduce((tests, {
      testPaths,
      config
    }) => {
      return tests.concat(testPaths.filter(testPath => regex.test(testPath)).map(path => ({
        path,
        context: {
          config
        }
      })));
    }, []);
  }

  updateSearchSources(searchSources) {
    this._searchSources = searchSources;
  }

}

exports.default = FileNamePatternPrompt;