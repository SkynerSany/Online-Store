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
  static count = 2;
  static TextObject = {
    title: 'Оформление Заказа',
  }

  static hideLineMenu() {
    const menuLine = document.querySelector('.header__bottom-row');
    if (menuLine instanceof HTMLElement) menuLine.classList.add('menu-line_not-active');
  }

  createCartMainBox(num:number) {
    let arrElements = [];
    // Variables for working with total box
    const boxTotal = stringToElement(totalBox);
    const amount = boxTotal.querySelector('.cart__amount');
    const cartSumm = boxTotal.querySelector('.cart__summ');
    const summProducts = boxTotal.querySelector('.cart__summ-product');

    if (summProducts instanceof HTMLElement) {
      summProducts.innerText = `${num === 1 ? `${num} товар на сумму` : `${num > 1 && num < 5 ? `${num} товара на сумму` : `${num} товаров на сумму`}`}`;
    }

    const cartWrapper = createCustomElement('div', 'cart-wrap flex-row', '', '', '', '');
    const cart = createCustomElement('div', 'cart', '', '', '', '');
    const cartName = createCustomElement('h1', 'cart__title', `${num ? 'Ваш заказ' : 'Ваша корзина пуста'}`, '', '', '');
    appendElement(cart, cartName);
    appendElement(cartWrapper, cart);

    for (let i = 0; i < num; i += 1) {
      const productBox = createCustomElement('div', 'cart__product', '', '', '', '');
      const descriptionBox = createCustomElement('div', 'cart__description-box flex-row', '', '', '', '');
      const descrContainer = createCustomElement('div', 'cart__descr-container flex-row', '', '', '', '');
      const productImage = createCustomElement('img', 'cart__product-img', '', '', '', '');
      const productDescription = createCustomElement('p', 'cart__product-description', `${products.products[i].description}`, '', '', '');
      const changeNumberProductsBox = createCustomElement('div', 'cart__change-number flex-row', '', '', '', '');
      const minus = createCustomElement('button', 'cart__product-minus', '-', '', '', '');
      const plus = createCustomElement('button', 'cart__product-plus', '+', '', '', '');
      const productInput = createCustomElement('input', 'cart__product-input', '', '', 'number', '1');
      const currentPrice = createCustomElement('span', 'cart__cur-price', `${products.products[i].price} p.`, '', '', '');
      const buttonRemove = createCustomElement('button', 'cart__remove-product', '', '', '', '');
      const removeIcon = createCustomElement('img', 'cart__remove-img', '', '../../assets/icons/cart/remove.svg', '', '');
      arrElements.push(productImage, productDescription);
      descrContainer.append(...arrElements);
      arrElements = [];

      // add listener for button plus and minus
      plus.addEventListener('click', ():void => {
        if (productInput instanceof HTMLInputElement) {
          productInput.value = String(+productInput.value + 1);
          if (amount instanceof HTMLElement && cartSumm instanceof HTMLElement) {
            amount.innerText = String(+amount.innerText + products.products[i].price);
            cartSumm.innerText = amount.innerText;
          }
        }
        if (summProducts instanceof HTMLElement) {
          summProducts.innerText = `${num === 1 ? `${num} товар на сумму` : `${num > 1 && num < 5 ? `${num} товара на сумму` : `${num} товаров на сумму`}`}`;
        }
      });
      minus.addEventListener('click', ():void => {
        if (productInput instanceof HTMLInputElement) {
          if (productInput.value === '1') return;
          productInput.value = String(+productInput.value - 1);
          if (amount instanceof HTMLElement && cartSumm instanceof HTMLElement) {
            amount.innerText = String(+amount.innerText - products.products[i].price);
            cartSumm.innerText = amount.innerText;
          }
        }
      })
      // ____________________________________

      arrElements.push(minus, productInput, plus);
      changeNumberProductsBox.append(...arrElements);
      arrElements = [];
      buttonRemove.append(removeIcon);

      if (productImage instanceof HTMLImageElement) {
        productImage.src = products.products[i].thumbnail;
      }
      if (removeIcon instanceof HTMLImageElement) {
        removeIcon.src = '../../assets/icons/cart/remove.svg';
      }

      descriptionBox.append(descrContainer);
      descriptionBox.append(changeNumberProductsBox); 
      descriptionBox.append(currentPrice);
      descriptionBox.append(buttonRemove);
      productBox.append(descriptionBox);
      appendElement(cart, productBox);
      appendElement(cartWrapper, cart);

      if (amount && amount instanceof HTMLElement && cartSumm instanceof HTMLElement) {
        amount.innerText = String(+amount.innerText + products.products[i].price);
        cartSumm.innerText = amount.innerText;
      }
    }
    appendElement(cartWrapper, boxTotal);
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