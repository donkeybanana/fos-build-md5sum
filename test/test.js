/*global describe, it */
'use strict';
var assert = require('assert');
var run = require('../');

describe('fos-build-md5sum node module', function () {
  it('must return HEAD for a given path', function () {
    run('test', function(HEAD){
        assert(HEAD, 'HEAD is defined');
    });
  });

  it('must return HEAD when no path is specified', function () {
    run(null, function(err, HEAD){
        assert(HEAD, 'HEAD is defined');
    });
  });
});
