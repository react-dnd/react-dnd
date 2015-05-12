import React, { PropTypes } from 'react';
import NavBar from './NavBar';
import Cover from './Cover';
import './Header.less';

export default class Header {
  static propTypes = {
    showCover: React.PropTypes.bool
  };

  render() {
    return (
      <header className="Header">
        <NavBar />

        {this.props.showCover &&
          <Cover />
        }
      </header>
    );
  }
}