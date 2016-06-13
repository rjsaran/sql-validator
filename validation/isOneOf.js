#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = isOneOf;

//----------- THIRD PARTY MODULES ----//
var validator     = require('validator');

function isOneOf(target) {
  return function () {
    var actual = arguments[0] + '';

    return validator.isIn(actual, target);
  };
}

module.exports  = exports['default'];