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

  public render(): void {
    const modalTemplate = stringToElement(MODAL_TEMPLATE);
    const form = modalTemplate.querySelector('.modal__form');

    modalTemplate.addEventListener('click', (e) => this.close(modalTemplate, e));
    form?.addEventListener('submit', (e) => this.confirm(modalTemplate, e));

    document.body.append(modalTemplate);
    document.body.classList.toggle('block')
  }
}
