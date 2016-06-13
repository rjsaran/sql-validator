#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

//----------- CORE MODULES  ----------//
var util = require('util');

//----------- LOCAL MODULES ----------//
var standardValidations = require('./validation');
var chain               = require('./chain');

// Validator Base Class
class Validator {

  // constructor
  constructor(mandatoryMap) {
    this.validations         = {};
    this.mandatoryMap        = mandatoryMap || {};
    this.DEFAULT_FAILURE_MSG = 'Validation Failure.';
    this.addValidations(standardValidations);
  }

  // main function which check if data is valid or not
  // response
  // if valid     => {valid: true}
  // if not valid => {valid: false, error: 'Validation Failure.', failure_key: 'key'}
  isValid(data, validationMap, mode) {
    var mandatoryMap  = this.mandatoryMap,
        missing       = [],
        response      = {};

    // If no mode Specified or mode is not present in mandotory map
    // we are not throwing any error just validating the data
    if (!mode || !mandatoryMap[mode]) {
      return this.validate(data, validationMap);
    }

    mandatoryMap[mode].forEach(param => {
      if (data[param] === undefined || data[param] === null) {
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

    return this.validate(data, validationMap);
  }

  // handler to add custom validations
  addValidations(customValidations) {
    for (var key in customValidations) {
      if (customValidations.hasOwnProperty(key)) {
        this.validations[key] = customValidations[key];
      }
    }
  }

  // Core validate function
  validate(data, validationMap) {
    validationMap = validationMap || {};

    var isValid   = true,
        response    = {
          valid: true
        };

    for (var key in data) {
      var actualValue = data[key],
          rules = validationMap[key];

      if (rules) {
        if(rules instanceof chain) {
          for (var i in rules.validations) {
            isValid = isValid && rules.validations[i](actualValue);

            if (!isValid) {
              response.valid         = false;
              response.error         = rules.errMsg || this.DEFAULT_FAILURE_MSG;
              response.invalid_key   = key;
              return response;
            }
          }
        }
        else {
          for (var rule in rules) {
            if (this.validations[rule]) {
              var targetValue = rules[rule];

              isValid = isValid && this.validations[rule](targetValue)(actualValue);

              if (!isValid) {
                response.valid         = false;
                response.error         = this.DEFAULT_FAILURE_MSG;
                response.invalid_key   = key;
                return response;
              }
            }
          }
        }
      }
    }
    return response;
  }

  check(errMsg) {
    return new chain(errMsg);
  }
}

exports.default = Validator;

module.exports = exports['default'];