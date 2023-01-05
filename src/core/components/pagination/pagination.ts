import './pagination.scss';
import { Iproduct } from '../../../app/interfaces';
import Products from '../products/products';

const QUERY_NAME = 'page';
const PAGINATION_CONTAINER = '.pagination';
const PAGINATION_BTN = '.pagination__btn';
const PAGINATION_BTN_STYLE = {
  'SHOW': 'visible',
  'HIDE': 'hidden',
}
const PAGINATION_BTN_TYPE = {
  'NUMBERS': 'pagination__btn',
  'DOTS': 'pagination__dots',
  'ARROW': 'pagination__arrow',
}

export default class Pagination {
  private container: HTMLElement;
  private pageCount: number;
  private products: Iproduct[];
  private productsCount: number;
  private filtersChanged: boolean;

  private productsOnPage = 12;

  constructor(products: Iproduct[], container: HTMLElement, filtersChanged = false) {
    this.container = container;
    this.products = products;
    this.productsCount = products.length;
    this.pageCount = Math.ceil(this.productsCount / this.productsOnPage);
    this.filtersChanged = filtersChanged;
  }

  private createBtn(num: string, type: string): HTMLDivElement {
    const btn = document.createElement('div');
    btn.className = type;
    btn.textContent = num;
    if (type === PAGINATION_BTN_TYPE.NUMBERS) btn.dataset.id = num;
    if (type === PAGINATION_BTN_TYPE.ARROW) btn.append(document.createElement('div'));

    return btn;
  }

  public setPagination(): void {
    const paginationContainer = this.container.querySelector(PAGINATION_CONTAINER);
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    paginationContainer.append(this.createBtn('', PAGINATION_BTN_TYPE.ARROW));
    paginationContainer.append(this.createBtn('1', PAGINATION_BTN_TYPE.NUMBERS));
    paginationContainer.append(this.createBtn('', PAGINATION_BTN_TYPE.ARROW));

    this.setPaginationEvents();
    if (this.getCurrentPage() !== 1) this.addQuery(1);
    this.setPage();
  }

  private setPrevPage(): void {
    const currentPage = this.getCurrentPage() - 1;
    this.addQuery(currentPage);
    this.setPage();
  }

  private setNextPage(): void {
    const currentPage = this.getCurrentPage() + 1;
    this.addQuery(currentPage);
    this.setPage();
  }

  private getQuery(): URLSearchParams {
    const { search } = window.location;
    return new URLSearchParams(search);
  }

  private addQuery(currentPage: number): void {
    const queryParams = this.getQuery();
    queryParams.delete(QUERY_NAME);
    queryParams.append(QUERY_NAME, `${ currentPage }`);

    const link = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }`;
    const resultLink = `${ link }?${ queryParams.toString() }`;    
    window.history.pushState({ path: resultLink }, '', resultLink);
  }

  private getCurrentPage(): number {
    const queryParams = this.getQuery().get(QUERY_NAME);
    return queryParams ? +queryParams : 1;
  }

  private setPage(): void {
    const currentPage = this.getCurrentPage();

    this.checkCurrentPage(currentPage);
    this.setCurrentPage(currentPage);
    new Products(this.products, this.container, this.productsOnPage).setProducts(this.filtersChanged);
    this.filtersChanged = false;
  }

  private checkCurrentPage(currentPage: number): void {
    const arrows = Array.from(this.container.querySelectorAll(`.${ PAGINATION_BTN_TYPE.ARROW }`));
    const [arrowPrev, arrowNext] = arrows as HTMLElement[];

    arrowPrev.style.visibility = currentPage > 1 ? PAGINATION_BTN_STYLE.SHOW : PAGINATION_BTN_STYLE.HIDE;
    arrowNext.style.visibility = currentPage < this.pageCount ? PAGINATION_BTN_STYLE.SHOW : PAGINATION_BTN_STYLE.HIDE;
  }

  private setCurrentPage(currentPage: number): void {
    const current = document.querySelector(PAGINATION_BTN);
    if (!(current instanceof HTMLElement) || !current.dataset) return;
    
    current.dataset.id = `${ currentPage }`;
    current.textContent = `${ currentPage }`;
  }

  private setPaginationEvents(): void {
    const arrows = Array.from(this.container.querySelectorAll(`.${ PAGINATION_BTN_TYPE.ARROW }`));
    const [arrowPrev, arrowNext] = arrows as HTMLElement[];

    arrowPrev?.addEventListener('click', (): void => this.setPrevPage());
    arrowNext?.addEventListener('click', (): void => this.setNextPage());
  }
}
