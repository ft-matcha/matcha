import React, { useRef } from 'react';

const debounce = function (callback: any, delay = 200) {
  let timeId: NodeJS.Timeout | string | undefined | null;

  return function (this: any, ...args: [any]) {
    const context = this;
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      timeId = null;
      callback.apply(context, args);
    }, delay);
  };
};

export default debounce;
