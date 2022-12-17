import BasketPage from "../basket";
import MainPage from "../main";
import ProductPage from "../product";
import Page from "../../core/templates/page";
import headerElement from "../../core/components/header";
import ErrorPage, { ErrorTypes } from "../error";

export const enum PageIds {
  Main = 'main-page',
  Basket = 'basket-page',
  Product = 'product-page',
}

class App {
  private static container: HTMLElement = document.body;

  // this variable for adding ID to current page...
  private static defaultPageId = 'current-page';

  private initialPage: MainPage;

  // This method does changing our pages
  static renderNewPage(idPage: string) {
    // This piece of code answers for remove not all page and main piece of page...
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) currentPageHTML.remove();
    // =============================

    let page: Page | null = null;

    if (idPage === 'main-page') {
      page = new MainPage(idPage);
    } else if (idPage === 'basket-page') {
      page = new BasketPage(idPage);
    } else if (idPage === 'product-page') {
      page = new ProductPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
  }

  // This method gets changing hash and call method "renderNewPage"...
  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const { hash } = window.location;
      App.renderNewPage(hash.slice(1));
    });
  }
  // ===============================

  run() {
    App.container.append(headerElement);
    App.renderNewPage('main-page');
    this.enableRouteChange();
  }
}
console.log(headerElement);

export default App;