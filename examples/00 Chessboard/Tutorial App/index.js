import React, { Component } from 'react';
import Board from './Board';
import { observe } from './Game';

/**
 * Unlike the tutorial, export a component so it can be used on the website.
 */
export default class ChessboardTutorialApp extends Component {
  constructor(props) {
    super(props);
    this.unobserve = observe(this.handleChange.bind(this));
  }

  handleChange(knightPosition) {
    const nextState = { knightPosition };
    if (this.state) {
      this.setState(nextState);
    } else {
      this.state = nextState;
    }
  }

  componentWillUnmount() {
    this.unobserve();
  }

  render() {
    const { knightPosition } = this.state;
    return (
      <div>
        <p>
          <b><a href="https://github.com/react-dnd/react-dnd/tree/master/examples/00%20Chessboard/Tutorial%20App">Browse the Source</a></b>
        </p>
        <p>
          This is a sample app you&apos;ll build as you work through the <a href="docs-tutorial.html">tutorial</a>.
        </p>
        <p>
          It illustrates creating the drag sources and the drop targets, using the monitors to query the current drag state, and customizing the drag previews.
        </p>
        <div
          style={{
            width: 500,
            height: 500,
            border: '1px solid gray',
          }}
        >
          <Board knightPosition={knightPosition} />
        </div>
        <p>
          Make sure to check out the <a href="docs-tutorial.html">tutorial</a> for step-by-step instructions on building it!
        </p>
      </div>
    );
  }
}
