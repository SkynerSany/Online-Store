import stringToElement from '../../../utils/htmlToElement';
import DROPDOWN_LIST_TEMPLATE from './dropdown-list.template';
import './dropdown-list.scss';

export default class DropdownList {
  private dropdown: HTMLTemplateElement;

  constructor() {
    this.dropdown = stringToElement(DROPDOWN_LIST_TEMPLATE);
  }

  private toggleDropdown(e: Event): void {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    e.currentTarget.classList.toggle('active');
  }

  private setSortType(e: Event): void {
    const sortTitle = document.querySelector('.products__sort-title');
    if (!(e.target instanceof HTMLLIElement) || !(sortTitle instanceof HTMLParagraphElement)) return;
    
    sortTitle.textContent = e.target.textContent;
  }

  set(): HTMLTemplateElement {
    const dropdownContainer = document.querySelector('.products__sort-container');

    dropdownContainer?.addEventListener('click', (e) => this.toggleDropdown(e));
    this.dropdown.addEventListener('click', (e) => this.setSortType(e));

    return this.dropdown;
  }
}