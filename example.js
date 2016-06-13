#!/usr/bin/env node

'use strict';

var Validator = require('./');

var mandatoryMap = {
  create: ['id', 'string1', 'status', 'date', 'value'],
  update: ['id']
};
var customValidator = new Validator(mandatoryMap);

// custom validator 1
var isArray = function () {
  return function (actual) {
    return Array.isArray(actual);
  };
};

// custom validator 2
var even = function() {
  return function(actual) {
    return actual % 2 === 0 ? true : false;
  };
};

var data = {
  id: 102,
  string1: 'teststring',
  status: 1,
  date: '122',
  value: 300,
  age: 56
};

// Example 1:

var newValidations = {
  isArray : isArray,
  even    : even
};

customValidator.addValidations(newValidations);

var validationMap1 = {
  id: {
    dataType : 'isNumeric',
    even     : null
  },
  string1: {
    'dataType':  'isAlphanumeric',
    'lengthBetween': {
      'min': 3,
      'max': 30
    },
  },
  status: {
    'isOneOf': [0, 1]
  },
  value: {
    valueBetween: {
      min: 100,
      max: 300
    }
  }
};

// output: { valid: true }
console.log(customValidator.isValid(data, validationMap1, 'create'));


// Example 2:


var validationMap2 = {
  age      : customValidator.check().dataType('isNumeric').custom(even),
  date     : customValidator.check('should be a valid date').dataType('isDate'),
  string1  : customValidator.check().dataType('isAlphanumeric').lengthBetween({'min': 3, 'max': 30})
};

data.string1 = 'a';
// output: { valid: false, error: 'Validation Failure.', invalid_key: 'string1' }
console.log(customValidator.isValid(data, validationMap2, 'update'));



