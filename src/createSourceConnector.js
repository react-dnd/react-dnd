export default function createSourceConnector(backend) {
  return {
    dragSource: backend.connectDragSource.bind(backend),
    dragPreview: backend.connectDragPreview.bind(backend)
  };
}