import './filters.scss';
import MultiRange from './multi-range/multi-range';
import { Iproduct } from '../../../app/interfaces';
import FiltersQuery from './filters-query/filters-query';

const MULTI_RANGE_CONTAINER = '.multi-range';
const MULTI_RAMGE_TYPES = ['price', 'stock'];
const INPUT_TYPE = 'checkbox';
const INPUT_NAME = 'filter-checkbox__checkbox';
const LABEL_NAME = 'filter-checkbox__label';
const INPUT_ID = {
  PRICE_TO: '#price-to',
  PRICE_FROM: '#price-from',
  STOCK_TO: '#stock-to',
  STOCK_FROM: '#stock-from',
}
const FILTER_ID = {
  CATEGORY: '#category-container',
  BRAND: '#brand-container',
}

export default class Filters {
  private productsData: Iproduct[];
  private container: HTMLElement;

  constructor(productsData: Iproduct[], container: HTMLElement) {
    this.productsData = productsData;
    this.container = container;
  }

  private setMultiRange(): void {
    const allMultiRange = Array.from(this.container.querySelectorAll(MULTI_RANGE_CONTAINER));
    
    allMultiRange.forEach((rangeContainer, i) => {
      const range = new MultiRange(MULTI_RAMGE_TYPES[i]).set();
      rangeContainer.append(range);
    })
  }
  
  private createInput(id: string): HTMLInputElement {
    const input = document.createElement('input');
    input.type = INPUT_TYPE;
    input.id = id;
    input.className = INPUT_NAME;

    return input;
  }

  private createLabel(id: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = id.split('-').join(' ');
    label.className = LABEL_NAME;

    return label;
  }

  private filterPrice(): void {
    let maxPrice = 0;
    let minPrice = 99999;
    this.productsData.forEach((item) => {
      maxPrice = Math.max(maxPrice, item.price);
      minPrice = Math.min(minPrice, item.price);
    });

    const numTo = document.querySelector(INPUT_ID.PRICE_TO);
    const numFrom = document.querySelector(INPUT_ID.PRICE_FROM);
    if (numTo instanceof HTMLInputElement) numTo.value = `${ maxPrice }`;
    if (numFrom instanceof HTMLInputElement) numFrom.value = `${ minPrice }`;
  }

  private filterStock(): void {
    let maxStock = 0;
    let minStock = 99999;
    this.productsData.forEach((item) => {
      maxStock = Math.max(maxStock, item.stock);
      minStock = Math.min(minStock, item.stock);
    });

    const numTo = document.querySelector(INPUT_ID.STOCK_TO);
    const numFrom = document.querySelector(INPUT_ID.STOCK_FROM);
    if (numTo instanceof HTMLInputElement) numTo.value = `${ maxStock }`;
    if (numFrom instanceof HTMLInputElement) numFrom.value = `${ minStock }`;
  }

  private filterCategory(): void {
    const categoryContainer = document.querySelector(FILTER_ID.CATEGORY);
    if (!categoryContainer) return;

    const allCategory = this.productsData.map((item) => item.category);
    const categorySet = Array.from(new Set(allCategory));
    
    categorySet.forEach((category) => {
      categoryContainer.append(this.createInput(category));
      categoryContainer.append(this.createLabel(category));
    })
  }

  private filterBrand(): void {
    const brandContainer = document.querySelector(FILTER_ID.BRAND);
    if (!brandContainer) return;

    const allBrand = this.productsData.map((item) => item.brand);
    const brandSet = Array.from(new Set(allBrand));
    
    brandSet.forEach((brand) => {
      brandContainer.append(this.createInput(brand));
      brandContainer.append(this.createLabel(brand));
    })
  }

  

  public setFilters() {
    this.filterPrice();
    this.filterStock();
    this.setMultiRange();
    this.filterCategory();
    this.filterBrand();
    new FiltersQuery().init();
  }
}
