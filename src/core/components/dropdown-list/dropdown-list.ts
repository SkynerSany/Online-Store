import stringToElement from '../../../utils/htmlToElement';
import DROPDOWN_LIST_TEMPLATE from './dropdown-list.template';
import './dropdown-list.scss';
import FiltersQuery from '../filters/filters-query/filters-query';

const SORT_CONTAINER = '.products__sort-container';

export default class DropdownList {
  private dropdown: HTMLTemplateElement;
  private filters: FiltersQuery;

  constructor(filters: FiltersQuery) {
    this.dropdown = stringToElement(DROPDOWN_LIST_TEMPLATE);
    this.filters = filters;
  }

  private toggleDropdown(e: Event): void {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    e.currentTarget.classList.toggle('active');
  }

  private setSortType(e: Event): void {
    const sortTitle = document.querySelector('.products__sort-title');
    if (!(e.target instanceof HTMLLIElement) || !(sortTitle instanceof HTMLParagraphElement)) return;
    
    sortTitle.textContent = e.target.textContent;
    this.addQuery('sort', e.target.id);
    
    this.filters.loadFromQuery();
  }

  private getQuery(): URLSearchParams {
    const { search } = window.location;
    return new URLSearchParams(search);
  }

  private addQuery(queryName: string, value: string): void {
    const queryParams = this.getQuery();
    queryParams.delete(queryName);
    queryParams.append(queryName, `${ value }`);

    const link = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }`;
    const resultLink = `${ link }?${ queryParams.toString() }`;    
    window.history.pushState({ path: resultLink }, '', resultLink);
  }

  private init(): void {
    const dropdownTitle = document.querySelector('.products__sort-title');
    const queryParams = this.getQuery();
    const sort = queryParams.get('sort');
    const currentSort = document.querySelector(`#${ sort || 'sort-price-low' }`);
    if (dropdownTitle) dropdownTitle.textContent = currentSort?.textContent || 'Сначала дешевле';
  }

  public set(): void {
    const sortContainer = document.querySelector(SORT_CONTAINER);

    sortContainer?.addEventListener('click', (e) => this.toggleDropdown(e));
    this.dropdown.addEventListener('click', (e) => this.setSortType(e));

    sortContainer?.append(this.dropdown);
    this.init();
  }
}