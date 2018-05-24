const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');

const globalVariables = _.pick(global, ['browser', 'expect']);

const fill_in = async (page, element, value) => {
  this.inputElement = await page.$(element);
  await this.inputElement.type(value);
}

const click = async (page, element) => {
  this.button = await page.$(element);
  await this.button.click();
}

const getContent = async (page, element) => {
  const requestedContent = page.$eval(element, requestedContent => requestedContent.textContent);
  return requestedContent;
}

const getElement = async (page, element) => {
  const requestedElement = await page.$$(element)
  return requestedElement;
}

// puppeteer options
const opts = {
  headless: false,
  slowMo: 50,
  timeout: 10000
};

// expose variables
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
  global.fill_in = fill_in;
  global.click = click;
  global.getContent = getContent;
  global.getElement = getElement;
});

// close browser and reset global variables
after (function () {
  browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});



