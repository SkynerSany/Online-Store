import createCustomElement, { appendElement } from "../../core/templates/create.elements";
import Page from "../../core/templates/page";
import CartController from "./cart-controller";
import './cart.scss';
import products from '../../data/products.json';
import stringToElement from "../../utils/htmlToElement";
import totalBox from "./cart.temlapte";
import Product from "../../core/components/products/product/product";
import { devServer } from "../../../webpack.dev.config";

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
  static count = 2;
  static TextObject = {
    title: 'Оформить Заказ',
  }

  static hideLineMenu() {
    const menuLine = document.querySelector('.header__bottom-row');
    if (menuLine instanceof HTMLElement) menuLine.classList.add('menu-line_not-active');
  }

  createCartMainBox(array: string[]) {
    let arrElements = [];
    CartController.countProducts = array.length;
    const cartController = new CartController();

    // Variables for working with total box
    const boxTotal = stringToElement(totalBox);
    const amount = boxTotal.querySelector('.cart__amount');
    const cartSumm = boxTotal.querySelector('.cart__summ');
    const summProducts = boxTotal.querySelector('.cart__summ-product');
    const totalInput = boxTotal.querySelector('.cart__promo');
    const boxPromoDescr = boxTotal.querySelector('.cart__promo-desc');
    const promoBtn = boxTotal.querySelector('.cart__promo-btn');
    const sumWithDisc = boxTotal.querySelector('.cart__summ-box_not-active');
    const sumWithoutDisc = boxTotal.querySelector('.cart__summ-box');

    if (summProducts instanceof HTMLElement) {
      summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
    }

    const cartWrapper = createCustomElement('div', 'cart-wrap', '', '', '', '');
    const cart = createCustomElement('div', 'cart', '', '', '', '');
    const cartName = createCustomElement('h1', 'cart__title', `${CartController.countProducts ? 'Ваш заказ' : 'Ваша корзина пуста'}`, '', '', '');
    appendElement(cart, cartName);
    appendElement(cartWrapper, cart);

    for (let i = 0; i < array.length; i += 1) {

      const currentProduct = products.products.filter((product) => product.id === +array[i])[0];
      
      const productBox = createCustomElement('div', 'cart__product');
      const descriptionBox = createCustomElement('div', 'cart__description-box flex-row');
      const descrContainer = createCustomElement('div', 'cart__descr-container flex-row');
      const productImage = createCustomElement('img', 'cart__product-img');
      const productDescription = createCustomElement('p', 'cart__product-description', `${currentProduct.description}`);
      const changeNumberProductsBox = createCustomElement('div', 'cart__change-number flex-row');
      const minus = createCustomElement('button', 'cart__product-minus', '-');
      const plus = createCustomElement('button', 'cart__product-plus', '+');
      const productInput = createCustomElement('div', 'cart__product-input', '1');
      const currentPrice = createCustomElement('span', 'cart__cur-price', `${currentProduct.price} p.`);
      const buttonRemove = createCustomElement('button', 'cart__remove-product', '', '', '', '');
      const removeIcon = createCustomElement('img', 'cart__remove-img', '', '../../assets/icons/cart/remove.svg');
      arrElements.push(productImage, productDescription);
      descrContainer.append(...arrElements);
      arrElements = [];

      descrContainer.dataset.productId = String(currentProduct.id);
      descrContainer.addEventListener('click', (): void => {
        Product.openProductInfo(descrContainer);
      })
      // add listener for button plus and minus
      plus.addEventListener('click', ():void => {
        if (productInput instanceof HTMLElement
          && amount instanceof HTMLElement
          && cartSumm instanceof HTMLElement
          && summProducts instanceof HTMLElement) {
          cartController.addListenerForPlus(productInput, amount, cartSumm, summProducts, +array[i] - 1);
        }
      });
      minus.addEventListener('click', ():void => {
        if (productInput instanceof HTMLElement 
          && amount instanceof HTMLElement 
          && cartSumm instanceof HTMLElement 
          && summProducts instanceof HTMLElement) {
          cartController.addListenerForMinus(productInput, amount, cartSumm, summProducts, +array[i] - 1);
        }
      });
      // ____________________________________

      // add listener for button-remove
      buttonRemove.addEventListener('click', ():void => {
        if (productInput instanceof HTMLElement
          && amount instanceof HTMLElement
          && cartSumm instanceof HTMLElement
          && summProducts instanceof HTMLElement
          && productBox instanceof HTMLElement
          && sumWithDisc instanceof HTMLElement
          && sumWithoutDisc instanceof HTMLElement) {
          cartController.addListenerForBtnRemove(productBox, productInput, amount, cartSumm, summProducts, +array[i] - 1);
          sumWithDisc.classList.add('cart__summ-box_not-active');
          sumWithoutDisc.classList.remove('cart__summ-box_none');
          if (cartSumm.innerText === '0') cartName.innerText = 'Ваша корзина пуста';
        }
      });
      // ___________________________________

      promoBtn?.addEventListener('click', ():void => {
        if (
          sumWithDisc instanceof HTMLElement 
          && sumWithoutDisc instanceof HTMLElement 
          && amount instanceof HTMLElement
          ) {
          cartController.addFeaturesForClick(sumWithDisc, sumWithoutDisc, amount);
          boxPromoDescr?.classList.remove('cart__promo-desc_active');
        }
      });


      arrElements.push(minus, productInput, plus);
      changeNumberProductsBox.append(...arrElements);
      arrElements = [];
      buttonRemove.append(removeIcon);

      if (productImage instanceof HTMLImageElement) {
        productImage.src = currentProduct.thumbnail;
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

      if (amount instanceof HTMLElement && cartSumm instanceof HTMLElement) {
        amount.innerText = `${+amount.innerText.slice(0, amount.innerText.length - 2) + currentProduct.price} р.`;
        cartSumm.innerText = amount.innerText;
      }
      totalInput?.addEventListener('input', ():void => {
        if (totalInput instanceof HTMLInputElement && boxPromoDescr instanceof HTMLElement) {
          cartController.addDiscountForPromo(totalInput, boxPromoDescr);
        }
      });
    }
    appendElement(cartWrapper, boxTotal);
    this.container.append(cartWrapper);
  }

  render() {
    const storage = localStorage.getItem('storeCart');
    
    const title = this.createHeaderTitle(CartPage.TextObject.title);
    title.className = 'cart__main-title';
    this.container.append(title);
    if (storage) {
      const arrayProducts = JSON.parse(storage) as string[];
      this.createCartMainBox(arrayProducts);
    }
    return this.container;
  }
}

export default CartPage;