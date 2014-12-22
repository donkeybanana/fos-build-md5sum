#!/usr/bin/env node
'use strict';
var meow = require('meow');
var fosBuildMd5sum = require('./');

var cli = meow({
  help: [
    'Usage',
    '  fos-build-md5sum <input>',
    '',
    'Example',
    '  fos-build-md5sum Unicorn'
  ].join('\n')
});

fosBuildMd5sum(cli.input[0]);
