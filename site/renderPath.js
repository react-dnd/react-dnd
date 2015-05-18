import React from 'react';
import IndexPage from './IndexPage';

export default function renderPath(path, props, onRender) {
  onRender(
    IndexPage.renderToString(props)
  );
}
