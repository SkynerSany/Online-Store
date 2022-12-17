import Page from "../../core/templates/page";

class CartPage extends Page {
  static TextObject = {
    title: 'Cart Page',
  }

  render() {
    const title = this.createHeaderTitle(CartPage.TextObject.title);
    this.container.append(title);
    return this.container;
  }
}

export default CartPage;