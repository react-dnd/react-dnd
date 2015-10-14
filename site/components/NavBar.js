import React, { Component } from 'react';
import { DOCS_DEFAULT, EXAMPLES_DEFAULT } from '../Constants';
import './NavBar.less';

const GITHUB_URL = 'https://github.com/gaearon/react-dnd';
const DOCS_LOCATION = DOCS_DEFAULT.location;
const EXAMPLES_LOCATION = EXAMPLES_DEFAULT.location;

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <div className="NavBar-container">
          <div className="NavBar-logo">
            <a href="./" target="_self" className="NavBar-logoTitle">React <i>DnD</i></a>
            <p className="NavBar-logoDescription">Drag and Drop for React</p>
          </div>

          <div className="NavBar-item">
            <a className="NavBar-link" href={DOCS_LOCATION} target="_self">Docs</a>
            <a className="NavBar-link" href={EXAMPLES_LOCATION} target="_self">Examples</a>
            <a className="NavBar-link" href={GITHUB_URL}>GitHub</a>
          </div>
        </div>
      </div>
    );
  }
}