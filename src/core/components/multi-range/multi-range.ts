import stringToElement from '../../../utils/htmlToElement';
import MULTI_RANGE_TEMLATE from './multi-range.template';
import './multi-range.scss';

const THUMB_WIDTH = 3;
const MAX_VALUE = '50';
const MIN_VALUE = '0';
const BASE_CLASS = 'multi-range__range filter-range__range';
const INPUT_TYPE = {
  'LOWER': 'lower',
  'UPPER': 'upper',
}

export default class MultiRange {
  private idName: string;
  private multiRange: HTMLTemplateElement;

  constructor(idName: string) {
    this.idName = idName;
    this.multiRange = stringToElement(MULTI_RANGE_TEMLATE);
  }

  private setInputsId(): HTMLInputElement[] {
    const [lowerRange, upperRange]: HTMLInputElement[] = Array.from(this.multiRange.querySelectorAll('.multi-range__range'));

    lowerRange.id = `${ this.idName }-lower`;
    upperRange.id = `${ this.idName }-upper`;

    return [lowerRange, upperRange];
  }

  private changeLowerRange(lower: HTMLInputElement, upper: HTMLInputElement) {
    const [lowerRange, upperRange] = [lower, upper];
    
    lowerRange.value = `${ Math.min(+lowerRange.value, +upperRange.value - 1) }`;

    const value = Math.round((+lowerRange.value / parseInt(lowerRange.max, 10)) * 100);

    const inverseLeft = this.multiRange.querySelector('.multi-range__inverse-left');
    const track = this.multiRange.querySelector('.multi-range__track');
    const leftThumb = this.multiRange.querySelectorAll('.multi-range__thumb')[0];

    if (inverseLeft instanceof HTMLElement) inverseLeft.style.width = `${ value }%`;
    if (track instanceof HTMLElement) track.style.left = `${ value }%`;
    if (leftThumb instanceof HTMLElement) leftThumb.style.left = `${ value }%`;

    const inputFrom = document.querySelector(`#${ this.idName }-from`);
    if (!(inputFrom instanceof HTMLInputElement)) return;
    
    inputFrom.value = `${ value }`;
  }

  private changeUpperRange(lower: HTMLInputElement, upper: HTMLInputElement) {
    const [lowerRange, upperRange] = [lower, upper];
    
    upperRange.value = `${ Math.max(+upperRange.value, +lowerRange.value + 1) }`;

    const value = Math.round((+upperRange.value / parseInt(upperRange.max, 10)) * 100);

    const inverseRight = this.multiRange.querySelector('.multi-range__inverse-right');
    const track = this.multiRange.querySelector('.multi-range__track');
    const rightThumb = this.multiRange.querySelectorAll('.multi-range__thumb')[1];

    if (inverseRight instanceof HTMLElement) inverseRight.style.width = `${ 100 - value }%`;
    if (track instanceof HTMLElement) track.style.right = `${ 100 - value }%`;
    if (rightThumb instanceof HTMLElement) rightThumb.style.left = `${ value }%`;

    const inputTo = document.querySelector(`#${ this.idName }-to`);
    if (!(inputTo instanceof HTMLInputElement)) return;
    
    inputTo.value = `${ value }`;
  }

  public set(): HTMLTemplateElement {
    const [lowerRange, upperRange] = this.setInputsId();

    lowerRange.addEventListener('input', () => {this.changeLowerRange(lowerRange, upperRange)})
    upperRange.addEventListener('input', () => {this.changeUpperRange(lowerRange, upperRange)})

    return this.multiRange;
  }
}
