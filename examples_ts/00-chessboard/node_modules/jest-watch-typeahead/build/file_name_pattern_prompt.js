'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _stringLength = require('string-length');

var _stringLength2 = _interopRequireDefault(_stringLength);

var _jestWatcher = require('jest-watcher');

var _utils = require('./lib/utils');

var _pattern_mode_helpers = require('./shared/pattern_mode_helpers');

var _scroll2 = require('./shared/scroll');

var _scroll3 = _interopRequireDefault(_scroll2);

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

    if (pattern) {
      (0, _pattern_mode_helpers.printPatternMatches)(total, 'file', pipe);

      const prefix = `  ${_chalk2.default.dim('\u203A')} `;
      const padding = (0, _stringLength2.default)(prefix) + 2;
      const width = (0, _utils.getTerminalWidth)();

      var _scroll = (0, _scroll3.default)(total, options);

      const start = _scroll.start,
            end = _scroll.end,
            index = _scroll.index;


      prompt.setPromptLength(total);

      matchedTests.slice(start, end).map(({ path, context }) => {
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
      regex = null;
    }

    let tests = [];
    if (regex) {
      this._searchSources.forEach(({ testPaths, config }) => {
        tests = tests.concat(testPaths.filter(testPath => testPath.match(pattern)).map(path => ({
          path,
          context: { config }
        })));
      });
    }

    return tests;
  }

  updateSearchSources(searchSources) {
    this._searchSources = searchSources;
  }
}
exports.default = FileNamePatternPrompt;