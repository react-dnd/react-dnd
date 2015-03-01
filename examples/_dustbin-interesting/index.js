'use strict';

import React from 'react';
import Container from './Container';

const DustbinSorted = React.createClass({
  render() {
    return (
      <div>
        <Container />
        <hr />
        <p>
          Several different dustbins can handle several types of items. Note that the last dustbin is special: it can handle files from your hard drive and URLs.
        </p>
      </div>
    );
  }
});

export default DustbinSorted;