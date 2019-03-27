"use strict";

exports.__esModule = true;
exports.default = void 0;

var handlers = _interopRequireWildcard(require("./handlers"));

var _one = _interopRequireDefault(require("./one"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const h = {
  handlers
};

function toBabelAST(tree) {
  return (0, _one.default)(h, tree);
}

var _default = toBabelAST;
exports.default = _default;