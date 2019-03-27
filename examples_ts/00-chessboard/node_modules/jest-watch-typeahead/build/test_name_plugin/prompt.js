"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _ansiEscapes = _interopRequireDefault(require("ansi-escapes"));

var _jestWatcher = require("jest-watcher");

var _scroll2 = _interopRequireDefault(require("../lib/scroll"));

var _utils = require("../lib/utils");

var _pattern_mode_helpers = require("../lib/pattern_mode_helpers");

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
    pipe.write(_ansiEscapes.default.cursorLeft);

    if (pattern) {
      (0, _pattern_mode_helpers.printPatternMatches)(total, 'test', pipe, ` from ${_chalk.default.yellow('cached')} test suites`);
      const width = (0, _utils.getTerminalWidth)(pipe);

      const _scroll = (0, _scroll2.default)(total, options),
            start = _scroll.start,
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

    return this._cachedTestResults.reduce((matchedTests, {
      testResults
    }) => {
      return matchedTests.concat(testResults.filter(({
        title
      }) => regex.test(title)).map(({
        title
      }) => title));
    }, []);
  }

  updateCachedTestResults(testResults = []) {
    this._cachedTestResults = testResults;
  }

}

module.exports = TestNamePatternPrompt;