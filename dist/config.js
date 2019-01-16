global.fs = require('fs');
global.path = require('path');
global.appRoot = require('app-root-path').toString();
global.appDirectory = path.relative(process.cwd(), global.appRoot);
global.resolveApp = relativePath => path.resolve(global.appRoot, relativePath);
global.resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

global.helperFile = global.appDirectory +  'spec.helper.js';

global.specDir = global.appRoot + '/spec';
global.specFile = global.appDirectory +  '/spec/first.spec.js';


global.featureDir = global.appRoot + '/features';
global.featureFile = global.appDirectory +  '/features/application.feature.js';


global.srcDir = global.appRoot + '/src';
global.indexFile = global.appDirectory +  '/src/index.html';

global.appPackage = require(resolveApp('package.json'))

module.exports = global