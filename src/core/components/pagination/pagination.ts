import './pagination.scss';
import { Iproduct } from '../../../app/interfaces';
import Products from '../products/products';

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

  private productsOnPage = 12;
  private currentPage = 1;

  constructor(products: Iproduct[], container: HTMLElement) {
    this.container = container;
    this.products = products;
    this.productsCount = products.length;
    this.pageCount = Math.ceil(this.productsCount / this.productsOnPage);
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
    
    paginationContainer.append(this.createBtn('', PAGINATION_BTN_TYPE.ARROW));
    paginationContainer.append(this.createBtn('1', PAGINATION_BTN_TYPE.NUMBERS));
    paginationContainer.append(this.createBtn('', PAGINATION_BTN_TYPE.ARROW));

    this.setPaginationEvents();
    this.checkCurrentPage();
    new Products(this.products, this.container, this.productsOnPage, this.currentPage).setProducts();
  }

  private setPrevPage(): void {
    this.currentPage -= 1;
    this.setPage();
  }

  private setNextPage(): void {
    this.currentPage += 1;
    this.setPage();
  }

  private setPage(): void {
    this.checkCurrentPage();
    this.setCurrentPage();
    new Products(this.products, this.container, this.productsOnPage, this.currentPage).setProducts();
  }

  private checkCurrentPage(): void {
    const arrows = Array.from(this.container.querySelectorAll(`.${ PAGINATION_BTN_TYPE.ARROW }`));
    const [arrowPrev, arrowNext] = arrows as HTMLElement[];

    arrowPrev.style.visibility = this.currentPage > 1 ? PAGINATION_BTN_STYLE.SHOW : PAGINATION_BTN_STYLE.HIDE;
    arrowNext.style.visibility = this.currentPage < this.pageCount ? PAGINATION_BTN_STYLE.SHOW : PAGINATION_BTN_STYLE.HIDE;
  }

  private setCurrentPage(): void {
    const current = document.querySelector(PAGINATION_BTN);
    if (!(current instanceof HTMLElement) || !current.dataset) return;
    
    current.dataset.id = `${ this.currentPage }`;
    current.textContent = `${ this.currentPage }`;
  }

  private setPaginationEvents(): void {
    const arrows = Array.from(this.container.querySelectorAll(`.${ PAGINATION_BTN_TYPE.ARROW }`));
    const [arrowPrev, arrowNext] = arrows as HTMLElement[];

    arrowPrev?.addEventListener('click', (): void => this.setPrevPage());
    arrowNext?.addEventListener('click', (): void => this.setNextPage());
  }
}