import stringToElement from '../../utils/htmlToElement';
import Page from '../../core/templates/page';
import CATALOG_TEMPLATE from './catalog.template';
import DropdownList from '../../core/components/dropdown-list/dropdown-list';
import getProductsData from '../../core/components/get-data/get-data';
import Filters from '../../core/components/filters/filters';
import './catalog.scss';

class CatalogPage extends Page {
  private catalogPage!: HTMLTemplateElement;

  private saveLink(e: Event): void {
    const target = e.currentTarget;
    if (!(target instanceof HTMLButtonElement)) return;
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        target.textContent = 'Ссылка скопирована!';
        target.disabled = true;
        target.classList.toggle('btn-confirm');

        setTimeout(() => {
          target.textContent = 'Скопировать ссылку'
          target.disabled = false;
          target.classList.toggle('btn-confirm');
        }, 1000);
      },
      (err) => console.log(err));
  }

  private loadMode(): void {
    const modeBtn = this.catalogPage.querySelector('.mode-view');
    if (!modeBtn) return;

    const mode = new URLSearchParams(window.location.search).get('mode');
    if (mode) modeBtn.className = `mode-view ${ mode }`;

    const container = this.catalogPage.querySelector('.products__container');
    if (!container) return;
    container.className = `products__container ${ mode === 'mode-list' ? 'products__container-list' : ''}`
  }

  private changeModeView(e: Event): void {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;

    e.currentTarget.classList.toggle('mode-table');
    e.currentTarget.classList.toggle('mode-list');

    const currentMode = e.currentTarget.classList[1];
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete('mode');
    queryParams.set('mode', currentMode);
    const resultLink = `${ window.location.origin }?${ queryParams.toString() }${ window.location.hash }`;
    if (window.location.href !== resultLink) {
      window.history.pushState({ path: resultLink }, '', resultLink);
      this.loadMode();
    }
  }

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
    this.catalogPage = stringToElement(CATALOG_TEMPLATE);
    const modeBtn = this.catalogPage.querySelector('.mode-view');
    const saveBtn = this.catalogPage.querySelector('.copy-link');
    modeBtn?.addEventListener('click', (e) => this.changeModeView(e))
    saveBtn?.addEventListener('click', (e) => this.saveLink(e))

    this.loadMode();
    this.container.append(this.catalogPage);
    this.setComponents();
    return this.container;
  }
}

export default CatalogPage;