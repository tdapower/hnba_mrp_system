import { MrpSystemPage } from './app.po';

describe('mrp-system App', function() {
  let page: MrpSystemPage;

  beforeEach(() => {
    page = new MrpSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
