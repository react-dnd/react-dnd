import React, { PropTypes } from 'react';
import BoardSquare from './BoardSquare';
import Knight from './Knight';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

// In a real app, you should use Autoprefixer
let testEl;
function getDisplayFlexValue() {
  if (typeof document === 'undefined') {
    return 'flex';
  }

  if (!testEl) {
    testEl = document.createElement('div');
  }

  testEl.style.display = '-webkit-flex';
  if (testEl.style.display === '-webkit-flex') {
    return '-webkit-flex';
  } else {
    return 'flex';
  }
}

@DragDropContext(HTML5Backend)
export default class Board {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x}
                     y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: getDisplayFlexValue(),
        flexWrap: 'wrap',
        WebkitFlexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}