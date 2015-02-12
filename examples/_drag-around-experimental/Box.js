/** @jsx React.DOM */
'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    getEmptyImage = require('./getEmptyImage'),
    { PropTypes } = React,
    { DragDropMixin, DropEffects } = require('react-dnd');

var Box = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: PropTypes.any.isRequired,
    isDragFeedback: PropTypes.bool,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      tickTock: false
    };
  },

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ tickTock: !this.state.tickTock });
    }, 200);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  statics: {
    configureDragDrop(registerType) {
      registerType(ItemTypes.BOX, {
        dragSource: {
          beginDrag(component, e) {
            return {
              effectAllowed: DropEffects.MOVE,
              dragPreview: getEmptyImage(),
              item: {
                id: component.props.id,
                children: component.props.children,
                startLeft: component.props.left,
                startTop: component.props.top,
                startClientX: e.clientX,
                startClientY: e.clientY
              }
            };
          }
        }
      });
    }
  },

  render() {
    var { isDragging } = this.getDragState(ItemTypes.BOX),
        { isDragFeedback } = this.props,
        transform = `translate3d(${this.props.left}px, ${this.props.top}px, 0)`;

    return (
      <div {...this.dragSourceFor(ItemTypes.BOX)}
           style={{
            WebkitTransform: transform,
            transform: transform,
            opacity: isDragging ? 0 : 1,
            position: 'absolute',
            backgroundColor: isDragFeedback && this.state.tickTock ? 'yellow' : 'white',
            top: 0,
            left: 0,
            border: '1px dashed gray',
            padding: '0.5rem'
           }}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Box;
