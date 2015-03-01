'use strict';

import React from 'react';
import makeSource from './makeSource';
import Colors from './Colors';
import Target from './Target';

const Container = React.createClass({
  render() {
    const YellowSource = makeSource(Colors.YELLOW);
    const BlueSource = makeSource(Colors.BLUE);

    return (
      <div style={{ height: 320 }}>
        <div style={{ float: 'left' }}>
          <BlueSource>
            <YellowSource>
              <YellowSource />
              <BlueSource />
            </YellowSource>
            <BlueSource>
              <YellowSource />
            </BlueSource>
          </BlueSource>
        </div>

        <div style={{ float: 'left', marginLeft: 100, marginTop: 50 }}>
          <Target />
        </div>
      </div>
    );
  }
});

export default Container;