import MODAL_TEMPLATE from "./modal.template";
import './modal.scss';
import stringToElement from "../../../utils/htmlToElement";
import CONFIRM_TEMPLATE from "./confirm.template";
import { showCartCount } from "../header/header";

export default class Modal {
  private close(modalTemplate: HTMLElement, e: Event): void {
    if (!(e.target instanceof HTMLElement) || e.target !== modalTemplate) return;

    modalTemplate.remove();
  }

  private confirm(modalTemplate: HTMLElement, e: Event): void {
    e.preventDefault();

    if (!(e.currentTarget instanceof HTMLFormElement)) return;

    if (!this.validation(e.currentTarget)) return;

    localStorage.storeCart = '[]';
    showCartCount();

    const newModal = modalTemplate.cloneNode(true) as HTMLElement;
    modalTemplate.remove();
    document.body.append(newModal);
    
    const modal = newModal.querySelector('.modal');
    if (!(modal instanceof HTMLElement)) return;

    const confirmTemplate = stringToElement(CONFIRM_TEMPLATE);
    this.finish(newModal);

    modal.innerHTML = '';
    modal.append(confirmTemplate);
  }

  private finish(newModal: HTMLElement): void {
    setTimeout(() => {
      newModal.remove();
      window.location.hash = '#catalog';
    }, 3000)
  }

  private validationName(input: HTMLInputElement): boolean {
    if (!input.value.includes(' ')) return false;
    if (input.value.split(' ').filter((item) => item.length < 3 || !Number.isNaN(parseFloat(item))).length) return false;
    return true;
  }

  private validationAddress(input: HTMLInputElement): boolean {
    if (input.value.split(' ').length < 3) return false;
    if (input.value.split(' ').filter((item) => item.length < 5).length) return false;
    return true;
  }

  private validation(form: HTMLFormElement): boolean {
    const inputs = Array.from(form.elements) as HTMLInputElement[];
    inputs.forEach((input) => {
      if (input.classList.contains('error')) input.classList.toggle('error');
    })

    if (!inputs[0] || !this.validationName(inputs[0])) {
      inputs[0].classList.toggle('error')
      return false;
    }

    if (!this.validationAddress(inputs[2])) {
      inputs[2].classList.toggle('error')
      return false;
    }

    return true;
  }

  private dateFill(e: Event): void {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const input = e.currentTarget;

    if (Number.isNaN(+input.value.replace('/', '')) || input.value.includes(' ')) input.value = input.value.slice(0, -1);

    input.value = input.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/'
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/'
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2'
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
    ).replace(
      /^([0]+)\/|[0]+$/g, '0'
    ).replace(
      /\/\//g, '/'
    );

    const mm = input.value.slice(0, 2);
    const yy = input.value.slice(3);
    if (+mm > 12) input.value = input.value.replace(mm, '12');
    if (+yy > 12) input.value = input.value.replace(yy, '12');
  }

  private isNumber(e: Event): void {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const input = e.currentTarget;

    if (Number.isNaN(+input.value) || input.value.includes(' ')) input.value = input.value.slice(0, -1);
  }

  public render(): void {
    const modalTemplate = stringToElement(MODAL_TEMPLATE);
    const form = modalTemplate.querySelector('.modal__form');
    const date = modalTemplate.querySelector('#card-date');
    const number = modalTemplate.querySelector('#card-number');
    const cvv = modalTemplate.querySelector('#card-cvv');

    modalTemplate.addEventListener('click', (e) => this.close(modalTemplate, e));
    form?.addEventListener('submit', (e) => this.confirm(modalTemplate, e));
    date?.addEventListener('input', (e) => this.dateFill(e));
    number?.addEventListener('input', (e) => this.isNumber(e));
    cvv?.addEventListener('input', (e) => this.isNumber(e));

    document.body.append(modalTemplate);
  }
}
