#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = isOneOf;

//----------- THIRD PARTY MODULES ----//
var validator     = require('validator');

function isOneOf() {
  var actual = arguments[0] + '',
      target = arguments[1];

  return validator.isIn(actual, target);
}

module.exports  = exports['default'];

module.exports.errorMessage = '${key} should be One Of ${targetValue}';