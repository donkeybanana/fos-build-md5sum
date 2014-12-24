'use strict';
var extend = require('util-extend');
var crypto = require('crypto');
var glob = require('glob');
var fs = require('fs');
var p = require('path');

var defaults = {
  encoding: 'base64',
  algorithm: 'md5',
  pattern: '**/*.*'
};

module.exports = function (path, config) {
  config = extend(defaults, config);

  if (path) {
    path = p.normalize(path + '/');
  }

  var create_hash = function(data) {
    var hash = crypto.createHash(config.algorithm).update(data);
    return hash.digest(config.encoding);
  };

  var hash_file = function (path) {
    var data = fs.readFileSync(path);
    return create_hash(data);
  };

  var manifest = {};
  var files = glob.sync(path + config.pattern);

  files.map(function(file){
    manifest[file.replace(path,'')] = hash_file(file);
  });

  return create_hash(JSON.stringify(manifest));
};
