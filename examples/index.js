'use strict';

var React = require('react'),
    Router = require('react-router'),
    { Route, Redirect, Link, RouteHandler } = Router,
    DragAroundNaive = require('./_drag-around-naive/index'),
    DragAroundCustom = require('./_drag-around-custom/index'),
    DustbinSimple = require('./_dustbin-simple'),
    DustbinInteresting = require('./_dustbin-interesting'),
    SortableSimple = require('./_sortable-simple'),
    NestingSources = require('./_nesting-sources');

var App = React.createClass({
  render() {
    return (
      <div>
        <h1>react-dnd examples (<a target='_href' href='https://github.com/gaearon/react-dnd/blob/master/examples'>source</a>)</h1>
        <ul>
          <li>Dustbin (<Link to='dustbin-simple'>simple</Link>, <Link to='dustbin-interesting'>interesting</Link>)</li>
          <li>Drag Around (<Link to='drag-around-naive'>naive</Link>, <Link to='drag-around-custom'>custom</Link>)</li>
          <li>Nesting (<Link to='nesting-sources'>drag sources</Link>)</li>
          <li>Sortable (<Link to='sortable-simple'>simple</Link>)</li>
        </ul>
        <hr />
        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name='drag-around-naive' path='drag-around-naive' handler={DragAroundNaive} />
    <Route name='drag-around-custom' path='drag-around-custom' handler={DragAroundCustom} />
    <Route name='dustbin-simple' path='dustbin-simple' handler={DustbinSimple} />
    <Route name='dustbin-interesting' path='dustbin-interesting' handler={DustbinInteresting} />
    <Route name='nesting-sources' path='nesting-sources' handler={NestingSources} />
    <Route name='sortable-simple' path='sortable-simple' handler={SortableSimple} />
    <Redirect from='/' to='dustbin-simple' />
  </Route>
);

Router.run(routes,
  process.env.NODE_ENV === 'production' ? Router.HashLocation : Router.HistoryLocation,
  (Handler) => React.render(<Handler/>, document.body)
);
