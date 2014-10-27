'use strict';

var getDragImageScale = require('../utils/getDragImageScale');

var TRANSPARENT_PIXEL_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

var ImagePreloaderMixin = {
  componentDidMount() {
    this._cachedImages = {};
    this._readyImages = {};
    this.preloadImages();
  },

  componentDidUpdate() {
    this.preloadImages();
  },

  componentWillUnmount() {
    for (var key in this._cachedImages) {
      this._cachedImages[key].src = TRANSPARENT_PIXEL_SRC;
    }

    this._cachedImages = {};
  },

  hasPreloadedImage(url) {
    return !!this._readyImages[url];
  },

  getPreloadedImage(url) {
    if (this.hasPreloadedImage(url)) {
      return this._cachedImages[url];
    }
  },

  preloadImages() {
    var urls = this.getImageUrlsToPreload();
    urls.forEach(this.preloadImage);
  },

  preloadImage(url) {
    if (!url || this._cachedImages[url]) {
      return;
    }

    var img = new Image();
    img.onload = () => {
      if (this.isMounted()) {
        this._readyImages[url] = true;
      }
    };
    img.onerror = () => {
      if (this.isMounted()) {
        delete this._cachedImages[url];
      }
    };
    img.src = url;

    this._cachedImages[url] = img;
  },

  getDragImageScale: getDragImageScale
};

module.exports = ImagePreloaderMixin;