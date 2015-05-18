export default function createTargetConnector(backend) {
  return {
    dropTarget: backend.connectDropTarget.bind(backend)
  };
}