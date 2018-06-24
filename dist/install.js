#!/usr/bin/env node

const { global } = require('./config')

const fs = require('fs');
const fileName = 'package.json';
const file = require(global.appRoot + fileName);

const specDir = './specs';
const helperFileName = "/spec.helper.js"
const helperFilePath = specDir + helperFileName;

console.log('\x1b[33m%s\x1b[0m', `Running 2e2 Installer...`);

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

const bin = {
    "training-wheels": "node_modules/e2e_training_wheels/dist/generators.js"
}
file.scripts = scripts
file.bin = bin

fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
    if (err) return console.log(err);
    console.log('\x1b[33m%s\x1b[0m', `Updated ${fileName} with package specific scripts`);
});



// Set up spec helper
let helperFileContent
fs.readFile('./dist/templates/spec.helper.template.txt', function read(err, data) {
    console.log('\x1b[33m%s\x1b[0m', `Reading templates......`);

    if (err) {
        throw err;
    }
    helperFileContent = data.toString();
    console.log('---')
    fs.access(specDir, error => {
        console.log('\x1b[33m%s\x1b[0m', `Accessing spec folder......`);
        if (error && error.code === 'ENOENT') {
            fs.mkdirSync(specDir.replace('./',''), error =>{
                console.log('\x1b[33m%s\x1b[0m', `Added folder: ${specDir}`);     
            });
        }
        console.log('\x1b[31m%s\x1b[0m', `WARNING: Folder ${specDir} already exist. Moving on...`);

        fs.writeFile(helperFilePath, helperFileContent, (err) => {
            if (err) {
                console.log('error writing file at ' + helperFilePath)
                console.log(err.code)
                throw err;
            } else {
                console.log('\x1b[33m%s\x1b[0m', `${helperFileName} was successfully saved`);
            }
        });
        
    });
});

