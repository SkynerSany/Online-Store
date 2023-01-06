import { Iproduct } from "../../../../app/interfaces";
import Pagination from "../../pagination/pagination";

const FORM_SEARCH_NAME = '#search-form'
const FORM_PRICE_NAME = '#price-form';
const FORM_STOCK_NAME = '#stock-form';
const FORM_BRAND_NAME = '#brand-form';
const FORM_CATEGORY_NAME = '#category-form';
const BTN_REMOVE = '.filters__btn-clear';
const CHECKBOX = '.filter-checkbox__checkbox';
const FILTER_TYPES = {
  RANGE: 'range',
  SEARCH: 'search',
  CHECKBOX: 'checkbox',
  STOCK: 'stock',
  BRAND: 'brand',
  CATEGORY: 'category',
  PRICE: 'price',
  SORT: 'sort',
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
          (el.checked || el.type === FILTER_TYPES.RANGE || el.type === FILTER_TYPES.SEARCH)) return el; 
        return false;
      })
      .map((el) => {
        if (el instanceof HTMLInputElement) return el.type === FILTER_TYPES.CHECKBOX ? el.id : el.value;
        return false;
      });
    
    this.addQuery(type, allChecked.join(','));
  }

  private setDoubleRangeValue(from: HTMLInputElement, to: HTMLInputElement, query: string[]) {
    const [inputFrom, inputTo] = [from, to];

    inputFrom.value = `${ query[0] || inputFrom.value }`; 
    inputTo.value = `${ query[1] || inputTo.value }`;

    const event = new Event("change");
    inputFrom.dispatchEvent(event);
    inputTo.dispatchEvent(event);
  }

  private setInputTextValue(input: HTMLInputElement, query: string) {
    const search = input;
    search.value = `${ query || search.value }`; 

    const event = new Event("submit");
    search.dispatchEvent(event);
  }

  private loadDoubleRange(queryParams: URLSearchParams, idType: string, idFrom: string, idTo: string): string[] {
    const from = document.querySelector(idFrom);
    const to = document.querySelector(idTo);
    const id = queryParams.get(idType)?.split(',') || [];
    if (!(from instanceof HTMLInputElement) || !(to instanceof HTMLInputElement)) return [];

    this.setDoubleRangeValue(from, to, id);
    return id;
  }

  private loadInputText(queryParams: URLSearchParams, idType: string, idSearch: string): string {
    const search = document.querySelector(idSearch);
    const id = queryParams.get(idType) || '';
    if (!(search instanceof HTMLInputElement)) return '';

    this.setInputTextValue(search, id);
    return id;
  }

  private loadCheckbox(queryParams: URLSearchParams, id: string): string[] {
    const checkboxQueries = queryParams.get(id)?.split(',') || [];
    if (checkboxQueries[0] === '' || !checkboxQueries.length) return [];

    checkboxQueries.forEach((checkboxQuery) => {
      const checkbox = document.querySelector(`#${ checkboxQuery }`);
      if (checkbox instanceof HTMLInputElement) checkbox.checked = true;
    });

    return checkboxQueries;
  }

  public loadFromQuery(): void {
    const queryParams = this.getQuery();
    const search = this.loadInputText(queryParams, FILTER_TYPES.SEARCH, INPUT_ID.SEARCH);
    const price = this.loadDoubleRange(queryParams, FILTER_TYPES.PRICE, INPUT_ID.PRICE_FROM, INPUT_ID.PRICE_TO);
    const stock = this.loadDoubleRange(queryParams, FILTER_TYPES.STOCK, INPUT_ID.STOCK_FROM, INPUT_ID.STOCK_TO);
    const brand = this.loadCheckbox(queryParams, FILTER_TYPES.BRAND);
    const category = this.loadCheckbox(queryParams, FILTER_TYPES.CATEGORY);
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

  private removeFilters(): void {
    const queryParams = this.getQuery();
    queryParams.delete(FILTER_TYPES.BRAND);
    queryParams.delete(FILTER_TYPES.CATEGORY);
    queryParams.delete(FILTER_TYPES.PRICE);
    queryParams.delete(FILTER_TYPES.SEARCH);
    queryParams.delete(FILTER_TYPES.STOCK);

    this.setChanges(queryParams);
    window.location.reload();
  }

  private setFormEvents(): void {
    const formSearch = document.querySelector(FORM_SEARCH_NAME);
    const formPrice = document.querySelector(FORM_PRICE_NAME);
    const formStock = document.querySelector(FORM_STOCK_NAME);
    const formBrand = document.querySelector(FORM_BRAND_NAME);
    const formCategory = document.querySelector(FORM_CATEGORY_NAME);
    const btnRemove = document.querySelector(BTN_REMOVE);
    
    formSearch?.addEventListener('submit', (e) => this.checkFilters(e, FILTER_TYPES.SEARCH));
    formPrice?.addEventListener('change', (e) => this.checkFilters(e, FILTER_TYPES.PRICE));
    formStock?.addEventListener('change', (e) => this.checkFilters(e, FILTER_TYPES.STOCK));
    formBrand?.addEventListener('change', (e) => this.checkFilters(e, FILTER_TYPES.BRAND));
    formCategory?.addEventListener('change', (e) => this.checkFilters(e, FILTER_TYPES.CATEGORY));
    btnRemove?.addEventListener("click", () => this.removeFilters());
  }

  private getQuery(): URLSearchParams {
    const { search } = window.location;
    return new URLSearchParams(search);
  }

  private addQuery(queryName: string, value: string): void {
    const queryParams = this.getQuery();
    queryParams.delete(queryName);
    queryParams.append(queryName, `${ value }`);

    this.setChanges(queryParams);
  }

  private setChanges(queryParams: URLSearchParams): void {
    const link = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }`;
    const resultLink = `${ link }?${ queryParams.toString() }`;    
    window.history.pushState({ path: resultLink }, '', resultLink);
    this.loadFromQuery();
  }

  public init(): void {
    this.setFormEvents();
    this.loadFromQuery();
  }
}
