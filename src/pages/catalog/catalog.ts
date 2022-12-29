import stringToElement from '../../utils/htmlToElement';
import Page from '../../core/templates/page';
import MultiRange from '../../core/components/multi-range/multi-range';
import CATALOG_TEMPLATE from './catalog.template';
import productElement from '../../core/components/product/product';
import './catalog.scss';
import DropdownList from '../../core/components/dropdown-list/dropdown-list';

const CATALOG_CONTAINER = '.catalog__wrapper';
const PRODUCTS_CONTAINER = '.products__container';
const PRODUCT_IMAGE = '.product__image';
const PRODUCT_BRAND = '.product__brand';
const PRODUCT_NAME = '.product__name';
const PRODUCT_PRICE = '.product__price';
const PRICE_CURRENCY = 'р.';
const MULTI_RANGE_CONTAINER = '.multi-range';
const MULTI_RAMGE_TYPES = ['price', 'stock'];
const PAGINATION_CONTAINER = '.pagination__btn';
const PAGINATION_BTN_STYLE = {
  'SHOW': 'visible',
  'HIDE': 'hidden',
}
const PAGINATION_BTN_TYPE = {
  'NUMBERS': 'pagination__btn',
  'DOTS': 'pagination__dots',
  'ARROW': 'pagination__arrow',
}

interface Iproduct {
  'id': number,
  'title': string,
  'description': string,
  'price': number,
  'discountPercentage': number,
  'rating': number,
  'stock': number,
  'brand': string,
  'category': string,
  'thumbnail': string,
  'images': string[],
}

interface IproductList {
  'products': Iproduct[];
}

class CatalogPage extends Page {
  products!: Iproduct[];
  productsCount!: number;
  pageCount!: number;
  
  productsOnPage = 12;
  currentPage = 1;

  private getProductsData(): Promise<void> {
    return fetch('../../data/products.json')
      .then(
        (response) => response.json(),
        (err) => console.error(err))
      .then((result: IproductList) => {
        this.products = result.products;
        this.productsCount = result.products.length;
        this.pageCount = Math.ceil(this.productsCount / this.productsOnPage);
      },
      (err) => console.error(err));
  }

  private createBtn(num: string, type: string): HTMLDivElement {
    const btn = document.createElement('div');
    btn.className = type;
    btn.textContent = num;
    if (type === PAGINATION_BTN_TYPE.NUMBERS) btn.dataset.id = num;

    return btn;
  }

  private setPagination(): void {
    const paginationContainer = this.container.querySelector('.pagination');
    if (!paginationContainer) return;
    
    paginationContainer.append(this.createBtn('<', PAGINATION_BTN_TYPE.ARROW));
    paginationContainer.append(this.createBtn('1', PAGINATION_BTN_TYPE.NUMBERS));
    paginationContainer.append(this.createBtn('>', PAGINATION_BTN_TYPE.ARROW));
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
    this.setProducts();
  }

  private checkCurrentPage(): void {
    const arrows = Array.from(this.container.querySelectorAll(`.${ PAGINATION_BTN_TYPE.ARROW }`));
    const [arrowPrev, arrowNext] = arrows as HTMLElement[];

    arrowPrev.style.visibility = this.currentPage > 1 ? PAGINATION_BTN_STYLE.SHOW : PAGINATION_BTN_STYLE.HIDE;
    arrowNext.style.visibility = this.currentPage < this.pageCount ? PAGINATION_BTN_STYLE.SHOW : PAGINATION_BTN_STYLE.HIDE;
  }

  private setCurrentPage(): void {
    const current = document.querySelector(PAGINATION_CONTAINER);
    if (!(current instanceof HTMLElement) || !current.dataset) return;
    
    current.dataset.id = `${ this.currentPage }`;
    current.textContent = `${ this.currentPage }`;
  }

  private setProducts(): void {
    const productsContainer = this.container.querySelector(PRODUCTS_CONTAINER);
    const catalogWrapper = this.container.querySelector(CATALOG_CONTAINER);
    if (!productsContainer) return;

    const fromProduct = this.currentPage * this.productsOnPage - this.productsOnPage;
    const toProduct = this.currentPage * this.productsOnPage;

    productsContainer.innerHTML = '';
    for (let i = fromProduct; i < toProduct; i += 1) {
      if (i >= this.productsCount) return;
      
      const newNode = productElement.cloneNode(true);
      if (!(newNode instanceof HTMLElement)) return;

      const poster = newNode.querySelector(PRODUCT_IMAGE);
      const brand = newNode.querySelector(PRODUCT_BRAND);
      const name = newNode.querySelector(PRODUCT_NAME);
      const price = newNode.querySelector(PRODUCT_PRICE);

      if (poster instanceof HTMLImageElement) poster.src = this.products[i].thumbnail;
      if (brand) brand.textContent = this.products[i].category;
      if (name) name.textContent = this.products[i].title;
      if (price) price.textContent = `${ this.products[i].price } ${ PRICE_CURRENCY }`;
      
      productsContainer.appendChild(newNode);
    }

    catalogWrapper?.scrollIntoView();
  }

  private setMultiRange(): void {
    const allMultiRange = Array.from(this.container.querySelectorAll(MULTI_RANGE_CONTAINER));
    allMultiRange.forEach((rangeContainer, i) => {
      const range = new MultiRange(MULTI_RAMGE_TYPES[i]).set();
      rangeContainer.append(range);
    })
  }

  private setDropdownList(): void {
    const sortContainer = document.querySelector('.products__sort-container');
    const dropdown = new DropdownList().set();
    sortContainer?.append(dropdown);
  }
  
  private setComponents(): void {
    this.getProductsData()
      .then(() => {
        this.setMultiRange();
        this.setDropdownList();
        this.setProducts();
        this.setPagination();
        this.setCatalogEvents();
        this.checkCurrentPage();
      }, 
      (err) => console.error(err));
  }

  public render(): HTMLElement {
    const catalogPage: HTMLTemplateElement = stringToElement(CATALOG_TEMPLATE);
    this.container.append(catalogPage);
    this.setComponents();
    return this.container;
  }

  private setCatalogEvents(): void {
    const arrows = Array.from(this.container.querySelectorAll(`.${ PAGINATION_BTN_TYPE.ARROW }`));
    const [arrowPrev, arrowNext] = arrows as HTMLElement[];

    arrowPrev?.addEventListener('click', (): void => this.setPrevPage());
    arrowNext?.addEventListener('click', (): void => this.setNextPage());
  }
}

export default CatalogPage;