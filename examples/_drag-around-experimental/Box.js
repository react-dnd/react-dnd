/** @jsx React.DOM */
'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    getEmptyImage = require('./getEmptyImage'),
    { PropTypes } = React,
    { MouseDragDropMixin, DropEffects } = require('react-dnd');

var Box = React.createClass({
  mixins: [MouseDragDropMixin],

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

  configureDragDrop(registerType) {
    registerType(ItemTypes.BOX, {
      dragSource: {
        beginDrag(e) {
          return {
            effectAllowed: DropEffects.MOVE,
            dragPreview: getEmptyImage(),
            item: {
              id: this.props.id,
              children: this.props.children,
              startLeft: this.props.left,
              startTop: this.props.top,
              startClientX: e.clientX,
              startClientY: e.clientY
            }
          };
        }
      }
    });
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