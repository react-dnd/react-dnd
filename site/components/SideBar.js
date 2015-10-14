import React, { Component } from 'react';
import './SideBar.less';

export default class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
        <div className="SideBar-content">
          {this.props.groups.map(this.renderGroup, this)}
        </div>
      </div>
    );
  }

  renderGroup({ title, pages}, index) {
    return (
      <div className="SideBar-group" key={index}>
        <h4 className="SideBar-groupTitle">
          {title}
        </h4>
        {Object.keys(pages).map(key => this.renderLink(pages[key], key))}
      </div>
    );
  }

  renderLink({ title, location }, key) {
    const arrow = <span className="arrowBullet" />;

    let linkClass = 'SideBar-item';
    if (this.props.example.location === location) {
      linkClass += ' SideBar-item--selected';
    }

    return (
      <a key={key} href={location} target="_self" className={linkClass}>
        <span className="SideBar-itemText">{title}</span>
        {arrow}
      </a>
    );
  }
}