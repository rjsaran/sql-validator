#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = lengthBetween;

//----------- THIRD PARTY MODULES ----//
var validator     = require('validator');

function lengthBetween() {
  var str     = arguments[0] + '',
      options = arguments[1];

  return validator.isLength(str, options);
}

module.exports  = exports['default'];

module.exports.errorMessage = '${key} length should be between ${targetValue.min} & ${targetValue.max}';