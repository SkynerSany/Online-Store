import Product from './product/product';
import { Iproduct } from '../../../app/interfaces';

const CATALOG_CONTAINER = '.catalog__wrapper';
const PRODUCTS_CONTAINER = '.products__container';

export default class Products {
  private products: Iproduct[];
  private container: HTMLElement;
  private productsOnPage: number;
  private currentPage: number;
  private productsCount: number;

  constructor(products: Iproduct[], container: HTMLElement, productsOnPage: number, currentPage: number) {
    this.container = container;
    this.productsOnPage = productsOnPage;
    this.currentPage = currentPage;
    this.products = products;
    this.productsCount = products.length;
  }

  public setProducts(): void {
    const productsContainer = this.container.querySelector(PRODUCTS_CONTAINER);
    const catalogWrapper = this.container.querySelector(CATALOG_CONTAINER);
    if (!productsContainer || !catalogWrapper) return;

    const fromProduct = this.currentPage * this.productsOnPage - this.productsOnPage;
    const toProduct = this.currentPage * this.productsOnPage;

    productsContainer.innerHTML = '';
    for (let i = fromProduct; i < toProduct; i += 1) {
      if (i >= this.productsCount) {
        catalogWrapper.scrollIntoView();
        return;
      }

      const newNode = new Product(this.products[i]).setProduct();
      productsContainer.appendChild(newNode);
    }

    catalogWrapper.scrollIntoView();
  }
}
