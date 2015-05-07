"use strict";

var React = require('react');
var Constants = require('../Constants');

require('./SideBar.less');

var SideBar = React.createClass({
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
  },

  renderLink(linkName, linkUrl) {
    var arrow = <span className="arrowBullet" />;
    var linkClass = 'SideBar-item';
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
});

module.exports = SideBar;
