import { MeanSamplePage } from './app.po';

describe('mean-sample App', () => {
  let page: MeanSamplePage;

  beforeEach(() => {
    page = new MeanSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
