const path = require('path');
global.fs = require('fs');
global.appRoot = require('app-root-path');
console.log(global.appRoot)
global.puts = (error, stdout, stderr) => { console.log(stdout) }
global.specDir = global.appRoot + 'specs';
global.featureDir = global.appRoot + 'features';


module.exports = global