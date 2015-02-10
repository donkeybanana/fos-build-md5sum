/*global describe, it */
'use strict';
var assert = require('assert');
var run = new (require('../'))();

describe('fos-build-md5sum md5', function () {
  it('must return hash for a given path', function () {
    assert(run.compare('test'), 'hash is defined');
  });

  it('must return hash when no path is specified', function () {
    assert(run.compare(null), 'hash is defined');
  });

  it('must throw an error when an invalid path is specified', function () {
    try {
      run.compare('nopathtosee');
    } catch (e) {
      assert(true, 'Error thrown');
    }
  });

  it('must return a consistent hash for the same file tree', function () {
    var a1 = run.read('test/case/a');
    var a2 = run.read('test/case/a');
    assert(a1 === a2, 'Result is consistent');
  });

  it('must return inconsistent hashes for different file trees', function () {
    var a = run.read('test/case/a');
    var b = run.read('test/case/b');
    assert(a !== b, 'Result is inconsistent');
  });

  it('must respect the globbing pattern', function () {
    run.options({ pattern: '*.js' });

    var c1 = run.read('test/case/c/1');
    var c2 = run.read('test/case/c/2');
    assert(c1 === c2, 'Paths match');

    run.options({ pattern: '*' });

    var c3 = run.read('test/case/c/1');
    var c4 = run.read('test/case/c/2');
    assert(c3 !== c4, 'Paths don\'t match');
  });
});
