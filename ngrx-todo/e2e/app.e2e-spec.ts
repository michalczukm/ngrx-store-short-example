import { NgrxTodoPage } from './app.po';

describe('ngrx-todo App', () => {
  let page: NgrxTodoPage;

  beforeEach(() => {
    page = new NgrxTodoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
