import createCustomElement, { appendElement } from "../../core/templates/create.elements";
import Page from "../../core/templates/page";
import './cart.scss';

class CartPage extends Page {
  static TextObject = {
    title: 'Оформление Заказа',
  }

  createCartMainBox() {
    const wrapper = createCustomElement('div', 'cart', '');
    const cartName = createCustomElement('h2', 'cart__name', 'Корзина');
    appendElement(wrapper, cartName);
    appendElement(this.container, wrapper);
  }

  addProductToCart(productName: string) {
    const arrElements = [];
    const productBox = createCustomElement('div', 'cart__product', '');
    const descriptionBox = createCustomElement('div', 'cart__description-box', '');
    const productImage = createCustomElement('div', 'cart__product-img', '');
    const productDescription = createCustomElement('div', 'cart__product-description', '');

  }

  render() {
    const title = this.createHeaderTitle(CartPage.TextObject.title);
    this.container.append(title);
    this.createCartMainBox();
    return this.container;
  }
}

export default CartPage;