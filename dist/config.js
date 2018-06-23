var path = require('path');
global.appRoot = path.resolve(process.env.PWD) + "/";
global.puts = (error, stdout, stderr) => { console.log(stdout) }

module.exports = global