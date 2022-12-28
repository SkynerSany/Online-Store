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
  private lowerSlider: HTMLInputElement;

  private upperSlider: HTMLInputElement;

  private idName: string;

  constructor(idName: string) {
    this.idName = idName;
    this.lowerSlider = document.createElement('input');
    this.upperSlider = document.createElement('input');
  }

  private createInput(type: string): void {
    const input = type === INPUT_TYPE.LOWER ? this.lowerSlider : this.upperSlider;
    input.setAttribute('type', 'range');
    input.setAttribute('min', MIN_VALUE);
    input.setAttribute('max', MAX_VALUE);
    input.setAttribute('value', type === INPUT_TYPE.LOWER ? MIN_VALUE : MAX_VALUE);
    input.className = BASE_CLASS;
    input.id = `${this.idName}-${type}`;
  }

  private getValue(): number[] {
    const lowerVal = parseInt(this.lowerSlider.value, 10);
    const upperVal = parseInt(this.upperSlider.value, 10);

    return [lowerVal, upperVal];
  }

  private changeLoverSlider(): void {
    const [lowerVal, upperVal] = this.getValue();
    
    if (upperVal < lowerVal + THUMB_WIDTH) {
      this.lowerSlider.value = `${upperVal - THUMB_WIDTH}`;
      
      if (lowerVal === +this.lowerSlider.min) {
        this.upperSlider.value = `${THUMB_WIDTH}`;
      }
    }
  }

  private changeUpperSlider() {
    const [lowerVal, upperVal] = this.getValue();
    
    if (lowerVal > upperVal - THUMB_WIDTH) {
      this.upperSlider.value = `${lowerVal + THUMB_WIDTH}`;
      
      if (upperVal === +this.upperSlider.max) {
        this.lowerSlider.value = `${parseInt(this.upperSlider.max, 10) - THUMB_WIDTH}`;
      }
    }
  }

  public set(): HTMLInputElement[] {
    this.createInput(INPUT_TYPE.UPPER);
    this.createInput(INPUT_TYPE.LOWER);

    this.lowerSlider.addEventListener('input', () => this.changeLoverSlider());
    this.upperSlider.addEventListener('input', () => this.changeUpperSlider());

    return [this.lowerSlider, this.upperSlider];
  }
}
