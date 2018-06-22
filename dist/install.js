#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
global.appRoot = path.resolve(__dirname);
var fileName = 'package.json';
var relativePath = '/../'
var file = require(appRoot + relativePath + fileName);

// Set up packeage specific scripts
// Note that this overwrites everything in the 'scripts' key
// TODO: Refactor to amending the key
const scripts = {
    "test": "npm run features && npm run specs",
    "features": "superstatic src -p 8080 & mocha --timeout 100000 --recursive  --reporter=spec features ; PORT=8080 npm run stop-test-server ",
    "specs": "mocha --recursive  --reporter=spec spec",
    "server": "superstatic src -p 3000",
    "stop-test-server": "lsof -ti tcp:$PORT | xargs kill"

}
file.scripts = scripts

fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
    if (err) return console.log(err);
    console.log('\x1b[33m%s\x1b[0m', `Updated ${fileName} with package specific scripts`);
});

