export class StocksPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('stocks-app p')).getText();
  }
}
