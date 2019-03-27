"use strict";

exports.__esModule = true;
exports.getExport = exports.getImport = exports.getProps = void 0;

const getProps = ({
  types: t
}, opts) => {
  const props = [];

  if (opts.ref) {
    props.push(t.objectProperty(t.identifier('svgRef'), t.identifier('svgRef'), false, true));
  }

  if (opts.titleProp) {
    props.push(t.objectProperty(t.identifier('title'), t.identifier('title'), false, true));
  }

  if (opts.expandProps) {
    props.push(t.restElement(t.identifier('props')));
  }

  if (props.length === 0) {
    return null;
  }

  if (props.length === 1 && opts.expandProps) {
    return t.identifier('props');
  }

  return t.objectPattern(props);
};

exports.getProps = getProps;

const getImport = ({
  types: t
}, opts) => {
  const importDeclarations = [t.importDeclaration([t.importDefaultSpecifier(t.identifier('React'))], t.stringLiteral('react'))];

  if (opts.native) {
    importDeclarations.push(t.importDeclaration([t.importDefaultSpecifier(t.identifier('Svg'))], t.stringLiteral('react-native-svg')));
  }

  return importDeclarations;
};

exports.getImport = getImport;

const getExport = ({
  template
}, opts) => {
  let result = '';
  let exportName = opts.state.componentName;

  if (opts.ref) {
    exportName = 'ForwardRef';
    result += `const ForwardRef = React.forwardRef((props, ref) => <${opts.state.componentName} svgRef={ref} {...props} />)\n\n`;
  }

  if (opts.state.caller && opts.state.caller.previousExport) {
    result += `${opts.state.caller.previousExport}\n`;
    result += `export { ${exportName} as ReactComponent }`;
    return template.ast(result, {
      plugins: ['jsx']
    });
  }

  result += `export default ${exportName}`;
  return template.ast(result, {
    plugins: ['jsx']
  });
};

exports.getExport = getExport;