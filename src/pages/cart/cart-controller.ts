import { showCartCount } from '../../core/components/header/header';
import products from '../../data/products.json';

class CartController {
  static count = 0;
  static countProducts = 0;

  public addListenerForPlus(elemInput: HTMLElement, elemAmount: HTMLElement, elemSum: HTMLElement, elemSumProducts:HTMLElement, index: number): void {
    if (elemInput instanceof HTMLElement) {
      CartController.countProducts += 1;
      const productInput = elemInput;
      const countProducts = String(+productInput.innerText + 1);
      productInput.innerText = countProducts;
      if (elemAmount instanceof HTMLElement && elemSum instanceof HTMLElement) {
        const amount = elemAmount;
        const cartSumm = elemSum;
        // amount.innerText = String(+amount.innerText + products.products[index].price);
        amount.innerText = `${+amount.innerText.slice(0, amount.innerText.length - 2) + products.products[index].price} p`;
        cartSumm.innerText = amount.innerText;
      }
    }
    if (elemSumProducts instanceof HTMLElement) {
      const summProducts = elemSumProducts;
      summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
    }
  }

  public addListenerForMinus(elemInput: HTMLElement, elemAmount: HTMLElement, elemSum: HTMLElement, elemSumProducts:HTMLElement, index: number): void {
    if (elemInput instanceof HTMLElement) {
      const productInput = elemInput;
      if (productInput.innerText === '1') return;
      CartController.countProducts -= 1;
      const countProducts = String(+productInput.innerText - 1);
      productInput.innerText = countProducts;
      if (elemAmount instanceof HTMLElement && elemSum instanceof HTMLElement) {
        const amount = elemAmount;
        const cartSumm = elemSum;
        amount.innerText = `${+amount.innerText.slice(0, amount.innerText.length - 2) - products.products[index].price} р`;
        cartSumm.innerText = amount.innerText;
      }
      if (elemSumProducts instanceof HTMLElement) {
        const summProducts = elemSumProducts;
        summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
      }
    }
  }

  public addListenerForBtnRemove(currentBox: HTMLElement, elemInput: HTMLElement, elemAmount: HTMLElement, elemSum: HTMLElement, elemSumProducts:HTMLElement, index:number):void {
    const storage = localStorage.getItem('storeCart');
    if (storage) {
      const arrayProducts = JSON.parse(storage) as string[];
      arrayProducts.splice(arrayProducts.indexOf(index.toString()), 1);
      localStorage.setItem('storeCart', JSON.stringify([...arrayProducts]));
      showCartCount();
    }

    if (elemAmount instanceof HTMLElement && elemInput instanceof HTMLElement) {
      const productInput = elemInput;
      const amount = elemAmount;
      const cartSumm = elemSum;
      CartController.countProducts -= +productInput.innerText;
      amount.innerText = `${+amount.innerText.slice(0, amount.innerText.length - 2) - (products.products[index].price * +productInput.innerText)} р`;
      cartSumm.innerText = amount.innerText;
    }

    if (elemSum instanceof HTMLElement) {
      const summProducts = elemSumProducts;
      summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.
      countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
    }
    currentBox.remove();
  }

  public addDiscountForPromo (inputElement: HTMLInputElement, boxPromoDescr: HTMLElement) {
    if (inputElement instanceof HTMLInputElement) {
      const totalInput = inputElement;
      if (totalInput.value === 'RS') {
        boxPromoDescr?.classList.add('cart__promo-desc_active');
        const elem = boxPromoDescr.querySelector('span');
        if (!elem) return;
        elem.innerText = 'Rolling Scopes School - 10%';
      } else if (totalInput.value === 'EPAM') {
        const elem = boxPromoDescr.querySelector('span');
        boxPromoDescr?.classList.add('cart__promo-desc_active');
        if (!elem) return;
        elem.innerText = 'EPAM Systems - 10%';
      } else {
          boxPromoDescr?.classList.remove('cart__promo-desc_active');
        }
      }
    }

    public addFeaturesForClick (elem:HTMLElement, elem2:HTMLElement, elemAmount:HTMLElement) {
      elem.classList.remove('cart__summ-box_not-active');
      elem2.classList.add('cart__summ-box_none');
      const elemSumm = elem.querySelector('.cart__summ');
      if (elemAmount instanceof HTMLElement && elemSumm instanceof HTMLElement) {
        const amount = elemAmount;
        const disc =`${(+amount.innerText.slice(0, amount.innerText.length - 2) / 100) * 10}`;
        elemSumm.innerText = `${(+amount.innerText.slice(0, amount.innerText.length - 2)) - +disc} р`;
      }
    }
}

export default CartController;