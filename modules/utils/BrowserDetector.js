import memoize from 'lodash/function/memoize';

export const isFirefox = memoize(() =>
  /firefox/i.test(navigator.userAgent)
);

export const isSafari = memoize(() =>
  Boolean(window.safari)
);