import Page from "../../core/templates/page";
import PRODUCT_PAGE_TEMPLATE from "./product.template";
import getProductsData from "../../core/components/get-data/get-data";
import Product from "../../core/components/products/product/product";
import './product.scss';

class ProductPage extends Page {
  private setComponents(productId: string): void {
    getProductsData()
      .then((productsData) => {
        if (!productsData) return;
        const currentProduct = productsData.filter((product) => product.id === +productId)[0];
        const productTemplate = new Product(currentProduct, PRODUCT_PAGE_TEMPLATE).setProduct();
        this.container.append(productTemplate);
      }, 
      (err) => console.error(err));
  }

  public render(): HTMLElement {
    const { hash } = window.location;
    const productId = hash.slice(hash.indexOf('-') + 1);

    this.setComponents(productId);
    return this.container;
  }
}

export default ProductPage;