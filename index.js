'use strict';
var exec = require('child_process').exec;
var fs = require('fs');
module.exports = function (path) {
  function execSync(command) {
    // Run the command in a subshell
    exec(command + ' 2>&1 1>output && echo done! > done');

    // Block the event loop until the command has executed.
    while (!fs.existsSync('done')) {
      // Do nothing
    }

    // Read the output
    var output = fs.readFileSync('output');

    // Delete temporary files.
    fs.unlinkSync('output');
    fs.unlinkSync('done');

    return output;
  }

  var command = 'git log -n1 --pretty=oneline';

  if (path) {
    command += ' -- ' + path;
  }

  return execSync(command);
};
