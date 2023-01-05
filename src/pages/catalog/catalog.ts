import stringToElement from '../../utils/htmlToElement';
import Page from '../../core/templates/page';
import CATALOG_TEMPLATE from './catalog.template';
import DropdownList from '../../core/components/dropdown-list/dropdown-list';
import { Iproduct, IproductList } from '../../app/interfaces';
import Filters from '../../core/components/filters/filters';
import './catalog.scss';

class CatalogPage extends Page {
  products!: Iproduct[];

  private getProductsData(): Promise<void> {
    return fetch('../../data/products.json')
      .then(
        (response) => response.json(),
        (err) => console.error(err))
      .then((result: IproductList) => {
        this.products = result.products;
      },
      (err) => console.error(err));
  }
  
  private setComponents(): void {
    this.getProductsData()
      .then(() => {
        const filters = new Filters(this.products, this.container).setFilters();
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