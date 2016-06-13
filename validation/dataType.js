#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = dataType;

//----------- THIRD PARTY MODULES ----//
var validator = require('validator');

function dataType(dataType) {
  return function () {
    var value = arguments[0] + '';
    return validator[dataType] && validator[dataType](value);
  };
}

module.exports = exports['default'];