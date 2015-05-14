import React, { PropTypes } from 'react';
import NavBar from './NavBar';
import Cover from './Cover';
import './Header.less';

export default class Header {
  render() {
    return (
      <header className="Header">
        <NavBar />
      </header>
    );
  }
}