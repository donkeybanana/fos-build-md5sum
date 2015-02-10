'use strict';
var extend = require('util-extend');
var crypto = require('crypto');
var glob = require('glob');
var fs = require('fs');
var p = require('path');

var defaults = {
  encoding: 'base64',
  algorithm: 'md5',
  pattern: '**/*.*',
  root: ''
};

function BuildSumMD5(options){
  this.options(extend(defaults, options || {}));
}

BuildSumMD5.prototype.options = function(options) {
  this.config = extend(this.config || {}, options || {});
  return this.config;
};

BuildSumMD5.prototype.create_hash = function(data) {
  var hash = crypto.createHash(this.config.algorithm).update(data);
  return hash.digest(this.config.encoding);
};

BuildSumMD5.prototype.hash_file = function (path) {
  var data = fs.readFileSync(path);
  return this.create_hash(data);
};

BuildSumMD5.prototype.compare = function(file) {
  // Only build apps which have been modified
  var path = p.normalize(this.config.root + '/' + file + '/')
  var oldsum = -1;

  // Cache path
  var pathsum = path + this.config.dest;

  // Read current version
  var newsum = this.read(pathsum);

  // Read cached version
  if (fs.existsSync(pathsum)) {
    oldsum = fs.readFileSync(pathsum).toString('utf-8').split('\n')[0];
  }

  // Compare versions
  if (oldsum === newsum) {
    return false;
  }

  return true;
};

BuildSumMD5.prototype.read = function(path) {
  if (path) {
    path = p.normalize(path + '/');
  }

  var manifest = {};
  var files = glob.sync(path + this.config.pattern);

  files.map(function(file){
    manifest[file.replace(path,'')] = this.hash_file(file);
  }.bind(this));

  return this.create_hash(JSON.stringify(manifest));
};

module.exports = BuildSumMD5;
