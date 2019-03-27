"use strict";

exports.__esModule = true;
exports.default = void 0;

var _util = require("./util");

function defaultTemplate({
  template
}, opts, {
  imports,
  componentName,
  props,
  jsx,
  exports
}) {
  return template.ast`${imports}
const ${componentName} = (${props}) => ${jsx}
${exports}
`;
}

const plugin = (api, opts) => ({
  visitor: {
    Program(path) {
      const {
        types: t
      } = api;
      const template = opts.template || defaultTemplate;
      const body = template(api, opts, {
        componentName: t.identifier(opts.state.componentName),
        props: (0, _util.getProps)(api, opts),
        imports: (0, _util.getImport)(api, opts),
        exports: (0, _util.getExport)(api, opts),
        jsx: path.node.body[0].expression
      });

      if (Array.isArray(body)) {
        path.node.body = body;
      } else {
        path.node.body = [body];
      }

      path.replaceWith(path.node);
    }

  }
});

var _default = plugin;
exports.default = _default;