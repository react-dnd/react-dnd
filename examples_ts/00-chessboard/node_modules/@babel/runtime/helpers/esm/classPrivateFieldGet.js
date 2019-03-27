export default function _classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  var descriptor = privateMap.get(receiver);

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}