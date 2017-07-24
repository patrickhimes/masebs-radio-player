import { MasebsRadioPlayerPage } from './app.po';

describe('masebs-radio-player App', () => {
  let page: MasebsRadioPlayerPage;

  beforeEach(() => {
    page = new MasebsRadioPlayerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
