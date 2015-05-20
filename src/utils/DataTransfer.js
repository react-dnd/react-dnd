export function isTextDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf('Text') > -1 || types.indexOf('text/plain') > -1;
}

export function isUrlDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf('Url') > -1 || types.indexOf('text/uri-list') > -1;
}

export function isFileDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf('Files') > -1;
}