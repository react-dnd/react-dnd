'use strict';

var getDragImageScale = require('../utils/getDragImageScale');

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