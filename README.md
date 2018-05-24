#### For educational purposes only
# Mocha Chai Puppeteer Helpers

This is a WIP project to be used in computer training sessions.

[TODO: Write instructions]

## Usage

Add the following scripts to `package.json`:

```json
"scripts": {
    "test": "superstatic src -p 8080 & mocha features --recursive test ; PORT=8080 npm run stop-test-server ",
    "server": "superstatic src -p 3000",
    "stop-test-server": "lsof -ti tcp:$PORT | xargs kill"
  }
```

This setup requires your code to reside in a forder called `src` and your tests in `features`.

Create a `features` folder in you project. 

```bash
$ mkdir features
```

Create a test file: `$ touch index.feature.js` and use the following setup:

```javascript
const { expect } = require('chai');
const BrowserHelpers = require('mocha_chai_e2e_testing')
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

* `browser.getContent()`
* `browser.fillIn()` 
* `browser.clickOnButton()`
* `browser.getElement()`
* `browser.selectOption()`


