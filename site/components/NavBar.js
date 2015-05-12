import React from 'react';
import { DOCS_DEFAULT, Pages } from '../Constants';
import './NavBar.less';

const GITHUB_URL = 'https://github.com/gaearon/react-dnd';
const DOCS_LOCATION = DOCS_DEFAULT.location;
const EXAMPLES_LOCATION = Pages.EXAMPLES.location;

export default class NavBar {
  render() {
    return (
      <div className="NavBar">
        <div className="NavBar-container">
          <div className="NavBar-item">
            <a href="./" target="_self" className="NavBar-logo">React <b><i>DnD</i></b></a>
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