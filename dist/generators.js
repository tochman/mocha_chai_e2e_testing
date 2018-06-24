#!/usr/bin/env node

const exec = require('child_process').exec
const { global } = require('./config')
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
        description: 'configures "package.json" with the necessary scripts '
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

console.log(options)
if (options.spec) {
    console.log(`Creating spec file named: "${options.spec}.js"`)

}

if (options.feature) {

    let featureFileContent 
    fs.readFile('./dist/templates/feature.template.txt', function read(err, data) {
        if (err) {
            console.log(err);
        }
        featureFileContent = data;
        fs.access(global.featureDir, error => {
            if (error && error.code === 'ENOENT') {
                fs.mkdir(global.featureDir);
            }
            const filePath = global.featureDir + '/' + options.feature + '.feature.js'
            fs.writeFile(filePath, featureFileContent, (err) => {
                if (err) throw err;
                console.log(`Created a feature file named: "${options.feature}.js"`)
    
            });
    
        });
    });

    



}

if (options.configure === true) {
    exec('node dist/install.js ', global.puts)
    exec('npm link', global.puts)
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
            header: 'Alias commands',
            content: 'use "training-wheels <flag>"'
        },
        {
            content: 'Project home: {underline https://www.npmjs.com/package/e2e_training_wheels}'
        }
    ])
    console.log(usage)
}
