import React, { Component } from 'react';
import Header from '../components/Header';
import PageBody from '../components/PageBody';
import SideBar from '../components/SideBar';
import StaticHTMLBlock from '../components/StaticHTMLBlock';
import { APIPages } from '../Constants';

export default class APIPage extends Component {
  render() {
    return (
      <div>
        <Header/>

        <PageBody hasSidebar>
          <SideBar
            groups={APIPages}
            example={this.props.example}
          />

          <StaticHTMLBlock html={this.props.html} />
        </PageBody>
      </div>
    );
  }
}