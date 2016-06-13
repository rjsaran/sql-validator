#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


//----------- LOCAL MODULES --------//
var standatadValidations = require('./validation');

class sequence {
  constructor(errMsg) {
    this.errMsg      = errMsg;
    this.validations = [];
  }

  dataType(dataType) {
    this.validations.push(standatadValidations.dataType(dataType));
    return this;
  }

  isOneOf(target) {
    this.validations.push(standatadValidations.isOneOf(target));
    return this;
  }

  valueBetween(options) {
    this.validations.push(standatadValidations.valueBetween(options));
    return this;
  }

  lengthBetween(options) {
    this.validations.push(standatadValidations.lengthBetween(options));
    return this;
  }

  custom(customFn, options) {
    this.validations.push(customFn(options));
    return this;
  }
}

exports.default = sequence;

module.exports  = exports['default'];