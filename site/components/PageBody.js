import React from 'react';
import './PageBody.less';

export default class PageBody {
  render() {
    var {html, ...props} = this.props;
    return (
      <div className="PageBody">
        <div className="PageBody-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}