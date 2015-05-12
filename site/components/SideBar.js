import React from 'react';
import Constants from '../Constants';
import './SideBar.less';

export default class SideBar {
  render() {
    return (
      <div className="SideBar">
        <div className="SideBar-content">
          <h4 className="SideBar-groupTitle">{this.props.title}</h4>
          {Object.keys(this.props.pages).map(
              page => this.renderLink(
                this.props.pages[page].title,
                this.props.pages[page].location
              )
            )}
        </div>
      </div>
    );
  }

  renderLink(linkName, linkUrl) {
    const arrow = <span className="arrowBullet" />;

    let linkClass = 'SideBar-item';
    if (this.props.example.location === linkUrl) {
      linkClass += ' SideBar-item--selected';
    }

    return (
      <h2 key={linkName}>
        <a href={linkUrl} target="_self" className={linkClass}>
          <span className="SideBar-itemText">{linkName}</span>
          {arrow}
        </a>
      </h2>
    );
  }
}