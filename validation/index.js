#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dataType          =  require('./dataType');

var isOneOf           =  require('./isOneOf');

var lengthBetween     =  require('./lengthBetween');

var valueBetween      =  require('./valueBetween');

var standardValidations = {

  dataType       : dataType,

  isOneOf        : isOneOf,

  lengthBetween  : lengthBetween,

  valueBetween   : valueBetween
};

exports.default = standardValidations;

module.exports  = exports['default'];