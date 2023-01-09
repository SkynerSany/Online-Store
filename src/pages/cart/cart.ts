import createCustomElement, { appendElement } from "../../core/templates/create.elements";
import Page from "../../core/templates/page";
import CartController from "./cart-controller";
import './cart.scss';
import products from '../../data/products.json';
import stringToElement from "../../utils/htmlToElement";
import totalBox from "./cart.temlapte";

export interface Iproduct {
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
    CartController.countProducts = num;
    const cartController = new CartController();
    // Variables for working with total box
    const boxTotal = stringToElement(totalBox);
    const amount = boxTotal.querySelector('.cart__amount');
    const cartSumm = boxTotal.querySelector('.cart__summ');
    const summProducts = boxTotal.querySelector('.cart__summ-product');

    if (summProducts instanceof HTMLElement) {
      summProducts.innerText = `${num === 1 ? `${num} товар на сумму` : `${num > 1 && num < 5 ? `${num} товара на сумму` : `${num} товаров на сумму`}`}`;
    }

    const cartWrapper = createCustomElement('div', 'cart-wrap', '', '', '', '');
    const cart = createCustomElement('div', 'cart', '', '', '', '');
    const cartName = createCustomElement('h1', 'cart__title', `${CartController.countProducts ? 'Ваш заказ' : 'Ваша корзина пуста'}`, '', '', '');
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
        if (productInput && amount instanceof HTMLElement && cartSumm instanceof HTMLElement && summProducts instanceof HTMLElement) {
          cartController.addListenerForPlus(productInput, amount, cartSumm, summProducts, i);
        }
      });
      minus.addEventListener('click', ():void => {
        if (productInput && amount instanceof HTMLElement && cartSumm instanceof HTMLElement && summProducts instanceof HTMLElement) {
          cartController.addListenerForMinus(productInput, amount, cartSumm, summProducts, i);
        }
      });
      // ____________________________________

      productInput.addEventListener('change', ():void => {
        // if (productInput instanceof HTMLInputElement) {
        //   CartController.countProducts += +productInput.value - 1;
        //   if (cartSumm instanceof HTMLElement && summProducts instanceof HTMLElement) {
        //     summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
        //   }
        // }
        if (productInput instanceof HTMLElement && amount instanceof HTMLElement && cartSumm instanceof HTMLElement && summProducts instanceof HTMLElement) {
          cartController.addListenerForInput(productInput, amount, cartSumm, summProducts, i);
        }
      })

      // add listener for button-remove
      buttonRemove.addEventListener('click', ():void => {
        if (productInput && amount instanceof HTMLElement && cartSumm instanceof HTMLElement && summProducts instanceof HTMLElement && productBox instanceof HTMLElement) {
          cartController.addListenerForBtnRemove(productBox, productInput, amount, cartSumm, summProducts, i);
          if (cartSumm.innerText === '0') cartName.innerText = 'Ваша корзина пуста';
        }
      });
      // ___________________________________

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