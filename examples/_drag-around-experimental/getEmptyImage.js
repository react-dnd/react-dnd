'use strict';

var TRANSPARENT_PIXEL_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    emptyImg = document.createElement('img');

emptyImg.src = TRANSPARENT_PIXEL_SRC;

function getEmptyImage() {
  return emptyImg;
}

module.exports = getEmptyImage;