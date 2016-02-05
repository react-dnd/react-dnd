import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import ReactUpdates from 'react/lib/ReactUpdates';
import StaticHTMLBlock from './StaticHTMLBlock';

import './CodeBlock.less';

let preferredSyntax = 'es5';
let observers = [];

function subscribe(observer) {
  observers.push(observer);
  return () => {
    observers.slice(observers.indexOf(observer), 1);
  };
}

function setPreferredSyntax(syntax) {
  preferredSyntax = syntax;
  observers.forEach(o => o(preferredSyntax));
}

export default class CodeBlock extends Component {
  static propTypes = {
    es5: PropTypes.string,
    es6: PropTypes.string,
    es7: PropTypes.string
  };

  static defaultProps = {
    es5: '',
    es6: '',
    es7: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      chosen: false,
      syntax: this.props.es5.trim().length && 'es5' ||
              this.props.es6.trim().length && 'es6' ||
              this.props.es7.trim().length && 'es7'
    };
  }

  componentDidMount() {
    this.unsubscribe = subscribe(this.handlePreferredSyntaxChange.bind(this));
  }

  handlePreferredSyntaxChange(syntax) {
    if (this.state.chosen || this.state.syntax === syntax) {
      return;
    }

    if (this.props[syntax].trim().length) {
      this.setState({
        syntax
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSyntaxClick(syntax) {
    this.setState({
      syntax,
      chosen: true
    });

    const scrollTopBefore = findDOMNode(this).getBoundingClientRect().top;
    setPreferredSyntax(syntax);
    ReactUpdates.flushBatchedUpdates();
    const scrollTopAfter = findDOMNode(this).getBoundingClientRect().top;

    window.scroll(
      window.pageXOffset || window.scrollX,
      (window.pageYOffset || window.scrollY) - (scrollTopBefore - scrollTopAfter)
    );
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

    if (syntax === 'es5' &&
        !this.props.es6.trim().length &&
        !this.props.es7.trim().length) {
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
