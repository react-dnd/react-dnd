'use strict';

var React = require('react'),
    { Routes, Route, Redirect, Link } = require('react-router'),
    DragAroundNaive = require('./_drag-around-naive/index'),
    DragAroundCustom = require('./_drag-around-custom/index'),
    DustbinSimple = require('./_dustbin-simple'),
    DustbinInteresting = require('./_dustbin-interesting'),
    SortableSimple = require('./_sortable-simple');

var App = React.createClass({
  render() {
    var RouteHandler = this.props.activeRouteHandler;

    return (
      <div>
        <h1>react-dnd examples (<a target='_href' href='https://github.com/gaearon/react-dnd/blob/master/examples'>source</a>)</h1>
        <ul>
          <li>Dustbin (<Link to='dustbin-simple'>simple</Link>, <Link to='dustbin-interesting'>interesting</Link>)</li>
          <li>Drag Around (<Link to='drag-around-naive'>naive</Link>, <Link to='drag-around-custom'>custom</Link>)</li>
          <li>Sortable (<Link to='sortable-simple'>simple</Link>, more coming...)</li>
        </ul>
        <hr />
        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Routes location={process.env.NODE_ENV === 'production' ? 'hash' : 'history'}>
    <Route handler={App}>
      <Route name='drag-around-naive' path='drag-around-naive' handler={DragAroundNaive} />
      <Route name='drag-around-custom' path='drag-around-custom' handler={DragAroundCustom} />
      <Route name='dustbin-simple' path='dustbin-simple' handler={DustbinSimple} />
      <Route name='dustbin-interesting' path='dustbin-interesting' handler={DustbinInteresting} />
      <Route name='sortable-simple' path='sortable-simple' handler={SortableSimple} />

      <Redirect from='/' to='dustbin-simple' />
    </Route>
  </Routes>
);

React.render(routes, document.body);