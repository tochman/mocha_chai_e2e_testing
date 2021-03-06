#!/usr/bin/env node

require('./config')
const os = require('os');
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')


const optionDefinitions = [
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Display this usage guide.'
    },

    {
        name: 'configure',
        alias: 'c',
        type: Boolean,
        description: 'configures "package.json" with the necessary scripts (same as the "install.js" script).'
    },
    {
        name: 'feature',
        alias: 'f',
        type: String,
        description: 'Scaffolds a feature file.',
        typeLabel: '<name>'
    },
    {
        name: 'spec',
        alias: 's',
        type: String,
        description: 'Scaffolds a spec file.',
        typeLabel: '<name>'
    }
]

const options = commandLineArgs(optionDefinitions)


if (options.spec) {
    let specFileContent
    fs.readFile(resolveOwn('dist/templates/spec.template.txt'), function read(err, data) {
        if (err) {
            console.log(err);
        }
        specFileContent = data;
        fs.access(global.specDir, error => {
            if (error && error.code === 'ENOENT') {
                fs.mkdir(global.specDir);
            }
            const filePath = resolveApp('/spec/' + options.spec + '.spec.js')
            fs.writeFile('.' + filePath, specFileContent, { flag: 'w' }, (err) => {
                if (err) throw err;
                console.log(`Created a spec file named: "${options.spec}.spec.js"`)
            });

        });
    });
}

if (options.feature) {

    let featureFileContent
    fs.readFile(resolveOwn('dist/templates/feature.template.txt'), function read(err, data) {
        if (err) {
            console.log(err);
        }
        featureFileContent = data;
        fs.access(global.featureDir, error => {
            if (error && error.code === 'ENOENT') {
                fs.mkdir(global.featureDir);
            }
            const filePath = resolveApp('/features/' + options.feature + '.feature.js')
            fs.writeFile('.' + filePath, featureFileContent, (err) => {
                if (err) throw err;
                console.log(`Created a feature file named: "${options.feature}.feature.js"`)

            });

        });
    });
}

if (options.configure === true) {
    appPackage.scripts = {
        test: 'npm run features && npm run specs',
        features: 'superstatic src -p 8080 & mocha --timeout 100000 --recursive  --reporter=spec features ; PORT=8080 npm run stop-test-server',
        specs: 'mocha --recursive  --reporter=spec spec',
        server: 'superstatic src -p 3000',
        'stop-test-server': 'lsof -ti tcp:$PORT | xargs kill',
    };

    appPackage.bin = {
        'training-wheels:generate': 'node_modules/e2e_training_wheels/dist/generators.js',
        'training-wheels:install': 'node_modules/e2e_training_wheels/dist/install.js'
    }

    fs.writeFileSync(
        path.join(resolveApp('package.json')),
        JSON.stringify(appPackage, null, 2) + os.EOL
    );
}

if (options.help) {
    const usage = commandLineUsage([
        {
            header: 'E2E Training Wheels',
            content: 'Highly opinionated, minimal test enviroment setup and a set of convinient helpers to be used in acceptance (end-2-end) tests and unit tests. \n Using Mocha, Chai, Chrome Puppeteer and Superstatic as a local server. '
        },
        {
            header: 'Options',
            optionList: optionDefinitions
        },
        {
            content: 'Project home: {underline https://www.npmjs.com/package/e2e_training_wheels}'
        }
    ])
    console.log(usage)
}
