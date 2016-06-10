### sql-validator.js

A simple and light validator for Javascript Objects.

Supports 4 type of validations:

### Validations

- **dataType** - (Supports all validations of [Validator](https://www.npmjs.com/package/validator) )

- **isOneOf** - checks if input is one of actual value

- **lengthBetween** - checks if length of string is between two values (min & max)

- **valueBetween** - checks if a number is between two values (min & max).

And along with these 4 validations one can add own custom validations. See below for Example Code.

Example Code:

```javascript
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

// mandotory map check if given parameters is present or not in input 
// according to type of operation
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
```


if address is a valid address than result will be {valid: true}
else result will be like  {valid: false, error: 'Validation Failed'}

Add Custom Validation Code:

```javascript
var lessThan = function (actual, target) {
  return actual < target;
};

lessThan.errorMessage = '${key} should be less than ${targetValue}';

var lessThanValidator = {
  lessThan: lessThan
};

addressValidator.addValidations(lessThanValidator);

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
