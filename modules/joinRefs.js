export default function joinRefs(refA, refB) {
  return function (instance) {
    refA(instance);
    refB(instance);
  };
}