import createCustomElement, { appendElement } from "../../core/templates/create.elements";
import Page from "../../core/templates/page";
import './cart.scss';
import products from '../../data/products.json';
import stringToElement from "../../utils/htmlToElement";
import totalBox from "./cart.temlapte";

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

class CartPage extends Page {
  static count = 1;
  static TextObject = {
    title: 'Оформление Заказа',
  }

  static hideLineMenu() {
    const menuLine = document.querySelector('.header__bottom-row');
    if (menuLine instanceof HTMLElement) menuLine.classList.add('menu-line_not-active');
  }

  createCartMainBox(num:number) {
    let arrElements = [];
    const cartWrapper = createCustomElement('div', 'cart-wrap flex-row', '', '', '');
    const cart = createCustomElement('div', 'cart', '', '', '');
    const cartName = createCustomElement('h1', 'cart__title', 'Ваш заказ', '', '');
    appendElement(cart, cartName);
    appendElement(cartWrapper, cart);

    for (let i = 0; i < num; i += 1) {
      const productBox = createCustomElement('div', 'cart__product', '', '', '');
      const descriptionBox = createCustomElement('div', 'cart__description-box flex-row', '', '', '');
      const productImage = createCustomElement('img', 'cart__product-img', '', '', '');
      const changeNumberProductsBox = createCustomElement('div', 'cart__change-number flex-row', '', '', '');
      const minus = createCustomElement('button', 'cart__product-minus', '-', '', '');
      const plus = createCustomElement('button', 'cart__product-plus', '+', '', '');
      const productInput = createCustomElement('input', 'cart__product-input', '', 'number', '1');
      arrElements.push(minus, productInput, plus);
      changeNumberProductsBox.append(...arrElements);
      arrElements = [];
      if (productImage instanceof HTMLImageElement) {
        productImage.src = products.products[0].thumbnail;
      }
      const productDescription = createCustomElement('p', 'cart__product-description', `${products.products[0].description}`, '', '');
      descriptionBox.append(productImage);
      descriptionBox.append(productDescription);
      descriptionBox.append(changeNumberProductsBox); 
      productBox.append(descriptionBox);
      appendElement(cart, productBox);
      appendElement(cartWrapper, cart);
    }
    appendElement(cartWrapper, stringToElement(totalBox));
    this.container.append(cartWrapper);
  }

  render() {
    const title = this.createHeaderTitle(CartPage.TextObject.title);
    title.className = 'cart__main-title';
    this.container.append(title);
    this.createCartMainBox(CartPage.count);
    return this.container;
  }
}

export default CartPage;