#!/usr/bin/env node
'use strict';
var meow = require('meow');
var app = require('./');

var cli = meow({
  help: [
    'Usage',
    '  fos-build-md5sum <path>',
    '',
    'Example',
    '  fos-build-md5sum /var/www'
  ].join('\n')
});

process.stdout.write(app.md5(cli.input[0]));
