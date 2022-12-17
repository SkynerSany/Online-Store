import Page from "../../core/templates/page";

class ProductPage extends Page {
  static TextObject = {
    title: 'Product Page',
  }

  render() {
    const title = this.createHeaderTitle(ProductPage.TextObject.title);
    this.container.append(title);
    return this.container;
  }
}

export default ProductPage;