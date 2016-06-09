#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = dataType;

//----------- THIRD PARTY MODULES ----//
var validator = require('validator');

function dataType() {
  var value    = arguments[0] + '',
      dataType = arguments[1];

  return validator[dataType] && validator[dataType](value);
}

module.exports = exports['default'];

module.exports.errorMessage = '${key} should be ${targetValue}';