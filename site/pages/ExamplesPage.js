import React from 'react';
import Header from '../components/Header';
import PageBody from '../components/PageBody';
import SideBar from '../components/SideBar';
import StaticHTMLBlock from '../components/StaticHTMLBlock';
import Constants from '../Constants';

export default class ExamplesPage {
  render() {
    return (
      <div>
        <Header/>
        <PageBody>
          Examples.
        </PageBody>
      </div>
    );
  }
}