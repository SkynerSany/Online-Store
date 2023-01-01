import stringToElement from '../../../../utils/htmlToElement';
import MULTI_RANGE_TEMLATE from './multi-range.template';
import './multi-range.scss';

export default class MultiRange {
  private idName: string;
  private multiRange: HTMLTemplateElement;
  private lowerRange!: HTMLInputElement;
  private upperRange!: HTMLInputElement;
  private inputFrom!: HTMLInputElement;
  private inputTo!: HTMLInputElement;

  constructor(idName: string) {
    this.idName = idName;
    this.multiRange = stringToElement(MULTI_RANGE_TEMLATE);
  }

  private setInputsId(): void {
    const [lowerRange, upperRange]: HTMLInputElement[] = Array.from(this.multiRange.querySelectorAll('.multi-range__range'));

    lowerRange.id = `${ this.idName }-lower`;
    upperRange.id = `${ this.idName }-upper`;

    this.lowerRange = lowerRange;
    this.upperRange = upperRange;
  }

  private getInputsNumber(): void {
    const inputTo = document.querySelector(`#${ this.idName }-to`);
    const inputFrom = document.querySelector(`#${ this.idName }-from`);
    if (!(inputTo instanceof HTMLInputElement) || !(inputFrom instanceof HTMLInputElement)) return;

    this.inputTo = inputTo;
    this.inputFrom = inputFrom;
  }

  private changeLowerRange() {  
    this.lowerRange.value = `${ Math.min(+this.lowerRange.value, +this.upperRange.value) }`;

    const value = Math.round((+this.lowerRange.value / +this.lowerRange.max) * 100);

    const inverseLeft = this.multiRange.querySelector('.multi-range__inverse-left');
    const track = this.multiRange.querySelector('.multi-range__track');
    const leftThumb = this.multiRange.querySelectorAll('.multi-range__thumb')[0];

    if (inverseLeft instanceof HTMLElement) inverseLeft.style.width = `${ value }%`;
    if (track instanceof HTMLElement) track.style.left = `${ value }%`;
    if (leftThumb instanceof HTMLElement) leftThumb.style.left = `${ value }%`;
    
    this.inputFrom.value = `${ this.lowerRange.value }`;
  }

  private changeUpperRange() {    
    this.upperRange.value = `${ Math.max(+this.upperRange.value, +this.lowerRange.value) }`;

    const value = Math.round((+this.upperRange.value / +this.upperRange.max) * 100);

    const inverseRight = this.multiRange.querySelector('.multi-range__inverse-right');
    const track = this.multiRange.querySelector('.multi-range__track');
    const rightThumb = this.multiRange.querySelectorAll('.multi-range__thumb')[1];

    if (inverseRight instanceof HTMLElement) inverseRight.style.width = `${ 100 - value }%`;
    if (track instanceof HTMLElement) track.style.right = `${ 100 - value }%`;
    if (rightThumb instanceof HTMLElement) rightThumb.style.left = `${ value }%`;
    
    this.inputTo.value = `${ this.upperRange.value }`;
  }

  private changeFromInput(e: Event): void {
    if (!(e.target instanceof HTMLInputElement)) return;
    this.lowerRange.value = e.target.value === '' ? '0' : e.target.value;
    this.changeLowerRange();
  }

  private changeToInput(e: Event): void {
    if (!(e.target instanceof HTMLInputElement)) return;
    this.upperRange.value = e.target.value === '' ? '0' : e.target.value;
    this.changeUpperRange();
  }

  private setValues() {
    this.upperRange.max = this.inputTo.value;
    this.upperRange.min = this.inputFrom.value;
    this.lowerRange.max = this.inputTo.value;
    this.lowerRange.min = this.inputFrom.value;
    this.upperRange.value = this.inputTo.value;
  }

  public set(): HTMLTemplateElement {
    this.setInputsId();
    this.getInputsNumber();
    this.setValues();
    
    this.inputTo.addEventListener('input', (e) => {this.changeToInput(e)});
    this.inputFrom.addEventListener('input', (e) => {this.changeFromInput(e)});
    this.lowerRange.addEventListener('input', () => {this.changeLowerRange()});
    this.upperRange.addEventListener('input', () => {this.changeUpperRange()});

    return this.multiRange;
  }
}
