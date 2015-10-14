import React, { Component } from 'react';
import CodeBlock from './CodeBlock';

export default class StaticHTMLBlock extends Component {
  static propTypes = {
    html: React.PropTypes.string.isRequired
  };

  render() {
    const { html } = this.props;

    // Here goes a really hack-ish way to convert
    // areas separated by Markdown <hr>s into code tabs.

    const blocks = html.split('<hr/>');
    const elements = [];

    let es5Content = null;
    let es6Content = null;
    let es7Content = null;

    for (let i = 0; i < blocks.length; i++) {
      const content = blocks[i];

      switch (i % 4) {
      case 0:
        elements.push(
          <div key={i}
               style={{ width: '100%' }}
               dangerouslySetInnerHTML={{__html: content}} />
        );
        break;
      case 1:
        es5Content = content;
        break;
      case 2:
        es6Content = content;
        break;
      case 3:
        es7Content = content;
        elements.push(
          <CodeBlock key={i}
                     es5={es5Content}
                     es6={es6Content}
                     es7={es7Content} />
        );
        break;
      }
    }

    return (
      <div style={{ width: '100%' }}>
        {elements}
      </div>
    );
  }
}