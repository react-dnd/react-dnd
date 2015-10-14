export default function createTargetConnector(backend) {
  return {
    dropTarget: function connectDropTarget(...args) {
      return backend.connectDropTarget(...args);
    }
  };
}