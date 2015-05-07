import React, { PropTypes, Component } from 'react';
import StaticHTMLBlock from './StaticHTMLBlock';

import './CodeBlock.less';

export default class CodeBlock extends Component {
  static propTypes = {
    es5: PropTypes.string.isRequired,
    es6: PropTypes.string.isRequired,
    es7: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { syntax: 'es5' };
  }

  handleSyntaxClick(syntax) {
    this.setState({ syntax });
  }

  render() {
    return (
      <div className="CodeBlock">
        <ul className="CodeBlock-tabs">
          {['es5', 'es6', 'es7'].map(this.renderSyntaxLink, this)}
        </ul>
        <div className="CodeBlock-content">
          <StaticHTMLBlock html={this.props[this.state.syntax]} />
        </div>
      </div>
    );
  }

  renderSyntaxLink(syntax) {
    if (!this.props[syntax] || !this.props[syntax].trim().length) {
      return;
    }

    const active = this.state.syntax === syntax;
    return (
      <li className={`CodeBlock-tab ${active ? 'CodeBlock-activeTab' : ''}`}
          key={syntax}>
        <a onClick={this.handleSyntaxClick.bind(this, syntax)}>
          {syntax.toUpperCase()}
        </a>
      </li>
    );
  }
}