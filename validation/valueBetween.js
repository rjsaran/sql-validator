#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = valueBetween;

function valueBetween() {
  var value   = arguments[0],
      options = arguments[1],
      min     = options.min || 0,
      max     = options.max;

  return value >= min && (max === undefined || value <= max);
}


module.exports  = exports['default'];

module.exports.errorMessage = '${key} should be between ${targetValue.min} & ${targetValue.max}';