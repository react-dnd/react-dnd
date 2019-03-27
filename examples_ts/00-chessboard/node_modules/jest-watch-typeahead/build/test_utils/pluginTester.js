"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jestWatcher = require("jest-watcher");

var _stripAnsi = _interopRequireDefault(require("strip-ansi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

expect.addSnapshotSerializer({
  test: val => typeof val === 'string',
  print: val => (0, _stripAnsi.default)(val)
});
jest.mock('ansi-escapes', () => ({
  clearScreen: '[MOCK - clearScreen]',
  cursorDown: (count = 1) => `[MOCK - cursorDown(${count})]`,
  cursorLeft: '[MOCK - cursorLeft]',
  cursorHide: '[MOCK - cursorHide]',
  cursorRestorePosition: '[MOCK - cursorRestorePosition]',
  cursorSavePosition: '[MOCK - cursorSavePosition]',
  cursorShow: '[MOCK - cursorShow]',
  cursorTo: (x, y) => `[MOCK - cursorTo(${x}, ${y})]`
}));

const pluginTester = (Plugin, config = {}) => {
  const stdout = {
    columns: 80,
    write: jest.fn()
  };
  const jestHooks = new _jestWatcher.JestHook();
  const plugin = new Plugin({
    stdout,
    config
  });
  plugin.apply(jestHooks.getSubscriber());

  const type = (...keys) => keys.forEach(key => plugin.onKey(key));

  return {
    stdout,
    hookEmitter: jestHooks.getEmitter(),
    updateConfigAndRun: jest.fn(),
    plugin,
    type
  };
};

var _default = pluginTester;
exports.default = _default;