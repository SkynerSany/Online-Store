import Product from './product/product';
import { Iproduct } from '../../../app/interfaces';
import './products.scss';

const CATALOG_CONTAINER = '.catalog__wrapper';
const PRODUCTS_CONTAINER = '.products__container';

export default class Products {
  private products: Iproduct[];
  private container: HTMLElement;
  private productsOnPage: number;
  private productsCount: number;

  constructor(products: Iproduct[], container: HTMLElement, productsOnPage: number) {
    this.container = container;
    this.productsOnPage = productsOnPage;
    this.products = products;
    this.productsCount = products.length;
  }

  public setProducts(): void {
    const productsContainer = this.container.querySelector(PRODUCTS_CONTAINER);
    const catalogWrapper = this.container.querySelector(CATALOG_CONTAINER);
    if (!productsContainer || !catalogWrapper) return;

    const queryParam = new URLSearchParams(window.location.search).get('page');
    const currentPage = queryParam ? +queryParam : 1;    

    const fromProduct = currentPage * this.productsOnPage - this.productsOnPage;
    const toProduct = currentPage * this.productsOnPage;

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
