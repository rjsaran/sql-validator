### sql-validator.js

A simple and light validator for Javascript Objects.

Install the library with `npm install sql-validator`

Supports 4 type of validations:

### Validations

- **dataType** - (Supports most of Validation of chriso's [Validator](https://www.npmjs.com/package/validator) )
                - **isNumeric, isAlpha, isAlphanumeric, isBase84, isAscii, isBoolean, isDecimal, isEmail, isIp, isInt, isJson, isNull, isMongoid, isUrl etc.** -
- **isOneOf** - checks if input is one of actual value

- **lengthBetween** - checks if length of string is between two values (min & max)

- **valueBetween** - checks if a number is between two values (min & max).

And along with these 4 validations one can add own custom validations. See below for Example Code.

Example Code:

```javascript
var Validator = require('./');

// create & update are mode
var mandatoryMap = {
  create: ['id', 'string1', 'status', 'date', 'value'],
  update: ['id']
};

var addressValidator = new Validator(mandatoryMap);

// data to be validated
var address = {
  id: 17282,
  country: 'INDIA',
  status: 1,
  created_at: new Date()
}


// there are two way to create validation map
// 1)
var validationMap1 = {
  date     : addressValidator.check('should be a valid date').dataType('isDate'),
  age      : addressValidator.check().dataType('isNumeric').custom(even),
  string1  : addressValidator.check('length should be between 3 & 30').dataType('isAlphanumeric').lengthBetween({'min': 3, 'max': 30})
};

// 2)
var validationMap2 = {
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


var result1 = addressValidator.isValid(address, validationMap1, 'update');
var result2 = addressValidator.isValid(address, validationMap2, 'update');
```


if address is a valid address than result => {valid: true}
else result => {valid: false, error: 'Validation Failure.', invalid_key: 'key' }

Add Custom Validation Code:

```javascript
var even = function() {
  return function(actual) {
    return actual % 2 === 0 ? true : false;
  };
};

var evenValidator = {
  even: even
};

addressValidator.addValidations(evenValidator);
```


For more usage examples, take a look at example.js.


### License (MIT)

```
Copyright (c) 2016 Ramjeet Saran

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```
