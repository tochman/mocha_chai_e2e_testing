#### For educational purposes only
# Acceptance Test Training Wheels

The Training Wheels server 2 purposes. It provides a minimal test enviroment setup and a set of convinient helpers to be used in acceptance (end-2-end) tests. This package has been created to be used in computer training sessions.

The idea is to simplify the process of setting up a test enviroment with [Mocha](https://www.npmjs.com/package/mocha), [Chai](https://www.npmjs.com/package/chai) and [Puppeteer](https://www.npmjs.com/package/puppeteer). The package uses [Superstatic](https://www.npmjs.com/package/superstatic) as a local server. **Note: Tested on OSX but will probably work on Linux**

## Installation

In your npm project folder, run:

```
$ npm i e2e_training_wheels --save-dev
```

## Usage

Create a `features` folder in you project. 

```bash
$ mkdir features
```

Add the following scripts to `package.json`:

```json
  "scripts": {
    "test": "superstatic src -p 8080 & mocha --timeout 100000 --recursive  --reporter=spec features ; PORT=8080 npm run stop-test-server ",
    "server": "superstatic src -p 3000",
    "stop-test-server": "lsof -ti tcp:$PORT | xargs kill"
  }
```

This setup requires your code to reside in a forder called `src` and your tests in `features`.



Create a test file: `$ touch index.feature.js` and use the following setup:

```javascript
const { expect } = require('chai');
const BrowserHelpers = require('e2e_training_wheels')
const browser = new BrowserHelpers()

describe('sample UI test', () => {
  before( async () => {
    await browser.init()
    await browser.visitPage('http://localhost:8080/')
  });

  beforeEach(async () => {
    await browser.page.reload();
  });

  after(async () => {
    await browser.close();
  });

  it('Whatever message you think is appropriate', async () => {
    //  Write tour test  
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

[ToDo: Write instructions]

### `browser.clickOnButton(element)`

Allows you to click on a button or link

[ToDo: Write instructions]


### `browser.selectOption(element, {option: string})`

Allows you to select an option from a select tag

[ToDo: Write instructions]

### `browese.selectCheckBox(element)`

Allows you to check a checkbox

[ToDo: Write instructions]

### `browser.selectRadioButton(element)`

Allows you to select a radiobutton

[ToDo: Write instructions]

## Debugging

Set breakpoint in tests:

```javascript
await browser.debugTheCode();
```


Set breakpoint in code:

```javascript
debugger;
```