import { AngularJwtAuthPage } from './app.po';

describe('auth-demo App', () => {
  let page: AngularJwtAuthPage;

  beforeEach(() => {
    page = new AngularJwtAuthPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
