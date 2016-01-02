import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import Box from './Box';

const layerStyles = {
  pointerEvents: 'none', // never receive hover/click events
  zIndex: 100, // keep the preview visible all time
  /* cover the whole page */
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const width = 210;
  const height = 45;
  return {
    position: 'absolute',
    width: width,
    height: height,
    left: x - width / 2,
    top: y - height + 5
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  currentOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging(),
  isOverTargets: (() => {
    const targetIds = monitor.isDragging() ? monitor.getTargetIds() : [];

    for (let i = targetIds.length - 1; i >= 0; i--) {
      if (monitor.isOverTarget(targetIds[i])) {
        return true;
      }
    }
    return false;
  })()
}))
export default class BoxDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    currentOffset: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    isOverTargets: React.PropTypes.bool.isRequired
  };

  render() {
    const { isDragging, isOverTargets } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          <Box>
            {isOverTargets ?
              "I'm over the target :)" :
              "I'm out of the target :("
            }
          </Box>
        </div>
      </div>
    );
  }
}