const FORM_PRICE_NAME = '#price-form';
const FORM_STOCK_NAME = '#stock-form';
const FORM_BRAND_NAME = '#brand-form';
const FORM_CATEGORY_NAME = '#category-form';
const INPUT_ID = {
  PRICE_TO: '#price-to',
  PRICE_FROM: '#price-from',
  STOCK_TO: '#stock-to',
  STOCK_FROM: '#stock-from',
}

export default class FiltersQuery {
  private checkFilters(e: Event, type: string): void {
    if (!(e.currentTarget instanceof HTMLFormElement)) return;
    const allChecked = Array.from(e.currentTarget.elements)
      .filter((el) => {
        if (el instanceof HTMLInputElement && (el.checked || el.type === 'range')) return el; 
        return false;
      })
      .map((el) => {
        if (el instanceof HTMLInputElement) return el.type === 'checkbox' ? el.id : el.value;
        return false;
      });
    
    this.addQuery(type, allChecked.join(','));
  }

  private setValue(from: HTMLInputElement, to: HTMLInputElement, query: string[]): void {
    const [inputFrom, inputTo] = [from, to];

    inputFrom.value = `${ query[0] || inputFrom.value }`; 
    inputTo.value = `${ query[1] || inputTo.value }`;

    const event = new Event("change");
    inputFrom.dispatchEvent(event);
    inputTo.dispatchEvent(event);
  }

  private loadDoubleRange(queryParams: URLSearchParams, idType: string, idFrom: string, idTo: string): void {
    const from = document.querySelector(idFrom);
    const to = document.querySelector(idTo);
    const id = queryParams.get(idType)?.split(',') || [];
    if (!(from instanceof HTMLInputElement) || !(to instanceof HTMLInputElement)) return;

    this.setValue(from, to, id);
  }

  private loadCheckbox(queryParams: URLSearchParams, id: string): void {
    const checkboxQueries = queryParams.get(id)?.split(',') || [];
    checkboxQueries.forEach((checkboxQuery) => {
      const checkbox = document.querySelector(`#${ checkboxQuery }`);
      if (checkbox instanceof HTMLInputElement) checkbox.checked =true;
    });
  }

  private loadFromQuery(): void {
    const queryParams = this.getQuery();
    this.loadDoubleRange(queryParams, 'price', INPUT_ID.PRICE_FROM, INPUT_ID.PRICE_TO);
    this.loadDoubleRange(queryParams, 'stock', INPUT_ID.STOCK_FROM, INPUT_ID.STOCK_TO);
    this.loadCheckbox(queryParams, 'brand');
    this.loadCheckbox(queryParams, 'category');
  }

  private setFormEvents(): void {
    const formPrice = document.querySelector(FORM_PRICE_NAME);
    const formStock = document.querySelector(FORM_STOCK_NAME);
    const formBrand = document.querySelector(FORM_BRAND_NAME);
    const formCategory = document.querySelector(FORM_CATEGORY_NAME);

    formPrice?.addEventListener('change', (e) => this.checkFilters(e, 'price'));
    formStock?.addEventListener('change', (e) => this.checkFilters(e, 'stock'));
    formBrand?.addEventListener('change', (e) => this.checkFilters(e, 'brand'));
    formCategory?.addEventListener('change', (e) => this.checkFilters(e, 'category'));
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

  public init(): void {
    this.setFormEvents();
    this.loadFromQuery();
  }
}
