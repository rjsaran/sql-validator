#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = lengthBetween;

//----------- THIRD PARTY MODULES ----//
var validator     = require('validator');

function lengthBetween(options) {
  return function () {
    var str = arguments[0] + '';

    return validator.isLength(str, options);
  };
}

module.exports  = exports['default'];