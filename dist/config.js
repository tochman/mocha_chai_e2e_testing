const path = require('path');
global.fs = require('fs');
global.appRoot = path.resolve(process.env.PWD) + "/";
console.log(global.appRoot)
global.puts = (error, stdout, stderr) => { console.log(stdout) }
global.specDir = global.appRoot + 'specs';
global.featureDir = global.appRoot + 'features';


module.exports = global