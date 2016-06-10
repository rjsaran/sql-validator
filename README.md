sql-validator
================

A simple and light validator for Javascript Objects.

Supports 4 type of validations:

1) dataType      => checks the data type of input (isNumeric for numeric values, isDate for date)

2) isOneOf       => checks if input is one of actual value

3) lengthBetween => checks if length of string is between two values (min & max)

4) valueBetween  => checks if a number is between two values (min & max).

And along with these 4 validations one can add own custom validations. See below for Example Code.

Example Code:

<pre><code>

var Validator = require('sql-validator');

var validationMap = {
  id: {
    dataType: 'isNumeric'
  },
  country: {
    'dataType':  'isAlphanumeric',
    'lengthBetween': {
      'min': 3,
      'max': 255
    },
  },
  status: {
    'dataType': 'isBoolean',
    'isOneOf': [0, 1]
  },
  created_at: {
    'dataType': 'isDate'
  }
};

//mandotory map check if given parameters is present or not in input according to type of operation
var options = {
  validationMap: validationMap,
  mandatoryMap: {
    create: ['id', 'address', 'status'],
    update: ['id']
  }
};

var address = {
  id: 17282,
  country: 'INDIA',
  status: 1,
  created_at: new Date()
}

var addressValidator = new Validator(options);

var result = addressValidator.isValid(address, 'update');

</code></pre>


if address is a valid address than result will be {valid: true}
else result will be like  {valid: false, error: 'Validation Failed'}

Add Custom Validation Code:

<pre><code>

var lessThan = function (actual, target) {
  return actual < target;
};

lessThan.errorMessage = '${key} should be less than ${targetValue}';

var lessThanValidator = {
  lessThan: lessThan
};

addressValidator.addValidations(lessThanValidator);

</code></pre>

For more usage examples, take a look at example.js.