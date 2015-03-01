'use strict';

import React from 'react';
import Container from './Container';

const NestingSources = React.createClass({
  render() {
    return (
      <div>
        <Container />
        <hr />
        <p>
          You can nest drag sources in one another. If a nested drag source returns false in <code>canDrag</code>, its parent will be asked, until a draggable source is found and activated.
        </p>
      </div>
    );
  }
});

export default NestingSources;