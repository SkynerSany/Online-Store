import CartPage from "../cart/cart";
import MainPage from "../main/main";
import ProductPage from "../product/product";
import CatalogPage from "../catalog/catalog";
import Page from "../../core/templates/page";
import headerElement, { removeActiveClassesForMenu, addListenerForHeader, hideHeaderLineMenu } from "../../core/components/header/header";
import footerElement from "../../core/components/footer/footer";
import ErrorPage, { ErrorTypes } from "../error/error";

type PageType = MainPage | CartPage | ProductPage | CatalogPage;

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

    const obj: {[prop: string]: () => PageType} = {
      'main-page': () => new MainPage('main-page'),
      'cart-page': () => new CartPage('cart-page'),
      'product-page': () => new ProductPage('product-page'),
      'catalog-page': () => new CatalogPage('catalog-page'),
    }

    page = obj[idPage] ? obj[idPage]() : new ErrorPage(idPage, ErrorTypes.Error_404);

    if (!page) return;

    const pageHTML = page.render();

    pageHTML.id = App.defaultPageId;
    App.container.append(pageHTML);
    removeActiveClassesForMenu();
    hideHeaderLineMenu(idPage);
    App.container.append(footerElement);
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
    const currentLocation = document.location.hash.slice(1);

    App.container.append(headerElement);

    addListenerForHeader();
    App.renderNewPage(!currentLocation.length ? 'main-page' : currentLocation);
    App.container.append(footerElement);
    this.enableRouteChange();
  }
}

export default App;