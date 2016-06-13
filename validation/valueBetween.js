#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = valueBetween;

function valueBetween(options) {
  return function () {
    var value = arguments[0],
      min = options.min || 0,
      max = options.max;

    return value >= min && (max === undefined || value <= max);
  };
}


module.exports  = exports['default'];
