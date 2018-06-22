const { expect } = require('chai');
const BrowserHelpers = require('../dist/pupeteerHelpers.js')
const browser = new BrowserHelpers()

context('User requests index.html', () => {
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

  it('renders the correct page title', async () => {
    expect(await browser.page.title()).to.eql('Puppeteer Mocha');
  });

  it('renders a heading', async () => {
    const HEADING_SELECTOR = 'h1';
    let heading = await browser.getContent(HEADING_SELECTOR);
    expect(heading).to.eql('Page Title');
  });

  it('renders a single content section', async () => {
    const BODY_SELECTOR = '.main-content';
    let element = await browser.getElement(BODY_SELECTOR);
    expect(element).to.have.lengthOf(1);
  });

  it('renders hello message', async () => {
    await browser.fillIn("input[name='name']", {with: "Thomas"})
    await browser.clickOnButton("input[value='Click me']")
    let content = await browser.getContent("div[id='output']")
    expect(content).to.eql('Hello Thomas, you selected an Volvo');
  });

  it('renders selected car in message', async () => {
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
