import { Iproduct } from "../../../../app/interfaces";
import Pagination from "../../pagination/pagination";
import { loadCheckbox, loadDoubleRange, loadInputText } from "./load-quary";
import { removeCheckbox, removeDoubleRange, removeInputText } from "./remove-filters";

const FORM_SEARCH_NAME = '#search-form'
const FORM_PRICE_NAME = '#price-form';
const FORM_STOCK_NAME = '#stock-form';
const FORM_BRAND_NAME = '#brand-form';
const FORM_CATEGORY_NAME = '#category-form';
const BTN_REMOVE = '.filters__btn-clear';
const FILTER_TYPES = {
  RANGE: 'range',
  SEARCH: 'search',
  CHECKBOX: 'checkbox',
  STOCK: 'stock',
  BRAND: 'brand',
  CATEGORY: 'category',
  PRICE: 'price',
  SORT: 'sort',
  PAGE: 'page',
}
const SORT_TYPES = {
  PRICE_LOW: 'sort-price-low',
  PRICE_HIGH: 'sort-price-high',
}
const INPUT_ID = {
  SEARCH: '#search',
  PRICE_TO: '#price-to',
  PRICE_FROM: '#price-from',
  STOCK_TO: '#stock-to',
  STOCK_FROM: '#stock-from',
}

export default class FiltersQuery {
  private productsData: Iproduct[];
  private container: HTMLElement;

  constructor(productsData: Iproduct[], container: HTMLElement) {
    this.productsData = productsData;
    this.container = container;
  }

  private checkFilters(e: Event, type: string): void {
    e.preventDefault();
    if (!(e.currentTarget instanceof HTMLFormElement)) return;
    const allChecked = Array.from(e.currentTarget.elements)
      .filter((el) => {
        if (el instanceof HTMLInputElement && 
          (el.checked || el.type === FILTER_TYPES.RANGE || (el.type === FILTER_TYPES.SEARCH && el.value !== ''))) return el; 
        return false;
      })
      .map((el) => {
        if (el instanceof HTMLInputElement) return el.type === FILTER_TYPES.CHECKBOX ? el.id : el.value;
        return false;
      });
    
    this.addQuery(type, allChecked.join(','));
  }

  public loadFromQuery(): void {
    const queryParams = this.getQuery();
    const search = loadInputText(queryParams, FILTER_TYPES.SEARCH, INPUT_ID.SEARCH);
    const price = loadDoubleRange(queryParams, FILTER_TYPES.PRICE, INPUT_ID.PRICE_FROM, INPUT_ID.PRICE_TO);
    const stock = loadDoubleRange(queryParams, FILTER_TYPES.STOCK, INPUT_ID.STOCK_FROM, INPUT_ID.STOCK_TO);
    const brand = loadCheckbox(queryParams, FILTER_TYPES.BRAND);
    const category = loadCheckbox(queryParams, FILTER_TYPES.CATEGORY);
    const sort = queryParams.get(FILTER_TYPES.SORT) || SORT_TYPES.PRICE_LOW;

    const newProducts = this.filterProducts(price, stock, brand, category, sort, search);
    new Pagination(
        queryParams.toString().length ? newProducts : this.sortingProducts(this.productsData, sort), 
        this.container,
        true
      ).setPagination();
  }

  private filterProducts(
    price: string[], 
    stock: string[], 
    brand: string[], 
    category: string[], 
    sort: string, 
    search: string
  ): Iproduct[] {
    let products = this.productsData.filter((product) => brand.length ? brand.includes(product.brand) : product);
    products = products.filter((product) => category.length ? category.includes(product.category) : product);
    if (price.length) products = products.filter(
      (product) => +product.price > +price[0] && +product.price < +price[1] ? product : false
    );
    if (stock.length) products = products.filter(
      (product) => +product.stock > +stock[0] && +product.stock < +stock[1] ? product : false
    );
    products = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    products = this.sortingProducts(products, sort);

    return products;
  }

