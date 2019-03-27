'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTypeaheadSelection = exports.printTypeaheadItem = exports.printMore = exports.printStartTyping = exports.printPatternMatches = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _jestWatcher = require('jest-watcher');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pluralize = (count, text) => count === 1 ? text : `${text}s`;

const printPatternMatches = exports.printPatternMatches = (count, entity, pipe, extraText = '') => {
  const pluralized = pluralize(count, entity);
  const result = count ? `\n\n Pattern matches ${count} ${pluralized}` : `\n\n Pattern matches no ${pluralized}`;

  pipe.write(result + extraText);
};

const printStartTyping = exports.printStartTyping = (entity, pipe) => {
  pipe.write(`\n\n ${_chalk2.default.italic.yellow(`Start typing to filter by a ${entity} regex pattern.`)}`);
};

const printMore = exports.printMore = (entity, pipe, more) => {
  pipe.write(`\n   ${_chalk2.default.dim(`...and ${more} more ${pluralize(more, entity)}`)}`);
};

const printTypeaheadItem = exports.printTypeaheadItem = (item, pipe) => pipe.write(`\n ${_chalk2.default.dim('\u203A')} ${item}`);

const formatTypeaheadSelection = exports.formatTypeaheadSelection = (item, index, activeIndex, prompt) => {
  if (index === activeIndex) {
    prompt.setPromptSelection((0, _stripAnsi2.default)(item));
    return _chalk2.default.black.bgYellow((0, _stripAnsi2.default)(item));
  }
  return item;
};