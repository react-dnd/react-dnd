/** @jsx React.DOM */
'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { PropTypes } = React,
    { DragDropMixin } = require('react-dnd');

var Item = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      hasDropped: false
    };
  },

  configureDragDrop(registerType) {
    registerType(this.props.type, {
      dragSource: {
        beginDrag() {
          return {
            item: {
              name: this.props.name,
            }
          };
        },

        endDrag(didDrop) {
          if (didDrop) {
            this.setState({
              hasDropped: true
            });
          }
        }
      }
    });
  },

  render() {
    var { type } = this.props,
        { hasDropped } = this.state,
        { isDragging } = this.getDragState(type);

    return (
      <div {...this.dragSourceFor(type)}
           style={{
             border: '1px dashed gray',
             backgroundColor: 'white',
             padding: '0.5rem',
             margin: '0.5rem',
             opacity: isDragging ? 0.4 : 1,
             maxWidth: 80,
             float: 'left'
           }}>

        {hasDropped ?
          <s>{this.props.name}</s> :
          this.props.name
        }

      </div>
    );
  }
});

module.exports = Item;