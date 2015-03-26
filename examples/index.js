'use strict';

import React from 'react';
import Router, { Route, Link, Redirect, RouteHandler } from 'react-router';
import DustbinSimple from './_dustbin-simple';
import DustbinInteresting from './_dustbin-interesting';
//import NestingSources from './_nesting-sources';
//import SortableSimple from './_sortable-simple';

/*
DragAroundNaive = require('./_drag-around-naive/index'),
DragAroundCustom = require('./_drag-around-custom/index'),

*/

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>react-dnd examples (<a target='_href' href='https://github.com/gaearon/react-dnd/blob/master/examples'>source</a>)</h1>
        <ul>
          <li>Dustbin (<Link to='dustbin-simple'>simple</Link>, <Link to='dustbin-interesting'>interesting</Link>)</li>
        </ul>
        <hr />
        <RouteHandler />
      </div>
    );
  }
});

/*
<ul>
  <li>Nesting (<Link to='nesting-sources'>drag sources</Link>)</li>
  <li>Sortable (<Link to='sortable-simple'>simple</Link>)</li>
  <li>Drag Around (<Link to='drag-around-naive'>naive</Link>, <Link to='drag-around-custom'>custom</Link>)</li>
</ul>
*/

const routes = (
  <Route handler={App}>
    <Route name='dustbin-simple' path='dustbin-simple' handler={DustbinSimple} />
    <Route name='dustbin-interesting' path='dustbin-interesting' handler={DustbinInteresting} />
    <Redirect from='/' to='dustbin-simple' />
  </Route>
);

/*
<Route name='nesting-sources' path='nesting-sources' handler={NestingSources} />
<Route name='sortable-simple' path='sortable-simple' handler={SortableSimple} />
*/

Router.run(routes,
  process.env.NODE_ENV === 'production' ? Router.HashLocation : Router.HistoryLocation,
  (Handler) => React.render(<Handler/>, document.body)
);
