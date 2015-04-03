'use strict';

import React, { Component, PropTypes } from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import Colors from './Colors';
import { configureDragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem'
};

const propTypes = {
  color: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  forbidDrag: PropTypes.bool.isRequired,
  onToggleForbidDrag: PropTypes.func.isRequired,
  dragSourceRef: PropTypes.func.isRequired
};

class Source extends Component {
  render() {
    const { color, children, isDragging, dragSourceRef, forbidDrag, onToggleForbidDrag } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    let backgroundColor;
    switch (color) {
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    }

    return (
      <div ref={dragSourceRef}
           style={{ ...style, backgroundColor, opacity }}>
        <input type='checkbox'
               checked={forbidDrag}
               onChange={onToggleForbidDrag}>
          Forbid drag
        </input>

        {children}
      </div>
    );
  }
}
Source.propTypes = propTypes;


const dragSource = {
  canDrag(props) {
    return !props.forbidDrag;
  },

  beginDrag() {
    return { };
  }
};

const DraggableSource = configureDragDrop(Source, {
  configure: (register, props) =>
    register.dragSource(props.color, dragSource),

  inject: (connect, monitor, sourceId) => ({
    dragSourceRef: connect.dragSource(sourceId),
    isDragging: monitor.isDragging(sourceId)
  })
});


export default class StatefulSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forbidDrag: false
    };
  }

  render() {
    return (
      <DraggableSource {...this.props}
                       forbidDrag={this.state.forbidDrag}
                       onToggleForbidDrag={() => this.handleToggleForbidDrag()} />
    );
  }

  handleToggleForbidDrag() {
    this.setState({
      forbidDrag: !this.state.forbidDrag
    });
  }
}