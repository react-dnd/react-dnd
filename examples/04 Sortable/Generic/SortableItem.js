import React, {Component, PropTypes} from 'react';
//import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';

const sortableSource = {
  beginDrag(props) {
    return props;
  },

  canDrag(props) {
    return props.enabled;
  },

  endDrag(props) {
    props.onMoveReset();
  }
};

const sortableTarget = {
  canDrop(props, monitor) {
    let isSibling = false;

    React.Children.forEach(props.parentChildren, (child) => {
      if (isSibling) return;
      isSibling = child === monitor.getItem().children;
    });

    return isSibling;
  },

  hover(props, monitor) {
    if (!monitor.canDrop()) return;

    const draggedKey = monitor.getItem().children.props.eventKey;

    if (draggedKey !== props.children.props.eventKey) {
      props.onMove(draggedKey, props.children.props.eventKey);
    } else {
      props.onMoveReset();
    }
  },

  drop(props, monitor) {
    const fromKey = monitor.getItem().children.props.eventKey;
    const toKey = props.children.props.eventKey;
    props.onDrop(fromKey, toKey);

    props.onSort(props, monitor);
  }
};

@DropTarget('SortableItem', sortableTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('SortableItem', sortableSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class SortableItem extends Component {
  static displayName = 'SortableItem';

  static propTypes = {
    children: PropTypes.any,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired,
    onMoveReset: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    parentChildren: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object
    ])
  }

  static defaultProps = {
    onSort: () => {}
  }

  render() {
    if (!this.props.children) return <span/>;

    const {isDragging, connectDragSource, connectDropTarget} = this.props;
    const child = React.Children.only(this.props.children);

    const classes = [
      'ui-sortable-item',
      isDragging ? 'ui-dragging' : null,
      child.props.className
    ];

    return connectDragSource(
      connectDropTarget(
        React.cloneElement(child, {
          className: classes.join(' ')
        })
      )
    );

    // We tried doing this to fix the issue -- but it doesn't work:
    /*
    return React.cloneElement(child, {
      className: classes.join(' '),
      ref: ref: (instance) => connectDragSource(connectDropTarget(findDOMNode(instance)))
    });
    */
  }
}
