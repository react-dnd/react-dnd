'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { PropTypes } = React,
    { DragDropMixin } = require('react-dnd');

function makeItem(dropType){
  return (

    React.createClass({
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

      statics: {
        configureDragDrop(registerType) {
          registerType(dropType, {
            dragSource: {
              beginDrag(component) {
                return {
                  item: {
                    name: component.props.name,
                  }
                };
              },

              endDrag(component, didDrop) {
                if (didDrop) {
                  component.setState({
                    hasDropped: true
                  });
                }
              }
            }
          });
        }
      },

      render() {
        var { hasDropped } = this.state,
            { isDragging } = this.getDragState(dropType);

        return (
          <div {...this.dragSourceFor(dropType)}
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
    })
  );
}

module.exports = makeItem;
