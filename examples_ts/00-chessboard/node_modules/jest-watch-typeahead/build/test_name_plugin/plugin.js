"use strict";

var _jestWatcher = require("jest-watcher");

var _prompt = _interopRequireDefault(require("./prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestNamePlugin {
  constructor({
    stdin,
    stdout,
    config = {}
  }) {
    this._stdin = stdin;
    this._stdout = stdout;
    this._prompt = new _jestWatcher.Prompt();
    this._testResults = [];
    this._usageInfo = {
      key: config.key || 't',
      prompt: config.prompt || 'filter by a test name regex pattern'
    };
  }

  apply(jestHooks) {
    jestHooks.onTestRunComplete(({
      testResults
    }) => {
      this._testResults = testResults;
    });
  }

  onKey(key) {
    this._prompt.put(key);
  }

  run(globalConfig, updateConfigAndRun) {
    const p = new _prompt.default(this._stdout, this._prompt);
    p.updateCachedTestResults(this._testResults);
    return new Promise((res, rej) => {
      p.run(value => {
        updateConfigAndRun({
          mode: 'watch',
          testNamePattern: value
        });
        res();
      }, rej);
    });
  }

  getUsageInfo() {
    return this._usageInfo;
  }

}

module.exports = TestNamePlugin;