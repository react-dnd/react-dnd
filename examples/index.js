'use strict';

import React from 'react';
import Router, { Route, Link, Redirect, RouteHandler } from 'react-router';
import AnimationFrame from 'animation-frame';
import DragAroundNaive from './_drag-around-naive/index';
import DustbinSimple from './_dustbin-simple';
import DustbinInteresting from './_dustbin-interesting';
import DustbinStress from './_dustbin-stress';
import NestingSources from './_nesting-sources';
import SortableSimple from './_sortable-simple';
import SortableStress from './_sortable-stress';
import CustomizeHandles from './_customize-handles';
import CustomizeEffects from './_customize-effects';

/*
DragAroundCustom = require('./_drag-around-custom/index'),
*/

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>react-dnd examples (<a target='_href' href='https://github.com/gaearon/react-dnd/blob/master/examples'>source</a>)</h1>
        <ul>
          <li>Drag Around (<Link to='drag-around-naive'>naive</Link>)</li>
          <li>Dustbin (<Link to='dustbin-simple'>simple</Link>, <Link to='dustbin-interesting'>interesting</Link>, <Link to='dustbin-stress'>stress test</Link>)</li>
          <li>Nesting (<Link to='nesting-sources'>drag sources</Link>)</li>
          <li>Sortable (<Link to='sortable-simple'>simple</Link>, <Link to='sortable-stress'>stress test</Link>)</li>
          <li>Customize (<Link to='customize-handles'>drag handles</Link>, <Link to='customize-effects'>drop effects</Link>)</li>
        </ul>
        <hr />
        <RouteHandler />
      </div>
    );
  }
});

/*
<ul>
<li>Drag Around (<Link to='drag-around-naive'>naive</Link>, <Link to='drag-around-custom'>custom</Link>)</li>
</ul>
*/

const routes = (
  <Route handler={App}>
    <Route name='drag-around-naive' path='drag-around-naive' handler={DragAroundNaive} />
    <Route name='dustbin-simple' path='dustbin-simple' handler={DustbinSimple} />
    <Route name='dustbin-interesting' path='dustbin-interesting' handler={DustbinInteresting} />
    <Route name='dustbin-stress' path='dustbin-stress' handler={DustbinStress} />
    <Route name='nesting-sources' path='nesting-sources' handler={NestingSources} />
    <Route name='sortable-simple' path='sortable-simple' handler={SortableSimple} />
    <Route name='sortable-stress' path='sortable-stress' handler={SortableStress} />
    <Route name='customize-handles' path='customize-handles' handler={CustomizeHandles} />
    <Route name='customize-effects' path='customize-effects' handler={CustomizeEffects} />
    <Redirect from='/' to='dustbin-simple' />
  </Route>
);

AnimationFrame.shim();

Router.run(routes,
  process.env.NODE_ENV === 'production' ? Router.HashLocation : Router.HistoryLocation,
  (Handler) => React.render(<Handler/>, document.body)
);