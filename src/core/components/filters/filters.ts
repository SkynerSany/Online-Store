import './filters.scss';
import MultiRange from './multi-range/multi-range';
import { Iproduct } from '../../../app/interfaces';

const MULTI_RANGE_CONTAINER = '.multi-range';
const MULTI_RAMGE_TYPES = ['price', 'stock'];
const INPUT_TYPE = 'checkbox';
const INPUT_NAME = 'filter-checkbox__checkbox';
const LABEL_NAME = 'filter-checkbox__label';
const INPUT_ID = {
  PRICE_TO: '#price-to',
  STOCK_TO: '#stock-to',
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
    label.textContent = id;
    label.className = LABEL_NAME;

    return label;
  }

  private filterPrice(): void {
    let maxPrice = 0;
    this.productsData.forEach((item) => {
      maxPrice = Math.max(maxPrice, item.price);
    });

    const numTo = document.querySelector(INPUT_ID.PRICE_TO);
    if (numTo instanceof HTMLInputElement) numTo.value = `${ maxPrice }`;
  }

  private filterStock(): void {
    let maxStock = 0;
    this.productsData.forEach((item) => {
      maxStock = Math.max(maxStock, item.stock);
    });

    const numTo = document.querySelector(INPUT_ID.STOCK_TO);
    if (numTo instanceof HTMLInputElement) numTo.value = `${ maxStock }`;
  }

  private filterCategory(): void {
    const categoryContainer = document.querySelector(FILTER_ID.CATEGORY);
    if (!categoryContainer) return;

    const allCategory = this.productsData.map((item) => item.category);
    const categorySet = Array.from(new Set(allCategory));
    
    categorySet.forEach((category) => {
      categoryContainer.append(this.createInput(category));
      categoryContainer.append(this.createLabel(category.split('-').join(' ')));
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
  }
}
