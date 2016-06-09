#!/usr/bin/env node

'use strict';

var Validator = require('./');

var validationMap = {
  id: {
    dataType: 'isNumeric'
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
  date: {
    'dataType': 'isDate'
  },
  value: {
    valueBetween: {
      min: 100,
      max: 300
    }
  }
};

var options = {
  validationMap: validationMap,
  mandatoryMap: {
    create: ['id', 'string1', 'status', 'date', 'value'],
    update: ['id']
  }
};

var customValidator = new Validator(options);

var lessThan = function (actual, target) {
  return actual < target;
};
lessThan.errorMessage = '${key} should be less than ${targetValue}';

var newValidations = {
  lessThan: lessThan
};

customValidator.addValidations(newValidations);

var data = {
  id: 102,
  string1: 'teststring',
  status: 1,
  date: '122',
  value: 300
};

console.log(customValidator.isValid(data, 'create'));