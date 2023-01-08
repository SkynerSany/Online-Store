import stringToElement from '../../utils/htmlToElement';
import Page from '../../core/templates/page';
import CATALOG_TEMPLATE from './catalog.template';
import DropdownList from '../../core/components/dropdown-list/dropdown-list';
import getProductsData from '../../core/components/get-data/get-data';
import Filters from '../../core/components/filters/filters';
import './catalog.scss';

class CatalogPage extends Page {
  private setComponents(): void {
    getProductsData()
      .then((productData) => {
        if (!productData) return;
        const filters = new Filters(productData, this.container).setFilters();
        new DropdownList(filters).set();
      }, 
      (err) => console.error(err));
  }

  public render(): HTMLElement {
    const catalogPage: HTMLTemplateElement = stringToElement(CATALOG_TEMPLATE);
    this.container.append(catalogPage);
    this.setComponents();
    return this.container;
  }
}

export default CatalogPage;