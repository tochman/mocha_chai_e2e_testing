#### For educational purposes only
# Acceptance Test Training Wheels



The E2E Training Wheels serves 2 purposes. It provides a minimal test enviroment setup and a set of convinient helpers to be used in acceptance (end-2-end) tests. It's highly opinionated meaning that most of the setup is done for you to allow you to focus the dovelopment pracess, rather than the cofiguration of the test enviroment. This package has been created to be used in computer training sessions.

The idea is to simplify the process of setting up a test enviroment with [Mocha](https://www.npmjs.com/package/mocha), [Chai](https://www.npmjs.com/package/chai) and [Puppeteer](https://www.npmjs.com/package/puppeteer). The package uses [Superstatic](https://www.npmjs.com/package/superstatic) as a local server. **Note: Tested on OSX but will probably work on Linux**

## Installation

In your npm project folder, run:

```
$ npm i e2e_training_wheels --save-dev
```

## Usage

### Test Runners

This setup requires your code to reside in a forder called `src` and your tests in  two separate folders. We will have our acceptance tests in the `features` folder, and our unit tests in the `spec` folder. Note: you are free to change these folder names if you like but will have to modify the scripts .



Add the following scripts to `package.json`:

```json
"scripts": {
    "test": "npm run features && npm run specs",
    "features": "superstatic src -p 8080 & mocha --timeout 100000 --recursive  --reporter=spec features ; PORT=8080 npm run stop-test-server ",
    "specs": "mocha --recursive  --reporter=spec spec",
    "server": "superstatic src -p 3000",
    "stop-test-server": "lsof -ti tcp:$PORT | xargs kill"
  }

```
The command `npm run features` will start a local webserver, launch Chrome and run your acceptance tests. 

`npm run specs` will run your unit tests.

If you execute `npm test` in your terminal, both your acceptance tests and unit tests will be run.

### Adding Unint specs

Create a `spec` folder in you project. 

```bash
$ mkdir spec
```
Create a test file: `$ touch sample.spec.js` and use the following setup:

```javascript 
const { expect } = require('chai');

describe('sample spec', () => {
    it('expect true to eq true', async () => {
        expect(true).to.eql(true); 
    });

})
```

### Adding acceptance tests

Create a `features` folder in you project. 

```bash
$ mkdir features
```

Create a test file: `$ touch index.feature.js` and use the following setup:

```javascript
const { expect } = require('chai');
const BrowserHelpers = require('e2e_training_wheels');
const browser = new BrowserHelpers();

describe('sample UI test', () => {
  before( async () => {
    await browser.init();
    await browser.visitPage('http://localhost:8080/');
  });

  beforeEach(async () => {
    await browser.page.reload();
  });

  after(async () => {
    await browser.close();
  });

  it('your test message', async () => {
    //  Write tour scenario  
  });
});

```

## Available helpers

* `browser.getContent(element)`
* `browser.fillIn(element, {with: string})` 
* `browser.clickOnButton(element)`
* `browser.getElement(element)`
* `browser.selectOption(element, {option: string})`
* `browese.selectCheckBox(element)`
* `browser.selectRadioButton(element)`
* `browser.debugTheCode()`

## Examples

### `browser.fillIn(element, {with: string})` 

Allows you to fill in an input field with a value. Takes 2 arguments to identify the element and pass in the value to set.

Identifing an input field by `id`:

```javascript
await browser.fillIn("input[id='the-id']", {with: "Whatever value"})
```

Identifing an input field by `name`:

```javascript
await browser.fillIn("input[name='the-name']", {with: "Whatever value"})
```

### `browser.getContent(element)`

Allows you to get the text value of an element. 

Usage example:

```javascript
let content = await browser.getContent("div[id='subscription-message']")
expect(content).to.contain('Thank you, your subscription has been confirmed!');
```

### `browser.clickOnButton(element)`

Allows you to click on a button or link.

Usage example:

```js
await browser.clickOnButton("input[value='Subscribe']")
```


### `browser.selectOption(element, {option: string})`

Allows you to select an option from a select tag

Usage example:

```javascript
await browser.selectOption("select[name='subscription-type']", {option: 'yearly' })

```

### `browese.selectCheckBox(element)`

Allows you to check a checkbox

Usage example:

```javascript
await browser.selectCheckBox("input[id='subscribe']")

```

### `browser.selectRadioButton(element)`

Allows you to select a radiobutton

Usage example:

```javascript
await browser.selectRadioButton("input[id='radio-button']")

```

## Debugging

Set breakpoint in tests:

```javascript
await browser.debugTheCode();
```


Set breakpoint in code:

```javascript
debugger;
```