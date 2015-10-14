import React, { Component, PropTypes } from 'react';
import NavBar from './NavBar';
import Cover from './Cover';
import './Header.less';

export default class Header extends Component {
  render() {
    return (
      <header className="Header">
        <NavBar />
      </header>
    );
  }
}