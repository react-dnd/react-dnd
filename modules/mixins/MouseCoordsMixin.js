var EventListener = require('react/lib/EventListener');
var SyntheticMouseEvent = require('react/lib/SyntheticMouseEvent');

var documentListener;
var handlers = [];
var refs = 0;

var mouseEvent = 'mousemove'; // FIXME

var x;
var y;

function handle(nativeEvent) {
  var event = SyntheticMouseEvent.getPooled({}, mouseEvent, nativeEvent);
  try {
    dispatchEvent(event, handlers);
  } finally {
    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
}

function dispatchEvent(event, handlers) {
  x = event.pageX;
  y = event.pageY;

}

module.exports = {
  getMouseCoords: function() {
    return {x: x, y: y};
  },

  componentDidMount: function() {
    refs++;
    if (!documentListener) {
      documentListener = EventListener.listen(document, mouseEvent, handle);
    }
  },

  componentWillUnmount: function() {
    refs--;
    if (!refs) {
      documentListener.remove();
      documentListener = null;
    }
  }
};
