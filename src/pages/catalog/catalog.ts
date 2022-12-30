import stringToElement from '../../utils/htmlToElement';
import Page from '../../core/templates/page';
import CATALOG_TEMPLATE from './catalog.template';
import DropdownList from '../../core/components/dropdown-list/dropdown-list';
import { Iproduct, IproductList } from '../../app/interfaces';
import Filters from '../../core/components/filters/filters';
import Pagination from '../../core/components/pagination/pagination';
import './catalog.scss';

const SORT_CONTAINER = '.products__sort-container';

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
  
  private setDropdownList(): void {
    const sortContainer = document.querySelector(SORT_CONTAINER);

    const dropdown = new DropdownList().set();
    sortContainer?.append(dropdown);
  }
  
  private setComponents(): void {
    this.getProductsData()
      .then(() => {
        new Filters(this.products, this.container).setFilters();
        this.setDropdownList();
        new Pagination(this.products, this.container).setPagination();
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