#!/usr/bin/env node
'use strict';

const os = require('os');
const config = require('./config')
const originalDirectory = process.cwd();

function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith('/');
    if (hasSlash && !needsSlash) {
        return inputPath.substr(0, inputPath.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${inputPath}/`;
    } else {
        return inputPath;
    }
}


console.log('\x1b[33m%s\x1b[0m', `Running e2e Training Wheels Configuration...`);

// Set up package specific scripts
// Note that this overwrites everything in the 'scripts' key
// TODO: Refactor to amending the key

// let appPackage = JSON.parse(appPackageJson)

appPackage.scripts = {
    test: 'npm run features && npm run specs',
    features: 'superstatic src -p 8080 & mocha --timeout 100000 --recursive  --reporter=spec features ; PORT=8080 npm run stop-test-server',
    specs: 'mocha --recursive  --reporter=spec spec',
    server: 'superstatic src -p 3000',
    'stop-test-server': 'lsof -ti tcp:$PORT | xargs kill',
};

appPackage.bin = {
    "training-wheels:generate": "node_modules/e2e_training_wheels/dist/generators.js",
    "training-wheels:install": "node_modules/e2e_training_wheels/dist/install.js"
}

fs.writeFileSync(
    path.join(resolveApp('package.json')),
    JSON.stringify(appPackage, null, 2) + os.EOL
);


// Set up spec helper
let helperFileContent
fs.readFile(resolveOwn('dist/templates/spec.helper.template.txt'), (err, data) => {
    console.log('\x1b[33m%s\x1b[0m', `Reading spec helper template...`);

    if (err) {
        throw err;
    }
    helperFileContent = data.toString();
    console.log('---')
    console.log('\x1b[33m%s\x1b[0m', `Accessing spec folder......`);
    fs.writeFile(resolveApp(helperFile), helperFileContent, { flag: 'w' }, (err) => {
        if (err) {
            console.log('\x1b[31m%s\x1b[0m', `WARNING: Error writing file at ${helperFile}`)
            console.log(err.code)
            throw err;
        } else {
            console.log('\x1b[33m%s\x1b[0m', `${helperFile} was successfully created`);
        }
    });
});




// Set up scaffolded feature
let featureFileContent
fs.readFile(resolveOwn('dist/templates/feature.template.txt'), (err, data) => {
    console.log('\x1b[33m%s\x1b[0m', `Reading feature file template...`);

    if (err) {
        throw err;
    }
    featureFileContent = data.toString();
    console.log('---')
    fs.access(featureDir, error => {
        console.log('\x1b[33m%s\x1b[0m', `Accessing features folder......`);
        if (error && error.code === 'ENOENT') {
            fs.mkdirSync(featureDir.replace('./', ''), error => {
                console.log('\x1b[33m%s\x1b[0m', `Added folder: ${featureDir}`);
            });
        }
    
        fs.writeFile('.' + resolveApp(featureFile), featureFileContent, { flag: 'w' }, (err) => {
            if (err) {
                console.log('error writing file at ' + featureFile)
                console.log(err.code)
                throw err;
            } else {
                console.log('\x1b[33m%s\x1b[0m', `${featureFile} was successfully saved`);
            }
        });
    
    });
});

// Set up scaffolded spec
let specFileContent
fs.readFile(resolveOwn('dist/templates/spec.template.txt'), (err, data) => {
    console.log('\x1b[33m%s\x1b[0m', `Reading spec file template...`);

    if (err) {
        throw err;
    }
    specFileContent = data.toString();
    console.log('---')
    fs.access(specDir, error => {
        console.log('\x1b[33m%s\x1b[0m', `Accessing spec folder......`);
        if (error && error.code === 'ENOENT') {
            fs.mkdirSync(specDir.replace('./', ''), error => {
                console.log('\x1b[33m%s\x1b[0m', `Added folder: ${specDir}`);
            });
        }
    
        fs.writeFile('.' + resolveApp(specFile), specFileContent, { flag: 'w' }, (err) => {
            if (err) {
                console.log('error writing file at ' + specFile)
                console.log(err.code)
                throw err;
            } else {
                console.log('\x1b[33m%s\x1b[0m', `${specFile} was successfully saved`);
            }
        });
    
    });
});

// Set up scaffolded spec
let indexFileContent
fs.readFile(resolveOwn('dist/templates/index.html.template.txt'), (err, data) => {
    console.log('\x1b[33m%s\x1b[0m', `Reading index.html file template...`);

    if (err) {
        throw err;
    }
    indexFileContent = data.toString();
    console.log('---')
    fs.access(srcDir, error => {
        console.log('\x1b[33m%s\x1b[0m', `Accessing spec folder......`);
        if (error && error.code === 'ENOENT') {
            fs.mkdirSync(srcDir.replace('./', ''), error => {
                console.log('\x1b[33m%s\x1b[0m', `Added folder: ${srcDir}`);
            });
        }
    
        fs.writeFile('.' + resolveApp(indexFile), indexFileContent, { flag: 'w' }, (err) => {
            if (err) {
                console.log('error writing file at ' + indexFile)
                console.log(err.code)
                throw err;
            } else {
                console.log('\x1b[33m%s\x1b[0m', `${indexFile} was successfully saved`);
            }
        });
    
    });
});




