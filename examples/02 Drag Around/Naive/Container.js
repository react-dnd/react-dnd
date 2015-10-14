import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import ItemTypes from './ItemTypes';
import Box from './Box';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative'
};

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(item.id, left, top);
  }
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.BOX, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Container extends Component {
  static propTypes = {
    hideSourceOnDrag: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' }
      }
    };
  }

  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
  }

  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props;
    const { boxes} = this.state;

    return connectDropTarget(
      <div style={styles}>
        {Object.keys(boxes).map(key => {
          const { left, top, title } = boxes[key];
          return (
            <Box key={key}
                 id={key}
                 left={left}
                 top={top}
                 hideSourceOnDrag={hideSourceOnDrag}>
              {title}
            </Box>
          );
        })}
      </div>
    );
  }
}