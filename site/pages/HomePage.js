import React, { Component } from 'react';
import Header from '../components/Header';
import PageBody from '../components/PageBody';
import StaticHTMLBlock from '../components/StaticHTMLBlock';
import IndexHTML from '../../docs/index.md';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header showCover />

        <PageBody>
          <StaticHTMLBlock html={IndexHTML} />
        </PageBody>
      </div>
    );
  }
}