#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

//----------- LOCAL MODULES-----------//
var standardValidations = require('./validation'),
    format              = require('./lib').format;

// Validator class
class Validator {

  // constructor
  constructor() {
    this._validations = {};
    this.addValidations(standardValidations);
  }

  // handler to add custom validations
  addValidations(customValidations) {
    for (var key in customValidations) {
      if (customValidations.hasOwnProperty(key)) {
        this._validations[key] = customValidations[key];
      }
    }
  }

  // Core validate function
  validate(data, validationMap) {
    var response = {
      valid: true
    };

    var isValid = true;
    for (var key in data) {
      var actualValue = data[key],
          validations = validationMap[key];
      if (validations) {
        for (var validation in validations) {
          if (this._validations[validation]) {
            var targetValue = validations[validation];

            isValid = isValid && this._validations[validation](actualValue, targetValue);
            if (!isValid) {
              response.valid = false;
              response.error = format(this._validations[validation].errorMessage, {key: key, targetValue: targetValue}) || 'Validation Failed.';
              return response;
            }
          }
        }
      }
    }
    return response;
  }
}

exports.default = new Validator();

module.exports = exports['default'];