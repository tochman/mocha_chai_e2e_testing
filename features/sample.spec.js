const { expect } = require('chai');
const BrowserHelpers = require('./pupeteerHelpers.js')
const browser = new BrowserHelpers()

describe('sample UI test', () => {
  before( async () => {
    await browser.init()
    await browser.visitPage('http://localhost:8080/')
  });

  beforeEach(async ()=>{
    await browser.page.reload();
  });

  after( () => {
    browser.close();
  });

  it('should have the correct page title', async () => {
    expect(await browser.page.title()).to.eql('Puppeteer Mocha');
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
    expect(content).to.eql('Hello Thomas, you selected an Volvo');
  });

  it('should display selected car in message', async () => {
    await browser.fillIn("input[name='name']", {with: "Anders"})
    await browser.selectOption("select[name='cars']", {option: 'saab' })
    await browser.clickOnButton("input[value='Click me']")
    let content = await browser.getContent("div[id='output']")
    expect(content).to.eql('Hello Anders, you selected an Saab');
  });

  it('displays Subscription message', async () => {
    await browser.selectCheckBox("input[id='subscribe']")
    await browser.selectRadioButton("input[id='radio-button']")
    await browser.clickOnButton("input[value='Subscribe']")
    let content = await browser.getContent("div[id='subscription-text']")
    expect(content).to.contain('Alright!');
  });
});
