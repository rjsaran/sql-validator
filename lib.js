#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// Lib Object
var lib = {};

// format takes a template and object and return formatted string
// input: 
// str     => 'key is ${key}'
// options => {key: 'KEY'}
// output:
// 'key is KEY'
lib.format = function format(str, options) {
  return str.replace(
    /\$\{([^{}]*)\}/g,
    function (a, b) {
      b = b.split('.');
      var r = JSON.parse(JSON.stringify(options));
      for (var i in b) {
        r = r[b[i]];
      }

      if(Object.prototype.toString.call(r) === '[object Array]') {
        r = r.join(',');
      } else if(Object.prototype.toString.call(r) === '[object Object]') {
        try {
          r = JSON.stringify(r);
        } catch(e) { /* do nothing */ }
      }

      return typeof r === 'string' || typeof r === 'number' ? r : null;
    }
  );
};

exports.default = lib;

module.exports = exports['default'];