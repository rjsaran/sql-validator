#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

//----------- CORE MODULES  ----------//
var util = require('util');

//----------- LOCAL MODULES ----------//
var sqlValidator  = require('./sqlValidator');

// Validator Base Class
class SqlValidator {

  // constructor
  constructor(options) {
    options = options || {};

    this.mandatoryMap  = options.mandatoryMap  || {};
    this.validationMap = options.validationMap || {};
  }

  // main function which check if data is valid or not
  // response
  // if valid     => {valid: true}
  // if not valid => {valid: false, error: 'validation failed'}
  isValid(data, mode) {
    var validationMap = this.validationMap,
        mandatoryMap  = this.mandatoryMap,
        missing       = [],
        response      = {};

    if (!mode) {
      response.valid = false;
      response.error = 'operation mode missing';
      return response;
    }
    if (!mandatoryMap[mode]) {
      response.valid = false;
      response.error = 'invalid mode for mandatory map';
      return response;
    }

    mandatoryMap[mode].forEach(param => {
      if (data[param] === undefined) {
        missing.push(param);
      }
      if (data[param] && typeof data[param] === 'string' && !data[param].trim()) {
        missing.push(param);
      }
    });

    // missing parameters
    if (missing.length) {
      response.valid = false;
      response.error = util.format('Missing mandatory parameter(s): %s', missing.join(','));
      return response;
    }

    return sqlValidator.validate(data, validationMap);
  }

  // handler function to add custom validations 
  addValidations(customValidations) {
    sqlValidator.addValidations(customValidations);
  }
}

exports.default = SqlValidator;

module.exports = exports['default'];