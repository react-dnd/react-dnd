import React from 'react';
import Header from '../components/Header';
import PageBody from '../components/PageBody';
import SideBar from '../components/SideBar';
import { ExamplePages } from '../Constants';

export default class ExamplesPage {
  render() {
    return (
      <div>
        <Header/>
        <PageBody hasSidebar>
          <SideBar
            groups={ExamplePages}
            example={this.props.example}
          />

          {this.props.children}
        </PageBody>
      </div>
    );
  }
}