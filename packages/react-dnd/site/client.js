import React from 'react';
import { render } from 'react-dom';
import IndexPage from './IndexPage';

render(
  <IndexPage
    {...window.INITIAL_PROPS}
  />,
  document
);
