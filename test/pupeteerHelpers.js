const puppeteer = require('puppeteer');

class BrowserHelpers {
  constructor() { }

  async init() {
    await this.newBrowser()
    await this.newPage()
  }

  async newBrowser() {
    const options = {
      headless: false,
      slowMo: 50,
      timeout: 100000,
      devtools: true
    };

    this.browser = await puppeteer.launch(options)
  }

  async newPage() {
    this.page = await this.browser.newPage()
  }

  async visitPage(url) {
    return await this.page.goto(url)
  }

  async close() {
    await this.browser.close()
  }

  async fillIn(selector, options) {
    await this.page.waitForSelector(selector)
    this.inputElement = await this.page.$(selector)
    await this.inputElement.type(options.with)
  }

  async clickOnButton(selector) {
    await this.page.waitForSelector(selector)
    await this.page.click(selector)
  }

  async getContent(element) {
    const requestedContent = await this.page.$eval(element, requestedContent => requestedContent.textContent);
    return requestedContent;
  }

  async getElement(element) {
    const requestedElement = await this.page.$$(element)
    return requestedElement;
  }

  async selectOption(selector, options){
    await this.page.select(selector, options.with);
  }

  async takeScreenshot(){
    await this.page.screenshot({path: 'screenshot.png'});
    return;
  }

  async debugTheCode() {
    await this.page.evaluate(() => {debugger;});
  }

}

module.exports = BrowserHelpers