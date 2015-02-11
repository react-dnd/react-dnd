"use strict";

var getDragImageScale = require("../utils/getDragImageScale");

var TRANSPARENT_PIXEL_SRC = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

var ImagePreloaderMixin = {
  componentDidMount: function componentDidMount() {
    this._cachedImages = {};
    this._readyImages = {};
    this.preloadImages();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.preloadImages();
  },

  componentWillUnmount: function componentWillUnmount() {
    for (var key in this._cachedImages) {
      this._cachedImages[key].src = TRANSPARENT_PIXEL_SRC;
    }

    this._cachedImages = {};
  },

  hasPreloadedImage: function hasPreloadedImage(url) {
    return !!this._readyImages[url];
  },

  getPreloadedImage: function getPreloadedImage(url) {
    if (this.hasPreloadedImage(url)) {
      return this._cachedImages[url];
    }
  },

  preloadImages: function preloadImages() {
    var urls = this.getImageUrlsToPreload();
    urls.forEach(this.preloadImage);
  },

  preloadImage: function preloadImage(url) {
    var _this = this;
    if (!url || this._cachedImages[url]) {
      return;
    }

    var img = new Image();
    img.onload = function () {
      if (_this.isMounted()) {
        _this._readyImages[url] = true;
      }
    };
    img.onerror = function () {
      if (_this.isMounted()) {
        delete _this._cachedImages[url];
      }
    };
    img.src = url;

    this._cachedImages[url] = img;
  },

  getDragImageScale: getDragImageScale
};

module.exports = ImagePreloaderMixin;