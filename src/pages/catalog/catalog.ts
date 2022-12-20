import stringToElement from '../../utils/htmlToElement';
import Page from "../../core/templates/page";
import CATALOG_TEMPLATE from './catalog.template';
import productElement from '../../core/components/product/product';
import './catalog.scss';

const PRODUCT_COUNT = 9;

class CatalogPage extends Page {
  render() {
    const catalogPage: HTMLTemplateElement = stringToElement(CATALOG_TEMPLATE);
    this.container.append(catalogPage);
    const productsContainer = this.container.querySelector('.products__container');
    
    if (productsContainer) {
      for (let i = 0; i < PRODUCT_COUNT; i += 1) {
        productsContainer.appendChild(productElement.cloneNode(true))
      }
    }

    return this.container;
  }
}

export default CatalogPage;