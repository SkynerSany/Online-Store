import CartPage from "../pages/cart/cart";
import ProductPage from "../pages/product/product";
import CatalogPage from "../pages/catalog/catalog";
import Page from "../core/templates/page";
import headerElement, { addListenerForMenu } from "../core/components/header/header";
import footerElement from "../core/components/footer/footer";
import ErrorPage, { ErrorTypes } from "../pages/error/error";

type PageType = CartPage | ProductPage | CatalogPage;
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

    const pages: {[prop: string]: () => PageType} = {
      'cart': () => new CartPage(PAGES.CART),
      'product': () => new ProductPage(PAGES.PRODUCT),
      'catalog': () => new CatalogPage(PAGES.CATALOG),
    }

    page = pages[idPage] ? pages[idPage]() : new ErrorPage(idPage, ErrorTypes.Error_404);

    if (!page) return;

    const pageHTML = page.render();

    pageHTML.id = App.defaultPageId;
    App.container.append(pageHTML);
    App.container.append(footerElement);
  }

  private clearQuery(): void {
    const link = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }${ window.location.hash }`;   
    window.history.pushState({ path: link }, '', link);
  }

  // This method gets changing hash and call method "renderNewPage"...
  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const { hash } = window.location;
      this.clearQuery();
      App.renderNewPage(hash.slice(1, hash.indexOf('-') > 0 ? hash.indexOf('-') : hash.length + 1));
    });
  }
  // ===============================

  run() {
    const { hash } = window.location;
    const currentLocation = hash.slice(1, hash.indexOf('-') > 0 ? hash.indexOf('-') : hash.length + 1);

    App.container.append(headerElement);

    addListenerForMenu();
    App.renderNewPage(!currentLocation.length ? PAGES.CATALOG : currentLocation);
    App.container.append(footerElement);
    this.enableRouteChange();
  }
}

export default App;
