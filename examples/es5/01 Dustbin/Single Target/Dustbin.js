var React = require('react');
var ItemTypes = require('./ItemTypes');
var ReactDnD = require('react-dnd');

var style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left'
};

var boxTarget = {
    drop: function() {
        return { name: 'Dustbin' };
    }
};

var Dustbin = React.createClass({
    propTypes: {
        connectDropTarget: React.PropTypes.func.isRequired,
        isOver: React.PropTypes.bool.isRequired,
        canDrop: React.PropTypes.bool.isRequired
    },
    render: function() {
        var isActive = this.props.canDrop && this.props.isOver;

        var backgroundColor = '#222';
        if (isActive) {
            backgroundColor = 'darkgreen';
        } else if (canDrop) {
            backgroundColor = 'darkkhaki';
        }

        return this.props.connectDropTarget(
            <div style={{ ...style, backgroundColor }}>
            {isActive ? 'Release to drop' : 'Drag a box here'}
            </div>
        );
    }
}

module.exports = ReactDnD.DropTarget(ItemTypes.BOX, boxTarget, function(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
})(Dustbin);
