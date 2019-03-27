'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _jestWatcher = require('jest-watcher');

var _scroll2 = require('./shared/scroll');

var _scroll3 = _interopRequireDefault(_scroll2);

var _utils = require('./lib/utils');

var _pattern_mode_helpers = require('./shared/pattern_mode_helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestNamePatternPrompt extends _jestWatcher.PatternPrompt {

  constructor(pipe, prompt) {
    super(pipe, prompt);
    this._entityName = 'tests';
    this._cachedTestResults = [];
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
      (0, _pattern_mode_helpers.printPatternMatches)(total, 'test', pipe, ` from ${_chalk2.default.yellow('cached')} test suites`);

      const width = (0, _utils.getTerminalWidth)();

      var _scroll = (0, _scroll3.default)(total, options);

      const start = _scroll.start,
            end = _scroll.end,
            index = _scroll.index;


      prompt.setPromptLength(total);

      matchedTests.slice(start, end).map(name => (0, _utils.formatTestNameByPattern)(name, pattern, width - 4)).map((item, i) => (0, _pattern_mode_helpers.formatTypeaheadSelection)(item, i, index, prompt)).forEach(item => (0, _pattern_mode_helpers.printTypeaheadItem)(item, pipe));

      if (total > end) {
        (0, _pattern_mode_helpers.printMore)('test', pipe, total - end);
      }
    } else {
      (0, _pattern_mode_helpers.printStartTyping)('test name', pipe);
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

    const matchedTests = [];

    this._cachedTestResults.forEach(({ testResults }) => testResults.forEach(({ title }) => {
      if (regex.test(title)) {
        matchedTests.push(title);
      }
    }));

    return matchedTests;
  }

  updateCachedTestResults(testResults = []) {
    this._cachedTestResults = testResults;
  }
}

module.exports = TestNamePatternPrompt;