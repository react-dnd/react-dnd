export default function createSourceConnector(backend) {
  return {
    dragSource: function connectDragSource(...args) {
      return backend.connectDragSource(...args);
    },
    dragPreview: function connectDragPreview(...args) {
      return backend.connectDragPreview(...args);
    }
  };
}