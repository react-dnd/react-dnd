/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @jsx React.DOM */
	'use strict';
	
	// Require Object.assign polyfill to use JSX Spread Attributes syntax
	// See https://gist.github.com/sebmarkbage/07bbe37bc42b6d4aef81
	__webpack_require__(1);
	
	var React = __webpack_require__(7),
	    $__0=       __webpack_require__(9),Routes=$__0.Routes,Route=$__0.Route,Redirect=$__0.Redirect,Link=$__0.Link,
	    DragAroundNaive = __webpack_require__(2),
	    DragAroundCustom = __webpack_require__(3),
	    DustbinSimple = __webpack_require__(4),
	    DustbinInteresting = __webpack_require__(5),
	    SortableSimple = __webpack_require__(6);
	
	var App = React.createClass({displayName: 'App',
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.h1(null, "react-dnd examples (", React.DOM.a({target: "_href", href: "https://github.com/gaearon/react-dnd/blob/master/examples"}, "source"), ")"), 
	        React.DOM.ul(null, 
	          React.DOM.li(null, "Dustbin (", Link({to: "dustbin-simple"}, "simple"), ", ", Link({to: "dustbin-interesting"}, "interesting"), ")"), 
	          React.DOM.li(null, "Drag Around (", Link({to: "drag-around-naive"}, "naive"), ", ", Link({to: "drag-around-custom"}, "custom"), ")"), 
	          React.DOM.li(null, "Sortable (", Link({to: "sortable-simple"}, "simple"), ", more coming...)")
	        ), 
	        React.DOM.hr(null), 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }
	});
	
	var routes = (
	  Routes({location: process.env.NODE_ENV === 'production' ? 'hash' : 'history'}, 
	    Route({handler: App}, 
	      Route({name: "drag-around-naive", path: "drag-around-naive", handler: DragAroundNaive}), 
	      Route({name: "drag-around-custom", path: "drag-around-custom", handler: DragAroundCustom}), 
	      Route({name: "dustbin-simple", path: "dustbin-simple", handler: DustbinSimple}), 
	      Route({name: "dustbin-interesting", path: "dustbin-interesting", handler: DustbinInteresting}), 
	      Route({name: "sortable-simple", path: "sortable-simple", handler: SortableSimple}), 
	
	      Redirect({from: "/", to: "dustbin-simple"})
	    )
	  )
	);
	
	React.renderComponent(routes, document.body);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint ignore:start */
	
	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.es6
	 * @polyfill
	 */
	
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
	
	if (!Object.assign) {
	  Object.assign = function(target, sources) {
	    if (target == null) {
	      throw new TypeError('Object.assign target cannot be null or undefined');
	    }
	
	    var to = Object(target);
	    var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	      var nextSource = arguments[nextIndex];
	      if (nextSource == null) {
	        continue;
	      }
	
	      var from = Object(nextSource);
	
	      // We don't currently support accessors nor proxies. Therefore this
	      // copy cannot throw. If we ever supported this then we must handle
	      // exceptions and side-effects.
	
	      for (var key in from) {
	        if (hasOwnProperty.call(from, key)) {
	          to[key] = from[key];
	        }
	      }
	    }
	
	    return to;
	  };
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    Container = __webpack_require__(10),
	    LinkedStateMixin = __webpack_require__(15),
	    $__0=    __webpack_require__(9),Link=$__0.Link;
	
	var DragAroundNaive = React.createClass({displayName: 'DragAroundNaive',
	  mixins: [LinkedStateMixin],
	
	  getInitialState:function() {
	    return {
	      hideSourceOnDrag: false
	    };
	  },
	
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        Container({hideSourceOnDrag: this.state.hideSourceOnDrag}), 
	        React.DOM.p(null, 
	          React.DOM.input({type: "checkbox", 
	                 checkedLink: this.linkState('hideSourceOnDrag')}, 
	            "Hide source item while dragging"
	          )
	        ), 
	        React.DOM.hr(null), 
	        React.DOM.p(null, 
	          "This example naively relies on browser drag and drop implementation without much custom logic."
	        ), 
	        React.DOM.p(null, 
	          "When element is dragged, we remove its original DOM node and let browser draw the drag preview." + ' ' +
	          "When element is released, we draw an element at the new coordinates." + ' ' +
	          "If you try to drag an item outside the container, browser will animate its return."
	        ), 
	        React.DOM.p(null, 
	          "While this approach works for simple cases, it flickers on drop." + ' ' +
	          "This happens because browser removes drag preview before we have a chance to make dragged item visible." + ' ' +
	          "This might not be a problem if you dim original item instead of hiding it, but it's clearly visible otherwise."
	        ), 
	        React.DOM.p(null, 
	          "If we want to add custom logic such as snapping to grid or bounds checking, we can only do this on drop." + ' ' +
	          "There is no way for us to control what happens to dragged preview once the browser has drawn it."
	        ), 
	        React.DOM.p(null, "Next: ", Link({to: "drag-around-custom"}, "providing custom drag feedback"), ".")
	      )
	    );
	  }
	});
	
	module.exports = DragAroundNaive;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    Container = __webpack_require__(11),
	    LinkedStateMixin = __webpack_require__(15);
	
	var DragAroundCustom = React.createClass({displayName: 'DragAroundCustom',
	  mixins: [LinkedStateMixin],
	
	  getInitialState:function() {
	    return {
	      snapToGrid: false
	    };
	  },
	
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        Container({snapToGrid: this.state.snapToGrid}), 
	        React.DOM.p(null, 
	          React.DOM.input({type: "checkbox", 
	                 checkedLink: this.linkState('snapToGrid')}, 
	            "Snap to grid"
	          )
	        ), 
	        React.DOM.hr(null), 
	        React.DOM.p(null, 
	          "Browser APIs provide no way to change drag preview or its behavior once drag has started." + ' ' +
	          "Libraries such as jQuery UI implement drag and drop from scratch to work around this, but react-dnd" + ' ' +
	          "only supports browser drag and drop “backend” for now, so we have to accept its limitations."
	        ), 
	        React.DOM.p(null, 
	          "We can, however, customize behavior a great deal if we feed the browser an empty image as drag preview," + ' ' +
	          "and move the dragged DOM element itself continuously in response to dragover event."
	        ), 
	        React.DOM.p(null, 
	          "With this approach, we miss out on default “return” animation when dropping outside the container." + ' ' +
	          "However, we get great flexibility in customizing drag feedback and zero flicker."
	        )
	      )
	    );
	  }
	});
	
	module.exports = DragAroundCustom;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    Container = __webpack_require__(12);
	
	var DustbinSimple = React.createClass({displayName: 'DustbinSimple',
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        Container(null), 
	        React.DOM.hr(null), 
	        React.DOM.p(null, 
	          "Drag items on a dropzone. Note that it has different neutral, active (something is being dragged) and hovered states." + ' ' +
	          "Dragged item itself has neutral and dragging states."
	        )
	      )
	    );
	  }
	});
	
	module.exports = DustbinSimple;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    Container = __webpack_require__(13);
	
	var DustbinSorted = React.createClass({displayName: 'DustbinSorted',
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        Container(null), 
	        React.DOM.hr(null), 
	        React.DOM.p(null, 
	          "Several different dustbins can handle several types of items. Note that the last dustbin is special: it can also handle files from your hard drive."
	        )
	      )
	    );
	  }
	});
	
	module.exports = DustbinSorted;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    Container = __webpack_require__(14);
	
	var DustbinSimple = React.createClass({displayName: 'DustbinSimple',
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        Container(null), 
	        React.DOM.hr(null), 
	        React.DOM.p(null
	        )
	      )
	    );
	  }
	});
	
	module.exports = DustbinSimple;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;
	
	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }
	
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	}
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports.DefaultRoute = __webpack_require__(17);
	exports.Link = __webpack_require__(18);
	exports.NotFoundRoute = __webpack_require__(19);
	exports.Redirect = __webpack_require__(20);
	exports.Route = __webpack_require__(21);
	exports.Routes = __webpack_require__(22);
	
	exports.ActiveState = __webpack_require__(23);
	exports.CurrentPath = __webpack_require__(24);
	exports.Navigation = __webpack_require__(25);
	
	exports.renderRoutesToString = __webpack_require__(26).renderRoutesToString;
	exports.renderRoutesToStaticMarkup = __webpack_require__(26).renderRoutesToStaticMarkup;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    update = __webpack_require__(27),
	    ItemTypes = __webpack_require__(28),
	    Box = __webpack_require__(29),
	    $__0=    React,PropTypes=$__0.PropTypes,
	    $__1=     __webpack_require__(38),DragDropMixin=$__1.DragDropMixin,DragDropEffects=$__1.DragDropEffects;
	
	var Container = React.createClass({displayName: 'Container',
	  mixins: [DragDropMixin],
	
	  propTypes: {
	    hideSourceOnDrag: PropTypes.bool.isRequired
	  },
	
	  getInitialState:function() {
	    return {
	      boxes: {
	        'a': { top: 20, left: 80, title: 'Drag me around' },
	        'b': { top: 180, left: 20, title: 'Drag me too' },
	      }
	    };
	  },
	
	  configureDragDrop:function(registerType) {
	    registerType(ItemTypes.BOX, {
	      dropTarget: {
	        acceptDrop:function(item, e) {
	          var left = Math.round(item.startLeft + (e.pageX - item.startPageX)),
	              top = Math.round(item.startTop + (e.pageY - item.startPageY));
	
	          this.moveBox(item.id, left, top);
	        }
	      }
	    });
	  },
	
	  moveBox:function(id, left, top) {
	    var stateUpdate = {
	      boxes: {}
	    };
	
	    stateUpdate.boxes[id] = {
	      $merge: {
	        left: left,
	        top: top
	      }
	    };
	
	    this.setState(update(this.state, stateUpdate));
	  },
	
	  render:function() {
	    return (
	      React.DOM.div(Object.assign({}, this.dropTargetFor(ItemTypes.BOX), 
	           {style: {
	             width: 300,
	             height: 300,
	             border: '1px solid black',
	             position: 'relative'
	           }}), 
	
	        Object.keys(this.state.boxes).map(function(key)  {
	          var box = this.state.boxes[key];
	
	          return (
	            Box({key: key, 
	                 id: key, 
	                 left: box.left, 
	                 top: box.top, 
	                 hideSourceOnDrag: this.props.hideSourceOnDrag}, 
	              box.title
	            )
	          );
	        }.bind(this))
	
	      )
	    );
	  }
	});
	
	module.exports = Container;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    update = __webpack_require__(27),
	    ItemTypes = __webpack_require__(30),
	    Box = __webpack_require__(31),
	    $__0=    React,PropTypes=$__0.PropTypes,
	    $__1=     __webpack_require__(38),DragDropMixin=$__1.DragDropMixin,DragDropEffects=$__1.DragDropEffects;
	
	var Container = React.createClass({displayName: 'Container',
	  mixins: [DragDropMixin],
	
	  propTypes: {
	    snapToGrid: PropTypes.bool.isRequired
	  },
	
	  getInitialState:function() {
	    return {
	      boxes: {
	        'a': { top: 20, left: 80, title: 'Drag me around' },
	        'b': { top: 180, left: 20, title: 'Drag me too' },
	      }
	    };
	  },
	
	  configureDragDrop:function(registerType) {
	    registerType(ItemTypes.BOX, {
	      dropTarget: {
	        over:function(item, e) {
	          var left = Math.round(item.startLeft + (e.pageX - item.startPageX)),
	              top = Math.round(item.startTop + (e.pageY - item.startPageY));
	
	          if (this.props.snapToGrid) {
	            left = Math.round(left / 32) * 32;
	            top = Math.round(top / 32) * 32;
	          }
	
	          this.moveBox(item.id, left, top);
	        }
	      }
	    });
	  },
	
	  moveBox:function(id, left, top) {
	    var stateUpdate = {
	      boxes: {}
	    };
	
	    stateUpdate.boxes[id] = {
	      $merge: {
	        left: left,
	        top: top
	      }
	    };
	
	    this.setState(update(this.state, stateUpdate));
	  },
	
	  render:function() {
	    return (
	      React.DOM.div(Object.assign({}, this.dropTargetFor(ItemTypes.BOX), 
	           {style: {
	             width: 300,
	             height: 300,
	             border: '1px solid black',
	             position: 'relative'
	           }}), 
	
	        Object.keys(this.state.boxes).map(function(key)  {
	          var box = this.state.boxes[key];
	
	          return (
	            Box({key: key, 
	                 id: key, 
	                 left: box.left, 
	                 top: box.top}, 
	              box.title
	            )
	          );
	        }.bind(this))
	
	      )
	    );
	  }
	});
	
	module.exports = Container;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    Dustbin = __webpack_require__(32),
	    Item = __webpack_require__(33);
	
	var Container = React.createClass({displayName: 'Container',
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        Dustbin(null), 
	        React.DOM.div({style: { marginTop: '2rem'}}, 
	          Item({name: "Glass"}), 
	          Item({name: "Banana"}), 
	          Item({name: "Paper"})
	        )
	      )
	    );
	  }
	});
	
	module.exports = Container;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    Dustbin = __webpack_require__(34),
	    Item = __webpack_require__(35),
	    ItemTypes = __webpack_require__(36),
	    $__0=    __webpack_require__(38),NativeDragItemTypes=$__0.NativeDragItemTypes;
	
	var Container = React.createClass({displayName: 'Container',
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.div({style: {minHeight: '14rem'}}, 
	          Dustbin({accepts: [ItemTypes.GLASS]}), 
	          Dustbin({accepts: [ItemTypes.FOOD]}), 
	          Dustbin({accepts: [ItemTypes.PAPER]}), 
	          Dustbin({accepts: [ItemTypes.PAPER, NativeDragItemTypes.FILE]})
	        ), 
	
	        React.DOM.div({style: { minHeight: '2rem'}}, 
	          Item({name: "Glass", type: ItemTypes.GLASS}), 
	          Item({name: "Banana", type: ItemTypes.FOOD}), 
	          Item({name: "Bottle", type: ItemTypes.GLASS}), 
	          Item({name: "Burger", type: ItemTypes.FOOD}), 
	          Item({name: "Paper", type: ItemTypes.PAPER})
	        )
	      )
	    );
	  }
	});
	
	module.exports = Container;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    Card = __webpack_require__(37),
	    update = __webpack_require__(27);
	
	var Container = React.createClass({displayName: 'Container',
	  getInitialState:function() {
	    return {
	      cards: [{
	        id: 1,
	        text: 'Write a cool JS library'
	      }, {
	        id: 2,
	        text: 'Make it generic enough'
	      }, {
	        id: 3,
	        text: 'Write README'
	      }, {
	        id: 4,
	        text: 'Create some examples'
	      }, {
	        id: 5,
	        text: 'Spam in Twitter and IRC to promote it'
	      }, {
	        id: 6,
	        text: '???'
	      }, {
	        id: 7,
	        text: 'PROFIT'
	      }]
	    };
	  },
	
	  moveCard:function(id, afterId) {
	    var card = this.state.cards.filter(function(c)  {return c.id === id;})[0],
	        afterCard = this.state.cards.filter(function(c)  {return c.id === afterId;})[0],
	        cardIndex = this.state.cards.indexOf(card),
	        afterIndex = this.state.cards.indexOf(afterCard);
	
	    var stateUpdate = {
	      cards: {
	        $splice: [
	          [cardIndex, 1],
	          [afterIndex, 0, card]
	        ]
	      }
	    };
	
	    this.setState(update(this.state, stateUpdate));
	  },
	
	  render:function() {
	    return (
	      React.DOM.div(null, 
	        this.state.cards.map(function(card)  {
	          return (
	            Card({key: card.id, 
	                  id: card.id, 
	                  text: card.text, 
	                  moveCard: this.moveCard})
	          );
	        }.bind(this))
	      )
	    );
	  }
	});
	
	module.exports = Container;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule LinkedStateMixin
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var ReactLink = __webpack_require__(39);
	var ReactStateSetters = __webpack_require__(40);
	
	/**
	 * A simple mixin around ReactLink.forState().
	 */
	var LinkedStateMixin = {
	  /**
	   * Create a ReactLink that's linked to part of this component's state. The
	   * ReactLink will have the current value of this.state[key] and will call
	   * setState() when a change is requested.
	   *
	   * @param {string} key state key to update. Note: you may want to use keyOf()
	   * if you're using Google Closure Compiler advanced mode.
	   * @return {ReactLink} ReactLink instance linking to the state.
	   */
	  linkState: function(key) {
	    return new ReactLink(
	      this.state[key],
	      ReactStateSetters.createStateKeySetter(this, key)
	    );
	  }
	};
	
	module.exports = LinkedStateMixin;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule React
	 */
	
	"use strict";
	
	var DOMPropertyOperations = __webpack_require__(41);
	var EventPluginUtils = __webpack_require__(42);
	var ReactChildren = __webpack_require__(43);
	var ReactComponent = __webpack_require__(44);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactContext = __webpack_require__(46);
	var ReactCurrentOwner = __webpack_require__(47);
	var ReactDescriptor = __webpack_require__(48);
	var ReactDOM = __webpack_require__(49);
	var ReactDOMComponent = __webpack_require__(50);
	var ReactDefaultInjection = __webpack_require__(51);
	var ReactInstanceHandles = __webpack_require__(52);
	var ReactMount = __webpack_require__(53);
	var ReactMultiChild = __webpack_require__(54);
	var ReactPerf = __webpack_require__(55);
	var ReactPropTypes = __webpack_require__(56);
	var ReactServerRendering = __webpack_require__(57);
	var ReactTextComponent = __webpack_require__(58);
	
	var onlyChild = __webpack_require__(59);
	var warning = __webpack_require__(60);
	
	ReactDefaultInjection.inject();
	
	// Specifying arguments isn't necessary since we just use apply anyway, but it
	// makes it clear for those actually consuming this API.
	function createDescriptor(type, props, children) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  return type.apply(null, args);
	}
	
	if ("production" !== process.env.NODE_ENV) {
	  var _warnedForDeprecation = false;
	}
	
	var React = {
	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    only: onlyChild
	  },
	  DOM: ReactDOM,
	  PropTypes: ReactPropTypes,
	  initializeTouchEvents: function(shouldUseTouch) {
	    EventPluginUtils.useTouchEvents = shouldUseTouch;
	  },
	  createClass: ReactCompositeComponent.createClass,
	  createDescriptor: function() {
	    if ("production" !== process.env.NODE_ENV) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        _warnedForDeprecation,
	        'React.createDescriptor is deprecated and will be removed in the ' +
	        'next version of React. Use React.createElement instead.'
	      ) : null);
	      _warnedForDeprecation = true;
	    }
	    return createDescriptor.apply(this, arguments);
	  },
	  createElement: createDescriptor,
	  constructAndRenderComponent: ReactMount.constructAndRenderComponent,
	  constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
	  renderComponent: ReactPerf.measure(
	    'React',
	    'renderComponent',
	    ReactMount.renderComponent
	  ),
	  renderComponentToString: ReactServerRendering.renderComponentToString,
	  renderComponentToStaticMarkup:
	    ReactServerRendering.renderComponentToStaticMarkup,
	  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
	  isValidClass: ReactDescriptor.isValidFactory,
	  isValidComponent: ReactDescriptor.isValidDescriptor,
	  withContext: ReactContext.withContext,
	  __internals: {
	    Component: ReactComponent,
	    CurrentOwner: ReactCurrentOwner,
	    DOMComponent: ReactDOMComponent,
	    DOMPropertyOperations: DOMPropertyOperations,
	    InstanceHandles: ReactInstanceHandles,
	    Mount: ReactMount,
	    MultiChild: ReactMultiChild,
	    TextComponent: ReactTextComponent
	  }
	};
	
	if ("production" !== process.env.NODE_ENV) {
	  var ExecutionEnvironment = __webpack_require__(61);
	  if (ExecutionEnvironment.canUseDOM &&
	      window.top === window.self &&
	      navigator.userAgent.indexOf('Chrome') > -1) {
	    console.debug(
	      'Download the React DevTools for a better development experience: ' +
	      'http://fb.me/react-devtools'
	    );
	
	    var expectedFeatures = [
	      // shims
	      Array.isArray,
	      Array.prototype.every,
	      Array.prototype.forEach,
	      Array.prototype.indexOf,
	      Array.prototype.map,
	      Date.now,
	      Function.prototype.bind,
	      Object.keys,
	      String.prototype.split,
	      String.prototype.trim,
	
	      // shams
	      Object.create,
	      Object.freeze
	    ];
	
	    for (var i in expectedFeatures) {
	      if (!expectedFeatures[i]) {
	        console.error(
	          'One or more ES5 shim/shams expected by React are not available: ' +
	          'http://fb.me/react-warning-polyfills'
	        );
	        break;
	      }
	    }
	  }
	}
	
	// Version exists only in the open-source version of React, not in Facebook's
	// internal version.
	React.version = '0.11.2';
	
	module.exports = React;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var merge = __webpack_require__(68);
	var Route = __webpack_require__(21);
	
	/**
	 * A <DefaultRoute> component is a special kind of <Route> that
	 * renders when its parent matches but none of its siblings do.
	 * Only one such route may be used at any given level in the
	 * route hierarchy.
	 */
	function DefaultRoute(props) {
	  return Route(
	    merge(props, {
	      path: null,
	      isDefault: true
	    })
	  );
	}
	
	module.exports = DefaultRoute;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var classSet = __webpack_require__(72);
	var merge = __webpack_require__(68);
	var ActiveState = __webpack_require__(23);
	var Navigation = __webpack_require__(25);
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	/**
	 * <Link> components are used to create an <a> element that links to a route.
	 * When that route is active, the link gets an "active" class name (or the
	 * value of its `activeClassName` prop).
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to="showPost" params={{ postID: "123" }} />
	 *
	 * In addition to params, links may pass along query string parameters
	 * using the `query` prop.
	 *
	 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
	 */
	var Link = React.createClass({
	
	  displayName: 'Link',
	
	  mixins: [ ActiveState, Navigation ],
	
	  propTypes: {
	    activeClassName: React.PropTypes.string.isRequired,
	    to: React.PropTypes.string.isRequired,
	    params: React.PropTypes.object,
	    query: React.PropTypes.object,
	    onClick: React.PropTypes.func
	  },
	
	  getDefaultProps: function () {
	    return {
	      activeClassName: 'active'
	    };
	  },
	
	  handleClick: function (event) {
	    var allowTransition = true;
	    var clickResult;
	
	    if (this.props.onClick)
	      clickResult = this.props.onClick(event);
	
	    if (isModifiedEvent(event) || !isLeftClickEvent(event))
	      return;
	
	    if (clickResult === false || event.defaultPrevented === true)
	      allowTransition = false;
	
	    event.preventDefault();
	
	    if (allowTransition)
	      this.transitionTo(this.props.to, this.props.params, this.props.query);
	  },
	
	  /**
	   * Returns the value of the "href" attribute to use on the DOM element.
	   */
	  getHref: function () {
	    return this.makeHref(this.props.to, this.props.params, this.props.query);
	  },
	
	  /**
	   * Returns the value of the "class" attribute to use on the DOM element, which contains
	   * the value of the activeClassName property when this <Link> is active.
	   */
	  getClassName: function () {
	    var classNames = {};
	
	    if (this.props.className)
	      classNames[this.props.className] = true;
	
	    if (this.isActive(this.props.to, this.props.params, this.props.query))
	      classNames[this.props.activeClassName] = true;
	
	    return classSet(classNames);
	  },
	
	  render: function () {
	    var props = merge(this.props, {
	      href: this.getHref(),
	      className: this.getClassName(),
	      onClick: this.handleClick
	    });
	
	    return React.DOM.a(props, this.props.children);
	  }
	
	});
	
	module.exports = Link;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var merge = __webpack_require__(68);
	var Route = __webpack_require__(21);
	
	/**
	 * A <NotFoundRoute> is a special kind of <Route> that
	 * renders when the beginning of its parent's path matches
	 * but none of its siblings do, including any <DefaultRoute>.
	 * Only one such route may be used at any given level in the
	 * route hierarchy.
	 */
	function NotFoundRoute(props) {
	  return Route(
	    merge(props, {
	      path: null,
	      catchAll: true
	    })
	  );
	}
	
	module.exports = NotFoundRoute;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var Route = __webpack_require__(21);
	
	function createRedirectHandler(to, _params, _query) {
	  return React.createClass({
	    statics: {
	      willTransitionTo: function (transition, params, query) {
	        transition.redirect(to, _params || params, _query || query);
	      }
	    },
	
	    render: function () {
	      return null;
	    }
	  });
	}
	
	/**
	 * A <Redirect> component is a special kind of <Route> that always
	 * redirects to another route when it matches.
	 */
	function Redirect(props) {
	  return Route({
	    name: props.name,
	    path: props.from || props.path || '*',
	    handler: createRedirectHandler(props.to, props.params, props.query)
	  });
	}
	
	module.exports = Redirect;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var withoutProperties = __webpack_require__(73);
	
	/**
	 * A map of <Route> component props that are reserved for use by the
	 * router and/or React. All other props are considered "static" and
	 * are passed through to the route handler.
	 */
	var RESERVED_PROPS = {
	  handler: true,
	  path: true,
	  defaultRoute: true,
	  notFoundRoute: true,
	  paramNames: true,
	  children: true // ReactChildren
	};
	
	/**
	 * <Route> components specify components that are rendered to the page when the
	 * URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is requested,
	 * the tree is searched depth-first to find a route whose path matches the URL.
	 * When one is found, all routes in the tree that lead to it are considered
	 * "active" and their components are rendered into the DOM, nested in the same
	 * order as they are in the tree.
	 *
	 * The preferred way to configure a router is using JSX. The XML-like syntax is
	 * a great way to visualize how routes are laid out in an application.
	 *
	 *   React.renderComponent((
	 *     <Routes handler={App}>
	 *       <Route name="login" handler={Login}/>
	 *       <Route name="logout" handler={Logout}/>
	 *       <Route name="about" handler={About}/>
	 *     </Routes>
	 *   ), document.body);
	 *
	 * If you don't use JSX, you can also assemble a Router programmatically using
	 * the standard React component JavaScript API.
	 *
	 *   React.renderComponent((
	 *     Routes({ handler: App },
	 *       Route({ name: 'login', handler: Login }),
	 *       Route({ name: 'logout', handler: Logout }),
	 *       Route({ name: 'about', handler: About })
	 *     )
	 *   ), document.body);
	 *
	 * Handlers for Route components that contain children can render their active
	 * child route using the activeRouteHandler prop.
	 *
	 *   var App = React.createClass({
	 *     render: function () {
	 *       return (
	 *         <div class="application">
	 *           {this.props.activeRouteHandler()}
	 *         </div>
	 *       );
	 *     }
	 *   });
	 */
	var Route = React.createClass({
	
	  displayName: 'Route',
	
	  statics: {
	
	    getUnreservedProps: function (props) {
	      return withoutProperties(props, RESERVED_PROPS);
	    }
	
	  },
	
	  propTypes: {
	    handler: React.PropTypes.any.isRequired,
	    path: React.PropTypes.string,
	    name: React.PropTypes.string
	  },
	
	  render: function () {
	    throw new Error(
	      'The <Route> component should not be rendered directly. You may be ' +
	      'missing a <Routes> wrapper around your list of routes.'
	    );
	  }
	
	});
	
	module.exports = Route;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var warning = __webpack_require__(60);
	var invariant = __webpack_require__(62);
	var copyProperties = __webpack_require__(63);
	var HashLocation = __webpack_require__(83);
	var ActiveContext = __webpack_require__(74);
	var LocationContext = __webpack_require__(75);
	var RouteContext = __webpack_require__(76);
	var ScrollContext = __webpack_require__(77);
	var reversedArray = __webpack_require__(78);
	var Transition = __webpack_require__(79);
	var Redirect = __webpack_require__(80);
	var Path = __webpack_require__(81);
	var Route = __webpack_require__(21);
	
	function makeMatch(route, params) {
	  return { route: route, params: params };
	}
	
	function getRootMatch(matches) {
	  return matches[matches.length - 1];
	}
	
	function findMatches(path, routes, defaultRoute, notFoundRoute) {
	  var matches = null, route, params;
	
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    route = routes[i];
	
	    // Check the subtree first to find the most deeply-nested match.
	    matches = findMatches(path, route.props.children, route.props.defaultRoute, route.props.notFoundRoute);
	
	    if (matches != null) {
	      var rootParams = getRootMatch(matches).params;
	
	      params = route.props.paramNames.reduce(function (params, paramName) {
	        params[paramName] = rootParams[paramName];
	        return params;
	      }, {});
	
	      matches.unshift(makeMatch(route, params));
	
	      return matches;
	    }
	
	    // No routes in the subtree matched, so check this route.
	    params = Path.extractParams(route.props.path, path);
	
	    if (params)
	      return [ makeMatch(route, params) ];
	  }
	
	  // No routes matched, so try the default route if there is one.
	  if (defaultRoute && (params = Path.extractParams(defaultRoute.props.path, path)))
	    return [ makeMatch(defaultRoute, params) ];
	
	  // Last attempt: does the "not found" route match?
	  if (notFoundRoute && (params = Path.extractParams(notFoundRoute.props.path, path)))
	    return [ makeMatch(notFoundRoute, params) ];
	
	  return matches;
	}
	
	function hasMatch(matches, match) {
	  return matches.some(function (m) {
	    if (m.route !== match.route)
	      return false;
	
	    for (var property in m.params)
	      if (m.params[property] !== match.params[property])
	        return false;
	
	    return true;
	  });
	}
	
	/**
	 * Calls the willTransitionFrom hook of all handlers in the given matches
	 * serially in reverse with the transition object and the current instance of
	 * the route's handler, so that the deepest nested handlers are called first.
	 * Calls callback(error) when finished.
	 */
	function runTransitionFromHooks(matches, transition, callback) {
	  var hooks = reversedArray(matches).map(function (match) {
	    return function () {
	      var handler = match.route.props.handler;
	
	      if (!transition.isAborted && handler.willTransitionFrom)
	        return handler.willTransitionFrom(transition, match.component);
	
	      var promise = transition.promise;
	      delete transition.promise;
	
	      return promise;
	    };
	  });
	
	  runHooks(hooks, callback);
	}
	
	/**
	 * Calls the willTransitionTo hook of all handlers in the given matches
	 * serially with the transition object and any params that apply to that
	 * handler. Calls callback(error) when finished.
	 */
	function runTransitionToHooks(matches, transition, query, callback) {
	  var hooks = matches.map(function (match) {
	    return function () {
	      var handler = match.route.props.handler;
	
	      if (!transition.isAborted && handler.willTransitionTo)
	        handler.willTransitionTo(transition, match.params, query);
	
	      var promise = transition.promise;
	      delete transition.promise;
	
	      return promise;
	    };
	  });
	
	  runHooks(hooks, callback);
	}
	
	/**
	 * Runs all hook functions serially and calls callback(error) when finished.
	 * A hook may return a promise if it needs to execute asynchronously.
	 */
	function runHooks(hooks, callback) {
	  try {
	    var promise = hooks.reduce(function (promise, hook) {
	      // The first hook to use transition.wait makes the rest
	      // of the transition async from that point forward.
	      return promise ? promise.then(hook) : hook();
	    }, null);
	  } catch (error) {
	    return callback(error); // Sync error.
	  }
	
	  if (promise) {
	    // Use setTimeout to break the promise chain.
	    promise.then(function () {
	      setTimeout(callback);
	    }, function (error) {
	      setTimeout(function () {
	        callback(error);
	      });
	    });
	  } else {
	    callback();
	  }
	}
	
	function updateMatchComponents(matches, refs) {
	  var match;
	  for (var i = 0, len = matches.length; i < len; ++i) {
	    match = matches[i];
	    match.component = refs.__activeRoute__;
	
	    if (match.component == null)
	      break; // End of the tree.
	
	    refs = match.component.refs;
	  }
	}
	
	function returnNull() {
	  return null;
	}
	
	function routeIsActive(activeRoutes, routeName) {
	  return activeRoutes.some(function (route) {
	    return route.props.name === routeName;
	  });
	}
	
	function paramsAreActive(activeParams, params) {
	  for (var property in params)
	    if (String(activeParams[property]) !== String(params[property]))
	      return false;
	
	  return true;
	}
	
	function queryIsActive(activeQuery, query) {
	  for (var property in query)
	    if (String(activeQuery[property]) !== String(query[property]))
	      return false;
	
	  return true;
	}
	
	function defaultTransitionErrorHandler(error) {
	  // Throw so we don't silently swallow async errors.
	  throw error; // This error probably originated in a transition hook.
	}
	
	/**
	 * The <Routes> component configures the route hierarchy and renders the
	 * route matching the current location when rendered into a document.
	 *
	 * See the <Route> component for more details.
	 */
	var Routes = React.createClass({
	
	  displayName: 'Routes',
	
	  mixins: [ RouteContext, ActiveContext, LocationContext, ScrollContext ],
	
	  propTypes: {
	    initialPath: React.PropTypes.string,
	    initialMatches: React.PropTypes.array,
	    onChange: React.PropTypes.func,
	    onError: React.PropTypes.func.isRequired
	  },
	
	  getDefaultProps: function () {
	    return {
	      initialPath: null,
	      initialMatches: [],
	      onError: defaultTransitionErrorHandler
	    };
	  },
	
	  getInitialState: function () {
	    return {
	      path: this.props.initialPath,
	      matches: this.props.initialMatches
	    };
	  },
	
	  componentDidMount: function () {
	    warning(
	      this._owner == null,
	      '<Routes> should be rendered directly using React.renderComponent, not ' +
	      'inside some other component\'s render method'
	    );
	
	    if (this._handleStateChange) {
	      this._handleStateChange();
	      delete this._handleStateChange;
	    }
	  },
	
	  componentDidUpdate: function () {
	    if (this._handleStateChange) {
	      this._handleStateChange();
	      delete this._handleStateChange;
	    }
	  },
	
	  /**
	   * Performs a depth-first search for the first route in the tree that matches on
	   * the given path. Returns an array of all routes in the tree leading to the one
	   * that matched in the format { route, params } where params is an object that
	   * contains the URL parameters relevant to that route. Returns null if no route
	   * in the tree matches the path.
	   *
	   *   React.renderComponent(
	   *     <Routes>
	   *       <Route handler={App}>
	   *         <Route name="posts" handler={Posts}/>
	   *         <Route name="post" path="/posts/:id" handler={Post}/>
	   *       </Route>
	   *     </Routes>
	   *   ).match('/posts/123'); => [ { route: <AppRoute>, params: {} },
	   *                               { route: <PostRoute>, params: { id: '123' } } ]
	   */
	  match: function (path) {
	    var routes = this.getRoutes();
	    return findMatches(Path.withoutQuery(path), routes, this.props.defaultRoute, this.props.notFoundRoute);
	  },
	
	  updateLocation: function (path, actionType) {
	    if (this.state.path === path)
	      return; // Nothing to do!
	
	    if (this.state.path)
	      this.recordScroll(this.state.path);
	
	    this.dispatch(path, function (error, abortReason, nextState) {
	      if (error) {
	        this.props.onError.call(this, error);
	      } else if (abortReason instanceof Redirect) {
	        this.replaceWith(abortReason.to, abortReason.params, abortReason.query);
	      } else if (abortReason) {
	        this.goBack();
	      } else {
	        this._handleStateChange = this.handleStateChange.bind(this, path, actionType);
	        this.setState(nextState);
	      }
	    });
	  },
	
	  handleStateChange: function (path, actionType) {
	    updateMatchComponents(this.state.matches, this.refs);
	
	    this.updateScroll(path, actionType);
	
	    if (this.props.onChange)
	      this.props.onChange.call(this);
	  },
	
	  /**
	   * Performs a transition to the given path and calls callback(error, abortReason, nextState)
	   * when the transition is finished. If there was an error, the first argument will not be null.
	   * Otherwise, if the transition was aborted for some reason, it will be given in the second arg.
	   *
	   * In a transition, the router first determines which routes are involved by beginning with the
	   * current route, up the route tree to the first parent route that is shared with the destination
	   * route, and back down the tree to the destination route. The willTransitionFrom hook is invoked
	   * on all route handlers we're transitioning away from, in reverse nesting order. Likewise, the
	   * willTransitionTo hook is invoked on all route handlers we're transitioning to.
	   *
	   * Both willTransitionFrom and willTransitionTo hooks may either abort or redirect the transition.
	   * To resolve asynchronously, they may use transition.wait(promise). If no hooks wait, the
	   * transition will be synchronous.
	   */
	  dispatch: function (path, callback) {
	    var transition = new Transition(this, path);
	    var currentMatches = this.state ? this.state.matches : []; // No state server-side.
	    var nextMatches = this.match(path) || [];
	
	    warning(
	      nextMatches.length,
	      'No route matches path "%s". Make sure you have <Route path="%s"> somewhere in your <Routes>',
	      path, path
	    );
	
	    var fromMatches, toMatches;
	    if (currentMatches.length) {
	      fromMatches = currentMatches.filter(function (match) {
	        return !hasMatch(nextMatches, match);
	      });
	
	      toMatches = nextMatches.filter(function (match) {
	        return !hasMatch(currentMatches, match);
	      });
	    } else {
	      fromMatches = [];
	      toMatches = nextMatches;
	    }
	
	    var callbackScope = this;
	    var query = Path.extractQuery(path) || {};
	
	    runTransitionFromHooks(fromMatches, transition, function (error) {
	      if (error || transition.isAborted)
	        return callback.call(callbackScope, error, transition.abortReason);
	
	      runTransitionToHooks(toMatches, transition, query, function (error) {
	        if (error || transition.isAborted)
	          return callback.call(callbackScope, error, transition.abortReason);
	
	        var matches = currentMatches.slice(0, currentMatches.length - fromMatches.length).concat(toMatches);
	        var rootMatch = getRootMatch(matches);
	        var params = (rootMatch && rootMatch.params) || {};
	        var routes = matches.map(function (match) {
	          return match.route;
	        });
	
	        callback.call(callbackScope, null, null, {
	          path: path,
	          matches: matches,
	          activeRoutes: routes,
	          activeParams: params,
	          activeQuery: query
	        });
	      });
	    });
	  },
	
	  /**
	   * Returns the props that should be used for the top-level route handler.
	   */
	  getHandlerProps: function () {
	    var matches = this.state.matches;
	    var query = this.state.activeQuery;
	    var handler = returnNull;
	    var props = {
	      ref: null,
	      params: null,
	      query: null,
	      activeRouteHandler: handler,
	      key: null
	    };
	
	    reversedArray(matches).forEach(function (match) {
	      var route = match.route;
	
	      props = Route.getUnreservedProps(route.props);
	
	      props.ref = '__activeRoute__';
	      props.params = match.params;
	      props.query = query;
	      props.activeRouteHandler = handler;
	
	      // TODO: Can we remove addHandlerKey?
	      if (route.props.addHandlerKey)
	        props.key = Path.injectParams(route.props.path, match.params);
	
	      handler = function (props, addedProps) {
	        if (arguments.length > 2 && typeof arguments[2] !== 'undefined')
	          throw new Error('Passing children to a route handler is not supported');
	
	        return route.props.handler(
	          copyProperties(props, addedProps)
	        );
	      }.bind(this, props);
	    });
	
	    return props;
	  },
	
	  /**
	   * Returns a reference to the active route handler's component instance.
	   */
	  getActiveComponent: function () {
	    return this.refs.__activeRoute__;
	  },
	
	  /**
	   * Returns the current URL path.
	   */
	  getCurrentPath: function () {
	    return this.state.path;
	  },
	
	  /**
	   * Returns an absolute URL path created from the given route
	   * name, URL parameters, and query values.
	   */
	  makePath: function (to, params, query) {
	    var path;
	    if (Path.isAbsolute(to)) {
	      path = Path.normalize(to);
	    } else {
	      var namedRoutes = this.getNamedRoutes();
	      var route = namedRoutes[to];
	
	      invariant(
	        route,
	        'Unable to find a route named "%s". Make sure you have <Route name="%s"> somewhere in your <Routes>',
	        to, to
	      );
	
	      path = route.props.path;
	    }
	
	    return Path.withQuery(Path.injectParams(path, params), query);
	  },
	
	  /**
	   * Returns a string that may safely be used as the href of a
	   * link to the route with the given name.
	   */
	  makeHref: function (to, params, query) {
	    var path = this.makePath(to, params, query);
	
	    if (this.getLocation() === HashLocation)
	      return '#' + path;
	
	    return path;
	  },
	
	    /**
	   * Transitions to the URL specified in the arguments by pushing
	   * a new URL onto the history stack.
	   */
	  transitionTo: function (to, params, query) {
	    var location = this.getLocation();
	
	    invariant(
	      location,
	      'You cannot use transitionTo without a location'
	    );
	
	    location.push(this.makePath(to, params, query));
	  },
	
	  /**
	   * Transitions to the URL specified in the arguments by replacing
	   * the current URL in the history stack.
	   */
	  replaceWith: function (to, params, query) {
	    var location = this.getLocation();
	
	    invariant(
	      location,
	      'You cannot use replaceWith without a location'
	    );
	
	    location.replace(this.makePath(to, params, query));
	  },
	
	  /**
	   * Transitions to the previous URL.
	   */
	  goBack: function () {
	    var location = this.getLocation();
	
	    invariant(
	      location,
	      'You cannot use goBack without a location'
	    );
	
	    location.pop();
	  },
	
	  /**
	   * Returns true if the given route, params, and query are active.
	   */
	  isActive: function (to, params, query) {
	    if (Path.isAbsolute(to))
	      return to === this.getCurrentPath();
	
	    return routeIsActive(this.getActiveRoutes(), to) &&
	      paramsAreActive(this.getActiveParams(), params) &&
	      (query == null || queryIsActive(this.getActiveQuery(), query));
	  },
	
	  render: function () {
	    var match = this.state.matches[0];
	
	    if (match == null)
	      return null;
	
	    return match.route.props.handler(
	      this.getHandlerProps()
	    );
	  },
	
	  childContextTypes: {
	    currentPath: React.PropTypes.string,
	    makePath: React.PropTypes.func.isRequired,
	    makeHref: React.PropTypes.func.isRequired,
	    transitionTo: React.PropTypes.func.isRequired,
	    replaceWith: React.PropTypes.func.isRequired,
	    goBack: React.PropTypes.func.isRequired,
	    isActive: React.PropTypes.func.isRequired
	  },
	
	  getChildContext: function () {
	    return {
	      currentPath: this.getCurrentPath(),
	      makePath: this.makePath,
	      makeHref: this.makeHref,
	      transitionTo: this.transitionTo,
	      replaceWith: this.replaceWith,
	      goBack: this.goBack,
	      isActive: this.isActive
	    };
	  }
	
	});
	
	module.exports = Routes;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	
	/**
	 * A mixin for components that need to know the routes, URL
	 * params and query that are currently active.
	 *
	 * Example:
	 *
	 *   var AboutLink = React.createClass({
	 *     mixins: [ Router.ActiveState ],
	 *     render: function () {
	 *       var className = this.props.className;
	 *   
	 *       if (this.isActive('about'))
	 *         className += ' is-active';
	 *   
	 *       return React.DOM.a({ className: className }, this.props.children);
	 *     }
	 *   });
	 */
	var ActiveState = {
	
	  contextTypes: {
	    activeRoutes: React.PropTypes.array.isRequired,
	    activeParams: React.PropTypes.object.isRequired,
	    activeQuery: React.PropTypes.object.isRequired,
	    isActive: React.PropTypes.func.isRequired
	  },
	
	  /**
	   * Returns an array of the routes that are currently active.
	   */
	  getActiveRoutes: function () {
	    return this.context.activeRoutes;
	  },
	
	  /**
	   * Returns an object of the URL params that are currently active.
	   */
	  getActiveParams: function () {
	    return this.context.activeParams;
	  },
	
	  /**
	   * Returns an object of the query params that are currently active.
	   */
	  getActiveQuery: function () {
	    return this.context.activeQuery;
	  },
	
	  /**
	   * A helper method to determine if a given route, params, and query
	   * are active.
	   */
	  isActive: function (to, params, query) {
	    return this.context.isActive(to, params, query);
	  }
	
	};
	
	module.exports = ActiveState;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	
	/**
	 * A mixin for components that need to know the current URL path.
	 *
	 * Example:
	 *
	 *   var ShowThePath = React.createClass({
	 *     mixins: [ Router.CurrentPath ],
	 *     render: function () {
	 *       return (
	 *         <div>The current path is: {this.getCurrentPath()}</div>
	 *       );
	 *     }
	 *   });
	 */
	var CurrentPath = {
	
	  contextTypes: {
	    currentPath: React.PropTypes.string.isRequired
	  },
	
	  /**
	   * Returns the current URL path.
	   */
	  getCurrentPath: function () {
	    return this.context.currentPath;
	  }
	
	};
	
	module.exports = CurrentPath;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	
	/**
	 * A mixin for components that modify the URL.
	 */
	var Navigation = {
	
	  contextTypes: {
	    makePath: React.PropTypes.func.isRequired,
	    makeHref: React.PropTypes.func.isRequired,
	    transitionTo: React.PropTypes.func.isRequired,
	    replaceWith: React.PropTypes.func.isRequired,
	    goBack: React.PropTypes.func.isRequired
	  },
	
	  /**
	   * Returns an absolute URL path created from the given route
	   * name, URL parameters, and query values.
	   */
	  makePath: function (to, params, query) {
	    return this.context.makePath(to, params, query);
	  },
	
	  /**
	   * Returns a string that may safely be used as the href of a
	   * link to the route with the given name.
	   */
	  makeHref: function (to, params, query) {
	    return this.context.makeHref(to, params, query);
	  },
	
	  /**
	   * Transitions to the URL specified in the arguments by pushing
	   * a new URL onto the history stack.
	   */
	  transitionTo: function (to, params, query) {
	    this.context.transitionTo(to, params, query);
	  },
	
	  /**
	   * Transitions to the URL specified in the arguments by replacing
	   * the current URL in the history stack.
	   */
	  replaceWith: function (to, params, query) {
	    this.context.replaceWith(to, params, query);
	  },
	
	  /**
	   * Transitions to the previous URL.
	   */
	  goBack: function () {
	    this.context.goBack();
	  }
	
	};
	
	module.exports = Navigation;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var ReactDescriptor = __webpack_require__(48);
	var ReactInstanceHandles = __webpack_require__(52);
	var ReactMarkupChecksum = __webpack_require__(70);
	var ReactServerRenderingTransaction = __webpack_require__(71);
	
	var cloneWithProps = __webpack_require__(82);
	var copyProperties = __webpack_require__(63);
	var instantiateReactComponent = __webpack_require__(69);
	var invariant = __webpack_require__(62);
	
	function cloneRoutesForServerRendering(routes) {
	  return cloneWithProps(routes, {
	    location: 'none',
	    scrollBehavior: 'none'
	  });
	}
	
	function mergeStateIntoInitialProps(state, props) {
	  copyProperties(props, {
	    initialPath: state.path,
	    initialMatches: state.matches,
	    initialActiveRoutes: state.activeRoutes,
	    initialActiveParams: state.activeParams,
	    initialActiveQuery: state.activeQuery
	  });
	}
	
	/**
	 * Renders a <Routes> component to a string of HTML at the given URL
	 * path and calls callback(error, abortReason, html) when finished.
	 *
	 * If there was an error during the transition, it is passed to the
	 * callback. Otherwise, if the transition was aborted for some reason,
	 * it is given in the abortReason argument (with the exception of
	 * internal redirects which are transparently handled for you).
	 *
	 * TODO: <NotFoundRoute> should be handled specially so servers know
	 * to use a 404 status code.
	 */
	function renderRoutesToString(routes, path, callback) {
	  invariant(
	    ReactDescriptor.isValidDescriptor(routes),
	    'You must pass a valid ReactComponent to renderRoutesToString'
	  );
	
	  var component = instantiateReactComponent(
	    cloneRoutesForServerRendering(routes)
	  );
	
	  component.dispatch(path, function (error, abortReason, nextState) {
	    if (error || abortReason)
	      return callback(error, abortReason);
	
	    mergeStateIntoInitialProps(nextState, component.props);
	
	    var transaction;
	    try {
	      var id = ReactInstanceHandles.createReactRootID();
	      transaction = ReactServerRenderingTransaction.getPooled(false);
	
	      transaction.perform(function () {
	        var markup = component.mountComponent(id, transaction, 0);
	        callback(null, null, ReactMarkupChecksum.addChecksumToMarkup(markup));
	      }, null);
	    } finally {
	      ReactServerRenderingTransaction.release(transaction);
	    }
	  });
	}
	
	/**
	 * Renders a <Routes> component to static markup at the given URL
	 * path and calls callback(error, abortReason, markup) when finished.
	 */
	function renderRoutesToStaticMarkup(routes, path, callback) {
	  invariant(
	    ReactDescriptor.isValidDescriptor(routes),
	    'You must pass a valid ReactComponent to renderRoutesToStaticMarkup'
	  );
	
	  var component = instantiateReactComponent(
	    cloneRoutesForServerRendering(routes)
	  );
	
	  component.dispatch(path, function (error, abortReason, nextState) {
	    if (error || abortReason)
	      return callback(error, abortReason);
	
	    mergeStateIntoInitialProps(nextState, component.props);
	
	    var transaction;
	    try {
	      var id = ReactInstanceHandles.createReactRootID();
	      transaction = ReactServerRenderingTransaction.getPooled(false);
	
	      transaction.perform(function () {
	        callback(null, null, component.mountComponent(id, transaction, 0));
	      }, null);
	    } finally {
	      ReactServerRenderingTransaction.release(transaction);
	    }
	  });
	}
	
	module.exports = {
	  renderRoutesToString: renderRoutesToString,
	  renderRoutesToStaticMarkup: renderRoutesToStaticMarkup
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule update
	 */
	
	"use strict";
	
	var copyProperties = __webpack_require__(63);
	var keyOf = __webpack_require__(64);
	var invariant = __webpack_require__(62);
	
	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return copyProperties(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}
	
	var COMMAND_PUSH = keyOf({$push: null});
	var COMMAND_UNSHIFT = keyOf({$unshift: null});
	var COMMAND_SPLICE = keyOf({$splice: null});
	var COMMAND_SET = keyOf({$set: null});
	var COMMAND_MERGE = keyOf({$merge: null});
	var COMMAND_APPLY = keyOf({$apply: null});
	
	var ALL_COMMANDS_LIST = [
	  COMMAND_PUSH,
	  COMMAND_UNSHIFT,
	  COMMAND_SPLICE,
	  COMMAND_SET,
	  COMMAND_MERGE,
	  COMMAND_APPLY
	];
	
	var ALL_COMMANDS_SET = {};
	
	ALL_COMMANDS_LIST.forEach(function(command) {
	  ALL_COMMANDS_SET[command] = true;
	});
	
	function invariantArrayCase(value, spec, command) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    Array.isArray(value),
	    'update(): expected target of %s to be an array; got %s.',
	    command,
	    value
	  ) : invariant(Array.isArray(value)));
	  var specValue = spec[command];
	  ("production" !== process.env.NODE_ENV ? invariant(
	    Array.isArray(specValue),
	    'update(): expected spec of %s to be an array; got %s. ' +
	    'Did you forget to wrap your parameter in an array?',
	    command,
	    specValue
	  ) : invariant(Array.isArray(specValue)));
	}
	
	function update(value, spec) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    typeof spec === 'object',
	    'update(): You provided a key path to update() that did not contain one ' +
	    'of %s. Did you forget to include {%s: ...}?',
	    ALL_COMMANDS_LIST.join(', '),
	    COMMAND_SET
	  ) : invariant(typeof spec === 'object'));
	
	  if (spec.hasOwnProperty(COMMAND_SET)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Object.keys(spec).length === 1,
	      'Cannot have more than one key in an object with %s',
	      COMMAND_SET
	    ) : invariant(Object.keys(spec).length === 1));
	
	    return spec[COMMAND_SET];
	  }
	
	  var nextValue = shallowCopy(value);
	
	  if (spec.hasOwnProperty(COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    ("production" !== process.env.NODE_ENV ? invariant(
	      mergeObj && typeof mergeObj === 'object',
	      'update(): %s expects a spec of type \'object\'; got %s',
	      COMMAND_MERGE,
	      mergeObj
	    ) : invariant(mergeObj && typeof mergeObj === 'object'));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      nextValue && typeof nextValue === 'object',
	      'update(): %s expects a target of type \'object\'; got %s',
	      COMMAND_MERGE,
	      nextValue
	    ) : invariant(nextValue && typeof nextValue === 'object'));
	    copyProperties(nextValue, spec[COMMAND_MERGE]);
	  }
	
	  if (spec.hasOwnProperty(COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function(item) {
	      nextValue.push(item);
	    });
	  }
	
	  if (spec.hasOwnProperty(COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function(item) {
	      nextValue.unshift(item);
	    });
	  }
	
	  if (spec.hasOwnProperty(COMMAND_SPLICE)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Array.isArray(value),
	      'Expected %s target to be an array; got %s',
	      COMMAND_SPLICE,
	      value
	    ) : invariant(Array.isArray(value)));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Array.isArray(spec[COMMAND_SPLICE]),
	      'update(): expected spec of %s to be an array of arrays; got %s. ' +
	      'Did you forget to wrap your parameters in an array?',
	      COMMAND_SPLICE,
	      spec[COMMAND_SPLICE]
	    ) : invariant(Array.isArray(spec[COMMAND_SPLICE])));
	    spec[COMMAND_SPLICE].forEach(function(args) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        Array.isArray(args),
	        'update(): expected spec of %s to be an array of arrays; got %s. ' +
	        'Did you forget to wrap your parameters in an array?',
	        COMMAND_SPLICE,
	        spec[COMMAND_SPLICE]
	      ) : invariant(Array.isArray(args)));
	      nextValue.splice.apply(nextValue, args);
	    });
	  }
	
	  if (spec.hasOwnProperty(COMMAND_APPLY)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      typeof spec[COMMAND_APPLY] === 'function',
	      'update(): expected spec of %s to be a function; got %s.',
	      COMMAND_APPLY,
	      spec[COMMAND_APPLY]
	    ) : invariant(typeof spec[COMMAND_APPLY] === 'function'));
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }
	
	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }
	
	  return nextValue;
	}
	
	module.exports = update;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  BOX: 'box'
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    ItemTypes = __webpack_require__(28),
	    $__0=    React,PropTypes=$__0.PropTypes,
	    $__1=     __webpack_require__(38),DragDropMixin=$__1.DragDropMixin,DragDropEffects=$__1.DragDropEffects;
	
	var Box = React.createClass({displayName: 'Box',
	  mixins: [DragDropMixin],
	
	  propTypes: {
	    id: PropTypes.any.isRequired,
	    left: PropTypes.number.isRequired,
	    top: PropTypes.number.isRequired,
	    hideSourceOnDrag: PropTypes.bool.isRequired
	  },
	
	  configureDragDrop:function(registerType) {
	    registerType(ItemTypes.BOX, {
	      dragSource: {
	        beginDrag:function(e) {
	          return {
	            effectAllowed: DragDropEffects.MOVE,
	            item: {
	              id: this.props.id,
	              startLeft: this.props.left,
	              startTop: this.props.top,
	              startPageX: e.pageX,
	              startPageY: e.pageY
	            }
	          };
	        }
	      }
	    });
	  },
	
	  render:function() {
	    var $__0=    this.getDragState(ItemTypes.BOX),isDragging=$__0.isDragging,
	        $__1=    this.props,hideSourceOnDrag=$__1.hideSourceOnDrag;
	
	    if (isDragging && hideSourceOnDrag) {
	      return null;
	    }
	
	    return (
	      React.DOM.div(Object.assign({}, this.dragSourceFor(ItemTypes.BOX), 
	           {style: {
	            position: 'absolute',
	            left: this.props.left,
	            top: this.props.top,
	            border: '1px dashed gray',
	            padding: '0.5rem'
	           }}), 
	        this.props.children
	      )
	    );
	  }
	});
	
	module.exports = Box;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  BOX: 'box'
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    ItemTypes = __webpack_require__(30),
	    getEmptyImage = __webpack_require__(65),
	    $__0=    React,PropTypes=$__0.PropTypes,
	    $__1=     __webpack_require__(38),DragDropMixin=$__1.DragDropMixin,DragDropEffects=$__1.DragDropEffects;
	
	var Box = React.createClass({displayName: 'Box',
	  mixins: [DragDropMixin],
	
	  propTypes: {
	    id: PropTypes.any.isRequired,
	    left: PropTypes.number.isRequired,
	    top: PropTypes.number.isRequired
	  },
	
	  configureDragDrop:function(registerType) {
	    registerType(ItemTypes.BOX, {
	      dragSource: {
	        beginDrag:function(e) {
	          return {
	            effectAllowed: DragDropEffects.MOVE,
	            dragPreview: getEmptyImage(),
	            item: {
	              id: this.props.id,
	              startLeft: this.props.left,
	              startTop: this.props.top,
	              startPageX: e.pageX,
	              startPageY: e.pageY
	            }
	          };
	        }
	      }
	    });
	  },
	
	  render:function() {
	    var $__0=    this.getDragState(ItemTypes.BOX),isDragging=$__0.isDragging,
	        transform = ("translate3d(" + this.props.left + "px, " + this.props.top + "px, 0)");
	
	    return (
	      React.DOM.div(Object.assign({}, this.dragSourceFor(ItemTypes.BOX), 
	           {style: {
	            WebkitTransform: transform,
	            transform: transform,
	            opacity: isDragging ? 0.8 : 1,
	            position: 'absolute',
	            top: 0,
	            left: 0,
	            border: '1px dashed gray',
	            padding: '0.5rem'
	           }}), 
	        this.props.children
	      )
	    );
	  }
	});
	
	module.exports = Box;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    ItemTypes = __webpack_require__(66),
	    $__0=    __webpack_require__(38),DragDropMixin=$__0.DragDropMixin;
	
	var Dustbin = React.createClass({displayName: 'Dustbin',
	  mixins: [DragDropMixin],
	
	  configureDragDrop:function(registerType) {
	    registerType(ItemTypes.ITEM, {
	      dropTarget: {
	        acceptDrop:function(item) {
	          window.alert('You dropped ' + item.name + '!');
	        }
	      }
	    });
	  },
	
	  render:function() {
	    var dropState = this.getDropState(ItemTypes.ITEM),
	        backgroundColor = '#222';
	
	    if (dropState.isHovering) {
	      backgroundColor = 'darkgreen';
	    } else if (dropState.isDragging) {
	      backgroundColor = 'darkkhaki';
	    }
	
	    return (
	      React.DOM.div(Object.assign({}, this.dropTargetFor(ItemTypes.ITEM), 
	           {style: {
	             height: '12rem',
	             width: '12rem',
	             color: 'white',
	             backgroundColor: backgroundColor,
	             padding: '2rem',
	             textAlign: 'center'
	           }}), 
	
	        dropState.isHovering ?
	          'Release to drop' :
	          'Drag item here'
	        
	      )
	    );
	  }
	});
	
	module.exports = Dustbin;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    ItemTypes = __webpack_require__(66),
	    $__0=    React,PropTypes=$__0.PropTypes,
	    $__1=    __webpack_require__(38),DragDropMixin=$__1.DragDropMixin;
	
	var Item = React.createClass({displayName: 'Item',
	  mixins: [DragDropMixin],
	
	  propTypes: {
	    name: PropTypes.string.isRequired
	  },
	
	  configureDragDrop:function(registerType) {
	    registerType(ItemTypes.ITEM, {
	      dragSource: {
	        beginDrag:function() {
	          return {
	            item: {
	              name: this.props.name
	            }
	          };
	        }
	      }
	    });
	  },
	
	  render:function() {
	    var $__0=    this.getDragState(ItemTypes.ITEM),isDragging=$__0.isDragging;
	
	    return (
	      React.DOM.div(Object.assign({}, this.dragSourceFor(ItemTypes.ITEM), 
	           {style: {
	             border: '1px dashed gray',
	             backgroundColor: 'white',
	             padding: '0.5rem',
	             margin: '0.5rem',
	             opacity: isDragging ? 0.4 : 1,
	             maxWidth: 80
	           }}), 
	        this.props.name
	      )
	    );
	  }
	});
	
	module.exports = Item;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    ItemTypes = __webpack_require__(36),
	    $__0=    __webpack_require__(38),DragDropMixin=$__0.DragDropMixin,
	    $__1=    React,PropTypes=$__1.PropTypes;
	
	var Dustbin = React.createClass({displayName: 'Dustbin',
	  mixins: [DragDropMixin],
	
	  propTypes: {
	    accepts: PropTypes.array.isRequired
	  },
	
	  getInitialState:function() {
	    return {
	      lastDroppedItem: null
	    };
	  },
	
	  configureDragDrop:function(registerType) {
	    var dropTarget = {
	      acceptDrop:function(item) {
	        this.setState({
	          lastDroppedItem: item
	        });
	      }
	    };
	
	    this.props.accepts.forEach(function(itemType)  {
	      registerType(itemType, {
	        dropTarget: dropTarget
	      });
	    });
	  },
	
	  render:function() {
	    var types = this.props.accepts,
	        dropStates = types.map(this.getDropState),
	        backgroundColor = '#222';
	
	    if (dropStates.some(function(s)  {return s.isHovering;})) {
	      backgroundColor = 'darkgreen';
	    } else if (dropStates.some(function(s)  {return s.isDragging;})) {
	      backgroundColor = 'darkkhaki';
	    }
	
	    return (
	      React.DOM.div(Object.assign({}, this.dropTargetFor.apply(this, types), 
	           {style: {
	             height: '12rem',
	             width: '12rem',
	             color: 'white',
	             backgroundColor: backgroundColor,
	             padding: '2rem',
	             margin: '0.5rem',
	             textAlign: 'center',
	             float: 'left'
	           }}), 
	
	        dropStates.some(function(s)  {return s.isHovering;}) ?
	          'Release to drop' :
	          'This dustbin accepts: ' + this.props.accepts.join(', '), 
	        
	
	        this.state.lastDroppedItem &&
	          React.DOM.p(null, "Last dropped: ", JSON.stringify(this.state.lastDroppedItem))
	        
	      )
	    );
	  }
	});
	
	module.exports = Dustbin;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    ItemTypes = __webpack_require__(36),
	    $__0=    React,PropTypes=$__0.PropTypes,
	    $__1=    __webpack_require__(38),DragDropMixin=$__1.DragDropMixin;
	
	var Item = React.createClass({displayName: 'Item',
	  mixins: [DragDropMixin],
	
	  propTypes: {
	    type: PropTypes.string.isRequired,
	    name: PropTypes.string.isRequired
	  },
	
	  getInitialState:function() {
	    return {
	      hasDropped: false
	    };
	  },
	
	  configureDragDrop:function(registerType) {
	    registerType(this.props.type, {
	      dragSource: {
	        beginDrag:function() {
	          return {
	            item: {
	              name: this.props.name,
	            }
	          };
	        },
	
	        endDrag:function(didDrop) {
	          if (didDrop) {
	            this.setState({
	              hasDropped: true
	            });
	          }
	        }
	      }
	    });
	  },
	
	  render:function() {
	    var $__0=    this.props,type=$__0.type,
	        $__1=    this.state,hasDropped=$__1.hasDropped,
	        $__2=    this.getDragState(type),isDragging=$__2.isDragging;
	
	    return (
	      React.DOM.div(Object.assign({}, this.dragSourceFor(type), 
	           {style: {
	             border: '1px dashed gray',
	             backgroundColor: 'white',
	             padding: '0.5rem',
	             margin: '0.5rem',
	             opacity: isDragging ? 0.4 : 1,
	             maxWidth: 80,
	             float: 'left'
	           }}), 
	
	        hasDropped ?
	          React.DOM.s(null, this.props.name) :
	          this.props.name
	        
	
	      )
	    );
	  }
	});
	
	module.exports = Item;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  FOOD: 'food',
	  GLASS: 'glass',
	  PAPER: 'paper'
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(7),
	    ItemTypes = __webpack_require__(67),
	    $__0=    React,PropTypes=$__0.PropTypes,
	    $__1=    __webpack_require__(38),DragDropMixin=$__1.DragDropMixin;
	
	var Card = React.createClass({displayName: 'Card',
	  mixins: [DragDropMixin],
	
	  propTypes: {
	    id: PropTypes.any.isRequired,
	    text: PropTypes.string.isRequired,
	    moveCard: PropTypes.func.isRequired
	  },
	
	  configureDragDrop:function(registerType) {
	    registerType(ItemTypes.ITEM, {
	      dragSource: {
	        beginDrag:function() {
	          return {
	            item: {
	              id: this.props.id
	            }
	          };
	        }
	      },
	
	      dropTarget: {
	        over:function(item) {
	          this.props.moveCard(item.id, this.props.id);
	        }
	      }
	    });
	  },
	
	  render:function() {
	    var $__0=    this.getDragState(ItemTypes.ITEM),isDragging=$__0.isDragging;
	
	    return (
	      React.DOM.div(Object.assign({}, this.dragSourceFor(ItemTypes.ITEM), this.dropTargetFor(ItemTypes.ITEM), 
	           {style: {
	             border: '1px dashed gray',
	             backgroundColor: 'white',
	             padding: '0.5rem',
	             margin: '0.5rem',
	             opacity: isDragging ? 0 : 1
	           }}), 
	        this.props.text
	      )
	    );
	  }
	});
	
	module.exports = Card;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  DragDropMixin: __webpack_require__(138),
	  ImagePreloaderMixin: __webpack_require__(139),
	  HorizontalDragAnchors: __webpack_require__(140),
	  VerticalDragAnchors: __webpack_require__(141),
	  NativeDragItemTypes: __webpack_require__(142),
	  DragDropEffects: __webpack_require__(143)
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactLink
	 * @typechecks static-only
	 */
	
	"use strict";
	
	/**
	 * ReactLink encapsulates a common pattern in which a component wants to modify
	 * a prop received from its parent. ReactLink allows the parent to pass down a
	 * value coupled with a callback that, when invoked, expresses an intent to
	 * modify that value. For example:
	 *
	 * React.createClass({
	 *   getInitialState: function() {
	 *     return {value: ''};
	 *   },
	 *   render: function() {
	 *     var valueLink = new ReactLink(this.state.value, this._handleValueChange);
	 *     return <input valueLink={valueLink} />;
	 *   },
	 *   this._handleValueChange: function(newValue) {
	 *     this.setState({value: newValue});
	 *   }
	 * });
	 *
	 * We have provided some sugary mixins to make the creation and
	 * consumption of ReactLink easier; see LinkedValueUtils and LinkedStateMixin.
	 */
	
	var React = __webpack_require__(16);
	
	/**
	 * @param {*} value current value of the link
	 * @param {function} requestChange callback to request a change
	 */
	function ReactLink(value, requestChange) {
	  this.value = value;
	  this.requestChange = requestChange;
	}
	
	/**
	 * Creates a PropType that enforces the ReactLink API and optionally checks the
	 * type of the value being passed inside the link. Example:
	 *
	 * MyComponent.propTypes = {
	 *   tabIndexLink: ReactLink.PropTypes.link(React.PropTypes.number)
	 * }
	 */
	function createLinkTypeChecker(linkType) {
	  var shapes = {
	    value: typeof linkType === 'undefined' ?
	      React.PropTypes.any.isRequired :
	      linkType.isRequired,
	    requestChange: React.PropTypes.func.isRequired
	  };
	  return React.PropTypes.shape(shapes);
	}
	
	ReactLink.PropTypes = {
	  link: createLinkTypeChecker
	};
	
	module.exports = ReactLink;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactStateSetters
	 */
	
	"use strict";
	
	var ReactStateSetters = {
	  /**
	   * Returns a function that calls the provided function, and uses the result
	   * of that to set the component's state.
	   *
	   * @param {ReactCompositeComponent} component
	   * @param {function} funcReturningState Returned callback uses this to
	   *                                      determine how to update state.
	   * @return {function} callback that when invoked uses funcReturningState to
	   *                    determined the object literal to setState.
	   */
	  createStateSetter: function(component, funcReturningState) {
	    return function(a, b, c, d, e, f) {
	      var partialState = funcReturningState.call(component, a, b, c, d, e, f);
	      if (partialState) {
	        component.setState(partialState);
	      }
	    };
	  },
	
	  /**
	   * Returns a single-argument callback that can be used to update a single
	   * key in the component's state.
	   *
	   * Note: this is memoized function, which makes it inexpensive to call.
	   *
	   * @param {ReactCompositeComponent} component
	   * @param {string} key The key in the state that you should update.
	   * @return {function} callback of 1 argument which calls setState() with
	   *                    the provided keyName and callback argument.
	   */
	  createStateKeySetter: function(component, key) {
	    // Memoize the setters.
	    var cache = component.__keySetters || (component.__keySetters = {});
	    return cache[key] || (cache[key] = createStateKeySetter(component, key));
	  }
	};
	
	function createStateKeySetter(component, key) {
	  // Partial state is allocated outside of the function closure so it can be
	  // reused with every call, avoiding memory allocation when this function
	  // is called.
	  var partialState = {};
	  return function stateKeySetter(value) {
	    partialState[key] = value;
	    component.setState(partialState);
	  };
	}
	
	ReactStateSetters.Mixin = {
	  /**
	   * Returns a function that calls the provided function, and uses the result
	   * of that to set the component's state.
	   *
	   * For example, these statements are equivalent:
	   *
	   *   this.setState({x: 1});
	   *   this.createStateSetter(function(xValue) {
	   *     return {x: xValue};
	   *   })(1);
	   *
	   * @param {function} funcReturningState Returned callback uses this to
	   *                                      determine how to update state.
	   * @return {function} callback that when invoked uses funcReturningState to
	   *                    determined the object literal to setState.
	   */
	  createStateSetter: function(funcReturningState) {
	    return ReactStateSetters.createStateSetter(this, funcReturningState);
	  },
	
	  /**
	   * Returns a single-argument callback that can be used to update a single
	   * key in the component's state.
	   *
	   * For example, these statements are equivalent:
	   *
	   *   this.setState({x: 1});
	   *   this.createStateKeySetter('x')(1);
	   *
	   * Note: this is memoized function, which makes it inexpensive to call.
	   *
	   * @param {string} key The key in the state that you should update.
	   * @return {function} callback of 1 argument which calls setState() with
	   *                    the provided keyName and callback argument.
	   */
	  createStateKeySetter: function(key) {
	    return ReactStateSetters.createStateKeySetter(this, key);
	  }
	};
	
	module.exports = ReactStateSetters;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DOMPropertyOperations
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var DOMProperty = __webpack_require__(84);
	
	var escapeTextForBrowser = __webpack_require__(85);
	var memoizeStringOnly = __webpack_require__(86);
	var warning = __webpack_require__(60);
	
	function shouldIgnoreValue(name, value) {
	  return value == null ||
	    (DOMProperty.hasBooleanValue[name] && !value) ||
	    (DOMProperty.hasNumericValue[name] && isNaN(value)) ||
	    (DOMProperty.hasPositiveNumericValue[name] && (value < 1)) ||
	    (DOMProperty.hasOverloadedBooleanValue[name] && value === false);
	}
	
	var processAttributeNameAndPrefix = memoizeStringOnly(function(name) {
	  return escapeTextForBrowser(name) + '="';
	});
	
	if ("production" !== process.env.NODE_ENV) {
	  var reactProps = {
	    children: true,
	    dangerouslySetInnerHTML: true,
	    key: true,
	    ref: true
	  };
	  var warnedProperties = {};
	
	  var warnUnknownProperty = function(name) {
	    if (reactProps.hasOwnProperty(name) && reactProps[name] ||
	        warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
	      return;
	    }
	
	    warnedProperties[name] = true;
	    var lowerCasedName = name.toLowerCase();
	
	    // data-* attributes should be lowercase; suggest the lowercase version
	    var standardName = (
	      DOMProperty.isCustomAttribute(lowerCasedName) ?
	        lowerCasedName :
	      DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ?
	        DOMProperty.getPossibleStandardName[lowerCasedName] :
	        null
	    );
	
	    // For now, only warn when we have a suggested correction. This prevents
	    // logging too much when using transferPropsTo.
	    ("production" !== process.env.NODE_ENV ? warning(
	      standardName == null,
	      'Unknown DOM property ' + name + '. Did you mean ' + standardName + '?'
	    ) : null);
	
	  };
	}
	
	/**
	 * Operations for dealing with DOM properties.
	 */
	var DOMPropertyOperations = {
	
	  /**
	   * Creates markup for the ID property.
	   *
	   * @param {string} id Unescaped ID.
	   * @return {string} Markup string.
	   */
	  createMarkupForID: function(id) {
	    return processAttributeNameAndPrefix(DOMProperty.ID_ATTRIBUTE_NAME) +
	      escapeTextForBrowser(id) + '"';
	  },
	
	  /**
	   * Creates markup for a property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {?string} Markup string, or null if the property was invalid.
	   */
	  createMarkupForProperty: function(name, value) {
	    if (DOMProperty.isStandardName.hasOwnProperty(name) &&
	        DOMProperty.isStandardName[name]) {
	      if (shouldIgnoreValue(name, value)) {
	        return '';
	      }
	      var attributeName = DOMProperty.getAttributeName[name];
	      if (DOMProperty.hasBooleanValue[name] ||
	          (DOMProperty.hasOverloadedBooleanValue[name] && value === true)) {
	        return escapeTextForBrowser(attributeName);
	      }
	      return processAttributeNameAndPrefix(attributeName) +
	        escapeTextForBrowser(value) + '"';
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      if (value == null) {
	        return '';
	      }
	      return processAttributeNameAndPrefix(name) +
	        escapeTextForBrowser(value) + '"';
	    } else if ("production" !== process.env.NODE_ENV) {
	      warnUnknownProperty(name);
	    }
	    return null;
	  },
	
	  /**
	   * Sets the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   * @param {*} value
	   */
	  setValueForProperty: function(node, name, value) {
	    if (DOMProperty.isStandardName.hasOwnProperty(name) &&
	        DOMProperty.isStandardName[name]) {
	      var mutationMethod = DOMProperty.getMutationMethod[name];
	      if (mutationMethod) {
	        mutationMethod(node, value);
	      } else if (shouldIgnoreValue(name, value)) {
	        this.deleteValueForProperty(node, name);
	      } else if (DOMProperty.mustUseAttribute[name]) {
	        node.setAttribute(DOMProperty.getAttributeName[name], '' + value);
	      } else {
	        var propName = DOMProperty.getPropertyName[name];
	        if (!DOMProperty.hasSideEffects[name] || node[propName] !== value) {
	          node[propName] = value;
	        }
	      }
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      if (value == null) {
	        node.removeAttribute(name);
	      } else {
	        node.setAttribute(name, '' + value);
	      }
	    } else if ("production" !== process.env.NODE_ENV) {
	      warnUnknownProperty(name);
	    }
	  },
	
	  /**
	   * Deletes the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   */
	  deleteValueForProperty: function(node, name) {
	    if (DOMProperty.isStandardName.hasOwnProperty(name) &&
	        DOMProperty.isStandardName[name]) {
	      var mutationMethod = DOMProperty.getMutationMethod[name];
	      if (mutationMethod) {
	        mutationMethod(node, undefined);
	      } else if (DOMProperty.mustUseAttribute[name]) {
	        node.removeAttribute(DOMProperty.getAttributeName[name]);
	      } else {
	        var propName = DOMProperty.getPropertyName[name];
	        var defaultValue = DOMProperty.getDefaultValueForProperty(
	          node.nodeName,
	          propName
	        );
	        if (!DOMProperty.hasSideEffects[name] ||
	            node[propName] !== defaultValue) {
	          node[propName] = defaultValue;
	        }
	      }
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      node.removeAttribute(name);
	    } else if ("production" !== process.env.NODE_ENV) {
	      warnUnknownProperty(name);
	    }
	  }
	
	};
	
	module.exports = DOMPropertyOperations;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventPluginUtils
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Injected dependencies:
	 */
	
	/**
	 * - `Mount`: [required] Module that can convert between React dom IDs and
	 *   actual node references.
	 */
	var injection = {
	  Mount: null,
	  injectMount: function(InjectedMount) {
	    injection.Mount = InjectedMount;
	    if ("production" !== process.env.NODE_ENV) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        InjectedMount && InjectedMount.getNode,
	        'EventPluginUtils.injection.injectMount(...): Injected Mount module ' +
	        'is missing getNode.'
	      ) : invariant(InjectedMount && InjectedMount.getNode));
	    }
	  }
	};
	
	var topLevelTypes = EventConstants.topLevelTypes;
	
	function isEndish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseUp ||
	         topLevelType === topLevelTypes.topTouchEnd ||
	         topLevelType === topLevelTypes.topTouchCancel;
	}
	
	function isMoveish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseMove ||
	         topLevelType === topLevelTypes.topTouchMove;
	}
	function isStartish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseDown ||
	         topLevelType === topLevelTypes.topTouchStart;
	}
	
	
	var validateEventDispatches;
	if ("production" !== process.env.NODE_ENV) {
	  validateEventDispatches = function(event) {
	    var dispatchListeners = event._dispatchListeners;
	    var dispatchIDs = event._dispatchIDs;
	
	    var listenersIsArr = Array.isArray(dispatchListeners);
	    var idsIsArr = Array.isArray(dispatchIDs);
	    var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
	    var listenersLen = listenersIsArr ?
	      dispatchListeners.length :
	      dispatchListeners ? 1 : 0;
	
	    ("production" !== process.env.NODE_ENV ? invariant(
	      idsIsArr === listenersIsArr && IDsLen === listenersLen,
	      'EventPluginUtils: Invalid `event`.'
	    ) : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
	  };
	}
	
	/**
	 * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
	 * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
	 * kept separate to conserve memory.
	 */
	function forEachEventDispatch(event, cb) {
	  var dispatchListeners = event._dispatchListeners;
	  var dispatchIDs = event._dispatchIDs;
	  if ("production" !== process.env.NODE_ENV) {
	    validateEventDispatches(event);
	  }
	  if (Array.isArray(dispatchListeners)) {
	    for (var i = 0; i < dispatchListeners.length; i++) {
	      if (event.isPropagationStopped()) {
	        break;
	      }
	      // Listeners and IDs are two parallel arrays that are always in sync.
	      cb(event, dispatchListeners[i], dispatchIDs[i]);
	    }
	  } else if (dispatchListeners) {
	    cb(event, dispatchListeners, dispatchIDs);
	  }
	}
	
	/**
	 * Default implementation of PluginModule.executeDispatch().
	 * @param {SyntheticEvent} SyntheticEvent to handle
	 * @param {function} Application-level callback
	 * @param {string} domID DOM id to pass to the callback.
	 */
	function executeDispatch(event, listener, domID) {
	  event.currentTarget = injection.Mount.getNode(domID);
	  var returnValue = listener(event, domID);
	  event.currentTarget = null;
	  return returnValue;
	}
	
	/**
	 * Standard/simple iteration through an event's collected dispatches.
	 */
	function executeDispatchesInOrder(event, executeDispatch) {
	  forEachEventDispatch(event, executeDispatch);
	  event._dispatchListeners = null;
	  event._dispatchIDs = null;
	}
	
	/**
	 * Standard/simple iteration through an event's collected dispatches, but stops
	 * at the first dispatch execution returning true, and returns that id.
	 *
	 * @return id of the first dispatch execution who's listener returns true, or
	 * null if no listener returned true.
	 */
	function executeDispatchesInOrderStopAtTrueImpl(event) {
	  var dispatchListeners = event._dispatchListeners;
	  var dispatchIDs = event._dispatchIDs;
	  if ("production" !== process.env.NODE_ENV) {
	    validateEventDispatches(event);
	  }
	  if (Array.isArray(dispatchListeners)) {
	    for (var i = 0; i < dispatchListeners.length; i++) {
	      if (event.isPropagationStopped()) {
	        break;
	      }
	      // Listeners and IDs are two parallel arrays that are always in sync.
	      if (dispatchListeners[i](event, dispatchIDs[i])) {
	        return dispatchIDs[i];
	      }
	    }
	  } else if (dispatchListeners) {
	    if (dispatchListeners(event, dispatchIDs)) {
	      return dispatchIDs;
	    }
	  }
	  return null;
	}
	
	/**
	 * @see executeDispatchesInOrderStopAtTrueImpl
	 */
	function executeDispatchesInOrderStopAtTrue(event) {
	  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
	  event._dispatchIDs = null;
	  event._dispatchListeners = null;
	  return ret;
	}
	
	/**
	 * Execution of a "direct" dispatch - there must be at most one dispatch
	 * accumulated on the event or it is considered an error. It doesn't really make
	 * sense for an event with multiple dispatches (bubbled) to keep track of the
	 * return values at each dispatch execution, but it does tend to make sense when
	 * dealing with "direct" dispatches.
	 *
	 * @return The return value of executing the single dispatch.
	 */
	function executeDirectDispatch(event) {
	  if ("production" !== process.env.NODE_ENV) {
	    validateEventDispatches(event);
	  }
	  var dispatchListener = event._dispatchListeners;
	  var dispatchID = event._dispatchIDs;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !Array.isArray(dispatchListener),
	    'executeDirectDispatch(...): Invalid `event`.'
	  ) : invariant(!Array.isArray(dispatchListener)));
	  var res = dispatchListener ?
	    dispatchListener(event, dispatchID) :
	    null;
	  event._dispatchListeners = null;
	  event._dispatchIDs = null;
	  return res;
	}
	
	/**
	 * @param {SyntheticEvent} event
	 * @return {bool} True iff number of dispatches accumulated is greater than 0.
	 */
	function hasDispatches(event) {
	  return !!event._dispatchListeners;
	}
	
	/**
	 * General utilities that are useful in creating custom Event Plugins.
	 */
	var EventPluginUtils = {
	  isEndish: isEndish,
	  isMoveish: isMoveish,
	  isStartish: isStartish,
	
	  executeDirectDispatch: executeDirectDispatch,
	  executeDispatch: executeDispatch,
	  executeDispatchesInOrder: executeDispatchesInOrder,
	  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
	  hasDispatches: hasDispatches,
	  injection: injection,
	  useTouchEvents: false
	};
	
	module.exports = EventPluginUtils;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactChildren
	 */
	
	"use strict";
	
	var PooledClass = __webpack_require__(88);
	
	var traverseAllChildren = __webpack_require__(89);
	var warning = __webpack_require__(60);
	
	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var threeArgumentPooler = PooledClass.threeArgumentPooler;
	
	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.forEachFunction = forEachFunction;
	  this.forEachContext = forEachContext;
	}
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
	
	function forEachSingleChild(traverseContext, child, name, i) {
	  var forEachBookKeeping = traverseContext;
	  forEachBookKeeping.forEachFunction.call(
	    forEachBookKeeping.forEachContext, child, i);
	}
	
	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc.
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	
	  var traverseContext =
	    ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}
	
	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, mapFunction, mapContext) {
	  this.mapResult = mapResult;
	  this.mapFunction = mapFunction;
	  this.mapContext = mapContext;
	}
	PooledClass.addPoolingTo(MapBookKeeping, threeArgumentPooler);
	
	function mapSingleChildIntoContext(traverseContext, child, name, i) {
	  var mapBookKeeping = traverseContext;
	  var mapResult = mapBookKeeping.mapResult;
	
	  var keyUnique = !mapResult.hasOwnProperty(name);
	  ("production" !== process.env.NODE_ENV ? warning(
	    keyUnique,
	    'ReactChildren.map(...): Encountered two children with the same key, ' +
	    '`%s`. Child keys must be unique; when two children share a key, only ' +
	    'the first child will be used.',
	    name
	  ) : null);
	
	  if (keyUnique) {
	    var mappedChild =
	      mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext, child, i);
	    mapResult[name] = mappedChild;
	  }
	}
	
	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * TODO: This may likely break any calls to `ReactChildren.map` that were
	 * previously relying on the fact that we guarded against null children.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} mapFunction.
	 * @param {*} mapContext Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	
	  var mapResult = {};
	  var traverseContext = MapBookKeeping.getPooled(mapResult, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	  return mapResult;
	}
	
	function forEachSingleChildDummy(traverseContext, child, name, i) {
	  return null;
	}
	
	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}
	
	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  count: countChildren
	};
	
	module.exports = ReactChildren;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactComponent
	 */
	
	"use strict";
	
	var ReactDescriptor = __webpack_require__(48);
	var ReactOwner = __webpack_require__(90);
	var ReactUpdates = __webpack_require__(91);
	
	var invariant = __webpack_require__(62);
	var keyMirror = __webpack_require__(92);
	var merge = __webpack_require__(68);
	
	/**
	 * Every React component is in one of these life cycles.
	 */
	var ComponentLifeCycle = keyMirror({
	  /**
	   * Mounted components have a DOM node representation and are capable of
	   * receiving new props.
	   */
	  MOUNTED: null,
	  /**
	   * Unmounted components are inactive and cannot receive new props.
	   */
	  UNMOUNTED: null
	});
	
	var injected = false;
	
	/**
	 * Optionally injectable environment dependent cleanup hook. (server vs.
	 * browser etc). Example: A browser system caches DOM nodes based on component
	 * ID and must remove that cache entry when this instance is unmounted.
	 *
	 * @private
	 */
	var unmountIDFromEnvironment = null;
	
	/**
	 * The "image" of a component tree, is the platform specific (typically
	 * serialized) data that represents a tree of lower level UI building blocks.
	 * On the web, this "image" is HTML markup which describes a construction of
	 * low level `div` and `span` nodes. Other platforms may have different
	 * encoding of this "image". This must be injected.
	 *
	 * @private
	 */
	var mountImageIntoNode = null;
	
	/**
	 * Components are the basic units of composition in React.
	 *
	 * Every component accepts a set of keyed input parameters known as "props" that
	 * are initialized by the constructor. Once a component is mounted, the props
	 * can be mutated using `setProps` or `replaceProps`.
	 *
	 * Every component is capable of the following operations:
	 *
	 *   `mountComponent`
	 *     Initializes the component, renders markup, and registers event listeners.
	 *
	 *   `receiveComponent`
	 *     Updates the rendered DOM nodes to match the given component.
	 *
	 *   `unmountComponent`
	 *     Releases any resources allocated by this component.
	 *
	 * Components can also be "owned" by other components. Being owned by another
	 * component means being constructed by that component. This is different from
	 * being the child of a component, which means having a DOM representation that
	 * is a child of the DOM representation of that component.
	 *
	 * @class ReactComponent
	 */
	var ReactComponent = {
	
	  injection: {
	    injectEnvironment: function(ReactComponentEnvironment) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !injected,
	        'ReactComponent: injectEnvironment() can only be called once.'
	      ) : invariant(!injected));
	      mountImageIntoNode = ReactComponentEnvironment.mountImageIntoNode;
	      unmountIDFromEnvironment =
	        ReactComponentEnvironment.unmountIDFromEnvironment;
	      ReactComponent.BackendIDOperations =
	        ReactComponentEnvironment.BackendIDOperations;
	      injected = true;
	    }
	  },
	
	  /**
	   * @internal
	   */
	  LifeCycle: ComponentLifeCycle,
	
	  /**
	   * Injected module that provides ability to mutate individual properties.
	   * Injected into the base class because many different subclasses need access
	   * to this.
	   *
	   * @internal
	   */
	  BackendIDOperations: null,
	
	  /**
	   * Base functionality for every ReactComponent constructor. Mixed into the
	   * `ReactComponent` prototype, but exposed statically for easy access.
	   *
	   * @lends {ReactComponent.prototype}
	   */
	  Mixin: {
	
	    /**
	     * Checks whether or not this component is mounted.
	     *
	     * @return {boolean} True if mounted, false otherwise.
	     * @final
	     * @protected
	     */
	    isMounted: function() {
	      return this._lifeCycleState === ComponentLifeCycle.MOUNTED;
	    },
	
	    /**
	     * Sets a subset of the props.
	     *
	     * @param {object} partialProps Subset of the next props.
	     * @param {?function} callback Called after props are updated.
	     * @final
	     * @public
	     */
	    setProps: function(partialProps, callback) {
	      // Merge with the pending descriptor if it exists, otherwise with existing
	      // descriptor props.
	      var descriptor = this._pendingDescriptor || this._descriptor;
	      this.replaceProps(
	        merge(descriptor.props, partialProps),
	        callback
	      );
	    },
	
	    /**
	     * Replaces all of the props.
	     *
	     * @param {object} props New props.
	     * @param {?function} callback Called after props are updated.
	     * @final
	     * @public
	     */
	    replaceProps: function(props, callback) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        this.isMounted(),
	        'replaceProps(...): Can only update a mounted component.'
	      ) : invariant(this.isMounted()));
	      ("production" !== process.env.NODE_ENV ? invariant(
	        this._mountDepth === 0,
	        'replaceProps(...): You called `setProps` or `replaceProps` on a ' +
	        'component with a parent. This is an anti-pattern since props will ' +
	        'get reactively updated when rendered. Instead, change the owner\'s ' +
	        '`render` method to pass the correct value as props to the component ' +
	        'where it is created.'
	      ) : invariant(this._mountDepth === 0));
	      // This is a deoptimized path. We optimize for always having a descriptor.
	      // This creates an extra internal descriptor.
	      this._pendingDescriptor = ReactDescriptor.cloneAndReplaceProps(
	        this._pendingDescriptor || this._descriptor,
	        props
	      );
	      ReactUpdates.enqueueUpdate(this, callback);
	    },
	
	    /**
	     * Schedule a partial update to the props. Only used for internal testing.
	     *
	     * @param {object} partialProps Subset of the next props.
	     * @param {?function} callback Called after props are updated.
	     * @final
	     * @internal
	     */
	    _setPropsInternal: function(partialProps, callback) {
	      // This is a deoptimized path. We optimize for always having a descriptor.
	      // This creates an extra internal descriptor.
	      var descriptor = this._pendingDescriptor || this._descriptor;
	      this._pendingDescriptor = ReactDescriptor.cloneAndReplaceProps(
	        descriptor,
	        merge(descriptor.props, partialProps)
	      );
	      ReactUpdates.enqueueUpdate(this, callback);
	    },
	
	    /**
	     * Base constructor for all React components.
	     *
	     * Subclasses that override this method should make sure to invoke
	     * `ReactComponent.Mixin.construct.call(this, ...)`.
	     *
	     * @param {ReactDescriptor} descriptor
	     * @internal
	     */
	    construct: function(descriptor) {
	      // This is the public exposed props object after it has been processed
	      // with default props. The descriptor's props represents the true internal
	      // state of the props.
	      this.props = descriptor.props;
	      // Record the component responsible for creating this component.
	      // This is accessible through the descriptor but we maintain an extra
	      // field for compatibility with devtools and as a way to make an
	      // incremental update. TODO: Consider deprecating this field.
	      this._owner = descriptor._owner;
	
	      // All components start unmounted.
	      this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;
	
	      // See ReactUpdates.
	      this._pendingCallbacks = null;
	
	      // We keep the old descriptor and a reference to the pending descriptor
	      // to track updates.
	      this._descriptor = descriptor;
	      this._pendingDescriptor = null;
	    },
	
	    /**
	     * Initializes the component, renders markup, and registers event listeners.
	     *
	     * NOTE: This does not insert any nodes into the DOM.
	     *
	     * Subclasses that override this method should make sure to invoke
	     * `ReactComponent.Mixin.mountComponent.call(this, ...)`.
	     *
	     * @param {string} rootID DOM ID of the root node.
	     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	     * @param {number} mountDepth number of components in the owner hierarchy.
	     * @return {?string} Rendered markup to be inserted into the DOM.
	     * @internal
	     */
	    mountComponent: function(rootID, transaction, mountDepth) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !this.isMounted(),
	        'mountComponent(%s, ...): Can only mount an unmounted component. ' +
	        'Make sure to avoid storing components between renders or reusing a ' +
	        'single component instance in multiple places.',
	        rootID
	      ) : invariant(!this.isMounted()));
	      var props = this._descriptor.props;
	      if (props.ref != null) {
	        var owner = this._descriptor._owner;
	        ReactOwner.addComponentAsRefTo(this, props.ref, owner);
	      }
	      this._rootNodeID = rootID;
	      this._lifeCycleState = ComponentLifeCycle.MOUNTED;
	      this._mountDepth = mountDepth;
	      // Effectively: return '';
	    },
	
	    /**
	     * Releases any resources allocated by `mountComponent`.
	     *
	     * NOTE: This does not remove any nodes from the DOM.
	     *
	     * Subclasses that override this method should make sure to invoke
	     * `ReactComponent.Mixin.unmountComponent.call(this)`.
	     *
	     * @internal
	     */
	    unmountComponent: function() {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        this.isMounted(),
	        'unmountComponent(): Can only unmount a mounted component.'
	      ) : invariant(this.isMounted()));
	      var props = this.props;
	      if (props.ref != null) {
	        ReactOwner.removeComponentAsRefFrom(this, props.ref, this._owner);
	      }
	      unmountIDFromEnvironment(this._rootNodeID);
	      this._rootNodeID = null;
	      this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;
	    },
	
	    /**
	     * Given a new instance of this component, updates the rendered DOM nodes
	     * as if that instance was rendered instead.
	     *
	     * Subclasses that override this method should make sure to invoke
	     * `ReactComponent.Mixin.receiveComponent.call(this, ...)`.
	     *
	     * @param {object} nextComponent Next set of properties.
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    receiveComponent: function(nextDescriptor, transaction) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        this.isMounted(),
	        'receiveComponent(...): Can only update a mounted component.'
	      ) : invariant(this.isMounted()));
	      this._pendingDescriptor = nextDescriptor;
	      this.performUpdateIfNecessary(transaction);
	    },
	
	    /**
	     * If `_pendingDescriptor` is set, update the component.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    performUpdateIfNecessary: function(transaction) {
	      if (this._pendingDescriptor == null) {
	        return;
	      }
	      var prevDescriptor = this._descriptor;
	      var nextDescriptor = this._pendingDescriptor;
	      this._descriptor = nextDescriptor;
	      this.props = nextDescriptor.props;
	      this._owner = nextDescriptor._owner;
	      this._pendingDescriptor = null;
	      this.updateComponent(transaction, prevDescriptor);
	    },
	
	    /**
	     * Updates the component's currently mounted representation.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @param {object} prevDescriptor
	     * @internal
	     */
	    updateComponent: function(transaction, prevDescriptor) {
	      var nextDescriptor = this._descriptor;
	
	      // If either the owner or a `ref` has changed, make sure the newest owner
	      // has stored a reference to `this`, and the previous owner (if different)
	      // has forgotten the reference to `this`. We use the descriptor instead
	      // of the public this.props because the post processing cannot determine
	      // a ref. The ref conceptually lives on the descriptor.
	
	      // TODO: Should this even be possible? The owner cannot change because
	      // it's forbidden by shouldUpdateReactComponent. The ref can change
	      // if you swap the keys of but not the refs. Reconsider where this check
	      // is made. It probably belongs where the key checking and
	      // instantiateReactComponent is done.
	
	      if (nextDescriptor._owner !== prevDescriptor._owner ||
	          nextDescriptor.props.ref !== prevDescriptor.props.ref) {
	        if (prevDescriptor.props.ref != null) {
	          ReactOwner.removeComponentAsRefFrom(
	            this, prevDescriptor.props.ref, prevDescriptor._owner
	          );
	        }
	        // Correct, even if the owner is the same, and only the ref has changed.
	        if (nextDescriptor.props.ref != null) {
	          ReactOwner.addComponentAsRefTo(
	            this,
	            nextDescriptor.props.ref,
	            nextDescriptor._owner
	          );
	        }
	      }
	    },
	
	    /**
	     * Mounts this component and inserts it into the DOM.
	     *
	     * @param {string} rootID DOM ID of the root node.
	     * @param {DOMElement} container DOM element to mount into.
	     * @param {boolean} shouldReuseMarkup If true, do not insert markup
	     * @final
	     * @internal
	     * @see {ReactMount.renderComponent}
	     */
	    mountComponentIntoNode: function(rootID, container, shouldReuseMarkup) {
	      var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
	      transaction.perform(
	        this._mountComponentIntoNode,
	        this,
	        rootID,
	        container,
	        transaction,
	        shouldReuseMarkup
	      );
	      ReactUpdates.ReactReconcileTransaction.release(transaction);
	    },
	
	    /**
	     * @param {string} rootID DOM ID of the root node.
	     * @param {DOMElement} container DOM element to mount into.
	     * @param {ReactReconcileTransaction} transaction
	     * @param {boolean} shouldReuseMarkup If true, do not insert markup
	     * @final
	     * @private
	     */
	    _mountComponentIntoNode: function(
	        rootID,
	        container,
	        transaction,
	        shouldReuseMarkup) {
	      var markup = this.mountComponent(rootID, transaction, 0);
	      mountImageIntoNode(markup, container, shouldReuseMarkup);
	    },
	
	    /**
	     * Checks if this component is owned by the supplied `owner` component.
	     *
	     * @param {ReactComponent} owner Component to check.
	     * @return {boolean} True if `owners` owns this component.
	     * @final
	     * @internal
	     */
	    isOwnedBy: function(owner) {
	      return this._owner === owner;
	    },
	
	    /**
	     * Gets another component, that shares the same owner as this one, by ref.
	     *
	     * @param {string} ref of a sibling Component.
	     * @return {?ReactComponent} the actual sibling Component.
	     * @final
	     * @internal
	     */
	    getSiblingByRef: function(ref) {
	      var owner = this._owner;
	      if (!owner || !owner.refs) {
	        return null;
	      }
	      return owner.refs[ref];
	    }
	  }
	};
	
	module.exports = ReactComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactCompositeComponent
	 */
	
	"use strict";
	
	var ReactComponent = __webpack_require__(44);
	var ReactContext = __webpack_require__(46);
	var ReactCurrentOwner = __webpack_require__(47);
	var ReactDescriptor = __webpack_require__(48);
	var ReactDescriptorValidator = __webpack_require__(93);
	var ReactEmptyComponent = __webpack_require__(94);
	var ReactErrorUtils = __webpack_require__(95);
	var ReactOwner = __webpack_require__(90);
	var ReactPerf = __webpack_require__(55);
	var ReactPropTransferer = __webpack_require__(96);
	var ReactPropTypeLocations = __webpack_require__(97);
	var ReactPropTypeLocationNames = __webpack_require__(98);
	var ReactUpdates = __webpack_require__(91);
	
	var instantiateReactComponent = __webpack_require__(69);
	var invariant = __webpack_require__(62);
	var keyMirror = __webpack_require__(92);
	var merge = __webpack_require__(68);
	var mixInto = __webpack_require__(99);
	var monitorCodeUse = __webpack_require__(100);
	var mapObject = __webpack_require__(101);
	var shouldUpdateReactComponent = __webpack_require__(102);
	var warning = __webpack_require__(60);
	
	/**
	 * Policies that describe methods in `ReactCompositeComponentInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base ReactCompositeComponent class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});
	
	
	var injectedMixins = [];
	
	/**
	 * Composite components are higher-level components that compose other composite
	 * or native components.
	 *
	 * To create a new type of `ReactCompositeComponent`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactCompositeComponentInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will available on the prototype.
	 *
	 * @interface ReactCompositeComponentInterface
	 * @internal
	 */
	var ReactCompositeComponentInterface = {
	
	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,
	
	  // ==== Definition methods ====
	
	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
	
	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
	
	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
	
	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,
	
	
	
	  // ==== Delegate methods ====
	
	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
	
	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,
	
	
	
	  // ==== Advanced methods ====
	
	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE
	
	};
	
	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function(Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function(Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function(Constructor, childContextTypes) {
	    validateTypeDef(
	      Constructor,
	      childContextTypes,
	      ReactPropTypeLocations.childContext
	    );
	    Constructor.childContextTypes = merge(
	      Constructor.childContextTypes,
	      childContextTypes
	    );
	  },
	  contextTypes: function(Constructor, contextTypes) {
	    validateTypeDef(
	      Constructor,
	      contextTypes,
	      ReactPropTypeLocations.context
	    );
	    Constructor.contextTypes = merge(Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function(Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(
	        Constructor.getDefaultProps,
	        getDefaultProps
	      );
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function(Constructor, propTypes) {
	    validateTypeDef(
	      Constructor,
	      propTypes,
	      ReactPropTypeLocations.prop
	    );
	    Constructor.propTypes = merge(Constructor.propTypes, propTypes);
	  },
	  statics: function(Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  }
	};
	
	function getDeclarationErrorAddendum(component) {
	  var owner = component._owner || null;
	  if (owner && owner.constructor && owner.constructor.displayName) {
	    return ' Check the render method of `' + owner.constructor.displayName +
	      '`.';
	  }
	  return '';
	}
	
	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        typeof typeDef[propName] == 'function',
	        '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	        'React.PropTypes.',
	        Constructor.displayName || 'ReactCompositeComponent',
	        ReactPropTypeLocationNames[location],
	        propName
	      ) : invariant(typeof typeDef[propName] == 'function'));
	    }
	  }
	}
	
	function validateMethodOverride(proto, name) {
	  var specPolicy = ReactCompositeComponentInterface.hasOwnProperty(name) ?
	    ReactCompositeComponentInterface[name] :
	    null;
	
	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactCompositeComponentMixin.hasOwnProperty(name)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      specPolicy === SpecPolicy.OVERRIDE_BASE,
	      'ReactCompositeComponentInterface: You are attempting to override ' +
	      '`%s` from your class specification. Ensure that your method names ' +
	      'do not overlap with React methods.',
	      name
	    ) : invariant(specPolicy === SpecPolicy.OVERRIDE_BASE));
	  }
	
	  // Disallow defining methods more than once unless explicitly allowed.
	  if (proto.hasOwnProperty(name)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      specPolicy === SpecPolicy.DEFINE_MANY ||
	      specPolicy === SpecPolicy.DEFINE_MANY_MERGED,
	      'ReactCompositeComponentInterface: You are attempting to define ' +
	      '`%s` on your component more than once. This conflict may be due ' +
	      'to a mixin.',
	      name
	    ) : invariant(specPolicy === SpecPolicy.DEFINE_MANY ||
	    specPolicy === SpecPolicy.DEFINE_MANY_MERGED));
	  }
	}
	
	function validateLifeCycleOnReplaceState(instance) {
	  var compositeLifeCycleState = instance._compositeLifeCycleState;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    instance.isMounted() ||
	      compositeLifeCycleState === CompositeLifeCycle.MOUNTING,
	    'replaceState(...): Can only update a mounted or mounting component.'
	  ) : invariant(instance.isMounted() ||
	    compositeLifeCycleState === CompositeLifeCycle.MOUNTING));
	  ("production" !== process.env.NODE_ENV ? invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE,
	    'replaceState(...): Cannot update during an existing state transition ' +
	    '(such as within `render`). This could potentially cause an infinite ' +
	    'loop so it is forbidden.'
	  ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE));
	  ("production" !== process.env.NODE_ENV ? invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING,
	    'replaceState(...): Cannot update while unmounting component. This ' +
	    'usually means you called setState() on an unmounted component.'
	  ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING));
	}
	
	/**
	 * Custom version of `mixInto` which handles policy validation and reserved
	 * specification keys when building `ReactCompositeComponent` classses.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !ReactDescriptor.isValidFactory(spec),
	    'ReactCompositeComponent: You\'re attempting to ' +
	    'use a component class as a mixin. Instead, just use a regular object.'
	  ) : invariant(!ReactDescriptor.isValidFactory(spec)));
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !ReactDescriptor.isValidDescriptor(spec),
	    'ReactCompositeComponent: You\'re attempting to ' +
	    'use a component as a mixin. Instead, just use a regular object.'
	  ) : invariant(!ReactDescriptor.isValidDescriptor(spec)));
	
	  var proto = Constructor.prototype;
	  for (var name in spec) {
	    var property = spec[name];
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }
	
	    validateMethodOverride(proto, name);
	
	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactCompositeComponent methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isCompositeComponentMethod =
	        ReactCompositeComponentInterface.hasOwnProperty(name);
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      var markedDontBind = property && property.__reactDontBind;
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind =
	        isFunction &&
	        !isCompositeComponentMethod &&
	        !isAlreadyDefined &&
	        !markedDontBind;
	
	      if (shouldAutoBind) {
	        if (!proto.__reactAutoBindMap) {
	          proto.__reactAutoBindMap = {};
	        }
	        proto.__reactAutoBindMap[name] = property;
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactCompositeComponentInterface[name];
	
	          // These cases should already be caught by validateMethodOverride
	          ("production" !== process.env.NODE_ENV ? invariant(
	            isCompositeComponentMethod && (
	              specPolicy === SpecPolicy.DEFINE_MANY_MERGED ||
	              specPolicy === SpecPolicy.DEFINE_MANY
	            ),
	            'ReactCompositeComponent: Unexpected spec policy %s for key %s ' +
	            'when mixing in component specs.',
	            specPolicy,
	            name
	          ) : invariant(isCompositeComponentMethod && (
	            specPolicy === SpecPolicy.DEFINE_MANY_MERGED ||
	            specPolicy === SpecPolicy.DEFINE_MANY
	          )));
	
	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if ("production" !== process.env.NODE_ENV) {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}
	
	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }
	
	    var isInherited = name in Constructor;
	    var result = property;
	    if (isInherited) {
	      var existingProperty = Constructor[name];
	      var existingType = typeof existingProperty;
	      var propertyType = typeof property;
	      ("production" !== process.env.NODE_ENV ? invariant(
	        existingType === 'function' && propertyType === 'function',
	        'ReactCompositeComponent: You are attempting to define ' +
	        '`%s` on your component more than once, but that is only supported ' +
	        'for functions, which are chained together. This conflict may be ' +
	        'due to a mixin.',
	        name
	      ) : invariant(existingType === 'function' && propertyType === 'function'));
	      result = createChainedFunction(existingProperty, property);
	    }
	    Constructor[name] = result;
	  }
	}
	
	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeObjectsWithNoDuplicateKeys(one, two) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    one && two && typeof one === 'object' && typeof two === 'object',
	    'mergeObjectsWithNoDuplicateKeys(): Cannot merge non-objects'
	  ) : invariant(one && two && typeof one === 'object' && typeof two === 'object'));
	
	  mapObject(two, function(value, key) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      one[key] === undefined,
	      'mergeObjectsWithNoDuplicateKeys(): ' +
	      'Tried to merge two objects with the same key: %s',
	      key
	    ) : invariant(one[key] === undefined));
	    one[key] = value;
	  });
	  return one;
	}
	
	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    return mergeObjectsWithNoDuplicateKeys(a, b);
	  };
	}
	
	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}
	
	/**
	 * `ReactCompositeComponent` maintains an auxiliary life cycle state in
	 * `this._compositeLifeCycleState` (which can be null).
	 *
	 * This is different from the life cycle state maintained by `ReactComponent` in
	 * `this._lifeCycleState`. The following diagram shows how the states overlap in
	 * time. There are times when the CompositeLifeCycle is null - at those times it
	 * is only meaningful to look at ComponentLifeCycle alone.
	 *
	 * Top Row: ReactComponent.ComponentLifeCycle
	 * Low Row: ReactComponent.CompositeLifeCycle
	 *
	 * +-------+------------------------------------------------------+--------+
	 * |  UN   |                    MOUNTED                           |   UN   |
	 * |MOUNTED|                                                      | MOUNTED|
	 * +-------+------------------------------------------------------+--------+
	 * |       ^--------+   +------+   +------+   +------+   +--------^        |
	 * |       |        |   |      |   |      |   |      |   |        |        |
	 * |    0--|MOUNTING|-0-|RECEIV|-0-|RECEIV|-0-|RECEIV|-0-|   UN   |--->0   |
	 * |       |        |   |PROPS |   | PROPS|   | STATE|   |MOUNTING|        |
	 * |       |        |   |      |   |      |   |      |   |        |        |
	 * |       |        |   |      |   |      |   |      |   |        |        |
	 * |       +--------+   +------+   +------+   +------+   +--------+        |
	 * |       |                                                      |        |
	 * +-------+------------------------------------------------------+--------+
	 */
	var CompositeLifeCycle = keyMirror({
	  /**
	   * Components in the process of being mounted respond to state changes
	   * differently.
	   */
	  MOUNTING: null,
	  /**
	   * Components in the process of being unmounted are guarded against state
	   * changes.
	   */
	  UNMOUNTING: null,
	  /**
	   * Components that are mounted and receiving new props respond to state
	   * changes differently.
	   */
	  RECEIVING_PROPS: null,
	  /**
	   * Components that are mounted and receiving new state are guarded against
	   * additional state changes.
	   */
	  RECEIVING_STATE: null
	});
	
	/**
	 * @lends {ReactCompositeComponent.prototype}
	 */
	var ReactCompositeComponentMixin = {
	
	  /**
	   * Base constructor for all composite component.
	   *
	   * @param {ReactDescriptor} descriptor
	   * @final
	   * @internal
	   */
	  construct: function(descriptor) {
	    // Children can be either an array or more than one argument
	    ReactComponent.Mixin.construct.apply(this, arguments);
	    ReactOwner.Mixin.construct.apply(this, arguments);
	
	    this.state = null;
	    this._pendingState = null;
	
	    // This is the public post-processed context. The real context and pending
	    // context lives on the descriptor.
	    this.context = null;
	
	    this._compositeLifeCycleState = null;
	  },
	
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function() {
	    return ReactComponent.Mixin.isMounted.call(this) &&
	      this._compositeLifeCycleState !== CompositeLifeCycle.MOUNTING;
	  },
	
	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {string} rootID DOM ID of the root node.
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {number} mountDepth number of components in the owner hierarchy
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: ReactPerf.measure(
	    'ReactCompositeComponent',
	    'mountComponent',
	    function(rootID, transaction, mountDepth) {
	      ReactComponent.Mixin.mountComponent.call(
	        this,
	        rootID,
	        transaction,
	        mountDepth
	      );
	      this._compositeLifeCycleState = CompositeLifeCycle.MOUNTING;
	
	      if (this.__reactAutoBindMap) {
	        this._bindAutoBindMethods();
	      }
	
	      this.context = this._processContext(this._descriptor._context);
	      this.props = this._processProps(this.props);
	
	      this.state = this.getInitialState ? this.getInitialState() : null;
	      ("production" !== process.env.NODE_ENV ? invariant(
	        typeof this.state === 'object' && !Array.isArray(this.state),
	        '%s.getInitialState(): must return an object or null',
	        this.constructor.displayName || 'ReactCompositeComponent'
	      ) : invariant(typeof this.state === 'object' && !Array.isArray(this.state)));
	
	      this._pendingState = null;
	      this._pendingForceUpdate = false;
	
	      if (this.componentWillMount) {
	        this.componentWillMount();
	        // When mounting, calls to `setState` by `componentWillMount` will set
	        // `this._pendingState` without triggering a re-render.
	        if (this._pendingState) {
	          this.state = this._pendingState;
	          this._pendingState = null;
	        }
	      }
	
	      this._renderedComponent = instantiateReactComponent(
	        this._renderValidatedComponent()
	      );
	
	      // Done with mounting, `setState` will now trigger UI changes.
	      this._compositeLifeCycleState = null;
	      var markup = this._renderedComponent.mountComponent(
	        rootID,
	        transaction,
	        mountDepth + 1
	      );
	      if (this.componentDidMount) {
	        transaction.getReactMountReady().enqueue(this.componentDidMount, this);
	      }
	      return markup;
	    }
	  ),
	
	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function() {
	    this._compositeLifeCycleState = CompositeLifeCycle.UNMOUNTING;
	    if (this.componentWillUnmount) {
	      this.componentWillUnmount();
	    }
	    this._compositeLifeCycleState = null;
	
	    this._renderedComponent.unmountComponent();
	    this._renderedComponent = null;
	
	    ReactComponent.Mixin.unmountComponent.call(this);
	
	    // Some existing components rely on this.props even after they've been
	    // destroyed (in event handlers).
	    // TODO: this.props = null;
	    // TODO: this.state = null;
	  },
	
	  /**
	   * Sets a subset of the state. Always use this or `replaceState` to mutate
	   * state. You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * There is no guarantee that calls to `setState` will run synchronously,
	   * as they may eventually be batched together.  You can provide an optional
	   * callback that will be executed when the call to setState is actually
	   * completed.
	   *
	   * @param {object} partialState Next partial state to be merged with state.
	   * @param {?function} callback Called after state is updated.
	   * @final
	   * @protected
	   */
	  setState: function(partialState, callback) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      typeof partialState === 'object' || partialState == null,
	      'setState(...): takes an object of state variables to update.'
	    ) : invariant(typeof partialState === 'object' || partialState == null));
	    if ("production" !== process.env.NODE_ENV){
	      ("production" !== process.env.NODE_ENV ? warning(
	        partialState != null,
	        'setState(...): You passed an undefined or null state object; ' +
	        'instead, use forceUpdate().'
	      ) : null);
	    }
	    // Merge with `_pendingState` if it exists, otherwise with existing state.
	    this.replaceState(
	      merge(this._pendingState || this.state, partialState),
	      callback
	    );
	  },
	
	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {object} completeState Next state.
	   * @param {?function} callback Called after state is updated.
	   * @final
	   * @protected
	   */
	  replaceState: function(completeState, callback) {
	    validateLifeCycleOnReplaceState(this);
	    this._pendingState = completeState;
	    if (this._compositeLifeCycleState !== CompositeLifeCycle.MOUNTING) {
	      // If we're in a componentWillMount handler, don't enqueue a rerender
	      // because ReactUpdates assumes we're in a browser context (which is wrong
	      // for server rendering) and we're about to do a render anyway.
	      // TODO: The callback here is ignored when setState is called from
	      // componentWillMount. Either fix it or disallow doing so completely in
	      // favor of getInitialState.
	      ReactUpdates.enqueueUpdate(this, callback);
	    }
	  },
	
	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`, and asserts that they are valid.
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _processContext: function(context) {
	    var maskedContext = null;
	    var contextTypes = this.constructor.contextTypes;
	    if (contextTypes) {
	      maskedContext = {};
	      for (var contextName in contextTypes) {
	        maskedContext[contextName] = context[contextName];
	      }
	      if ("production" !== process.env.NODE_ENV) {
	        this._checkPropTypes(
	          contextTypes,
	          maskedContext,
	          ReactPropTypeLocations.context
	        );
	      }
	    }
	    return maskedContext;
	  },
	
	  /**
	   * @param {object} currentContext
	   * @return {object}
	   * @private
	   */
	  _processChildContext: function(currentContext) {
	    var childContext = this.getChildContext && this.getChildContext();
	    var displayName = this.constructor.displayName || 'ReactCompositeComponent';
	    if (childContext) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        typeof this.constructor.childContextTypes === 'object',
	        '%s.getChildContext(): childContextTypes must be defined in order to ' +
	        'use getChildContext().',
	        displayName
	      ) : invariant(typeof this.constructor.childContextTypes === 'object'));
	      if ("production" !== process.env.NODE_ENV) {
	        this._checkPropTypes(
	          this.constructor.childContextTypes,
	          childContext,
	          ReactPropTypeLocations.childContext
	        );
	      }
	      for (var name in childContext) {
	        ("production" !== process.env.NODE_ENV ? invariant(
	          name in this.constructor.childContextTypes,
	          '%s.getChildContext(): key "%s" is not defined in childContextTypes.',
	          displayName,
	          name
	        ) : invariant(name in this.constructor.childContextTypes));
	      }
	      return merge(currentContext, childContext);
	    }
	    return currentContext;
	  },
	
	  /**
	   * Processes props by setting default values for unspecified props and
	   * asserting that the props are valid. Does not mutate its argument; returns
	   * a new props object with defaults merged in.
	   *
	   * @param {object} newProps
	   * @return {object}
	   * @private
	   */
	  _processProps: function(newProps) {
	    var defaultProps = this.constructor.defaultProps;
	    var props;
	    if (defaultProps) {
	      props = merge(newProps);
	      for (var propName in defaultProps) {
	        if (typeof props[propName] === 'undefined') {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    } else {
	      props = newProps;
	    }
	    if ("production" !== process.env.NODE_ENV) {
	      var propTypes = this.constructor.propTypes;
	      if (propTypes) {
	        this._checkPropTypes(propTypes, props, ReactPropTypeLocations.prop);
	      }
	    }
	    return props;
	  },
	
	  /**
	   * Assert that the props are valid
	   *
	   * @param {object} propTypes Map of prop name to a ReactPropType
	   * @param {object} props
	   * @param {string} location e.g. "prop", "context", "child context"
	   * @private
	   */
	  _checkPropTypes: function(propTypes, props, location) {
	    // TODO: Stop validating prop types here and only use the descriptor
	    // validation.
	    var componentName = this.constructor.displayName;
	    for (var propName in propTypes) {
	      if (propTypes.hasOwnProperty(propName)) {
	        var error =
	          propTypes[propName](props, propName, componentName, location);
	        if (error instanceof Error) {
	          // We may want to extend this logic for similar errors in
	          // renderComponent calls, so I'm abstracting it away into
	          // a function to minimize refactoring in the future
	          var addendum = getDeclarationErrorAddendum(this);
	          ("production" !== process.env.NODE_ENV ? warning(false, error.message + addendum) : null);
	        }
	      }
	    }
	  },
	
	  /**
	   * If any of `_pendingDescriptor`, `_pendingState`, or `_pendingForceUpdate`
	   * is set, update the component.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function(transaction) {
	    var compositeLifeCycleState = this._compositeLifeCycleState;
	    // Do not trigger a state transition if we are in the middle of mounting or
	    // receiving props because both of those will already be doing this.
	    if (compositeLifeCycleState === CompositeLifeCycle.MOUNTING ||
	        compositeLifeCycleState === CompositeLifeCycle.RECEIVING_PROPS) {
	      return;
	    }
	
	    if (this._pendingDescriptor == null &&
	        this._pendingState == null &&
	        !this._pendingForceUpdate) {
	      return;
	    }
	
	    var nextContext = this.context;
	    var nextProps = this.props;
	    var nextDescriptor = this._descriptor;
	    if (this._pendingDescriptor != null) {
	      nextDescriptor = this._pendingDescriptor;
	      nextContext = this._processContext(nextDescriptor._context);
	      nextProps = this._processProps(nextDescriptor.props);
	      this._pendingDescriptor = null;
	
	      this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_PROPS;
	      if (this.componentWillReceiveProps) {
	        this.componentWillReceiveProps(nextProps, nextContext);
	      }
	    }
	
	    this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_STATE;
	
	    var nextState = this._pendingState || this.state;
	    this._pendingState = null;
	
	    try {
	      var shouldUpdate =
	        this._pendingForceUpdate ||
	        !this.shouldComponentUpdate ||
	        this.shouldComponentUpdate(nextProps, nextState, nextContext);
	
	      if ("production" !== process.env.NODE_ENV) {
	        if (typeof shouldUpdate === "undefined") {
	          console.warn(
	            (this.constructor.displayName || 'ReactCompositeComponent') +
	            '.shouldComponentUpdate(): Returned undefined instead of a ' +
	            'boolean value. Make sure to return true or false.'
	          );
	        }
	      }
	
	      if (shouldUpdate) {
	        this._pendingForceUpdate = false;
	        // Will set `this.props`, `this.state` and `this.context`.
	        this._performComponentUpdate(
	          nextDescriptor,
	          nextProps,
	          nextState,
	          nextContext,
	          transaction
	        );
	      } else {
	        // If it's determined that a component should not update, we still want
	        // to set props and state.
	        this._descriptor = nextDescriptor;
	        this.props = nextProps;
	        this.state = nextState;
	        this.context = nextContext;
	
	        // Owner cannot change because shouldUpdateReactComponent doesn't allow
	        // it. TODO: Remove this._owner completely.
	        this._owner = nextDescriptor._owner;
	      }
	    } finally {
	      this._compositeLifeCycleState = null;
	    }
	  },
	
	  /**
	   * Merges new props and state, notifies delegate methods of update and
	   * performs update.
	   *
	   * @param {ReactDescriptor} nextDescriptor Next descriptor
	   * @param {object} nextProps Next public object to set as properties.
	   * @param {?object} nextState Next object to set as state.
	   * @param {?object} nextContext Next public object to set as context.
	   * @param {ReactReconcileTransaction} transaction
	   * @private
	   */
	  _performComponentUpdate: function(
	    nextDescriptor,
	    nextProps,
	    nextState,
	    nextContext,
	    transaction
	  ) {
	    var prevDescriptor = this._descriptor;
	    var prevProps = this.props;
	    var prevState = this.state;
	    var prevContext = this.context;
	
	    if (this.componentWillUpdate) {
	      this.componentWillUpdate(nextProps, nextState, nextContext);
	    }
	
	    this._descriptor = nextDescriptor;
	    this.props = nextProps;
	    this.state = nextState;
	    this.context = nextContext;
	
	    // Owner cannot change because shouldUpdateReactComponent doesn't allow
	    // it. TODO: Remove this._owner completely.
	    this._owner = nextDescriptor._owner;
	
	    this.updateComponent(
	      transaction,
	      prevDescriptor
	    );
	
	    if (this.componentDidUpdate) {
	      transaction.getReactMountReady().enqueue(
	        this.componentDidUpdate.bind(this, prevProps, prevState, prevContext),
	        this
	      );
	    }
	  },
	
	  receiveComponent: function(nextDescriptor, transaction) {
	    if (nextDescriptor === this._descriptor &&
	        nextDescriptor._owner != null) {
	      // Since descriptors are immutable after the owner is rendered,
	      // we can do a cheap identity compare here to determine if this is a
	      // superfluous reconcile. It's possible for state to be mutable but such
	      // change should trigger an update of the owner which would recreate
	      // the descriptor. We explicitly check for the existence of an owner since
	      // it's possible for a descriptor created outside a composite to be
	      // deeply mutated and reused.
	      return;
	    }
	
	    ReactComponent.Mixin.receiveComponent.call(
	      this,
	      nextDescriptor,
	      transaction
	    );
	  },
	
	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactDescriptor} prevDescriptor
	   * @internal
	   * @overridable
	   */
	  updateComponent: ReactPerf.measure(
	    'ReactCompositeComponent',
	    'updateComponent',
	    function(transaction, prevParentDescriptor) {
	      ReactComponent.Mixin.updateComponent.call(
	        this,
	        transaction,
	        prevParentDescriptor
	      );
	
	      var prevComponentInstance = this._renderedComponent;
	      var prevDescriptor = prevComponentInstance._descriptor;
	      var nextDescriptor = this._renderValidatedComponent();
	      if (shouldUpdateReactComponent(prevDescriptor, nextDescriptor)) {
	        prevComponentInstance.receiveComponent(nextDescriptor, transaction);
	      } else {
	        // These two IDs are actually the same! But nothing should rely on that.
	        var thisID = this._rootNodeID;
	        var prevComponentID = prevComponentInstance._rootNodeID;
	        prevComponentInstance.unmountComponent();
	        this._renderedComponent = instantiateReactComponent(nextDescriptor);
	        var nextMarkup = this._renderedComponent.mountComponent(
	          thisID,
	          transaction,
	          this._mountDepth + 1
	        );
	        ReactComponent.BackendIDOperations.dangerouslyReplaceNodeWithMarkupByID(
	          prevComponentID,
	          nextMarkup
	        );
	      }
	    }
	  ),
	
	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldUpdateComponent`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {?function} callback Called after update is complete.
	   * @final
	   * @protected
	   */
	  forceUpdate: function(callback) {
	    var compositeLifeCycleState = this._compositeLifeCycleState;
	    ("production" !== process.env.NODE_ENV ? invariant(
	      this.isMounted() ||
	        compositeLifeCycleState === CompositeLifeCycle.MOUNTING,
	      'forceUpdate(...): Can only force an update on mounted or mounting ' +
	        'components.'
	    ) : invariant(this.isMounted() ||
	      compositeLifeCycleState === CompositeLifeCycle.MOUNTING));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE &&
	      compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING,
	      'forceUpdate(...): Cannot force an update while unmounting component ' +
	      'or during an existing state transition (such as within `render`).'
	    ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE &&
	    compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING));
	    this._pendingForceUpdate = true;
	    ReactUpdates.enqueueUpdate(this, callback);
	  },
	
	  /**
	   * @private
	   */
	  _renderValidatedComponent: ReactPerf.measure(
	    'ReactCompositeComponent',
	    '_renderValidatedComponent',
	    function() {
	      var renderedComponent;
	      var previousContext = ReactContext.current;
	      ReactContext.current = this._processChildContext(
	        this._descriptor._context
	      );
	      ReactCurrentOwner.current = this;
	      try {
	        renderedComponent = this.render();
	        if (renderedComponent === null || renderedComponent === false) {
	          renderedComponent = ReactEmptyComponent.getEmptyComponent();
	          ReactEmptyComponent.registerNullComponentID(this._rootNodeID);
	        } else {
	          ReactEmptyComponent.deregisterNullComponentID(this._rootNodeID);
	        }
	      } finally {
	        ReactContext.current = previousContext;
	        ReactCurrentOwner.current = null;
	      }
	      ("production" !== process.env.NODE_ENV ? invariant(
	        ReactDescriptor.isValidDescriptor(renderedComponent),
	        '%s.render(): A valid ReactComponent must be returned. You may have ' +
	          'returned undefined, an array or some other invalid object.',
	        this.constructor.displayName || 'ReactCompositeComponent'
	      ) : invariant(ReactDescriptor.isValidDescriptor(renderedComponent)));
	      return renderedComponent;
	    }
	  ),
	
	  /**
	   * @private
	   */
	  _bindAutoBindMethods: function() {
	    for (var autoBindKey in this.__reactAutoBindMap) {
	      if (!this.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
	        continue;
	      }
	      var method = this.__reactAutoBindMap[autoBindKey];
	      this[autoBindKey] = this._bindAutoBindMethod(ReactErrorUtils.guard(
	        method,
	        this.constructor.displayName + '.' + autoBindKey
	      ));
	    }
	  },
	
	  /**
	   * Binds a method to the component.
	   *
	   * @param {function} method Method to be bound.
	   * @private
	   */
	  _bindAutoBindMethod: function(method) {
	    var component = this;
	    var boundMethod = function() {
	      return method.apply(component, arguments);
	    };
	    if ("production" !== process.env.NODE_ENV) {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis ) {var args=Array.prototype.slice.call(arguments,1);
	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          monitorCodeUse('react_bind_warning', { component: componentName });
	          console.warn(
	            'bind(): React component methods may only be bound to the ' +
	            'component instance. See ' + componentName
	          );
	        } else if (!args.length) {
	          monitorCodeUse('react_bind_warning', { component: componentName });
	          console.warn(
	            'bind(): You are binding a component method to the component. ' +
	            'React does this for you automatically in a high-performance ' +
	            'way, so you can safely remove this call. See ' + componentName
	          );
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }
	};
	
	var ReactCompositeComponentBase = function() {};
	mixInto(ReactCompositeComponentBase, ReactComponent.Mixin);
	mixInto(ReactCompositeComponentBase, ReactOwner.Mixin);
	mixInto(ReactCompositeComponentBase, ReactPropTransferer.Mixin);
	mixInto(ReactCompositeComponentBase, ReactCompositeComponentMixin);
	
	/**
	 * Module for creating composite components.
	 *
	 * @class ReactCompositeComponent
	 * @extends ReactComponent
	 * @extends ReactOwner
	 * @extends ReactPropTransferer
	 */
	var ReactCompositeComponent = {
	
	  LifeCycle: CompositeLifeCycle,
	
	  Base: ReactCompositeComponentBase,
	
	  /**
	   * Creates a composite component class given a class specification.
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function(spec) {
	    var Constructor = function(props, owner) {
	      this.construct(props, owner);
	    };
	    Constructor.prototype = new ReactCompositeComponentBase();
	    Constructor.prototype.constructor = Constructor;
	
	    injectedMixins.forEach(
	      mixSpecIntoComponent.bind(null, Constructor)
	    );
	
	    mixSpecIntoComponent(Constructor, spec);
	
	    // Initialize the defaultProps property after all mixins have been merged
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }
	
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    ) : invariant(Constructor.prototype.render));
	
	    if ("production" !== process.env.NODE_ENV) {
	      if (Constructor.prototype.componentShouldUpdate) {
	        monitorCodeUse(
	          'react_component_should_update_warning',
	          { component: spec.displayName }
	        );
	        console.warn(
	          (spec.displayName || 'A component') + ' has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.'
	         );
	      }
	    }
	
	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactCompositeComponentInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }
	
	    var descriptorFactory = ReactDescriptor.createFactory(Constructor);
	
	    if ("production" !== process.env.NODE_ENV) {
	      return ReactDescriptorValidator.createFactory(
	        descriptorFactory,
	        Constructor.propTypes,
	        Constructor.contextTypes
	      );
	    }
	
	    return descriptorFactory;
	  },
	
	  injection: {
	    injectMixin: function(mixin) {
	      injectedMixins.push(mixin);
	    }
	  }
	};
	
	module.exports = ReactCompositeComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactContext
	 */
	
	"use strict";
	
	var merge = __webpack_require__(68);
	
	/**
	 * Keeps track of the current context.
	 *
	 * The context is automatically passed down the component ownership hierarchy
	 * and is accessible via `this.context` on ReactCompositeComponents.
	 */
	var ReactContext = {
	
	  /**
	   * @internal
	   * @type {object}
	   */
	  current: {},
	
	  /**
	   * Temporarily extends the current context while executing scopedCallback.
	   *
	   * A typical use case might look like
	   *
	   *  render: function() {
	   *    var children = ReactContext.withContext({foo: 'foo'} () => (
	   *
	   *    ));
	   *    return <div>{children}</div>;
	   *  }
	   *
	   * @param {object} newContext New context to merge into the existing context
	   * @param {function} scopedCallback Callback to run with the new context
	   * @return {ReactComponent|array<ReactComponent>}
	   */
	  withContext: function(newContext, scopedCallback) {
	    var result;
	    var previousContext = ReactContext.current;
	    ReactContext.current = merge(previousContext, newContext);
	    try {
	      result = scopedCallback();
	    } finally {
	      ReactContext.current = previousContext;
	    }
	    return result;
	  }
	
	};
	
	module.exports = ReactContext;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactCurrentOwner
	 */
	
	"use strict";
	
	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 *
	 * The depth indicate how many composite components are above this render level.
	 */
	var ReactCurrentOwner = {
	
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	
	};
	
	module.exports = ReactCurrentOwner;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDescriptor
	 */
	
	"use strict";
	
	var ReactContext = __webpack_require__(46);
	var ReactCurrentOwner = __webpack_require__(47);
	
	var merge = __webpack_require__(68);
	var warning = __webpack_require__(60);
	
	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} object
	 * @param {string} key
	 */
	function defineWarningProperty(object, key) {
	  Object.defineProperty(object, key, {
	
	    configurable: false,
	    enumerable: true,
	
	    get: function() {
	      if (!this._store) {
	        return null;
	      }
	      return this._store[key];
	    },
	
	    set: function(value) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        false,
	        'Don\'t set the ' + key + ' property of the component. ' +
	        'Mutate the existing props object instead.'
	      ) : null);
	      this._store[key] = value;
	    }
	
	  });
	}
	
	/**
	 * This is updated to true if the membrane is successfully created.
	 */
	var useMutationMembrane = false;
	
	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} descriptor
	 */
	function defineMutationMembrane(prototype) {
	  try {
	    var pseudoFrozenProperties = {
	      props: true
	    };
	    for (var key in pseudoFrozenProperties) {
	      defineWarningProperty(prototype, key);
	    }
	    useMutationMembrane = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}
	
	/**
	 * Transfer static properties from the source to the target. Functions are
	 * rebound to have this reflect the original source.
	 */
	function proxyStaticMethods(target, source) {
	  if (typeof source !== 'function') {
	    return;
	  }
	  for (var key in source) {
	    if (source.hasOwnProperty(key)) {
	      var value = source[key];
	      if (typeof value === 'function') {
	        var bound = value.bind(source);
	        // Copy any properties defined on the function, such as `isRequired` on
	        // a PropTypes validator. (mergeInto refuses to work on functions.)
	        for (var k in value) {
	          if (value.hasOwnProperty(k)) {
	            bound[k] = value[k];
	          }
	        }
	        target[key] = bound;
	      } else {
	        target[key] = value;
	      }
	    }
	  }
	}
	
	/**
	 * Base constructor for all React descriptors. This is only used to make this
	 * work with a dynamic instanceof check. Nothing should live on this prototype.
	 *
	 * @param {*} type
	 * @internal
	 */
	var ReactDescriptor = function() {};
	
	if ("production" !== process.env.NODE_ENV) {
	  defineMutationMembrane(ReactDescriptor.prototype);
	}
	
	ReactDescriptor.createFactory = function(type) {
	
	  var descriptorPrototype = Object.create(ReactDescriptor.prototype);
	
	  var factory = function(props, children) {
	    // For consistency we currently allocate a new object for every descriptor.
	    // This protects the descriptor from being mutated by the original props
	    // object being mutated. It also protects the original props object from
	    // being mutated by children arguments and default props. This behavior
	    // comes with a performance cost and could be deprecated in the future.
	    // It could also be optimized with a smarter JSX transform.
	    if (props == null) {
	      props = {};
	    } else if (typeof props === 'object') {
	      props = merge(props);
	    }
	
	    // Children can be more than one argument, and those are transferred onto
	    // the newly allocated props object.
	    var childrenLength = arguments.length - 1;
	    if (childrenLength === 1) {
	      props.children = children;
	    } else if (childrenLength > 1) {
	      var childArray = Array(childrenLength);
	      for (var i = 0; i < childrenLength; i++) {
	        childArray[i] = arguments[i + 1];
	      }
	      props.children = childArray;
	    }
	
	    // Initialize the descriptor object
	    var descriptor = Object.create(descriptorPrototype);
	
	    // Record the component responsible for creating this descriptor.
	    descriptor._owner = ReactCurrentOwner.current;
	
	    // TODO: Deprecate withContext, and then the context becomes accessible
	    // through the owner.
	    descriptor._context = ReactContext.current;
	
	    if ("production" !== process.env.NODE_ENV) {
	      // The validation flag and props are currently mutative. We put them on
	      // an external backing store so that we can freeze the whole object.
	      // This can be replaced with a WeakMap once they are implemented in
	      // commonly used development environments.
	      descriptor._store = { validated: false, props: props };
	
	      // We're not allowed to set props directly on the object so we early
	      // return and rely on the prototype membrane to forward to the backing
	      // store.
	      if (useMutationMembrane) {
	        Object.freeze(descriptor);
	        return descriptor;
	      }
	    }
	
	    descriptor.props = props;
	    return descriptor;
	  };
	
	  // Currently we expose the prototype of the descriptor so that
	  // <Foo /> instanceof Foo works. This is controversial pattern.
	  factory.prototype = descriptorPrototype;
	
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on descriptors. E.g. <Foo />.type === Foo.type and for
	  // static methods like <Foo />.type.staticMethod();
	  // This should not be named constructor since this may not be the function
	  // that created the descriptor, and it may not even be a constructor.
	  factory.type = type;
	  descriptorPrototype.type = type;
	
	  proxyStaticMethods(factory, type);
	
	  // Expose a unique constructor on the prototype is that this works with type
	  // systems that compare constructor properties: <Foo />.constructor === Foo
	  // This may be controversial since it requires a known factory function.
	  descriptorPrototype.constructor = factory;
	
	  return factory;
	
	};
	
	ReactDescriptor.cloneAndReplaceProps = function(oldDescriptor, newProps) {
	  var newDescriptor = Object.create(oldDescriptor.constructor.prototype);
	  // It's important that this property order matches the hidden class of the
	  // original descriptor to maintain perf.
	  newDescriptor._owner = oldDescriptor._owner;
	  newDescriptor._context = oldDescriptor._context;
	
	  if ("production" !== process.env.NODE_ENV) {
	    newDescriptor._store = {
	      validated: oldDescriptor._store.validated,
	      props: newProps
	    };
	    if (useMutationMembrane) {
	      Object.freeze(newDescriptor);
	      return newDescriptor;
	    }
	  }
	
	  newDescriptor.props = newProps;
	  return newDescriptor;
	};
	
	/**
	 * Checks if a value is a valid descriptor constructor.
	 *
	 * @param {*}
	 * @return {boolean}
	 * @public
	 */
	ReactDescriptor.isValidFactory = function(factory) {
	  return typeof factory === 'function' &&
	         factory.prototype instanceof ReactDescriptor;
	};
	
	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactDescriptor.isValidDescriptor = function(object) {
	  return object instanceof ReactDescriptor;
	};
	
	module.exports = ReactDescriptor;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOM
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var ReactDescriptor = __webpack_require__(48);
	var ReactDescriptorValidator = __webpack_require__(93);
	var ReactDOMComponent = __webpack_require__(50);
	
	var mergeInto = __webpack_require__(103);
	var mapObject = __webpack_require__(101);
	
	/**
	 * Creates a new React class that is idempotent and capable of containing other
	 * React components. It accepts event listeners and DOM properties that are
	 * valid according to `DOMProperty`.
	 *
	 *  - Event listeners: `onClick`, `onMouseDown`, etc.
	 *  - DOM properties: `className`, `name`, `title`, etc.
	 *
	 * The `style` property functions differently from the DOM API. It accepts an
	 * object mapping of style properties to values.
	 *
	 * @param {boolean} omitClose True if the close tag should be omitted.
	 * @param {string} tag Tag name (e.g. `div`).
	 * @private
	 */
	function createDOMComponentClass(omitClose, tag) {
	  var Constructor = function(descriptor) {
	    this.construct(descriptor);
	  };
	  Constructor.prototype = new ReactDOMComponent(tag, omitClose);
	  Constructor.prototype.constructor = Constructor;
	  Constructor.displayName = tag;
	
	  var ConvenienceConstructor = ReactDescriptor.createFactory(Constructor);
	
	  if ("production" !== process.env.NODE_ENV) {
	    return ReactDescriptorValidator.createFactory(
	      ConvenienceConstructor
	    );
	  }
	
	  return ConvenienceConstructor;
	}
	
	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOM = mapObject({
	  a: false,
	  abbr: false,
	  address: false,
	  area: true,
	  article: false,
	  aside: false,
	  audio: false,
	  b: false,
	  base: true,
	  bdi: false,
	  bdo: false,
	  big: false,
	  blockquote: false,
	  body: false,
	  br: true,
	  button: false,
	  canvas: false,
	  caption: false,
	  cite: false,
	  code: false,
	  col: true,
	  colgroup: false,
	  data: false,
	  datalist: false,
	  dd: false,
	  del: false,
	  details: false,
	  dfn: false,
	  dialog: false,
	  div: false,
	  dl: false,
	  dt: false,
	  em: false,
	  embed: true,
	  fieldset: false,
	  figcaption: false,
	  figure: false,
	  footer: false,
	  form: false, // NOTE: Injected, see `ReactDOMForm`.
	  h1: false,
	  h2: false,
	  h3: false,
	  h4: false,
	  h5: false,
	  h6: false,
	  head: false,
	  header: false,
	  hr: true,
	  html: false,
	  i: false,
	  iframe: false,
	  img: true,
	  input: true,
	  ins: false,
	  kbd: false,
	  keygen: true,
	  label: false,
	  legend: false,
	  li: false,
	  link: true,
	  main: false,
	  map: false,
	  mark: false,
	  menu: false,
	  menuitem: false, // NOTE: Close tag should be omitted, but causes problems.
	  meta: true,
	  meter: false,
	  nav: false,
	  noscript: false,
	  object: false,
	  ol: false,
	  optgroup: false,
	  option: false,
	  output: false,
	  p: false,
	  param: true,
	  picture: false,
	  pre: false,
	  progress: false,
	  q: false,
	  rp: false,
	  rt: false,
	  ruby: false,
	  s: false,
	  samp: false,
	  script: false,
	  section: false,
	  select: false,
	  small: false,
	  source: true,
	  span: false,
	  strong: false,
	  style: false,
	  sub: false,
	  summary: false,
	  sup: false,
	  table: false,
	  tbody: false,
	  td: false,
	  textarea: false, // NOTE: Injected, see `ReactDOMTextarea`.
	  tfoot: false,
	  th: false,
	  thead: false,
	  time: false,
	  title: false,
	  tr: false,
	  track: true,
	  u: false,
	  ul: false,
	  'var': false,
	  video: false,
	  wbr: true,
	
	  // SVG
	  circle: false,
	  defs: false,
	  ellipse: false,
	  g: false,
	  line: false,
	  linearGradient: false,
	  mask: false,
	  path: false,
	  pattern: false,
	  polygon: false,
	  polyline: false,
	  radialGradient: false,
	  rect: false,
	  stop: false,
	  svg: false,
	  text: false,
	  tspan: false
	}, createDOMComponentClass);
	
	var injection = {
	  injectComponentClasses: function(componentClasses) {
	    mergeInto(ReactDOM, componentClasses);
	  }
	};
	
	ReactDOM.injection = injection;
	
	module.exports = ReactDOM;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMComponent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var CSSPropertyOperations = __webpack_require__(104);
	var DOMProperty = __webpack_require__(84);
	var DOMPropertyOperations = __webpack_require__(41);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactComponent = __webpack_require__(44);
	var ReactBrowserEventEmitter = __webpack_require__(106);
	var ReactMount = __webpack_require__(53);
	var ReactMultiChild = __webpack_require__(54);
	var ReactPerf = __webpack_require__(55);
	
	var escapeTextForBrowser = __webpack_require__(85);
	var invariant = __webpack_require__(62);
	var keyOf = __webpack_require__(64);
	var merge = __webpack_require__(68);
	var mixInto = __webpack_require__(99);
	
	var deleteListener = ReactBrowserEventEmitter.deleteListener;
	var listenTo = ReactBrowserEventEmitter.listenTo;
	var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;
	
	// For quickly matching children type, to test if can be treated as content.
	var CONTENT_TYPES = {'string': true, 'number': true};
	
	var STYLE = keyOf({style: null});
	
	var ELEMENT_NODE_TYPE = 1;
	
	/**
	 * @param {?object} props
	 */
	function assertValidProps(props) {
	  if (!props) {
	    return;
	  }
	  // Note the use of `==` which checks for null or undefined.
	  ("production" !== process.env.NODE_ENV ? invariant(
	    props.children == null || props.dangerouslySetInnerHTML == null,
	    'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'
	  ) : invariant(props.children == null || props.dangerouslySetInnerHTML == null));
	  ("production" !== process.env.NODE_ENV ? invariant(
	    props.style == null || typeof props.style === 'object',
	    'The `style` prop expects a mapping from style properties to values, ' +
	    'not a string.'
	  ) : invariant(props.style == null || typeof props.style === 'object'));
	}
	
	function putListener(id, registrationName, listener, transaction) {
	  var container = ReactMount.findReactContainerForID(id);
	  if (container) {
	    var doc = container.nodeType === ELEMENT_NODE_TYPE ?
	      container.ownerDocument :
	      container;
	    listenTo(registrationName, doc);
	  }
	  transaction.getPutListenerQueue().enqueuePutListener(
	    id,
	    registrationName,
	    listener
	  );
	}
	
	
	/**
	 * @constructor ReactDOMComponent
	 * @extends ReactComponent
	 * @extends ReactMultiChild
	 */
	function ReactDOMComponent(tag, omitClose) {
	  this._tagOpen = '<' + tag;
	  this._tagClose = omitClose ? '' : '</' + tag + '>';
	  this.tagName = tag.toUpperCase();
	}
	
	ReactDOMComponent.Mixin = {
	
	  /**
	   * Generates root tag markup then recurses. This method has side effects and
	   * is not idempotent.
	   *
	   * @internal
	   * @param {string} rootID The root DOM ID for this node.
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {number} mountDepth number of components in the owner hierarchy
	   * @return {string} The computed markup.
	   */
	  mountComponent: ReactPerf.measure(
	    'ReactDOMComponent',
	    'mountComponent',
	    function(rootID, transaction, mountDepth) {
	      ReactComponent.Mixin.mountComponent.call(
	        this,
	        rootID,
	        transaction,
	        mountDepth
	      );
	      assertValidProps(this.props);
	      return (
	        this._createOpenTagMarkupAndPutListeners(transaction) +
	        this._createContentMarkup(transaction) +
	        this._tagClose
	      );
	    }
	  ),
	
	  /**
	   * Creates markup for the open tag and all attributes.
	   *
	   * This method has side effects because events get registered.
	   *
	   * Iterating over object properties is faster than iterating over arrays.
	   * @see http://jsperf.com/obj-vs-arr-iteration
	   *
	   * @private
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {string} Markup of opening tag.
	   */
	  _createOpenTagMarkupAndPutListeners: function(transaction) {
	    var props = this.props;
	    var ret = this._tagOpen;
	
	    for (var propKey in props) {
	      if (!props.hasOwnProperty(propKey)) {
	        continue;
	      }
	      var propValue = props[propKey];
	      if (propValue == null) {
	        continue;
	      }
	      if (registrationNameModules.hasOwnProperty(propKey)) {
	        putListener(this._rootNodeID, propKey, propValue, transaction);
	      } else {
	        if (propKey === STYLE) {
	          if (propValue) {
	            propValue = props.style = merge(props.style);
	          }
	          propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
	        }
	        var markup =
	          DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
	        if (markup) {
	          ret += ' ' + markup;
	        }
	      }
	    }
	
	    // For static pages, no need to put React ID and checksum. Saves lots of
	    // bytes.
	    if (transaction.renderToStaticMarkup) {
	      return ret + '>';
	    }
	
	    var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
	    return ret + ' ' + markupForID + '>';
	  },
	
	  /**
	   * Creates markup for the content between the tags.
	   *
	   * @private
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {string} Content markup.
	   */
	  _createContentMarkup: function(transaction) {
	    // Intentional use of != to avoid catching zero/false.
	    var innerHTML = this.props.dangerouslySetInnerHTML;
	    if (innerHTML != null) {
	      if (innerHTML.__html != null) {
	        return innerHTML.__html;
	      }
	    } else {
	      var contentToUse =
	        CONTENT_TYPES[typeof this.props.children] ? this.props.children : null;
	      var childrenToUse = contentToUse != null ? null : this.props.children;
	      if (contentToUse != null) {
	        return escapeTextForBrowser(contentToUse);
	      } else if (childrenToUse != null) {
	        var mountImages = this.mountChildren(
	          childrenToUse,
	          transaction
	        );
	        return mountImages.join('');
	      }
	    }
	    return '';
	  },
	
	  receiveComponent: function(nextDescriptor, transaction) {
	    if (nextDescriptor === this._descriptor &&
	        nextDescriptor._owner != null) {
	      // Since descriptors are immutable after the owner is rendered,
	      // we can do a cheap identity compare here to determine if this is a
	      // superfluous reconcile. It's possible for state to be mutable but such
	      // change should trigger an update of the owner which would recreate
	      // the descriptor. We explicitly check for the existence of an owner since
	      // it's possible for a descriptor created outside a composite to be
	      // deeply mutated and reused.
	      return;
	    }
	
	    ReactComponent.Mixin.receiveComponent.call(
	      this,
	      nextDescriptor,
	      transaction
	    );
	  },
	
	  /**
	   * Updates a native DOM component after it has already been allocated and
	   * attached to the DOM. Reconciles the root DOM node, then recurses.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactDescriptor} prevDescriptor
	   * @internal
	   * @overridable
	   */
	  updateComponent: ReactPerf.measure(
	    'ReactDOMComponent',
	    'updateComponent',
	    function(transaction, prevDescriptor) {
	      assertValidProps(this._descriptor.props);
	      ReactComponent.Mixin.updateComponent.call(
	        this,
	        transaction,
	        prevDescriptor
	      );
	      this._updateDOMProperties(prevDescriptor.props, transaction);
	      this._updateDOMChildren(prevDescriptor.props, transaction);
	    }
	  ),
	
	  /**
	   * Reconciles the properties by detecting differences in property values and
	   * updating the DOM as necessary. This function is probably the single most
	   * critical path for performance optimization.
	   *
	   * TODO: Benchmark whether checking for changed values in memory actually
	   *       improves performance (especially statically positioned elements).
	   * TODO: Benchmark the effects of putting this at the top since 99% of props
	   *       do not change for a given reconciliation.
	   * TODO: Benchmark areas that can be improved with caching.
	   *
	   * @private
	   * @param {object} lastProps
	   * @param {ReactReconcileTransaction} transaction
	   */
	  _updateDOMProperties: function(lastProps, transaction) {
	    var nextProps = this.props;
	    var propKey;
	    var styleName;
	    var styleUpdates;
	    for (propKey in lastProps) {
	      if (nextProps.hasOwnProperty(propKey) ||
	         !lastProps.hasOwnProperty(propKey)) {
	        continue;
	      }
	      if (propKey === STYLE) {
	        var lastStyle = lastProps[propKey];
	        for (styleName in lastStyle) {
	          if (lastStyle.hasOwnProperty(styleName)) {
	            styleUpdates = styleUpdates || {};
	            styleUpdates[styleName] = '';
	          }
	        }
	      } else if (registrationNameModules.hasOwnProperty(propKey)) {
	        deleteListener(this._rootNodeID, propKey);
	      } else if (
	          DOMProperty.isStandardName[propKey] ||
	          DOMProperty.isCustomAttribute(propKey)) {
	        ReactComponent.BackendIDOperations.deletePropertyByID(
	          this._rootNodeID,
	          propKey
	        );
	      }
	    }
	    for (propKey in nextProps) {
	      var nextProp = nextProps[propKey];
	      var lastProp = lastProps[propKey];
	      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
	        continue;
	      }
	      if (propKey === STYLE) {
	        if (nextProp) {
	          nextProp = nextProps.style = merge(nextProp);
	        }
	        if (lastProp) {
	          // Unset styles on `lastProp` but not on `nextProp`.
	          for (styleName in lastProp) {
	            if (lastProp.hasOwnProperty(styleName) &&
	                (!nextProp || !nextProp.hasOwnProperty(styleName))) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = '';
	            }
	          }
	          // Update styles that changed since `lastProp`.
	          for (styleName in nextProp) {
	            if (nextProp.hasOwnProperty(styleName) &&
	                lastProp[styleName] !== nextProp[styleName]) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = nextProp[styleName];
	            }
	          }
	        } else {
	          // Relies on `updateStylesByID` not mutating `styleUpdates`.
	          styleUpdates = nextProp;
	        }
	      } else if (registrationNameModules.hasOwnProperty(propKey)) {
	        putListener(this._rootNodeID, propKey, nextProp, transaction);
	      } else if (
	          DOMProperty.isStandardName[propKey] ||
	          DOMProperty.isCustomAttribute(propKey)) {
	        ReactComponent.BackendIDOperations.updatePropertyByID(
	          this._rootNodeID,
	          propKey,
	          nextProp
	        );
	      }
	    }
	    if (styleUpdates) {
	      ReactComponent.BackendIDOperations.updateStylesByID(
	        this._rootNodeID,
	        styleUpdates
	      );
	    }
	  },
	
	  /**
	   * Reconciles the children with the various properties that affect the
	   * children content.
	   *
	   * @param {object} lastProps
	   * @param {ReactReconcileTransaction} transaction
	   */
	  _updateDOMChildren: function(lastProps, transaction) {
	    var nextProps = this.props;
	
	    var lastContent =
	      CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
	    var nextContent =
	      CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
	
	    var lastHtml =
	      lastProps.dangerouslySetInnerHTML &&
	      lastProps.dangerouslySetInnerHTML.__html;
	    var nextHtml =
	      nextProps.dangerouslySetInnerHTML &&
	      nextProps.dangerouslySetInnerHTML.__html;
	
	    // Note the use of `!=` which checks for null or undefined.
	    var lastChildren = lastContent != null ? null : lastProps.children;
	    var nextChildren = nextContent != null ? null : nextProps.children;
	
	    // If we're switching from children to content/html or vice versa, remove
	    // the old content
	    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
	    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
	    if (lastChildren != null && nextChildren == null) {
	      this.updateChildren(null, transaction);
	    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
	      this.updateTextContent('');
	    }
	
	    if (nextContent != null) {
	      if (lastContent !== nextContent) {
	        this.updateTextContent('' + nextContent);
	      }
	    } else if (nextHtml != null) {
	      if (lastHtml !== nextHtml) {
	        ReactComponent.BackendIDOperations.updateInnerHTMLByID(
	          this._rootNodeID,
	          nextHtml
	        );
	      }
	    } else if (nextChildren != null) {
	      this.updateChildren(nextChildren, transaction);
	    }
	  },
	
	  /**
	   * Destroys all event registrations for this instance. Does not remove from
	   * the DOM. That must be done by the parent.
	   *
	   * @internal
	   */
	  unmountComponent: function() {
	    this.unmountChildren();
	    ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
	    ReactComponent.Mixin.unmountComponent.call(this);
	  }
	
	};
	
	mixInto(ReactDOMComponent, ReactComponent.Mixin);
	mixInto(ReactDOMComponent, ReactDOMComponent.Mixin);
	mixInto(ReactDOMComponent, ReactMultiChild.Mixin);
	mixInto(ReactDOMComponent, ReactBrowserComponentMixin);
	
	module.exports = ReactDOMComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDefaultInjection
	 */
	
	"use strict";
	
	var BeforeInputEventPlugin = __webpack_require__(107);
	var ChangeEventPlugin = __webpack_require__(108);
	var ClientReactRootIndex = __webpack_require__(109);
	var CompositionEventPlugin = __webpack_require__(110);
	var DefaultEventPluginOrder = __webpack_require__(111);
	var EnterLeaveEventPlugin = __webpack_require__(112);
	var ExecutionEnvironment = __webpack_require__(61);
	var HTMLDOMPropertyConfig = __webpack_require__(113);
	var MobileSafariClickEventPlugin = __webpack_require__(114);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactComponentBrowserEnvironment =
	  __webpack_require__(115);
	var ReactDefaultBatchingStrategy = __webpack_require__(116);
	var ReactDOM = __webpack_require__(49);
	var ReactDOMButton = __webpack_require__(117);
	var ReactDOMForm = __webpack_require__(118);
	var ReactDOMImg = __webpack_require__(119);
	var ReactDOMInput = __webpack_require__(120);
	var ReactDOMOption = __webpack_require__(121);
	var ReactDOMSelect = __webpack_require__(122);
	var ReactDOMTextarea = __webpack_require__(123);
	var ReactEventListener = __webpack_require__(124);
	var ReactInjection = __webpack_require__(125);
	var ReactInstanceHandles = __webpack_require__(52);
	var ReactMount = __webpack_require__(53);
	var SelectEventPlugin = __webpack_require__(126);
	var ServerReactRootIndex = __webpack_require__(127);
	var SimpleEventPlugin = __webpack_require__(128);
	var SVGDOMPropertyConfig = __webpack_require__(129);
	
	var createFullPageComponent = __webpack_require__(130);
	
	function inject() {
	  ReactInjection.EventEmitter.injectReactEventListener(
	    ReactEventListener
	  );
	
	  /**
	   * Inject modules for resolving DOM hierarchy and plugin ordering.
	   */
	  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
	  ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
	  ReactInjection.EventPluginHub.injectMount(ReactMount);
	
	  /**
	   * Some important event plugins included by default (without having to require
	   * them).
	   */
	  ReactInjection.EventPluginHub.injectEventPluginsByName({
	    SimpleEventPlugin: SimpleEventPlugin,
	    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
	    ChangeEventPlugin: ChangeEventPlugin,
	    CompositionEventPlugin: CompositionEventPlugin,
	    MobileSafariClickEventPlugin: MobileSafariClickEventPlugin,
	    SelectEventPlugin: SelectEventPlugin,
	    BeforeInputEventPlugin: BeforeInputEventPlugin
	  });
	
	  ReactInjection.DOM.injectComponentClasses({
	    button: ReactDOMButton,
	    form: ReactDOMForm,
	    img: ReactDOMImg,
	    input: ReactDOMInput,
	    option: ReactDOMOption,
	    select: ReactDOMSelect,
	    textarea: ReactDOMTextarea,
	
	    html: createFullPageComponent(ReactDOM.html),
	    head: createFullPageComponent(ReactDOM.head),
	    body: createFullPageComponent(ReactDOM.body)
	  });
	
	  // This needs to happen after createFullPageComponent() otherwise the mixin
	  // gets double injected.
	  ReactInjection.CompositeComponent.injectMixin(ReactBrowserComponentMixin);
	
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
	
	  ReactInjection.EmptyComponent.injectEmptyComponent(ReactDOM.noscript);
	
	  ReactInjection.Updates.injectReconcileTransaction(
	    ReactComponentBrowserEnvironment.ReactReconcileTransaction
	  );
	  ReactInjection.Updates.injectBatchingStrategy(
	    ReactDefaultBatchingStrategy
	  );
	
	  ReactInjection.RootIndex.injectCreateReactRootIndex(
	    ExecutionEnvironment.canUseDOM ?
	      ClientReactRootIndex.createReactRootIndex :
	      ServerReactRootIndex.createReactRootIndex
	  );
	
	  ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
	
	  if ("production" !== process.env.NODE_ENV) {
	    var url = (ExecutionEnvironment.canUseDOM && window.location.href) || '';
	    if ((/[?&]react_perf\b/).test(url)) {
	      var ReactDefaultPerf = __webpack_require__(131);
	      ReactDefaultPerf.start();
	    }
	  }
	}
	
	module.exports = {
	  inject: inject
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactInstanceHandles
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var ReactRootIndex = __webpack_require__(132);
	
	var invariant = __webpack_require__(62);
	
	var SEPARATOR = '.';
	var SEPARATOR_LENGTH = SEPARATOR.length;
	
	/**
	 * Maximum depth of traversals before we consider the possibility of a bad ID.
	 */
	var MAX_TREE_DEPTH = 100;
	
	/**
	 * Creates a DOM ID prefix to use when mounting React components.
	 *
	 * @param {number} index A unique integer
	 * @return {string} React root ID.
	 * @internal
	 */
	function getReactRootIDString(index) {
	  return SEPARATOR + index.toString(36);
	}
	
	/**
	 * Checks if a character in the supplied ID is a separator or the end.
	 *
	 * @param {string} id A React DOM ID.
	 * @param {number} index Index of the character to check.
	 * @return {boolean} True if the character is a separator or end of the ID.
	 * @private
	 */
	function isBoundary(id, index) {
	  return id.charAt(index) === SEPARATOR || index === id.length;
	}
	
	/**
	 * Checks if the supplied string is a valid React DOM ID.
	 *
	 * @param {string} id A React DOM ID, maybe.
	 * @return {boolean} True if the string is a valid React DOM ID.
	 * @private
	 */
	function isValidID(id) {
	  return id === '' || (
	    id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR
	  );
	}
	
	/**
	 * Checks if the first ID is an ancestor of or equal to the second ID.
	 *
	 * @param {string} ancestorID
	 * @param {string} descendantID
	 * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
	 * @internal
	 */
	function isAncestorIDOf(ancestorID, descendantID) {
	  return (
	    descendantID.indexOf(ancestorID) === 0 &&
	    isBoundary(descendantID, ancestorID.length)
	  );
	}
	
	/**
	 * Gets the parent ID of the supplied React DOM ID, `id`.
	 *
	 * @param {string} id ID of a component.
	 * @return {string} ID of the parent, or an empty string.
	 * @private
	 */
	function getParentID(id) {
	  return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
	}
	
	/**
	 * Gets the next DOM ID on the tree path from the supplied `ancestorID` to the
	 * supplied `destinationID`. If they are equal, the ID is returned.
	 *
	 * @param {string} ancestorID ID of an ancestor node of `destinationID`.
	 * @param {string} destinationID ID of the destination node.
	 * @return {string} Next ID on the path from `ancestorID` to `destinationID`.
	 * @private
	 */
	function getNextDescendantID(ancestorID, destinationID) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    isValidID(ancestorID) && isValidID(destinationID),
	    'getNextDescendantID(%s, %s): Received an invalid React DOM ID.',
	    ancestorID,
	    destinationID
	  ) : invariant(isValidID(ancestorID) && isValidID(destinationID)));
	  ("production" !== process.env.NODE_ENV ? invariant(
	    isAncestorIDOf(ancestorID, destinationID),
	    'getNextDescendantID(...): React has made an invalid assumption about ' +
	    'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.',
	    ancestorID,
	    destinationID
	  ) : invariant(isAncestorIDOf(ancestorID, destinationID)));
	  if (ancestorID === destinationID) {
	    return ancestorID;
	  }
	  // Skip over the ancestor and the immediate separator. Traverse until we hit
	  // another separator or we reach the end of `destinationID`.
	  var start = ancestorID.length + SEPARATOR_LENGTH;
	  for (var i = start; i < destinationID.length; i++) {
	    if (isBoundary(destinationID, i)) {
	      break;
	    }
	  }
	  return destinationID.substr(0, i);
	}
	
	/**
	 * Gets the nearest common ancestor ID of two IDs.
	 *
	 * Using this ID scheme, the nearest common ancestor ID is the longest common
	 * prefix of the two IDs that immediately preceded a "marker" in both strings.
	 *
	 * @param {string} oneID
	 * @param {string} twoID
	 * @return {string} Nearest common ancestor ID, or the empty string if none.
	 * @private
	 */
	function getFirstCommonAncestorID(oneID, twoID) {
	  var minLength = Math.min(oneID.length, twoID.length);
	  if (minLength === 0) {
	    return '';
	  }
	  var lastCommonMarkerIndex = 0;
	  // Use `<=` to traverse until the "EOL" of the shorter string.
	  for (var i = 0; i <= minLength; i++) {
	    if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
	      lastCommonMarkerIndex = i;
	    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
	      break;
	    }
	  }
	  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
	  ("production" !== process.env.NODE_ENV ? invariant(
	    isValidID(longestCommonID),
	    'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s',
	    oneID,
	    twoID,
	    longestCommonID
	  ) : invariant(isValidID(longestCommonID)));
	  return longestCommonID;
	}
	
	/**
	 * Traverses the parent path between two IDs (either up or down). The IDs must
	 * not be the same, and there must exist a parent path between them. If the
	 * callback returns `false`, traversal is stopped.
	 *
	 * @param {?string} start ID at which to start traversal.
	 * @param {?string} stop ID at which to end traversal.
	 * @param {function} cb Callback to invoke each ID with.
	 * @param {?boolean} skipFirst Whether or not to skip the first node.
	 * @param {?boolean} skipLast Whether or not to skip the last node.
	 * @private
	 */
	function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
	  start = start || '';
	  stop = stop || '';
	  ("production" !== process.env.NODE_ENV ? invariant(
	    start !== stop,
	    'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.',
	    start
	  ) : invariant(start !== stop));
	  var traverseUp = isAncestorIDOf(stop, start);
	  ("production" !== process.env.NODE_ENV ? invariant(
	    traverseUp || isAncestorIDOf(start, stop),
	    'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' +
	    'not have a parent path.',
	    start,
	    stop
	  ) : invariant(traverseUp || isAncestorIDOf(start, stop)));
	  // Traverse from `start` to `stop` one depth at a time.
	  var depth = 0;
	  var traverse = traverseUp ? getParentID : getNextDescendantID;
	  for (var id = start; /* until break */; id = traverse(id, stop)) {
	    var ret;
	    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
	      ret = cb(id, traverseUp, arg);
	    }
	    if (ret === false || id === stop) {
	      // Only break //after// visiting `stop`.
	      break;
	    }
	    ("production" !== process.env.NODE_ENV ? invariant(
	      depth++ < MAX_TREE_DEPTH,
	      'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' +
	      'traversing the React DOM ID tree. This may be due to malformed IDs: %s',
	      start, stop
	    ) : invariant(depth++ < MAX_TREE_DEPTH));
	  }
	}
	
	/**
	 * Manages the IDs assigned to DOM representations of React components. This
	 * uses a specific scheme in order to traverse the DOM efficiently (e.g. in
	 * order to simulate events).
	 *
	 * @internal
	 */
	var ReactInstanceHandles = {
	
	  /**
	   * Constructs a React root ID
	   * @return {string} A React root ID.
	   */
	  createReactRootID: function() {
	    return getReactRootIDString(ReactRootIndex.createReactRootIndex());
	  },
	
	  /**
	   * Constructs a React ID by joining a root ID with a name.
	   *
	   * @param {string} rootID Root ID of a parent component.
	   * @param {string} name A component's name (as flattened children).
	   * @return {string} A React ID.
	   * @internal
	   */
	  createReactID: function(rootID, name) {
	    return rootID + name;
	  },
	
	  /**
	   * Gets the DOM ID of the React component that is the root of the tree that
	   * contains the React component with the supplied DOM ID.
	   *
	   * @param {string} id DOM ID of a React component.
	   * @return {?string} DOM ID of the React component that is the root.
	   * @internal
	   */
	  getReactRootIDFromNodeID: function(id) {
	    if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
	      var index = id.indexOf(SEPARATOR, 1);
	      return index > -1 ? id.substr(0, index) : id;
	    }
	    return null;
	  },
	
	  /**
	   * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
	   * should would receive a `mouseEnter` or `mouseLeave` event.
	   *
	   * NOTE: Does not invoke the callback on the nearest common ancestor because
	   * nothing "entered" or "left" that element.
	   *
	   * @param {string} leaveID ID being left.
	   * @param {string} enterID ID being entered.
	   * @param {function} cb Callback to invoke on each entered/left ID.
	   * @param {*} upArg Argument to invoke the callback with on left IDs.
	   * @param {*} downArg Argument to invoke the callback with on entered IDs.
	   * @internal
	   */
	  traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
	    var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
	    if (ancestorID !== leaveID) {
	      traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
	    }
	    if (ancestorID !== enterID) {
	      traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
	    }
	  },
	
	  /**
	   * Simulates the traversal of a two-phase, capture/bubble event dispatch.
	   *
	   * NOTE: This traversal happens on IDs without touching the DOM.
	   *
	   * @param {string} targetID ID of the target node.
	   * @param {function} cb Callback to invoke.
	   * @param {*} arg Argument to invoke the callback with.
	   * @internal
	   */
	  traverseTwoPhase: function(targetID, cb, arg) {
	    if (targetID) {
	      traverseParentPath('', targetID, cb, arg, true, false);
	      traverseParentPath(targetID, '', cb, arg, false, true);
	    }
	  },
	
	  /**
	   * Traverse a node ID, calling the supplied `cb` for each ancestor ID. For
	   * example, passing `.0.$row-0.1` would result in `cb` getting called
	   * with `.0`, `.0.$row-0`, and `.0.$row-0.1`.
	   *
	   * NOTE: This traversal happens on IDs without touching the DOM.
	   *
	   * @param {string} targetID ID of the target node.
	   * @param {function} cb Callback to invoke.
	   * @param {*} arg Argument to invoke the callback with.
	   * @internal
	   */
	  traverseAncestors: function(targetID, cb, arg) {
	    traverseParentPath('', targetID, cb, arg, true, false);
	  },
	
	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _getFirstCommonAncestorID: getFirstCommonAncestorID,
	
	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _getNextDescendantID: getNextDescendantID,
	
	  isAncestorIDOf: isAncestorIDOf,
	
	  SEPARATOR: SEPARATOR
	
	};
	
	module.exports = ReactInstanceHandles;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMount
	 */
	
	"use strict";
	
	var DOMProperty = __webpack_require__(84);
	var ReactBrowserEventEmitter = __webpack_require__(106);
	var ReactCurrentOwner = __webpack_require__(47);
	var ReactDescriptor = __webpack_require__(48);
	var ReactInstanceHandles = __webpack_require__(52);
	var ReactPerf = __webpack_require__(55);
	
	var containsNode = __webpack_require__(133);
	var getReactRootElementInContainer = __webpack_require__(134);
	var instantiateReactComponent = __webpack_require__(69);
	var invariant = __webpack_require__(62);
	var shouldUpdateReactComponent = __webpack_require__(102);
	var warning = __webpack_require__(60);
	
	var SEPARATOR = ReactInstanceHandles.SEPARATOR;
	
	var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
	var nodeCache = {};
	
	var ELEMENT_NODE_TYPE = 1;
	var DOC_NODE_TYPE = 9;
	
	/** Mapping from reactRootID to React component instance. */
	var instancesByReactRootID = {};
	
	/** Mapping from reactRootID to `container` nodes. */
	var containersByReactRootID = {};
	
	if ("production" !== process.env.NODE_ENV) {
	  /** __DEV__-only mapping from reactRootID to root elements. */
	  var rootElementsByReactRootID = {};
	}
	
	// Used to store breadth-first search state in findComponentRoot.
	var findComponentRootReusableArray = [];
	
	/**
	 * @param {DOMElement} container DOM element that may contain a React component.
	 * @return {?string} A "reactRoot" ID, if a React component is rendered.
	 */
	function getReactRootID(container) {
	  var rootElement = getReactRootElementInContainer(container);
	  return rootElement && ReactMount.getID(rootElement);
	}
	
	/**
	 * Accessing node[ATTR_NAME] or calling getAttribute(ATTR_NAME) on a form
	 * element can return its control whose name or ID equals ATTR_NAME. All
	 * DOM nodes support `getAttributeNode` but this can also get called on
	 * other objects so just return '' if we're given something other than a
	 * DOM node (such as window).
	 *
	 * @param {?DOMElement|DOMWindow|DOMDocument|DOMTextNode} node DOM node.
	 * @return {string} ID of the supplied `domNode`.
	 */
	function getID(node) {
	  var id = internalGetID(node);
	  if (id) {
	    if (nodeCache.hasOwnProperty(id)) {
	      var cached = nodeCache[id];
	      if (cached !== node) {
	        ("production" !== process.env.NODE_ENV ? invariant(
	          !isValid(cached, id),
	          'ReactMount: Two valid but unequal nodes with the same `%s`: %s',
	          ATTR_NAME, id
	        ) : invariant(!isValid(cached, id)));
	
	        nodeCache[id] = node;
	      }
	    } else {
	      nodeCache[id] = node;
	    }
	  }
	
	  return id;
	}
	
	function internalGetID(node) {
	  // If node is something like a window, document, or text node, none of
	  // which support attributes or a .getAttribute method, gracefully return
	  // the empty string, as if the attribute were missing.
	  return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
	}
	
	/**
	 * Sets the React-specific ID of the given node.
	 *
	 * @param {DOMElement} node The DOM node whose ID will be set.
	 * @param {string} id The value of the ID attribute.
	 */
	function setID(node, id) {
	  var oldID = internalGetID(node);
	  if (oldID !== id) {
	    delete nodeCache[oldID];
	  }
	  node.setAttribute(ATTR_NAME, id);
	  nodeCache[id] = node;
	}
	
	/**
	 * Finds the node with the supplied React-generated DOM ID.
	 *
	 * @param {string} id A React-generated DOM ID.
	 * @return {DOMElement} DOM node with the suppled `id`.
	 * @internal
	 */
	function getNode(id) {
	  if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
	    nodeCache[id] = ReactMount.findReactNodeByID(id);
	  }
	  return nodeCache[id];
	}
	
	/**
	 * A node is "valid" if it is contained by a currently mounted container.
	 *
	 * This means that the node does not have to be contained by a document in
	 * order to be considered valid.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @param {string} id The expected ID of the node.
	 * @return {boolean} Whether the node is contained by a mounted container.
	 */
	function isValid(node, id) {
	  if (node) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      internalGetID(node) === id,
	      'ReactMount: Unexpected modification of `%s`',
	      ATTR_NAME
	    ) : invariant(internalGetID(node) === id));
	
	    var container = ReactMount.findReactContainerForID(id);
	    if (container && containsNode(container, node)) {
	      return true;
	    }
	  }
	
	  return false;
	}
	
	/**
	 * Causes the cache to forget about one React-specific ID.
	 *
	 * @param {string} id The ID to forget.
	 */
	function purgeID(id) {
	  delete nodeCache[id];
	}
	
	var deepestNodeSoFar = null;
	function findDeepestCachedAncestorImpl(ancestorID) {
	  var ancestor = nodeCache[ancestorID];
	  if (ancestor && isValid(ancestor, ancestorID)) {
	    deepestNodeSoFar = ancestor;
	  } else {
	    // This node isn't populated in the cache, so presumably none of its
	    // descendants are. Break out of the loop.
	    return false;
	  }
	}
	
	/**
	 * Return the deepest cached node whose ID is a prefix of `targetID`.
	 */
	function findDeepestCachedAncestor(targetID) {
	  deepestNodeSoFar = null;
	  ReactInstanceHandles.traverseAncestors(
	    targetID,
	    findDeepestCachedAncestorImpl
	  );
	
	  var foundNode = deepestNodeSoFar;
	  deepestNodeSoFar = null;
	  return foundNode;
	}
	
	/**
	 * Mounting is the process of initializing a React component by creatings its
	 * representative DOM elements and inserting them into a supplied `container`.
	 * Any prior content inside `container` is destroyed in the process.
	 *
	 *   ReactMount.renderComponent(
	 *     component,
	 *     document.getElementById('container')
	 *   );
	 *
	 *   <div id="container">                   <-- Supplied `container`.
	 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
	 *       // ...                                 component.
	 *     </div>
	 *   </div>
	 *
	 * Inside of `container`, the first element rendered is the "reactRoot".
	 */
	var ReactMount = {
	  /** Exposed for debugging purposes **/
	  _instancesByReactRootID: instancesByReactRootID,
	
	  /**
	   * This is a hook provided to support rendering React components while
	   * ensuring that the apparent scroll position of its `container` does not
	   * change.
	   *
	   * @param {DOMElement} container The `container` being rendered into.
	   * @param {function} renderCallback This must be called once to do the render.
	   */
	  scrollMonitor: function(container, renderCallback) {
	    renderCallback();
	  },
	
	  /**
	   * Take a component that's already mounted into the DOM and replace its props
	   * @param {ReactComponent} prevComponent component instance already in the DOM
	   * @param {ReactComponent} nextComponent component instance to render
	   * @param {DOMElement} container container to render into
	   * @param {?function} callback function triggered on completion
	   */
	  _updateRootComponent: function(
	      prevComponent,
	      nextComponent,
	      container,
	      callback) {
	    var nextProps = nextComponent.props;
	    ReactMount.scrollMonitor(container, function() {
	      prevComponent.replaceProps(nextProps, callback);
	    });
	
	    if ("production" !== process.env.NODE_ENV) {
	      // Record the root element in case it later gets transplanted.
	      rootElementsByReactRootID[getReactRootID(container)] =
	        getReactRootElementInContainer(container);
	    }
	
	    return prevComponent;
	  },
	
	  /**
	   * Register a component into the instance map and starts scroll value
	   * monitoring
	   * @param {ReactComponent} nextComponent component instance to render
	   * @param {DOMElement} container container to render into
	   * @return {string} reactRoot ID prefix
	   */
	  _registerComponent: function(nextComponent, container) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      container && (
	        container.nodeType === ELEMENT_NODE_TYPE ||
	        container.nodeType === DOC_NODE_TYPE
	      ),
	      '_registerComponent(...): Target container is not a DOM element.'
	    ) : invariant(container && (
	      container.nodeType === ELEMENT_NODE_TYPE ||
	      container.nodeType === DOC_NODE_TYPE
	    )));
	
	    ReactBrowserEventEmitter.ensureScrollValueMonitoring();
	
	    var reactRootID = ReactMount.registerContainer(container);
	    instancesByReactRootID[reactRootID] = nextComponent;
	    return reactRootID;
	  },
	
	  /**
	   * Render a new component into the DOM.
	   * @param {ReactComponent} nextComponent component instance to render
	   * @param {DOMElement} container container to render into
	   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
	   * @return {ReactComponent} nextComponent
	   */
	  _renderNewRootComponent: ReactPerf.measure(
	    'ReactMount',
	    '_renderNewRootComponent',
	    function(
	        nextComponent,
	        container,
	        shouldReuseMarkup) {
	      // Various parts of our code (such as ReactCompositeComponent's
	      // _renderValidatedComponent) assume that calls to render aren't nested;
	      // verify that that's the case.
	      ("production" !== process.env.NODE_ENV ? warning(
	        ReactCurrentOwner.current == null,
	        '_renderNewRootComponent(): Render methods should be a pure function ' +
	        'of props and state; triggering nested component updates from ' +
	        'render is not allowed. If necessary, trigger nested updates in ' +
	        'componentDidUpdate.'
	      ) : null);
	
	      var componentInstance = instantiateReactComponent(nextComponent);
	      var reactRootID = ReactMount._registerComponent(
	        componentInstance,
	        container
	      );
	      componentInstance.mountComponentIntoNode(
	        reactRootID,
	        container,
	        shouldReuseMarkup
	      );
	
	      if ("production" !== process.env.NODE_ENV) {
	        // Record the root element in case it later gets transplanted.
	        rootElementsByReactRootID[reactRootID] =
	          getReactRootElementInContainer(container);
	      }
	
	      return componentInstance;
	    }
	  ),
	
	  /**
	   * Renders a React component into the DOM in the supplied `container`.
	   *
	   * If the React component was previously rendered into `container`, this will
	   * perform an update on it and only mutate the DOM as necessary to reflect the
	   * latest React component.
	   *
	   * @param {ReactDescriptor} nextDescriptor Component descriptor to render.
	   * @param {DOMElement} container DOM element to render into.
	   * @param {?function} callback function triggered on completion
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  renderComponent: function(nextDescriptor, container, callback) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ReactDescriptor.isValidDescriptor(nextDescriptor),
	      'renderComponent(): Invalid component descriptor.%s',
	      (
	        ReactDescriptor.isValidFactory(nextDescriptor) ?
	          ' Instead of passing a component class, make sure to instantiate ' +
	          'it first by calling it with props.' :
	        // Check if it quacks like a descriptor
	        typeof nextDescriptor.props !== "undefined" ?
	          ' This may be caused by unintentionally loading two independent ' +
	          'copies of React.' :
	          ''
	      )
	    ) : invariant(ReactDescriptor.isValidDescriptor(nextDescriptor)));
	
	    var prevComponent = instancesByReactRootID[getReactRootID(container)];
	
	    if (prevComponent) {
	      var prevDescriptor = prevComponent._descriptor;
	      if (shouldUpdateReactComponent(prevDescriptor, nextDescriptor)) {
	        return ReactMount._updateRootComponent(
	          prevComponent,
	          nextDescriptor,
	          container,
	          callback
	        );
	      } else {
	        ReactMount.unmountComponentAtNode(container);
	      }
	    }
	
	    var reactRootElement = getReactRootElementInContainer(container);
	    var containerHasReactMarkup =
	      reactRootElement && ReactMount.isRenderedByReact(reactRootElement);
	
	    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;
	
	    var component = ReactMount._renderNewRootComponent(
	      nextDescriptor,
	      container,
	      shouldReuseMarkup
	    );
	    callback && callback.call(component);
	    return component;
	  },
	
	  /**
	   * Constructs a component instance of `constructor` with `initialProps` and
	   * renders it into the supplied `container`.
	   *
	   * @param {function} constructor React component constructor.
	   * @param {?object} props Initial props of the component instance.
	   * @param {DOMElement} container DOM element to render into.
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  constructAndRenderComponent: function(constructor, props, container) {
	    return ReactMount.renderComponent(constructor(props), container);
	  },
	
	  /**
	   * Constructs a component instance of `constructor` with `initialProps` and
	   * renders it into a container node identified by supplied `id`.
	   *
	   * @param {function} componentConstructor React component constructor
	   * @param {?object} props Initial props of the component instance.
	   * @param {string} id ID of the DOM element to render into.
	   * @return {ReactComponent} Component instance rendered in the container node.
	   */
	  constructAndRenderComponentByID: function(constructor, props, id) {
	    var domNode = document.getElementById(id);
	    ("production" !== process.env.NODE_ENV ? invariant(
	      domNode,
	      'Tried to get element with id of "%s" but it is not present on the page.',
	      id
	    ) : invariant(domNode));
	    return ReactMount.constructAndRenderComponent(constructor, props, domNode);
	  },
	
	  /**
	   * Registers a container node into which React components will be rendered.
	   * This also creates the "reactRoot" ID that will be assigned to the element
	   * rendered within.
	   *
	   * @param {DOMElement} container DOM element to register as a container.
	   * @return {string} The "reactRoot" ID of elements rendered within.
	   */
	  registerContainer: function(container) {
	    var reactRootID = getReactRootID(container);
	    if (reactRootID) {
	      // If one exists, make sure it is a valid "reactRoot" ID.
	      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
	    }
	    if (!reactRootID) {
	      // No valid "reactRoot" ID found, create one.
	      reactRootID = ReactInstanceHandles.createReactRootID();
	    }
	    containersByReactRootID[reactRootID] = container;
	    return reactRootID;
	  },
	
	  /**
	   * Unmounts and destroys the React component rendered in the `container`.
	   *
	   * @param {DOMElement} container DOM element containing a React component.
	   * @return {boolean} True if a component was found in and unmounted from
	   *                   `container`
	   */
	  unmountComponentAtNode: function(container) {
	    // Various parts of our code (such as ReactCompositeComponent's
	    // _renderValidatedComponent) assume that calls to render aren't nested;
	    // verify that that's the case. (Strictly speaking, unmounting won't cause a
	    // render but we still don't expect to be in a render call here.)
	    ("production" !== process.env.NODE_ENV ? warning(
	      ReactCurrentOwner.current == null,
	      'unmountComponentAtNode(): Render methods should be a pure function of ' +
	      'props and state; triggering nested component updates from render is ' +
	      'not allowed. If necessary, trigger nested updates in ' +
	      'componentDidUpdate.'
	    ) : null);
	
	    var reactRootID = getReactRootID(container);
	    var component = instancesByReactRootID[reactRootID];
	    if (!component) {
	      return false;
	    }
	    ReactMount.unmountComponentFromNode(component, container);
	    delete instancesByReactRootID[reactRootID];
	    delete containersByReactRootID[reactRootID];
	    if ("production" !== process.env.NODE_ENV) {
	      delete rootElementsByReactRootID[reactRootID];
	    }
	    return true;
	  },
	
	  /**
	   * Unmounts a component and removes it from the DOM.
	   *
	   * @param {ReactComponent} instance React component instance.
	   * @param {DOMElement} container DOM element to unmount from.
	   * @final
	   * @internal
	   * @see {ReactMount.unmountComponentAtNode}
	   */
	  unmountComponentFromNode: function(instance, container) {
	    instance.unmountComponent();
	
	    if (container.nodeType === DOC_NODE_TYPE) {
	      container = container.documentElement;
	    }
	
	    // http://jsperf.com/emptying-a-node
	    while (container.lastChild) {
	      container.removeChild(container.lastChild);
	    }
	  },
	
	  /**
	   * Finds the container DOM element that contains React component to which the
	   * supplied DOM `id` belongs.
	   *
	   * @param {string} id The ID of an element rendered by a React component.
	   * @return {?DOMElement} DOM element that contains the `id`.
	   */
	  findReactContainerForID: function(id) {
	    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
	    var container = containersByReactRootID[reactRootID];
	
	    if ("production" !== process.env.NODE_ENV) {
	      var rootElement = rootElementsByReactRootID[reactRootID];
	      if (rootElement && rootElement.parentNode !== container) {
	        ("production" !== process.env.NODE_ENV ? invariant(
	          // Call internalGetID here because getID calls isValid which calls
	          // findReactContainerForID (this function).
	          internalGetID(rootElement) === reactRootID,
	          'ReactMount: Root element ID differed from reactRootID.'
	        ) : invariant(// Call internalGetID here because getID calls isValid which calls
	        // findReactContainerForID (this function).
	        internalGetID(rootElement) === reactRootID));
	
	        var containerChild = container.firstChild;
	        if (containerChild &&
	            reactRootID === internalGetID(containerChild)) {
	          // If the container has a new child with the same ID as the old
	          // root element, then rootElementsByReactRootID[reactRootID] is
	          // just stale and needs to be updated. The case that deserves a
	          // warning is when the container is empty.
	          rootElementsByReactRootID[reactRootID] = containerChild;
	        } else {
	          console.warn(
	            'ReactMount: Root element has been removed from its original ' +
	            'container. New container:', rootElement.parentNode
	          );
	        }
	      }
	    }
	
	    return container;
	  },
	
	  /**
	   * Finds an element rendered by React with the supplied ID.
	   *
	   * @param {string} id ID of a DOM node in the React component.
	   * @return {DOMElement} Root DOM node of the React component.
	   */
	  findReactNodeByID: function(id) {
	    var reactRoot = ReactMount.findReactContainerForID(id);
	    return ReactMount.findComponentRoot(reactRoot, id);
	  },
	
	  /**
	   * True if the supplied `node` is rendered by React.
	   *
	   * @param {*} node DOM Element to check.
	   * @return {boolean} True if the DOM Element appears to be rendered by React.
	   * @internal
	   */
	  isRenderedByReact: function(node) {
	    if (node.nodeType !== 1) {
	      // Not a DOMElement, therefore not a React component
	      return false;
	    }
	    var id = ReactMount.getID(node);
	    return id ? id.charAt(0) === SEPARATOR : false;
	  },
	
	  /**
	   * Traverses up the ancestors of the supplied node to find a node that is a
	   * DOM representation of a React component.
	   *
	   * @param {*} node
	   * @return {?DOMEventTarget}
	   * @internal
	   */
	  getFirstReactDOM: function(node) {
	    var current = node;
	    while (current && current.parentNode !== current) {
	      if (ReactMount.isRenderedByReact(current)) {
	        return current;
	      }
	      current = current.parentNode;
	    }
	    return null;
	  },
	
	  /**
	   * Finds a node with the supplied `targetID` inside of the supplied
	   * `ancestorNode`.  Exploits the ID naming scheme to perform the search
	   * quickly.
	   *
	   * @param {DOMEventTarget} ancestorNode Search from this root.
	   * @pararm {string} targetID ID of the DOM representation of the component.
	   * @return {DOMEventTarget} DOM node with the supplied `targetID`.
	   * @internal
	   */
	  findComponentRoot: function(ancestorNode, targetID) {
	    var firstChildren = findComponentRootReusableArray;
	    var childIndex = 0;
	
	    var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;
	
	    firstChildren[0] = deepestAncestor.firstChild;
	    firstChildren.length = 1;
	
	    while (childIndex < firstChildren.length) {
	      var child = firstChildren[childIndex++];
	      var targetChild;
	
	      while (child) {
	        var childID = ReactMount.getID(child);
	        if (childID) {
	          // Even if we find the node we're looking for, we finish looping
	          // through its siblings to ensure they're cached so that we don't have
	          // to revisit this node again. Otherwise, we make n^2 calls to getID
	          // when visiting the many children of a single node in order.
	
	          if (targetID === childID) {
	            targetChild = child;
	          } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
	            // If we find a child whose ID is an ancestor of the given ID,
	            // then we can be sure that we only want to search the subtree
	            // rooted at this child, so we can throw out the rest of the
	            // search state.
	            firstChildren.length = childIndex = 0;
	            firstChildren.push(child.firstChild);
	          }
	
	        } else {
	          // If this child had no ID, then there's a chance that it was
	          // injected automatically by the browser, as when a `<table>`
	          // element sprouts an extra `<tbody>` child as a side effect of
	          // `.innerHTML` parsing. Optimistically continue down this
	          // branch, but not before examining the other siblings.
	          firstChildren.push(child.firstChild);
	        }
	
	        child = child.nextSibling;
	      }
	
	      if (targetChild) {
	        // Emptying firstChildren/findComponentRootReusableArray is
	        // not necessary for correctness, but it helps the GC reclaim
	        // any nodes that were left at the end of the search.
	        firstChildren.length = 0;
	
	        return targetChild;
	      }
	    }
	
	    firstChildren.length = 0;
	
	    ("production" !== process.env.NODE_ENV ? invariant(
	      false,
	      'findComponentRoot(..., %s): Unable to find element. This probably ' +
	      'means the DOM was unexpectedly mutated (e.g., by the browser), ' +
	      'usually due to forgetting a <tbody> when using tables, nesting <p> ' +
	      'or <a> tags, or using non-SVG elements in an <svg> parent. Try ' +
	      'inspecting the child nodes of the element with React ID `%s`.',
	      targetID,
	      ReactMount.getID(ancestorNode)
	    ) : invariant(false));
	  },
	
	
	  /**
	   * React ID utilities.
	   */
	
	  getReactRootID: getReactRootID,
	
	  getID: getID,
	
	  setID: setID,
	
	  getNode: getNode,
	
	  purgeID: purgeID
	};
	
	module.exports = ReactMount;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMultiChild
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var ReactComponent = __webpack_require__(44);
	var ReactMultiChildUpdateTypes = __webpack_require__(135);
	
	var flattenChildren = __webpack_require__(136);
	var instantiateReactComponent = __webpack_require__(69);
	var shouldUpdateReactComponent = __webpack_require__(102);
	
	/**
	 * Updating children of a component may trigger recursive updates. The depth is
	 * used to batch recursive updates to render markup more efficiently.
	 *
	 * @type {number}
	 * @private
	 */
	var updateDepth = 0;
	
	/**
	 * Queue of update configuration objects.
	 *
	 * Each object has a `type` property that is in `ReactMultiChildUpdateTypes`.
	 *
	 * @type {array<object>}
	 * @private
	 */
	var updateQueue = [];
	
	/**
	 * Queue of markup to be rendered.
	 *
	 * @type {array<string>}
	 * @private
	 */
	var markupQueue = [];
	
	/**
	 * Enqueues markup to be rendered and inserted at a supplied index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {string} markup Markup that renders into an element.
	 * @param {number} toIndex Destination index.
	 * @private
	 */
	function enqueueMarkup(parentID, markup, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
	    markupIndex: markupQueue.push(markup) - 1,
	    textContent: null,
	    fromIndex: null,
	    toIndex: toIndex
	  });
	}
	
	/**
	 * Enqueues moving an existing element to another index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {number} fromIndex Source index of the existing element.
	 * @param {number} toIndex Destination index of the element.
	 * @private
	 */
	function enqueueMove(parentID, fromIndex, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
	    markupIndex: null,
	    textContent: null,
	    fromIndex: fromIndex,
	    toIndex: toIndex
	  });
	}
	
	/**
	 * Enqueues removing an element at an index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {number} fromIndex Index of the element to remove.
	 * @private
	 */
	function enqueueRemove(parentID, fromIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
	    markupIndex: null,
	    textContent: null,
	    fromIndex: fromIndex,
	    toIndex: null
	  });
	}
	
	/**
	 * Enqueues setting the text content.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {string} textContent Text content to set.
	 * @private
	 */
	function enqueueTextContent(parentID, textContent) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
	    markupIndex: null,
	    textContent: textContent,
	    fromIndex: null,
	    toIndex: null
	  });
	}
	
	/**
	 * Processes any enqueued updates.
	 *
	 * @private
	 */
	function processQueue() {
	  if (updateQueue.length) {
	    ReactComponent.BackendIDOperations.dangerouslyProcessChildrenUpdates(
	      updateQueue,
	      markupQueue
	    );
	    clearQueue();
	  }
	}
	
	/**
	 * Clears any enqueued updates.
	 *
	 * @private
	 */
	function clearQueue() {
	  updateQueue.length = 0;
	  markupQueue.length = 0;
	}
	
	/**
	 * ReactMultiChild are capable of reconciling multiple children.
	 *
	 * @class ReactMultiChild
	 * @internal
	 */
	var ReactMultiChild = {
	
	  /**
	   * Provides common functionality for components that must reconcile multiple
	   * children. This is used by `ReactDOMComponent` to mount, update, and
	   * unmount child components.
	   *
	   * @lends {ReactMultiChild.prototype}
	   */
	  Mixin: {
	
	    /**
	     * Generates a "mount image" for each of the supplied children. In the case
	     * of `ReactDOMComponent`, a mount image is a string of markup.
	     *
	     * @param {?object} nestedChildren Nested child maps.
	     * @return {array} An array of mounted representations.
	     * @internal
	     */
	    mountChildren: function(nestedChildren, transaction) {
	      var children = flattenChildren(nestedChildren);
	      var mountImages = [];
	      var index = 0;
	      this._renderedChildren = children;
	      for (var name in children) {
	        var child = children[name];
	        if (children.hasOwnProperty(name)) {
	          // The rendered children must be turned into instances as they're
	          // mounted.
	          var childInstance = instantiateReactComponent(child);
	          children[name] = childInstance;
	          // Inlined for performance, see `ReactInstanceHandles.createReactID`.
	          var rootID = this._rootNodeID + name;
	          var mountImage = childInstance.mountComponent(
	            rootID,
	            transaction,
	            this._mountDepth + 1
	          );
	          childInstance._mountIndex = index;
	          mountImages.push(mountImage);
	          index++;
	        }
	      }
	      return mountImages;
	    },
	
	    /**
	     * Replaces any rendered children with a text content string.
	     *
	     * @param {string} nextContent String of content.
	     * @internal
	     */
	    updateTextContent: function(nextContent) {
	      updateDepth++;
	      var errorThrown = true;
	      try {
	        var prevChildren = this._renderedChildren;
	        // Remove any rendered children.
	        for (var name in prevChildren) {
	          if (prevChildren.hasOwnProperty(name)) {
	            this._unmountChildByName(prevChildren[name], name);
	          }
	        }
	        // Set new text content.
	        this.setTextContent(nextContent);
	        errorThrown = false;
	      } finally {
	        updateDepth--;
	        if (!updateDepth) {
	          errorThrown ? clearQueue() : processQueue();
	        }
	      }
	    },
	
	    /**
	     * Updates the rendered children with new children.
	     *
	     * @param {?object} nextNestedChildren Nested child maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    updateChildren: function(nextNestedChildren, transaction) {
	      updateDepth++;
	      var errorThrown = true;
	      try {
	        this._updateChildren(nextNestedChildren, transaction);
	        errorThrown = false;
	      } finally {
	        updateDepth--;
	        if (!updateDepth) {
	          errorThrown ? clearQueue() : processQueue();
	        }
	      }
	    },
	
	    /**
	     * Improve performance by isolating this hot code path from the try/catch
	     * block in `updateChildren`.
	     *
	     * @param {?object} nextNestedChildren Nested child maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @final
	     * @protected
	     */
	    _updateChildren: function(nextNestedChildren, transaction) {
	      var nextChildren = flattenChildren(nextNestedChildren);
	      var prevChildren = this._renderedChildren;
	      if (!nextChildren && !prevChildren) {
	        return;
	      }
	      var name;
	      // `nextIndex` will increment for each child in `nextChildren`, but
	      // `lastIndex` will be the last index visited in `prevChildren`.
	      var lastIndex = 0;
	      var nextIndex = 0;
	      for (name in nextChildren) {
	        if (!nextChildren.hasOwnProperty(name)) {
	          continue;
	        }
	        var prevChild = prevChildren && prevChildren[name];
	        var prevDescriptor = prevChild && prevChild._descriptor;
	        var nextDescriptor = nextChildren[name];
	        if (shouldUpdateReactComponent(prevDescriptor, nextDescriptor)) {
	          this.moveChild(prevChild, nextIndex, lastIndex);
	          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	          prevChild.receiveComponent(nextDescriptor, transaction);
	          prevChild._mountIndex = nextIndex;
	        } else {
	          if (prevChild) {
	            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
	            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	            this._unmountChildByName(prevChild, name);
	          }
	          // The child must be instantiated before it's mounted.
	          var nextChildInstance = instantiateReactComponent(nextDescriptor);
	          this._mountChildByNameAtIndex(
	            nextChildInstance, name, nextIndex, transaction
	          );
	        }
	        nextIndex++;
	      }
	      // Remove children that are no longer present.
	      for (name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name) &&
	            !(nextChildren && nextChildren[name])) {
	          this._unmountChildByName(prevChildren[name], name);
	        }
	      }
	    },
	
	    /**
	     * Unmounts all rendered children. This should be used to clean up children
	     * when this component is unmounted.
	     *
	     * @internal
	     */
	    unmountChildren: function() {
	      var renderedChildren = this._renderedChildren;
	      for (var name in renderedChildren) {
	        var renderedChild = renderedChildren[name];
	        // TODO: When is this not true?
	        if (renderedChild.unmountComponent) {
	          renderedChild.unmountComponent();
	        }
	      }
	      this._renderedChildren = null;
	    },
	
	    /**
	     * Moves a child component to the supplied index.
	     *
	     * @param {ReactComponent} child Component to move.
	     * @param {number} toIndex Destination index of the element.
	     * @param {number} lastIndex Last index visited of the siblings of `child`.
	     * @protected
	     */
	    moveChild: function(child, toIndex, lastIndex) {
	      // If the index of `child` is less than `lastIndex`, then it needs to
	      // be moved. Otherwise, we do not need to move it because a child will be
	      // inserted or moved before `child`.
	      if (child._mountIndex < lastIndex) {
	        enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
	      }
	    },
	
	    /**
	     * Creates a child component.
	     *
	     * @param {ReactComponent} child Component to create.
	     * @param {string} mountImage Markup to insert.
	     * @protected
	     */
	    createChild: function(child, mountImage) {
	      enqueueMarkup(this._rootNodeID, mountImage, child._mountIndex);
	    },
	
	    /**
	     * Removes a child component.
	     *
	     * @param {ReactComponent} child Child to remove.
	     * @protected
	     */
	    removeChild: function(child) {
	      enqueueRemove(this._rootNodeID, child._mountIndex);
	    },
	
	    /**
	     * Sets this text content string.
	     *
	     * @param {string} textContent Text content to set.
	     * @protected
	     */
	    setTextContent: function(textContent) {
	      enqueueTextContent(this._rootNodeID, textContent);
	    },
	
	    /**
	     * Mounts a child with the supplied name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to mount.
	     * @param {string} name Name of the child.
	     * @param {number} index Index at which to insert the child.
	     * @param {ReactReconcileTransaction} transaction
	     * @private
	     */
	    _mountChildByNameAtIndex: function(child, name, index, transaction) {
	      // Inlined for performance, see `ReactInstanceHandles.createReactID`.
	      var rootID = this._rootNodeID + name;
	      var mountImage = child.mountComponent(
	        rootID,
	        transaction,
	        this._mountDepth + 1
	      );
	      child._mountIndex = index;
	      this.createChild(child, mountImage);
	      this._renderedChildren = this._renderedChildren || {};
	      this._renderedChildren[name] = child;
	    },
	
	    /**
	     * Unmounts a rendered child by name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to unmount.
	     * @param {string} name Name of the child in `this._renderedChildren`.
	     * @private
	     */
	    _unmountChildByName: function(child, name) {
	      this.removeChild(child);
	      child._mountIndex = null;
	      child.unmountComponent();
	      delete this._renderedChildren[name];
	    }
	
	  }
	
	};
	
	module.exports = ReactMultiChild;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPerf
	 * @typechecks static-only
	 */
	
	"use strict";
	
	/**
	 * ReactPerf is a general AOP system designed to measure performance. This
	 * module only has the hooks: see ReactDefaultPerf for the analysis tool.
	 */
	var ReactPerf = {
	  /**
	   * Boolean to enable/disable measurement. Set to false by default to prevent
	   * accidental logging and perf loss.
	   */
	  enableMeasure: false,
	
	  /**
	   * Holds onto the measure function in use. By default, don't measure
	   * anything, but we'll override this if we inject a measure function.
	   */
	  storedMeasure: _noMeasure,
	
	  /**
	   * Use this to wrap methods you want to measure. Zero overhead in production.
	   *
	   * @param {string} objName
	   * @param {string} fnName
	   * @param {function} func
	   * @return {function}
	   */
	  measure: function(objName, fnName, func) {
	    if ("production" !== process.env.NODE_ENV) {
	      var measuredFunc = null;
	      return function() {
	        if (ReactPerf.enableMeasure) {
	          if (!measuredFunc) {
	            measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
	          }
	          return measuredFunc.apply(this, arguments);
	        }
	        return func.apply(this, arguments);
	      };
	    }
	    return func;
	  },
	
	  injection: {
	    /**
	     * @param {function} measure
	     */
	    injectMeasure: function(measure) {
	      ReactPerf.storedMeasure = measure;
	    }
	  }
	};
	
	/**
	 * Simply passes through the measured function, without measuring it.
	 *
	 * @param {string} objName
	 * @param {string} fnName
	 * @param {function} func
	 * @return {function}
	 */
	function _noMeasure(objName, fnName, func) {
	  return func;
	}
	
	module.exports = ReactPerf;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPropTypes
	 */
	
	"use strict";
	
	var ReactDescriptor = __webpack_require__(48);
	var ReactPropTypeLocationNames = __webpack_require__(98);
	
	var emptyFunction = __webpack_require__(137);
	
	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */
	
	var ANONYMOUS = '<<anonymous>>';
	
	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),
	
	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  component: createComponentTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  renderable: createRenderableTypeChecker(),
	  shape: createShapeTypeChecker
	};
	
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location) {
	    componentName = componentName || ANONYMOUS;
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new Error(
	          ("Required " + locationName + " `" + propName + "` was not specified in ")+
	          ("`" + componentName + "`.")
	        );
	      }
	    } else {
	      return validate(props, propName, componentName, location);
	    }
	  }
	
	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	
	  return chainedCheckType;
	}
	
	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);
	
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` of type `" + preciseType + "` ") +
	        ("supplied to `" + componentName + "`, expected `" + expectedType + "`.")
	      );
	    }
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns());
	}
	
	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` of type ") +
	        ("`" + propType + "` supplied to `" + componentName + "`, expected an array.")
	      );
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location);
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createComponentTypeChecker() {
	  function validate(props, propName, componentName, location) {
	    if (!ReactDescriptor.isValidDescriptor(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` supplied to ") +
	        ("`" + componentName + "`, expected a React component.")
	      );
	    }
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` supplied to ") +
	        ("`" + componentName + "`, expected instance of `" + expectedClassName + "`.")
	      );
	    }
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createEnumTypeChecker(expectedValues) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (propValue === expectedValues[i]) {
	        return;
	      }
	    }
	
	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error(
	      ("Invalid " + locationName + " `" + propName + "` of value `" + propValue + "` ") +
	      ("supplied to `" + componentName + "`, expected one of " + valuesString + ".")
	    );
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` of type ") +
	        ("`" + propType + "` supplied to `" + componentName + "`, expected an object.")
	      );
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  function validate(props, propName, componentName, location) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location) == null) {
	        return;
	      }
	    }
	
	    var locationName = ReactPropTypeLocationNames[location];
	    return new Error(
	      ("Invalid " + locationName + " `" + propName + "` supplied to ") +
	      ("`" + componentName + "`.")
	    );
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createRenderableTypeChecker() {
	  function validate(props, propName, componentName, location) {
	    if (!isRenderable(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` supplied to ") +
	        ("`" + componentName + "`, expected a renderable prop.")
	      );
	    }
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` of type `" + propType + "` ") +
	        ("supplied to `" + componentName + "`, expected `object`.")
	      );
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location);
	      if (error) {
	        return error;
	      }
	    }
	  }
	  return createChainableTypeChecker(validate, 'expected `object`');
	}
	
	function isRenderable(propValue) {
	  switch(typeof propValue) {
	    // TODO: this was probably written with the assumption that we're not
	    // returning `this.props.component` directly from `render`. This is
	    // currently not supported but we should, to make it consistent.
	    case 'number':
	    case 'string':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isRenderable);
	      }
	      if (ReactDescriptor.isValidDescriptor(propValue)) {
	        return true;
	      }
	      for (var k in propValue) {
	        if (!isRenderable(propValue[k])) {
	          return false;
	        }
	      }
	      return true;
	    default:
	      return false;
	  }
	}
	
	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  return propType;
	}
	
	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}
	
	module.exports = ReactPropTypes;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @typechecks static-only
	 * @providesModule ReactServerRendering
	 */
	"use strict";
	
	var ReactDescriptor = __webpack_require__(48);
	var ReactInstanceHandles = __webpack_require__(52);
	var ReactMarkupChecksum = __webpack_require__(70);
	var ReactServerRenderingTransaction =
	  __webpack_require__(71);
	
	var instantiateReactComponent = __webpack_require__(69);
	var invariant = __webpack_require__(62);
	
	/**
	 * @param {ReactComponent} component
	 * @return {string} the HTML markup
	 */
	function renderComponentToString(component) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    ReactDescriptor.isValidDescriptor(component),
	    'renderComponentToString(): You must pass a valid ReactComponent.'
	  ) : invariant(ReactDescriptor.isValidDescriptor(component)));
	
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !(arguments.length === 2 && typeof arguments[1] === 'function'),
	    'renderComponentToString(): This function became synchronous and now ' +
	    'returns the generated markup. Please remove the second parameter.'
	  ) : invariant(!(arguments.length === 2 && typeof arguments[1] === 'function')));
	
	  var transaction;
	  try {
	    var id = ReactInstanceHandles.createReactRootID();
	    transaction = ReactServerRenderingTransaction.getPooled(false);
	
	    return transaction.perform(function() {
	      var componentInstance = instantiateReactComponent(component);
	      var markup = componentInstance.mountComponent(id, transaction, 0);
	      return ReactMarkupChecksum.addChecksumToMarkup(markup);
	    }, null);
	  } finally {
	    ReactServerRenderingTransaction.release(transaction);
	  }
	}
	
	/**
	 * @param {ReactComponent} component
	 * @return {string} the HTML markup, without the extra React ID and checksum
	* (for generating static pages)
	 */
	function renderComponentToStaticMarkup(component) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    ReactDescriptor.isValidDescriptor(component),
	    'renderComponentToStaticMarkup(): You must pass a valid ReactComponent.'
	  ) : invariant(ReactDescriptor.isValidDescriptor(component)));
	
	  var transaction;
	  try {
	    var id = ReactInstanceHandles.createReactRootID();
	    transaction = ReactServerRenderingTransaction.getPooled(true);
	
	    return transaction.perform(function() {
	      var componentInstance = instantiateReactComponent(component);
	      return componentInstance.mountComponent(id, transaction, 0);
	    }, null);
	  } finally {
	    ReactServerRenderingTransaction.release(transaction);
	  }
	}
	
	module.exports = {
	  renderComponentToString: renderComponentToString,
	  renderComponentToStaticMarkup: renderComponentToStaticMarkup
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactTextComponent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var DOMPropertyOperations = __webpack_require__(41);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactComponent = __webpack_require__(44);
	var ReactDescriptor = __webpack_require__(48);
	
	var escapeTextForBrowser = __webpack_require__(85);
	var mixInto = __webpack_require__(99);
	
	/**
	 * Text nodes violate a couple assumptions that React makes about components:
	 *
	 *  - When mounting text into the DOM, adjacent text nodes are merged.
	 *  - Text nodes cannot be assigned a React root ID.
	 *
	 * This component is used to wrap strings in elements so that they can undergo
	 * the same reconciliation that is applied to elements.
	 *
	 * TODO: Investigate representing React components in the DOM with text nodes.
	 *
	 * @class ReactTextComponent
	 * @extends ReactComponent
	 * @internal
	 */
	var ReactTextComponent = function(descriptor) {
	  this.construct(descriptor);
	};
	
	mixInto(ReactTextComponent, ReactComponent.Mixin);
	mixInto(ReactTextComponent, ReactBrowserComponentMixin);
	mixInto(ReactTextComponent, {
	
	  /**
	   * Creates the markup for this text node. This node is not intended to have
	   * any features besides containing text content.
	   *
	   * @param {string} rootID DOM ID of the root node.
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {number} mountDepth number of components in the owner hierarchy
	   * @return {string} Markup for this text node.
	   * @internal
	   */
	  mountComponent: function(rootID, transaction, mountDepth) {
	    ReactComponent.Mixin.mountComponent.call(
	      this,
	      rootID,
	      transaction,
	      mountDepth
	    );
	
	    var escapedText = escapeTextForBrowser(this.props);
	
	    if (transaction.renderToStaticMarkup) {
	      // Normally we'd wrap this in a `span` for the reasons stated above, but
	      // since this is a situation where React won't take over (static pages),
	      // we can simply return the text as it is.
	      return escapedText;
	    }
	
	    return (
	      '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' +
	        escapedText +
	      '</span>'
	    );
	  },
	
	  /**
	   * Updates this component by updating the text content.
	   *
	   * @param {object} nextComponent Contains the next text content.
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  receiveComponent: function(nextComponent, transaction) {
	    var nextProps = nextComponent.props;
	    if (nextProps !== this.props) {
	      this.props = nextProps;
	      ReactComponent.BackendIDOperations.updateTextContentByID(
	        this._rootNodeID,
	        nextProps
	      );
	    }
	  }
	
	});
	
	module.exports = ReactDescriptor.createFactory(ReactTextComponent);


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule onlyChild
	 */
	"use strict";
	
	var ReactDescriptor = __webpack_require__(48);
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection. The current implementation of this
	 * function assumes that a single child gets passed without a wrapper, but the
	 * purpose of this helper function is to abstract away the particular structure
	 * of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactComponent} The first and only `ReactComponent` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    ReactDescriptor.isValidDescriptor(children),
	    'onlyChild must be passed a children with exactly one child.'
	  ) : invariant(ReactDescriptor.isValidDescriptor(children)));
	  return children;
	}
	
	module.exports = onlyChild;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule warning
	 */
	
	"use strict";
	
	var emptyFunction = __webpack_require__(137);
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = emptyFunction;
	
	if ("production" !== process.env.NODE_ENV) {
	  warning = function(condition, format ) {var args=Array.prototype.slice.call(arguments,2);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
	    }
	  };
	}
	
	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ExecutionEnvironment
	 */
	
	/*jslint evil: true */
	
	"use strict";
	
	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);
	
	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {
	
	  canUseDOM: canUseDOM,
	
	  canUseWorkers: typeof Worker !== 'undefined',
	
	  canUseEventListeners:
	    canUseDOM && !!(window.addEventListener || window.attachEvent),
	
	  canUseViewport: canUseDOM && !!window.screen,
	
	  isInWorker: !canUseDOM // For now, this is true - might change in the future.
	
	};
	
	module.exports = ExecutionEnvironment;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ("production" !== process.env.NODE_ENV) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule copyProperties
	 */
	
	/**
	 * Copy properties from one or more objects (up to 5) into the first object.
	 * This is a shallow copy. It mutates the first object and also returns it.
	 *
	 * NOTE: `arguments` has a very significant performance penalty, which is why
	 * we don't support unlimited arguments.
	 */
	function copyProperties(obj, a, b, c, d, e, f) {
	  obj = obj || {};
	
	  if ("production" !== process.env.NODE_ENV) {
	    if (f) {
	      throw new Error('Too many arguments passed to copyProperties');
	    }
	  }
	
	  var args = [a, b, c, d, e];
	  var ii = 0, v;
	  while (args[ii]) {
	    v = args[ii++];
	    for (var k in v) {
	      obj[k] = v[k];
	    }
	
	    // IE ignores toString in object iteration.. See:
	    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
	    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
	        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
	      obj.toString = v.toString;
	    }
	  }
	
	  return obj;
	}
	
	module.exports = copyProperties;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule keyOf
	 */
	
	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without loosing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};
	
	
	module.exports = keyOf;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var TRANSPARENT_PIXEL_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
	    emptyImg = document.createElement('img');
	
	emptyImg.src = TRANSPARENT_PIXEL_SRC;
	
	function getEmptyImage() {
	  return emptyImg;
	}
	
	module.exports = getEmptyImage;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  ITEM: 'item'
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  CARD: 'card'
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule merge
	 */
	
	"use strict";
	
	var mergeInto = __webpack_require__(103);
	
	/**
	 * Shallow merges two structures into a return value, without mutating either.
	 *
	 * @param {?object} one Optional object with properties to merge from.
	 * @param {?object} two Optional object with properties to merge from.
	 * @return {object} The shallow extension of one by two.
	 */
	var merge = function(one, two) {
	  var result = {};
	  mergeInto(result, one);
	  mergeInto(result, two);
	  return result;
	};
	
	module.exports = merge;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule instantiateReactComponent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Validate a `componentDescriptor`. This should be exposed publicly in a follow
	 * up diff.
	 *
	 * @param {object} descriptor
	 * @return {boolean} Returns true if this is a valid descriptor of a Component.
	 */
	function isValidComponentDescriptor(descriptor) {
	  return (
	    descriptor &&
	    typeof descriptor.type === 'function' &&
	    typeof descriptor.type.prototype.mountComponent === 'function' &&
	    typeof descriptor.type.prototype.receiveComponent === 'function'
	  );
	}
	
	/**
	 * Given a `componentDescriptor` create an instance that will actually be
	 * mounted. Currently it just extracts an existing clone from composite
	 * components but this is an implementation detail which will change.
	 *
	 * @param {object} descriptor
	 * @return {object} A new instance of componentDescriptor's constructor.
	 * @protected
	 */
	function instantiateReactComponent(descriptor) {
	
	  // TODO: Make warning
	  // if (__DEV__) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      isValidComponentDescriptor(descriptor),
	      'Only React Components are valid for mounting.'
	    ) : invariant(isValidComponentDescriptor(descriptor)));
	  // }
	
	  return new descriptor.type(descriptor);
	}
	
	module.exports = instantiateReactComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMarkupChecksum
	 */
	
	"use strict";
	
	var adler32 = __webpack_require__(144);
	
	var ReactMarkupChecksum = {
	  CHECKSUM_ATTR_NAME: 'data-react-checksum',
	
	  /**
	   * @param {string} markup Markup string
	   * @return {string} Markup string with checksum attribute attached
	   */
	  addChecksumToMarkup: function(markup) {
	    var checksum = adler32(markup);
	    return markup.replace(
	      '>',
	      ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '">'
	    );
	  },
	
	  /**
	   * @param {string} markup to use
	   * @param {DOMElement} element root React element
	   * @returns {boolean} whether or not the markup is the same
	   */
	  canReuseMarkup: function(markup, element) {
	    var existingChecksum = element.getAttribute(
	      ReactMarkupChecksum.CHECKSUM_ATTR_NAME
	    );
	    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
	    var markupChecksum = adler32(markup);
	    return markupChecksum === existingChecksum;
	  }
	};
	
	module.exports = ReactMarkupChecksum;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactServerRenderingTransaction
	 * @typechecks
	 */
	
	"use strict";
	
	var PooledClass = __webpack_require__(88);
	var CallbackQueue = __webpack_require__(145);
	var ReactPutListenerQueue = __webpack_require__(146);
	var Transaction = __webpack_require__(147);
	
	var emptyFunction = __webpack_require__(137);
	var mixInto = __webpack_require__(99);
	
	/**
	 * Provides a `CallbackQueue` queue for collecting `onDOMReady` callbacks
	 * during the performing of the transaction.
	 */
	var ON_DOM_READY_QUEUEING = {
	  /**
	   * Initializes the internal `onDOMReady` queue.
	   */
	  initialize: function() {
	    this.reactMountReady.reset();
	  },
	
	  close: emptyFunction
	};
	
	var PUT_LISTENER_QUEUEING = {
	  initialize: function() {
	    this.putListenerQueue.reset();
	  },
	
	  close: emptyFunction
	};
	
	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */
	var TRANSACTION_WRAPPERS = [
	  PUT_LISTENER_QUEUEING,
	  ON_DOM_READY_QUEUEING
	];
	
	/**
	 * @class ReactServerRenderingTransaction
	 * @param {boolean} renderToStaticMarkup
	 */
	function ReactServerRenderingTransaction(renderToStaticMarkup) {
	  this.reinitializeTransaction();
	  this.renderToStaticMarkup = renderToStaticMarkup;
	  this.reactMountReady = CallbackQueue.getPooled(null);
	  this.putListenerQueue = ReactPutListenerQueue.getPooled();
	}
	
	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array} Empty list of operation wrap proceedures.
	   */
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  },
	
	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function() {
	    return this.reactMountReady;
	  },
	
	  getPutListenerQueue: function() {
	    return this.putListenerQueue;
	  },
	
	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be resused.
	   */
	  destructor: function() {
	    CallbackQueue.release(this.reactMountReady);
	    this.reactMountReady = null;
	
	    ReactPutListenerQueue.release(this.putListenerQueue);
	    this.putListenerQueue = null;
	  }
	};
	
	
	mixInto(ReactServerRenderingTransaction, Transaction.Mixin);
	mixInto(ReactServerRenderingTransaction, Mixin);
	
	PooledClass.addPoolingTo(ReactServerRenderingTransaction);
	
	module.exports = ReactServerRenderingTransaction;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule cx
	 */
	
	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}
	
	module.exports = cx;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	function withoutProperties(object, properties) {
	  var result = {};
	
	  for (var property in object) {
	    if (object.hasOwnProperty(property) && !properties[property])
	      result[property] = object[property];
	  }
	
	  return result;
	}
	
	module.exports = withoutProperties;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var copyProperties = __webpack_require__(63);
	
	/**
	 * A mixin for components that store the active state of routes,
	 * URL parameters, and query.
	 */
	var ActiveContext = {
	
	  propTypes: {
	    initialActiveRoutes: React.PropTypes.array.isRequired,
	    initialActiveParams: React.PropTypes.object.isRequired,
	    initialActiveQuery: React.PropTypes.object.isRequired
	  },
	
	  getDefaultProps: function () {
	    return {
	      initialActiveRoutes: [],
	      initialActiveParams: {},
	      initialActiveQuery: {}
	    };
	  },
	
	  getInitialState: function () {
	    return {
	      activeRoutes: this.props.initialActiveRoutes,
	      activeParams: this.props.initialActiveParams,
	      activeQuery: this.props.initialActiveQuery
	    };
	  },
	
	  /**
	   * Returns a read-only array of the currently active routes.
	   */
	  getActiveRoutes: function () {
	    return this.state.activeRoutes.slice(0);
	  },
	
	  /**
	   * Returns a read-only object of the currently active URL parameters.
	   */
	  getActiveParams: function () {
	    return copyProperties({}, this.state.activeParams);
	  },
	
	  /**
	   * Returns a read-only object of the currently active query parameters.
	   */
	  getActiveQuery: function () {
	    return copyProperties({}, this.state.activeQuery);
	  },
	
	  childContextTypes: {
	    activeRoutes: React.PropTypes.array.isRequired,
	    activeParams: React.PropTypes.object.isRequired,
	    activeQuery: React.PropTypes.object.isRequired
	  },
	
	  getChildContext: function () {
	    return {
	      activeRoutes: this.getActiveRoutes(),
	      activeParams: this.getActiveParams(),
	      activeQuery: this.getActiveQuery()
	    };
	  }
	
	};
	
	module.exports = ActiveContext;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var invariant = __webpack_require__(62);
	var canUseDOM = __webpack_require__(61).canUseDOM;
	var HashLocation = __webpack_require__(83);
	var HistoryLocation = __webpack_require__(148);
	var RefreshLocation = __webpack_require__(149);
	var PathStore = __webpack_require__(192);
	var supportsHistory = __webpack_require__(150);
	
	/**
	 * A hash of { name: location } pairs.
	 */
	var NAMED_LOCATIONS = {
	  none: null,
	  hash: HashLocation,
	  history: HistoryLocation,
	  refresh: RefreshLocation
	};
	
	/**
	 * A mixin for components that manage location.
	 */
	var LocationContext = {
	
	  propTypes: {
	    location: function (props, propName, componentName) {
	      var location = props[propName];
	
	      if (typeof location === 'string' && !(location in NAMED_LOCATIONS))
	        return new Error('Unknown location "' + location + '", see ' + componentName);
	    }
	  },
	
	  getDefaultProps: function () {
	    return {
	      location: canUseDOM ? HashLocation : null
	    };
	  },
	
	  componentWillMount: function () {
	    var location = this.getLocation();
	
	    invariant(
	      location == null || canUseDOM,
	      'Cannot use location without a DOM'
	    );
	
	    if (location) {
	      PathStore.setup(location);
	      PathStore.addChangeListener(this.handlePathChange);
	
	      if (this.updateLocation)
	        this.updateLocation(PathStore.getCurrentPath(), PathStore.getCurrentActionType());
	    }
	  },
	
	  componentWillUnmount: function () {
	    if (this.getLocation())
	      PathStore.removeChangeListener(this.handlePathChange);
	  },
	
	  handlePathChange: function () {
	    if (this.updateLocation)
	      this.updateLocation(PathStore.getCurrentPath(), PathStore.getCurrentActionType());
	  },
	
	  /**
	   * Returns the location object this component uses.
	   */
	  getLocation: function () {
	    if (this._location == null) {
	      var location = this.props.location;
	
	      if (typeof location === 'string')
	        location = NAMED_LOCATIONS[location];
	
	      // Automatically fall back to full page refreshes in
	      // browsers that do not support HTML5 history.
	      if (location === HistoryLocation && !supportsHistory())
	        location = RefreshLocation;
	
	      this._location = location;
	    }
	
	    return this._location;
	  },
	
	  childContextTypes: {
	    location: React.PropTypes.object // Not required on the server.
	  },
	
	  getChildContext: function () {
	    return {
	      location: this.getLocation()
	    };
	  }
	
	};
	
	module.exports = LocationContext;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var invariant = __webpack_require__(62);
	var Path = __webpack_require__(81);
	
	/**
	 * Performs some normalization and validation on a <Route> component and
	 * all of its children.
	 */
	function processRoute(route, container, namedRoutes) {
	  // Note: parentRoute may be a <Route> _or_ a <Routes>.
	  var props = route.props;
	
	  invariant(
	    React.isValidClass(props.handler),
	    'The handler for the "%s" route must be a valid React class',
	    props.name || props.path
	  );
	
	  var parentPath = (container && container.props.path) || '/';
	
	  if ((props.path || props.name) && !props.isDefault && !props.catchAll) {
	    var path = props.path || props.name;
	
	    // Relative paths extend their parent.
	    if (!Path.isAbsolute(path))
	      path = Path.join(parentPath, path);
	
	    props.path = Path.normalize(path);
	  } else {
	    props.path = parentPath;
	
	    if (props.catchAll)
	      props.path += '*';
	  }
	
	  props.paramNames = Path.extractParamNames(props.path);
	
	  // Make sure the route's path has all params its parent needs.
	  if (container && Array.isArray(container.props.paramNames)) {
	    container.props.paramNames.forEach(function (paramName) {
	      invariant(
	        props.paramNames.indexOf(paramName) !== -1,
	        'The nested route path "%s" is missing the "%s" parameter of its parent path "%s"',
	        props.path, paramName, container.props.path
	      );
	    });
	  }
	
	  // Make sure the route can be looked up by <Link>s.
	  if (props.name) {
	    var existingRoute = namedRoutes[props.name];
	
	    invariant(
	      !existingRoute || route === existingRoute,
	      'You cannot use the name "%s" for more than one route',
	      props.name
	    );
	
	    namedRoutes[props.name] = route;
	  }
	
	  // Handle <NotFoundRoute>.
	  if (props.catchAll) {
	    invariant(
	      container,
	      '<NotFoundRoute> must have a parent <Route>'
	    );
	
	    invariant(
	      container.props.notFoundRoute == null,
	      'You may not have more than one <NotFoundRoute> per <Route>'
	    );
	
	    container.props.notFoundRoute = route;
	
	    return null;
	  }
	
	  // Handle <DefaultRoute>.
	  if (props.isDefault) {
	    invariant(
	      container,
	      '<DefaultRoute> must have a parent <Route>'
	    );
	
	    invariant(
	      container.props.defaultRoute == null,
	      'You may not have more than one <DefaultRoute> per <Route>'
	    );
	
	    container.props.defaultRoute = route;
	
	    return null;
	  }
	
	  // Make sure children is an array.
	  props.children = processRoutes(props.children, route, namedRoutes);
	
	  return route;
	}
	
	/**
	 * Processes many children <Route>s at once, always returning an array.
	 */
	function processRoutes(children, container, namedRoutes) {
	  var routes = [];
	
	  React.Children.forEach(children, function (child) {
	    // Exclude <DefaultRoute>s and <NotFoundRoute>s.
	    if (child = processRoute(child, container, namedRoutes))
	      routes.push(child);
	  });
	
	  return routes;
	}
	
	/**
	 * A mixin for components that have <Route> children.
	 */
	var RouteContext = {
	
	  _processRoutes: function () {
	    this._namedRoutes = {};
	    this._routes = processRoutes(this.props.children, this, this._namedRoutes);
	  },
	
	  /**
	   * Returns an array of <Route>s in this container.
	   */
	  getRoutes: function () {
	    if (this._routes == null)
	      this._processRoutes();
	
	    return this._routes;
	  },
	
	  /**
	   * Returns a hash { name: route } of all named <Route>s in this container.
	   */
	  getNamedRoutes: function () {
	    if (this._namedRoutes == null)
	      this._processRoutes();
	
	    return this._namedRoutes;
	  },
	
	  /**
	   * Returns the route with the given name.
	   */
	  getRouteByName: function (routeName) {
	    var namedRoutes = this.getNamedRoutes();
	    return namedRoutes[routeName] || null;
	  },
	
	  childContextTypes: {
	    routes: React.PropTypes.array.isRequired,
	    namedRoutes: React.PropTypes.object.isRequired
	  },
	
	  getChildContext: function () {
	    return {
	      routes: this.getRoutes(),
	      namedRoutes: this.getNamedRoutes(),
	    };
	  }
	
	};
	
	module.exports = RouteContext;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var invariant = __webpack_require__(62);
	var canUseDOM = __webpack_require__(61).canUseDOM;
	var ImitateBrowserBehavior = __webpack_require__(193);
	var ScrollToTopBehavior = __webpack_require__(194);
	
	function getWindowScrollPosition() {
	  invariant(
	    canUseDOM,
	    'Cannot get current scroll position without a DOM'
	  );
	
	  return {
	    x: window.scrollX,
	    y: window.scrollY
	  };
	}
	
	/**
	 * A hash of { name: scrollBehavior } pairs.
	 */
	var NAMED_SCROLL_BEHAVIORS = {
	  none: null,
	  browser: ImitateBrowserBehavior,
	  imitateBrowser: ImitateBrowserBehavior,
	  scrollToTop: ScrollToTopBehavior
	};
	
	/**
	 * A mixin for components that manage scroll position.
	 */
	var ScrollContext = {
	
	  propTypes: {
	    scrollBehavior: function (props, propName, componentName) {
	      var behavior = props[propName];
	
	      if (typeof behavior === 'string' && !(behavior in NAMED_SCROLL_BEHAVIORS))
	        return new Error('Unknown scroll behavior "' + behavior + '", see ' + componentName);
	    }
	  },
	
	  getDefaultProps: function () {
	    return {
	      scrollBehavior: canUseDOM ? ImitateBrowserBehavior : null
	    };
	  },
	
	  componentWillMount: function () {
	    invariant(
	      this.getScrollBehavior() == null || canUseDOM,
	      'Cannot use scroll behavior without a DOM'
	    );
	  },
	
	  recordScroll: function (path) {
	    var positions = this.getScrollPositions();
	    positions[path] = getWindowScrollPosition();
	  },
	
	  updateScroll: function (path, actionType) {
	    var behavior = this.getScrollBehavior();
	    var position = this.getScrollPosition(path) || null;
	
	    if (behavior)
	      behavior.updateScrollPosition(position, actionType);
	  },
	
	  /**
	   * Returns the scroll behavior object this component uses.
	   */
	  getScrollBehavior: function () {
	    if (this._scrollBehavior == null) {
	      var behavior = this.props.scrollBehavior;
	
	      if (typeof behavior === 'string')
	        behavior = NAMED_SCROLL_BEHAVIORS[behavior];
	
	      this._scrollBehavior = behavior;
	    }
	
	    return this._scrollBehavior;
	  },
	
	  /**
	   * Returns a hash of URL paths to their last known scroll positions.
	   */
	  getScrollPositions: function () {
	    if (this._scrollPositions == null)
	      this._scrollPositions = {};
	
	    return this._scrollPositions;
	  },
	
	  /**
	   * Returns the last known scroll position for the given URL path.
	   */
	  getScrollPosition: function (path) {
	    var positions = this.getScrollPositions();
	    return positions[path];
	  },
	
	  childContextTypes: {
	    scrollBehavior: React.PropTypes.object // Not required on the server.
	  },
	
	  getChildContext: function () {
	    return {
	      scrollBehavior: this.getScrollBehavior()
	    };
	  }
	
	};
	
	module.exports = ScrollContext;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	function reversedArray(array) {
	  return array.slice(0).reverse();
	}
	
	module.exports = reversedArray;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var mixInto = __webpack_require__(99);
	var Promise = __webpack_require__(151);
	var Redirect = __webpack_require__(80);
	
	/**
	 * Encapsulates a transition to a given path.
	 *
	 * The willTransitionTo and willTransitionFrom handlers receive
	 * an instance of this class as their first argument.
	 */
	function Transition(routesComponent, path) {
	  this.routesComponent = routesComponent;
	  this.path = path;
	  this.abortReason = null;
	  this.isAborted = false;
	}
	
	mixInto(Transition, {
	
	  abort: function (reason) {
	    this.abortReason = reason;
	    this.isAborted = true;
	  },
	
	  redirect: function (to, params, query) {
	    this.abort(new Redirect(to, params, query));
	  },
	
	  wait: function (value) {
	    this.promise = Promise.resolve(value);
	  },
	
	  retry: function () {
	    this.routesComponent.replaceWith(this.path);
	  }
	
	});
	
	module.exports = Transition;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Encapsulates a redirect to the given route.
	 */
	function Redirect(to, params, query) {
	  this.to = to;
	  this.params = params;
	  this.query = query;
	}
	
	module.exports = Redirect;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var invariant = __webpack_require__(62);
	var merge = __webpack_require__(198).merge;
	var qs = __webpack_require__(197);
	
	function encodeURL(url) {
	  return encodeURIComponent(url).replace(/%20/g, '+');
	}
	
	function decodeURL(url) {
	  return decodeURIComponent(url.replace(/\+/g, ' '));
	}
	
	function encodeURLPath(path) {
	  return String(path).split('/').map(encodeURL).join('/');
	}
	
	var paramCompileMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|[*.()\[\]\\+|{}^$]/g;
	var paramInjectMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$?]*[?]?)|[*]/g;
	var paramInjectTrailingSlashMatcher = /\/\/\?|\/\?/g;
	var queryMatcher = /\?(.+)/;
	
	var _compiledPatterns = {};
	
	function compilePattern(pattern) {
	  if (!(pattern in _compiledPatterns)) {
	    var paramNames = [];
	    var source = pattern.replace(paramCompileMatcher, function (match, paramName) {
	      if (paramName) {
	        paramNames.push(paramName);
	        return '([^/?#]+)';
	      } else if (match === '*') {
	        paramNames.push('splat');
	        return '(.*?)';
	      } else {
	        return '\\' + match;
	      }
	    });
	
	    _compiledPatterns[pattern] = {
	      matcher: new RegExp('^' + source + '$', 'i'),
	      paramNames: paramNames
	    };
	  }
	
	  return _compiledPatterns[pattern];
	}
	
	var Path = {
	
	  /**
	   * Returns an array of the names of all parameters in the given pattern.
	   */
	  extractParamNames: function (pattern) {
	    return compilePattern(pattern).paramNames;
	  },
	
	  /**
	   * Extracts the portions of the given URL path that match the given pattern
	   * and returns an object of param name => value pairs. Returns null if the
	   * pattern does not match the given path.
	   */
	  extractParams: function (pattern, path) {
	    var object = compilePattern(pattern);
	    var match = decodeURL(path).match(object.matcher);
	
	    if (!match)
	      return null;
	
	    var params = {};
	
	    object.paramNames.forEach(function (paramName, index) {
	      params[paramName] = match[index + 1];
	    });
	
	    return params;
	  },
	
	  /**
	   * Returns a version of the given route path with params interpolated. Throws
	   * if there is a dynamic segment of the route path for which there is no param.
	   */
	  injectParams: function (pattern, params) {
	    params = params || {};
	
	    var splatIndex = 0;
	
	    return pattern.replace(paramInjectMatcher, function (match, paramName) {
	      paramName = paramName || 'splat';
	
	      // If param is optional don't check for existence
	      if (paramName.slice(-1) !== '?') {
	        invariant(
	          params[paramName] != null,
	          'Missing "' + paramName + '" parameter for path "' + pattern + '"'
	        );
	      } else {
	        paramName = paramName.slice(0, -1)
	        if (params[paramName] == null) {
	            return '';
	        }
	      }
	
	      var segment;
	      if (paramName === 'splat' && Array.isArray(params[paramName])) {
	        segment = params[paramName][splatIndex++];
	
	        invariant(
	          segment != null,
	          'Missing splat # ' + splatIndex + ' for path "' + pattern + '"'
	        );
	      } else {
	        segment = params[paramName];
	      }
	
	      return encodeURLPath(segment);
	    }).replace(paramInjectTrailingSlashMatcher, '/');
	  },
	
	  /**
	   * Returns an object that is the result of parsing any query string contained
	   * in the given path, null if the path contains no query string.
	   */
	  extractQuery: function (path) {
	    var match = path.match(queryMatcher);
	    return match && qs.parse(match[1]);
	  },
	
	  /**
	   * Returns a version of the given path without the query string.
	   */
	  withoutQuery: function (path) {
	    return path.replace(queryMatcher, '');
	  },
	
	  /**
	   * Returns a version of the given path with the parameters in the given
	   * query merged into the query string.
	   */
	  withQuery: function (path, query) {
	    var existingQuery = Path.extractQuery(path);
	
	    if (existingQuery)
	      query = query ? merge(existingQuery, query) : existingQuery;
	
	    var queryString = query && qs.stringify(query);
	
	    if (queryString)
	      return Path.withoutQuery(path) + '?' + queryString;
	
	    return path;
	  },
	
	  /**
	   * Returns true if the given path is absolute.
	   */
	  isAbsolute: function (path) {
	    return path.charAt(0) === '/';
	  },
	
	  /**
	   * Returns a normalized version of the given path.
	   */
	  normalize: function (path, parentRoute) {
	    return path.replace(/^\/*/, '/');
	  },
	
	  /**
	   * Joins two URL paths together.
	   */
	  join: function (a, b) {
	    return a.replace(/\/*$/, '/') + b;
	  }
	
	};
	
	module.exports = Path;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @typechecks
	 * @providesModule cloneWithProps
	 */
	
	"use strict";
	
	var ReactPropTransferer = __webpack_require__(96);
	
	var keyOf = __webpack_require__(64);
	var warning = __webpack_require__(60);
	
	var CHILDREN_PROP = keyOf({children: null});
	
	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {object} child child component you'd like to clone
	 * @param {object} props props you'd like to modify. They will be merged
	 * as if you used `transferPropsTo()`.
	 * @return {object} a clone of child with props merged in.
	 */
	function cloneWithProps(child, props) {
	  if ("production" !== process.env.NODE_ENV) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      !child.props.ref,
	      'You are calling cloneWithProps() on a child with a ref. This is ' +
	      'dangerous because you\'re creating a new child which will not be ' +
	      'added as a ref to its parent.'
	    ) : null);
	  }
	
	  var newProps = ReactPropTransferer.mergeProps(props, child.props);
	
	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
	      child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }
	
	  // The current API doesn't retain _owner and _context, which is why this
	  // doesn't use ReactDescriptor.cloneAndReplaceProps.
	  return child.constructor(newProps);
	}
	
	module.exports = cloneWithProps;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var LocationActions = __webpack_require__(196);
	var getWindowPath = __webpack_require__(195);
	
	function getHashPath() {
	  return window.location.hash.substr(1);
	}
	
	var _actionType;
	
	function ensureSlash() {
	  var path = getHashPath();
	
	  if (path.charAt(0) === '/')
	    return true;
	
	  HashLocation.replace('/' + path);
	
	  return false;
	}
	
	var _onChange;
	
	function onHashChange() {
	  if (ensureSlash()) {
	    var path = getHashPath();
	
	    _onChange({
	      // If we don't have an _actionType then all we know is the hash
	      // changed. It was probably caused by the user clicking the Back
	      // button, but may have also been the Forward button or manual
	      // manipulation. So just guess 'pop'.
	      type: _actionType || LocationActions.POP,
	      path: getHashPath()
	    });
	
	    _actionType = null;
	  }
	}
	
	/**
	 * A Location that uses `window.location.hash`.
	 */
	var HashLocation = {
	
	  setup: function (onChange) {
	    _onChange = onChange;
	
	    // Do this BEFORE listening for hashchange.
	    ensureSlash();
	
	    if (window.addEventListener) {
	      window.addEventListener('hashchange', onHashChange, false);
	    } else {
	      window.attachEvent('onhashchange', onHashChange);
	    }
	  },
	
	  teardown: function () {
	    if (window.removeEventListener) {
	      window.removeEventListener('hashchange', onHashChange, false);
	    } else {
	      window.detachEvent('onhashchange', onHashChange);
	    }
	  },
	
	  push: function (path) {
	    _actionType = LocationActions.PUSH;
	    window.location.hash = path;
	  },
	
	  replace: function (path) {
	    _actionType = LocationActions.REPLACE;
	    window.location.replace(getWindowPath() + '#' + path);
	  },
	
	  pop: function () {
	    _actionType = LocationActions.POP;
	    window.history.back();
	  },
	
	  getCurrentPath: getHashPath,
	
	  toString: function () {
	    return '<HashLocation>';
	  }
	
	};
	
	module.exports = HashLocation;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DOMProperty
	 * @typechecks static-only
	 */
	
	/*jslint bitwise: true */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	var DOMPropertyInjection = {
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  MUST_USE_ATTRIBUTE: 0x1,
	  MUST_USE_PROPERTY: 0x2,
	  HAS_SIDE_EFFECTS: 0x4,
	  HAS_BOOLEAN_VALUE: 0x8,
	  HAS_NUMERIC_VALUE: 0x10,
	  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
	  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,
	
	  /**
	   * Inject some specialized knowledge about the DOM. This takes a config object
	   * with the following properties:
	   *
	   * isCustomAttribute: function that given an attribute name will return true
	   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
	   * attributes where it's impossible to enumerate all of the possible
	   * attribute names,
	   *
	   * Properties: object mapping DOM property name to one of the
	   * DOMPropertyInjection constants or null. If your attribute isn't in here,
	   * it won't get written to the DOM.
	   *
	   * DOMAttributeNames: object mapping React attribute name to the DOM
	   * attribute name. Attribute names not specified use the **lowercase**
	   * normalized name.
	   *
	   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
	   * Property names not specified use the normalized name.
	   *
	   * DOMMutationMethods: Properties that require special mutation methods. If
	   * `value` is undefined, the mutation method should unset the property.
	   *
	   * @param {object} domPropertyConfig the config as described above.
	   */
	  injectDOMPropertyConfig: function(domPropertyConfig) {
	    var Properties = domPropertyConfig.Properties || {};
	    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
	    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
	    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};
	
	    if (domPropertyConfig.isCustomAttribute) {
	      DOMProperty._isCustomAttributeFunctions.push(
	        domPropertyConfig.isCustomAttribute
	      );
	    }
	
	    for (var propName in Properties) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !DOMProperty.isStandardName.hasOwnProperty(propName),
	        'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' +
	        '\'%s\' which has already been injected. You may be accidentally ' +
	        'injecting the same DOM property config twice, or you may be ' +
	        'injecting two configs that have conflicting property names.',
	        propName
	      ) : invariant(!DOMProperty.isStandardName.hasOwnProperty(propName)));
	
	      DOMProperty.isStandardName[propName] = true;
	
	      var lowerCased = propName.toLowerCase();
	      DOMProperty.getPossibleStandardName[lowerCased] = propName;
	
	      if (DOMAttributeNames.hasOwnProperty(propName)) {
	        var attributeName = DOMAttributeNames[propName];
	        DOMProperty.getPossibleStandardName[attributeName] = propName;
	        DOMProperty.getAttributeName[propName] = attributeName;
	      } else {
	        DOMProperty.getAttributeName[propName] = lowerCased;
	      }
	
	      DOMProperty.getPropertyName[propName] =
	        DOMPropertyNames.hasOwnProperty(propName) ?
	          DOMPropertyNames[propName] :
	          propName;
	
	      if (DOMMutationMethods.hasOwnProperty(propName)) {
	        DOMProperty.getMutationMethod[propName] = DOMMutationMethods[propName];
	      } else {
	        DOMProperty.getMutationMethod[propName] = null;
	      }
	
	      var propConfig = Properties[propName];
	      DOMProperty.mustUseAttribute[propName] =
	        propConfig & DOMPropertyInjection.MUST_USE_ATTRIBUTE;
	      DOMProperty.mustUseProperty[propName] =
	        propConfig & DOMPropertyInjection.MUST_USE_PROPERTY;
	      DOMProperty.hasSideEffects[propName] =
	        propConfig & DOMPropertyInjection.HAS_SIDE_EFFECTS;
	      DOMProperty.hasBooleanValue[propName] =
	        propConfig & DOMPropertyInjection.HAS_BOOLEAN_VALUE;
	      DOMProperty.hasNumericValue[propName] =
	        propConfig & DOMPropertyInjection.HAS_NUMERIC_VALUE;
	      DOMProperty.hasPositiveNumericValue[propName] =
	        propConfig & DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE;
	      DOMProperty.hasOverloadedBooleanValue[propName] =
	        propConfig & DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE;
	
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !DOMProperty.mustUseAttribute[propName] ||
	          !DOMProperty.mustUseProperty[propName],
	        'DOMProperty: Cannot require using both attribute and property: %s',
	        propName
	      ) : invariant(!DOMProperty.mustUseAttribute[propName] ||
	        !DOMProperty.mustUseProperty[propName]));
	      ("production" !== process.env.NODE_ENV ? invariant(
	        DOMProperty.mustUseProperty[propName] ||
	          !DOMProperty.hasSideEffects[propName],
	        'DOMProperty: Properties that have side effects must use property: %s',
	        propName
	      ) : invariant(DOMProperty.mustUseProperty[propName] ||
	        !DOMProperty.hasSideEffects[propName]));
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !!DOMProperty.hasBooleanValue[propName] +
	          !!DOMProperty.hasNumericValue[propName] +
	          !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1,
	        'DOMProperty: Value can be one of boolean, overloaded boolean, or ' +
	        'numeric value, but not a combination: %s',
	        propName
	      ) : invariant(!!DOMProperty.hasBooleanValue[propName] +
	        !!DOMProperty.hasNumericValue[propName] +
	        !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1));
	    }
	  }
	};
	var defaultValueCache = {};
	
	/**
	 * DOMProperty exports lookup objects that can be used like functions:
	 *
	 *   > DOMProperty.isValid['id']
	 *   true
	 *   > DOMProperty.isValid['foobar']
	 *   undefined
	 *
	 * Although this may be confusing, it performs better in general.
	 *
	 * @see http://jsperf.com/key-exists
	 * @see http://jsperf.com/key-missing
	 */
	var DOMProperty = {
	
	  ID_ATTRIBUTE_NAME: 'data-reactid',
	
	  /**
	   * Checks whether a property name is a standard property.
	   * @type {Object}
	   */
	  isStandardName: {},
	
	  /**
	   * Mapping from lowercase property names to the properly cased version, used
	   * to warn in the case of missing properties.
	   * @type {Object}
	   */
	  getPossibleStandardName: {},
	
	  /**
	   * Mapping from normalized names to attribute names that differ. Attribute
	   * names are used when rendering markup or with `*Attribute()`.
	   * @type {Object}
	   */
	  getAttributeName: {},
	
	  /**
	   * Mapping from normalized names to properties on DOM node instances.
	   * (This includes properties that mutate due to external factors.)
	   * @type {Object}
	   */
	  getPropertyName: {},
	
	  /**
	   * Mapping from normalized names to mutation methods. This will only exist if
	   * mutation cannot be set simply by the property or `setAttribute()`.
	   * @type {Object}
	   */
	  getMutationMethod: {},
	
	  /**
	   * Whether the property must be accessed and mutated as an object property.
	   * @type {Object}
	   */
	  mustUseAttribute: {},
	
	  /**
	   * Whether the property must be accessed and mutated using `*Attribute()`.
	   * (This includes anything that fails `<propName> in <element>`.)
	   * @type {Object}
	   */
	  mustUseProperty: {},
	
	  /**
	   * Whether or not setting a value causes side effects such as triggering
	   * resources to be loaded or text selection changes. We must ensure that
	   * the value is only set if it has changed.
	   * @type {Object}
	   */
	  hasSideEffects: {},
	
	  /**
	   * Whether the property should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasBooleanValue: {},
	
	  /**
	   * Whether the property must be numeric or parse as a
	   * numeric and should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasNumericValue: {},
	
	  /**
	   * Whether the property must be positive numeric or parse as a positive
	   * numeric and should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasPositiveNumericValue: {},
	
	  /**
	   * Whether the property can be used as a flag as well as with a value. Removed
	   * when strictly equal to false; present without a value when strictly equal
	   * to true; present with a value otherwise.
	   * @type {Object}
	   */
	  hasOverloadedBooleanValue: {},
	
	  /**
	   * All of the isCustomAttribute() functions that have been injected.
	   */
	  _isCustomAttributeFunctions: [],
	
	  /**
	   * Checks whether a property name is a custom attribute.
	   * @method
	   */
	  isCustomAttribute: function(attributeName) {
	    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
	      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
	      if (isCustomAttributeFn(attributeName)) {
	        return true;
	      }
	    }
	    return false;
	  },
	
	  /**
	   * Returns the default property value for a DOM property (i.e., not an
	   * attribute). Most default values are '' or false, but not all. Worse yet,
	   * some (in particular, `type`) vary depending on the type of element.
	   *
	   * TODO: Is it better to grab all the possible properties when creating an
	   * element to avoid having to create the same element twice?
	   */
	  getDefaultValueForProperty: function(nodeName, prop) {
	    var nodeDefaults = defaultValueCache[nodeName];
	    var testElement;
	    if (!nodeDefaults) {
	      defaultValueCache[nodeName] = nodeDefaults = {};
	    }
	    if (!(prop in nodeDefaults)) {
	      testElement = document.createElement(nodeName);
	      nodeDefaults[prop] = testElement[prop];
	    }
	    return nodeDefaults[prop];
	  },
	
	  injection: DOMPropertyInjection
	};
	
	module.exports = DOMProperty;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule escapeTextForBrowser
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var ESCAPE_LOOKUP = {
	  "&": "&amp;",
	  ">": "&gt;",
	  "<": "&lt;",
	  "\"": "&quot;",
	  "'": "&#x27;"
	};
	
	var ESCAPE_REGEX = /[&><"']/g;
	
	function escaper(match) {
	  return ESCAPE_LOOKUP[match];
	}
	
	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextForBrowser(text) {
	  return ('' + text).replace(ESCAPE_REGEX, escaper);
	}
	
	module.exports = escapeTextForBrowser;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule memoizeStringOnly
	 * @typechecks static-only
	 */
	
	"use strict";
	
	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 *
	 * @param {function} callback
	 * @return {function}
	 */
	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function(string) {
	    if (cache.hasOwnProperty(string)) {
	      return cache[string];
	    } else {
	      return cache[string] = callback.call(this, string);
	    }
	  };
	}
	
	module.exports = memoizeStringOnly;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventConstants
	 */
	
	"use strict";
	
	var keyMirror = __webpack_require__(92);
	
	var PropagationPhases = keyMirror({bubbled: null, captured: null});
	
	/**
	 * Types of raw signals from the browser caught at the top level.
	 */
	var topLevelTypes = keyMirror({
	  topBlur: null,
	  topChange: null,
	  topClick: null,
	  topCompositionEnd: null,
	  topCompositionStart: null,
	  topCompositionUpdate: null,
	  topContextMenu: null,
	  topCopy: null,
	  topCut: null,
	  topDoubleClick: null,
	  topDrag: null,
	  topDragEnd: null,
	  topDragEnter: null,
	  topDragExit: null,
	  topDragLeave: null,
	  topDragOver: null,
	  topDragStart: null,
	  topDrop: null,
	  topError: null,
	  topFocus: null,
	  topInput: null,
	  topKeyDown: null,
	  topKeyPress: null,
	  topKeyUp: null,
	  topLoad: null,
	  topMouseDown: null,
	  topMouseMove: null,
	  topMouseOut: null,
	  topMouseOver: null,
	  topMouseUp: null,
	  topPaste: null,
	  topReset: null,
	  topScroll: null,
	  topSelectionChange: null,
	  topSubmit: null,
	  topTextInput: null,
	  topTouchCancel: null,
	  topTouchEnd: null,
	  topTouchMove: null,
	  topTouchStart: null,
	  topWheel: null
	});
	
	var EventConstants = {
	  topLevelTypes: topLevelTypes,
	  PropagationPhases: PropagationPhases
	};
	
	module.exports = EventConstants;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule PooledClass
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function(copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};
	
	var twoArgumentPooler = function(a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};
	
	var threeArgumentPooler = function(a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};
	
	var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};
	
	var standardReleaser = function(instance) {
	  var Klass = this;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    instance instanceof Klass,
	    'Trying to release an instance into a pool of a different type.'
	  ) : invariant(instance instanceof Klass));
	  if (instance.destructor) {
	    instance.destructor();
	  }
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};
	
	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;
	
	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function(CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};
	
	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};
	
	module.exports = PooledClass;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule traverseAllChildren
	 */
	
	"use strict";
	
	var ReactInstanceHandles = __webpack_require__(52);
	var ReactTextComponent = __webpack_require__(58);
	
	var invariant = __webpack_require__(62);
	
	var SEPARATOR = ReactInstanceHandles.SEPARATOR;
	var SUBSEPARATOR = ':';
	
	/**
	 * TODO: Test that:
	 * 1. `mapChildren` transforms strings and numbers into `ReactTextComponent`.
	 * 2. it('should fail when supplied duplicate key', function() {
	 * 3. That a single child and an array with one item have the same key pattern.
	 * });
	 */
	
	var userProvidedKeyEscaperLookup = {
	  '=': '=0',
	  '.': '=1',
	  ':': '=2'
	};
	
	var userProvidedKeyEscapeRegex = /[=.:]/g;
	
	function userProvidedKeyEscaper(match) {
	  return userProvidedKeyEscaperLookup[match];
	}
	
	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  if (component && component.props && component.props.key != null) {
	    // Explicit key
	    return wrapUserProvidedKey(component.props.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}
	
	/**
	 * Escape a component key so that it is safe to use in a reactid.
	 *
	 * @param {*} key Component key to be escaped.
	 * @return {string} An escaped string.
	 */
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(
	    userProvidedKeyEscapeRegex,
	    userProvidedKeyEscaper
	  );
	}
	
	/**
	 * Wrap a `key` value explicitly provided by the user to distinguish it from
	 * implicitly-generated keys generated by a component's index in its parent.
	 *
	 * @param {string} key Value of a user-provided `key` attribute
	 * @return {string}
	 */
	function wrapUserProvidedKey(key) {
	  return '$' + escapeUserProvidedKey(key);
	}
	
	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!number} indexSoFar Number of children encountered until this point.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	var traverseAllChildrenImpl =
	  function(children, nameSoFar, indexSoFar, callback, traverseContext) {
	    var subtreeCount = 0;  // Count of children found in the current subtree.
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        var nextName = (
	          nameSoFar +
	          (nameSoFar ? SUBSEPARATOR : SEPARATOR) +
	          getComponentKey(child, i)
	        );
	        var nextIndex = indexSoFar + subtreeCount;
	        subtreeCount += traverseAllChildrenImpl(
	          child,
	          nextName,
	          nextIndex,
	          callback,
	          traverseContext
	        );
	      }
	    } else {
	      var type = typeof children;
	      var isOnlyChild = nameSoFar === '';
	      // If it's the only child, treat the name as if it was wrapped in an array
	      // so that it's consistent if the number of children grows
	      var storageName =
	        isOnlyChild ? SEPARATOR + getComponentKey(children, 0) : nameSoFar;
	      if (children == null || type === 'boolean') {
	        // All of the above are perceived as null.
	        callback(traverseContext, null, storageName, indexSoFar);
	        subtreeCount = 1;
	      } else if (children.type && children.type.prototype &&
	                 children.type.prototype.mountComponentIntoNode) {
	        callback(traverseContext, children, storageName, indexSoFar);
	        subtreeCount = 1;
	      } else {
	        if (type === 'object') {
	          ("production" !== process.env.NODE_ENV ? invariant(
	            !children || children.nodeType !== 1,
	            'traverseAllChildren(...): Encountered an invalid child; DOM ' +
	            'elements are not valid children of React components.'
	          ) : invariant(!children || children.nodeType !== 1));
	          for (var key in children) {
	            if (children.hasOwnProperty(key)) {
	              subtreeCount += traverseAllChildrenImpl(
	                children[key],
	                (
	                  nameSoFar + (nameSoFar ? SUBSEPARATOR : SEPARATOR) +
	                  wrapUserProvidedKey(key) + SUBSEPARATOR +
	                  getComponentKey(children[key], 0)
	                ),
	                indexSoFar + subtreeCount,
	                callback,
	                traverseContext
	              );
	            }
	          }
	        } else if (type === 'string') {
	          var normalizedText = ReactTextComponent(children);
	          callback(traverseContext, normalizedText, storageName, indexSoFar);
	          subtreeCount += 1;
	        } else if (type === 'number') {
	          var normalizedNumber = ReactTextComponent('' + children);
	          callback(traverseContext, normalizedNumber, storageName, indexSoFar);
	          subtreeCount += 1;
	        }
	      }
	    }
	    return subtreeCount;
	  };
	
	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }
	
	  return traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
	}
	
	module.exports = traverseAllChildren;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactOwner
	 */
	
	"use strict";
	
	var emptyObject = __webpack_require__(152);
	var invariant = __webpack_require__(62);
	
	/**
	 * ReactOwners are capable of storing references to owned components.
	 *
	 * All components are capable of //being// referenced by owner components, but
	 * only ReactOwner components are capable of //referencing// owned components.
	 * The named reference is known as a "ref".
	 *
	 * Refs are available when mounted and updated during reconciliation.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return (
	 *         <div onClick={this.handleClick}>
	 *           <CustomComponent ref="custom" />
	 *         </div>
	 *       );
	 *     },
	 *     handleClick: function() {
	 *       this.refs.custom.handleClick();
	 *     },
	 *     componentDidMount: function() {
	 *       this.refs.custom.initialize();
	 *     }
	 *   });
	 *
	 * Refs should rarely be used. When refs are used, they should only be done to
	 * control data that is not handled by React's data flow.
	 *
	 * @class ReactOwner
	 */
	var ReactOwner = {
	
	  /**
	   * @param {?object} object
	   * @return {boolean} True if `object` is a valid owner.
	   * @final
	   */
	  isValidOwner: function(object) {
	    return !!(
	      object &&
	      typeof object.attachRef === 'function' &&
	      typeof object.detachRef === 'function'
	    );
	  },
	
	  /**
	   * Adds a component by ref to an owner component.
	   *
	   * @param {ReactComponent} component Component to reference.
	   * @param {string} ref Name by which to refer to the component.
	   * @param {ReactOwner} owner Component on which to record the ref.
	   * @final
	   * @internal
	   */
	  addComponentAsRefTo: function(component, ref, owner) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ReactOwner.isValidOwner(owner),
	      'addComponentAsRefTo(...): Only a ReactOwner can have refs. This ' +
	      'usually means that you\'re trying to add a ref to a component that ' +
	      'doesn\'t have an owner (that is, was not created inside of another ' +
	      'component\'s `render` method). Try rendering this component inside of ' +
	      'a new top-level component which will hold the ref.'
	    ) : invariant(ReactOwner.isValidOwner(owner)));
	    owner.attachRef(ref, component);
	  },
	
	  /**
	   * Removes a component by ref from an owner component.
	   *
	   * @param {ReactComponent} component Component to dereference.
	   * @param {string} ref Name of the ref to remove.
	   * @param {ReactOwner} owner Component on which the ref is recorded.
	   * @final
	   * @internal
	   */
	  removeComponentAsRefFrom: function(component, ref, owner) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ReactOwner.isValidOwner(owner),
	      'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This ' +
	      'usually means that you\'re trying to remove a ref to a component that ' +
	      'doesn\'t have an owner (that is, was not created inside of another ' +
	      'component\'s `render` method). Try rendering this component inside of ' +
	      'a new top-level component which will hold the ref.'
	    ) : invariant(ReactOwner.isValidOwner(owner)));
	    // Check that `component` is still the current ref because we do not want to
	    // detach the ref if another component stole it.
	    if (owner.refs[ref] === component) {
	      owner.detachRef(ref);
	    }
	  },
	
	  /**
	   * A ReactComponent must mix this in to have refs.
	   *
	   * @lends {ReactOwner.prototype}
	   */
	  Mixin: {
	
	    construct: function() {
	      this.refs = emptyObject;
	    },
	
	    /**
	     * Lazily allocates the refs object and stores `component` as `ref`.
	     *
	     * @param {string} ref Reference name.
	     * @param {component} component Component to store as `ref`.
	     * @final
	     * @private
	     */
	    attachRef: function(ref, component) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        component.isOwnedBy(this),
	        'attachRef(%s, ...): Only a component\'s owner can store a ref to it.',
	        ref
	      ) : invariant(component.isOwnedBy(this)));
	      var refs = this.refs === emptyObject ? (this.refs = {}) : this.refs;
	      refs[ref] = component;
	    },
	
	    /**
	     * Detaches a reference name.
	     *
	     * @param {string} ref Name to dereference.
	     * @final
	     * @private
	     */
	    detachRef: function(ref) {
	      delete this.refs[ref];
	    }
	
	  }
	
	};
	
	module.exports = ReactOwner;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactUpdates
	 */
	
	"use strict";
	
	var CallbackQueue = __webpack_require__(145);
	var PooledClass = __webpack_require__(88);
	var ReactCurrentOwner = __webpack_require__(47);
	var ReactPerf = __webpack_require__(55);
	var Transaction = __webpack_require__(147);
	
	var invariant = __webpack_require__(62);
	var mixInto = __webpack_require__(99);
	var warning = __webpack_require__(60);
	
	var dirtyComponents = [];
	
	var batchingStrategy = null;
	
	function ensureInjected() {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    ReactUpdates.ReactReconcileTransaction && batchingStrategy,
	    'ReactUpdates: must inject a reconcile transaction class and batching ' +
	    'strategy'
	  ) : invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy));
	}
	
	var NESTED_UPDATES = {
	  initialize: function() {
	    this.dirtyComponentsLength = dirtyComponents.length;
	  },
	  close: function() {
	    if (this.dirtyComponentsLength !== dirtyComponents.length) {
	      // Additional updates were enqueued by componentDidUpdate handlers or
	      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
	      // these new updates so that if A's componentDidUpdate calls setState on
	      // B, B will update before the callback A's updater provided when calling
	      // setState.
	      dirtyComponents.splice(0, this.dirtyComponentsLength);
	      flushBatchedUpdates();
	    } else {
	      dirtyComponents.length = 0;
	    }
	  }
	};
	
	var UPDATE_QUEUEING = {
	  initialize: function() {
	    this.callbackQueue.reset();
	  },
	  close: function() {
	    this.callbackQueue.notifyAll();
	  }
	};
	
	var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
	
	function ReactUpdatesFlushTransaction() {
	  this.reinitializeTransaction();
	  this.dirtyComponentsLength = null;
	  this.callbackQueue = CallbackQueue.getPooled(null);
	  this.reconcileTransaction =
	    ReactUpdates.ReactReconcileTransaction.getPooled();
	}
	
	mixInto(ReactUpdatesFlushTransaction, Transaction.Mixin);
	mixInto(ReactUpdatesFlushTransaction, {
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  },
	
	  destructor: function() {
	    this.dirtyComponentsLength = null;
	    CallbackQueue.release(this.callbackQueue);
	    this.callbackQueue = null;
	    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
	    this.reconcileTransaction = null;
	  },
	
	  perform: function(method, scope, a) {
	    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
	    // with this transaction's wrappers around it.
	    return Transaction.Mixin.perform.call(
	      this,
	      this.reconcileTransaction.perform,
	      this.reconcileTransaction,
	      method,
	      scope,
	      a
	    );
	  }
	});
	
	PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
	
	function batchedUpdates(callback, a, b) {
	  ensureInjected();
	  batchingStrategy.batchedUpdates(callback, a, b);
	}
	
	/**
	 * Array comparator for ReactComponents by owner depth
	 *
	 * @param {ReactComponent} c1 first component you're comparing
	 * @param {ReactComponent} c2 second component you're comparing
	 * @return {number} Return value usable by Array.prototype.sort().
	 */
	function mountDepthComparator(c1, c2) {
	  return c1._mountDepth - c2._mountDepth;
	}
	
	function runBatchedUpdates(transaction) {
	  var len = transaction.dirtyComponentsLength;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    len === dirtyComponents.length,
	    'Expected flush transaction\'s stored dirty-components length (%s) to ' +
	    'match dirty-components array length (%s).',
	    len,
	    dirtyComponents.length
	  ) : invariant(len === dirtyComponents.length));
	
	  // Since reconciling a component higher in the owner hierarchy usually (not
	  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
	  // them before their children by sorting the array.
	  dirtyComponents.sort(mountDepthComparator);
	
	  for (var i = 0; i < len; i++) {
	    // If a component is unmounted before pending changes apply, ignore them
	    // TODO: Queue unmounts in the same list to avoid this happening at all
	    var component = dirtyComponents[i];
	    if (component.isMounted()) {
	      // If performUpdateIfNecessary happens to enqueue any new updates, we
	      // shouldn't execute the callbacks until the next render happens, so
	      // stash the callbacks first
	      var callbacks = component._pendingCallbacks;
	      component._pendingCallbacks = null;
	      component.performUpdateIfNecessary(transaction.reconcileTransaction);
	
	      if (callbacks) {
	        for (var j = 0; j < callbacks.length; j++) {
	          transaction.callbackQueue.enqueue(
	            callbacks[j],
	            component
	          );
	        }
	      }
	    }
	  }
	}
	
	var flushBatchedUpdates = ReactPerf.measure(
	  'ReactUpdates',
	  'flushBatchedUpdates',
	  function() {
	    // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
	    // array and perform any updates enqueued by mount-ready handlers (i.e.,
	    // componentDidUpdate) but we need to check here too in order to catch
	    // updates enqueued by setState callbacks.
	    while (dirtyComponents.length) {
	      var transaction = ReactUpdatesFlushTransaction.getPooled();
	      transaction.perform(runBatchedUpdates, null, transaction);
	      ReactUpdatesFlushTransaction.release(transaction);
	    }
	  }
	);
	
	/**
	 * Mark a component as needing a rerender, adding an optional callback to a
	 * list of functions which will be executed once the rerender occurs.
	 */
	function enqueueUpdate(component, callback) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !callback || typeof callback === "function",
	    'enqueueUpdate(...): You called `setProps`, `replaceProps`, ' +
	    '`setState`, `replaceState`, or `forceUpdate` with a callback that ' +
	    'isn\'t callable.'
	  ) : invariant(!callback || typeof callback === "function"));
	  ensureInjected();
	
	  // Various parts of our code (such as ReactCompositeComponent's
	  // _renderValidatedComponent) assume that calls to render aren't nested;
	  // verify that that's the case. (This is called by each top-level update
	  // function, like setProps, setState, forceUpdate, etc.; creation and
	  // destruction of top-level components is guarded in ReactMount.)
	  ("production" !== process.env.NODE_ENV ? warning(
	    ReactCurrentOwner.current == null,
	    'enqueueUpdate(): Render methods should be a pure function of props ' +
	    'and state; triggering nested component updates from render is not ' +
	    'allowed. If necessary, trigger nested updates in ' +
	    'componentDidUpdate.'
	  ) : null);
	
	  if (!batchingStrategy.isBatchingUpdates) {
	    batchingStrategy.batchedUpdates(enqueueUpdate, component, callback);
	    return;
	  }
	
	  dirtyComponents.push(component);
	
	  if (callback) {
	    if (component._pendingCallbacks) {
	      component._pendingCallbacks.push(callback);
	    } else {
	      component._pendingCallbacks = [callback];
	    }
	  }
	}
	
	var ReactUpdatesInjection = {
	  injectReconcileTransaction: function(ReconcileTransaction) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ReconcileTransaction,
	      'ReactUpdates: must provide a reconcile transaction class'
	    ) : invariant(ReconcileTransaction));
	    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
	  },
	
	  injectBatchingStrategy: function(_batchingStrategy) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      _batchingStrategy,
	      'ReactUpdates: must provide a batching strategy'
	    ) : invariant(_batchingStrategy));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      typeof _batchingStrategy.batchedUpdates === 'function',
	      'ReactUpdates: must provide a batchedUpdates() function'
	    ) : invariant(typeof _batchingStrategy.batchedUpdates === 'function'));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      typeof _batchingStrategy.isBatchingUpdates === 'boolean',
	      'ReactUpdates: must provide an isBatchingUpdates boolean attribute'
	    ) : invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean'));
	    batchingStrategy = _batchingStrategy;
	  }
	};
	
	var ReactUpdates = {
	  /**
	   * React references `ReactReconcileTransaction` using this property in order
	   * to allow dependency injection.
	   *
	   * @internal
	   */
	  ReactReconcileTransaction: null,
	
	  batchedUpdates: batchedUpdates,
	  enqueueUpdate: enqueueUpdate,
	  flushBatchedUpdates: flushBatchedUpdates,
	  injection: ReactUpdatesInjection
	};
	
	module.exports = ReactUpdates;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    obj instanceof Object && !Array.isArray(obj),
	    'keyMirror(...): Argument must be an object.'
	  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};
	
	module.exports = keyMirror;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDescriptorValidator
	 */
	
	/**
	 * ReactDescriptorValidator provides a wrapper around a descriptor factory
	 * which validates the props passed to the descriptor. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */
	
	"use strict";
	
	var ReactDescriptor = __webpack_require__(48);
	var ReactPropTypeLocations = __webpack_require__(97);
	var ReactCurrentOwner = __webpack_require__(47);
	
	var monitorCodeUse = __webpack_require__(100);
	
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {
	  'react_key_warning': {},
	  'react_numeric_key_warning': {}
	};
	var ownerHasMonitoredObjectMap = {};
	
	var loggedTypeFailures = {};
	
	var NUMERIC_PROPERTY_REGEX = /^\d+$/;
	
	/**
	 * Gets the current owner's displayName for use in warnings.
	 *
	 * @internal
	 * @return {?string} Display name or undefined
	 */
	function getCurrentOwnerDisplayName() {
	  var current = ReactCurrentOwner.current;
	  return current && current.constructor.displayName || undefined;
	}
	
	/**
	 * Warn if the component doesn't have an explicit key assigned to it.
	 * This component is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactComponent} component Component that requires a key.
	 * @param {*} parentType component's parent's type.
	 */
	function validateExplicitKey(component, parentType) {
	  if (component._store.validated || component.props.key != null) {
	    return;
	  }
	  component._store.validated = true;
	
	  warnAndMonitorForKeyUse(
	    'react_key_warning',
	    'Each child in an array should have a unique "key" prop.',
	    component,
	    parentType
	  );
	}
	
	/**
	 * Warn if the key is being defined as an object property but has an incorrect
	 * value.
	 *
	 * @internal
	 * @param {string} name Property name of the key.
	 * @param {ReactComponent} component Component that requires a key.
	 * @param {*} parentType component's parent's type.
	 */
	function validatePropertyKey(name, component, parentType) {
	  if (!NUMERIC_PROPERTY_REGEX.test(name)) {
	    return;
	  }
	  warnAndMonitorForKeyUse(
	    'react_numeric_key_warning',
	    'Child objects should have non-numeric keys so ordering is preserved.',
	    component,
	    parentType
	  );
	}
	
	/**
	 * Shared warning and monitoring code for the key warnings.
	 *
	 * @internal
	 * @param {string} warningID The id used when logging.
	 * @param {string} message The base warning that gets output.
	 * @param {ReactComponent} component Component that requires a key.
	 * @param {*} parentType component's parent's type.
	 */
	function warnAndMonitorForKeyUse(warningID, message, component, parentType) {
	  var ownerName = getCurrentOwnerDisplayName();
	  var parentName = parentType.displayName;
	
	  var useName = ownerName || parentName;
	  var memoizer = ownerHasKeyUseWarning[warningID];
	  if (memoizer.hasOwnProperty(useName)) {
	    return;
	  }
	  memoizer[useName] = true;
	
	  message += ownerName ?
	    (" Check the render method of " + ownerName + ".") :
	    (" Check the renderComponent call using <" + parentName + ">.");
	
	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwnerName = null;
	  if (component._owner && component._owner !== ReactCurrentOwner.current) {
	    // Name of the component that originally created this child.
	    childOwnerName = component._owner.constructor.displayName;
	
	    message += (" It was passed a child from " + childOwnerName + ".");
	  }
	
	  message += ' See http://fb.me/react-warning-keys for more information.';
	  monitorCodeUse(warningID, {
	    component: useName,
	    componentOwner: childOwnerName
	  });
	  console.warn(message);
	}
	
	/**
	 * Log that we're using an object map. We're considering deprecating this
	 * feature and replace it with proper Map and ImmutableMap data structures.
	 *
	 * @internal
	 */
	function monitorUseOfObjectMap() {
	  var currentName = getCurrentOwnerDisplayName() || '';
	  if (ownerHasMonitoredObjectMap.hasOwnProperty(currentName)) {
	    return;
	  }
	  ownerHasMonitoredObjectMap[currentName] = true;
	  monitorCodeUse('react_object_map_children');
	}
	
	/**
	 * Ensure that every component either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {*} component Statically passed child of any type.
	 * @param {*} parentType component's parent's type.
	 * @return {boolean}
	 */
	function validateChildKeys(component, parentType) {
	  if (Array.isArray(component)) {
	    for (var i = 0; i < component.length; i++) {
	      var child = component[i];
	      if (ReactDescriptor.isValidDescriptor(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactDescriptor.isValidDescriptor(component)) {
	    // This component was passed in a valid location.
	    component._store.validated = true;
	  } else if (component && typeof component === 'object') {
	    monitorUseOfObjectMap();
	    for (var name in component) {
	      validatePropertyKey(name, component[name], parentType);
	    }
	  }
	}
	
	/**
	 * Assert that the props are valid
	 *
	 * @param {string} componentName Name of the component for error messages.
	 * @param {object} propTypes Map of prop name to a ReactPropType
	 * @param {object} props
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @private
	 */
	function checkPropTypes(componentName, propTypes, props, location) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        error = propTypes[propName](props, propName, componentName, location);
	      } catch (ex) {
	        error = ex;
	      }
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	        // This will soon use the warning module
	        monitorCodeUse(
	          'react_failed_descriptor_type_check',
	          { message: error.message }
	        );
	      }
	    }
	  }
	}
	
	var ReactDescriptorValidator = {
	
	  /**
	   * Wraps a descriptor factory function in another function which validates
	   * the props and context of the descriptor and warns about any failed type
	   * checks.
	   *
	   * @param {function} factory The original descriptor factory
	   * @param {object?} propTypes A prop type definition set
	   * @param {object?} contextTypes A context type definition set
	   * @return {object} The component descriptor, which may be invalid.
	   * @private
	   */
	  createFactory: function(factory, propTypes, contextTypes) {
	    var validatedFactory = function(props, children) {
	      var descriptor = factory.apply(this, arguments);
	
	      for (var i = 1; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], descriptor.type);
	      }
	
	      var name = descriptor.type.displayName;
	      if (propTypes) {
	        checkPropTypes(
	          name,
	          propTypes,
	          descriptor.props,
	          ReactPropTypeLocations.prop
	        );
	      }
	      if (contextTypes) {
	        checkPropTypes(
	          name,
	          contextTypes,
	          descriptor._context,
	          ReactPropTypeLocations.context
	        );
	      }
	      return descriptor;
	    };
	
	    validatedFactory.prototype = factory.prototype;
	    validatedFactory.type = factory.type;
	
	    // Copy static properties
	    for (var key in factory) {
	      if (factory.hasOwnProperty(key)) {
	        validatedFactory[key] = factory[key];
	      }
	    }
	
	    return validatedFactory;
	  }
	
	};
	
	module.exports = ReactDescriptorValidator;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactEmptyComponent
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	var component;
	// This registry keeps track of the React IDs of the components that rendered to
	// `null` (in reality a placeholder such as `noscript`)
	var nullComponentIdsRegistry = {};
	
	var ReactEmptyComponentInjection = {
	  injectEmptyComponent: function(emptyComponent) {
	    component = emptyComponent;
	  }
	};
	
	/**
	 * @return {ReactComponent} component The injected empty component.
	 */
	function getEmptyComponent() {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    component,
	    'Trying to return null from a render, but no null placeholder component ' +
	    'was injected.'
	  ) : invariant(component));
	  return component();
	}
	
	/**
	 * Mark the component as having rendered to null.
	 * @param {string} id Component's `_rootNodeID`.
	 */
	function registerNullComponentID(id) {
	  nullComponentIdsRegistry[id] = true;
	}
	
	/**
	 * Unmark the component as having rendered to null: it renders to something now.
	 * @param {string} id Component's `_rootNodeID`.
	 */
	function deregisterNullComponentID(id) {
	  delete nullComponentIdsRegistry[id];
	}
	
	/**
	 * @param {string} id Component's `_rootNodeID`.
	 * @return {boolean} True if the component is rendered to null.
	 */
	function isNullComponentID(id) {
	  return nullComponentIdsRegistry[id];
	}
	
	var ReactEmptyComponent = {
	  deregisterNullComponentID: deregisterNullComponentID,
	  getEmptyComponent: getEmptyComponent,
	  injection: ReactEmptyComponentInjection,
	  isNullComponentID: isNullComponentID,
	  registerNullComponentID: registerNullComponentID
	};
	
	module.exports = ReactEmptyComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactErrorUtils
	 * @typechecks
	 */
	
	"use strict";
	
	var ReactErrorUtils = {
	  /**
	   * Creates a guarded version of a function. This is supposed to make debugging
	   * of event handlers easier. To aid debugging with the browser's debugger,
	   * this currently simply returns the original function.
	   *
	   * @param {function} func Function to be executed
	   * @param {string} name The name of the guard
	   * @return {function}
	   */
	  guard: function(func, name) {
	    return func;
	  }
	};
	
	module.exports = ReactErrorUtils;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPropTransferer
	 */
	
	"use strict";
	
	var emptyFunction = __webpack_require__(137);
	var invariant = __webpack_require__(62);
	var joinClasses = __webpack_require__(153);
	var merge = __webpack_require__(68);
	
	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function(props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}
	
	var transferStrategyMerge = createTransferStrategy(function(a, b) {
	  // `merge` overrides the first object's (`props[key]` above) keys using the
	  // second object's (`value`) keys. An object's style's existing `propA` would
	  // get overridden. Flip the order here.
	  return merge(b, a);
	});
	
	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 * NOTE: if you add any more exceptions to this list you should be sure to
	 * update `cloneWithProps()` accordingly.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Never transfer the `key` prop.
	   */
	  key: emptyFunction,
	  /**
	   * Never transfer the `ref` prop.
	   */
	  ref: emptyFunction,
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: transferStrategyMerge
	};
	
	/**
	 * Mutates the first argument by transferring the properties from the second
	 * argument.
	 *
	 * @param {object} props
	 * @param {object} newProps
	 * @return {object}
	 */
	function transferInto(props, newProps) {
	  for (var thisKey in newProps) {
	    if (!newProps.hasOwnProperty(thisKey)) {
	      continue;
	    }
	
	    var transferStrategy = TransferStrategies[thisKey];
	
	    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
	      transferStrategy(props, thisKey, newProps[thisKey]);
	    } else if (!props.hasOwnProperty(thisKey)) {
	      props[thisKey] = newProps[thisKey];
	    }
	  }
	  return props;
	}
	
	/**
	 * ReactPropTransferer are capable of transferring props to another component
	 * using a `transferPropsTo` method.
	 *
	 * @class ReactPropTransferer
	 */
	var ReactPropTransferer = {
	
	  TransferStrategies: TransferStrategies,
	
	  /**
	   * Merge two props objects using TransferStrategies.
	   *
	   * @param {object} oldProps original props (they take precedence)
	   * @param {object} newProps new props to merge in
	   * @return {object} a new object containing both sets of props merged.
	   */
	  mergeProps: function(oldProps, newProps) {
	    return transferInto(merge(oldProps), newProps);
	  },
	
	  /**
	   * @lends {ReactPropTransferer.prototype}
	   */
	  Mixin: {
	
	    /**
	     * Transfer props from this component to a target component.
	     *
	     * Props that do not have an explicit transfer strategy will be transferred
	     * only if the target component does not already have the prop set.
	     *
	     * This is usually used to pass down props to a returned root component.
	     *
	     * @param {ReactDescriptor} descriptor Component receiving the properties.
	     * @return {ReactDescriptor} The supplied `component`.
	     * @final
	     * @protected
	     */
	    transferPropsTo: function(descriptor) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        descriptor._owner === this,
	        '%s: You can\'t call transferPropsTo() on a component that you ' +
	        'don\'t own, %s. This usually means you are calling ' +
	        'transferPropsTo() on a component passed in as props or children.',
	        this.constructor.displayName,
	        descriptor.type.displayName
	      ) : invariant(descriptor._owner === this));
	
	      // Because descriptors are immutable we have to merge into the existing
	      // props object rather than clone it.
	      transferInto(descriptor.props, this.props);
	
	      return descriptor;
	    }
	
	  }
	};
	
	module.exports = ReactPropTransferer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPropTypeLocations
	 */
	
	"use strict";
	
	var keyMirror = __webpack_require__(92);
	
	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});
	
	module.exports = ReactPropTypeLocations;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */
	
	"use strict";
	
	var ReactPropTypeLocationNames = {};
	
	if ("production" !== process.env.NODE_ENV) {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}
	
	module.exports = ReactPropTypeLocationNames;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule mixInto
	 */
	
	"use strict";
	
	/**
	 * Simply copies properties to the prototype.
	 */
	var mixInto = function(constructor, methodBag) {
	  var methodName;
	  for (methodName in methodBag) {
	    if (!methodBag.hasOwnProperty(methodName)) {
	      continue;
	    }
	    constructor.prototype[methodName] = methodBag[methodName];
	  }
	};
	
	module.exports = mixInto;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule monitorCodeUse
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Provides open-source compatible instrumentation for monitoring certain API
	 * uses before we're ready to issue a warning or refactor. It accepts an event
	 * name which may only contain the characters [a-z0-9_] and an optional data
	 * object with further information.
	 */
	
	function monitorCodeUse(eventName, data) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    eventName && !/[^a-z0-9_]/.test(eventName),
	    'You must provide an eventName using only the characters [a-z0-9_]'
	  ) : invariant(eventName && !/[^a-z0-9_]/.test(eventName)));
	}
	
	module.exports = monitorCodeUse;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule mapObject
	 */
	
	"use strict";
	
	/**
	 * For each key/value pair, invokes callback func and constructs a resulting
	 * object which contains, for every key in obj, values that are the result of
	 * of invoking the function:
	 *
	 *   func(value, key, iteration)
	 *
	 * Grepable names:
	 *
	 *   function objectMap()
	 *   function objMap()
	 *
	 * @param {?object} obj Object to map keys over
	 * @param {function} func Invoked for each key/val pair.
	 * @param {?*} context
	 * @return {?object} Result of mapping or null if obj is falsey
	 */
	function mapObject(obj, func, context) {
	  if (!obj) {
	    return null;
	  }
	  var i = 0;
	  var ret = {};
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      ret[key] = func.call(context, obj[key], key, i++);
	    }
	  }
	  return ret;
	}
	
	module.exports = mapObject;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule shouldUpdateReactComponent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	/**
	 * Given a `prevDescriptor` and `nextDescriptor`, determines if the existing
	 * instance should be updated as opposed to being destroyed or replaced by a new
	 * instance. Both arguments are descriptors. This ensures that this logic can
	 * operate on stateless trees without any backing instance.
	 *
	 * @param {?object} prevDescriptor
	 * @param {?object} nextDescriptor
	 * @return {boolean} True if the existing instance should be updated.
	 * @protected
	 */
	function shouldUpdateReactComponent(prevDescriptor, nextDescriptor) {
	  if (prevDescriptor && nextDescriptor &&
	      prevDescriptor.type === nextDescriptor.type && (
	        (prevDescriptor.props && prevDescriptor.props.key) ===
	        (nextDescriptor.props && nextDescriptor.props.key)
	      ) && prevDescriptor._owner === nextDescriptor._owner) {
	    return true;
	  }
	  return false;
	}
	
	module.exports = shouldUpdateReactComponent;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule mergeInto
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var mergeHelpers = __webpack_require__(154);
	
	var checkMergeObjectArg = mergeHelpers.checkMergeObjectArg;
	var checkMergeIntoObjectArg = mergeHelpers.checkMergeIntoObjectArg;
	
	/**
	 * Shallow merges two structures by mutating the first parameter.
	 *
	 * @param {object|function} one Object to be merged into.
	 * @param {?object} two Optional object with properties to merge from.
	 */
	function mergeInto(one, two) {
	  checkMergeIntoObjectArg(one);
	  if (two != null) {
	    checkMergeObjectArg(two);
	    for (var key in two) {
	      if (!two.hasOwnProperty(key)) {
	        continue;
	      }
	      one[key] = two[key];
	    }
	  }
	}
	
	module.exports = mergeInto;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CSSPropertyOperations
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var CSSProperty = __webpack_require__(155);
	
	var dangerousStyleValue = __webpack_require__(156);
	var hyphenateStyleName = __webpack_require__(157);
	var memoizeStringOnly = __webpack_require__(86);
	
	var processStyleName = memoizeStringOnly(function(styleName) {
	  return hyphenateStyleName(styleName);
	});
	
	/**
	 * Operations for dealing with CSS properties.
	 */
	var CSSPropertyOperations = {
	
	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @return {?string}
	   */
	  createMarkupForStyles: function(styles) {
	    var serialized = '';
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var styleValue = styles[styleName];
	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ':';
	        serialized += dangerousStyleValue(styleName, styleValue) + ';';
	      }
	    }
	    return serialized || null;
	  },
	
	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   */
	  setValueForStyles: function(node, styles) {
	    var style = node.style;
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
	      if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = '';
	          }
	        } else {
	          style[styleName] = '';
	        }
	      }
	    }
	  }
	
	};
	
	module.exports = CSSPropertyOperations;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactBrowserComponentMixin
	 */
	
	"use strict";
	
	var ReactEmptyComponent = __webpack_require__(94);
	var ReactMount = __webpack_require__(53);
	
	var invariant = __webpack_require__(62);
	
	var ReactBrowserComponentMixin = {
	  /**
	   * Returns the DOM node rendered by this component.
	   *
	   * @return {DOMElement} The root node of this component.
	   * @final
	   * @protected
	   */
	  getDOMNode: function() {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      this.isMounted(),
	      'getDOMNode(): A component must be mounted to have a DOM node.'
	    ) : invariant(this.isMounted()));
	    if (ReactEmptyComponent.isNullComponentID(this._rootNodeID)) {
	      return null;
	    }
	    return ReactMount.getNode(this._rootNodeID);
	  }
	};
	
	module.exports = ReactBrowserComponentMixin;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactBrowserEventEmitter
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var EventPluginHub = __webpack_require__(158);
	var EventPluginRegistry = __webpack_require__(159);
	var ReactEventEmitterMixin = __webpack_require__(160);
	var ViewportMetrics = __webpack_require__(161);
	
	var isEventSupported = __webpack_require__(162);
	var merge = __webpack_require__(68);
	
	/**
	 * Summary of `ReactBrowserEventEmitter` event handling:
	 *
	 *  - Top-level delegation is used to trap most native browser events. This
	 *    may only occur in the main thread and is the responsibility of
	 *    ReactEventListener, which is injected and can therefore support pluggable
	 *    event sources. This is the only work that occurs in the main thread.
	 *
	 *  - We normalize and de-duplicate events to account for browser quirks. This
	 *    may be done in the worker thread.
	 *
	 *  - Forward these native events (with the associated top-level type used to
	 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
	 *    to extract any synthetic events.
	 *
	 *  - The `EventPluginHub` will then process each event by annotating them with
	 *    "dispatches", a sequence of listeners and IDs that care about that event.
	 *
	 *  - The `EventPluginHub` then dispatches the events.
	 *
	 * Overview of React and the event system:
	 *
	 * +------------+    .
	 * |    DOM     |    .
	 * +------------+    .
	 *       |           .
	 *       v           .
	 * +------------+    .
	 * | ReactEvent |    .
	 * |  Listener  |    .
	 * +------------+    .                         +-----------+
	 *       |           .               +--------+|SimpleEvent|
	 *       |           .               |         |Plugin     |
	 * +-----|------+    .               v         +-----------+
	 * |     |      |    .    +--------------+                    +------------+
	 * |     +-----------.--->|EventPluginHub|                    |    Event   |
	 * |            |    .    |              |     +-----------+  | Propagators|
	 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
	 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
	 * |            |    .    |              |     +-----------+  |  utilities |
	 * |     +-----------.--->|              |                    +------------+
	 * |     |      |    .    +--------------+
	 * +-----|------+    .                ^        +-----------+
	 *       |           .                |        |Enter/Leave|
	 *       +           .                +-------+|Plugin     |
	 * +-------------+   .                         +-----------+
	 * | application |   .
	 * |-------------|   .
	 * |             |   .
	 * |             |   .
	 * +-------------+   .
	 *                   .
	 *    React Core     .  General Purpose Event Plugin System
	 */
	
	var alreadyListeningTo = {};
	var isMonitoringScrollValue = false;
	var reactTopListenersCounter = 0;
	
	// For events like 'submit' which don't consistently bubble (which we trap at a
	// lower node than `document`), binding at `document` would cause duplicate
	// events so we don't include them here
	var topEventMapping = {
	  topBlur: 'blur',
	  topChange: 'change',
	  topClick: 'click',
	  topCompositionEnd: 'compositionend',
	  topCompositionStart: 'compositionstart',
	  topCompositionUpdate: 'compositionupdate',
	  topContextMenu: 'contextmenu',
	  topCopy: 'copy',
	  topCut: 'cut',
	  topDoubleClick: 'dblclick',
	  topDrag: 'drag',
	  topDragEnd: 'dragend',
	  topDragEnter: 'dragenter',
	  topDragExit: 'dragexit',
	  topDragLeave: 'dragleave',
	  topDragOver: 'dragover',
	  topDragStart: 'dragstart',
	  topDrop: 'drop',
	  topFocus: 'focus',
	  topInput: 'input',
	  topKeyDown: 'keydown',
	  topKeyPress: 'keypress',
	  topKeyUp: 'keyup',
	  topMouseDown: 'mousedown',
	  topMouseMove: 'mousemove',
	  topMouseOut: 'mouseout',
	  topMouseOver: 'mouseover',
	  topMouseUp: 'mouseup',
	  topPaste: 'paste',
	  topScroll: 'scroll',
	  topSelectionChange: 'selectionchange',
	  topTextInput: 'textInput',
	  topTouchCancel: 'touchcancel',
	  topTouchEnd: 'touchend',
	  topTouchMove: 'touchmove',
	  topTouchStart: 'touchstart',
	  topWheel: 'wheel'
	};
	
	/**
	 * To ensure no conflicts with other potential React instances on the page
	 */
	var topListenersIDKey = "_reactListenersID" + String(Math.random()).slice(2);
	
	function getListeningForDocument(mountAt) {
	  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
	  // directly.
	  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
	    mountAt[topListenersIDKey] = reactTopListenersCounter++;
	    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
	  }
	  return alreadyListeningTo[mountAt[topListenersIDKey]];
	}
	
	/**
	 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
	 * example:
	 *
	 *   ReactBrowserEventEmitter.putListener('myID', 'onClick', myFunction);
	 *
	 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
	 *
	 * @internal
	 */
	var ReactBrowserEventEmitter = merge(ReactEventEmitterMixin, {
	
	  /**
	   * Injectable event backend
	   */
	  ReactEventListener: null,
	
	  injection: {
	    /**
	     * @param {object} ReactEventListener
	     */
	    injectReactEventListener: function(ReactEventListener) {
	      ReactEventListener.setHandleTopLevel(
	        ReactBrowserEventEmitter.handleTopLevel
	      );
	      ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
	    }
	  },
	
	  /**
	   * Sets whether or not any created callbacks should be enabled.
	   *
	   * @param {boolean} enabled True if callbacks should be enabled.
	   */
	  setEnabled: function(enabled) {
	    if (ReactBrowserEventEmitter.ReactEventListener) {
	      ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
	    }
	  },
	
	  /**
	   * @return {boolean} True if callbacks are enabled.
	   */
	  isEnabled: function() {
	    return !!(
	      ReactBrowserEventEmitter.ReactEventListener &&
	      ReactBrowserEventEmitter.ReactEventListener.isEnabled()
	    );
	  },
	
	  /**
	   * We listen for bubbled touch events on the document object.
	   *
	   * Firefox v8.01 (and possibly others) exhibited strange behavior when
	   * mounting `onmousemove` events at some node that was not the document
	   * element. The symptoms were that if your mouse is not moving over something
	   * contained within that mount point (for example on the background) the
	   * top-level listeners for `onmousemove` won't be called. However, if you
	   * register the `mousemove` on the document object, then it will of course
	   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
	   * top-level listeners to the document object only, at least for these
	   * movement types of events and possibly all events.
	   *
	   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
	   *
	   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
	   * they bubble to document.
	   *
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {object} contentDocumentHandle Document which owns the container
	   */
	  listenTo: function(registrationName, contentDocumentHandle) {
	    var mountAt = contentDocumentHandle;
	    var isListening = getListeningForDocument(mountAt);
	    var dependencies = EventPluginRegistry.
	      registrationNameDependencies[registrationName];
	
	    var topLevelTypes = EventConstants.topLevelTypes;
	    for (var i = 0, l = dependencies.length; i < l; i++) {
	      var dependency = dependencies[i];
	      if (!(
	            isListening.hasOwnProperty(dependency) &&
	            isListening[dependency]
	          )) {
	        if (dependency === topLevelTypes.topWheel) {
	          if (isEventSupported('wheel')) {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topWheel,
	              'wheel',
	              mountAt
	            );
	          } else if (isEventSupported('mousewheel')) {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topWheel,
	              'mousewheel',
	              mountAt
	            );
	          } else {
	            // Firefox needs to capture a different mouse scroll event.
	            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topWheel,
	              'DOMMouseScroll',
	              mountAt
	            );
	          }
	        } else if (dependency === topLevelTypes.topScroll) {
	
	          if (isEventSupported('scroll', true)) {
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
	              topLevelTypes.topScroll,
	              'scroll',
	              mountAt
	            );
	          } else {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topScroll,
	              'scroll',
	              ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE
	            );
	          }
	        } else if (dependency === topLevelTypes.topFocus ||
	            dependency === topLevelTypes.topBlur) {
	
	          if (isEventSupported('focus', true)) {
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
	              topLevelTypes.topFocus,
	              'focus',
	              mountAt
	            );
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
	              topLevelTypes.topBlur,
	              'blur',
	              mountAt
	            );
	          } else if (isEventSupported('focusin')) {
	            // IE has `focusin` and `focusout` events which bubble.
	            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topFocus,
	              'focusin',
	              mountAt
	            );
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topBlur,
	              'focusout',
	              mountAt
	            );
	          }
	
	          // to make sure blur and focus event listeners are only attached once
	          isListening[topLevelTypes.topBlur] = true;
	          isListening[topLevelTypes.topFocus] = true;
	        } else if (topEventMapping.hasOwnProperty(dependency)) {
	          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	            dependency,
	            topEventMapping[dependency],
	            mountAt
	          );
	        }
	
	        isListening[dependency] = true;
	      }
	    }
	  },
	
	  trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
	    return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	      topLevelType,
	      handlerBaseName,
	      handle
	    );
	  },
	
	  trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
	    return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
	      topLevelType,
	      handlerBaseName,
	      handle
	    );
	  },
	
	  /**
	   * Listens to window scroll and resize events. We cache scroll values so that
	   * application code can access them without triggering reflows.
	   *
	   * NOTE: Scroll events do not bubble.
	   *
	   * @see http://www.quirksmode.org/dom/events/scroll.html
	   */
	  ensureScrollValueMonitoring: function(){
	    if (!isMonitoringScrollValue) {
	      var refresh = ViewportMetrics.refreshScrollValues;
	      ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
	      isMonitoringScrollValue = true;
	    }
	  },
	
	  eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,
	
	  registrationNameModules: EventPluginHub.registrationNameModules,
	
	  putListener: EventPluginHub.putListener,
	
	  getListener: EventPluginHub.getListener,
	
	  deleteListener: EventPluginHub.deleteListener,
	
	  deleteAllListeners: EventPluginHub.deleteAllListeners
	
	});
	
	module.exports = ReactBrowserEventEmitter;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule BeforeInputEventPlugin
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var EventPropagators = __webpack_require__(163);
	var ExecutionEnvironment = __webpack_require__(61);
	var SyntheticInputEvent = __webpack_require__(164);
	
	var keyOf = __webpack_require__(64);
	
	var canUseTextInputEvent = (
	  ExecutionEnvironment.canUseDOM &&
	  'TextEvent' in window &&
	  !('documentMode' in document || isPresto())
	);
	
	/**
	 * Opera <= 12 includes TextEvent in window, but does not fire
	 * text input events. Rely on keypress instead.
	 */
	function isPresto() {
	  var opera = window.opera;
	  return (
	    typeof opera === 'object' &&
	    typeof opera.version === 'function' &&
	    parseInt(opera.version(), 10) <= 12
	  );
	}
	
	var SPACEBAR_CODE = 32;
	var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
	
	var topLevelTypes = EventConstants.topLevelTypes;
	
	// Events and their corresponding property names.
	var eventTypes = {
	  beforeInput: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onBeforeInput: null}),
	      captured: keyOf({onBeforeInputCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topCompositionEnd,
	      topLevelTypes.topKeyPress,
	      topLevelTypes.topTextInput,
	      topLevelTypes.topPaste
	    ]
	  }
	};
	
	// Track characters inserted via keypress and composition events.
	var fallbackChars = null;
	
	/**
	 * Return whether a native keypress event is assumed to be a command.
	 * This is required because Firefox fires `keypress` events for key commands
	 * (cut, copy, select-all, etc.) even though no character is inserted.
	 */
	function isKeypressCommand(nativeEvent) {
	  return (
	    (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
	    // ctrlKey && altKey is equivalent to AltGr, and is not a command.
	    !(nativeEvent.ctrlKey && nativeEvent.altKey)
	  );
	}
	
	/**
	 * Create an `onBeforeInput` event to match
	 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
	 *
	 * This event plugin is based on the native `textInput` event
	 * available in Chrome, Safari, Opera, and IE. This event fires after
	 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
	 *
	 * `beforeInput` is spec'd but not implemented in any browsers, and
	 * the `input` event does not provide any useful information about what has
	 * actually been added, contrary to the spec. Thus, `textInput` is the best
	 * available event to identify the characters that have actually been inserted
	 * into the target node.
	 */
	var BeforeInputEventPlugin = {
	
	  eventTypes: eventTypes,
	
	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	
	    var chars;
	
	    if (canUseTextInputEvent) {
	      switch (topLevelType) {
	        case topLevelTypes.topKeyPress:
	          /**
	           * If native `textInput` events are available, our goal is to make
	           * use of them. However, there is a special case: the spacebar key.
	           * In Webkit, preventing default on a spacebar `textInput` event
	           * cancels character insertion, but it *also* causes the browser
	           * to fall back to its default spacebar behavior of scrolling the
	           * page.
	           *
	           * Tracking at:
	           * https://code.google.com/p/chromium/issues/detail?id=355103
	           *
	           * To avoid this issue, use the keypress event as if no `textInput`
	           * event is available.
	           */
	          var which = nativeEvent.which;
	          if (which !== SPACEBAR_CODE) {
	            return;
	          }
	
	          chars = String.fromCharCode(which);
	          break;
	
	        case topLevelTypes.topTextInput:
	          // Record the characters to be added to the DOM.
	          chars = nativeEvent.data;
	
	          // If it's a spacebar character, assume that we have already handled
	          // it at the keypress level and bail immediately.
	          if (chars === SPACEBAR_CHAR) {
	            return;
	          }
	
	          // Otherwise, carry on.
	          break;
	
	        default:
	          // For other native event types, do nothing.
	          return;
	      }
	    } else {
	      switch (topLevelType) {
	        case topLevelTypes.topPaste:
	          // If a paste event occurs after a keypress, throw out the input
	          // chars. Paste events should not lead to BeforeInput events.
	          fallbackChars = null;
	          break;
	        case topLevelTypes.topKeyPress:
	          /**
	           * As of v27, Firefox may fire keypress events even when no character
	           * will be inserted. A few possibilities:
	           *
	           * - `which` is `0`. Arrow keys, Esc key, etc.
	           *
	           * - `which` is the pressed key code, but no char is available.
	           *   Ex: 'AltGr + d` in Polish. There is no modified character for
	           *   this key combination and no character is inserted into the
	           *   document, but FF fires the keypress for char code `100` anyway.
	           *   No `input` event will occur.
	           *
	           * - `which` is the pressed key code, but a command combination is
	           *   being used. Ex: `Cmd+C`. No character is inserted, and no
	           *   `input` event will occur.
	           */
	          if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
	            fallbackChars = String.fromCharCode(nativeEvent.which);
	          }
	          break;
	        case topLevelTypes.topCompositionEnd:
	          fallbackChars = nativeEvent.data;
	          break;
	      }
	
	      // If no changes have occurred to the fallback string, no relevant
	      // event has fired and we're done.
	      if (fallbackChars === null) {
	        return;
	      }
	
	      chars = fallbackChars;
	    }
	
	    // If no characters are being inserted, no BeforeInput event should
	    // be fired.
	    if (!chars) {
	      return;
	    }
	
	    var event = SyntheticInputEvent.getPooled(
	      eventTypes.beforeInput,
	      topLevelTargetID,
	      nativeEvent
	    );
	
	    event.data = chars;
	    fallbackChars = null;
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	    return event;
	  }
	};
	
	module.exports = BeforeInputEventPlugin;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ChangeEventPlugin
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var EventPluginHub = __webpack_require__(158);
	var EventPropagators = __webpack_require__(163);
	var ExecutionEnvironment = __webpack_require__(61);
	var ReactUpdates = __webpack_require__(91);
	var SyntheticEvent = __webpack_require__(165);
	
	var isEventSupported = __webpack_require__(162);
	var isTextInputElement = __webpack_require__(166);
	var keyOf = __webpack_require__(64);
	
	var topLevelTypes = EventConstants.topLevelTypes;
	
	var eventTypes = {
	  change: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onChange: null}),
	      captured: keyOf({onChangeCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topChange,
	      topLevelTypes.topClick,
	      topLevelTypes.topFocus,
	      topLevelTypes.topInput,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topKeyUp,
	      topLevelTypes.topSelectionChange
	    ]
	  }
	};
	
	/**
	 * For IE shims
	 */
	var activeElement = null;
	var activeElementID = null;
	var activeElementValue = null;
	var activeElementValueProp = null;
	
	/**
	 * SECTION: handle `change` event
	 */
	function shouldUseChangeEvent(elem) {
	  return (
	    elem.nodeName === 'SELECT' ||
	    (elem.nodeName === 'INPUT' && elem.type === 'file')
	  );
	}
	
	var doesChangeEventBubble = false;
	if (ExecutionEnvironment.canUseDOM) {
	  // See `handleChange` comment below
	  doesChangeEventBubble = isEventSupported('change') && (
	    !('documentMode' in document) || document.documentMode > 8
	  );
	}
	
	function manualDispatchChangeEvent(nativeEvent) {
	  var event = SyntheticEvent.getPooled(
	    eventTypes.change,
	    activeElementID,
	    nativeEvent
	  );
	  EventPropagators.accumulateTwoPhaseDispatches(event);
	
	  // If change and propertychange bubbled, we'd just bind to it like all the
	  // other events and have it go through ReactBrowserEventEmitter. Since it
	  // doesn't, we manually listen for the events and so we have to enqueue and
	  // process the abstract event manually.
	  //
	  // Batching is necessary here in order to ensure that all event handlers run
	  // before the next rerender (including event handlers attached to ancestor
	  // elements instead of directly on the input). Without this, controlled
	  // components don't work properly in conjunction with event bubbling because
	  // the component is rerendered and the value reverted before all the event
	  // handlers can run. See https://github.com/facebook/react/issues/708.
	  ReactUpdates.batchedUpdates(runEventInBatch, event);
	}
	
	function runEventInBatch(event) {
	  EventPluginHub.enqueueEvents(event);
	  EventPluginHub.processEventQueue();
	}
	
	function startWatchingForChangeEventIE8(target, targetID) {
	  activeElement = target;
	  activeElementID = targetID;
	  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
	}
	
	function stopWatchingForChangeEventIE8() {
	  if (!activeElement) {
	    return;
	  }
	  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
	  activeElement = null;
	  activeElementID = null;
	}
	
	function getTargetIDForChangeEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topChange) {
	    return topLevelTargetID;
	  }
	}
	function handleEventsForChangeEventIE8(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topFocus) {
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForChangeEventIE8();
	    startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
	  } else if (topLevelType === topLevelTypes.topBlur) {
	    stopWatchingForChangeEventIE8();
	  }
	}
	
	
	/**
	 * SECTION: handle `input` event
	 */
	var isInputEventSupported = false;
	if (ExecutionEnvironment.canUseDOM) {
	  // IE9 claims to support the input event but fails to trigger it when
	  // deleting text, so we ignore its input events
	  isInputEventSupported = isEventSupported('input') && (
	    !('documentMode' in document) || document.documentMode > 9
	  );
	}
	
	/**
	 * (For old IE.) Replacement getter/setter for the `value` property that gets
	 * set on the active element.
	 */
	var newValueProp =  {
	  get: function() {
	    return activeElementValueProp.get.call(this);
	  },
	  set: function(val) {
	    // Cast to a string so we can do equality checks.
	    activeElementValue = '' + val;
	    activeElementValueProp.set.call(this, val);
	  }
	};
	
	/**
	 * (For old IE.) Starts tracking propertychange events on the passed-in element
	 * and override the value property so that we can distinguish user events from
	 * value changes in JS.
	 */
	function startWatchingForValueChange(target, targetID) {
	  activeElement = target;
	  activeElementID = targetID;
	  activeElementValue = target.value;
	  activeElementValueProp = Object.getOwnPropertyDescriptor(
	    target.constructor.prototype,
	    'value'
	  );
	
	  Object.defineProperty(activeElement, 'value', newValueProp);
	  activeElement.attachEvent('onpropertychange', handlePropertyChange);
	}
	
	/**
	 * (For old IE.) Removes the event listeners from the currently-tracked element,
	 * if any exists.
	 */
	function stopWatchingForValueChange() {
	  if (!activeElement) {
	    return;
	  }
	
	  // delete restores the original property definition
	  delete activeElement.value;
	  activeElement.detachEvent('onpropertychange', handlePropertyChange);
	
	  activeElement = null;
	  activeElementID = null;
	  activeElementValue = null;
	  activeElementValueProp = null;
	}
	
	/**
	 * (For old IE.) Handles a propertychange event, sending a `change` event if
	 * the value of the active element has changed.
	 */
	function handlePropertyChange(nativeEvent) {
	  if (nativeEvent.propertyName !== 'value') {
	    return;
	  }
	  var value = nativeEvent.srcElement.value;
	  if (value === activeElementValue) {
	    return;
	  }
	  activeElementValue = value;
	
	  manualDispatchChangeEvent(nativeEvent);
	}
	
	/**
	 * If a `change` event should be fired, returns the target's ID.
	 */
	function getTargetIDForInputEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topInput) {
	    // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
	    // what we want so fall through here and trigger an abstract event
	    return topLevelTargetID;
	  }
	}
	
	// For IE8 and IE9.
	function handleEventsForInputEventIE(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topFocus) {
	    // In IE8, we can capture almost all .value changes by adding a
	    // propertychange handler and looking for events with propertyName
	    // equal to 'value'
	    // In IE9, propertychange fires for most input events but is buggy and
	    // doesn't fire when text is deleted, but conveniently, selectionchange
	    // appears to fire in all of the remaining cases so we catch those and
	    // forward the event if the value has changed
	    // In either case, we don't want to call the event handler if the value
	    // is changed from JS so we redefine a setter for `.value` that updates
	    // our activeElementValue variable, allowing us to ignore those changes
	    //
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForValueChange();
	    startWatchingForValueChange(topLevelTarget, topLevelTargetID);
	  } else if (topLevelType === topLevelTypes.topBlur) {
	    stopWatchingForValueChange();
	  }
	}
	
	// For IE8 and IE9.
	function getTargetIDForInputEventIE(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topSelectionChange ||
	      topLevelType === topLevelTypes.topKeyUp ||
	      topLevelType === topLevelTypes.topKeyDown) {
	    // On the selectionchange event, the target is just document which isn't
	    // helpful for us so just check activeElement instead.
	    //
	    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
	    // propertychange on the first input event after setting `value` from a
	    // script and fires only keydown, keypress, keyup. Catching keyup usually
	    // gets it and catching keydown lets us fire an event for the first
	    // keystroke if user does a key repeat (it'll be a little delayed: right
	    // before the second keystroke). Other input methods (e.g., paste) seem to
	    // fire selectionchange normally.
	    if (activeElement && activeElement.value !== activeElementValue) {
	      activeElementValue = activeElement.value;
	      return activeElementID;
	    }
	  }
	}
	
	
	/**
	 * SECTION: handle `click` event
	 */
	function shouldUseClickEvent(elem) {
	  // Use the `click` event to detect changes to checkbox and radio inputs.
	  // This approach works across all browsers, whereas `change` does not fire
	  // until `blur` in IE8.
	  return (
	    elem.nodeName === 'INPUT' &&
	    (elem.type === 'checkbox' || elem.type === 'radio')
	  );
	}
	
	function getTargetIDForClickEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topClick) {
	    return topLevelTargetID;
	  }
	}
	
	/**
	 * This plugin creates an `onChange` event that normalizes change events
	 * across form elements. This event fires at a time when it's possible to
	 * change the element's value without seeing a flicker.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - select
	 */
	var ChangeEventPlugin = {
	
	  eventTypes: eventTypes,
	
	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	
	    var getTargetIDFunc, handleEventFunc;
	    if (shouldUseChangeEvent(topLevelTarget)) {
	      if (doesChangeEventBubble) {
	        getTargetIDFunc = getTargetIDForChangeEvent;
	      } else {
	        handleEventFunc = handleEventsForChangeEventIE8;
	      }
	    } else if (isTextInputElement(topLevelTarget)) {
	      if (isInputEventSupported) {
	        getTargetIDFunc = getTargetIDForInputEvent;
	      } else {
	        getTargetIDFunc = getTargetIDForInputEventIE;
	        handleEventFunc = handleEventsForInputEventIE;
	      }
	    } else if (shouldUseClickEvent(topLevelTarget)) {
	      getTargetIDFunc = getTargetIDForClickEvent;
	    }
	
	    if (getTargetIDFunc) {
	      var targetID = getTargetIDFunc(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID
	      );
	      if (targetID) {
	        var event = SyntheticEvent.getPooled(
	          eventTypes.change,
	          targetID,
	          nativeEvent
	        );
	        EventPropagators.accumulateTwoPhaseDispatches(event);
	        return event;
	      }
	    }
	
	    if (handleEventFunc) {
	      handleEventFunc(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID
	      );
	    }
	  }
	
	};
	
	module.exports = ChangeEventPlugin;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ClientReactRootIndex
	 * @typechecks
	 */
	
	"use strict";
	
	var nextReactRootIndex = 0;
	
	var ClientReactRootIndex = {
	  createReactRootIndex: function() {
	    return nextReactRootIndex++;
	  }
	};
	
	module.exports = ClientReactRootIndex;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CompositionEventPlugin
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var EventPropagators = __webpack_require__(163);
	var ExecutionEnvironment = __webpack_require__(61);
	var ReactInputSelection = __webpack_require__(167);
	var SyntheticCompositionEvent = __webpack_require__(168);
	
	var getTextContentAccessor = __webpack_require__(169);
	var keyOf = __webpack_require__(64);
	
	var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
	var START_KEYCODE = 229;
	
	var useCompositionEvent = (
	  ExecutionEnvironment.canUseDOM &&
	  'CompositionEvent' in window
	);
	
	// In IE9+, we have access to composition events, but the data supplied
	// by the native compositionend event may be incorrect. In Korean, for example,
	// the compositionend event contains only one character regardless of
	// how many characters have been composed since compositionstart.
	// We therefore use the fallback data while still using the native
	// events as triggers.
	var useFallbackData = (
	  !useCompositionEvent ||
	  (
	    'documentMode' in document &&
	    document.documentMode > 8 &&
	    document.documentMode <= 11
	  )
	);
	
	var topLevelTypes = EventConstants.topLevelTypes;
	var currentComposition = null;
	
	// Events and their corresponding property names.
	var eventTypes = {
	  compositionEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionEnd: null}),
	      captured: keyOf({onCompositionEndCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topCompositionEnd,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topKeyPress,
	      topLevelTypes.topKeyUp,
	      topLevelTypes.topMouseDown
	    ]
	  },
	  compositionStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionStart: null}),
	      captured: keyOf({onCompositionStartCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topCompositionStart,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topKeyPress,
	      topLevelTypes.topKeyUp,
	      topLevelTypes.topMouseDown
	    ]
	  },
	  compositionUpdate: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionUpdate: null}),
	      captured: keyOf({onCompositionUpdateCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topCompositionUpdate,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topKeyPress,
	      topLevelTypes.topKeyUp,
	      topLevelTypes.topMouseDown
	    ]
	  }
	};
	
	/**
	 * Translate native top level events into event types.
	 *
	 * @param {string} topLevelType
	 * @return {object}
	 */
	function getCompositionEventType(topLevelType) {
	  switch (topLevelType) {
	    case topLevelTypes.topCompositionStart:
	      return eventTypes.compositionStart;
	    case topLevelTypes.topCompositionEnd:
	      return eventTypes.compositionEnd;
	    case topLevelTypes.topCompositionUpdate:
	      return eventTypes.compositionUpdate;
	  }
	}
	
	/**
	 * Does our fallback best-guess model think this event signifies that
	 * composition has begun?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */
	function isFallbackStart(topLevelType, nativeEvent) {
	  return (
	    topLevelType === topLevelTypes.topKeyDown &&
	    nativeEvent.keyCode === START_KEYCODE
	  );
	}
	
	/**
	 * Does our fallback mode think that this event is the end of composition?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */
	function isFallbackEnd(topLevelType, nativeEvent) {
	  switch (topLevelType) {
	    case topLevelTypes.topKeyUp:
	      // Command keys insert or clear IME input.
	      return (END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1);
	    case topLevelTypes.topKeyDown:
	      // Expect IME keyCode on each keydown. If we get any other
	      // code we must have exited earlier.
	      return (nativeEvent.keyCode !== START_KEYCODE);
	    case topLevelTypes.topKeyPress:
	    case topLevelTypes.topMouseDown:
	    case topLevelTypes.topBlur:
	      // Events are not possible without cancelling IME.
	      return true;
	    default:
	      return false;
	  }
	}
	
	/**
	 * Helper class stores information about selection and document state
	 * so we can figure out what changed at a later date.
	 *
	 * @param {DOMEventTarget} root
	 */
	function FallbackCompositionState(root) {
	  this.root = root;
	  this.startSelection = ReactInputSelection.getSelection(root);
	  this.startValue = this.getText();
	}
	
	/**
	 * Get current text of input.
	 *
	 * @return {string}
	 */
	FallbackCompositionState.prototype.getText = function() {
	  return this.root.value || this.root[getTextContentAccessor()];
	};
	
	/**
	 * Text that has changed since the start of composition.
	 *
	 * @return {string}
	 */
	FallbackCompositionState.prototype.getData = function() {
	  var endValue = this.getText();
	  var prefixLength = this.startSelection.start;
	  var suffixLength = this.startValue.length - this.startSelection.end;
	
	  return endValue.substr(
	    prefixLength,
	    endValue.length - suffixLength - prefixLength
	  );
	};
	
	/**
	 * This plugin creates `onCompositionStart`, `onCompositionUpdate` and
	 * `onCompositionEnd` events on inputs, textareas and contentEditable
	 * nodes.
	 */
	var CompositionEventPlugin = {
	
	  eventTypes: eventTypes,
	
	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	
	    var eventType;
	    var data;
	
	    if (useCompositionEvent) {
	      eventType = getCompositionEventType(topLevelType);
	    } else if (!currentComposition) {
	      if (isFallbackStart(topLevelType, nativeEvent)) {
	        eventType = eventTypes.compositionStart;
	      }
	    } else if (isFallbackEnd(topLevelType, nativeEvent)) {
	      eventType = eventTypes.compositionEnd;
	    }
	
	    if (useFallbackData) {
	      // The current composition is stored statically and must not be
	      // overwritten while composition continues.
	      if (!currentComposition && eventType === eventTypes.compositionStart) {
	        currentComposition = new FallbackCompositionState(topLevelTarget);
	      } else if (eventType === eventTypes.compositionEnd) {
	        if (currentComposition) {
	          data = currentComposition.getData();
	          currentComposition = null;
	        }
	      }
	    }
	
	    if (eventType) {
	      var event = SyntheticCompositionEvent.getPooled(
	        eventType,
	        topLevelTargetID,
	        nativeEvent
	      );
	      if (data) {
	        // Inject data generated from fallback path into the synthetic event.
	        // This matches the property of native CompositionEventInterface.
	        event.data = data;
	      }
	      EventPropagators.accumulateTwoPhaseDispatches(event);
	      return event;
	    }
	  }
	};
	
	module.exports = CompositionEventPlugin;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DefaultEventPluginOrder
	 */
	
	"use strict";
	
	 var keyOf = __webpack_require__(64);
	
	/**
	 * Module that is injectable into `EventPluginHub`, that specifies a
	 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
	 * plugins, without having to package every one of them. This is better than
	 * having plugins be ordered in the same order that they are injected because
	 * that ordering would be influenced by the packaging order.
	 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
	 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
	 */
	var DefaultEventPluginOrder = [
	  keyOf({ResponderEventPlugin: null}),
	  keyOf({SimpleEventPlugin: null}),
	  keyOf({TapEventPlugin: null}),
	  keyOf({EnterLeaveEventPlugin: null}),
	  keyOf({ChangeEventPlugin: null}),
	  keyOf({SelectEventPlugin: null}),
	  keyOf({CompositionEventPlugin: null}),
	  keyOf({BeforeInputEventPlugin: null}),
	  keyOf({AnalyticsEventPlugin: null}),
	  keyOf({MobileSafariClickEventPlugin: null})
	];
	
	module.exports = DefaultEventPluginOrder;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EnterLeaveEventPlugin
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var EventPropagators = __webpack_require__(163);
	var SyntheticMouseEvent = __webpack_require__(170);
	
	var ReactMount = __webpack_require__(53);
	var keyOf = __webpack_require__(64);
	
	var topLevelTypes = EventConstants.topLevelTypes;
	var getFirstReactDOM = ReactMount.getFirstReactDOM;
	
	var eventTypes = {
	  mouseEnter: {
	    registrationName: keyOf({onMouseEnter: null}),
	    dependencies: [
	      topLevelTypes.topMouseOut,
	      topLevelTypes.topMouseOver
	    ]
	  },
	  mouseLeave: {
	    registrationName: keyOf({onMouseLeave: null}),
	    dependencies: [
	      topLevelTypes.topMouseOut,
	      topLevelTypes.topMouseOver
	    ]
	  }
	};
	
	var extractedEvents = [null, null];
	
	var EnterLeaveEventPlugin = {
	
	  eventTypes: eventTypes,
	
	  /**
	   * For almost every interaction we care about, there will be both a top-level
	   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
	   * we do not extract duplicate events. However, moving the mouse into the
	   * browser from outside will not fire a `mouseout` event. In this case, we use
	   * the `mouseover` top-level event.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    if (topLevelType === topLevelTypes.topMouseOver &&
	        (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
	      return null;
	    }
	    if (topLevelType !== topLevelTypes.topMouseOut &&
	        topLevelType !== topLevelTypes.topMouseOver) {
	      // Must not be a mouse in or mouse out - ignoring.
	      return null;
	    }
	
	    var win;
	    if (topLevelTarget.window === topLevelTarget) {
	      // `topLevelTarget` is probably a window object.
	      win = topLevelTarget;
	    } else {
	      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
	      var doc = topLevelTarget.ownerDocument;
	      if (doc) {
	        win = doc.defaultView || doc.parentWindow;
	      } else {
	        win = window;
	      }
	    }
	
	    var from, to;
	    if (topLevelType === topLevelTypes.topMouseOut) {
	      from = topLevelTarget;
	      to =
	        getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) ||
	        win;
	    } else {
	      from = win;
	      to = topLevelTarget;
	    }
	
	    if (from === to) {
	      // Nothing pertains to our managed components.
	      return null;
	    }
	
	    var fromID = from ? ReactMount.getID(from) : '';
	    var toID = to ? ReactMount.getID(to) : '';
	
	    var leave = SyntheticMouseEvent.getPooled(
	      eventTypes.mouseLeave,
	      fromID,
	      nativeEvent
	    );
	    leave.type = 'mouseleave';
	    leave.target = from;
	    leave.relatedTarget = to;
	
	    var enter = SyntheticMouseEvent.getPooled(
	      eventTypes.mouseEnter,
	      toID,
	      nativeEvent
	    );
	    enter.type = 'mouseenter';
	    enter.target = to;
	    enter.relatedTarget = from;
	
	    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);
	
	    extractedEvents[0] = leave;
	    extractedEvents[1] = enter;
	
	    return extractedEvents;
	  }
	
	};
	
	module.exports = EnterLeaveEventPlugin;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule HTMLDOMPropertyConfig
	 */
	
	/*jslint bitwise: true*/
	
	"use strict";
	
	var DOMProperty = __webpack_require__(84);
	var ExecutionEnvironment = __webpack_require__(61);
	
	var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
	var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
	var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
	var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
	var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
	var HAS_POSITIVE_NUMERIC_VALUE =
	  DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
	var HAS_OVERLOADED_BOOLEAN_VALUE =
	  DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
	
	var hasSVG;
	if (ExecutionEnvironment.canUseDOM) {
	  var implementation = document.implementation;
	  hasSVG = (
	    implementation &&
	    implementation.hasFeature &&
	    implementation.hasFeature(
	      'http://www.w3.org/TR/SVG11/feature#BasicStructure',
	      '1.1'
	    )
	  );
	}
	
	
	var HTMLDOMPropertyConfig = {
	  isCustomAttribute: RegExp.prototype.test.bind(
	    /^(data|aria)-[a-z_][a-z\d_.\-]*$/
	  ),
	  Properties: {
	    /**
	     * Standard Properties
	     */
	    accept: null,
	    accessKey: null,
	    action: null,
	    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    allowTransparency: MUST_USE_ATTRIBUTE,
	    alt: null,
	    async: HAS_BOOLEAN_VALUE,
	    autoComplete: null,
	    // autoFocus is polyfilled/normalized by AutoFocusMixin
	    // autoFocus: HAS_BOOLEAN_VALUE,
	    autoPlay: HAS_BOOLEAN_VALUE,
	    cellPadding: null,
	    cellSpacing: null,
	    charSet: MUST_USE_ATTRIBUTE,
	    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    // To set className on SVG elements, it's necessary to use .setAttribute;
	    // this works on HTML elements too in all browsers except IE8. Conveniently,
	    // IE8 doesn't support SVG and so we can simply use the attribute in
	    // browsers that support SVG and the property in browsers that don't,
	    // regardless of whether the element is HTML or SVG.
	    className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
	    cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    colSpan: null,
	    content: null,
	    contentEditable: null,
	    contextMenu: MUST_USE_ATTRIBUTE,
	    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    coords: null,
	    crossOrigin: null,
	    data: null, // For `<object />` acts as `src`.
	    dateTime: MUST_USE_ATTRIBUTE,
	    defer: HAS_BOOLEAN_VALUE,
	    dir: null,
	    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    download: HAS_OVERLOADED_BOOLEAN_VALUE,
	    draggable: null,
	    encType: null,
	    form: MUST_USE_ATTRIBUTE,
	    formNoValidate: HAS_BOOLEAN_VALUE,
	    frameBorder: MUST_USE_ATTRIBUTE,
	    height: MUST_USE_ATTRIBUTE,
	    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    href: null,
	    hrefLang: null,
	    htmlFor: null,
	    httpEquiv: null,
	    icon: null,
	    id: MUST_USE_PROPERTY,
	    label: null,
	    lang: null,
	    list: null,
	    loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    max: null,
	    maxLength: MUST_USE_ATTRIBUTE,
	    media: MUST_USE_ATTRIBUTE,
	    mediaGroup: null,
	    method: null,
	    min: null,
	    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    name: null,
	    noValidate: HAS_BOOLEAN_VALUE,
	    open: null,
	    pattern: null,
	    placeholder: null,
	    poster: null,
	    preload: null,
	    radioGroup: null,
	    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    rel: null,
	    required: HAS_BOOLEAN_VALUE,
	    role: MUST_USE_ATTRIBUTE,
	    rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    rowSpan: null,
	    sandbox: null,
	    scope: null,
	    scrollLeft: MUST_USE_PROPERTY,
	    scrolling: null,
	    scrollTop: MUST_USE_PROPERTY,
	    seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    shape: null,
	    size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    sizes: MUST_USE_ATTRIBUTE,
	    span: HAS_POSITIVE_NUMERIC_VALUE,
	    spellCheck: null,
	    src: null,
	    srcDoc: MUST_USE_PROPERTY,
	    srcSet: MUST_USE_ATTRIBUTE,
	    start: HAS_NUMERIC_VALUE,
	    step: null,
	    style: null,
	    tabIndex: null,
	    target: null,
	    title: null,
	    type: null,
	    useMap: null,
	    value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
	    width: MUST_USE_ATTRIBUTE,
	    wmode: MUST_USE_ATTRIBUTE,
	
	    /**
	     * Non-standard Properties
	     */
	    autoCapitalize: null, // Supported in Mobile Safari for keyboard hints
	    autoCorrect: null, // Supported in Mobile Safari for keyboard hints
	    itemProp: MUST_USE_ATTRIBUTE, // Microdata: http://schema.org/docs/gs.html
	    itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE, // Microdata: http://schema.org/docs/gs.html
	    itemType: MUST_USE_ATTRIBUTE, // Microdata: http://schema.org/docs/gs.html
	    property: null // Supports OG in meta tags
	  },
	  DOMAttributeNames: {
	    className: 'class',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv'
	  },
	  DOMPropertyNames: {
	    autoCapitalize: 'autocapitalize',
	    autoComplete: 'autocomplete',
	    autoCorrect: 'autocorrect',
	    autoFocus: 'autofocus',
	    autoPlay: 'autoplay',
	    encType: 'enctype',
	    hrefLang: 'hreflang',
	    radioGroup: 'radiogroup',
	    spellCheck: 'spellcheck',
	    srcDoc: 'srcdoc',
	    srcSet: 'srcset'
	  }
	};
	
	module.exports = HTMLDOMPropertyConfig;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule MobileSafariClickEventPlugin
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	
	var emptyFunction = __webpack_require__(137);
	
	var topLevelTypes = EventConstants.topLevelTypes;
	
	/**
	 * Mobile Safari does not fire properly bubble click events on non-interactive
	 * elements, which means delegated click listeners do not fire. The workaround
	 * for this bug involves attaching an empty click listener on the target node.
	 *
	 * This particular plugin works around the bug by attaching an empty click
	 * listener on `touchstart` (which does fire on every element).
	 */
	var MobileSafariClickEventPlugin = {
	
	  eventTypes: null,
	
	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    if (topLevelType === topLevelTypes.topTouchStart) {
	      var target = nativeEvent.target;
	      if (target && !target.onclick) {
	        target.onclick = emptyFunction;
	      }
	    }
	  }
	
	};
	
	module.exports = MobileSafariClickEventPlugin;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactComponentBrowserEnvironment
	 */
	
	/*jslint evil: true */
	
	"use strict";
	
	var ReactDOMIDOperations = __webpack_require__(171);
	var ReactMarkupChecksum = __webpack_require__(70);
	var ReactMount = __webpack_require__(53);
	var ReactPerf = __webpack_require__(55);
	var ReactReconcileTransaction = __webpack_require__(172);
	
	var getReactRootElementInContainer = __webpack_require__(134);
	var invariant = __webpack_require__(62);
	var setInnerHTML = __webpack_require__(173);
	
	
	var ELEMENT_NODE_TYPE = 1;
	var DOC_NODE_TYPE = 9;
	
	
	/**
	 * Abstracts away all functionality of `ReactComponent` requires knowledge of
	 * the browser context.
	 */
	var ReactComponentBrowserEnvironment = {
	  ReactReconcileTransaction: ReactReconcileTransaction,
	
	  BackendIDOperations: ReactDOMIDOperations,
	
	  /**
	   * If a particular environment requires that some resources be cleaned up,
	   * specify this in the injected Mixin. In the DOM, we would likely want to
	   * purge any cached node ID lookups.
	   *
	   * @private
	   */
	  unmountIDFromEnvironment: function(rootNodeID) {
	    ReactMount.purgeID(rootNodeID);
	  },
	
	  /**
	   * @param {string} markup Markup string to place into the DOM Element.
	   * @param {DOMElement} container DOM Element to insert markup into.
	   * @param {boolean} shouldReuseMarkup Should reuse the existing markup in the
	   * container if possible.
	   */
	  mountImageIntoNode: ReactPerf.measure(
	    'ReactComponentBrowserEnvironment',
	    'mountImageIntoNode',
	    function(markup, container, shouldReuseMarkup) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        container && (
	          container.nodeType === ELEMENT_NODE_TYPE ||
	            container.nodeType === DOC_NODE_TYPE
	        ),
	        'mountComponentIntoNode(...): Target container is not valid.'
	      ) : invariant(container && (
	        container.nodeType === ELEMENT_NODE_TYPE ||
	          container.nodeType === DOC_NODE_TYPE
	      )));
	
	      if (shouldReuseMarkup) {
	        if (ReactMarkupChecksum.canReuseMarkup(
	          markup,
	          getReactRootElementInContainer(container))) {
	          return;
	        } else {
	          ("production" !== process.env.NODE_ENV ? invariant(
	            container.nodeType !== DOC_NODE_TYPE,
	            'You\'re trying to render a component to the document using ' +
	            'server rendering but the checksum was invalid. This usually ' +
	            'means you rendered a different component type or props on ' +
	            'the client from the one on the server, or your render() ' +
	            'methods are impure. React cannot handle this case due to ' +
	            'cross-browser quirks by rendering at the document root. You ' +
	            'should look for environment dependent code in your components ' +
	            'and ensure the props are the same client and server side.'
	          ) : invariant(container.nodeType !== DOC_NODE_TYPE));
	
	          if ("production" !== process.env.NODE_ENV) {
	            console.warn(
	              'React attempted to use reuse markup in a container but the ' +
	              'checksum was invalid. This generally means that you are ' +
	              'using server rendering and the markup generated on the ' +
	              'server was not what the client was expecting. React injected ' +
	              'new markup to compensate which works but you have lost many ' +
	              'of the benefits of server rendering. Instead, figure out ' +
	              'why the markup being generated is different on the client ' +
	              'or server.'
	            );
	          }
	        }
	      }
	
	      ("production" !== process.env.NODE_ENV ? invariant(
	        container.nodeType !== DOC_NODE_TYPE,
	        'You\'re trying to render a component to the document but ' +
	          'you didn\'t use server rendering. We can\'t do this ' +
	          'without using server rendering due to cross-browser quirks. ' +
	          'See renderComponentToString() for server rendering.'
	      ) : invariant(container.nodeType !== DOC_NODE_TYPE));
	
	      setInnerHTML(container, markup);
	    }
	  )
	};
	
	module.exports = ReactComponentBrowserEnvironment;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDefaultBatchingStrategy
	 */
	
	"use strict";
	
	var ReactUpdates = __webpack_require__(91);
	var Transaction = __webpack_require__(147);
	
	var emptyFunction = __webpack_require__(137);
	var mixInto = __webpack_require__(99);
	
	var RESET_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: function() {
	    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
	  }
	};
	
	var FLUSH_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
	};
	
	var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
	
	function ReactDefaultBatchingStrategyTransaction() {
	  this.reinitializeTransaction();
	}
	
	mixInto(ReactDefaultBatchingStrategyTransaction, Transaction.Mixin);
	mixInto(ReactDefaultBatchingStrategyTransaction, {
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  }
	});
	
	var transaction = new ReactDefaultBatchingStrategyTransaction();
	
	var ReactDefaultBatchingStrategy = {
	  isBatchingUpdates: false,
	
	  /**
	   * Call the provided function in a context within which calls to `setState`
	   * and friends are batched such that components aren't updated unnecessarily.
	   */
	  batchedUpdates: function(callback, a, b) {
	    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
	
	    ReactDefaultBatchingStrategy.isBatchingUpdates = true;
	
	    // The code is written this way to avoid extra allocations
	    if (alreadyBatchingUpdates) {
	      callback(a, b);
	    } else {
	      transaction.perform(callback, null, a, b);
	    }
	  }
	};
	
	module.exports = ReactDefaultBatchingStrategy;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMButton
	 */
	
	"use strict";
	
	var AutoFocusMixin = __webpack_require__(174);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactDOM = __webpack_require__(49);
	
	var keyMirror = __webpack_require__(92);
	
	// Store a reference to the <button> `ReactDOMComponent`.
	var button = ReactDOM.button;
	
	var mouseListenerNames = keyMirror({
	  onClick: true,
	  onDoubleClick: true,
	  onMouseDown: true,
	  onMouseMove: true,
	  onMouseUp: true,
	  onClickCapture: true,
	  onDoubleClickCapture: true,
	  onMouseDownCapture: true,
	  onMouseMoveCapture: true,
	  onMouseUpCapture: true
	});
	
	/**
	 * Implements a <button> native component that does not receive mouse events
	 * when `disabled` is set.
	 */
	var ReactDOMButton = ReactCompositeComponent.createClass({
	  displayName: 'ReactDOMButton',
	
	  mixins: [AutoFocusMixin, ReactBrowserComponentMixin],
	
	  render: function() {
	    var props = {};
	
	    // Copy the props; except the mouse listeners if we're disabled
	    for (var key in this.props) {
	      if (this.props.hasOwnProperty(key) &&
	          (!this.props.disabled || !mouseListenerNames[key])) {
	        props[key] = this.props[key];
	      }
	    }
	
	    return button(props, this.props.children);
	  }
	
	});
	
	module.exports = ReactDOMButton;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMForm
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var LocalEventTrapMixin = __webpack_require__(175);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactDOM = __webpack_require__(49);
	
	// Store a reference to the <form> `ReactDOMComponent`.
	var form = ReactDOM.form;
	
	/**
	 * Since onSubmit doesn't bubble OR capture on the top level in IE8, we need
	 * to capture it on the <form> element itself. There are lots of hacks we could
	 * do to accomplish this, but the most reliable is to make <form> a
	 * composite component and use `componentDidMount` to attach the event handlers.
	 */
	var ReactDOMForm = ReactCompositeComponent.createClass({
	  displayName: 'ReactDOMForm',
	
	  mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
	
	  render: function() {
	    // TODO: Instead of using `ReactDOM` directly, we should use JSX. However,
	    // `jshint` fails to parse JSX so in order for linting to work in the open
	    // source repo, we need to just use `ReactDOM.form`.
	    return this.transferPropsTo(form(null, this.props.children));
	  },
	
	  componentDidMount: function() {
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset');
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit');
	  }
	});
	
	module.exports = ReactDOMForm;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMImg
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var LocalEventTrapMixin = __webpack_require__(175);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactDOM = __webpack_require__(49);
	
	// Store a reference to the <img> `ReactDOMComponent`.
	var img = ReactDOM.img;
	
	/**
	 * Since onLoad doesn't bubble OR capture on the top level in IE8, we need to
	 * capture it on the <img> element itself. There are lots of hacks we could do
	 * to accomplish this, but the most reliable is to make <img> a composite
	 * component and use `componentDidMount` to attach the event handlers.
	 */
	var ReactDOMImg = ReactCompositeComponent.createClass({
	  displayName: 'ReactDOMImg',
	  tagName: 'IMG',
	
	  mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
	
	  render: function() {
	    return img(this.props);
	  },
	
	  componentDidMount: function() {
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load');
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error');
	  }
	});
	
	module.exports = ReactDOMImg;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMInput
	 */
	
	"use strict";
	
	var AutoFocusMixin = __webpack_require__(174);
	var DOMPropertyOperations = __webpack_require__(41);
	var LinkedValueUtils = __webpack_require__(176);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactDOM = __webpack_require__(49);
	var ReactMount = __webpack_require__(53);
	
	var invariant = __webpack_require__(62);
	var merge = __webpack_require__(68);
	
	// Store a reference to the <input> `ReactDOMComponent`.
	var input = ReactDOM.input;
	
	var instancesByReactID = {};
	
	/**
	 * Implements an <input> native component that allows setting these optional
	 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
	 *
	 * If `checked` or `value` are not supplied (or null/undefined), user actions
	 * that affect the checked state or value will trigger updates to the element.
	 *
	 * If they are supplied (and not null/undefined), the rendered element will not
	 * trigger updates to the element. Instead, the props must change in order for
	 * the rendered element to be updated.
	 *
	 * The rendered element will be initialized as unchecked (or `defaultChecked`)
	 * with an empty value (or `defaultValue`).
	 *
	 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
	 */
	var ReactDOMInput = ReactCompositeComponent.createClass({
	  displayName: 'ReactDOMInput',
	
	  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
	
	  getInitialState: function() {
	    var defaultValue = this.props.defaultValue;
	    return {
	      checked: this.props.defaultChecked || false,
	      value: defaultValue != null ? defaultValue : null
	    };
	  },
	
	  shouldComponentUpdate: function() {
	    // Defer any updates to this component during the `onChange` handler.
	    return !this._isChanging;
	  },
	
	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = merge(this.props);
	
	    props.defaultChecked = null;
	    props.defaultValue = null;
	
	    var value = LinkedValueUtils.getValue(this);
	    props.value = value != null ? value : this.state.value;
	
	    var checked = LinkedValueUtils.getChecked(this);
	    props.checked = checked != null ? checked : this.state.checked;
	
	    props.onChange = this._handleChange;
	
	    return input(props, this.props.children);
	  },
	
	  componentDidMount: function() {
	    var id = ReactMount.getID(this.getDOMNode());
	    instancesByReactID[id] = this;
	  },
	
	  componentWillUnmount: function() {
	    var rootNode = this.getDOMNode();
	    var id = ReactMount.getID(rootNode);
	    delete instancesByReactID[id];
	  },
	
	  componentDidUpdate: function(prevProps, prevState, prevContext) {
	    var rootNode = this.getDOMNode();
	    if (this.props.checked != null) {
	      DOMPropertyOperations.setValueForProperty(
	        rootNode,
	        'checked',
	        this.props.checked || false
	      );
	    }
	
	    var value = LinkedValueUtils.getValue(this);
	    if (value != null) {
	      // Cast `value` to a string to ensure the value is set correctly. While
	      // browsers typically do this as necessary, jsdom doesn't.
	      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
	    }
	  },
	
	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = LinkedValueUtils.getOnChange(this);
	    if (onChange) {
	      this._isChanging = true;
	      returnValue = onChange.call(this, event);
	      this._isChanging = false;
	    }
	    this.setState({
	      checked: event.target.checked,
	      value: event.target.value
	    });
	
	    var name = this.props.name;
	    if (this.props.type === 'radio' && name != null) {
	      var rootNode = this.getDOMNode();
	      var queryRoot = rootNode;
	
	      while (queryRoot.parentNode) {
	        queryRoot = queryRoot.parentNode;
	      }
	
	      // If `rootNode.form` was non-null, then we could try `form.elements`,
	      // but that sometimes behaves strangely in IE8. We could also try using
	      // `form.getElementsByName`, but that will only return direct children
	      // and won't include inputs that use the HTML5 `form=` attribute. Since
	      // the input might not even be in a form, let's just use the global
	      // `querySelectorAll` to ensure we don't miss anything.
	      var group = queryRoot.querySelectorAll(
	        'input[name=' + JSON.stringify('' + name) + '][type="radio"]');
	
	      for (var i = 0, groupLen = group.length; i < groupLen; i++) {
	        var otherNode = group[i];
	        if (otherNode === rootNode ||
	            otherNode.form !== rootNode.form) {
	          continue;
	        }
	        var otherID = ReactMount.getID(otherNode);
	        ("production" !== process.env.NODE_ENV ? invariant(
	          otherID,
	          'ReactDOMInput: Mixing React and non-React radio inputs with the ' +
	          'same `name` is not supported.'
	        ) : invariant(otherID));
	        var otherInstance = instancesByReactID[otherID];
	        ("production" !== process.env.NODE_ENV ? invariant(
	          otherInstance,
	          'ReactDOMInput: Unknown radio button ID %s.',
	          otherID
	        ) : invariant(otherInstance));
	        // In some cases, this will actually change the `checked` state value.
	        // In other cases, there's no change but this forces a reconcile upon
	        // which componentDidUpdate will reset the DOM property to whatever it
	        // should be.
	        otherInstance.setState({
	          checked: false
	        });
	      }
	    }
	
	    return returnValue;
	  }
	
	});
	
	module.exports = ReactDOMInput;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMOption
	 */
	
	"use strict";
	
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactDOM = __webpack_require__(49);
	
	var warning = __webpack_require__(60);
	
	// Store a reference to the <option> `ReactDOMComponent`.
	var option = ReactDOM.option;
	
	/**
	 * Implements an <option> native component that warns when `selected` is set.
	 */
	var ReactDOMOption = ReactCompositeComponent.createClass({
	  displayName: 'ReactDOMOption',
	
	  mixins: [ReactBrowserComponentMixin],
	
	  componentWillMount: function() {
	    // TODO (yungsters): Remove support for `selected` in <option>.
	    if ("production" !== process.env.NODE_ENV) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        this.props.selected == null,
	        'Use the `defaultValue` or `value` props on <select> instead of ' +
	        'setting `selected` on <option>.'
	      ) : null);
	    }
	  },
	
	  render: function() {
	    return option(this.props, this.props.children);
	  }
	
	});
	
	module.exports = ReactDOMOption;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMSelect
	 */
	
	"use strict";
	
	var AutoFocusMixin = __webpack_require__(174);
	var LinkedValueUtils = __webpack_require__(176);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactDOM = __webpack_require__(49);
	
	var merge = __webpack_require__(68);
	
	// Store a reference to the <select> `ReactDOMComponent`.
	var select = ReactDOM.select;
	
	/**
	 * Validation function for `value` and `defaultValue`.
	 * @private
	 */
	function selectValueType(props, propName, componentName) {
	  if (props[propName] == null) {
	    return;
	  }
	  if (props.multiple) {
	    if (!Array.isArray(props[propName])) {
	      return new Error(
	        ("The `" + propName + "` prop supplied to <select> must be an array if ") +
	        ("`multiple` is true.")
	      );
	    }
	  } else {
	    if (Array.isArray(props[propName])) {
	      return new Error(
	        ("The `" + propName + "` prop supplied to <select> must be a scalar ") +
	        ("value if `multiple` is false.")
	      );
	    }
	  }
	}
	
	/**
	 * If `value` is supplied, updates <option> elements on mount and update.
	 * @param {ReactComponent} component Instance of ReactDOMSelect
	 * @param {?*} propValue For uncontrolled components, null/undefined. For
	 * controlled components, a string (or with `multiple`, a list of strings).
	 * @private
	 */
	function updateOptions(component, propValue) {
	  var multiple = component.props.multiple;
	  var value = propValue != null ? propValue : component.state.value;
	  var options = component.getDOMNode().options;
	  var selectedValue, i, l;
	  if (multiple) {
	    selectedValue = {};
	    for (i = 0, l = value.length; i < l; ++i) {
	      selectedValue['' + value[i]] = true;
	    }
	  } else {
	    selectedValue = '' + value;
	  }
	  for (i = 0, l = options.length; i < l; i++) {
	    var selected = multiple ?
	      selectedValue.hasOwnProperty(options[i].value) :
	      options[i].value === selectedValue;
	
	    if (selected !== options[i].selected) {
	      options[i].selected = selected;
	    }
	  }
	}
	
	/**
	 * Implements a <select> native component that allows optionally setting the
	 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
	 * string. If `multiple` is true, the prop must be an array of strings.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that change the
	 * selected option will trigger updates to the rendered options.
	 *
	 * If it is supplied (and not null/undefined), the rendered options will not
	 * update in response to user actions. Instead, the `value` prop must change in
	 * order for the rendered options to update.
	 *
	 * If `defaultValue` is provided, any options with the supplied values will be
	 * selected.
	 */
	var ReactDOMSelect = ReactCompositeComponent.createClass({
	  displayName: 'ReactDOMSelect',
	
	  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
	
	  propTypes: {
	    defaultValue: selectValueType,
	    value: selectValueType
	  },
	
	  getInitialState: function() {
	    return {value: this.props.defaultValue || (this.props.multiple ? [] : '')};
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    if (!this.props.multiple && nextProps.multiple) {
	      this.setState({value: [this.state.value]});
	    } else if (this.props.multiple && !nextProps.multiple) {
	      this.setState({value: this.state.value[0]});
	    }
	  },
	
	  shouldComponentUpdate: function() {
	    // Defer any updates to this component during the `onChange` handler.
	    return !this._isChanging;
	  },
	
	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = merge(this.props);
	
	    props.onChange = this._handleChange;
	    props.value = null;
	
	    return select(props, this.props.children);
	  },
	
	  componentDidMount: function() {
	    updateOptions(this, LinkedValueUtils.getValue(this));
	  },
	
	  componentDidUpdate: function(prevProps) {
	    var value = LinkedValueUtils.getValue(this);
	    var prevMultiple = !!prevProps.multiple;
	    var multiple = !!this.props.multiple;
	    if (value != null || prevMultiple !== multiple) {
	      updateOptions(this, value);
	    }
	  },
	
	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = LinkedValueUtils.getOnChange(this);
	    if (onChange) {
	      this._isChanging = true;
	      returnValue = onChange.call(this, event);
	      this._isChanging = false;
	    }
	
	    var selectedValue;
	    if (this.props.multiple) {
	      selectedValue = [];
	      var options = event.target.options;
	      for (var i = 0, l = options.length; i < l; i++) {
	        if (options[i].selected) {
	          selectedValue.push(options[i].value);
	        }
	      }
	    } else {
	      selectedValue = event.target.value;
	    }
	
	    this.setState({value: selectedValue});
	    return returnValue;
	  }
	
	});
	
	module.exports = ReactDOMSelect;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMTextarea
	 */
	
	"use strict";
	
	var AutoFocusMixin = __webpack_require__(174);
	var DOMPropertyOperations = __webpack_require__(41);
	var LinkedValueUtils = __webpack_require__(176);
	var ReactBrowserComponentMixin = __webpack_require__(105);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactDOM = __webpack_require__(49);
	
	var invariant = __webpack_require__(62);
	var merge = __webpack_require__(68);
	
	var warning = __webpack_require__(60);
	
	// Store a reference to the <textarea> `ReactDOMComponent`.
	var textarea = ReactDOM.textarea;
	
	/**
	 * Implements a <textarea> native component that allows setting `value`, and
	 * `defaultValue`. This differs from the traditional DOM API because value is
	 * usually set as PCDATA children.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that affect the
	 * value will trigger updates to the element.
	 *
	 * If `value` is supplied (and not null/undefined), the rendered element will
	 * not trigger updates to the element. Instead, the `value` prop must change in
	 * order for the rendered element to be updated.
	 *
	 * The rendered element will be initialized with an empty value, the prop
	 * `defaultValue` if specified, or the children content (deprecated).
	 */
	var ReactDOMTextarea = ReactCompositeComponent.createClass({
	  displayName: 'ReactDOMTextarea',
	
	  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
	
	  getInitialState: function() {
	    var defaultValue = this.props.defaultValue;
	    // TODO (yungsters): Remove support for children content in <textarea>.
	    var children = this.props.children;
	    if (children != null) {
	      if ("production" !== process.env.NODE_ENV) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          false,
	          'Use the `defaultValue` or `value` props instead of setting ' +
	          'children on <textarea>.'
	        ) : null);
	      }
	      ("production" !== process.env.NODE_ENV ? invariant(
	        defaultValue == null,
	        'If you supply `defaultValue` on a <textarea>, do not pass children.'
	      ) : invariant(defaultValue == null));
	      if (Array.isArray(children)) {
	        ("production" !== process.env.NODE_ENV ? invariant(
	          children.length <= 1,
	          '<textarea> can only have at most one child.'
	        ) : invariant(children.length <= 1));
	        children = children[0];
	      }
	
	      defaultValue = '' + children;
	    }
	    if (defaultValue == null) {
	      defaultValue = '';
	    }
	    var value = LinkedValueUtils.getValue(this);
	    return {
	      // We save the initial value so that `ReactDOMComponent` doesn't update
	      // `textContent` (unnecessary since we update value).
	      // The initial value can be a boolean or object so that's why it's
	      // forced to be a string.
	      initialValue: '' + (value != null ? value : defaultValue)
	    };
	  },
	
	  shouldComponentUpdate: function() {
	    // Defer any updates to this component during the `onChange` handler.
	    return !this._isChanging;
	  },
	
	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = merge(this.props);
	
	    ("production" !== process.env.NODE_ENV ? invariant(
	      props.dangerouslySetInnerHTML == null,
	      '`dangerouslySetInnerHTML` does not make sense on <textarea>.'
	    ) : invariant(props.dangerouslySetInnerHTML == null));
	
	    props.defaultValue = null;
	    props.value = null;
	    props.onChange = this._handleChange;
	
	    // Always set children to the same thing. In IE9, the selection range will
	    // get reset if `textContent` is mutated.
	    return textarea(props, this.state.initialValue);
	  },
	
	  componentDidUpdate: function(prevProps, prevState, prevContext) {
	    var value = LinkedValueUtils.getValue(this);
	    if (value != null) {
	      var rootNode = this.getDOMNode();
	      // Cast `value` to a string to ensure the value is set correctly. While
	      // browsers typically do this as necessary, jsdom doesn't.
	      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
	    }
	  },
	
	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = LinkedValueUtils.getOnChange(this);
	    if (onChange) {
	      this._isChanging = true;
	      returnValue = onChange.call(this, event);
	      this._isChanging = false;
	    }
	    this.setState({value: event.target.value});
	    return returnValue;
	  }
	
	});
	
	module.exports = ReactDOMTextarea;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactEventListener
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var EventListener = __webpack_require__(177);
	var ExecutionEnvironment = __webpack_require__(61);
	var PooledClass = __webpack_require__(88);
	var ReactInstanceHandles = __webpack_require__(52);
	var ReactMount = __webpack_require__(53);
	var ReactUpdates = __webpack_require__(91);
	
	var getEventTarget = __webpack_require__(178);
	var getUnboundedScrollPosition = __webpack_require__(179);
	var mixInto = __webpack_require__(99);
	
	/**
	 * Finds the parent React component of `node`.
	 *
	 * @param {*} node
	 * @return {?DOMEventTarget} Parent container, or `null` if the specified node
	 *                           is not nested.
	 */
	function findParent(node) {
	  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
	  // traversal, but caching is difficult to do correctly without using a
	  // mutation observer to listen for all DOM changes.
	  var nodeID = ReactMount.getID(node);
	  var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
	  var container = ReactMount.findReactContainerForID(rootID);
	  var parent = ReactMount.getFirstReactDOM(container);
	  return parent;
	}
	
	// Used to store ancestor hierarchy in top level callback
	function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
	  this.topLevelType = topLevelType;
	  this.nativeEvent = nativeEvent;
	  this.ancestors = [];
	}
	mixInto(TopLevelCallbackBookKeeping, {
	  destructor: function() {
	    this.topLevelType = null;
	    this.nativeEvent = null;
	    this.ancestors.length = 0;
	  }
	});
	PooledClass.addPoolingTo(
	  TopLevelCallbackBookKeeping,
	  PooledClass.twoArgumentPooler
	);
	
	function handleTopLevelImpl(bookKeeping) {
	  var topLevelTarget = ReactMount.getFirstReactDOM(
	    getEventTarget(bookKeeping.nativeEvent)
	  ) || window;
	
	  // Loop through the hierarchy, in case there's any nested components.
	  // It's important that we build the array of ancestors before calling any
	  // event handlers, because event handlers can modify the DOM, leading to
	  // inconsistencies with ReactMount's node cache. See #1105.
	  var ancestor = topLevelTarget;
	  while (ancestor) {
	    bookKeeping.ancestors.push(ancestor);
	    ancestor = findParent(ancestor);
	  }
	
	  for (var i = 0, l = bookKeeping.ancestors.length; i < l; i++) {
	    topLevelTarget = bookKeeping.ancestors[i];
	    var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
	    ReactEventListener._handleTopLevel(
	      bookKeeping.topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      bookKeeping.nativeEvent
	    );
	  }
	}
	
	function scrollValueMonitor(cb) {
	  var scrollPosition = getUnboundedScrollPosition(window);
	  cb(scrollPosition);
	}
	
	var ReactEventListener = {
	  _enabled: true,
	  _handleTopLevel: null,
	
	  WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,
	
	  setHandleTopLevel: function(handleTopLevel) {
	    ReactEventListener._handleTopLevel = handleTopLevel;
	  },
	
	  setEnabled: function(enabled) {
	    ReactEventListener._enabled = !!enabled;
	  },
	
	  isEnabled: function() {
	    return ReactEventListener._enabled;
	  },
	
	
	  /**
	   * Traps top-level events by using event bubbling.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {string} handlerBaseName Event name (e.g. "click").
	   * @param {object} handle Element on which to attach listener.
	   * @return {object} An object with a remove function which will forcefully
	   *                  remove the listener.
	   * @internal
	   */
	  trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
	    var element = handle;
	    if (!element) {
	      return;
	    }
	    return EventListener.listen(
	      element,
	      handlerBaseName,
	      ReactEventListener.dispatchEvent.bind(null, topLevelType)
	    );
	  },
	
	  /**
	   * Traps a top-level event by using event capturing.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {string} handlerBaseName Event name (e.g. "click").
	   * @param {object} handle Element on which to attach listener.
	   * @return {object} An object with a remove function which will forcefully
	   *                  remove the listener.
	   * @internal
	   */
	  trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
	    var element = handle;
	    if (!element) {
	      return;
	    }
	    return EventListener.capture(
	      element,
	      handlerBaseName,
	      ReactEventListener.dispatchEvent.bind(null, topLevelType)
	    );
	  },
	
	  monitorScrollValue: function(refresh) {
	    var callback = scrollValueMonitor.bind(null, refresh);
	    EventListener.listen(window, 'scroll', callback);
	    EventListener.listen(window, 'resize', callback);
	  },
	
	  dispatchEvent: function(topLevelType, nativeEvent) {
	    if (!ReactEventListener._enabled) {
	      return;
	    }
	
	    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(
	      topLevelType,
	      nativeEvent
	    );
	    try {
	      // Event queue being processed in the same cycle allows
	      // `preventDefault`.
	      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
	    } finally {
	      TopLevelCallbackBookKeeping.release(bookKeeping);
	    }
	  }
	};
	
	module.exports = ReactEventListener;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactInjection
	 */
	
	"use strict";
	
	var DOMProperty = __webpack_require__(84);
	var EventPluginHub = __webpack_require__(158);
	var ReactComponent = __webpack_require__(44);
	var ReactCompositeComponent = __webpack_require__(45);
	var ReactDOM = __webpack_require__(49);
	var ReactEmptyComponent = __webpack_require__(94);
	var ReactBrowserEventEmitter = __webpack_require__(106);
	var ReactPerf = __webpack_require__(55);
	var ReactRootIndex = __webpack_require__(132);
	var ReactUpdates = __webpack_require__(91);
	
	var ReactInjection = {
	  Component: ReactComponent.injection,
	  CompositeComponent: ReactCompositeComponent.injection,
	  DOMProperty: DOMProperty.injection,
	  EmptyComponent: ReactEmptyComponent.injection,
	  EventPluginHub: EventPluginHub.injection,
	  DOM: ReactDOM.injection,
	  EventEmitter: ReactBrowserEventEmitter.injection,
	  Perf: ReactPerf.injection,
	  RootIndex: ReactRootIndex.injection,
	  Updates: ReactUpdates.injection
	};
	
	module.exports = ReactInjection;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SelectEventPlugin
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var EventPropagators = __webpack_require__(163);
	var ReactInputSelection = __webpack_require__(167);
	var SyntheticEvent = __webpack_require__(165);
	
	var getActiveElement = __webpack_require__(180);
	var isTextInputElement = __webpack_require__(166);
	var keyOf = __webpack_require__(64);
	var shallowEqual = __webpack_require__(181);
	
	var topLevelTypes = EventConstants.topLevelTypes;
	
	var eventTypes = {
	  select: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onSelect: null}),
	      captured: keyOf({onSelectCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topContextMenu,
	      topLevelTypes.topFocus,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topMouseDown,
	      topLevelTypes.topMouseUp,
	      topLevelTypes.topSelectionChange
	    ]
	  }
	};
	
	var activeElement = null;
	var activeElementID = null;
	var lastSelection = null;
	var mouseDown = false;
	
	/**
	 * Get an object which is a unique representation of the current selection.
	 *
	 * The return value will not be consistent across nodes or browsers, but
	 * two identical selections on the same node will return identical objects.
	 *
	 * @param {DOMElement} node
	 * @param {object}
	 */
	function getSelection(node) {
	  if ('selectionStart' in node &&
	      ReactInputSelection.hasSelectionCapabilities(node)) {
	    return {
	      start: node.selectionStart,
	      end: node.selectionEnd
	    };
	  } else if (document.selection) {
	    var range = document.selection.createRange();
	    return {
	      parentElement: range.parentElement(),
	      text: range.text,
	      top: range.boundingTop,
	      left: range.boundingLeft
	    };
	  } else {
	    var selection = window.getSelection();
	    return {
	      anchorNode: selection.anchorNode,
	      anchorOffset: selection.anchorOffset,
	      focusNode: selection.focusNode,
	      focusOffset: selection.focusOffset
	    };
	  }
	}
	
	/**
	 * Poll selection to see whether it's changed.
	 *
	 * @param {object} nativeEvent
	 * @return {?SyntheticEvent}
	 */
	function constructSelectEvent(nativeEvent) {
	  // Ensure we have the right element, and that the user is not dragging a
	  // selection (this matches native `select` event behavior). In HTML5, select
	  // fires only on input and textarea thus if there's no focused element we
	  // won't dispatch.
	  if (mouseDown ||
	      activeElement == null ||
	      activeElement != getActiveElement()) {
	    return;
	  }
	
	  // Only fire when selection has actually changed.
	  var currentSelection = getSelection(activeElement);
	  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
	    lastSelection = currentSelection;
	
	    var syntheticEvent = SyntheticEvent.getPooled(
	      eventTypes.select,
	      activeElementID,
	      nativeEvent
	    );
	
	    syntheticEvent.type = 'select';
	    syntheticEvent.target = activeElement;
	
	    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);
	
	    return syntheticEvent;
	  }
	}
	
	/**
	 * This plugin creates an `onSelect` event that normalizes select events
	 * across form elements.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - contentEditable
	 *
	 * This differs from native browser implementations in the following ways:
	 * - Fires on contentEditable fields as well as inputs.
	 * - Fires for collapsed selection.
	 * - Fires after user input.
	 */
	var SelectEventPlugin = {
	
	  eventTypes: eventTypes,
	
	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	
	    switch (topLevelType) {
	      // Track the input node that has focus.
	      case topLevelTypes.topFocus:
	        if (isTextInputElement(topLevelTarget) ||
	            topLevelTarget.contentEditable === 'true') {
	          activeElement = topLevelTarget;
	          activeElementID = topLevelTargetID;
	          lastSelection = null;
	        }
	        break;
	      case topLevelTypes.topBlur:
	        activeElement = null;
	        activeElementID = null;
	        lastSelection = null;
	        break;
	
	      // Don't fire the event while the user is dragging. This matches the
	      // semantics of the native select event.
	      case topLevelTypes.topMouseDown:
	        mouseDown = true;
	        break;
	      case topLevelTypes.topContextMenu:
	      case topLevelTypes.topMouseUp:
	        mouseDown = false;
	        return constructSelectEvent(nativeEvent);
	
	      // Chrome and IE fire non-standard event when selection is changed (and
	      // sometimes when it hasn't).
	      // Firefox doesn't support selectionchange, so check selection status
	      // after each key entry. The selection changes after keydown and before
	      // keyup, but we check on keydown as well in the case of holding down a
	      // key, when multiple keydown events are fired but only one keyup is.
	      case topLevelTypes.topSelectionChange:
	      case topLevelTypes.topKeyDown:
	      case topLevelTypes.topKeyUp:
	        return constructSelectEvent(nativeEvent);
	    }
	  }
	};
	
	module.exports = SelectEventPlugin;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ServerReactRootIndex
	 * @typechecks
	 */
	
	"use strict";
	
	/**
	 * Size of the reactRoot ID space. We generate random numbers for React root
	 * IDs and if there's a collision the events and DOM update system will
	 * get confused. In the future we need a way to generate GUIDs but for
	 * now this will work on a smaller scale.
	 */
	var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);
	
	var ServerReactRootIndex = {
	  createReactRootIndex: function() {
	    return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
	  }
	};
	
	module.exports = ServerReactRootIndex;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SimpleEventPlugin
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var EventPluginUtils = __webpack_require__(42);
	var EventPropagators = __webpack_require__(163);
	var SyntheticClipboardEvent = __webpack_require__(182);
	var SyntheticEvent = __webpack_require__(165);
	var SyntheticFocusEvent = __webpack_require__(183);
	var SyntheticKeyboardEvent = __webpack_require__(184);
	var SyntheticMouseEvent = __webpack_require__(170);
	var SyntheticDragEvent = __webpack_require__(185);
	var SyntheticTouchEvent = __webpack_require__(186);
	var SyntheticUIEvent = __webpack_require__(187);
	var SyntheticWheelEvent = __webpack_require__(188);
	
	var invariant = __webpack_require__(62);
	var keyOf = __webpack_require__(64);
	
	var topLevelTypes = EventConstants.topLevelTypes;
	
	var eventTypes = {
	  blur: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onBlur: true}),
	      captured: keyOf({onBlurCapture: true})
	    }
	  },
	  click: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onClick: true}),
	      captured: keyOf({onClickCapture: true})
	    }
	  },
	  contextMenu: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onContextMenu: true}),
	      captured: keyOf({onContextMenuCapture: true})
	    }
	  },
	  copy: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCopy: true}),
	      captured: keyOf({onCopyCapture: true})
	    }
	  },
	  cut: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCut: true}),
	      captured: keyOf({onCutCapture: true})
	    }
	  },
	  doubleClick: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDoubleClick: true}),
	      captured: keyOf({onDoubleClickCapture: true})
	    }
	  },
	  drag: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDrag: true}),
	      captured: keyOf({onDragCapture: true})
	    }
	  },
	  dragEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragEnd: true}),
	      captured: keyOf({onDragEndCapture: true})
	    }
	  },
	  dragEnter: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragEnter: true}),
	      captured: keyOf({onDragEnterCapture: true})
	    }
	  },
	  dragExit: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragExit: true}),
	      captured: keyOf({onDragExitCapture: true})
	    }
	  },
	  dragLeave: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragLeave: true}),
	      captured: keyOf({onDragLeaveCapture: true})
	    }
	  },
	  dragOver: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragOver: true}),
	      captured: keyOf({onDragOverCapture: true})
	    }
	  },
	  dragStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragStart: true}),
	      captured: keyOf({onDragStartCapture: true})
	    }
	  },
	  drop: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDrop: true}),
	      captured: keyOf({onDropCapture: true})
	    }
	  },
	  focus: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onFocus: true}),
	      captured: keyOf({onFocusCapture: true})
	    }
	  },
	  input: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onInput: true}),
	      captured: keyOf({onInputCapture: true})
	    }
	  },
	  keyDown: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyDown: true}),
	      captured: keyOf({onKeyDownCapture: true})
	    }
	  },
	  keyPress: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyPress: true}),
	      captured: keyOf({onKeyPressCapture: true})
	    }
	  },
	  keyUp: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyUp: true}),
	      captured: keyOf({onKeyUpCapture: true})
	    }
	  },
	  load: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onLoad: true}),
	      captured: keyOf({onLoadCapture: true})
	    }
	  },
	  error: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onError: true}),
	      captured: keyOf({onErrorCapture: true})
	    }
	  },
	  // Note: We do not allow listening to mouseOver events. Instead, use the
	  // onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
	  mouseDown: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseDown: true}),
	      captured: keyOf({onMouseDownCapture: true})
	    }
	  },
	  mouseMove: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseMove: true}),
	      captured: keyOf({onMouseMoveCapture: true})
	    }
	  },
	  mouseOut: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseOut: true}),
	      captured: keyOf({onMouseOutCapture: true})
	    }
	  },
	  mouseOver: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseOver: true}),
	      captured: keyOf({onMouseOverCapture: true})
	    }
	  },
	  mouseUp: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseUp: true}),
	      captured: keyOf({onMouseUpCapture: true})
	    }
	  },
	  paste: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onPaste: true}),
	      captured: keyOf({onPasteCapture: true})
	    }
	  },
	  reset: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onReset: true}),
	      captured: keyOf({onResetCapture: true})
	    }
	  },
	  scroll: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onScroll: true}),
	      captured: keyOf({onScrollCapture: true})
	    }
	  },
	  submit: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onSubmit: true}),
	      captured: keyOf({onSubmitCapture: true})
	    }
	  },
	  touchCancel: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchCancel: true}),
	      captured: keyOf({onTouchCancelCapture: true})
	    }
	  },
	  touchEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchEnd: true}),
	      captured: keyOf({onTouchEndCapture: true})
	    }
	  },
	  touchMove: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchMove: true}),
	      captured: keyOf({onTouchMoveCapture: true})
	    }
	  },
	  touchStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchStart: true}),
	      captured: keyOf({onTouchStartCapture: true})
	    }
	  },
	  wheel: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onWheel: true}),
	      captured: keyOf({onWheelCapture: true})
	    }
	  }
	};
	
	var topLevelEventsToDispatchConfig = {
	  topBlur:        eventTypes.blur,
	  topClick:       eventTypes.click,
	  topContextMenu: eventTypes.contextMenu,
	  topCopy:        eventTypes.copy,
	  topCut:         eventTypes.cut,
	  topDoubleClick: eventTypes.doubleClick,
	  topDrag:        eventTypes.drag,
	  topDragEnd:     eventTypes.dragEnd,
	  topDragEnter:   eventTypes.dragEnter,
	  topDragExit:    eventTypes.dragExit,
	  topDragLeave:   eventTypes.dragLeave,
	  topDragOver:    eventTypes.dragOver,
	  topDragStart:   eventTypes.dragStart,
	  topDrop:        eventTypes.drop,
	  topError:       eventTypes.error,
	  topFocus:       eventTypes.focus,
	  topInput:       eventTypes.input,
	  topKeyDown:     eventTypes.keyDown,
	  topKeyPress:    eventTypes.keyPress,
	  topKeyUp:       eventTypes.keyUp,
	  topLoad:        eventTypes.load,
	  topMouseDown:   eventTypes.mouseDown,
	  topMouseMove:   eventTypes.mouseMove,
	  topMouseOut:    eventTypes.mouseOut,
	  topMouseOver:   eventTypes.mouseOver,
	  topMouseUp:     eventTypes.mouseUp,
	  topPaste:       eventTypes.paste,
	  topReset:       eventTypes.reset,
	  topScroll:      eventTypes.scroll,
	  topSubmit:      eventTypes.submit,
	  topTouchCancel: eventTypes.touchCancel,
	  topTouchEnd:    eventTypes.touchEnd,
	  topTouchMove:   eventTypes.touchMove,
	  topTouchStart:  eventTypes.touchStart,
	  topWheel:       eventTypes.wheel
	};
	
	for (var topLevelType in topLevelEventsToDispatchConfig) {
	  topLevelEventsToDispatchConfig[topLevelType].dependencies = [topLevelType];
	}
	
	var SimpleEventPlugin = {
	
	  eventTypes: eventTypes,
	
	  /**
	   * Same as the default implementation, except cancels the event when return
	   * value is false.
	   *
	   * @param {object} Event to be dispatched.
	   * @param {function} Application-level callback.
	   * @param {string} domID DOM ID to pass to the callback.
	   */
	  executeDispatch: function(event, listener, domID) {
	    var returnValue = EventPluginUtils.executeDispatch(event, listener, domID);
	    if (returnValue === false) {
	      event.stopPropagation();
	      event.preventDefault();
	    }
	  },
	
	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
	    if (!dispatchConfig) {
	      return null;
	    }
	    var EventConstructor;
	    switch (topLevelType) {
	      case topLevelTypes.topInput:
	      case topLevelTypes.topLoad:
	      case topLevelTypes.topError:
	      case topLevelTypes.topReset:
	      case topLevelTypes.topSubmit:
	        // HTML Events
	        // @see http://www.w3.org/TR/html5/index.html#events-0
	        EventConstructor = SyntheticEvent;
	        break;
	      case topLevelTypes.topKeyPress:
	        // FireFox creates a keypress event for function keys too. This removes
	        // the unwanted keypress events.
	        if (nativeEvent.charCode === 0) {
	          return null;
	        }
	        /* falls through */
	      case topLevelTypes.topKeyDown:
	      case topLevelTypes.topKeyUp:
	        EventConstructor = SyntheticKeyboardEvent;
	        break;
	      case topLevelTypes.topBlur:
	      case topLevelTypes.topFocus:
	        EventConstructor = SyntheticFocusEvent;
	        break;
	      case topLevelTypes.topClick:
	        // Firefox creates a click event on right mouse clicks. This removes the
	        // unwanted click events.
	        if (nativeEvent.button === 2) {
	          return null;
	        }
	        /* falls through */
	      case topLevelTypes.topContextMenu:
	      case topLevelTypes.topDoubleClick:
	      case topLevelTypes.topMouseDown:
	      case topLevelTypes.topMouseMove:
	      case topLevelTypes.topMouseOut:
	      case topLevelTypes.topMouseOver:
	      case topLevelTypes.topMouseUp:
	        EventConstructor = SyntheticMouseEvent;
	        break;
	      case topLevelTypes.topDrag:
	      case topLevelTypes.topDragEnd:
	      case topLevelTypes.topDragEnter:
	      case topLevelTypes.topDragExit:
	      case topLevelTypes.topDragLeave:
	      case topLevelTypes.topDragOver:
	      case topLevelTypes.topDragStart:
	      case topLevelTypes.topDrop:
	        EventConstructor = SyntheticDragEvent;
	        break;
	      case topLevelTypes.topTouchCancel:
	      case topLevelTypes.topTouchEnd:
	      case topLevelTypes.topTouchMove:
	      case topLevelTypes.topTouchStart:
	        EventConstructor = SyntheticTouchEvent;
	        break;
	      case topLevelTypes.topScroll:
	        EventConstructor = SyntheticUIEvent;
	        break;
	      case topLevelTypes.topWheel:
	        EventConstructor = SyntheticWheelEvent;
	        break;
	      case topLevelTypes.topCopy:
	      case topLevelTypes.topCut:
	      case topLevelTypes.topPaste:
	        EventConstructor = SyntheticClipboardEvent;
	        break;
	    }
	    ("production" !== process.env.NODE_ENV ? invariant(
	      EventConstructor,
	      'SimpleEventPlugin: Unhandled event type, `%s`.',
	      topLevelType
	    ) : invariant(EventConstructor));
	    var event = EventConstructor.getPooled(
	      dispatchConfig,
	      topLevelTargetID,
	      nativeEvent
	    );
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	    return event;
	  }
	
	};
	
	module.exports = SimpleEventPlugin;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SVGDOMPropertyConfig
	 */
	
	/*jslint bitwise: true*/
	
	"use strict";
	
	var DOMProperty = __webpack_require__(84);
	
	var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
	
	var SVGDOMPropertyConfig = {
	  Properties: {
	    cx: MUST_USE_ATTRIBUTE,
	    cy: MUST_USE_ATTRIBUTE,
	    d: MUST_USE_ATTRIBUTE,
	    dx: MUST_USE_ATTRIBUTE,
	    dy: MUST_USE_ATTRIBUTE,
	    fill: MUST_USE_ATTRIBUTE,
	    fillOpacity: MUST_USE_ATTRIBUTE,
	    fontFamily: MUST_USE_ATTRIBUTE,
	    fontSize: MUST_USE_ATTRIBUTE,
	    fx: MUST_USE_ATTRIBUTE,
	    fy: MUST_USE_ATTRIBUTE,
	    gradientTransform: MUST_USE_ATTRIBUTE,
	    gradientUnits: MUST_USE_ATTRIBUTE,
	    markerEnd: MUST_USE_ATTRIBUTE,
	    markerMid: MUST_USE_ATTRIBUTE,
	    markerStart: MUST_USE_ATTRIBUTE,
	    offset: MUST_USE_ATTRIBUTE,
	    opacity: MUST_USE_ATTRIBUTE,
	    patternContentUnits: MUST_USE_ATTRIBUTE,
	    patternUnits: MUST_USE_ATTRIBUTE,
	    points: MUST_USE_ATTRIBUTE,
	    preserveAspectRatio: MUST_USE_ATTRIBUTE,
	    r: MUST_USE_ATTRIBUTE,
	    rx: MUST_USE_ATTRIBUTE,
	    ry: MUST_USE_ATTRIBUTE,
	    spreadMethod: MUST_USE_ATTRIBUTE,
	    stopColor: MUST_USE_ATTRIBUTE,
	    stopOpacity: MUST_USE_ATTRIBUTE,
	    stroke: MUST_USE_ATTRIBUTE,
	    strokeDasharray: MUST_USE_ATTRIBUTE,
	    strokeLinecap: MUST_USE_ATTRIBUTE,
	    strokeOpacity: MUST_USE_ATTRIBUTE,
	    strokeWidth: MUST_USE_ATTRIBUTE,
	    textAnchor: MUST_USE_ATTRIBUTE,
	    transform: MUST_USE_ATTRIBUTE,
	    version: MUST_USE_ATTRIBUTE,
	    viewBox: MUST_USE_ATTRIBUTE,
	    x1: MUST_USE_ATTRIBUTE,
	    x2: MUST_USE_ATTRIBUTE,
	    x: MUST_USE_ATTRIBUTE,
	    y1: MUST_USE_ATTRIBUTE,
	    y2: MUST_USE_ATTRIBUTE,
	    y: MUST_USE_ATTRIBUTE
	  },
	  DOMAttributeNames: {
	    fillOpacity: 'fill-opacity',
	    fontFamily: 'font-family',
	    fontSize: 'font-size',
	    gradientTransform: 'gradientTransform',
	    gradientUnits: 'gradientUnits',
	    markerEnd: 'marker-end',
	    markerMid: 'marker-mid',
	    markerStart: 'marker-start',
	    patternContentUnits: 'patternContentUnits',
	    patternUnits: 'patternUnits',
	    preserveAspectRatio: 'preserveAspectRatio',
	    spreadMethod: 'spreadMethod',
	    stopColor: 'stop-color',
	    stopOpacity: 'stop-opacity',
	    strokeDasharray: 'stroke-dasharray',
	    strokeLinecap: 'stroke-linecap',
	    strokeOpacity: 'stroke-opacity',
	    strokeWidth: 'stroke-width',
	    textAnchor: 'text-anchor',
	    viewBox: 'viewBox'
	  }
	};
	
	module.exports = SVGDOMPropertyConfig;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule createFullPageComponent
	 * @typechecks
	 */
	
	"use strict";
	
	// Defeat circular references by requiring this directly.
	var ReactCompositeComponent = __webpack_require__(45);
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Create a component that will throw an exception when unmounted.
	 *
	 * Components like <html> <head> and <body> can't be removed or added
	 * easily in a cross-browser way, however it's valuable to be able to
	 * take advantage of React's reconciliation for styling and <title>
	 * management. So we just document it and throw in dangerous cases.
	 *
	 * @param {function} componentClass convenience constructor to wrap
	 * @return {function} convenience constructor of new component
	 */
	function createFullPageComponent(componentClass) {
	  var FullPageComponent = ReactCompositeComponent.createClass({
	    displayName: 'ReactFullPageComponent' + (
	      componentClass.type.displayName || ''
	    ),
	
	    componentWillUnmount: function() {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        false,
	        '%s tried to unmount. Because of cross-browser quirks it is ' +
	        'impossible to unmount some top-level components (eg <html>, <head>, ' +
	        'and <body>) reliably and efficiently. To fix this, have a single ' +
	        'top-level component that never unmounts render these elements.',
	        this.constructor.displayName
	      ) : invariant(false));
	    },
	
	    render: function() {
	      return this.transferPropsTo(componentClass(null, this.props.children));
	    }
	  });
	
	  return FullPageComponent;
	}
	
	module.exports = createFullPageComponent;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDefaultPerf
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var DOMProperty = __webpack_require__(84);
	var ReactDefaultPerfAnalysis = __webpack_require__(189);
	var ReactMount = __webpack_require__(53);
	var ReactPerf = __webpack_require__(55);
	
	var performanceNow = __webpack_require__(190);
	
	function roundFloat(val) {
	  return Math.floor(val * 100) / 100;
	}
	
	function addValue(obj, key, val) {
	  obj[key] = (obj[key] || 0) + val;
	}
	
	var ReactDefaultPerf = {
	  _allMeasurements: [], // last item in the list is the current one
	  _mountStack: [0],
	  _injected: false,
	
	  start: function() {
	    if (!ReactDefaultPerf._injected) {
	      ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
	    }
	
	    ReactDefaultPerf._allMeasurements.length = 0;
	    ReactPerf.enableMeasure = true;
	  },
	
	  stop: function() {
	    ReactPerf.enableMeasure = false;
	  },
	
	  getLastMeasurements: function() {
	    return ReactDefaultPerf._allMeasurements;
	  },
	
	  printExclusive: function(measurements) {
	    measurements = measurements || ReactDefaultPerf._allMeasurements;
	    var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
	    console.table(summary.map(function(item) {
	      return {
	        'Component class name': item.componentName,
	        'Total inclusive time (ms)': roundFloat(item.inclusive),
	        'Exclusive mount time (ms)': roundFloat(item.exclusive),
	        'Exclusive render time (ms)': roundFloat(item.render),
	        'Mount time per instance (ms)': roundFloat(item.exclusive / item.count),
	        'Render time per instance (ms)': roundFloat(item.render / item.count),
	        'Instances': item.count
	      };
	    }));
	    // TODO: ReactDefaultPerfAnalysis.getTotalTime() does not return the correct
	    // number.
	  },
	
	  printInclusive: function(measurements) {
	    measurements = measurements || ReactDefaultPerf._allMeasurements;
	    var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
	    console.table(summary.map(function(item) {
	      return {
	        'Owner > component': item.componentName,
	        'Inclusive time (ms)': roundFloat(item.time),
	        'Instances': item.count
	      };
	    }));
	    console.log(
	      'Total time:',
	      ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
	    );
	  },
	
	  printWasted: function(measurements) {
	    measurements = measurements || ReactDefaultPerf._allMeasurements;
	    var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(
	      measurements,
	      true
	    );
	    console.table(summary.map(function(item) {
	      return {
	        'Owner > component': item.componentName,
	        'Wasted time (ms)': item.time,
	        'Instances': item.count
	      };
	    }));
	    console.log(
	      'Total time:',
	      ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
	    );
	  },
	
	  printDOM: function(measurements) {
	    measurements = measurements || ReactDefaultPerf._allMeasurements;
	    var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
	    console.table(summary.map(function(item) {
	      var result = {};
	      result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
	      result['type'] = item.type;
	      result['args'] = JSON.stringify(item.args);
	      return result;
	    }));
	    console.log(
	      'Total time:',
	      ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
	    );
	  },
	
	  _recordWrite: function(id, fnName, totalTime, args) {
	    // TODO: totalTime isn't that useful since it doesn't count paints/reflows
	    var writes =
	      ReactDefaultPerf
	        ._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1]
	        .writes;
	    writes[id] = writes[id] || [];
	    writes[id].push({
	      type: fnName,
	      time: totalTime,
	      args: args
	    });
	  },
	
	  measure: function(moduleName, fnName, func) {
	    return function() {var args=Array.prototype.slice.call(arguments,0);
	      var totalTime;
	      var rv;
	      var start;
	
	      if (fnName === '_renderNewRootComponent' ||
	          fnName === 'flushBatchedUpdates') {
	        // A "measurement" is a set of metrics recorded for each flush. We want
	        // to group the metrics for a given flush together so we can look at the
	        // components that rendered and the DOM operations that actually
	        // happened to determine the amount of "wasted work" performed.
	        ReactDefaultPerf._allMeasurements.push({
	          exclusive: {},
	          inclusive: {},
	          render: {},
	          counts: {},
	          writes: {},
	          displayNames: {},
	          totalTime: 0
	        });
	        start = performanceNow();
	        rv = func.apply(this, args);
	        ReactDefaultPerf._allMeasurements[
	          ReactDefaultPerf._allMeasurements.length - 1
	        ].totalTime = performanceNow() - start;
	        return rv;
	      } else if (moduleName === 'ReactDOMIDOperations' ||
	        moduleName === 'ReactComponentBrowserEnvironment') {
	        start = performanceNow();
	        rv = func.apply(this, args);
	        totalTime = performanceNow() - start;
	
	        if (fnName === 'mountImageIntoNode') {
	          var mountID = ReactMount.getID(args[1]);
	          ReactDefaultPerf._recordWrite(mountID, fnName, totalTime, args[0]);
	        } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
	          // special format
	          args[0].forEach(function(update) {
	            var writeArgs = {};
	            if (update.fromIndex !== null) {
	              writeArgs.fromIndex = update.fromIndex;
	            }
	            if (update.toIndex !== null) {
	              writeArgs.toIndex = update.toIndex;
	            }
	            if (update.textContent !== null) {
	              writeArgs.textContent = update.textContent;
	            }
	            if (update.markupIndex !== null) {
	              writeArgs.markup = args[1][update.markupIndex];
	            }
	            ReactDefaultPerf._recordWrite(
	              update.parentID,
	              update.type,
	              totalTime,
	              writeArgs
	            );
	          });
	        } else {
	          // basic format
	          ReactDefaultPerf._recordWrite(
	            args[0],
	            fnName,
	            totalTime,
	            Array.prototype.slice.call(args, 1)
	          );
	        }
	        return rv;
	      } else if (moduleName === 'ReactCompositeComponent' && (
	        fnName === 'mountComponent' ||
	        fnName === 'updateComponent' || // TODO: receiveComponent()?
	        fnName === '_renderValidatedComponent')) {
	
	        var rootNodeID = fnName === 'mountComponent' ?
	          args[0] :
	          this._rootNodeID;
	        var isRender = fnName === '_renderValidatedComponent';
	        var isMount = fnName === 'mountComponent';
	
	        var mountStack = ReactDefaultPerf._mountStack;
	        var entry = ReactDefaultPerf._allMeasurements[
	          ReactDefaultPerf._allMeasurements.length - 1
	        ];
	
	        if (isRender) {
	          addValue(entry.counts, rootNodeID, 1);
	        } else if (isMount) {
	          mountStack.push(0);
	        }
	
	        start = performanceNow();
	        rv = func.apply(this, args);
	        totalTime = performanceNow() - start;
	
	        if (isRender) {
	          addValue(entry.render, rootNodeID, totalTime);
	        } else if (isMount) {
	          var subMountTime = mountStack.pop();
	          mountStack[mountStack.length - 1] += totalTime;
	          addValue(entry.exclusive, rootNodeID, totalTime - subMountTime);
	          addValue(entry.inclusive, rootNodeID, totalTime);
	        } else {
	          addValue(entry.inclusive, rootNodeID, totalTime);
	        }
	
	        entry.displayNames[rootNodeID] = {
	          current: this.constructor.displayName,
	          owner: this._owner ? this._owner.constructor.displayName : '<root>'
	        };
	
	        return rv;
	      } else {
	        return func.apply(this, args);
	      }
	    };
	  }
	};
	
	module.exports = ReactDefaultPerf;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactRootIndex
	 * @typechecks
	 */
	
	"use strict";
	
	var ReactRootIndexInjection = {
	  /**
	   * @param {function} _createReactRootIndex
	   */
	  injectCreateReactRootIndex: function(_createReactRootIndex) {
	    ReactRootIndex.createReactRootIndex = _createReactRootIndex;
	  }
	};
	
	var ReactRootIndex = {
	  createReactRootIndex: null,
	  injection: ReactRootIndexInjection
	};
	
	module.exports = ReactRootIndex;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule containsNode
	 * @typechecks
	 */
	
	var isTextNode = __webpack_require__(191);
	
	/*jslint bitwise:true */
	
	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 *
	 * @param {?DOMNode} outerNode Outer DOM node.
	 * @param {?DOMNode} innerNode Inner DOM node.
	 * @return {boolean} True if `outerNode` contains or is `innerNode`.
	 */
	function containsNode(outerNode, innerNode) {
	  if (!outerNode || !innerNode) {
	    return false;
	  } else if (outerNode === innerNode) {
	    return true;
	  } else if (isTextNode(outerNode)) {
	    return false;
	  } else if (isTextNode(innerNode)) {
	    return containsNode(outerNode, innerNode.parentNode);
	  } else if (outerNode.contains) {
	    return outerNode.contains(innerNode);
	  } else if (outerNode.compareDocumentPosition) {
	    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	  } else {
	    return false;
	  }
	}
	
	module.exports = containsNode;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getReactRootElementInContainer
	 */
	
	"use strict";
	
	var DOC_NODE_TYPE = 9;
	
	/**
	 * @param {DOMElement|DOMDocument} container DOM element that may contain
	 *                                           a React component
	 * @return {?*} DOM element that may have the reactRoot ID, or null.
	 */
	function getReactRootElementInContainer(container) {
	  if (!container) {
	    return null;
	  }
	
	  if (container.nodeType === DOC_NODE_TYPE) {
	    return container.documentElement;
	  } else {
	    return container.firstChild;
	  }
	}
	
	module.exports = getReactRootElementInContainer;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMultiChildUpdateTypes
	 */
	
	"use strict";
	
	var keyMirror = __webpack_require__(92);
	
	/**
	 * When a component's children are updated, a series of update configuration
	 * objects are created in order to batch and serialize the required changes.
	 *
	 * Enumerates all the possible types of update configurations.
	 *
	 * @internal
	 */
	var ReactMultiChildUpdateTypes = keyMirror({
	  INSERT_MARKUP: null,
	  MOVE_EXISTING: null,
	  REMOVE_NODE: null,
	  TEXT_CONTENT: null
	});
	
	module.exports = ReactMultiChildUpdateTypes;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule flattenChildren
	 */
	
	"use strict";
	
	var traverseAllChildren = __webpack_require__(89);
	var warning = __webpack_require__(60);
	
	/**
	 * @param {function} traverseContext Context passed through traversal.
	 * @param {?ReactComponent} child React child component.
	 * @param {!string} name String name of key path to child.
	 */
	function flattenSingleChildIntoContext(traverseContext, child, name) {
	  // We found a component instance.
	  var result = traverseContext;
	  var keyUnique = !result.hasOwnProperty(name);
	  ("production" !== process.env.NODE_ENV ? warning(
	    keyUnique,
	    'flattenChildren(...): Encountered two children with the same key, ' +
	    '`%s`. Child keys must be unique; when two children share a key, only ' +
	    'the first child will be used.',
	    name
	  ) : null);
	  if (keyUnique && child != null) {
	    result[name] = child;
	  }
	}
	
	/**
	 * Flattens children that are typically specified as `props.children`. Any null
	 * children will not be included in the resulting object.
	 * @return {!object} flattened children keyed by name.
	 */
	function flattenChildren(children) {
	  if (children == null) {
	    return children;
	  }
	  var result = {};
	  traverseAllChildren(children, flattenSingleChildIntoContext, result);
	  return result;
	}
	
	module.exports = flattenChildren;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule emptyFunction
	 */
	
	var copyProperties = __webpack_require__(63);
	
	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}
	
	copyProperties(emptyFunction, {
	  thatReturns: makeEmptyFunction,
	  thatReturnsFalse: makeEmptyFunction(false),
	  thatReturnsTrue: makeEmptyFunction(true),
	  thatReturnsNull: makeEmptyFunction(null),
	  thatReturnsThis: function() { return this; },
	  thatReturnsArgument: function(arg) { return arg; }
	});
	
	module.exports = emptyFunction;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DragDropActionCreators = __webpack_require__(199),
	    DragDropStore = __webpack_require__(200),
	    NativeDragDropSupport = __webpack_require__(201),
	    EnterLeaveMonitor = __webpack_require__(202),
	    configureDataTransfer = __webpack_require__(203),
	    isFileDragDropEvent = __webpack_require__(204),
	    bindAll = __webpack_require__(205),
	    invariant = __webpack_require__(62),
	    merge = __webpack_require__(68),
	    union = __webpack_require__(222),
	    without = __webpack_require__(223),
	    isObject = __webpack_require__(224);
	
	/**
	 * Use this mixin to define drag sources and drop targets.
	 */
	var DragDropMixin = {
	  getInitialState:function() {
	    var state = {
	      ownDraggedItemType: null,
	      hasDragEntered: false
	    };
	
	    return merge(state, this.getStateFromDragDropStore());
	  },
	
	  getActiveDropTargetType:function() {
	    var $__0=      this.state,draggedItemType=$__0.draggedItemType,draggedItem=$__0.draggedItem,ownDraggedItemType=$__0.ownDraggedItemType,
	        dropTarget = this._dropTargets[draggedItemType];
	
	    if (!dropTarget) {
	      return null;
	    }
	
	    if (draggedItemType === ownDraggedItemType) {
	      return null;
	    }
	
	    var $__1=    dropTarget,canDrop=$__1.canDrop;
	    if (!canDrop || canDrop(draggedItem)) {
	      return draggedItemType;
	    } else {
	      return null;
	    }
	  },
	
	  isAnyDropTargetActive:function(types) {
	    return types.indexOf(this.getActiveDropTargetType()) > -1;
	  },
	
	  getStateFromDragDropStore:function() {
	    return {
	      draggedItem: DragDropStore.getDraggedItem(),
	      draggedItemType: DragDropStore.getDraggedItemType()
	    };
	  },
	
	  getDragState:function(type) {
	    invariant(this._dragSources[type], 'No drag source for %s', type);
	
	    return {
	      isDragging: this.state.ownDraggedItemType === type
	    };
	  },
	
	  getDropState:function(type) {
	    invariant(this._dropTargets[type], 'No drop target for %s', type);
	
	    var isDragging = this.getActiveDropTargetType() === type,
	        hasDragEntered = this.state.hasDragEntered;
	
	    return {
	      isDragging: isDragging,
	      isHovering: isDragging && hasDragEntered
	    };
	  },
	
	  componentWillMount:function() {
	    this._monitor = new EnterLeaveMonitor();
	    this._dragSources = {};
	    this._dropTargets = {};
	
	    invariant(this.configureDragDrop, 'Implement configureDragDrop(registerType) to use DragDropMixin');
	    this.configureDragDrop(this.registerDragDropItemTypeHandlers);
	  },
	
	  componentDidMount:function() {
	    DragDropStore.addChangeListener(this.handleDragDropStoreChange);
	  },
	
	  componentWillUnmount:function() {
	    DragDropStore.removeChangeListener(this.handleDragDropStoreChange);
	  },
	
	  registerDragDropItemTypeHandlers:function(type, handlers) {
	    var $__0=     handlers,dragSource=$__0.dragSource,dropTarget=$__0.dropTarget;
	
	    if (dragSource) {
	      invariant(!this._dragSources[type], 'Drag source for %s specified twice', type);
	      this._dragSources[type] = bindAll(dragSource, this);
	    }
	
	    if (dropTarget) {
	      invariant(!this._dropTargets[type], 'Drop target for %s specified twice', type);
	      this._dropTargets[type] = bindAll(dropTarget, this);
	    }
	  },
	
	  handleDragDropStoreChange:function() {
	    this.setState(this.getStateFromDragDropStore());
	  },
	
	  dragSourceFor:function(type) {
	    invariant(this._dragSources[type], 'No drag source for %s', type);
	
	    // TODO: optimize by caching binds
	    return {
	      draggable: true,
	      onDragStart: this.handleDragStart.bind(this, type),
	      onDragEnd: this.handleDragEnd.bind(this, type)
	    };
	  },
	
	  handleDragStart:function(type, e) {
	    var $__0=     this._dragSources[type],canDrag=$__0.canDrag,beginDrag=$__0.beginDrag;
	
	    if (canDrag && !canDrag(e)) {
	      e.preventDefault();
	      return;
	    }
	
	    // Some browser-specific fixes rely on knowing
	    // current dragged element and its dragend handler.
	    NativeDragDropSupport.handleDragStart(
	      e.target,
	      this.handleDragEnd.bind(this, type, null)
	    );
	
	    var dragOptions = beginDrag(e),
	        $__1=    dragOptions,item=$__1.item;
	
	    configureDataTransfer(this.getDOMNode(), e.nativeEvent, dragOptions);
	    invariant(isObject(item), 'Expected return value of beginDrag to contain "item" object');
	
	    DragDropActionCreators.startDragging(type, item);
	
	    // Delay setting own state by a tick so `getDragState(type).isDragging`
	    // doesn't return `true` yet. Otherwise browser will capture dragged state
	    // as the element screenshot.
	
	    setTimeout(function()  {
	      if (this.isMounted() && DragDropStore.getDraggedItem() === item) {
	        this.setState({
	          ownDraggedItemType: type
	        });
	      }
	    }.bind(this));
	  },
	
	  handleDragEnd:function(type, e) {
	    NativeDragDropSupport.handleDragEnd();
	
	    var $__0=    this._dragSources[type],endDrag=$__0.endDrag,
	        didDrop = DragDropStore.didDrop();
	
	    DragDropActionCreators.endDragging();
	
	    if (!this.isMounted()) {
	
	      // Note: this method may be invoked even *after* component was unmounted
	      // This happens if source node was removed from DOM while dragging.
	
	      return;
	    }
	
	    this.setState({
	      ownDraggedItemType: null
	    });
	
	    if (endDrag) {
	      endDrag(didDrop, e);
	    }
	  },
	
	  dropTargetFor:function() {var types=Array.prototype.slice.call(arguments,0);
	    types.forEach(function(type)  {
	      invariant(this._dropTargets[type], 'No drop target for %s', type);
	    }.bind(this));
	
	    // TODO: optimize by caching binds
	    return {
	      onDragEnter: this.handleDragEnter.bind(this, types),
	      onDragOver: this.handleDragOver.bind(this, types),
	      onDragLeave: this.handleDragLeave.bind(this, types),
	      onDrop: this.handleDrop.bind(this, types)
	    };
	  },
	
	  handleDragOver:function(types, e) {
	    if (!this.isAnyDropTargetActive(types)) {
	      return;
	    }
	
	    e.preventDefault();
	
	    var $__0=    this._dropTargets[this.state.draggedItemType],over=$__0.over;
	    if (over) {
	      over(this.state.draggedItem, e);
	    }
	  },
	
	  handleDragEnter:function(types, e) {
	    if (!this.isAnyDropTargetActive(types)) {
	      return;
	    }
	
	    if (!this._monitor.enter(e.target)) {
	      return;
	    }
	
	    this.setState({
	      hasDragEntered: true
	    });
	
	    var $__0=    this._dropTargets[this.state.draggedItemType],enter=$__0.enter;
	    if (enter) {
	      enter(this.state.draggedItem, e);
	    }
	  },
	
	  handleDragLeave:function(types, e) {
	    if (!this.isAnyDropTargetActive(types)) {
	      return;
	    }
	
	    if (!this._monitor.leave(e.target)) {
	      return;
	    }
	
	    this.setState({
	      hasDragEntered: false
	    });
	
	    var $__0=    this._dropTargets[this.state.draggedItemType],leave=$__0.leave;
	    if (leave) {
	      leave(this.state.draggedItem, e);
	    }
	  },
	
	  handleDrop:function(types, e) {
	    if (!this.isAnyDropTargetActive(types)) {
	      return;
	    }
	
	    e.preventDefault();
	
	    var item = this.state.draggedItem,
	        $__0=    this._dropTargets[this.state.draggedItemType],acceptDrop=$__0.acceptDrop;
	
	    if (isFileDragDropEvent(e)) {
	      // We don't know file list until the `drop` event,
	      // so we couldn't put `item` into the store.
	      item = {
	        files: Array.prototype.slice.call(e.dataTransfer.files)
	      };
	    }
	
	    this._monitor.reset();
	
	    this.setState({
	      hasDragEntered: false
	    });
	
	    if (!acceptDrop || acceptDrop(item, e) !== false) {
	      DragDropActionCreators.recordDrop();
	    }
	  }
	};
	
	module.exports = DragDropMixin;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getDragImageScale = __webpack_require__(206);
	
	var TRANSPARENT_PIXEL_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	
	var ImagePreloaderMixin = {
	  componentDidMount:function() {
	    this._cachedImages = {};
	    this._readyImages = {};
	    this.preloadImages();
	  },
	
	  componentDidUpdate:function() {
	    this.preloadImages();
	  },
	
	  componentWillUnmount:function() {
	    for (var key in this._cachedImages) {
	      this._cachedImages[key].src = TRANSPARENT_PIXEL_SRC;
	    }
	
	    this._cachedImages = {};
	  },
	
	  hasPreloadedImage:function(url) {
	    return !!this._readyImages[url];
	  },
	
	  getPreloadedImage:function(url) {
	    if (this.hasPreloadedImage(url)) {
	      return this._cachedImages[url];
	    }
	  },
	
	  preloadImages:function() {
	    var urls = this.getImageUrlsToPreload();
	    urls.forEach(this.preloadImage);
	  },
	
	  preloadImage:function(url) {
	    if (!url || this._cachedImages[url]) {
	      return;
	    }
	
	    var img = new Image();
	    img.onload = function()  {
	      if (this.isMounted()) {
	        this._readyImages[url] = true;
	      }
	    }.bind(this);
	    img.onerror = function()  {
	      if (this.isMounted()) {
	        delete this._cachedImages[url];
	      }
	    }.bind(this);
	    img.src = url;
	
	    this._cachedImages[url] = img;
	  },
	
	  getDragImageScale: getDragImageScale
	};
	
	module.exports = ImagePreloaderMixin;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keyMirror = __webpack_require__(92);
	
	var HorizontalDragAnchors = keyMirror({
	  LEFT: null,
	  CENTER: null,
	  RIGHT: null
	});
	
	module.exports = HorizontalDragAnchors;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keyMirror = __webpack_require__(92);
	
	var VerticalDragAnchors = keyMirror({
	  TOP: null,
	  CENTER: null,
	  BOTTOM: null
	});
	
	module.exports = VerticalDragAnchors;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keyMirror = __webpack_require__(92);
	
	var NativeDragItemTypes = {
	  FILE: '__NATIVE_FILE__'
	};
	
	module.exports = NativeDragItemTypes;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DragDropEffects = {
	  COPY: 'copy',
	  MOVE: 'move'
	};
	
	module.exports = DragDropEffects;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule adler32
	 */
	
	/* jslint bitwise:true */
	
	"use strict";
	
	var MOD = 65521;
	
	// This is a clean-room implementation of adler32 designed for detecting
	// if markup is not what we expect it to be. It does not need to be
	// cryptographically strong, only reasonable good at detecting if markup
	// generated on the server is different than that on the client.
	function adler32(data) {
	  var a = 1;
	  var b = 0;
	  for (var i = 0; i < data.length; i++) {
	    a = (a + data.charCodeAt(i)) % MOD;
	    b = (b + a) % MOD;
	  }
	  return a | (b << 16);
	}
	
	module.exports = adler32;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CallbackQueue
	 */
	
	"use strict";
	
	var PooledClass = __webpack_require__(88);
	
	var invariant = __webpack_require__(62);
	var mixInto = __webpack_require__(99);
	
	/**
	 * A specialized pseudo-event module to help keep track of components waiting to
	 * be notified when their DOM representations are available for use.
	 *
	 * This implements `PooledClass`, so you should never need to instantiate this.
	 * Instead, use `CallbackQueue.getPooled()`.
	 *
	 * @class ReactMountReady
	 * @implements PooledClass
	 * @internal
	 */
	function CallbackQueue() {
	  this._callbacks = null;
	  this._contexts = null;
	}
	
	mixInto(CallbackQueue, {
	
	  /**
	   * Enqueues a callback to be invoked when `notifyAll` is invoked.
	   *
	   * @param {function} callback Invoked when `notifyAll` is invoked.
	   * @param {?object} context Context to call `callback` with.
	   * @internal
	   */
	  enqueue: function(callback, context) {
	    this._callbacks = this._callbacks || [];
	    this._contexts = this._contexts || [];
	    this._callbacks.push(callback);
	    this._contexts.push(context);
	  },
	
	  /**
	   * Invokes all enqueued callbacks and clears the queue. This is invoked after
	   * the DOM representation of a component has been created or updated.
	   *
	   * @internal
	   */
	  notifyAll: function() {
	    var callbacks = this._callbacks;
	    var contexts = this._contexts;
	    if (callbacks) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        callbacks.length === contexts.length,
	        "Mismatched list of contexts in callback queue"
	      ) : invariant(callbacks.length === contexts.length));
	      this._callbacks = null;
	      this._contexts = null;
	      for (var i = 0, l = callbacks.length; i < l; i++) {
	        callbacks[i].call(contexts[i]);
	      }
	      callbacks.length = 0;
	      contexts.length = 0;
	    }
	  },
	
	  /**
	   * Resets the internal queue.
	   *
	   * @internal
	   */
	  reset: function() {
	    this._callbacks = null;
	    this._contexts = null;
	  },
	
	  /**
	   * `PooledClass` looks for this.
	   */
	  destructor: function() {
	    this.reset();
	  }
	
	});
	
	PooledClass.addPoolingTo(CallbackQueue);
	
	module.exports = CallbackQueue;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPutListenerQueue
	 */
	
	"use strict";
	
	var PooledClass = __webpack_require__(88);
	var ReactBrowserEventEmitter = __webpack_require__(106);
	
	var mixInto = __webpack_require__(99);
	
	function ReactPutListenerQueue() {
	  this.listenersToPut = [];
	}
	
	mixInto(ReactPutListenerQueue, {
	  enqueuePutListener: function(rootNodeID, propKey, propValue) {
	    this.listenersToPut.push({
	      rootNodeID: rootNodeID,
	      propKey: propKey,
	      propValue: propValue
	    });
	  },
	
	  putListeners: function() {
	    for (var i = 0; i < this.listenersToPut.length; i++) {
	      var listenerToPut = this.listenersToPut[i];
	      ReactBrowserEventEmitter.putListener(
	        listenerToPut.rootNodeID,
	        listenerToPut.propKey,
	        listenerToPut.propValue
	      );
	    }
	  },
	
	  reset: function() {
	    this.listenersToPut.length = 0;
	  },
	
	  destructor: function() {
	    this.reset();
	  }
	});
	
	PooledClass.addPoolingTo(ReactPutListenerQueue);
	
	module.exports = ReactPutListenerQueue;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule Transaction
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	/**
	 * `Transaction` creates a black box that is able to wrap any method such that
	 * certain invariants are maintained before and after the method is invoked
	 * (Even if an exception is thrown while invoking the wrapped method). Whoever
	 * instantiates a transaction can provide enforcers of the invariants at
	 * creation time. The `Transaction` class itself will supply one additional
	 * automatic invariant for you - the invariant that any transaction instance
	 * should not be run while it is already being run. You would typically create a
	 * single instance of a `Transaction` for reuse multiple times, that potentially
	 * is used to wrap several different methods. Wrappers are extremely simple -
	 * they only require implementing two methods.
	 *
	 * <pre>
	 *                       wrappers (injected at creation time)
	 *                                      +        +
	 *                                      |        |
	 *                    +-----------------|--------|--------------+
	 *                    |                 v        |              |
	 *                    |      +---------------+   |              |
	 *                    |   +--|    wrapper1   |---|----+         |
	 *                    |   |  +---------------+   v    |         |
	 *                    |   |          +-------------+  |         |
	 *                    |   |     +----|   wrapper2  |--------+   |
	 *                    |   |     |    +-------------+  |     |   |
	 *                    |   |     |                     |     |   |
	 *                    |   v     v                     v     v   | wrapper
	 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
	 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
	 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | +---+ +---+   +---------+   +---+ +---+ |
	 *                    |  initialize                    close    |
	 *                    +-----------------------------------------+
	 * </pre>
	 *
	 * Use cases:
	 * - Preserving the input selection ranges before/after reconciliation.
	 *   Restoring selection even in the event of an unexpected error.
	 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
	 *   while guaranteeing that afterwards, the event system is reactivated.
	 * - Flushing a queue of collected DOM mutations to the main UI thread after a
	 *   reconciliation takes place in a worker thread.
	 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
	 *   content.
	 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
	 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
	 * - (Future use case): Layout calculations before and after DOM upates.
	 *
	 * Transactional plugin API:
	 * - A module that has an `initialize` method that returns any precomputation.
	 * - and a `close` method that accepts the precomputation. `close` is invoked
	 *   when the wrapped process is completed, or has failed.
	 *
	 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
	 * that implement `initialize` and `close`.
	 * @return {Transaction} Single transaction for reuse in thread.
	 *
	 * @class Transaction
	 */
	var Mixin = {
	  /**
	   * Sets up this instance so that it is prepared for collecting metrics. Does
	   * so such that this setup method may be used on an instance that is already
	   * initialized, in a way that does not consume additional memory upon reuse.
	   * That can be useful if you decide to make your subclass of this mixin a
	   * "PooledClass".
	   */
	  reinitializeTransaction: function() {
	    this.transactionWrappers = this.getTransactionWrappers();
	    if (!this.wrapperInitData) {
	      this.wrapperInitData = [];
	    } else {
	      this.wrapperInitData.length = 0;
	    }
	    this._isInTransaction = false;
	  },
	
	  _isInTransaction: false,
	
	  /**
	   * @abstract
	   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
	   */
	  getTransactionWrappers: null,
	
	  isInTransaction: function() {
	    return !!this._isInTransaction;
	  },
	
	  /**
	   * Executes the function within a safety window. Use this for the top level
	   * methods that result in large amounts of computation/mutations that would
	   * need to be safety checked.
	   *
	   * @param {function} method Member of scope to call.
	   * @param {Object} scope Scope to invoke from.
	   * @param {Object?=} args... Arguments to pass to the method (optional).
	   *                           Helps prevent need to bind in many cases.
	   * @return Return value from `method`.
	   */
	  perform: function(method, scope, a, b, c, d, e, f) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !this.isInTransaction(),
	      'Transaction.perform(...): Cannot initialize a transaction when there ' +
	      'is already an outstanding transaction.'
	    ) : invariant(!this.isInTransaction()));
	    var errorThrown;
	    var ret;
	    try {
	      this._isInTransaction = true;
	      // Catching errors makes debugging more difficult, so we start with
	      // errorThrown set to true before setting it to false after calling
	      // close -- if it's still set to true in the finally block, it means
	      // one of these calls threw.
	      errorThrown = true;
	      this.initializeAll(0);
	      ret = method.call(scope, a, b, c, d, e, f);
	      errorThrown = false;
	    } finally {
	      try {
	        if (errorThrown) {
	          // If `method` throws, prefer to show that stack trace over any thrown
	          // by invoking `closeAll`.
	          try {
	            this.closeAll(0);
	          } catch (err) {
	          }
	        } else {
	          // Since `method` didn't throw, we don't want to silence the exception
	          // here.
	          this.closeAll(0);
	        }
	      } finally {
	        this._isInTransaction = false;
	      }
	    }
	    return ret;
	  },
	
	  initializeAll: function(startIndex) {
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      try {
	        // Catching errors makes debugging more difficult, so we start with the
	        // OBSERVED_ERROR state before overwriting it with the real return value
	        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
	        // block, it means wrapper.initialize threw.
	        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
	        this.wrapperInitData[i] = wrapper.initialize ?
	          wrapper.initialize.call(this) :
	          null;
	      } finally {
	        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
	          // The initializer for wrapper i threw an error; initialize the
	          // remaining wrappers but silence any exceptions from them to ensure
	          // that the first error is the one to bubble up.
	          try {
	            this.initializeAll(i + 1);
	          } catch (err) {
	          }
	        }
	      }
	    }
	  },
	
	  /**
	   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
	   * them the respective return values of `this.transactionWrappers.init[i]`
	   * (`close`rs that correspond to initializers that failed will not be
	   * invoked).
	   */
	  closeAll: function(startIndex) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      this.isInTransaction(),
	      'Transaction.closeAll(): Cannot close transaction when none are open.'
	    ) : invariant(this.isInTransaction()));
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      var initData = this.wrapperInitData[i];
	      var errorThrown;
	      try {
	        // Catching errors makes debugging more difficult, so we start with
	        // errorThrown set to true before setting it to false after calling
	        // close -- if it's still set to true in the finally block, it means
	        // wrapper.close threw.
	        errorThrown = true;
	        if (initData !== Transaction.OBSERVED_ERROR) {
	          wrapper.close && wrapper.close.call(this, initData);
	        }
	        errorThrown = false;
	      } finally {
	        if (errorThrown) {
	          // The closer for wrapper i threw an error; close the remaining
	          // wrappers but silence any exceptions from them to ensure that the
	          // first error is the one to bubble up.
	          try {
	            this.closeAll(i + 1);
	          } catch (e) {
	          }
	        }
	      }
	    }
	    this.wrapperInitData.length = 0;
	  }
	};
	
	var Transaction = {
	
	  Mixin: Mixin,
	
	  /**
	   * Token to look for to determine if an error occured.
	   */
	  OBSERVED_ERROR: {}
	
	};
	
	module.exports = Transaction;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var LocationActions = __webpack_require__(196);
	var getWindowPath = __webpack_require__(195);
	
	var _onChange;
	
	function onPopState() {
	  _onChange({
	    type: LocationActions.POP,
	    path: getWindowPath()
	  });
	}
	
	/**
	 * A Location that uses HTML5 history.
	 */
	var HistoryLocation = {
	
	  setup: function (onChange) {
	    _onChange = onChange;
	
	    if (window.addEventListener) {
	      window.addEventListener('popstate', onPopState, false);
	    } else {
	      window.attachEvent('popstate', onPopState);
	    }
	  },
	
	  teardown: function () {
	    if (window.removeEventListener) {
	      window.removeEventListener('popstate', onPopState, false);
	    } else {
	      window.detachEvent('popstate', onPopState);
	    }
	  },
	
	  push: function (path) {
	    window.history.pushState({ path: path }, '', path);
	
	    _onChange({
	      type: LocationActions.PUSH,
	      path: getWindowPath()
	    });
	  },
	
	  replace: function (path) {
	    window.history.replaceState({ path: path }, '', path);
	
	    _onChange({
	      type: LocationActions.REPLACE,
	      path: getWindowPath()
	    });
	  },
	
	  pop: function () {
	    window.history.back();
	  },
	
	  getCurrentPath: getWindowPath,
	
	  toString: function () {
	    return '<HistoryLocation>';
	  }
	
	};
	
	module.exports = HistoryLocation;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var getWindowPath = __webpack_require__(195);
	
	/**
	 * A Location that uses full page refreshes. This is used as
	 * the fallback for HistoryLocation in browsers that do not
	 * support the HTML5 history API.
	 */
	var RefreshLocation = {
	
	  push: function (path) {
	    window.location = path;
	  },
	
	  replace: function (path) {
	    window.location.replace(path);
	  },
	
	  pop: function () {
	    window.history.back();
	  },
	
	  getCurrentPath: getWindowPath,
	
	  toString: function () {
	    return '<RefreshLocation>';
	  }
	
	};
	
	module.exports = RefreshLocation;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	function supportsHistory() {
	  /*! taken from modernizr
	   * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	   * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	   */
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 ||
	      (ua.indexOf('Android 4.0') !== -1)) &&
	      ua.indexOf('Mobile Safari') !== -1 &&
	      ua.indexOf('Chrome') === -1) {
	    return false;
	  }
	  return (window.history && 'pushState' in window.history);
	}
	
	module.exports = supportsHistory;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(231);
	
	// TODO: Use process.env.NODE_ENV check + envify to enable
	// when's promise monitor here when in dev.
	
	module.exports = Promise;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule emptyObject
	 */
	
	"use strict";
	
	var emptyObject = {};
	
	if ("production" !== process.env.NODE_ENV) {
	  Object.freeze(emptyObject);
	}
	
	module.exports = emptyObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */
	
	"use strict";
	
	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      nextClass && (className += ' ' + nextClass);
	    }
	  }
	  return className;
	}
	
	module.exports = joinClasses;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule mergeHelpers
	 *
	 * requiresPolyfills: Array.isArray
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	var keyMirror = __webpack_require__(92);
	
	/**
	 * Maximum number of levels to traverse. Will catch circular structures.
	 * @const
	 */
	var MAX_MERGE_DEPTH = 36;
	
	/**
	 * We won't worry about edge cases like new String('x') or new Boolean(true).
	 * Functions are considered terminals, and arrays are not.
	 * @param {*} o The item/object/value to test.
	 * @return {boolean} true iff the argument is a terminal.
	 */
	var isTerminal = function(o) {
	  return typeof o !== 'object' || o === null;
	};
	
	var mergeHelpers = {
	
	  MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,
	
	  isTerminal: isTerminal,
	
	  /**
	   * Converts null/undefined values into empty object.
	   *
	   * @param {?Object=} arg Argument to be normalized (nullable optional)
	   * @return {!Object}
	   */
	  normalizeMergeArg: function(arg) {
	    return arg === undefined || arg === null ? {} : arg;
	  },
	
	  /**
	   * If merging Arrays, a merge strategy *must* be supplied. If not, it is
	   * likely the caller's fault. If this function is ever called with anything
	   * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
	   *
	   * @param {*} one Array to merge into.
	   * @param {*} two Array to merge from.
	   */
	  checkMergeArrayArgs: function(one, two) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Array.isArray(one) && Array.isArray(two),
	      'Tried to merge arrays, instead got %s and %s.',
	      one,
	      two
	    ) : invariant(Array.isArray(one) && Array.isArray(two)));
	  },
	
	  /**
	   * @param {*} one Object to merge into.
	   * @param {*} two Object to merge from.
	   */
	  checkMergeObjectArgs: function(one, two) {
	    mergeHelpers.checkMergeObjectArg(one);
	    mergeHelpers.checkMergeObjectArg(two);
	  },
	
	  /**
	   * @param {*} arg
	   */
	  checkMergeObjectArg: function(arg) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !isTerminal(arg) && !Array.isArray(arg),
	      'Tried to merge an object, instead got %s.',
	      arg
	    ) : invariant(!isTerminal(arg) && !Array.isArray(arg)));
	  },
	
	  /**
	   * @param {*} arg
	   */
	  checkMergeIntoObjectArg: function(arg) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      (!isTerminal(arg) || typeof arg === 'function') && !Array.isArray(arg),
	      'Tried to merge into an object, instead got %s.',
	      arg
	    ) : invariant((!isTerminal(arg) || typeof arg === 'function') && !Array.isArray(arg)));
	  },
	
	  /**
	   * Checks that a merge was not given a circular object or an object that had
	   * too great of depth.
	   *
	   * @param {number} Level of recursion to validate against maximum.
	   */
	  checkMergeLevel: function(level) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      level < MAX_MERGE_DEPTH,
	      'Maximum deep merge depth exceeded. You may be attempting to merge ' +
	      'circular structures in an unsupported way.'
	    ) : invariant(level < MAX_MERGE_DEPTH));
	  },
	
	  /**
	   * Checks that the supplied merge strategy is valid.
	   *
	   * @param {string} Array merge strategy.
	   */
	  checkArrayStrategy: function(strategy) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      strategy === undefined || strategy in mergeHelpers.ArrayStrategies,
	      'You must provide an array strategy to deep merge functions to ' +
	      'instruct the deep merge how to resolve merging two arrays.'
	    ) : invariant(strategy === undefined || strategy in mergeHelpers.ArrayStrategies));
	  },
	
	  /**
	   * Set of possible behaviors of merge algorithms when encountering two Arrays
	   * that must be merged together.
	   * - `clobber`: The left `Array` is ignored.
	   * - `indexByIndex`: The result is achieved by recursively deep merging at
	   *   each index. (not yet supported.)
	   */
	  ArrayStrategies: keyMirror({
	    Clobber: true,
	    IndexByIndex: true
	  })
	
	};
	
	module.exports = mergeHelpers;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CSSProperty
	 */
	
	"use strict";
	
	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  columnCount: true,
	  fillOpacity: true,
	  flex: true,
	  flexGrow: true,
	  flexShrink: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  widows: true,
	  zIndex: true,
	  zoom: true
	};
	
	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}
	
	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	
	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function(prop) {
	  prefixes.forEach(function(prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});
	
	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundImage: true,
	    backgroundPosition: true,
	    backgroundRepeat: true,
	    backgroundColor: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  }
	};
	
	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};
	
	module.exports = CSSProperty;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule dangerousStyleValue
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var CSSProperty = __webpack_require__(155);
	
	var isUnitlessNumber = CSSProperty.isUnitlessNumber;
	
	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901
	
	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }
	
	  var isNonNumeric = isNaN(value);
	  if (isNonNumeric || value === 0 ||
	      isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }
	
	  if (typeof value === 'string') {
	    value = value.trim();
	  }
	  return value + 'px';
	}
	
	module.exports = dangerousStyleValue;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule hyphenateStyleName
	 * @typechecks
	 */
	
	"use strict";
	
	var hyphenate = __webpack_require__(207);
	
	var msPattern = /^ms-/;
	
	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *   > hyphenate('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenate('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}
	
	module.exports = hyphenateStyleName;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventPluginHub
	 */
	
	"use strict";
	
	var EventPluginRegistry = __webpack_require__(159);
	var EventPluginUtils = __webpack_require__(42);
	
	var accumulate = __webpack_require__(208);
	var forEachAccumulated = __webpack_require__(209);
	var invariant = __webpack_require__(62);
	var isEventSupported = __webpack_require__(162);
	var monitorCodeUse = __webpack_require__(100);
	
	/**
	 * Internal store for event listeners
	 */
	var listenerBank = {};
	
	/**
	 * Internal queue of events that have accumulated their dispatches and are
	 * waiting to have their dispatches executed.
	 */
	var eventQueue = null;
	
	/**
	 * Dispatches an event and releases it back into the pool, unless persistent.
	 *
	 * @param {?object} event Synthetic event to be dispatched.
	 * @private
	 */
	var executeDispatchesAndRelease = function(event) {
	  if (event) {
	    var executeDispatch = EventPluginUtils.executeDispatch;
	    // Plugins can provide custom behavior when dispatching events.
	    var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
	    if (PluginModule && PluginModule.executeDispatch) {
	      executeDispatch = PluginModule.executeDispatch;
	    }
	    EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);
	
	    if (!event.isPersistent()) {
	      event.constructor.release(event);
	    }
	  }
	};
	
	/**
	 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
	 *   hierarchy given ids of the logical DOM elements involved.
	 */
	var InstanceHandle = null;
	
	function validateInstanceHandle() {
	  var invalid = !InstanceHandle||
	    !InstanceHandle.traverseTwoPhase ||
	    !InstanceHandle.traverseEnterLeave;
	  if (invalid) {
	    throw new Error('InstanceHandle not injected before use!');
	  }
	}
	
	/**
	 * This is a unified interface for event plugins to be installed and configured.
	 *
	 * Event plugins can implement the following properties:
	 *
	 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
	 *     Required. When a top-level event is fired, this method is expected to
	 *     extract synthetic events that will in turn be queued and dispatched.
	 *
	 *   `eventTypes` {object}
	 *     Optional, plugins that fire events must publish a mapping of registration
	 *     names that are used to register listeners. Values of this mapping must
	 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
	 *
	 *   `executeDispatch` {function(object, function, string)}
	 *     Optional, allows plugins to override how an event gets dispatched. By
	 *     default, the listener is simply invoked.
	 *
	 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
	 *
	 * @public
	 */
	var EventPluginHub = {
	
	  /**
	   * Methods for injecting dependencies.
	   */
	  injection: {
	
	    /**
	     * @param {object} InjectedMount
	     * @public
	     */
	    injectMount: EventPluginUtils.injection.injectMount,
	
	    /**
	     * @param {object} InjectedInstanceHandle
	     * @public
	     */
	    injectInstanceHandle: function(InjectedInstanceHandle) {
	      InstanceHandle = InjectedInstanceHandle;
	      if ("production" !== process.env.NODE_ENV) {
	        validateInstanceHandle();
	      }
	    },
	
	    getInstanceHandle: function() {
	      if ("production" !== process.env.NODE_ENV) {
	        validateInstanceHandle();
	      }
	      return InstanceHandle;
	    },
	
	    /**
	     * @param {array} InjectedEventPluginOrder
	     * @public
	     */
	    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
	
	    /**
	     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	     */
	    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
	
	  },
	
	  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,
	
	  registrationNameModules: EventPluginRegistry.registrationNameModules,
	
	  /**
	   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
	   *
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {?function} listener The callback to store.
	   */
	  putListener: function(id, registrationName, listener) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !listener || typeof listener === 'function',
	      'Expected %s listener to be a function, instead got type %s',
	      registrationName, typeof listener
	    ) : invariant(!listener || typeof listener === 'function'));
	
	    if ("production" !== process.env.NODE_ENV) {
	      // IE8 has no API for event capturing and the `onScroll` event doesn't
	      // bubble.
	      if (registrationName === 'onScroll' &&
	          !isEventSupported('scroll', true)) {
	        monitorCodeUse('react_no_scroll_event');
	        console.warn('This browser doesn\'t support the `onScroll` event');
	      }
	    }
	    var bankForRegistrationName =
	      listenerBank[registrationName] || (listenerBank[registrationName] = {});
	    bankForRegistrationName[id] = listener;
	  },
	
	  /**
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @return {?function} The stored callback.
	   */
	  getListener: function(id, registrationName) {
	    var bankForRegistrationName = listenerBank[registrationName];
	    return bankForRegistrationName && bankForRegistrationName[id];
	  },
	
	  /**
	   * Deletes a listener from the registration bank.
	   *
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   */
	  deleteListener: function(id, registrationName) {
	    var bankForRegistrationName = listenerBank[registrationName];
	    if (bankForRegistrationName) {
	      delete bankForRegistrationName[id];
	    }
	  },
	
	  /**
	   * Deletes all listeners for the DOM element with the supplied ID.
	   *
	   * @param {string} id ID of the DOM element.
	   */
	  deleteAllListeners: function(id) {
	    for (var registrationName in listenerBank) {
	      delete listenerBank[registrationName][id];
	    }
	  },
	
	  /**
	   * Allows registered plugins an opportunity to extract events from top-level
	   * native browser events.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @internal
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var events;
	    var plugins = EventPluginRegistry.plugins;
	    for (var i = 0, l = plugins.length; i < l; i++) {
	      // Not every plugin in the ordering may be loaded at runtime.
	      var possiblePlugin = plugins[i];
	      if (possiblePlugin) {
	        var extractedEvents = possiblePlugin.extractEvents(
	          topLevelType,
	          topLevelTarget,
	          topLevelTargetID,
	          nativeEvent
	        );
	        if (extractedEvents) {
	          events = accumulate(events, extractedEvents);
	        }
	      }
	    }
	    return events;
	  },
	
	  /**
	   * Enqueues a synthetic event that should be dispatched when
	   * `processEventQueue` is invoked.
	   *
	   * @param {*} events An accumulation of synthetic events.
	   * @internal
	   */
	  enqueueEvents: function(events) {
	    if (events) {
	      eventQueue = accumulate(eventQueue, events);
	    }
	  },
	
	  /**
	   * Dispatches all synthetic events on the event queue.
	   *
	   * @internal
	   */
	  processEventQueue: function() {
	    // Set `eventQueue` to null before processing it so that we can tell if more
	    // events get enqueued while processing.
	    var processingEventQueue = eventQueue;
	    eventQueue = null;
	    forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !eventQueue,
	      'processEventQueue(): Additional events were enqueued while processing ' +
	      'an event queue. Support for this has not yet been implemented.'
	    ) : invariant(!eventQueue));
	  },
	
	  /**
	   * These are needed for tests only. Do not use!
	   */
	  __purge: function() {
	    listenerBank = {};
	  },
	
	  __getListenerBank: function() {
	    return listenerBank;
	  }
	
	};
	
	module.exports = EventPluginHub;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventPluginRegistry
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Injectable ordering of event plugins.
	 */
	var EventPluginOrder = null;
	
	/**
	 * Injectable mapping from names to event plugin modules.
	 */
	var namesToPlugins = {};
	
	/**
	 * Recomputes the plugin list using the injected plugins and plugin ordering.
	 *
	 * @private
	 */
	function recomputePluginOrdering() {
	  if (!EventPluginOrder) {
	    // Wait until an `EventPluginOrder` is injected.
	    return;
	  }
	  for (var pluginName in namesToPlugins) {
	    var PluginModule = namesToPlugins[pluginName];
	    var pluginIndex = EventPluginOrder.indexOf(pluginName);
	    ("production" !== process.env.NODE_ENV ? invariant(
	      pluginIndex > -1,
	      'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
	      'the plugin ordering, `%s`.',
	      pluginName
	    ) : invariant(pluginIndex > -1));
	    if (EventPluginRegistry.plugins[pluginIndex]) {
	      continue;
	    }
	    ("production" !== process.env.NODE_ENV ? invariant(
	      PluginModule.extractEvents,
	      'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
	      'method, but `%s` does not.',
	      pluginName
	    ) : invariant(PluginModule.extractEvents));
	    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
	    var publishedEvents = PluginModule.eventTypes;
	    for (var eventName in publishedEvents) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        publishEventForPlugin(
	          publishedEvents[eventName],
	          PluginModule,
	          eventName
	        ),
	        'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
	        eventName,
	        pluginName
	      ) : invariant(publishEventForPlugin(
	        publishedEvents[eventName],
	        PluginModule,
	        eventName
	      )));
	    }
	  }
	}
	
	/**
	 * Publishes an event so that it can be dispatched by the supplied plugin.
	 *
	 * @param {object} dispatchConfig Dispatch configuration for the event.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @return {boolean} True if the event was successfully published.
	 * @private
	 */
	function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName),
	    'EventPluginHub: More than one plugin attempted to publish the same ' +
	    'event name, `%s`.',
	    eventName
	  ) : invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)));
	  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
	
	  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
	  if (phasedRegistrationNames) {
	    for (var phaseName in phasedRegistrationNames) {
	      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
	        var phasedRegistrationName = phasedRegistrationNames[phaseName];
	        publishRegistrationName(
	          phasedRegistrationName,
	          PluginModule,
	          eventName
	        );
	      }
	    }
	    return true;
	  } else if (dispatchConfig.registrationName) {
	    publishRegistrationName(
	      dispatchConfig.registrationName,
	      PluginModule,
	      eventName
	    );
	    return true;
	  }
	  return false;
	}
	
	/**
	 * Publishes a registration name that is used to identify dispatched events and
	 * can be used with `EventPluginHub.putListener` to register listeners.
	 *
	 * @param {string} registrationName Registration name to add.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @private
	 */
	function publishRegistrationName(registrationName, PluginModule, eventName) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !EventPluginRegistry.registrationNameModules[registrationName],
	    'EventPluginHub: More than one plugin attempted to publish the same ' +
	    'registration name, `%s`.',
	    registrationName
	  ) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
	  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
	  EventPluginRegistry.registrationNameDependencies[registrationName] =
	    PluginModule.eventTypes[eventName].dependencies;
	}
	
	/**
	 * Registers plugins so that they can extract and dispatch events.
	 *
	 * @see {EventPluginHub}
	 */
	var EventPluginRegistry = {
	
	  /**
	   * Ordered list of injected plugins.
	   */
	  plugins: [],
	
	  /**
	   * Mapping from event name to dispatch config
	   */
	  eventNameDispatchConfigs: {},
	
	  /**
	   * Mapping from registration name to plugin module
	   */
	  registrationNameModules: {},
	
	  /**
	   * Mapping from registration name to event name
	   */
	  registrationNameDependencies: {},
	
	  /**
	   * Injects an ordering of plugins (by plugin name). This allows the ordering
	   * to be decoupled from injection of the actual plugins so that ordering is
	   * always deterministic regardless of packaging, on-the-fly injection, etc.
	   *
	   * @param {array} InjectedEventPluginOrder
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginOrder}
	   */
	  injectEventPluginOrder: function(InjectedEventPluginOrder) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !EventPluginOrder,
	      'EventPluginRegistry: Cannot inject event plugin ordering more than ' +
	      'once. You are likely trying to load more than one copy of React.'
	    ) : invariant(!EventPluginOrder));
	    // Clone the ordering so it cannot be dynamically mutated.
	    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
	    recomputePluginOrdering();
	  },
	
	  /**
	   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
	   * in the ordering injected by `injectEventPluginOrder`.
	   *
	   * Plugins can be injected as part of page initialization or on-the-fly.
	   *
	   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginsByName}
	   */
	  injectEventPluginsByName: function(injectedNamesToPlugins) {
	    var isOrderingDirty = false;
	    for (var pluginName in injectedNamesToPlugins) {
	      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
	        continue;
	      }
	      var PluginModule = injectedNamesToPlugins[pluginName];
	      if (!namesToPlugins.hasOwnProperty(pluginName) ||
	          namesToPlugins[pluginName] !== PluginModule) {
	        ("production" !== process.env.NODE_ENV ? invariant(
	          !namesToPlugins[pluginName],
	          'EventPluginRegistry: Cannot inject two different event plugins ' +
	          'using the same name, `%s`.',
	          pluginName
	        ) : invariant(!namesToPlugins[pluginName]));
	        namesToPlugins[pluginName] = PluginModule;
	        isOrderingDirty = true;
	      }
	    }
	    if (isOrderingDirty) {
	      recomputePluginOrdering();
	    }
	  },
	
	  /**
	   * Looks up the plugin for the supplied event.
	   *
	   * @param {object} event A synthetic event.
	   * @return {?object} The plugin that created the supplied event.
	   * @internal
	   */
	  getPluginModuleForEvent: function(event) {
	    var dispatchConfig = event.dispatchConfig;
	    if (dispatchConfig.registrationName) {
	      return EventPluginRegistry.registrationNameModules[
	        dispatchConfig.registrationName
	      ] || null;
	    }
	    for (var phase in dispatchConfig.phasedRegistrationNames) {
	      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
	        continue;
	      }
	      var PluginModule = EventPluginRegistry.registrationNameModules[
	        dispatchConfig.phasedRegistrationNames[phase]
	      ];
	      if (PluginModule) {
	        return PluginModule;
	      }
	    }
	    return null;
	  },
	
	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _resetEventPlugins: function() {
	    EventPluginOrder = null;
	    for (var pluginName in namesToPlugins) {
	      if (namesToPlugins.hasOwnProperty(pluginName)) {
	        delete namesToPlugins[pluginName];
	      }
	    }
	    EventPluginRegistry.plugins.length = 0;
	
	    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
	    for (var eventName in eventNameDispatchConfigs) {
	      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
	        delete eventNameDispatchConfigs[eventName];
	      }
	    }
	
	    var registrationNameModules = EventPluginRegistry.registrationNameModules;
	    for (var registrationName in registrationNameModules) {
	      if (registrationNameModules.hasOwnProperty(registrationName)) {
	        delete registrationNameModules[registrationName];
	      }
	    }
	  }
	
	};
	
	module.exports = EventPluginRegistry;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactEventEmitterMixin
	 */
	
	"use strict";
	
	var EventPluginHub = __webpack_require__(158);
	
	function runEventQueueInBatch(events) {
	  EventPluginHub.enqueueEvents(events);
	  EventPluginHub.processEventQueue();
	}
	
	var ReactEventEmitterMixin = {
	
	  /**
	   * Streams a fired top-level event to `EventPluginHub` where plugins have the
	   * opportunity to create `ReactEvent`s to be dispatched.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {object} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native environment event.
	   */
	  handleTopLevel: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var events = EventPluginHub.extractEvents(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent
	    );
	
	    runEventQueueInBatch(events);
	  }
	};
	
	module.exports = ReactEventEmitterMixin;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ViewportMetrics
	 */
	
	"use strict";
	
	var getUnboundedScrollPosition = __webpack_require__(179);
	
	var ViewportMetrics = {
	
	  currentScrollLeft: 0,
	
	  currentScrollTop: 0,
	
	  refreshScrollValues: function() {
	    var scrollPosition = getUnboundedScrollPosition(window);
	    ViewportMetrics.currentScrollLeft = scrollPosition.x;
	    ViewportMetrics.currentScrollTop = scrollPosition.y;
	  }
	
	};
	
	module.exports = ViewportMetrics;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule isEventSupported
	 */
	
	"use strict";
	
	var ExecutionEnvironment = __webpack_require__(61);
	
	var useHasFeature;
	if (ExecutionEnvironment.canUseDOM) {
	  useHasFeature =
	    document.implementation &&
	    document.implementation.hasFeature &&
	    // always returns true in newer browsers as per the standard.
	    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	    document.implementation.hasFeature('', '') !== true;
	}
	
	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */
	function isEventSupported(eventNameSuffix, capture) {
	  if (!ExecutionEnvironment.canUseDOM ||
	      capture && !('addEventListener' in document)) {
	    return false;
	  }
	
	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = eventName in document;
	
	  if (!isSupported) {
	    var element = document.createElement('div');
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	  }
	
	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }
	
	  return isSupported;
	}
	
	module.exports = isEventSupported;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventPropagators
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(87);
	var EventPluginHub = __webpack_require__(158);
	
	var accumulate = __webpack_require__(208);
	var forEachAccumulated = __webpack_require__(209);
	
	var PropagationPhases = EventConstants.PropagationPhases;
	var getListener = EventPluginHub.getListener;
	
	/**
	 * Some event types have a notion of different registration names for different
	 * "phases" of propagation. This finds listeners by a given phase.
	 */
	function listenerAtPhase(id, event, propagationPhase) {
	  var registrationName =
	    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
	  return getListener(id, registrationName);
	}
	
	/**
	 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
	 * here, allows us to not have to bind or create functions for each event.
	 * Mutating the event's members allows us to not have to create a wrapping
	 * "dispatch" object that pairs the event with the listener.
	 */
	function accumulateDirectionalDispatches(domID, upwards, event) {
	  if ("production" !== process.env.NODE_ENV) {
	    if (!domID) {
	      throw new Error('Dispatching id must not be null');
	    }
	  }
	  var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
	  var listener = listenerAtPhase(domID, event, phase);
	  if (listener) {
	    event._dispatchListeners = accumulate(event._dispatchListeners, listener);
	    event._dispatchIDs = accumulate(event._dispatchIDs, domID);
	  }
	}
	
	/**
	 * Collect dispatches (must be entirely collected before dispatching - see unit
	 * tests). Lazily allocate the array to conserve memory.  We must loop through
	 * each event and perform the traversal for each one. We can not perform a
	 * single traversal for the entire collection of events because each event may
	 * have a different target.
	 */
	function accumulateTwoPhaseDispatchesSingle(event) {
	  if (event && event.dispatchConfig.phasedRegistrationNames) {
	    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(
	      event.dispatchMarker,
	      accumulateDirectionalDispatches,
	      event
	    );
	  }
	}
	
	
	/**
	 * Accumulates without regard to direction, does not look for phased
	 * registration names. Same as `accumulateDirectDispatchesSingle` but without
	 * requiring that the `dispatchMarker` be the same as the dispatched ID.
	 */
	function accumulateDispatches(id, ignoredDirection, event) {
	  if (event && event.dispatchConfig.registrationName) {
	    var registrationName = event.dispatchConfig.registrationName;
	    var listener = getListener(id, registrationName);
	    if (listener) {
	      event._dispatchListeners = accumulate(event._dispatchListeners, listener);
	      event._dispatchIDs = accumulate(event._dispatchIDs, id);
	    }
	  }
	}
	
	/**
	 * Accumulates dispatches on an `SyntheticEvent`, but only for the
	 * `dispatchMarker`.
	 * @param {SyntheticEvent} event
	 */
	function accumulateDirectDispatchesSingle(event) {
	  if (event && event.dispatchConfig.registrationName) {
	    accumulateDispatches(event.dispatchMarker, null, event);
	  }
	}
	
	function accumulateTwoPhaseDispatches(events) {
	  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
	}
	
	function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
	  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(
	    fromID,
	    toID,
	    accumulateDispatches,
	    leave,
	    enter
	  );
	}
	
	
	function accumulateDirectDispatches(events) {
	  forEachAccumulated(events, accumulateDirectDispatchesSingle);
	}
	
	
	
	/**
	 * A small set of propagation patterns, each of which will accept a small amount
	 * of information, and generate a set of "dispatch ready event objects" - which
	 * are sets of events that have already been annotated with a set of dispatched
	 * listener functions/ids. The API is designed this way to discourage these
	 * propagation strategies from actually executing the dispatches, since we
	 * always want to collect the entire set of dispatches before executing event a
	 * single one.
	 *
	 * @constructor EventPropagators
	 */
	var EventPropagators = {
	  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
	  accumulateDirectDispatches: accumulateDirectDispatches,
	  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
	};
	
	module.exports = EventPropagators;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticInputEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticEvent = __webpack_require__(165);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
	 *      /#events-inputevents
	 */
	var InputEventInterface = {
	  data: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticInputEvent(
	  dispatchConfig,
	  dispatchMarker,
	  nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticEvent.augmentClass(
	  SyntheticInputEvent,
	  InputEventInterface
	);
	
	module.exports = SyntheticInputEvent;
	


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var PooledClass = __webpack_require__(88);
	
	var emptyFunction = __webpack_require__(137);
	var getEventTarget = __webpack_require__(178);
	var merge = __webpack_require__(68);
	var mergeInto = __webpack_require__(103);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var EventInterface = {
	  type: null,
	  target: getEventTarget,
	  // currentTarget is set when dispatching; no use in copying it here
	  currentTarget: emptyFunction.thatReturnsNull,
	  eventPhase: null,
	  bubbles: null,
	  cancelable: null,
	  timeStamp: function(event) {
	    return event.timeStamp || Date.now();
	  },
	  defaultPrevented: null,
	  isTrusted: null
	};
	
	/**
	 * Synthetic events are dispatched by event plugins, typically in response to a
	 * top-level event delegation handler.
	 *
	 * These systems should generally use pooling to reduce the frequency of garbage
	 * collection. The system should check `isPersistent` to determine whether the
	 * event should be released into the pool after being dispatched. Users that
	 * need a persisted event should invoke `persist`.
	 *
	 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
	 * normalizing browser quirks. Subclasses do not necessarily have to implement a
	 * DOM interface; custom application-specific events can also subclass this.
	 *
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 */
	function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  this.dispatchConfig = dispatchConfig;
	  this.dispatchMarker = dispatchMarker;
	  this.nativeEvent = nativeEvent;
	
	  var Interface = this.constructor.Interface;
	  for (var propName in Interface) {
	    if (!Interface.hasOwnProperty(propName)) {
	      continue;
	    }
	    var normalize = Interface[propName];
	    if (normalize) {
	      this[propName] = normalize(nativeEvent);
	    } else {
	      this[propName] = nativeEvent[propName];
	    }
	  }
	
	  var defaultPrevented = nativeEvent.defaultPrevented != null ?
	    nativeEvent.defaultPrevented :
	    nativeEvent.returnValue === false;
	  if (defaultPrevented) {
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  } else {
	    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
	  }
	  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
	}
	
	mergeInto(SyntheticEvent.prototype, {
	
	  preventDefault: function() {
	    this.defaultPrevented = true;
	    var event = this.nativeEvent;
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  },
	
	  stopPropagation: function() {
	    var event = this.nativeEvent;
	    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
	  },
	
	  /**
	   * We release all dispatched `SyntheticEvent`s after each event loop, adding
	   * them back into the pool. This allows a way to hold onto a reference that
	   * won't be added back into the pool.
	   */
	  persist: function() {
	    this.isPersistent = emptyFunction.thatReturnsTrue;
	  },
	
	  /**
	   * Checks if this event should be released back into the pool.
	   *
	   * @return {boolean} True if this should not be released, false otherwise.
	   */
	  isPersistent: emptyFunction.thatReturnsFalse,
	
	  /**
	   * `PooledClass` looks for `destructor` on each instance it releases.
	   */
	  destructor: function() {
	    var Interface = this.constructor.Interface;
	    for (var propName in Interface) {
	      this[propName] = null;
	    }
	    this.dispatchConfig = null;
	    this.dispatchMarker = null;
	    this.nativeEvent = null;
	  }
	
	});
	
	SyntheticEvent.Interface = EventInterface;
	
	/**
	 * Helper to reduce boilerplate when creating subclasses.
	 *
	 * @param {function} Class
	 * @param {?object} Interface
	 */
	SyntheticEvent.augmentClass = function(Class, Interface) {
	  var Super = this;
	
	  var prototype = Object.create(Super.prototype);
	  mergeInto(prototype, Class.prototype);
	  Class.prototype = prototype;
	  Class.prototype.constructor = Class;
	
	  Class.Interface = merge(Super.Interface, Interface);
	  Class.augmentClass = Super.augmentClass;
	
	  PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
	};
	
	PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);
	
	module.exports = SyntheticEvent;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule isTextInputElement
	 */
	
	"use strict";
	
	/**
	 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
	 */
	var supportedInputTypes = {
	  'color': true,
	  'date': true,
	  'datetime': true,
	  'datetime-local': true,
	  'email': true,
	  'month': true,
	  'number': true,
	  'password': true,
	  'range': true,
	  'search': true,
	  'tel': true,
	  'text': true,
	  'time': true,
	  'url': true,
	  'week': true
	};
	
	function isTextInputElement(elem) {
	  return elem && (
	    (elem.nodeName === 'INPUT' && supportedInputTypes[elem.type]) ||
	    elem.nodeName === 'TEXTAREA'
	  );
	}
	
	module.exports = isTextInputElement;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactInputSelection
	 */
	
	"use strict";
	
	var ReactDOMSelection = __webpack_require__(210);
	
	var containsNode = __webpack_require__(133);
	var focusNode = __webpack_require__(211);
	var getActiveElement = __webpack_require__(180);
	
	function isInDocument(node) {
	  return containsNode(document.documentElement, node);
	}
	
	/**
	 * @ReactInputSelection: React input selection module. Based on Selection.js,
	 * but modified to be suitable for react and has a couple of bug fixes (doesn't
	 * assume buttons have range selections allowed).
	 * Input selection module for React.
	 */
	var ReactInputSelection = {
	
	  hasSelectionCapabilities: function(elem) {
	    return elem && (
	      (elem.nodeName === 'INPUT' && elem.type === 'text') ||
	      elem.nodeName === 'TEXTAREA' ||
	      elem.contentEditable === 'true'
	    );
	  },
	
	  getSelectionInformation: function() {
	    var focusedElem = getActiveElement();
	    return {
	      focusedElem: focusedElem,
	      selectionRange:
	          ReactInputSelection.hasSelectionCapabilities(focusedElem) ?
	          ReactInputSelection.getSelection(focusedElem) :
	          null
	    };
	  },
	
	  /**
	   * @restoreSelection: If any selection information was potentially lost,
	   * restore it. This is useful when performing operations that could remove dom
	   * nodes and place them back in, resulting in focus being lost.
	   */
	  restoreSelection: function(priorSelectionInformation) {
	    var curFocusedElem = getActiveElement();
	    var priorFocusedElem = priorSelectionInformation.focusedElem;
	    var priorSelectionRange = priorSelectionInformation.selectionRange;
	    if (curFocusedElem !== priorFocusedElem &&
	        isInDocument(priorFocusedElem)) {
	      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
	        ReactInputSelection.setSelection(
	          priorFocusedElem,
	          priorSelectionRange
	        );
	      }
	      focusNode(priorFocusedElem);
	    }
	  },
	
	  /**
	   * @getSelection: Gets the selection bounds of a focused textarea, input or
	   * contentEditable node.
	   * -@input: Look up selection bounds of this input
	   * -@return {start: selectionStart, end: selectionEnd}
	   */
	  getSelection: function(input) {
	    var selection;
	
	    if ('selectionStart' in input) {
	      // Modern browser with input or textarea.
	      selection = {
	        start: input.selectionStart,
	        end: input.selectionEnd
	      };
	    } else if (document.selection && input.nodeName === 'INPUT') {
	      // IE8 input.
	      var range = document.selection.createRange();
	      // There can only be one selection per document in IE, so it must
	      // be in our element.
	      if (range.parentElement() === input) {
	        selection = {
	          start: -range.moveStart('character', -input.value.length),
	          end: -range.moveEnd('character', -input.value.length)
	        };
	      }
	    } else {
	      // Content editable or old IE textarea.
	      selection = ReactDOMSelection.getOffsets(input);
	    }
	
	    return selection || {start: 0, end: 0};
	  },
	
	  /**
	   * @setSelection: Sets the selection bounds of a textarea or input and focuses
	   * the input.
	   * -@input     Set selection bounds of this input or textarea
	   * -@offsets   Object of same form that is returned from get*
	   */
	  setSelection: function(input, offsets) {
	    var start = offsets.start;
	    var end = offsets.end;
	    if (typeof end === 'undefined') {
	      end = start;
	    }
	
	    if ('selectionStart' in input) {
	      input.selectionStart = start;
	      input.selectionEnd = Math.min(end, input.value.length);
	    } else if (document.selection && input.nodeName === 'INPUT') {
	      var range = input.createTextRange();
	      range.collapse(true);
	      range.moveStart('character', start);
	      range.moveEnd('character', end - start);
	      range.select();
	    } else {
	      ReactDOMSelection.setOffsets(input, offsets);
	    }
	  }
	};
	
	module.exports = ReactInputSelection;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticCompositionEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticEvent = __webpack_require__(165);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
	 */
	var CompositionEventInterface = {
	  data: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticCompositionEvent(
	  dispatchConfig,
	  dispatchMarker,
	  nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticEvent.augmentClass(
	  SyntheticCompositionEvent,
	  CompositionEventInterface
	);
	
	module.exports = SyntheticCompositionEvent;
	


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getTextContentAccessor
	 */
	
	"use strict";
	
	var ExecutionEnvironment = __webpack_require__(61);
	
	var contentKey = null;
	
	/**
	 * Gets the key used to access text content on a DOM node.
	 *
	 * @return {?string} Key used to access text content.
	 * @internal
	 */
	function getTextContentAccessor() {
	  if (!contentKey && ExecutionEnvironment.canUseDOM) {
	    // Prefer textContent to innerText because many browsers support both but
	    // SVG <text> elements don't support innerText even when <div> does.
	    contentKey = 'textContent' in document.documentElement ?
	      'textContent' :
	      'innerText';
	  }
	  return contentKey;
	}
	
	module.exports = getTextContentAccessor;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticMouseEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticUIEvent = __webpack_require__(187);
	var ViewportMetrics = __webpack_require__(161);
	
	var getEventModifierState = __webpack_require__(212);
	
	/**
	 * @interface MouseEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var MouseEventInterface = {
	  screenX: null,
	  screenY: null,
	  clientX: null,
	  clientY: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  getModifierState: getEventModifierState,
	  button: function(event) {
	    // Webkit, Firefox, IE9+
	    // which:  1 2 3
	    // button: 0 1 2 (standard)
	    var button = event.button;
	    if ('which' in event) {
	      return button;
	    }
	    // IE<9
	    // which:  undefined
	    // button: 0 0 0
	    // button: 1 4 2 (onmouseup)
	    return button === 2 ? 2 : button === 4 ? 1 : 0;
	  },
	  buttons: null,
	  relatedTarget: function(event) {
	    return event.relatedTarget || (
	      event.fromElement === event.srcElement ?
	        event.toElement :
	        event.fromElement
	    );
	  },
	  // "Proprietary" Interface.
	  pageX: function(event) {
	    return 'pageX' in event ?
	      event.pageX :
	      event.clientX + ViewportMetrics.currentScrollLeft;
	  },
	  pageY: function(event) {
	    return 'pageY' in event ?
	      event.pageY :
	      event.clientY + ViewportMetrics.currentScrollTop;
	  }
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);
	
	module.exports = SyntheticMouseEvent;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMIDOperations
	 * @typechecks static-only
	 */
	
	/*jslint evil: true */
	
	"use strict";
	
	var CSSPropertyOperations = __webpack_require__(104);
	var DOMChildrenOperations = __webpack_require__(213);
	var DOMPropertyOperations = __webpack_require__(41);
	var ReactMount = __webpack_require__(53);
	var ReactPerf = __webpack_require__(55);
	
	var invariant = __webpack_require__(62);
	var setInnerHTML = __webpack_require__(173);
	
	/**
	 * Errors for properties that should not be updated with `updatePropertyById()`.
	 *
	 * @type {object}
	 * @private
	 */
	var INVALID_PROPERTY_ERRORS = {
	  dangerouslySetInnerHTML:
	    '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
	  style: '`style` must be set using `updateStylesByID()`.'
	};
	
	/**
	 * Operations used to process updates to DOM nodes. This is made injectable via
	 * `ReactComponent.BackendIDOperations`.
	 */
	var ReactDOMIDOperations = {
	
	  /**
	   * Updates a DOM node with new property values. This should only be used to
	   * update DOM properties in `DOMProperty`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} name A valid property name, see `DOMProperty`.
	   * @param {*} value New value of the property.
	   * @internal
	   */
	  updatePropertyByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'updatePropertyByID',
	    function(id, name, value) {
	      var node = ReactMount.getNode(id);
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
	        'updatePropertyByID(...): %s',
	        INVALID_PROPERTY_ERRORS[name]
	      ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
	
	      // If we're updating to null or undefined, we should remove the property
	      // from the DOM node instead of inadvertantly setting to a string. This
	      // brings us in line with the same behavior we have on initial render.
	      if (value != null) {
	        DOMPropertyOperations.setValueForProperty(node, name, value);
	      } else {
	        DOMPropertyOperations.deleteValueForProperty(node, name);
	      }
	    }
	  ),
	
	  /**
	   * Updates a DOM node to remove a property. This should only be used to remove
	   * DOM properties in `DOMProperty`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} name A property name to remove, see `DOMProperty`.
	   * @internal
	   */
	  deletePropertyByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'deletePropertyByID',
	    function(id, name, value) {
	      var node = ReactMount.getNode(id);
	      ("production" !== process.env.NODE_ENV ? invariant(
	        !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
	        'updatePropertyByID(...): %s',
	        INVALID_PROPERTY_ERRORS[name]
	      ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
	      DOMPropertyOperations.deleteValueForProperty(node, name, value);
	    }
	  ),
	
	  /**
	   * Updates a DOM node with new style values. If a value is specified as '',
	   * the corresponding style property will be unset.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {object} styles Mapping from styles to values.
	   * @internal
	   */
	  updateStylesByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'updateStylesByID',
	    function(id, styles) {
	      var node = ReactMount.getNode(id);
	      CSSPropertyOperations.setValueForStyles(node, styles);
	    }
	  ),
	
	  /**
	   * Updates a DOM node's innerHTML.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} html An HTML string.
	   * @internal
	   */
	  updateInnerHTMLByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'updateInnerHTMLByID',
	    function(id, html) {
	      var node = ReactMount.getNode(id);
	      setInnerHTML(node, html);
	    }
	  ),
	
	  /**
	   * Updates a DOM node's text content set by `props.content`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} content Text content.
	   * @internal
	   */
	  updateTextContentByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'updateTextContentByID',
	    function(id, content) {
	      var node = ReactMount.getNode(id);
	      DOMChildrenOperations.updateTextContent(node, content);
	    }
	  ),
	
	  /**
	   * Replaces a DOM node that exists in the document with markup.
	   *
	   * @param {string} id ID of child to be replaced.
	   * @param {string} markup Dangerous markup to inject in place of child.
	   * @internal
	   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
	   */
	  dangerouslyReplaceNodeWithMarkupByID: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'dangerouslyReplaceNodeWithMarkupByID',
	    function(id, markup) {
	      var node = ReactMount.getNode(id);
	      DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
	    }
	  ),
	
	  /**
	   * Updates a component's children by processing a series of updates.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @param {array<string>} markup List of markup strings.
	   * @internal
	   */
	  dangerouslyProcessChildrenUpdates: ReactPerf.measure(
	    'ReactDOMIDOperations',
	    'dangerouslyProcessChildrenUpdates',
	    function(updates, markup) {
	      for (var i = 0; i < updates.length; i++) {
	        updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
	      }
	      DOMChildrenOperations.processUpdates(updates, markup);
	    }
	  )
	};
	
	module.exports = ReactDOMIDOperations;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactReconcileTransaction
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var CallbackQueue = __webpack_require__(145);
	var PooledClass = __webpack_require__(88);
	var ReactBrowserEventEmitter = __webpack_require__(106);
	var ReactInputSelection = __webpack_require__(167);
	var ReactPutListenerQueue = __webpack_require__(146);
	var Transaction = __webpack_require__(147);
	
	var mixInto = __webpack_require__(99);
	
	/**
	 * Ensures that, when possible, the selection range (currently selected text
	 * input) is not disturbed by performing the transaction.
	 */
	var SELECTION_RESTORATION = {
	  /**
	   * @return {Selection} Selection information.
	   */
	  initialize: ReactInputSelection.getSelectionInformation,
	  /**
	   * @param {Selection} sel Selection information returned from `initialize`.
	   */
	  close: ReactInputSelection.restoreSelection
	};
	
	/**
	 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
	 * high level DOM manipulations (like temporarily removing a text input from the
	 * DOM).
	 */
	var EVENT_SUPPRESSION = {
	  /**
	   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
	   * the reconciliation.
	   */
	  initialize: function() {
	    var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
	    ReactBrowserEventEmitter.setEnabled(false);
	    return currentlyEnabled;
	  },
	
	  /**
	   * @param {boolean} previouslyEnabled Enabled status of
	   *   `ReactBrowserEventEmitter` before the reconciliation occured. `close`
	   *   restores the previous value.
	   */
	  close: function(previouslyEnabled) {
	    ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
	  }
	};
	
	/**
	 * Provides a queue for collecting `componentDidMount` and
	 * `componentDidUpdate` callbacks during the the transaction.
	 */
	var ON_DOM_READY_QUEUEING = {
	  /**
	   * Initializes the internal `onDOMReady` queue.
	   */
	  initialize: function() {
	    this.reactMountReady.reset();
	  },
	
	  /**
	   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
	   */
	  close: function() {
	    this.reactMountReady.notifyAll();
	  }
	};
	
	var PUT_LISTENER_QUEUEING = {
	  initialize: function() {
	    this.putListenerQueue.reset();
	  },
	
	  close: function() {
	    this.putListenerQueue.putListeners();
	  }
	};
	
	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */
	var TRANSACTION_WRAPPERS = [
	  PUT_LISTENER_QUEUEING,
	  SELECTION_RESTORATION,
	  EVENT_SUPPRESSION,
	  ON_DOM_READY_QUEUEING
	];
	
	/**
	 * Currently:
	 * - The order that these are listed in the transaction is critical:
	 * - Suppresses events.
	 * - Restores selection range.
	 *
	 * Future:
	 * - Restore document/overflow scroll positions that were unintentionally
	 *   modified via DOM insertions above the top viewport boundary.
	 * - Implement/integrate with customized constraint based layout system and keep
	 *   track of which dimensions must be remeasured.
	 *
	 * @class ReactReconcileTransaction
	 */
	function ReactReconcileTransaction() {
	  this.reinitializeTransaction();
	  // Only server-side rendering really needs this option (see
	  // `ReactServerRendering`), but server-side uses
	  // `ReactServerRenderingTransaction` instead. This option is here so that it's
	  // accessible and defaults to false when `ReactDOMComponent` and
	  // `ReactTextComponent` checks it in `mountComponent`.`
	  this.renderToStaticMarkup = false;
	  this.reactMountReady = CallbackQueue.getPooled(null);
	  this.putListenerQueue = ReactPutListenerQueue.getPooled();
	}
	
	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array<object>} List of operation wrap proceedures.
	   *   TODO: convert to array<TransactionWrapper>
	   */
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  },
	
	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function() {
	    return this.reactMountReady;
	  },
	
	  getPutListenerQueue: function() {
	    return this.putListenerQueue;
	  },
	
	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be resused.
	   */
	  destructor: function() {
	    CallbackQueue.release(this.reactMountReady);
	    this.reactMountReady = null;
	
	    ReactPutListenerQueue.release(this.putListenerQueue);
	    this.putListenerQueue = null;
	  }
	};
	
	
	mixInto(ReactReconcileTransaction, Transaction.Mixin);
	mixInto(ReactReconcileTransaction, Mixin);
	
	PooledClass.addPoolingTo(ReactReconcileTransaction);
	
	module.exports = ReactReconcileTransaction;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule setInnerHTML
	 */
	
	"use strict";
	
	var ExecutionEnvironment = __webpack_require__(61);
	
	/**
	 * Set the innerHTML property of a node, ensuring that whitespace is preserved
	 * even in IE8.
	 *
	 * @param {DOMElement} node
	 * @param {string} html
	 * @internal
	 */
	var setInnerHTML = function(node, html) {
	  node.innerHTML = html;
	};
	
	if (ExecutionEnvironment.canUseDOM) {
	  // IE8: When updating a just created node with innerHTML only leading
	  // whitespace is removed. When updating an existing node with innerHTML
	  // whitespace in root TextNodes is also collapsed.
	  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html
	
	  // Feature detection; only IE8 is known to behave improperly like this.
	  var testElement = document.createElement('div');
	  testElement.innerHTML = ' ';
	  if (testElement.innerHTML === '') {
	    setInnerHTML = function(node, html) {
	      // Magic theory: IE8 supposedly differentiates between added and updated
	      // nodes when processing innerHTML, innerHTML on updated nodes suffers
	      // from worse whitespace behavior. Re-adding a node like this triggers
	      // the initial and more favorable whitespace behavior.
	      // TODO: What to do on a detached node?
	      if (node.parentNode) {
	        node.parentNode.replaceChild(node, node);
	      }
	
	      // We also implement a workaround for non-visible tags disappearing into
	      // thin air on IE8, this only happens if there is no visible text
	      // in-front of the non-visible tags. Piggyback on the whitespace fix
	      // and simply check if any non-visible tags appear in the source.
	      if (html.match(/^[ \r\n\t\f]/) ||
	          html[0] === '<' && (
	            html.indexOf('<noscript') !== -1 ||
	            html.indexOf('<script') !== -1 ||
	            html.indexOf('<style') !== -1 ||
	            html.indexOf('<meta') !== -1 ||
	            html.indexOf('<link') !== -1)) {
	        // Recover leading whitespace by temporarily prepending any character.
	        // \uFEFF has the potential advantage of being zero-width/invisible.
	        node.innerHTML = '\uFEFF' + html;
	
	        // deleteData leaves an empty `TextNode` which offsets the index of all
	        // children. Definitely want to avoid this.
	        var textNode = node.firstChild;
	        if (textNode.data.length === 1) {
	          node.removeChild(textNode);
	        } else {
	          textNode.deleteData(0, 1);
	        }
	      } else {
	        node.innerHTML = html;
	      }
	    };
	  }
	}
	
	module.exports = setInnerHTML;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule AutoFocusMixin
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var focusNode = __webpack_require__(211);
	
	var AutoFocusMixin = {
	  componentDidMount: function() {
	    if (this.props.autoFocus) {
	      focusNode(this.getDOMNode());
	    }
	  }
	};
	
	module.exports = AutoFocusMixin;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule LocalEventTrapMixin
	 */
	
	"use strict";
	
	var ReactBrowserEventEmitter = __webpack_require__(106);
	
	var accumulate = __webpack_require__(208);
	var forEachAccumulated = __webpack_require__(209);
	var invariant = __webpack_require__(62);
	
	function remove(event) {
	  event.remove();
	}
	
	var LocalEventTrapMixin = {
	  trapBubbledEvent:function(topLevelType, handlerBaseName) {
	    ("production" !== process.env.NODE_ENV ? invariant(this.isMounted(), 'Must be mounted to trap events') : invariant(this.isMounted()));
	    var listener = ReactBrowserEventEmitter.trapBubbledEvent(
	      topLevelType,
	      handlerBaseName,
	      this.getDOMNode()
	    );
	    this._localEventListeners = accumulate(this._localEventListeners, listener);
	  },
	
	  // trapCapturedEvent would look nearly identical. We don't implement that
	  // method because it isn't currently needed.
	
	  componentWillUnmount:function() {
	    if (this._localEventListeners) {
	      forEachAccumulated(this._localEventListeners, remove);
	    }
	  }
	};
	
	module.exports = LocalEventTrapMixin;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule LinkedValueUtils
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var ReactPropTypes = __webpack_require__(56);
	
	var invariant = __webpack_require__(62);
	
	var hasReadOnlyValue = {
	  'button': true,
	  'checkbox': true,
	  'image': true,
	  'hidden': true,
	  'radio': true,
	  'reset': true,
	  'submit': true
	};
	
	function _assertSingleLink(input) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    input.props.checkedLink == null || input.props.valueLink == null,
	    'Cannot provide a checkedLink and a valueLink. If you want to use ' +
	    'checkedLink, you probably don\'t want to use valueLink and vice versa.'
	  ) : invariant(input.props.checkedLink == null || input.props.valueLink == null));
	}
	function _assertValueLink(input) {
	  _assertSingleLink(input);
	  ("production" !== process.env.NODE_ENV ? invariant(
	    input.props.value == null && input.props.onChange == null,
	    'Cannot provide a valueLink and a value or onChange event. If you want ' +
	    'to use value or onChange, you probably don\'t want to use valueLink.'
	  ) : invariant(input.props.value == null && input.props.onChange == null));
	}
	
	function _assertCheckedLink(input) {
	  _assertSingleLink(input);
	  ("production" !== process.env.NODE_ENV ? invariant(
	    input.props.checked == null && input.props.onChange == null,
	    'Cannot provide a checkedLink and a checked property or onChange event. ' +
	    'If you want to use checked or onChange, you probably don\'t want to ' +
	    'use checkedLink'
	  ) : invariant(input.props.checked == null && input.props.onChange == null));
	}
	
	/**
	 * @param {SyntheticEvent} e change event to handle
	 */
	function _handleLinkedValueChange(e) {
	  /*jshint validthis:true */
	  this.props.valueLink.requestChange(e.target.value);
	}
	
	/**
	  * @param {SyntheticEvent} e change event to handle
	  */
	function _handleLinkedCheckChange(e) {
	  /*jshint validthis:true */
	  this.props.checkedLink.requestChange(e.target.checked);
	}
	
	/**
	 * Provide a linked `value` attribute for controlled forms. You should not use
	 * this outside of the ReactDOM controlled form components.
	 */
	var LinkedValueUtils = {
	  Mixin: {
	    propTypes: {
	      value: function(props, propName, componentName) {
	        if (!props[propName] ||
	            hasReadOnlyValue[props.type] ||
	            props.onChange ||
	            props.readOnly ||
	            props.disabled) {
	          return;
	        }
	        return new Error(
	          'You provided a `value` prop to a form field without an ' +
	          '`onChange` handler. This will render a read-only field. If ' +
	          'the field should be mutable use `defaultValue`. Otherwise, ' +
	          'set either `onChange` or `readOnly`.'
	        );
	      },
	      checked: function(props, propName, componentName) {
	        if (!props[propName] ||
	            props.onChange ||
	            props.readOnly ||
	            props.disabled) {
	          return;
	        }
	        return new Error(
	          'You provided a `checked` prop to a form field without an ' +
	          '`onChange` handler. This will render a read-only field. If ' +
	          'the field should be mutable use `defaultChecked`. Otherwise, ' +
	          'set either `onChange` or `readOnly`.'
	        );
	      },
	      onChange: ReactPropTypes.func
	    }
	  },
	
	  /**
	   * @param {ReactComponent} input Form component
	   * @return {*} current value of the input either from value prop or link.
	   */
	  getValue: function(input) {
	    if (input.props.valueLink) {
	      _assertValueLink(input);
	      return input.props.valueLink.value;
	    }
	    return input.props.value;
	  },
	
	  /**
	   * @param {ReactComponent} input Form component
	   * @return {*} current checked status of the input either from checked prop
	   *             or link.
	   */
	  getChecked: function(input) {
	    if (input.props.checkedLink) {
	      _assertCheckedLink(input);
	      return input.props.checkedLink.value;
	    }
	    return input.props.checked;
	  },
	
	  /**
	   * @param {ReactComponent} input Form component
	   * @return {function} change callback either from onChange prop or link.
	   */
	  getOnChange: function(input) {
	    if (input.props.valueLink) {
	      _assertValueLink(input);
	      return _handleLinkedValueChange;
	    } else if (input.props.checkedLink) {
	      _assertCheckedLink(input);
	      return _handleLinkedCheckChange;
	    }
	    return input.props.onChange;
	  }
	};
	
	module.exports = LinkedValueUtils;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * @providesModule EventListener
	 * @typechecks
	 */
	
	var emptyFunction = __webpack_require__(137);
	
	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },
	
	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function(target, eventType, callback) {
	    if (!target.addEventListener) {
	      if ("production" !== process.env.NODE_ENV) {
	        console.error(
	          'Attempted to listen to events during the capture phase on a ' +
	          'browser that does not support the capture phase. Your application ' +
	          'will not receive some events.'
	        );
	      }
	      return {
	        remove: emptyFunction
	      };
	    } else {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    }
	  },
	
	  registerDefault: function() {}
	};
	
	module.exports = EventListener;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getEventTarget
	 * @typechecks static-only
	 */
	
	"use strict";
	
	/**
	 * Gets the target node from a native browser event by accounting for
	 * inconsistencies in browser DOM APIs.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {DOMEventTarget} Target node.
	 */
	function getEventTarget(nativeEvent) {
	  var target = nativeEvent.target || nativeEvent.srcElement || window;
	  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
	  // @see http://www.quirksmode.org/js/events_properties.html
	  return target.nodeType === 3 ? target.parentNode : target;
	}
	
	module.exports = getEventTarget;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getUnboundedScrollPosition
	 * @typechecks
	 */
	
	"use strict";
	
	/**
	 * Gets the scroll position of the supplied element or window.
	 *
	 * The return values are unbounded, unlike `getScrollPosition`. This means they
	 * may be negative or exceed the element boundaries (which is possible using
	 * inertial scrolling).
	 *
	 * @param {DOMWindow|DOMElement} scrollable
	 * @return {object} Map with `x` and `y` keys.
	 */
	function getUnboundedScrollPosition(scrollable) {
	  if (scrollable === window) {
	    return {
	      x: window.pageXOffset || document.documentElement.scrollLeft,
	      y: window.pageYOffset || document.documentElement.scrollTop
	    };
	  }
	  return {
	    x: scrollable.scrollLeft,
	    y: scrollable.scrollTop
	  };
	}
	
	module.exports = getUnboundedScrollPosition;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getActiveElement
	 * @typechecks
	 */
	
	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document body is not yet defined.
	 */
	function getActiveElement() /*?DOMElement*/ {
	  try {
	    return document.activeElement || document.body;
	  } catch (e) {
	    return document.body;
	  }
	}
	
	module.exports = getActiveElement;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule shallowEqual
	 */
	
	"use strict";
	
	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B'a keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = shallowEqual;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticClipboardEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticEvent = __webpack_require__(165);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/clipboard-apis/
	 */
	var ClipboardEventInterface = {
	  clipboardData: function(event) {
	    return (
	      'clipboardData' in event ?
	        event.clipboardData :
	        window.clipboardData
	    );
	  }
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);
	
	module.exports = SyntheticClipboardEvent;
	


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticFocusEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticUIEvent = __webpack_require__(187);
	
	/**
	 * @interface FocusEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var FocusEventInterface = {
	  relatedTarget: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);
	
	module.exports = SyntheticFocusEvent;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticKeyboardEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticUIEvent = __webpack_require__(187);
	
	var getEventKey = __webpack_require__(214);
	var getEventModifierState = __webpack_require__(212);
	
	/**
	 * @interface KeyboardEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var KeyboardEventInterface = {
	  key: getEventKey,
	  location: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  repeat: null,
	  locale: null,
	  getModifierState: getEventModifierState,
	  // Legacy Interface
	  charCode: function(event) {
	    // `charCode` is the result of a KeyPress event and represents the value of
	    // the actual printable character.
	
	    // KeyPress is deprecated but its replacement is not yet final and not
	    // implemented in any major browser.
	    if (event.type === 'keypress') {
	      // IE8 does not implement "charCode", but "keyCode" has the correct value.
	      return 'charCode' in event ? event.charCode : event.keyCode;
	    }
	    return 0;
	  },
	  keyCode: function(event) {
	    // `keyCode` is the result of a KeyDown/Up event and represents the value of
	    // physical keyboard key.
	
	    // The actual meaning of the value depends on the users' keyboard layout
	    // which cannot be detected. Assuming that it is a US keyboard layout
	    // provides a surprisingly accurate mapping for US and European users.
	    // Due to this, it is left to the user to implement at this time.
	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }
	    return 0;
	  },
	  which: function(event) {
	    // `which` is an alias for either `keyCode` or `charCode` depending on the
	    // type of the event. There is no need to determine the type of the event
	    // as `keyCode` and `charCode` are either aliased or default to zero.
	    return event.keyCode || event.charCode;
	  }
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);
	
	module.exports = SyntheticKeyboardEvent;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticDragEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticMouseEvent = __webpack_require__(170);
	
	/**
	 * @interface DragEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var DragEventInterface = {
	  dataTransfer: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);
	
	module.exports = SyntheticDragEvent;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticTouchEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticUIEvent = __webpack_require__(187);
	
	var getEventModifierState = __webpack_require__(212);
	
	/**
	 * @interface TouchEvent
	 * @see http://www.w3.org/TR/touch-events/
	 */
	var TouchEventInterface = {
	  touches: null,
	  targetTouches: null,
	  changedTouches: null,
	  altKey: null,
	  metaKey: null,
	  ctrlKey: null,
	  shiftKey: null,
	  getModifierState: getEventModifierState
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);
	
	module.exports = SyntheticTouchEvent;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticUIEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticEvent = __webpack_require__(165);
	
	var getEventTarget = __webpack_require__(178);
	
	/**
	 * @interface UIEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var UIEventInterface = {
	  view: function(event) {
	    if (event.view) {
	      return event.view;
	    }
	
	    var target = getEventTarget(event);
	    if (target != null && target.window === target) {
	      // target is a window object
	      return target;
	    }
	
	    var doc = target.ownerDocument;
	    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
	    if (doc) {
	      return doc.defaultView || doc.parentWindow;
	    } else {
	      return window;
	    }
	  },
	  detail: function(event) {
	    return event.detail || 0;
	  }
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */
	function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);
	
	module.exports = SyntheticUIEvent;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticWheelEvent
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var SyntheticMouseEvent = __webpack_require__(170);
	
	/**
	 * @interface WheelEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var WheelEventInterface = {
	  deltaX: function(event) {
	    return (
	      'deltaX' in event ? event.deltaX :
	      // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
	      'wheelDeltaX' in event ? -event.wheelDeltaX : 0
	    );
	  },
	  deltaY: function(event) {
	    return (
	      'deltaY' in event ? event.deltaY :
	      // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
	      'wheelDeltaY' in event ? -event.wheelDeltaY :
	      // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
	      'wheelDelta' in event ? -event.wheelDelta : 0
	    );
	  },
	  deltaZ: null,
	
	  // Browsers without "deltaMode" is reporting in raw wheel delta where one
	  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
	  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
	  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
	  deltaMode: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticMouseEvent}
	 */
	function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}
	
	SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);
	
	module.exports = SyntheticWheelEvent;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDefaultPerfAnalysis
	 */
	
	var merge = __webpack_require__(68);
	
	// Don't try to save users less than 1.2ms (a number I made up)
	var DONT_CARE_THRESHOLD = 1.2;
	var DOM_OPERATION_TYPES = {
	  'mountImageIntoNode': 'set innerHTML',
	  INSERT_MARKUP: 'set innerHTML',
	  MOVE_EXISTING: 'move',
	  REMOVE_NODE: 'remove',
	  TEXT_CONTENT: 'set textContent',
	  'updatePropertyByID': 'update attribute',
	  'deletePropertyByID': 'delete attribute',
	  'updateStylesByID': 'update styles',
	  'updateInnerHTMLByID': 'set innerHTML',
	  'dangerouslyReplaceNodeWithMarkupByID': 'replace'
	};
	
	function getTotalTime(measurements) {
	  // TODO: return number of DOM ops? could be misleading.
	  // TODO: measure dropped frames after reconcile?
	  // TODO: log total time of each reconcile and the top-level component
	  // class that triggered it.
	  var totalTime = 0;
	  for (var i = 0; i < measurements.length; i++) {
	    var measurement = measurements[i];
	    totalTime += measurement.totalTime;
	  }
	  return totalTime;
	}
	
	function getDOMSummary(measurements) {
	  var items = [];
	  for (var i = 0; i < measurements.length; i++) {
	    var measurement = measurements[i];
	    var id;
	
	    for (id in measurement.writes) {
	      measurement.writes[id].forEach(function(write) {
	        items.push({
	          id: id,
	          type: DOM_OPERATION_TYPES[write.type] || write.type,
	          args: write.args
	        });
	      });
	    }
	  }
	  return items;
	}
	
	function getExclusiveSummary(measurements) {
	  var candidates = {};
	  var displayName;
	
	  for (var i = 0; i < measurements.length; i++) {
	    var measurement = measurements[i];
	    var allIDs = merge(measurement.exclusive, measurement.inclusive);
	
	    for (var id in allIDs) {
	      displayName = measurement.displayNames[id].current;
	
	      candidates[displayName] = candidates[displayName] || {
	        componentName: displayName,
	        inclusive: 0,
	        exclusive: 0,
	        render: 0,
	        count: 0
	      };
	      if (measurement.render[id]) {
	        candidates[displayName].render += measurement.render[id];
	      }
	      if (measurement.exclusive[id]) {
	        candidates[displayName].exclusive += measurement.exclusive[id];
	      }
	      if (measurement.inclusive[id]) {
	        candidates[displayName].inclusive += measurement.inclusive[id];
	      }
	      if (measurement.counts[id]) {
	        candidates[displayName].count += measurement.counts[id];
	      }
	    }
	  }
	
	  // Now make a sorted array with the results.
	  var arr = [];
	  for (displayName in candidates) {
	    if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
	      arr.push(candidates[displayName]);
	    }
	  }
	
	  arr.sort(function(a, b) {
	    return b.exclusive - a.exclusive;
	  });
	
	  return arr;
	}
	
	function getInclusiveSummary(measurements, onlyClean) {
	  var candidates = {};
	  var inclusiveKey;
	
	  for (var i = 0; i < measurements.length; i++) {
	    var measurement = measurements[i];
	    var allIDs = merge(measurement.exclusive, measurement.inclusive);
	    var cleanComponents;
	
	    if (onlyClean) {
	      cleanComponents = getUnchangedComponents(measurement);
	    }
	
	    for (var id in allIDs) {
	      if (onlyClean && !cleanComponents[id]) {
	        continue;
	      }
	
	      var displayName = measurement.displayNames[id];
	
	      // Inclusive time is not useful for many components without knowing where
	      // they are instantiated. So we aggregate inclusive time with both the
	      // owner and current displayName as the key.
	      inclusiveKey = displayName.owner + ' > ' + displayName.current;
	
	      candidates[inclusiveKey] = candidates[inclusiveKey] || {
	        componentName: inclusiveKey,
	        time: 0,
	        count: 0
	      };
	
	      if (measurement.inclusive[id]) {
	        candidates[inclusiveKey].time += measurement.inclusive[id];
	      }
	      if (measurement.counts[id]) {
	        candidates[inclusiveKey].count += measurement.counts[id];
	      }
	    }
	  }
	
	  // Now make a sorted array with the results.
	  var arr = [];
	  for (inclusiveKey in candidates) {
	    if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
	      arr.push(candidates[inclusiveKey]);
	    }
	  }
	
	  arr.sort(function(a, b) {
	    return b.time - a.time;
	  });
	
	  return arr;
	}
	
	function getUnchangedComponents(measurement) {
	  // For a given reconcile, look at which components did not actually
	  // render anything to the DOM and return a mapping of their ID to
	  // the amount of time it took to render the entire subtree.
	  var cleanComponents = {};
	  var dirtyLeafIDs = Object.keys(measurement.writes);
	  var allIDs = merge(measurement.exclusive, measurement.inclusive);
	
	  for (var id in allIDs) {
	    var isDirty = false;
	    // For each component that rendered, see if a component that triggerd
	    // a DOM op is in its subtree.
	    for (var i = 0; i < dirtyLeafIDs.length; i++) {
	      if (dirtyLeafIDs[i].indexOf(id) === 0) {
	        isDirty = true;
	        break;
	      }
	    }
	    if (!isDirty && measurement.counts[id] > 0) {
	      cleanComponents[id] = true;
	    }
	  }
	  return cleanComponents;
	}
	
	var ReactDefaultPerfAnalysis = {
	  getExclusiveSummary: getExclusiveSummary,
	  getInclusiveSummary: getInclusiveSummary,
	  getDOMSummary: getDOMSummary,
	  getTotalTime: getTotalTime
	};
	
	module.exports = ReactDefaultPerfAnalysis;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule performanceNow
	 * @typechecks
	 */
	
	var performance = __webpack_require__(215);
	
	/**
	 * Detect if we can use `window.performance.now()` and gracefully fallback to
	 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
	 * because of Facebook's testing infrastructure.
	 */
	if (!performance || !performance.now) {
	  performance = Date;
	}
	
	var performanceNow = performance.now.bind(performance);
	
	module.exports = performanceNow;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule isTextNode
	 * @typechecks
	 */
	
	var isNode = __webpack_require__(216);
	
	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */
	function isTextNode(object) {
	  return isNode(object) && object.nodeType == 3;
	}
	
	module.exports = isTextNode;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var invariant = __webpack_require__(62);
	var EventEmitter = __webpack_require__(230).EventEmitter;
	var LocationActions = __webpack_require__(196);
	
	var CHANGE_EVENT = 'change';
	var _events = new EventEmitter;
	
	function notifyChange() {
	  _events.emit(CHANGE_EVENT);
	}
	
	var _currentLocation, _currentActionType;
	var _currentPath = '/';
	
	function handleLocationChangeAction(action) {
	  if (_currentPath !== action.path) {
	    _currentPath = action.path;
	    _currentActionType = action.type;
	    notifyChange();
	  }
	}
	
	/**
	 * The PathStore keeps track of the current URL path.
	 */
	var PathStore = {
	
	  addChangeListener: function (listener) {
	    _events.addListener(CHANGE_EVENT, listener);
	  },
	
	  removeChangeListener: function (listener) {
	    _events.removeListener(CHANGE_EVENT, listener);
	  },
	
	  removeAllChangeListeners: function () {
	    _events.removeAllListeners(CHANGE_EVENT);
	  },
	
	  /**
	   * Setup the PathStore to use the given location.
	   */
	  setup: function (location) {
	    invariant(
	      _currentLocation == null || _currentLocation === location,
	      'You cannot use %s and %s on the same page',
	      _currentLocation, location
	    );
	
	    if (_currentLocation !== location) {
	      if (location.setup)
	        location.setup(handleLocationChangeAction);
	
	      _currentPath = location.getCurrentPath();
	    }
	
	    _currentLocation = location;
	  },
	
	  /**
	   * Tear down the PathStore. Really only used for testing.
	   */
	  teardown: function () {
	    if (_currentLocation && _currentLocation.teardown)
	      _currentLocation.teardown();
	
	    _currentLocation = _currentActionType = null;
	    _currentPath = '/';
	
	    PathStore.removeAllChangeListeners();
	  },
	
	  /**
	   * Returns the current URL path.
	   */
	  getCurrentPath: function () {
	    return _currentPath;
	  },
	
	  /**
	   * Returns the type of the action that changed the URL.
	   */
	  getCurrentActionType: function () {
	    return _currentActionType;
	  }
	
	};
	
	module.exports = PathStore;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var LocationActions = __webpack_require__(196);
	
	/**
	 * A scroll behavior that attempts to imitate the default behavior
	 * of modern browsers.
	 */
	var ImitateBrowserBehavior = {
	
	  updateScrollPosition: function (position, actionType) {
	    switch (actionType) {
	      case LocationActions.PUSH:
	      case LocationActions.REPLACE:
	        window.scrollTo(0, 0);
	        break;
	      case LocationActions.POP:
	        if (position) {
	          window.scrollTo(position.x, position.y);
	        } else {
	          window.scrollTo(0, 0);
	        }
	        break;
	    }
	  }
	
	};
	
	module.exports = ImitateBrowserBehavior;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A scroll behavior that always scrolls to the top of the page
	 * after a transition.
	 */
	var ScrollToTopBehavior = {
	
	  updateScrollPosition: function () {
	    window.scrollTo(0, 0);
	  }
	
	};
	
	module.exports = ScrollToTopBehavior;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Returns the current URL path from `window.location`, including query string
	 */
	function getWindowPath() {
	  return window.location.pathname + window.location.search;
	}
	
	module.exports = getWindowPath;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Actions that modify the URL.
	 */
	var LocationActions = {
	
	  /**
	   * Indicates a new location is being pushed to the history stack.
	   */
	  PUSH: 'push',
	
	  /**
	   * Indicates the current location should be replaced.
	   */
	  REPLACE: 'replace',
	
	  /**
	   * Indicates the most recent entry should be removed from the history stack.
	   */
	  POP: 'pop'
	
	};
	
	module.exports = LocationActions;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(232);


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Load modules
	
	
	// Declare internals
	
	var internals = {};
	
	
	exports.arrayToObject = function (source) {
	
	    var obj = {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {
	
	            obj[i] = source[i];
	        }
	    }
	
	    return obj;
	};
	
	
	exports.merge = function (target, source) {
	
	    if (!source) {
	        return target;
	    }
	
	    if (Array.isArray(source)) {
	        for (var i = 0, il = source.length; i < il; ++i) {
	            if (typeof source[i] !== 'undefined') {
	                if (typeof target[i] === 'object') {
	                    target[i] = exports.merge(target[i], source[i]);
	                }
	                else {
	                    target[i] = source[i];
	                }
	            }
	        }
	
	        return target;
	    }
	
	    if (Array.isArray(target)) {
	        if (typeof source !== 'object') {
	            target.push(source);
	            return target;
	        }
	        else {
	            target = exports.arrayToObject(target);
	        }
	    }
	
	    var keys = Object.keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];
	
	        if (value &&
	            typeof value === 'object') {
	
	            if (!target[key]) {
	                target[key] = value;
	            }
	            else {
	                target[key] = exports.merge(target[key], value);
	            }
	        }
	        else {
	            target[key] = value;
	        }
	    }
	
	    return target;
	};
	
	
	exports.decode = function (str) {
	
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};
	
	
	exports.compact = function (obj, refs) {
	
	    if (typeof obj !== 'object' ||
	        obj === null) {
	
	        return obj;
	    }
	
	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }
	
	    refs.push(obj);
	
	    if (Array.isArray(obj)) {
	        var compacted = [];
	
	        for (var i = 0, l = obj.length; i < l; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }
	
	        return compacted;
	    }
	
	    var keys = Object.keys(obj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }
	
	    return obj;
	};
	
	
	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	
	exports.isBuffer = function (obj) {
	
	    if (typeof Buffer !== 'undefined') {
	        return Buffer.isBuffer(obj);
	    }
	    else {
	        return false;
	    }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(233).Buffer))

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DragDropDispatcher = __webpack_require__(226),
	    DragDropActionTypes = __webpack_require__(225);
	
	var DragDropActionCreators = {
	  startDragging:function(itemType, item) {
	    DragDropDispatcher.handleAction({
	      type: DragDropActionTypes.DRAG_START,
	      itemType: itemType,
	      item: item
	    });
	  },
	
	  recordDrop:function() {
	    DragDropDispatcher.handleAction({
	      type: DragDropActionTypes.DROP
	    });
	  },
	
	  endDragging:function() {
	    DragDropDispatcher.handleAction({
	      type: DragDropActionTypes.DRAG_END
	    });
	  }
	};
	
	module.exports = DragDropActionCreators;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DragDropDispatcher = __webpack_require__(226),
	    DragDropActionTypes = __webpack_require__(225),
	    createStore = __webpack_require__(227);
	
	var _draggedItem = null,
	    _draggedItemType = null,
	    _didDrop = false;
	
	var DragDropStore = createStore({
	  isDragging:function() {
	    return !!_draggedItem;
	  },
	
	  didDrop:function() {
	    return _didDrop;
	  },
	
	  getDraggedItem:function() {
	    return _draggedItem;
	  },
	
	  getDraggedItemType:function() {
	    return _draggedItemType;
	  }
	});
	
	DragDropDispatcher.register(function (payload) {
	  var $__0=    payload,action=$__0.action;
	
	  switch (action.type) {
	  case DragDropActionTypes.DRAG_START:
	    _didDrop = false;
	    _draggedItem = action.item;
	    _draggedItemType = action.itemType;
	    DragDropStore.emitChange();
	    break;
	
	  case DragDropActionTypes.DROP:
	    _didDrop = true;
	    DragDropStore.emitChange();
	    break;
	
	  case DragDropActionTypes.DRAG_END:
	    _didDrop = false;
	    _draggedItem = null;
	    _draggedItemType = null;
	    DragDropStore.emitChange();
	    break;
	  }
	});
	
	module.exports = DragDropStore;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DragDropActionCreators = __webpack_require__(199),
	    NativeDragItemTypes = __webpack_require__(142),
	    EnterLeaveMonitor = __webpack_require__(202),
	    isFileDragDropEvent = __webpack_require__(204),
	    shallowEqual = __webpack_require__(181),
	    union = __webpack_require__(222),
	    without = __webpack_require__(223),
	    isWebkit = __webpack_require__(217),
	    isFirefox = __webpack_require__(218);
	
	// Store global state for browser-specific fixes and workarounds
	var _monitor = new EnterLeaveMonitor(),
	    _currentDragTarget,
	    _initialDragTargetRect,
	    _imitateCurrentDragEnd,
	    _dragTargetRectDidChange,
	    _lastDragSourceCheckTimeout;
	
	function getElementRect(el) {
	  var rect = el.getBoundingClientRect();
	  // Copy so object doesn't get reused
	  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
	}
	
	function checkIfCurrentDragTargetRectChanged() {
	  if (!_dragTargetRectDidChange) {
	    var currentRect = getElementRect(_currentDragTarget);
	    _dragTargetRectDidChange = !shallowEqual(_initialDragTargetRect, currentRect);
	  }
	
	  return _dragTargetRectDidChange;
	}
	
	function triggerDragEndIfDragSourceWasRemovedFromDOM() {
	  if (_currentDragTarget &&
	      _imitateCurrentDragEnd &&
	      !document.contains(_currentDragTarget)) {
	
	    _imitateCurrentDragEnd();
	  }
	}
	
	if (typeof window !== 'undefined') {
	  window.addEventListener('dragenter', function (e) {
	    var isFirstEnter = _monitor.enter(e.target);
	
	    if (isFirstEnter && isFileDragDropEvent(e)) {
	      DragDropActionCreators.startDragging(NativeDragItemTypes.FILE, null);
	    }
	  });
	
	  window.addEventListener('dragover', function (e) {
	    if (!_currentDragTarget) {
	      return;
	    }
	
	    if (isWebkit() && checkIfCurrentDragTargetRectChanged()) {
	      // Prevent animating to incorrect position
	      e.preventDefault();
	    } else if (isFirefox()) {
	
	      // Firefox won't trigger a global `drop` if source node was removed.
	      // It won't trigger `mouseup` either. It *will* however trigger `dragover`
	      // continually during drag, so our strategy is to simply wait until `dragover`
	      // has stopped firing.
	
	      clearTimeout(_lastDragSourceCheckTimeout);
	      _lastDragSourceCheckTimeout = setTimeout(
	        triggerDragEndIfDragSourceWasRemovedFromDOM,
	        140 // 70 seems enough on OS X with FF33, double it to be sure
	      );
	    }
	  });
	
	  window.addEventListener('dragleave', function (e) {
	    var isLastLeave = _monitor.leave(e.target);
	
	    if (isLastLeave && isFileDragDropEvent(e)) {
	      DragDropActionCreators.endDragging();
	    }
	  });
	
	  window.addEventListener('drop', function (e) {
	    _monitor.reset();
	
	    if (isFileDragDropEvent(e)) {
	      DragDropActionCreators.endDragging();
	    } else if (!isFirefox()) {
	      triggerDragEndIfDragSourceWasRemovedFromDOM();
	    }
	  });
	}
	
	var NativeDragDropSupport = {
	  handleDragStart:function(dragTarget, imitateDragEnd) {
	    _currentDragTarget = dragTarget;
	    _initialDragTargetRect = getElementRect(dragTarget);
	    _dragTargetRectDidChange = false;
	    _imitateCurrentDragEnd = imitateDragEnd;
	  },
	
	  handleDragEnd:function() {
	    _currentDragTarget = null;
	    _initialDragTargetRect = null;
	    _dragTargetRectDidChange = false;
	    _imitateCurrentDragEnd = null;
	  }
	};
	
	module.exports = NativeDragDropSupport;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var union = __webpack_require__(222),
	    without = __webpack_require__(223);
	
	
	  function EnterLeaveMonitor() {
	    this.$EnterLeaveMonitor_entered = [];
	  }
	
	  EnterLeaveMonitor.prototype.enter=function(enteringNode) {
	    this.$EnterLeaveMonitor_entered = union(
	      this.$EnterLeaveMonitor_entered.filter(function(node) 
	        {return document.contains(node) &&
	        node.contains(enteringNode);}
	      ),
	      [enteringNode]
	    );
	
	    return this.$EnterLeaveMonitor_entered.length === 1;
	  };
	
	  EnterLeaveMonitor.prototype.leave=function(leavingNode) {
	    this.$EnterLeaveMonitor_entered = without(
	      this.$EnterLeaveMonitor_entered.filter(function(node) 
	        {return document.contains(node);}
	      ),
	      leavingNode
	    );
	
	    return this.$EnterLeaveMonitor_entered.length === 0;
	  };
	
	  EnterLeaveMonitor.prototype.reset=function() {
	    this.$EnterLeaveMonitor_entered = [];
	  };
	
	
	module.exports = EnterLeaveMonitor;

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shouldUseDragPreview = __webpack_require__(219),
	    getDragImageOffset = __webpack_require__(220);
	
	function configureDataTransfer(containerNode, nativeEvent, dragOptions) {
	  var $__0=    nativeEvent,dataTransfer=$__0.dataTransfer,
	      $__1=      dragOptions,dragPreview=$__1.dragPreview,effectAllowed=$__1.effectAllowed,dragAnchors=$__1.dragAnchors;
	
	  try {
	    // Firefox won't drag without setting data
	    dataTransfer.setData('application/json', {});
	  } catch (err) {
	    // IE doesn't support MIME types in setData
	  }
	
	  if (shouldUseDragPreview(dragPreview) && dataTransfer.setDragImage) {
	    var dragOffset = getDragImageOffset(containerNode, dragPreview, dragAnchors, nativeEvent);
	    dataTransfer.setDragImage(dragPreview, dragOffset.x, dragOffset.y);
	  }
	
	  dataTransfer.effectAllowed = effectAllowed;
	}
	
	module.exports = configureDataTransfer;

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function isFileDragDropEvent(e) {
	  var types = Array.prototype.slice.call(e.dataTransfer.types);
	  return types.indexOf('Files') !== -1;
	}
	
	module.exports = isFileDragDropEvent;

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function bindAll(obj, context) {
	  if (!context) {
	    context = obj;
	  }
	
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key) && typeof obj[key] === 'function') {
	      obj[key] = obj[key].bind(context);
	    }
	  }
	
	  return obj;
	}
	
	module.exports = bindAll;

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isFirefox = __webpack_require__(218),
	    isSafari = __webpack_require__(221);
	
	function getDragImageScale() {
	  if (isFirefox() || isSafari()) {
	    return window.devicePixelRatio;
	  } else {
	    return 1;
	  }
	}
	
	module.exports = getDragImageScale;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule hyphenate
	 * @typechecks
	 */
	
	var _uppercasePattern = /([A-Z])/g;
	
	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}
	
	module.exports = hyphenate;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule accumulate
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Accumulates items that must not be null or undefined.
	 *
	 * This is used to conserve memory by avoiding array allocations.
	 *
	 * @return {*|array<*>} An accumulation of items.
	 */
	function accumulate(current, next) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    next != null,
	    'accumulate(...): Accumulated items must be not be null or undefined.'
	  ) : invariant(next != null));
	  if (current == null) {
	    return next;
	  } else {
	    // Both are not empty. Warning: Never call x.concat(y) when you are not
	    // certain that x is an Array (x could be a string with concat method).
	    var currentIsArray = Array.isArray(current);
	    var nextIsArray = Array.isArray(next);
	    if (currentIsArray) {
	      return current.concat(next);
	    } else {
	      if (nextIsArray) {
	        return [current].concat(next);
	      } else {
	        return [current, next];
	      }
	    }
	  }
	}
	
	module.exports = accumulate;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule forEachAccumulated
	 */
	
	"use strict";
	
	/**
	 * @param {array} an "accumulation" of items which is either an Array or
	 * a single item. Useful when paired with the `accumulate` module. This is a
	 * simple utility that allows us to reason about a collection of items, but
	 * handling the case when there is exactly one item (and we do not need to
	 * allocate an array).
	 */
	var forEachAccumulated = function(arr, cb, scope) {
	  if (Array.isArray(arr)) {
	    arr.forEach(cb, scope);
	  } else if (arr) {
	    cb.call(scope, arr);
	  }
	};
	
	module.exports = forEachAccumulated;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMSelection
	 */
	
	"use strict";
	
	var ExecutionEnvironment = __webpack_require__(61);
	
	var getNodeForCharacterOffset = __webpack_require__(228);
	var getTextContentAccessor = __webpack_require__(169);
	
	/**
	 * While `isCollapsed` is available on the Selection object and `collapsed`
	 * is available on the Range object, IE11 sometimes gets them wrong.
	 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
	 */
	function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
	  return anchorNode === focusNode && anchorOffset === focusOffset;
	}
	
	/**
	 * Get the appropriate anchor and focus node/offset pairs for IE.
	 *
	 * The catch here is that IE's selection API doesn't provide information
	 * about whether the selection is forward or backward, so we have to
	 * behave as though it's always forward.
	 *
	 * IE text differs from modern selection in that it behaves as though
	 * block elements end with a new line. This means character offsets will
	 * differ between the two APIs.
	 *
	 * @param {DOMElement} node
	 * @return {object}
	 */
	function getIEOffsets(node) {
	  var selection = document.selection;
	  var selectedRange = selection.createRange();
	  var selectedLength = selectedRange.text.length;
	
	  // Duplicate selection so we can move range without breaking user selection.
	  var fromStart = selectedRange.duplicate();
	  fromStart.moveToElementText(node);
	  fromStart.setEndPoint('EndToStart', selectedRange);
	
	  var startOffset = fromStart.text.length;
	  var endOffset = startOffset + selectedLength;
	
	  return {
	    start: startOffset,
	    end: endOffset
	  };
	}
	
	/**
	 * @param {DOMElement} node
	 * @return {?object}
	 */
	function getModernOffsets(node) {
	  var selection = window.getSelection();
	
	  if (selection.rangeCount === 0) {
	    return null;
	  }
	
	  var anchorNode = selection.anchorNode;
	  var anchorOffset = selection.anchorOffset;
	  var focusNode = selection.focusNode;
	  var focusOffset = selection.focusOffset;
	
	  var currentRange = selection.getRangeAt(0);
	
	  // If the node and offset values are the same, the selection is collapsed.
	  // `Selection.isCollapsed` is available natively, but IE sometimes gets
	  // this value wrong.
	  var isSelectionCollapsed = isCollapsed(
	    selection.anchorNode,
	    selection.anchorOffset,
	    selection.focusNode,
	    selection.focusOffset
	  );
	
	  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
	
	  var tempRange = currentRange.cloneRange();
	  tempRange.selectNodeContents(node);
	  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
	
	  var isTempRangeCollapsed = isCollapsed(
	    tempRange.startContainer,
	    tempRange.startOffset,
	    tempRange.endContainer,
	    tempRange.endOffset
	  );
	
	  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
	  var end = start + rangeLength;
	
	  // Detect whether the selection is backward.
	  var detectionRange = document.createRange();
	  detectionRange.setStart(anchorNode, anchorOffset);
	  detectionRange.setEnd(focusNode, focusOffset);
	  var isBackward = detectionRange.collapsed;
	  detectionRange.detach();
	
	  return {
	    start: isBackward ? end : start,
	    end: isBackward ? start : end
	  };
	}
	
	/**
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setIEOffsets(node, offsets) {
	  var range = document.selection.createRange().duplicate();
	  var start, end;
	
	  if (typeof offsets.end === 'undefined') {
	    start = offsets.start;
	    end = start;
	  } else if (offsets.start > offsets.end) {
	    start = offsets.end;
	    end = offsets.start;
	  } else {
	    start = offsets.start;
	    end = offsets.end;
	  }
	
	  range.moveToElementText(node);
	  range.moveStart('character', start);
	  range.setEndPoint('EndToStart', range);
	  range.moveEnd('character', end - start);
	  range.select();
	}
	
	/**
	 * In modern non-IE browsers, we can support both forward and backward
	 * selections.
	 *
	 * Note: IE10+ supports the Selection object, but it does not support
	 * the `extend` method, which means that even in modern IE, it's not possible
	 * to programatically create a backward selection. Thus, for all IE
	 * versions, we use the old IE API to create our selections.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setModernOffsets(node, offsets) {
	  var selection = window.getSelection();
	
	  var length = node[getTextContentAccessor()].length;
	  var start = Math.min(offsets.start, length);
	  var end = typeof offsets.end === 'undefined' ?
	            start : Math.min(offsets.end, length);
	
	  // IE 11 uses modern selection, but doesn't support the extend method.
	  // Flip backward selections, so we can set with a single range.
	  if (!selection.extend && start > end) {
	    var temp = end;
	    end = start;
	    start = temp;
	  }
	
	  var startMarker = getNodeForCharacterOffset(node, start);
	  var endMarker = getNodeForCharacterOffset(node, end);
	
	  if (startMarker && endMarker) {
	    var range = document.createRange();
	    range.setStart(startMarker.node, startMarker.offset);
	    selection.removeAllRanges();
	
	    if (start > end) {
	      selection.addRange(range);
	      selection.extend(endMarker.node, endMarker.offset);
	    } else {
	      range.setEnd(endMarker.node, endMarker.offset);
	      selection.addRange(range);
	    }
	
	    range.detach();
	  }
	}
	
	var useIEOffsets = ExecutionEnvironment.canUseDOM && document.selection;
	
	var ReactDOMSelection = {
	  /**
	   * @param {DOMElement} node
	   */
	  getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,
	
	  /**
	   * @param {DOMElement|DOMTextNode} node
	   * @param {object} offsets
	   */
	  setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
	};
	
	module.exports = ReactDOMSelection;


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule focusNode
	 */
	
	"use strict";
	
	/**
	 * IE8 throws if an input/textarea is disabled and we try to focus it.
	 * Focus only when necessary.
	 *
	 * @param {DOMElement} node input/textarea to focus
	 */
	function focusNode(node) {
	  if (!node.disabled) {
	    node.focus();
	  }
	}
	
	module.exports = focusNode;


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getEventModifierState
	 * @typechecks static-only
	 */
	
	"use strict";
	
	/**
	 * Translation from modifier key to the associated property in the event.
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
	 */
	
	var modifierKeyToProp = {
	  'Alt': 'altKey',
	  'Control': 'ctrlKey',
	  'Meta': 'metaKey',
	  'Shift': 'shiftKey'
	};
	
	// IE8 does not implement getModifierState so we simply map it to the only
	// modifier keys exposed by the event itself, does not support Lock-keys.
	// Currently, all major browsers except Chrome seems to support Lock-keys.
	function modifierStateGetter(keyArg) {
	  /*jshint validthis:true */
	  var syntheticEvent = this;
	  var nativeEvent = syntheticEvent.nativeEvent;
	  if (nativeEvent.getModifierState) {
	    return nativeEvent.getModifierState(keyArg);
	  }
	  var keyProp = modifierKeyToProp[keyArg];
	  return keyProp ? !!nativeEvent[keyProp] : false;
	}
	
	function getEventModifierState(nativeEvent) {
	  return modifierStateGetter;
	}
	
	module.exports = getEventModifierState;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DOMChildrenOperations
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var Danger = __webpack_require__(229);
	var ReactMultiChildUpdateTypes = __webpack_require__(135);
	
	var getTextContentAccessor = __webpack_require__(169);
	var invariant = __webpack_require__(62);
	
	/**
	 * The DOM property to use when setting text content.
	 *
	 * @type {string}
	 * @private
	 */
	var textContentAccessor = getTextContentAccessor();
	
	/**
	 * Inserts `childNode` as a child of `parentNode` at the `index`.
	 *
	 * @param {DOMElement} parentNode Parent node in which to insert.
	 * @param {DOMElement} childNode Child node to insert.
	 * @param {number} index Index at which to insert the child.
	 * @internal
	 */
	function insertChildAt(parentNode, childNode, index) {
	  // By exploiting arrays returning `undefined` for an undefined index, we can
	  // rely exclusively on `insertBefore(node, null)` instead of also using
	  // `appendChild(node)`. However, using `undefined` is not allowed by all
	  // browsers so we must replace it with `null`.
	  parentNode.insertBefore(
	    childNode,
	    parentNode.childNodes[index] || null
	  );
	}
	
	var updateTextContent;
	if (textContentAccessor === 'textContent') {
	  /**
	   * Sets the text content of `node` to `text`.
	   *
	   * @param {DOMElement} node Node to change
	   * @param {string} text New text content
	   */
	  updateTextContent = function(node, text) {
	    node.textContent = text;
	  };
	} else {
	  /**
	   * Sets the text content of `node` to `text`.
	   *
	   * @param {DOMElement} node Node to change
	   * @param {string} text New text content
	   */
	  updateTextContent = function(node, text) {
	    // In order to preserve newlines correctly, we can't use .innerText to set
	    // the contents (see #1080), so we empty the element then append a text node
	    while (node.firstChild) {
	      node.removeChild(node.firstChild);
	    }
	    if (text) {
	      var doc = node.ownerDocument || document;
	      node.appendChild(doc.createTextNode(text));
	    }
	  };
	}
	
	/**
	 * Operations for updating with DOM children.
	 */
	var DOMChildrenOperations = {
	
	  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,
	
	  updateTextContent: updateTextContent,
	
	  /**
	   * Updates a component's children by processing a series of updates. The
	   * update configurations are each expected to have a `parentNode` property.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @param {array<string>} markupList List of markup strings.
	   * @internal
	   */
	  processUpdates: function(updates, markupList) {
	    var update;
	    // Mapping from parent IDs to initial child orderings.
	    var initialChildren = null;
	    // List of children that will be moved or removed.
	    var updatedChildren = null;
	
	    for (var i = 0; update = updates[i]; i++) {
	      if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING ||
	          update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
	        var updatedIndex = update.fromIndex;
	        var updatedChild = update.parentNode.childNodes[updatedIndex];
	        var parentID = update.parentID;
	
	        ("production" !== process.env.NODE_ENV ? invariant(
	          updatedChild,
	          'processUpdates(): Unable to find child %s of element. This ' +
	          'probably means the DOM was unexpectedly mutated (e.g., by the ' +
	          'browser), usually due to forgetting a <tbody> when using tables, ' +
	          'nesting <p> or <a> tags, or using non-SVG elements in an <svg> '+
	          'parent. Try inspecting the child nodes of the element with React ' +
	          'ID `%s`.',
	          updatedIndex,
	          parentID
	        ) : invariant(updatedChild));
	
	        initialChildren = initialChildren || {};
	        initialChildren[parentID] = initialChildren[parentID] || [];
	        initialChildren[parentID][updatedIndex] = updatedChild;
	
	        updatedChildren = updatedChildren || [];
	        updatedChildren.push(updatedChild);
	      }
	    }
	
	    var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
	
	    // Remove updated children first so that `toIndex` is consistent.
	    if (updatedChildren) {
	      for (var j = 0; j < updatedChildren.length; j++) {
	        updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
	      }
	    }
	
	    for (var k = 0; update = updates[k]; k++) {
	      switch (update.type) {
	        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
	          insertChildAt(
	            update.parentNode,
	            renderedMarkup[update.markupIndex],
	            update.toIndex
	          );
	          break;
	        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
	          insertChildAt(
	            update.parentNode,
	            initialChildren[update.parentID][update.fromIndex],
	            update.toIndex
	          );
	          break;
	        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
	          updateTextContent(
	            update.parentNode,
	            update.textContent
	          );
	          break;
	        case ReactMultiChildUpdateTypes.REMOVE_NODE:
	          // Already removed by the for-loop above.
	          break;
	      }
	    }
	  }
	
	};
	
	module.exports = DOMChildrenOperations;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getEventKey
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Normalization of deprecated HTML5 `key` values
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */
	var normalizeKey = {
	  'Esc': 'Escape',
	  'Spacebar': ' ',
	  'Left': 'ArrowLeft',
	  'Up': 'ArrowUp',
	  'Right': 'ArrowRight',
	  'Down': 'ArrowDown',
	  'Del': 'Delete',
	  'Win': 'OS',
	  'Menu': 'ContextMenu',
	  'Apps': 'ContextMenu',
	  'Scroll': 'ScrollLock',
	  'MozPrintableKey': 'Unidentified'
	};
	
	/**
	 * Translation from legacy `which`/`keyCode` to HTML5 `key`
	 * Only special keys supported, all others depend on keyboard layout or browser
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */
	var translateToKey = {
	  8: 'Backspace',
	  9: 'Tab',
	  12: 'Clear',
	  13: 'Enter',
	  16: 'Shift',
	  17: 'Control',
	  18: 'Alt',
	  19: 'Pause',
	  20: 'CapsLock',
	  27: 'Escape',
	  32: ' ',
	  33: 'PageUp',
	  34: 'PageDown',
	  35: 'End',
	  36: 'Home',
	  37: 'ArrowLeft',
	  38: 'ArrowUp',
	  39: 'ArrowRight',
	  40: 'ArrowDown',
	  45: 'Insert',
	  46: 'Delete',
	  112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6',
	  118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
	  144: 'NumLock',
	  145: 'ScrollLock',
	  224: 'Meta'
	};
	
	/**
	 * @param {object} nativeEvent Native browser event.
	 * @return {string} Normalized `key` property.
	 */
	function getEventKey(nativeEvent) {
	  if (nativeEvent.key) {
	    // Normalize inconsistent values reported by browsers due to
	    // implementations of a working draft specification.
	
	    // FireFox implements `key` but returns `MozPrintableKey` for all
	    // printable characters (normalized to `Unidentified`), ignore it.
	    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
	    if (key !== 'Unidentified') {
	      return key;
	    }
	  }
	
	  // Browser does not implement `key`, polyfill as much of it as we can.
	  if (nativeEvent.type === 'keypress') {
	    // Create the character from the `charCode` ourselves and use as an almost
	    // perfect replacement.
	    var charCode = 'charCode' in nativeEvent ?
	      nativeEvent.charCode :
	      nativeEvent.keyCode;
	
	    // The enter-key is technically both printable and non-printable and can
	    // thus be captured by `keypress`, no other non-printable key should.
	    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
	  }
	  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
	    // While user keyboard layout determines the actual meaning of each
	    // `keyCode` value, almost all function keys have a universal value.
	    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
	  }
	
	  ("production" !== process.env.NODE_ENV ? invariant(false, "Unexpected keyboard event type: %s", nativeEvent.type) : invariant(false));
	}
	
	module.exports = getEventKey;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule performance
	 * @typechecks
	 */
	
	"use strict";
	
	var ExecutionEnvironment = __webpack_require__(61);
	
	var performance;
	
	if (ExecutionEnvironment.canUseDOM) {
	  performance =
	    window.performance ||
	    window.msPerformance ||
	    window.webkitPerformance;
	}
	
	module.exports = performance || {};


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule isNode
	 * @typechecks
	 */
	
	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	function isNode(object) {
	  return !!(object && (
	    typeof Node === 'function' ? object instanceof Node :
	      typeof object === 'object' &&
	      typeof object.nodeType === 'number' &&
	      typeof object.nodeName === 'string'
	  ));
	}
	
	module.exports = isNode;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function isWebkit() {
	  return 'WebkitAppearance' in document.documentElement.style;
	}
	
	module.exports = isWebkit;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function isFirefox() {
	  return /firefox/i.test(navigator.userAgent);
	}
	
	module.exports = isFirefox;

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isSafari = __webpack_require__(221),
	    endsWith = __webpack_require__(235);
	
	function shouldUseDragPreview(dragPreview) {
	  if (!dragPreview) {
	    return false;
	  }
	
	  if (isSafari() && dragPreview instanceof Image && endsWith(dragPreview.src, '.gif')) {
	    // GIFs crash Safari
	    return false;
	  }
	
	  return true;
	}
	
	module.exports = shouldUseDragPreview;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var HorizontalDragAnchors = __webpack_require__(140),
	    VerticalDragAnchors = __webpack_require__(141),
	    isFirefox = __webpack_require__(218),
	    isSafari = __webpack_require__(221);
	
	/**
	 * Returns offset to be used as arguments for `dataTransfer.setDragImage(dragImage, x, y)`.
	 * Attempts to work around browser differences, especially on high-DPI screens.
	 */
	function getDragImageOffset(containerNode, dragPreview, dragAnchors, e) {
	  dragAnchors = dragAnchors || {};
	
	  var containerWidth = containerNode.offsetWidth,
	      containerHeight = containerNode.offsetHeight,
	      isImage = dragPreview instanceof Image,
	      previewWidth = isImage ? dragPreview.width : containerWidth,
	      previewHeight = isImage ? dragPreview.height : containerHeight,
	      horizontalAnchor = dragAnchors.horizontal || HorizontalDragAnchors.CENTER,
	      verticalAnchor = dragAnchors.vertical || VerticalDragAnchors.CENTER,
	      $__0=     e,offsetX=$__0.offsetX,offsetY=$__0.offsetY;
	
	  // Work around @2x coordinate discrepancies in browsers
	  if (isFirefox()) {
	    offsetX = e.layerX;
	    offsetY = e.layerY;
	  } else if (isSafari()) {
	    previewHeight /= window.devicePixelRatio;
	    previewWidth /= window.devicePixelRatio;
	  }
	
	  switch (horizontalAnchor) {
	  case HorizontalDragAnchors.LEFT:
	    break;
	  case HorizontalDragAnchors.CENTER:
	    offsetX *= (previewWidth / containerWidth);
	    break;
	  case HorizontalDragAnchors.RIGHT:
	    offsetX = previewWidth - previewWidth * (1 - offsetX / containerWidth);
	    break;
	  }
	
	  switch (verticalAnchor) {
	  case VerticalDragAnchors.TOP:
	    break;
	  case VerticalDragAnchors.CENTER:
	    offsetY *= (previewHeight / containerHeight);
	    break;
	  case VerticalDragAnchors.BOTTOM:
	    offsetY = previewHeight - previewHeight * (1 - offsetY / containerHeight);
	    break;
	  }
	
	  // Work around Safari 8 positioning bug
	  if (isSafari()) {
	    // We'll have to wait for @3x to see if this is entirely correct
	    offsetY += (window.devicePixelRatio - 1) * previewHeight;
	  }
	
	  return {
	    x: offsetX,
	    y: offsetY
	  };
	}
	
	module.exports = getDragImageOffset;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function isSafari() {
	  return !!window.safari;
	}
	
	module.exports = isSafari;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseFlatten = __webpack_require__(243),
	    baseUniq = __webpack_require__(244);
	
	/**
	 * Creates an array of unique values, in order, of the provided arrays using
	 * strict equality for comparisons, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @category Arrays
	 * @param {...Array} [array] The arrays to inspect.
	 * @returns {Array} Returns an array of combined values.
	 * @example
	 *
	 * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	 * // => [1, 2, 3, 5, 4]
	 */
	function union() {
	  return baseUniq(baseFlatten(arguments, true, true));
	}
	
	module.exports = union;


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseDifference = __webpack_require__(245),
	    slice = __webpack_require__(246);
	
	/**
	 * Creates an array excluding all provided values using strict equality for
	 * comparisons, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @category Arrays
	 * @param {Array} array The array to filter.
	 * @param {...*} [value] The values to exclude.
	 * @returns {Array} Returns a new array of filtered values.
	 * @example
	 *
	 * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	 * // => [2, 3, 4]
	 */
	function without(array) {
	  return baseDifference(array, slice(arguments, 1));
	}
	
	module.exports = without;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(247);
	
	/**
	 * Checks if `value` is the language type of Object.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // check if the value is the ECMAScript language type of Object
	  // http://es5.github.io/#x8
	  // and avoid a V8 bug
	  // http://code.google.com/p/v8/issues/detail?id=2291
	  return !!(value && objectTypes[typeof value]);
	}
	
	module.exports = isObject;


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keyMirror = __webpack_require__(92);
	
	var DragDropActionTypes = keyMirror({
	  DRAG_START: null,
	  DRAG_END: null,
	  DROP: null
	});
	
	module.exports = DragDropActionTypes;

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Dispatcher = __webpack_require__(248).Dispatcher,
	    copyProperties = __webpack_require__(63);
	
	var DragDropDispatcher = copyProperties(new Dispatcher(), {
	  handleAction:function(action) {
	    this.dispatch({
	      action: action
	    });
	  }
	});
	
	module.exports = DragDropDispatcher;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var EventEmitter = __webpack_require__(234).EventEmitter,
	    merge = __webpack_require__(68),
	    shallowEqual = __webpack_require__(181),
	    bindAll = __webpack_require__(205),
	    CHANGE_EVENT = 'change';
	
	function createStore(spec) {
	  var store = merge(EventEmitter.prototype, merge(spec, {
	    emitChange:function() {
	      this.emit(CHANGE_EVENT);
	    },
	
	    addChangeListener:function(callback) {
	      this.on(CHANGE_EVENT, callback);
	    },
	
	    removeChangeListener:function(callback) {
	      this.removeListener(CHANGE_EVENT, callback);
	    }
	  }));
	
	  store.setMaxListeners(0);
	  bindAll(store);
	
	  return store;
	}
	
	module.exports = createStore;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getNodeForCharacterOffset
	 */
	
	"use strict";
	
	/**
	 * Given any node return the first leaf node without children.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {DOMElement|DOMTextNode}
	 */
	function getLeafNode(node) {
	  while (node && node.firstChild) {
	    node = node.firstChild;
	  }
	  return node;
	}
	
	/**
	 * Get the next sibling within a container. This will walk up the
	 * DOM if a node's siblings have been exhausted.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {?DOMElement|DOMTextNode}
	 */
	function getSiblingNode(node) {
	  while (node) {
	    if (node.nextSibling) {
	      return node.nextSibling;
	    }
	    node = node.parentNode;
	  }
	}
	
	/**
	 * Get object describing the nodes which contain characters at offset.
	 *
	 * @param {DOMElement|DOMTextNode} root
	 * @param {number} offset
	 * @return {?object}
	 */
	function getNodeForCharacterOffset(root, offset) {
	  var node = getLeafNode(root);
	  var nodeStart = 0;
	  var nodeEnd = 0;
	
	  while (node) {
	    if (node.nodeType == 3) {
	      nodeEnd = nodeStart + node.textContent.length;
	
	      if (nodeStart <= offset && nodeEnd >= offset) {
	        return {
	          node: node,
	          offset: offset - nodeStart
	        };
	      }
	
	      nodeStart = nodeEnd;
	    }
	
	    node = getLeafNode(getSiblingNode(node));
	  }
	}
	
	module.exports = getNodeForCharacterOffset;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule Danger
	 * @typechecks static-only
	 */
	
	/*jslint evil: true, sub: true */
	
	"use strict";
	
	var ExecutionEnvironment = __webpack_require__(61);
	
	var createNodesFromMarkup = __webpack_require__(236);
	var emptyFunction = __webpack_require__(137);
	var getMarkupWrap = __webpack_require__(237);
	var invariant = __webpack_require__(62);
	
	var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
	var RESULT_INDEX_ATTR = 'data-danger-index';
	
	/**
	 * Extracts the `nodeName` from a string of markup.
	 *
	 * NOTE: Extracting the `nodeName` does not require a regular expression match
	 * because we make assumptions about React-generated markup (i.e. there are no
	 * spaces surrounding the opening tag and there is at least one attribute).
	 *
	 * @param {string} markup String of markup.
	 * @return {string} Node name of the supplied markup.
	 * @see http://jsperf.com/extract-nodename
	 */
	function getNodeName(markup) {
	  return markup.substring(1, markup.indexOf(' '));
	}
	
	var Danger = {
	
	  /**
	   * Renders markup into an array of nodes. The markup is expected to render
	   * into a list of root nodes. Also, the length of `resultList` and
	   * `markupList` should be the same.
	   *
	   * @param {array<string>} markupList List of markup strings to render.
	   * @return {array<DOMElement>} List of rendered nodes.
	   * @internal
	   */
	  dangerouslyRenderMarkup: function(markupList) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ExecutionEnvironment.canUseDOM,
	      'dangerouslyRenderMarkup(...): Cannot render markup in a Worker ' +
	      'thread. This is likely a bug in the framework. Please report ' +
	      'immediately.'
	    ) : invariant(ExecutionEnvironment.canUseDOM));
	    var nodeName;
	    var markupByNodeName = {};
	    // Group markup by `nodeName` if a wrap is necessary, else by '*'.
	    for (var i = 0; i < markupList.length; i++) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        markupList[i],
	        'dangerouslyRenderMarkup(...): Missing markup.'
	      ) : invariant(markupList[i]));
	      nodeName = getNodeName(markupList[i]);
	      nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
	      markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
	      markupByNodeName[nodeName][i] = markupList[i];
	    }
	    var resultList = [];
	    var resultListAssignmentCount = 0;
	    for (nodeName in markupByNodeName) {
	      if (!markupByNodeName.hasOwnProperty(nodeName)) {
	        continue;
	      }
	      var markupListByNodeName = markupByNodeName[nodeName];
	
	      // This for-in loop skips the holes of the sparse array. The order of
	      // iteration should follow the order of assignment, which happens to match
	      // numerical index order, but we don't rely on that.
	      for (var resultIndex in markupListByNodeName) {
	        if (markupListByNodeName.hasOwnProperty(resultIndex)) {
	          var markup = markupListByNodeName[resultIndex];
	
	          // Push the requested markup with an additional RESULT_INDEX_ATTR
	          // attribute.  If the markup does not start with a < character, it
	          // will be discarded below (with an appropriate console.error).
	          markupListByNodeName[resultIndex] = markup.replace(
	            OPEN_TAG_NAME_EXP,
	            // This index will be parsed back out below.
	            '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" '
	          );
	        }
	      }
	
	      // Render each group of markup with similar wrapping `nodeName`.
	      var renderNodes = createNodesFromMarkup(
	        markupListByNodeName.join(''),
	        emptyFunction // Do nothing special with <script> tags.
	      );
	
	      for (i = 0; i < renderNodes.length; ++i) {
	        var renderNode = renderNodes[i];
	        if (renderNode.hasAttribute &&
	            renderNode.hasAttribute(RESULT_INDEX_ATTR)) {
	
	          resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
	          renderNode.removeAttribute(RESULT_INDEX_ATTR);
	
	          ("production" !== process.env.NODE_ENV ? invariant(
	            !resultList.hasOwnProperty(resultIndex),
	            'Danger: Assigning to an already-occupied result index.'
	          ) : invariant(!resultList.hasOwnProperty(resultIndex)));
	
	          resultList[resultIndex] = renderNode;
	
	          // This should match resultList.length and markupList.length when
	          // we're done.
	          resultListAssignmentCount += 1;
	
	        } else if ("production" !== process.env.NODE_ENV) {
	          console.error(
	            "Danger: Discarding unexpected node:",
	            renderNode
	          );
	        }
	      }
	    }
	
	    // Although resultList was populated out of order, it should now be a dense
	    // array.
	    ("production" !== process.env.NODE_ENV ? invariant(
	      resultListAssignmentCount === resultList.length,
	      'Danger: Did not assign to every index of resultList.'
	    ) : invariant(resultListAssignmentCount === resultList.length));
	
	    ("production" !== process.env.NODE_ENV ? invariant(
	      resultList.length === markupList.length,
	      'Danger: Expected markup to render %s nodes, but rendered %s.',
	      markupList.length,
	      resultList.length
	    ) : invariant(resultList.length === markupList.length));
	
	    return resultList;
	  },
	
	  /**
	   * Replaces a node with a string of markup at its current position within its
	   * parent. The markup must render into a single root node.
	   *
	   * @param {DOMElement} oldChild Child node to replace.
	   * @param {string} markup Markup to render in place of the child node.
	   * @internal
	   */
	  dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      ExecutionEnvironment.canUseDOM,
	      'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' +
	      'worker thread. This is likely a bug in the framework. Please report ' +
	      'immediately.'
	    ) : invariant(ExecutionEnvironment.canUseDOM));
	    ("production" !== process.env.NODE_ENV ? invariant(markup, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(markup));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      oldChild.tagName.toLowerCase() !== 'html',
	      'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' +
	      '<html> node. This is because browser quirks make this unreliable ' +
	      'and/or slow. If you want to render to the root you must use ' +
	      'server rendering. See renderComponentToString().'
	    ) : invariant(oldChild.tagName.toLowerCase() !== 'html'));
	
	    var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
	    oldChild.parentNode.replaceChild(newChild, oldChild);
	  }
	
	};
	
	module.exports = Danger;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        throw TypeError('Uncaught, unspecified "error" event.');
	      }
	      return false;
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
		var makePromise = __webpack_require__(240);
		var Scheduler = __webpack_require__(241);
		var async = __webpack_require__(242);
	
		return makePromise({
			scheduler: new Scheduler(async)
		});
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(250));


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Stringify = __webpack_require__(238);
	var Parse = __webpack_require__(239);
	
	
	// Declare internals
	
	var internals = {};
	
	
	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	var base64 = __webpack_require__(266)
	var ieee754 = __webpack_require__(263)
	var isArray = __webpack_require__(262)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = Buffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var kMaxLength = 0x3fffffff
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return 42 === arr.foo() && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (subject, encoding, noZero) {
	  if (!(this instanceof Buffer))
	    return new Buffer(subject, encoding, noZero)
	
	  var type = typeof subject
	
	  // Find the length
	  var length
	  if (type === 'number')
	    length = subject > 0 ? subject >>> 0 : 0
	  else if (type === 'string') {
	    if (encoding === 'base64')
	      subject = base64clean(subject)
	    length = Buffer.byteLength(subject, encoding)
	  } else if (type === 'object' && subject !== null) { // assume object is array-like
	    if (subject.type === 'Buffer' && isArray(subject.data))
	      subject = subject.data
	    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
	  } else
	    throw new TypeError('must start with number, buffer, array or string')
	
	  if (this.length > kMaxLength)
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	      'size: 0x' + kMaxLength.toString(16) + ' bytes')
	
	  var buf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Preferred: Return an augmented `Uint8Array` instance for best performance
	    buf = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return THIS instance of Buffer (created by `new`)
	    buf = this
	    buf.length = length
	    buf._isBuffer = true
	  }
	
	  var i
	  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
	    // Speed optimization -- use set if we're copying from a typed array
	    buf._set(subject)
	  } else if (isArrayish(subject)) {
	    // Treat array-ish objects as a byte array
	    if (Buffer.isBuffer(subject)) {
	      for (i = 0; i < length; i++)
	        buf[i] = subject.readUInt8(i)
	    } else {
	      for (i = 0; i < length; i++)
	        buf[i] = ((subject[i] % 256) + 256) % 256
	    }
	  } else if (type === 'string') {
	    buf.write(subject, 0, encoding)
	  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
	    for (i = 0; i < length; i++) {
	      buf[i] = 0
	    }
	  }
	
	  return buf
	}
	
	Buffer.isBuffer = function (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
	    throw new TypeError('Arguments must be Buffers')
	
	  var x = a.length
	  var y = b.length
	  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function (list, totalLength) {
	  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }
	
	  var i
	  if (totalLength === undefined) {
	    totalLength = 0
	    for (i = 0; i < list.length; i++) {
	      totalLength += list[i].length
	    }
	  }
	
	  var buf = new Buffer(totalLength)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	Buffer.byteLength = function (str, encoding) {
	  var ret
	  str = str + ''
	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      ret = str.length
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = str.length * 2
	      break
	    case 'hex':
	      ret = str.length >>> 1
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8ToBytes(str).length
	      break
	    case 'base64':
	      ret = base64ToBytes(str).length
	      break
	    default:
	      ret = str.length
	  }
	  return ret
	}
	
	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined
	
	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function (encoding, start, end) {
	  var loweredCase = false
	
	  start = start >>> 0
	  end = end === undefined || end === Infinity ? this.length : end >>> 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase)
	          throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.equals = function (b) {
	  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max)
	      str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b)
	}
	
	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var byte = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(byte)) throw new Error('Invalid hex string')
	    buf[offset + i] = byte
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function asciiWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function utf16leWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	Buffer.prototype.write = function (string, offset, length, encoding) {
	  // Support both (string, offset, length, encoding)
	  // and the legacy (string, encoding, offset, length)
	  if (isFinite(offset)) {
	    if (!isFinite(length)) {
	      encoding = length
	      length = undefined
	    }
	  } else {  // legacy
	    var swap = encoding
	    encoding = offset
	    offset = length
	    length = swap
	  }
	
	  offset = Number(offset) || 0
	  var remaining = this.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	  encoding = String(encoding || 'utf8').toLowerCase()
	
	  var ret
	  switch (encoding) {
	    case 'hex':
	      ret = hexWrite(this, string, offset, length)
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8Write(this, string, offset, length)
	      break
	    case 'ascii':
	      ret = asciiWrite(this, string, offset, length)
	      break
	    case 'binary':
	      ret = binaryWrite(this, string, offset, length)
	      break
	    case 'base64':
	      ret = base64Write(this, string, offset, length)
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = utf16leWrite(this, string, offset, length)
	      break
	    default:
	      throw new TypeError('Unknown encoding: ' + encoding)
	  }
	  return ret
	}
	
	Buffer.prototype.toJSON = function () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }
	
	  return res + decodeUtf8Char(tmp)
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  return asciiSlice(buf, start, end)
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len;
	    if (start < 0)
	      start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0)
	      end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start)
	    end = start
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    return Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    var newBuf = new Buffer(sliceLen, undefined, true)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	    return newBuf
	  }
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0)
	    throw new RangeError('offset is not uint')
	  if (offset + ext > length)
	    throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	      ((this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      this[offset + 3])
	}
	
	Buffer.prototype.readInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80))
	    return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16) |
	      (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	      (this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}
	
	Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}
	
	Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function (target, target_start, start, end) {
	  var source = this
	
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (!target_start) target_start = 0
	
	  // Copy 0 bytes; we're done
	  if (end === start) return
	  if (target.length === 0 || source.length === 0) return
	
	  // Fatal error conditions
	  if (end < start) throw new TypeError('sourceEnd < sourceStart')
	  if (target_start < 0 || target_start >= target.length)
	    throw new TypeError('targetStart out of bounds')
	  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
	  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length)
	    end = this.length
	  if (target.length - target_start < end - start)
	    end = target.length - target_start + start
	
	  var len = end - start
	
	  if (len < 100 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + target_start] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), target_start)
	  }
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new TypeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function (arr) {
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array get/set methods before overwriting
	  arr._get = arr.get
	  arr._set = arr.set
	
	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-z]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function isArrayish (subject) {
	  return isArray(subject) || Buffer.isBuffer(subject) ||
	      subject && typeof subject === 'object' &&
	      typeof subject.length === 'number'
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    var b = str.charCodeAt(i)
	    if (b <= 0x7F) {
	      byteArray.push(b)
	    } else {
	      var start = i
	      if (b >= 0xD800 && b <= 0xDFFF) i++
	      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
	      for (var j = 0; j < h.length; j++) {
	        byteArray.push(parseInt(h[j], 16))
	      }
	    }
	  }
	  return byteArray
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(str)
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length))
	      break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(233).Buffer))

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function endsWith(str, suffix) {
	  return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	module.exports = endsWith;

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule createNodesFromMarkup
	 * @typechecks
	 */
	
	/*jslint evil: true, sub: true */
	
	var ExecutionEnvironment = __webpack_require__(61);
	
	var createArrayFrom = __webpack_require__(249);
	var getMarkupWrap = __webpack_require__(237);
	var invariant = __webpack_require__(62);
	
	/**
	 * Dummy container used to render all markup.
	 */
	var dummyNode =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
	
	/**
	 * Pattern used by `getNodeName`.
	 */
	var nodeNamePattern = /^\s*<(\w+)/;
	
	/**
	 * Extracts the `nodeName` of the first element in a string of markup.
	 *
	 * @param {string} markup String of markup.
	 * @return {?string} Node name of the supplied markup.
	 */
	function getNodeName(markup) {
	  var nodeNameMatch = markup.match(nodeNamePattern);
	  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
	}
	
	/**
	 * Creates an array containing the nodes rendered from the supplied markup. The
	 * optionally supplied `handleScript` function will be invoked once for each
	 * <script> element that is rendered. If no `handleScript` function is supplied,
	 * an exception is thrown if any <script> elements are rendered.
	 *
	 * @param {string} markup A string of valid HTML markup.
	 * @param {?function} handleScript Invoked once for each rendered <script>.
	 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
	 */
	function createNodesFromMarkup(markup, handleScript) {
	  var node = dummyNode;
	  ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'createNodesFromMarkup dummy not initialized') : invariant(!!dummyNode));
	  var nodeName = getNodeName(markup);
	
	  var wrap = nodeName && getMarkupWrap(nodeName);
	  if (wrap) {
	    node.innerHTML = wrap[1] + markup + wrap[2];
	
	    var wrapDepth = wrap[0];
	    while (wrapDepth--) {
	      node = node.lastChild;
	    }
	  } else {
	    node.innerHTML = markup;
	  }
	
	  var scripts = node.getElementsByTagName('script');
	  if (scripts.length) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      handleScript,
	      'createNodesFromMarkup(...): Unexpected <script> element rendered.'
	    ) : invariant(handleScript));
	    createArrayFrom(scripts).forEach(handleScript);
	  }
	
	  var nodes = createArrayFrom(node.childNodes);
	  while (node.lastChild) {
	    node.removeChild(node.lastChild);
	  }
	  return nodes;
	}
	
	module.exports = createNodesFromMarkup;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getMarkupWrap
	 */
	
	var ExecutionEnvironment = __webpack_require__(61);
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Dummy container used to detect which wraps are necessary.
	 */
	var dummyNode =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
	
	/**
	 * Some browsers cannot use `innerHTML` to render certain elements standalone,
	 * so we wrap them, render the wrapped nodes, then extract the desired node.
	 *
	 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
	 */
	var shouldWrap = {
	  // Force wrapping for SVG elements because if they get created inside a <div>,
	  // they will be initialized in the wrong namespace (and will not display).
	  'circle': true,
	  'defs': true,
	  'ellipse': true,
	  'g': true,
	  'line': true,
	  'linearGradient': true,
	  'path': true,
	  'polygon': true,
	  'polyline': true,
	  'radialGradient': true,
	  'rect': true,
	  'stop': true,
	  'text': true
	};
	
	var selectWrap = [1, '<select multiple="true">', '</select>'];
	var tableWrap = [1, '<table>', '</table>'];
	var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	var svgWrap = [1, '<svg>', '</svg>'];
	
	var markupWrap = {
	  '*': [1, '?<div>', '</div>'],
	
	  'area': [1, '<map>', '</map>'],
	  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  'legend': [1, '<fieldset>', '</fieldset>'],
	  'param': [1, '<object>', '</object>'],
	  'tr': [2, '<table><tbody>', '</tbody></table>'],
	
	  'optgroup': selectWrap,
	  'option': selectWrap,
	
	  'caption': tableWrap,
	  'colgroup': tableWrap,
	  'tbody': tableWrap,
	  'tfoot': tableWrap,
	  'thead': tableWrap,
	
	  'td': trWrap,
	  'th': trWrap,
	
	  'circle': svgWrap,
	  'defs': svgWrap,
	  'ellipse': svgWrap,
	  'g': svgWrap,
	  'line': svgWrap,
	  'linearGradient': svgWrap,
	  'path': svgWrap,
	  'polygon': svgWrap,
	  'polyline': svgWrap,
	  'radialGradient': svgWrap,
	  'rect': svgWrap,
	  'stop': svgWrap,
	  'text': svgWrap
	};
	
	/**
	 * Gets the markup wrap configuration for the supplied `nodeName`.
	 *
	 * NOTE: This lazily detects which wraps are necessary for the current browser.
	 *
	 * @param {string} nodeName Lowercase `nodeName`.
	 * @return {?array} Markup wrap configuration, if applicable.
	 */
	function getMarkupWrap(nodeName) {
	  ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'Markup wrapping node not initialized') : invariant(!!dummyNode));
	  if (!markupWrap.hasOwnProperty(nodeName)) {
	    nodeName = '*';
	  }
	  if (!shouldWrap.hasOwnProperty(nodeName)) {
	    if (nodeName === '*') {
	      dummyNode.innerHTML = '<link />';
	    } else {
	      dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
	    }
	    shouldWrap[nodeName] = !dummyNode.firstChild;
	  }
	  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
	}
	
	
	module.exports = getMarkupWrap;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(198);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&'
	};
	
	
	internals.stringify = function (obj, prefix) {
	
	    if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    }
	    else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    }
	    else if (obj === null) {
	        obj = '';
	    }
	
	    if (typeof obj === 'string' ||
	        typeof obj === 'number' ||
	        typeof obj === 'boolean') {
	
	        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
	    }
	
	    var values = [];
	
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']'));
	        }
	    }
	
	    return values;
	};
	
	
	module.exports = function (obj, options) {
	
	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
	
	    var keys = [];
	
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            keys = keys.concat(internals.stringify(obj[key], key));
	        }
	    }
	
	    return keys.join(delimiter);
	};


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(198);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000
	};
	
	
	internals.parseValues = function (str, options) {
	
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
	
	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
	
	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';
	        }
	        else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));
	
	            if (!obj[key]) {
	                obj[key] = val;
	            }
	            else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseObject = function (chain, val, options) {
	
	    if (!chain.length) {
	        return val;
	    }
	
	    var root = chain.shift();
	
	    var obj = {};
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    }
	    else {
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        if (!isNaN(index) &&
	            root !== cleanRoot &&
	            index <= options.arrayLimit) {
	
	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        }
	        else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseKeys = function (key, val, options) {
	
	    if (!key) {
	        return;
	    }
	
	    // The regex chunks
	
	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;
	
	    // Get the parent
	
	    var segment = parent.exec(key);
	
	    // Don't allow them to overwrite object prototype properties
	
	    if (Object.prototype.hasOwnProperty(segment[1])) {
	        return;
	    }
	
	    // Stash the parent if it exists
	
	    var keys = [];
	    if (segment[1]) {
	        keys.push(segment[1]);
	    }
	
	    // Loop through children appending to the array until we hit depth
	
	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	
	        ++i;
	        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	            keys.push(segment[1]);
	        }
	    }
	
	    // If there's a remainder, just add whatever is left
	
	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }
	
	    return internals.parseObject(keys, val, options);
	};
	
	
	module.exports = function (str, options) {
	
	    if (str === '' ||
	        str === null ||
	        typeof str === 'undefined') {
	
	        return {};
	    }
	
	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
	
	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = {};
	
	    // Iterate over the keys and setup the new object
	
	    var keys = Object.keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj);
	    }
	
	    return Utils.compact(obj);
	};


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function makePromise(environment) {
	
			var tasks = environment.scheduler;
	
			var objectCreate = Object.create ||
				function(proto) {
					function Child() {}
					Child.prototype = proto;
					return new Child();
				};
	
			/**
			 * Create a promise whose fate is determined by resolver
			 * @constructor
			 * @returns {Promise} promise
			 * @name Promise
			 */
			function Promise(resolver, handler) {
				this._handler = resolver === Handler ? handler : init(resolver);
			}
	
			/**
			 * Run the supplied resolver
			 * @param resolver
			 * @returns {Pending}
			 */
			function init(resolver) {
				var handler = new Pending();
	
				try {
					resolver(promiseResolve, promiseReject, promiseNotify);
				} catch (e) {
					promiseReject(e);
				}
	
				return handler;
	
				/**
				 * Transition from pre-resolution state to post-resolution state, notifying
				 * all listeners of the ultimate fulfillment or rejection
				 * @param {*} x resolution value
				 */
				function promiseResolve (x) {
					handler.resolve(x);
				}
				/**
				 * Reject this promise with reason, which will be used verbatim
				 * @param {Error|*} reason rejection reason, strongly suggested
				 *   to be an Error type
				 */
				function promiseReject (reason) {
					handler.reject(reason);
				}
	
				/**
				 * Issue a progress event, notifying all progress listeners
				 * @param {*} x progress event payload to pass to all listeners
				 */
				function promiseNotify (x) {
					handler.notify(x);
				}
			}
	
			// Creation
	
			Promise.resolve = resolve;
			Promise.reject = reject;
			Promise.never = never;
	
			Promise._defer = defer;
			Promise._handler = getHandler;
	
			/**
			 * Returns a trusted promise. If x is already a trusted promise, it is
			 * returned, otherwise returns a new trusted Promise which follows x.
			 * @param  {*} x
			 * @return {Promise} promise
			 */
			function resolve(x) {
				return isPromise(x) ? x
					: new Promise(Handler, new Async(getHandler(x)));
			}
	
			/**
			 * Return a reject promise with x as its reason (x is used verbatim)
			 * @param {*} x
			 * @returns {Promise} rejected promise
			 */
			function reject(x) {
				return new Promise(Handler, new Async(new Rejected(x)));
			}
	
			/**
			 * Return a promise that remains pending forever
			 * @returns {Promise} forever-pending promise.
			 */
			function never() {
				return foreverPendingPromise; // Should be frozen
			}
	
			/**
			 * Creates an internal {promise, resolver} pair
			 * @private
			 * @returns {Promise}
			 */
			function defer() {
				return new Promise(Handler, new Pending());
			}
	
			// Transformation and flow control
	
			/**
			 * Transform this promise's fulfillment value, returning a new Promise
			 * for the transformed result.  If the promise cannot be fulfilled, onRejected
			 * is called with the reason.  onProgress *may* be called with updates toward
			 * this promise's fulfillment.
			 * @param {function=} onFulfilled fulfillment handler
			 * @param {function=} onRejected rejection handler
			 * @deprecated @param {function=} onProgress progress handler
			 * @return {Promise} new promise
			 */
			Promise.prototype.then = function(onFulfilled, onRejected) {
				var parent = this._handler;
				var state = parent.join().state();
	
				if ((typeof onFulfilled !== 'function' && state > 0) ||
					(typeof onRejected !== 'function' && state < 0)) {
					// Short circuit: value will not change, simply share handler
					return new this.constructor(Handler, parent);
				}
	
				var p = this._beget();
				var child = p._handler;
	
				parent.chain(child, parent.receiver, onFulfilled, onRejected,
						arguments.length > 2 ? arguments[2] : void 0);
	
				return p;
			};
	
			/**
			 * If this promise cannot be fulfilled due to an error, call onRejected to
			 * handle the error. Shortcut for .then(undefined, onRejected)
			 * @param {function?} onRejected
			 * @return {Promise}
			 */
			Promise.prototype['catch'] = function(onRejected) {
				return this.then(void 0, onRejected);
			};
	
			/**
			 * Creates a new, pending promise of the same type as this promise
			 * @private
			 * @returns {Promise}
			 */
			Promise.prototype._beget = function() {
				var parent = this._handler;
				var child = new Pending(parent.receiver, parent.join().context);
				return new this.constructor(Handler, child);
			};
	
			// Array combinators
	
			Promise.all = all;
			Promise.race = race;
	
			/**
			 * Return a promise that will fulfill when all promises in the
			 * input array have fulfilled, or will reject when one of the
			 * promises rejects.
			 * @param {array} promises array of promises
			 * @returns {Promise} promise for array of fulfillment values
			 */
			function all(promises) {
				/*jshint maxcomplexity:8*/
				var resolver = new Pending();
				var pending = promises.length >>> 0;
				var results = new Array(pending);
	
				var i, h, x, s;
				for (i = 0; i < promises.length; ++i) {
					x = promises[i];
	
					if (x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}
	
					if (maybeThenable(x)) {
						h = getHandlerMaybeThenable(x);
	
						s = h.state();
						if (s === 0) {
							h.fold(settleAt, i, results, resolver);
						} else if (s > 0) {
							results[i] = h.value;
							--pending;
						} else {
							unreportRemaining(promises, i+1, h);
							resolver.become(h);
							break;
						}
	
					} else {
						results[i] = x;
						--pending;
					}
				}
	
				if(pending === 0) {
					resolver.become(new Fulfilled(results));
				}
	
				return new Promise(Handler, resolver);
	
				function settleAt(i, x, resolver) {
					/*jshint validthis:true*/
					this[i] = x;
					if(--pending === 0) {
						resolver.become(new Fulfilled(this));
					}
				}
			}
	
			function unreportRemaining(promises, start, rejectedHandler) {
				var i, h, x;
				for(i=start; i<promises.length; ++i) {
					x = promises[i];
					if(maybeThenable(x)) {
						h = getHandlerMaybeThenable(x);
	
						if(h !== rejectedHandler) {
							h.visit(h, void 0, h._unreport);
						}
					}
				}
			}
	
			/**
			 * Fulfill-reject competitive race. Return a promise that will settle
			 * to the same state as the earliest input promise to settle.
			 *
			 * WARNING: The ES6 Promise spec requires that race()ing an empty array
			 * must return a promise that is pending forever.  This implementation
			 * returns a singleton forever-pending promise, the same singleton that is
			 * returned by Promise.never(), thus can be checked with ===
			 *
			 * @param {array} promises array of promises to race
			 * @returns {Promise} if input is non-empty, a promise that will settle
			 * to the same outcome as the earliest input promise to settle. if empty
			 * is empty, returns a promise that will never settle.
			 */
			function race(promises) {
				// Sigh, race([]) is untestable unless we return *something*
				// that is recognizable without calling .then() on it.
				if(Object(promises) === promises && promises.length === 0) {
					return never();
				}
	
				var h = new Pending();
				var i, x;
				for(i=0; i<promises.length; ++i) {
					x = promises[i];
					if (x !== void 0 && i in promises) {
						getHandler(x).visit(h, h.resolve, h.reject);
					}
				}
				return new Promise(Handler, h);
			}
	
			// Promise internals
			// Below this, everything is @private
	
			/**
			 * Get an appropriate handler for x, without checking for cycles
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandler(x) {
				if(isPromise(x)) {
					return x._handler.join();
				}
				return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
			}
	
			/**
			 * Get a handler for thenable x.
			 * NOTE: You must only call this if maybeThenable(x) == true
			 * @param {object|function|Promise} x
			 * @returns {object} handler
			 */
			function getHandlerMaybeThenable(x) {
				return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
			}
	
			/**
			 * Get a handler for potentially untrusted thenable x
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandlerUntrusted(x) {
				try {
					var untrustedThen = x.then;
					return typeof untrustedThen === 'function'
						? new Thenable(untrustedThen, x)
						: new Fulfilled(x);
				} catch(e) {
					return new Rejected(e);
				}
			}
	
			/**
			 * Handler for a promise that is pending forever
			 * @constructor
			 */
			function Handler() {}
	
			Handler.prototype.when
				= Handler.prototype.become
				= Handler.prototype.notify
				= Handler.prototype.fail
				= Handler.prototype._unreport
				= Handler.prototype._report
				= noop;
	
			Handler.prototype._state = 0;
	
			Handler.prototype.state = function() {
				return this._state;
			};
	
			/**
			 * Recursively collapse handler chain to find the handler
			 * nearest to the fully resolved value.
			 * @returns {object} handler nearest the fully resolved value
			 */
			Handler.prototype.join = function() {
				var h = this;
				while(h.handler !== void 0) {
					h = h.handler;
				}
				return h;
			};
	
			Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
				this.when({
					resolver: to,
					receiver: receiver,
					fulfilled: fulfilled,
					rejected: rejected,
					progress: progress
				});
			};
	
			Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
				this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
			};
	
			Handler.prototype.fold = function(f, z, c, to) {
				this.visit(to, function(x) {
					f.call(c, z, x, this);
				}, to.reject, to.notify);
			};
	
			/**
			 * Handler that invokes fail() on any handler it becomes
			 * @constructor
			 */
			function FailIfRejected() {}
	
			inherit(Handler, FailIfRejected);
	
			FailIfRejected.prototype.become = function(h) {
				h.fail();
			};
	
			var failIfRejected = new FailIfRejected();
	
			/**
			 * Handler that manages a queue of consumers waiting on a pending promise
			 * @constructor
			 */
			function Pending(receiver, inheritedContext) {
				Promise.createContext(this, inheritedContext);
	
				this.consumers = void 0;
				this.receiver = receiver;
				this.handler = void 0;
				this.resolved = false;
			}
	
			inherit(Handler, Pending);
	
			Pending.prototype._state = 0;
	
			Pending.prototype.resolve = function(x) {
				this.become(getHandler(x));
			};
	
			Pending.prototype.reject = function(x) {
				if(this.resolved) {
					return;
				}
	
				this.become(new Rejected(x));
			};
	
			Pending.prototype.join = function() {
				if (!this.resolved) {
					return this;
				}
	
				var h = this;
	
				while (h.handler !== void 0) {
					h = h.handler;
					if (h === this) {
						return this.handler = cycle();
					}
				}
	
				return h;
			};
	
			Pending.prototype.run = function() {
				var q = this.consumers;
				var handler = this.join();
				this.consumers = void 0;
	
				for (var i = 0; i < q.length; ++i) {
					handler.when(q[i]);
				}
			};
	
			Pending.prototype.become = function(handler) {
				if(this.resolved) {
					return;
				}
	
				this.resolved = true;
				this.handler = handler;
				if(this.consumers !== void 0) {
					tasks.enqueue(this);
				}
	
				if(this.context !== void 0) {
					handler._report(this.context);
				}
			};
	
			Pending.prototype.when = function(continuation) {
				if(this.resolved) {
					tasks.enqueue(new ContinuationTask(continuation, this.handler));
				} else {
					if(this.consumers === void 0) {
						this.consumers = [continuation];
					} else {
						this.consumers.push(continuation);
					}
				}
			};
	
			Pending.prototype.notify = function(x) {
				if(!this.resolved) {
					tasks.enqueue(new ProgressTask(x, this));
				}
			};
	
			Pending.prototype.fail = function(context) {
				var c = typeof context === 'undefined' ? this.context : context;
				this.resolved && this.handler.join().fail(c);
			};
	
			Pending.prototype._report = function(context) {
				this.resolved && this.handler.join()._report(context);
			};
	
			Pending.prototype._unreport = function() {
				this.resolved && this.handler.join()._unreport();
			};
	
			/**
			 * Wrap another handler and force it into a future stack
			 * @param {object} handler
			 * @constructor
			 */
			function Async(handler) {
				this.handler = handler;
			}
	
			inherit(Handler, Async);
	
			Async.prototype.when = function(continuation) {
				tasks.enqueue(new ContinuationTask(continuation, this));
			};
	
			Async.prototype._report = function(context) {
				this.join()._report(context);
			};
	
			Async.prototype._unreport = function() {
				this.join()._unreport();
			};
	
			/**
			 * Handler that wraps an untrusted thenable and assimilates it in a future stack
			 * @param {function} then
			 * @param {{then: function}} thenable
			 * @constructor
			 */
			function Thenable(then, thenable) {
				Pending.call(this);
				tasks.enqueue(new AssimilateTask(then, thenable, this));
			}
	
			inherit(Pending, Thenable);
	
			/**
			 * Handler for a fulfilled promise
			 * @param {*} x fulfillment value
			 * @constructor
			 */
			function Fulfilled(x) {
				Promise.createContext(this);
				this.value = x;
			}
	
			inherit(Handler, Fulfilled);
	
			Fulfilled.prototype._state = 1;
	
			Fulfilled.prototype.fold = function(f, z, c, to) {
				runContinuation3(f, z, this, c, to);
			};
	
			Fulfilled.prototype.when = function(cont) {
				runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
			};
	
			var errorId = 0;
	
			/**
			 * Handler for a rejected promise
			 * @param {*} x rejection reason
			 * @constructor
			 */
			function Rejected(x) {
				Promise.createContext(this);
	
				this.id = ++errorId;
				this.value = x;
				this.handled = false;
				this.reported = false;
	
				this._report();
			}
	
			inherit(Handler, Rejected);
	
			Rejected.prototype._state = -1;
	
			Rejected.prototype.fold = function(f, z, c, to) {
				to.become(this);
			};
	
			Rejected.prototype.when = function(cont) {
				if(typeof cont.rejected === 'function') {
					this._unreport();
				}
				runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
			};
	
			Rejected.prototype._report = function(context) {
				tasks.afterQueue(new ReportTask(this, context));
			};
	
			Rejected.prototype._unreport = function() {
				this.handled = true;
				tasks.afterQueue(new UnreportTask(this));
			};
	
			Rejected.prototype.fail = function(context) {
				Promise.onFatalRejection(this, context === void 0 ? this.context : context);
			};
	
			function ReportTask(rejection, context) {
				this.rejection = rejection;
				this.context = context;
			}
	
			ReportTask.prototype.run = function() {
				if(!this.rejection.handled) {
					this.rejection.reported = true;
					Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
				}
			};
	
			function UnreportTask(rejection) {
				this.rejection = rejection;
			}
	
			UnreportTask.prototype.run = function() {
				if(this.rejection.reported) {
					Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
				}
			};
	
			// Unhandled rejection hooks
			// By default, everything is a noop
	
			// TODO: Better names: "annotate"?
			Promise.createContext
				= Promise.enterContext
				= Promise.exitContext
				= Promise.onPotentiallyUnhandledRejection
				= Promise.onPotentiallyUnhandledRejectionHandled
				= Promise.onFatalRejection
				= noop;
	
			// Errors and singletons
	
			var foreverPendingHandler = new Handler();
			var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);
	
			function cycle() {
				return new Rejected(new TypeError('Promise cycle'));
			}
	
			// Task runners
	
			/**
			 * Run a single consumer
			 * @constructor
			 */
			function ContinuationTask(continuation, handler) {
				this.continuation = continuation;
				this.handler = handler;
			}
	
			ContinuationTask.prototype.run = function() {
				this.handler.join().when(this.continuation);
			};
	
			/**
			 * Run a queue of progress handlers
			 * @constructor
			 */
			function ProgressTask(value, handler) {
				this.handler = handler;
				this.value = value;
			}
	
			ProgressTask.prototype.run = function() {
				var q = this.handler.consumers;
				if(q === void 0) {
					return;
				}
	
				for (var c, i = 0; i < q.length; ++i) {
					c = q[i];
					runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
				}
			};
	
			/**
			 * Assimilate a thenable, sending it's value to resolver
			 * @param {function} then
			 * @param {object|function} thenable
			 * @param {object} resolver
			 * @constructor
			 */
			function AssimilateTask(then, thenable, resolver) {
				this._then = then;
				this.thenable = thenable;
				this.resolver = resolver;
			}
	
			AssimilateTask.prototype.run = function() {
				var h = this.resolver;
				tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);
	
				function _resolve(x) { h.resolve(x); }
				function _reject(x)  { h.reject(x); }
				function _notify(x)  { h.notify(x); }
			};
	
			function tryAssimilate(then, thenable, resolve, reject, notify) {
				try {
					then.call(thenable, resolve, reject, notify);
				} catch (e) {
					reject(e);
				}
			}
	
			// Other helpers
	
			/**
			 * @param {*} x
			 * @returns {boolean} true iff x is a trusted Promise
			 */
			function isPromise(x) {
				return x instanceof Promise;
			}
	
			/**
			 * Test just enough to rule out primitives, in order to take faster
			 * paths in some code
			 * @param {*} x
			 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
			 */
			function maybeThenable(x) {
				return (typeof x === 'object' || typeof x === 'function') && x !== null;
			}
	
			function runContinuation1(f, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject(f, h.value, receiver, next);
				Promise.exitContext();
			}
	
			function runContinuation3(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject3(f, x, h.value, receiver, next);
				Promise.exitContext();
			}
	
			function runNotify(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.notify(x);
				}
	
				Promise.enterContext(h);
				tryCatchReturn(f, x, receiver, next);
				Promise.exitContext();
			}
	
			/**
			 * Return f.call(thisArg, x), or if it throws return a rejected promise for
			 * the thrown exception
			 */
			function tryCatchReject(f, x, thisArg, next) {
				try {
					next.become(getHandler(f.call(thisArg, x)));
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * Same as above, but includes the extra argument parameter.
			 */
			function tryCatchReject3(f, x, y, thisArg, next) {
				try {
					f.call(thisArg, x, y, next);
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * Return f.call(thisArg, x), or if it throws, *return* the exception
			 */
			function tryCatchReturn(f, x, thisArg, next) {
				try {
					next.notify(f.call(thisArg, x));
				} catch(e) {
					next.notify(e);
				}
			}
	
			function inherit(Parent, Child) {
				Child.prototype = objectCreate(Parent.prototype);
				Child.prototype.constructor = Child;
			}
	
			function noop() {}
	
			return Promise;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(250)));


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var Queue = __webpack_require__(252);
	
		// Credit to Twisol (https://github.com/Twisol) for suggesting
		// this type of extensible queue + trampoline approach for next-tick conflation.
	
		/**
		 * Async task scheduler
		 * @param {function} async function to schedule a single async function
		 * @constructor
		 */
		function Scheduler(async) {
			this._async = async;
			this._queue = new Queue(15);
			this._afterQueue = new Queue(5);
			this._running = false;
	
			var self = this;
			this.drain = function() {
				self._drain();
			};
		}
	
		/**
		 * Enqueue a task
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.enqueue = function(task) {
			this._add(this._queue, task);
		};
	
		/**
		 * Enqueue a task to run after the main task queue
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.afterQueue = function(task) {
			this._add(this._afterQueue, task);
		};
	
		/**
		 * Drain the handler queue entirely, and then the after queue
		 */
		Scheduler.prototype._drain = function() {
			runQueue(this._queue);
			this._running = false;
			runQueue(this._afterQueue);
		};
	
		/**
		 * Add a task to the q, and schedule drain if not already scheduled
		 * @param {Queue} queue
		 * @param {{run:function}} task
		 * @private
		 */
		Scheduler.prototype._add = function(queue, task) {
			queue.push(task);
			if(!this._running) {
				this._running = true;
				this._async(this.drain);
			}
		};
	
		/**
		 * Run all the tasks in the q
		 * @param queue
		 */
		function runQueue(queue) {
			while(queue.length > 0) {
				queue.shift().run();
			}
		}
	
		return Scheduler;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(250)));


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		// Sniff "best" async scheduling option
		// Prefer process.nextTick or MutationObserver, then check for
		// vertx and finally fall back to setTimeout
	
		/*jshint maxcomplexity:6*/
		/*global process,document,setTimeout,MutationObserver,WebKitMutationObserver*/
		var nextTick, MutationObs;
	
		if (typeof process !== 'undefined' && process !== null &&
			typeof process.nextTick === 'function') {
			nextTick = function(f) {
				process.nextTick(f);
			};
	
		} else if (MutationObs =
			(typeof MutationObserver === 'function' && MutationObserver) ||
			(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver)) {
			nextTick = (function (document, MutationObserver) {
				var scheduled;
				var el = document.createElement('div');
				var o = new MutationObserver(run);
				o.observe(el, { attributes: true });
	
				function run() {
					var f = scheduled;
					scheduled = void 0;
					f();
				}
	
				return function (f) {
					scheduled = f;
					el.setAttribute('class', 'x');
				};
			}(document, MutationObs));
	
		} else {
			nextTick = (function(cjsRequire) {
				var vertx;
				try {
					// vert.x 1.x || 2.x
					vertx = __webpack_require__(251);
				} catch (ignore) {}
	
				if (vertx) {
					if (typeof vertx.runOnLoop === 'function') {
						return vertx.runOnLoop;
					}
					if (typeof vertx.runOnContext === 'function') {
						return vertx.runOnContext;
					}
				}
	
				// capture setTimeout to avoid being caught by fake timers
				// used in time based tests
				var capturedSetTimeout = setTimeout;
				return function (t) {
					capturedSetTimeout(t, 0);
				};
			}(require));
		}
	
		return nextTick;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(250)));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isArguments = __webpack_require__(253),
	    isArray = __webpack_require__(254);
	
	/**
	 * The base implementation of `_.flatten` without support for callback
	 * shorthands or `thisArg` binding.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	 * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
	 * @param {number} [fromIndex=0] The index to start from.
	 * @returns {Array} Returns a new flattened array.
	 */
	function baseFlatten(array, isShallow, isStrict, fromIndex) {
	  var index = (fromIndex || 0) - 1,
	      length = array ? array.length : 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	
	    if (value && typeof value == 'object' && typeof value.length == 'number'
	        && (isArray(value) || isArguments(value))) {
	      // recursively flatten arrays (susceptible to call stack limits)
	      if (!isShallow) {
	        value = baseFlatten(value, isShallow, isStrict);
	      }
	      var valIndex = -1,
	          valLength = value.length,
	          resIndex = result.length;
	
	      result.length += valLength;
	      while (++valIndex < valLength) {
	        result[resIndex++] = value[valIndex];
	      }
	    } else if (!isStrict) {
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(255),
	    cacheIndexOf = __webpack_require__(256),
	    createCache = __webpack_require__(257),
	    getArray = __webpack_require__(258),
	    largeArraySize = __webpack_require__(259),
	    releaseArray = __webpack_require__(260),
	    releaseObject = __webpack_require__(261);
	
	/**
	 * The base implementation of `_.uniq` without support for callback shorthands
	 * or `thisArg` binding.
	 *
	 * @private
	 * @param {Array} array The array to process.
	 * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	 * @param {Function} [callback] The function called per iteration.
	 * @returns {Array} Returns a duplicate-value-free array.
	 */
	function baseUniq(array, isSorted, callback) {
	  var index = -1,
	      indexOf = baseIndexOf,
	      length = array ? array.length : 0,
	      result = [];
	
	  var isLarge = !isSorted && length >= largeArraySize,
	      seen = (callback || isLarge) ? getArray() : result;
	
	  if (isLarge) {
	    var cache = createCache(seen);
	    indexOf = cacheIndexOf;
	    seen = cache;
	  }
	  while (++index < length) {
	    var value = array[index],
	        computed = callback ? callback(value, index, array) : value;
	
	    if (isSorted
	          ? !index || seen[seen.length - 1] !== computed
	          : indexOf(seen, computed) < 0
	        ) {
	      if (callback || isLarge) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  if (isLarge) {
	    releaseArray(seen.array);
	    releaseObject(seen);
	  } else if (callback) {
	    releaseArray(seen);
	  }
	  return result;
	}
	
	module.exports = baseUniq;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(255),
	    cacheIndexOf = __webpack_require__(256),
	    createCache = __webpack_require__(257),
	    largeArraySize = __webpack_require__(259),
	    releaseObject = __webpack_require__(261);
	
	/**
	 * The base implementation of `_.difference` that accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to process.
	 * @param {Array} [values] The array of values to exclude.
	 * @returns {Array} Returns a new array of filtered values.
	 */
	function baseDifference(array, values) {
	  var index = -1,
	      indexOf = baseIndexOf,
	      length = array ? array.length : 0,
	      isLarge = length >= largeArraySize,
	      result = [];
	
	  if (isLarge) {
	    var cache = createCache(values);
	    if (cache) {
	      indexOf = cacheIndexOf;
	      values = cache;
	    } else {
	      isLarge = false;
	    }
	  }
	  while (++index < length) {
	    var value = array[index];
	    if (indexOf(values, value) < 0) {
	      result.push(value);
	    }
	  }
	  if (isLarge) {
	    releaseObject(values);
	  }
	  return result;
	}
	
	module.exports = baseDifference;


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/**
	 * Slices the `collection` from the `start` index up to, but not including,
	 * the `end` index.
	 *
	 * Note: This function is used instead of `Array#slice` to support node lists
	 * in IE < 9 and to ensure dense arrays are returned.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to slice.
	 * @param {number} start The start index.
	 * @param {number} end The end index.
	 * @returns {Array} Returns the new array.
	 */
	function slice(array, start, end) {
	  start || (start = 0);
	  if (typeof end == 'undefined') {
	    end = array ? array.length : 0;
	  }
	  var index = -1,
	      length = end - start || 0,
	      result = Array(length < 0 ? 0 : length);
	
	  while (++index < length) {
	    result[index] = array[start + index];
	  }
	  return result;
	}
	
	module.exports = slice;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/** Used to determine if values are of the language type Object */
	var objectTypes = {
	  'boolean': false,
	  'function': true,
	  'object': true,
	  'number': false,
	  'string': false,
	  'undefined': false
	};
	
	module.exports = objectTypes;


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(264)


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule createArrayFrom
	 * @typechecks
	 */
	
	var toArray = __webpack_require__(265);
	
	/**
	 * Perform a heuristic test to determine if an object is "array-like".
	 *
	 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
	 *   Joshu replied: "Mu."
	 *
	 * This function determines if its argument has "array nature": it returns
	 * true if the argument is an actual array, an `arguments' object, or an
	 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
	 *
	 * It will return false for other array-like objects like Filelist.
	 *
	 * @param {*} obj
	 * @return {boolean}
	 */
	function hasArrayNature(obj) {
	  return (
	    // not null/false
	    !!obj &&
	    // arrays are objects, NodeLists are functions in Safari
	    (typeof obj == 'object' || typeof obj == 'function') &&
	    // quacks like an array
	    ('length' in obj) &&
	    // not window
	    !('setInterval' in obj) &&
	    // no DOM node should be considered an array-like
	    // a 'select' element has 'length' and 'item' properties on IE8
	    (typeof obj.nodeType != 'number') &&
	    (
	      // a real array
	      (// HTMLCollection/NodeList
	      (Array.isArray(obj) ||
	      // arguments
	      ('callee' in obj) || 'item' in obj))
	    )
	  );
	}
	
	/**
	 * Ensure that the argument is an array by wrapping it in an array if it is not.
	 * Creates a copy of the argument if it is already an array.
	 *
	 * This is mostly useful idiomatically:
	 *
	 *   var createArrayFrom = require('createArrayFrom');
	 *
	 *   function takesOneOrMoreThings(things) {
	 *     things = createArrayFrom(things);
	 *     ...
	 *   }
	 *
	 * This allows you to treat `things' as an array, but accept scalars in the API.
	 *
	 * If you need to convert an array-like object, like `arguments`, into an array
	 * use toArray instead.
	 *
	 * @param {*} obj
	 * @return {array}
	 */
	function createArrayFrom(obj) {
	  if (!hasArrayNature(obj)) {
	    return [obj];
	  } else if (Array.isArray(obj)) {
	    return obj.slice();
	  } else {
	    return toArray(obj);
	  }
	}
	
	module.exports = createArrayFrom;


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		/**
		 * Circular queue
		 * @param {number} capacityPow2 power of 2 to which this queue's capacity
		 *  will be set initially. eg when capacityPow2 == 3, queue capacity
		 *  will be 8.
		 * @constructor
		 */
		function Queue(capacityPow2) {
			this.head = this.tail = this.length = 0;
			this.buffer = new Array(1 << capacityPow2);
		}
	
		Queue.prototype.push = function(x) {
			if(this.length === this.buffer.length) {
				this._ensureCapacity(this.length * 2);
			}
	
			this.buffer[this.tail] = x;
			this.tail = (this.tail + 1) & (this.buffer.length - 1);
			++this.length;
			return this.length;
		};
	
		Queue.prototype.shift = function() {
			var x = this.buffer[this.head];
			this.buffer[this.head] = void 0;
			this.head = (this.head + 1) & (this.buffer.length - 1);
			--this.length;
			return x;
		};
	
		Queue.prototype._ensureCapacity = function(capacity) {
			var head = this.head;
			var buffer = this.buffer;
			var newBuffer = new Array(capacity);
			var i = 0;
			var len;
	
			if(head === 0) {
				len = this.length;
				for(; i<len; ++i) {
					newBuffer[i] = buffer[i];
				}
			} else {
				capacity = buffer.length;
				len = this.tail;
				for(; head<capacity; ++i, ++head) {
					newBuffer[i] = buffer[head];
				}
	
				for(head=0; head<len; ++i, ++head) {
					newBuffer[i] = buffer[head];
				}
			}
	
			this.buffer = newBuffer;
			this.head = 0;
			this.tail = this.length;
		};
	
		return Queue;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(250)));


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/** `Object#toString` result shortcuts */
	var argsClass = '[object Arguments]';
	
	/** Used for native method references */
	var objectProto = Object.prototype;
	
	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;
	
	/**
	 * Checks if `value` is an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
	 * @example
	 *
	 * (function() { return _.isArguments(arguments); })(1, 2, 3);
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return value && typeof value == 'object' && typeof value.length == 'number' &&
	    toString.call(value) == argsClass || false;
	}
	
	module.exports = isArguments;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(267);
	
	/** `Object#toString` result shortcuts */
	var arrayClass = '[object Array]';
	
	/** Used for native method references */
	var objectProto = Object.prototype;
	
	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;
	
	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;
	
	/**
	 * Checks if `value` is an array.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
	 * @example
	 *
	 * (function() { return _.isArray(arguments); })();
	 * // => false
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 */
	var isArray = nativeIsArray || function(value) {
	  return value && typeof value == 'object' && typeof value.length == 'number' &&
	    toString.call(value) == arrayClass || false;
	};
	
	module.exports = isArray;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/**
	 * The base implementation of `_.indexOf` without support for binary searches
	 * or `fromIndex` constraints.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the matched value or `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  var index = (fromIndex || 0) - 1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseIndexOf;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(255),
	    keyPrefix = __webpack_require__(268);
	
	/**
	 * An implementation of `_.contains` for cache objects that mimics the return
	 * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache object to inspect.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var type = typeof value;
	  cache = cache.cache;
	
	  if (type == 'boolean' || value == null) {
	    return cache[value] ? 0 : -1;
	  }
	  if (type != 'number' && type != 'string') {
	    type = 'object';
	  }
	  var key = type == 'number' ? value : keyPrefix + value;
	  cache = (cache = cache[type]) && cache[key];
	
	  return type == 'object'
	    ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
	    : (cache ? 0 : -1);
	}
	
	module.exports = cacheIndexOf;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var cachePush = __webpack_require__(269),
	    getObject = __webpack_require__(270),
	    releaseObject = __webpack_require__(261);
	
	/**
	 * Creates a cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [array=[]] The array to search.
	 * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
	 */
	function createCache(array) {
	  var index = -1,
	      length = array.length,
	      first = array[0],
	      mid = array[(length / 2) | 0],
	      last = array[length - 1];
	
	  if (first && typeof first == 'object' &&
	      mid && typeof mid == 'object' && last && typeof last == 'object') {
	    return false;
	  }
	  var cache = getObject();
	  cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;
	
	  var result = getObject();
	  result.array = array;
	  result.cache = cache;
	  result.push = cachePush;
	
	  while (++index < length) {
	    result.push(array[index]);
	  }
	  return result;
	}
	
	module.exports = createCache;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var arrayPool = __webpack_require__(271);
	
	/**
	 * Gets an array from the array pool or creates a new one if the pool is empty.
	 *
	 * @private
	 * @returns {Array} The array from the pool.
	 */
	function getArray() {
	  return arrayPool.pop() || [];
	}
	
	module.exports = getArray;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/** Used as the size when optimizations are enabled for large arrays */
	var largeArraySize = 75;
	
	module.exports = largeArraySize;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var arrayPool = __webpack_require__(271),
	    maxPoolSize = __webpack_require__(272);
	
	/**
	 * Releases the given array back to the array pool.
	 *
	 * @private
	 * @param {Array} [array] The array to release.
	 */
	function releaseArray(array) {
	  array.length = 0;
	  if (arrayPool.length < maxPoolSize) {
	    arrayPool.push(array);
	  }
	}
	
	module.exports = releaseArray;


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var maxPoolSize = __webpack_require__(272),
	    objectPool = __webpack_require__(273);
	
	/**
	 * Releases the given object back to the object pool.
	 *
	 * @private
	 * @param {Object} [object] The object to release.
	 */
	function releaseObject(object) {
	  var cache = object.cache;
	  if (cache) {
	    releaseObject(cache);
	  }
	  object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
	  if (objectPool.length < maxPoolSize) {
	    objectPool.push(object);
	  }
	}
	
	module.exports = releaseObject;


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * toString
	 */
	
	var str = Object.prototype.toString;
	
	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */
	
	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i];
	
	  i += d;
	
	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
	
	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
	
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity);
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};
	
	exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
	
	  value = Math.abs(value);
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
	
	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
	
	  buffer[offset + i - d] |= s * 128;
	};


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(274);
	
	var _lastID = 1;
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };
	
	
	module.exports = Dispatcher;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule toArray
	 * @typechecks
	 */
	
	var invariant = __webpack_require__(62);
	
	/**
	 * Convert array-like objects to arrays.
	 *
	 * This API assumes the caller knows the contents of the data type. For less
	 * well defined inputs use createArrayFrom.
	 *
	 * @param {object|function|filelist} obj
	 * @return {array}
	 */
	function toArray(obj) {
	  var length = obj.length;
	
	  // Some browse builtin objects can report typeof 'function' (e.g. NodeList in
	  // old versions of Safari).
	  ("production" !== process.env.NODE_ENV ? invariant(
	    !Array.isArray(obj) &&
	    (typeof obj === 'object' || typeof obj === 'function'),
	    'toArray: Array-like object expected'
	  ) : invariant(!Array.isArray(obj) &&
	  (typeof obj === 'object' || typeof obj === 'function')));
	
	  ("production" !== process.env.NODE_ENV ? invariant(
	    typeof length === 'number',
	    'toArray: Object needs a length property'
	  ) : invariant(typeof length === 'number'));
	
	  ("production" !== process.env.NODE_ENV ? invariant(
	    length === 0 ||
	    (length - 1) in obj,
	    'toArray: Object should have keys for indices'
	  ) : invariant(length === 0 ||
	  (length - 1) in obj));
	
	  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
	  // without method will throw during the slice call and skip straight to the
	  // fallback.
	  if (obj.hasOwnProperty) {
	    try {
	      return Array.prototype.slice.call(obj);
	    } catch (e) {
	      // IE < 9 does not support Array#slice on collections objects
	    }
	  }
	
	  // Fall back to copying key by key. This assumes all keys have a value,
	  // so will not preserve sparsely populated inputs.
	  var ret = Array(length);
	  for (var ii = 0; ii < length; ii++) {
	    ret[ii] = obj[ii];
	  }
	  return ret;
	}
	
	module.exports = toArray;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS)
				return 62 // '+'
			if (code === SLASH)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/** Used for native method references */
	var objectProto = Object.prototype;
	
	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;
	
	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
	var keyPrefix = +new Date + '';
	
	module.exports = keyPrefix;


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var keyPrefix = __webpack_require__(268);
	
	/**
	 * Adds a given value to the corresponding cache object.
	 *
	 * @private
	 * @param {*} value The value to add to the cache.
	 */
	function cachePush(value) {
	  var cache = this.cache,
	      type = typeof value;
	
	  if (type == 'boolean' || value == null) {
	    cache[value] = true;
	  } else {
	    if (type != 'number' && type != 'string') {
	      type = 'object';
	    }
	    var key = type == 'number' ? value : keyPrefix + value,
	        typeCache = cache[type] || (cache[type] = {});
	
	    if (type == 'object') {
	      (typeCache[key] || (typeCache[key] = [])).push(value);
	    } else {
	      typeCache[key] = true;
	    }
	  }
	}
	
	module.exports = cachePush;


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectPool = __webpack_require__(273);
	
	/**
	 * Gets an object from the object pool or creates a new one if the pool is empty.
	 *
	 * @private
	 * @returns {Object} The object from the pool.
	 */
	function getObject() {
	  return objectPool.pop() || {
	    'array': null,
	    'cache': null,
	    'criteria': null,
	    'false': false,
	    'index': 0,
	    'null': false,
	    'number': null,
	    'object': null,
	    'push': null,
	    'string': null,
	    'true': false,
	    'undefined': false,
	    'value': null
	  };
	}
	
	module.exports = getObject;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/** Used to pool arrays and objects used internally */
	var arrayPool = [];
	
	module.exports = arrayPool;


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/** Used as the max size of the `arrayPool` and `objectPool` */
	var maxPoolSize = 40;
	
	module.exports = maxPoolSize;


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="node" -o ./modern/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	
	/** Used to pool arrays and objects used internally */
	var objectPool = [];
	
	module.exports = objectPool;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ }
/******/ ])
//# sourceMappingURL=bundle.js.map