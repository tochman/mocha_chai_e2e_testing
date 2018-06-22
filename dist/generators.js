#!/usr/bin/env node

var fs = require('fs');

var sys = require('util')
var exec = require('child_process').exec;
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
    console.log(`Creating a feature file named: "${options.feature}.js"`)
}

if (options.configure === true) {
    console.log('do')
    // run node install.js'
    function puts(error, stdout, stderr) { console.log(stdout) }
    exec('node dist/install.js ', puts)
    exec('node dist/spec_helper.generator.js', puts)

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
