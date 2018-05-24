const { expect } = require('chai');
const BrowserHelpers = require('./pupeteerHelpers.js')
const browser = new BrowserHelpers()

describe('sample UI test', () => {
  before(async () => {
    await browser.init()
    await browser.visitPage('http://localhost:8080/')
  });

  after(async () => {
    await browser.close()
  })

  it('should have the correct page title', async () => {
    let page = browser.page
    expect(await page.title()).to.eql('Puppeteer Mocha');
  });

  it('should have a heading', async () => {
    const HEADING_SELECTOR = 'h1';
    let heading = await browser.getContent(HEADING_SELECTOR);
    expect(heading).to.eql('Page Title');
  });

  it('should have a single content section', async () => {
    const BODY_SELECTOR = '.main-content';
    let element = await browser.getElement(BODY_SELECTOR);
    expect(element).to.have.lengthOf(1);
  });

  it('should display hello message', async () => {
    await browser.fillIn("input[name='name']", {with: "Thomas"})
    await browser.clickOnButton("input[value='Click me']")
    let content = await browser.getContent("div[id='output']")
    await browser.takeSnapshot();
    expect(content).to.eql('Hello Thomas');
  });

  it('should display selected car', async () => {
    await browser.selectOption("select[name='cars']", {with: 'Saab' })

    let content = await browser.getContent("div[id='output']")
    expect(content).to.eql('Hello Thomas');
  });
});

