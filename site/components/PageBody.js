import React, { Component } from 'react';
import './PageBody.less';

export default class PageBody extends Component {
  static propTypes = {
    hasSidebar: React.PropTypes.bool
  };

  render() {
    var {hasSidebar, html, ...props} = this.props;
    return (
      <div className={`PageBody ${hasSidebar ? 'PageBody--hasSidebar' : ''}`}>
        <div className="PageBody-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}