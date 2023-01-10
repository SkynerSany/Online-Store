import stringToElement from '../../../../utils/htmlToElement';
import PRODUCT_TEMPLATE from './product.template';
import { Iproduct } from '../../../../app/interfaces';
import { showCartCount } from '../../header/header';
import './product.scss';

const ACTIVE_IMAGE = 'image-active';
const SLIDER_IMAGES = 'product__slider-img';
const PRODUCT_IMG_CONTAINER = '.product__image-wrapper';
const PRODUCT_CURRENT_IMG = '.product-page__image';
const PRODUCT_THUMBS = '.product__slider-container';
const PRODUCT_IMAGE = '.product__image';
const PRODUCT_DESCRIPTION = '.product__description';
const PRODUCT_CATEGORY = '.product__category-text';
const PRODUCT_BRAND = '.product__brand-text';
const PRODUCT_NAME = '.product__name';
const PRODUCT_PRICE = '.product__price-after';
const PRODUCT_DISCOUNT = '.product__discount-percent';
const PRODUCT_PRICE_BEFORE = '.product__price-before';
const PRODUCT_STARS_CONTAINER = '.product__stars';
const PRODUCT_STOCK = '.product__stock-text';
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

  static openProductInfo(newNode: HTMLElement): void {
    const id = newNode.dataset.productId;
    if (!id) return;
    window.location.hash = `#product-${ id }`;
  }

  constructor(productData: Iproduct, productTemplate = PRODUCT_TEMPLATE) {
    this.productData = productData;
    this.productElement = stringToElement(productTemplate);
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
    const imgContainer = newNode.querySelector(PRODUCT_IMG_CONTAINER);
    if (!(btnAddToCart instanceof HTMLButtonElement)) return;

    btnAddToCart.addEventListener('click', () => this.addToCart(btnAddToCart, newNode));
    imgContainer?.addEventListener('click', () => Product.openProductInfo(newNode));
  }
  
  private setImage(e: Event): void {
    const currentImage = document.querySelector(PRODUCT_CURRENT_IMG);
    if (!(e.currentTarget instanceof HTMLImageElement) || !(currentImage instanceof HTMLImageElement)) return;
    const activeImage = document.querySelector(`.${ ACTIVE_IMAGE }`);
    activeImage?.classList.toggle(ACTIVE_IMAGE);
    
    currentImage.src = e.currentTarget.src;
    e.currentTarget.classList.toggle(ACTIVE_IMAGE);
  }

  public setProduct(): HTMLElement {
    const newNode = this.productElement.cloneNode(true) as HTMLTemplateElement;
    const storage = localStorage.getItem(STORAGE_NAME);

    const poster = newNode.querySelector(PRODUCT_IMAGE);
    const description = newNode.querySelector(PRODUCT_DESCRIPTION);
    const name = newNode.querySelector(PRODUCT_NAME);
    const starsContainer = newNode.querySelector(PRODUCT_STARS_CONTAINER);
    const price = newNode.querySelector(PRODUCT_PRICE);
    const category = newNode.querySelector(PRODUCT_CATEGORY);
    const brand = newNode.querySelector(PRODUCT_BRAND);
    const discount = newNode.querySelector(PRODUCT_DISCOUNT);
    const stock = newNode.querySelector(PRODUCT_STOCK);
    const priceBefore = newNode.querySelector(PRODUCT_PRICE_BEFORE);
    const sliderImages = newNode.querySelector(PRODUCT_THUMBS);
    const btnAddToCart = newNode.querySelector(`.${ BTN_ADD_TO_CART.DEFAULT }`);

    newNode.dataset.productId = `${ this.productData.id }`;
    if (poster instanceof HTMLImageElement) {
      poster.src = this.productData.thumbnail;
      poster.alt = this.productData.title;
    }
    if (name) name.textContent = this.productData.title;
    if (description) description.textContent = this.productData.description;
    if (category) category.textContent = this.productData.category.replace('-',' ');
    if (brand) brand.textContent = this.productData.brand;
    if (starsContainer instanceof HTMLDivElement) this.setStars(starsContainer);
    if (price) price.textContent = `${ this.productData.price } ${ PRICE_CURRENCY }`;
    if (discount) discount.textContent = `-${ this.productData.discountPercentage }%`;
    if (stock) stock.textContent = `${ this.productData.stock }`;
    if (priceBefore) {
      const calcPrice = this.productData.price * 100 / (100 - this.productData.discountPercentage);
      priceBefore.textContent = `${ calcPrice.toFixed(2) } ${ PRICE_CURRENCY }`;
    }
    if (sliderImages) {
      this.productData.images.forEach((image) => {
        const img = document.createElement('img');
        img.className = SLIDER_IMAGES;
        img.src = image;
        if (img.src === this.productData.thumbnail) img.classList.toggle(ACTIVE_IMAGE);
        img.addEventListener('click', (e) => this.setImage(e));
        sliderImages.append(img);
      })
    }
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
