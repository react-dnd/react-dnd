'use strict';

const TRANSPARENT_PIXEL_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const emptyImg = document.createElement('img');

emptyImg.src = TRANSPARENT_PIXEL_SRC;

export default function getEmptyImage() {
  return emptyImg;
}