import stringToElement from '../../../../utils/htmlToElement';
import PRODUCT_TEMPLATE from './product.template';
import { Iproduct } from '../../../../app/interfaces';
import { showCartCount } from '../../header/header';
import './product.scss';

const PRODUCT_IMAGE = '.product__image';
const PRODUCT_DESCRIPTION = '.product__description';
const PRODUCT_NAME = '.product__name';
const PRODUCT_PRICE = '.product__price';
const PRODUCT_STARS_CONTAINER = '.product__stars'
const PRICE_CURRENCY = 'р.';
const RAITING_STAR = 'star';
const RAITING_EMPTY_STAR = 'star star-empty';
const STORAGE_NAME = 'storeCart';
const BTN_ADD_TO_CART = {
  DEFAULT: 'product__add',
  ACTIVE: 'product__add-active',
}

export default class Product {
  private productData: Iproduct;
  private productElement: HTMLTemplateElement;

  constructor(productData: Iproduct) {
    this.productData = productData;
    this.productElement = stringToElement(PRODUCT_TEMPLATE);
  }

  private createStar(name: string): HTMLDivElement {
    const star = document.createElement('div');
    star.className = name;

    return star;
  }

  private setStars(starsContainer: HTMLDivElement): void {
    const raiting = Math.floor(this.productData.rating);
    for (let i = 1; i <= 5; i += 1) {
      if (i <= raiting) {
        starsContainer.append(this.createStar(RAITING_STAR));
      } else {
        starsContainer.append(this.createStar(RAITING_EMPTY_STAR));
      }
    }
  }

  private addToCart(btn: HTMLButtonElement, newNode: HTMLElement): void {
    btn.classList.toggle(BTN_ADD_TO_CART.ACTIVE);
    const storage = localStorage.getItem(STORAGE_NAME);
    const { productId } = newNode.dataset;
    if (!productId) return;

    if (!storage) {
      localStorage.storeCart = JSON.stringify([productId]);
      return;
    }

    const cart = JSON.parse(storage) as string[];

    if (cart.includes(productId)) {
      cart.splice(cart.indexOf(productId), 1);
      localStorage.setItem(STORAGE_NAME, JSON.stringify([...cart]));
      showCartCount();
      return;
    }

    localStorage.setItem(STORAGE_NAME, JSON.stringify([...cart, productId]));
    showCartCount();
  }

  private setEvents(newNode: HTMLTemplateElement): void {
    const btnAddToCart = newNode.querySelector(`.${ BTN_ADD_TO_CART.DEFAULT }`);
    if (!(btnAddToCart instanceof HTMLButtonElement)) return;

    btnAddToCart.addEventListener('click', () => this.addToCart(btnAddToCart, newNode));
  }

  public setProduct(): HTMLElement {
    const newNode = this.productElement.cloneNode(true) as HTMLTemplateElement;
    const storage = localStorage.getItem(STORAGE_NAME);

    const poster = newNode.querySelector(PRODUCT_IMAGE);
    const description = newNode.querySelector(PRODUCT_DESCRIPTION);
    const name = newNode.querySelector(PRODUCT_NAME);
    const starsContainer = newNode.querySelector(PRODUCT_STARS_CONTAINER);
    const price = newNode.querySelector(PRODUCT_PRICE);
    const btnAddToCart = newNode.querySelector(`.${ BTN_ADD_TO_CART.DEFAULT }`);

    newNode.dataset.productId = `${ this.productData.id }`;
    if (poster instanceof HTMLImageElement) {
      poster.src = this.productData.thumbnail;
      poster.alt = this.productData.title;
    }
    if (name) name.textContent = this.productData.title;
    if (description) description.textContent = this.productData.description;
    if (starsContainer instanceof HTMLDivElement) this.setStars(starsContainer);
    if (price) price.textContent = `${ this.productData.price } ${ PRICE_CURRENCY }`;
    if (btnAddToCart && storage) {
      const storageArr = JSON.parse(storage) as string[];
      if (storageArr.includes( `${ this.productData.id }`)){
        btnAddToCart.classList.toggle(BTN_ADD_TO_CART.ACTIVE);
      }
    }

    this.setEvents(newNode);

    return newNode;
  }
}
