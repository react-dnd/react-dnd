'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDrop } from 'react-dnd';
import Colors from './Colors';

const style = {
  border: '1px dashed gray',
  height: '12rem',
  width: '12rem',
  padding: '2rem',
  textAlign: 'center'
};

const propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  draggingColor: PropTypes.string,
  lastDroppedColor: PropTypes.string,
  attachDropTarget: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
}

class Target extends Component {
  render() {
    const { canDrop, isOver, draggingColor, lastDroppedColor, attachDropTarget } = this.props;
    const opacity = isOver ? 1 : 0.7;

    let backgroundColor = '#fff';
    switch (draggingColor) {
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    }

    return (
      <div ref={attachDropTarget}
           style={{ ...style, backgroundColor, opacity }}>

        <p>Drop here.</p>

        {!canDrop && lastDroppedColor &&
          <p>Last dropped: {lastDroppedColor}</p>
        }
      </div>
    );
  }
}
Target.propTypes = propTypes;

const DraggableTarget = configureDragDrop(Target, {
  getHandlers(props, register) {
    return {
      colorTarget: register.dropTarget([Colors.YELLOW, Colors.BLUE], {
        drop(props, monitor) {
          props.onDrop(monitor.getItemType());
        }
      })
    }
  },

  getProps(attach, monitor, handlers) {
    return {
      attachDropTarget: (ref) => attach(handlers.colorTarget, ref),
      isOver: monitor.isOver(handlers.colorTarget),
      canDrop: monitor.canDrop(handlers.colorTarget),
      draggingColor: monitor.getItemType()
    };
  }
});

export default class StatefulTarget extends Component {
  constructor(props) {
    super(props);
    this.state = { lastDroppedColor: null };
  }

  render() {
    return <DraggableTarget {...this.props}
                            lastDroppedColor={this.state.lastDroppedColor}
                            onDrop={color => this.handleDrop(color)} />
  }

  handleDrop(color) {
    this.setState({
      lastDroppedColor: color
    });
  }
}