import Page from "../../core/templates/page";
import PRODUCT_PAGE_TEMPLATE from "./product.template";
import getProductsData from "../../core/components/get-data/get-data";
import Product from "../../core/components/products/product/product";
import './product.scss';
import { Iproduct } from "../../app/interfaces";

const NAV_ITEMS = '.product-page__nav-item';

class ProductPage extends Page {
  private setNav(productsData: Iproduct, productTemplate: HTMLElement): void {
    const navItems = Array.from(productTemplate.querySelectorAll(NAV_ITEMS));
    navItems[1].textContent = productsData.category.replace('-', ' ');
    navItems[2].textContent = productsData.brand;
    navItems[3].textContent = productsData.title;
  }

  private setComponents(productId: string): void {
    getProductsData()
      .then((productsData) => {
        if (!productsData) return;
        const currentProduct = productsData.filter((product) => product.id === +productId)[0];
        const productTemplate = new Product(currentProduct, PRODUCT_PAGE_TEMPLATE).setProduct();
        this.setNav(currentProduct, productTemplate);
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