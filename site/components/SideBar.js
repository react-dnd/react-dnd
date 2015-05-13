import React from 'react';
import './SideBar.less';

export default class SideBar {
  render() {
    return (
      <div className="SideBar">
        <div className="SideBar-content">
          {this.props.groups.map(this.renderGroup, this)}
        </div>
      </div>
    );
  }

  renderGroup({ title, pages }) {
    return (
      <div className="SideBar-group">
        <h4 className="SideBar-groupTitle">
          {title}
        </h4>
        {Object.keys(pages).map(key => this.renderLink(pages[key]))}
      </div>
    );
  }

  renderLink({ title, location }) {
    const arrow = <span className="arrowBullet" />;

    let linkClass = 'SideBar-item';
    if (this.props.example.location === location) {
      linkClass += ' SideBar-item--selected';
    }

    return (
      <h2 key={title}>
        <a href={location} target="_self" className={linkClass}>
          <span className="SideBar-itemText">{title}</span>
          {arrow}
        </a>
      </h2>
    );
  }
}