  private sortingProducts(products: Iproduct[], sort: string): Iproduct[] {
    return products.sort((a, b) => {
      if (sort === SORT_TYPES.PRICE_LOW) return a.price - b.price;
      if (sort === SORT_TYPES.PRICE_HIGH) return b.price - a.price;
      return b.discountPercentage - a.discountPercentage;
    });
  }

  private removeFilters(
      price: HTMLFormElement, 
      stock: HTMLFormElement, 
      brand: HTMLFormElement, 
      category: HTMLFormElement,
      formSearch: HTMLFormElement): void {
    this.setChanges(this.removeQuary());

    removeDoubleRange(price);
    removeDoubleRange(stock);
    removeCheckbox(brand);
    removeCheckbox(category);
    removeInputText(formSearch);
  }

  private removeQuary(): URLSearchParams {
    const queryParams = this.getQuery();

    queryParams.delete(FILTER_TYPES.BRAND);
    queryParams.delete(FILTER_TYPES.CATEGORY);
    queryParams.delete(FILTER_TYPES.PRICE);
    queryParams.delete(FILTER_TYPES.SEARCH);
    queryParams.delete(FILTER_TYPES.STOCK);

    return queryParams;
  }

  private sortingProducts(products: Iproduct[], sort: string): Iproduct[] {
    return products.sort((a, b) => {
      if (sort === 'sort-price-low') return a.price - b.price;
      if (sort === 'sort-price-high') return b.price - a.price;
      return b.discountPercentage - a.discountPercentage;
    });
  }

  private setFormEvents(): void {
    const formSearch = document.querySelector(FORM_SEARCH_NAME);
    const formPrice = document.querySelector(FORM_PRICE_NAME);
    const formStock = document.querySelector(FORM_STOCK_NAME);
    const formBrand = document.querySelector(FORM_BRAND_NAME);
    const formCategory = document.querySelector(FORM_CATEGORY_NAME);
    const btnRemove = document.querySelector(BTN_REMOVE);

    if (!(formPrice instanceof HTMLFormElement)
       || !(formStock instanceof HTMLFormElement)
       || !(formBrand instanceof HTMLFormElement)
       || !(formCategory instanceof HTMLFormElement)
       || !(formSearch instanceof HTMLFormElement)
    ) return;
    
    formSearch?.addEventListener('submit', (e) => this.checkFilters(e, FILTER_TYPES.SEARCH));
    formPrice.addEventListener('change', (e) => this.checkFilters(e, FILTER_TYPES.PRICE));
    formStock.addEventListener('change', (e) => this.checkFilters(e, FILTER_TYPES.STOCK));
    formBrand.addEventListener('change', (e) => this.checkFilters(e, FILTER_TYPES.BRAND));
    formCategory.addEventListener('change', (e) => this.checkFilters(e, FILTER_TYPES.CATEGORY));
    btnRemove?.addEventListener("click", () => this.removeFilters(formPrice, formStock, formBrand, formCategory, formSearch));
  }

  private getQuery(): URLSearchParams {
    const { search } = window.location;
    return new URLSearchParams(search);
  }

  private addQuery(queryName: string, value: string): void {
    const queryParams = this.getQuery();
    queryParams.delete(queryName);
    queryParams.delete(FILTER_TYPES.PAGE);
    if (value !== '') queryParams.append(queryName, `${ value }`);

    this.setChanges(queryParams);
  }

  private setChanges(queryParams: URLSearchParams): void {
    const link = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }`;
    const quaryStr = queryParams.toString();
    const quaryOperator = quaryStr.length ? '?' : '';
    const resultLink = `${ link }${ quaryOperator }${ quaryStr }${ window.location.hash }`;
    if (window.location.href !== resultLink) {
      window.history.pushState({ path: resultLink }, '', resultLink);
    }
    this.loadFromQuery();
  }

  public init(): void {
    this.setFormEvents();
    this.loadFromQuery();
  }
}
