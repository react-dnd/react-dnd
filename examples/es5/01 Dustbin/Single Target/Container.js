var React = require('react'),
    ReactDnD = require('react-dnd'),
    HTML5Backend = require('react-dnd/modules/backends/HTML5'),
    Dustbin = require('./Dustbin'),
    Box = require('./Box');


var Container = React.createClass({
    render: function() {
        return (
            <div>
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    <Dustbin />
                </div>
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    <Box name='Glass' />
                    <Box name='Banana' />
                    <Box name='Paper' />
                </div>
            </div>
        );
    }
});

module.exports = ReactDnD.DragDropContext(HTML5Backend)(Container);
