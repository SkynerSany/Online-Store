import products from '../../data/products.json';

class CartController {
  static count = 0;
  static countProducts = 0;

  public addListenerForPlus(elemInput: HTMLElement, elemAmount: HTMLElement, elemSum: HTMLElement, elemSumProducts:HTMLElement, index: number): void {
    if (elemInput instanceof HTMLInputElement) {
      CartController.countProducts += 1;
      const productInput = elemInput;
      productInput.value = String(+productInput.value + 1);
      if (elemAmount instanceof HTMLElement && elemSum instanceof HTMLElement) {
        const amount = elemAmount;
        const cartSumm = elemSum;
        amount.innerText = String(+amount.innerText + products.products[index].price);
        cartSumm.innerText = amount.innerText;
      }
    }
    if (elemSumProducts instanceof HTMLElement) {
      const summProducts = elemSumProducts;
      summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
    }
  }

  public addListenerForInput(elemInput: HTMLElement, elemAmount: HTMLElement, elemSum: HTMLElement, elemSumProducts:HTMLElement, index: number):void {
    if (elemInput instanceof HTMLInputElement) {
      const productInput = elemInput;
      CartController.countProducts += +productInput.value - CartController.countProducts;
      if (elemAmount instanceof HTMLElement && elemSum instanceof HTMLElement) {
        const amount = elemAmount;
        const cartSumm = elemSum;
        amount.innerText = String((+amount.innerText - (+amount.innerText)) + (products.products[index].price * +productInput.value))
        cartSumm.innerText = amount.innerText;
      }
      if (elemSumProducts instanceof HTMLElement) {
        const summProducts = elemSumProducts;
        summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
      }
    }
  }

  public addListenerForMinus(elemInput: HTMLElement, elemAmount: HTMLElement, elemSum: HTMLElement, elemSumProducts:HTMLElement, index: number): void {
    if (elemInput instanceof HTMLInputElement) {
      const productInput = elemInput;
      if (productInput.value === '1') return;
      CartController.countProducts -= 1;
      productInput.value = String(+productInput.value - 1);
      if (elemAmount instanceof HTMLElement && elemSum instanceof HTMLElement) {
        const amount = elemAmount;
        const cartSumm = elemSum;
        amount.innerText = String(+amount.innerText - products.products[index].price);
        cartSumm.innerText = amount.innerText;
      }
      if (elemSumProducts instanceof HTMLElement) {
        const summProducts = elemSumProducts;
        summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
      }
    }
  }
  
  public addListenerForBtnRemove(currentBox: HTMLElement, elemInput: HTMLElement, elemAmount: HTMLElement, elemSum: HTMLElement, elemSumProducts:HTMLElement, index:number):void {
    if (elemAmount instanceof HTMLElement && elemInput instanceof HTMLInputElement) {
      const productInput = elemInput;
      const amount = elemAmount;
      const cartSumm = elemSum;
      CartController.countProducts -= +productInput.value;
      amount.innerText = String(+amount.innerText - (products.products[index].price * +productInput.value));
      cartSumm.innerText = amount.innerText;
    }
    if (elemSum instanceof HTMLElement) {
      const summProducts = elemSumProducts;
      summProducts.innerText = `${CartController.countProducts === 1 ? `${CartController.countProducts} товар на сумму` : `${CartController.countProducts > 1 && CartController.countProducts < 5 ? `${CartController.countProducts} товара на сумму` : `${CartController.countProducts} товаров на сумму`}`}`;
    }
    currentBox.remove();
  }
}

export default CartController;