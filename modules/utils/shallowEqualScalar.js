import isBoolean from 'lodash/lang/isBoolean';
import isString from 'lodash/lang/isString';
import isNumber from 'lodash/lang/isNumber';
import isFunction from 'lodash/lang/isFunction';

export default function shallowEqualScalar(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var key;
  for (key in objA) {
    if (objA.hasOwnProperty(key) &&
        (!objB.hasOwnProperty(key) ||
          objA[key] !== objB[key] ||
          typeof objA[key] === 'object' ||
          typeof objB[key] === 'object')) {
      return false;
    }
  }

  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
