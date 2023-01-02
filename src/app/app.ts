import CartPage from "../pages/cart/cart";
import MainPage from "../pages/main/main";
import ProductPage from "../pages/product/product";
import CatalogPage from "../pages/catalog/catalog";
import Page from "../core/templates/page";
import headerElement, { removeActiveClassesForMenu, addListenerForMenu } from "../core/components/header/header";
import footerElement from "../core/components/footer/footer";
import ErrorPage, { ErrorTypes } from "../pages/error/error";

type PageType = MainPage | CartPage | ProductPage | CatalogPage;
const PAGES = {
  CATALOG: 'catalog',
  CART: 'cart',
  PRODUCT: 'product',
}

class App {
  private static container: HTMLElement = document.body;

  // this variable for adding ID to current page...
  private static defaultPageId = 'current-page';

  // This method does changing our pages
  static renderNewPage(idPage: string) {
    // This piece of code answers for remove not all page and main piece of page...
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) currentPageHTML.remove();
    // =============================

    let page: Page | null = null;

    const obj: {[prop: string]: () => PageType} = {
      'cart': () => new CartPage(PAGES.CART),
      'product': () => new ProductPage(PAGES.PRODUCT),
      'catalog': () => new CatalogPage(PAGES.CATALOG),
    }

    page = obj[idPage] ? obj[idPage]() : new ErrorPage(idPage, ErrorTypes.Error_404);

    if (!page) return;

    const pageHTML = page.render();

    pageHTML.id = App.defaultPageId;
    App.container.append(pageHTML);
    removeActiveClassesForMenu();
    App.container.append(footerElement);
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

    addListenerForMenu();
    App.renderNewPage(!currentLocation.length ? PAGES.CATALOG : currentLocation);
    App.container.append(footerElement);
    this.enableRouteChange();
  }
}

export default App;
