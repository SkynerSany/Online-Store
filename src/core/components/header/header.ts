import stringToElement from '../../../utils/htmlToElement';
import HEADER_TEMLATE from './header.template';
import './header.scss';

const headerElement: HTMLTemplateElement = stringToElement(HEADER_TEMLATE);

const toggleActiveClasessForMenu = ():void => {
  const headerMenu = document.querySelector('.header__menu');
  const burger = document.querySelector('.header__burger-img');
  if (headerMenu instanceof HTMLElement && burger instanceof HTMLElement) {
    headerMenu.classList.toggle('header__menu_active');
    burger.classList.toggle('menu-active');
  }
}

export const removeActiveClassesForMenu = (): void => {
  const headerMenu = document.querySelector('.header__menu');
  const burger = document.querySelector('.header__burger-img');
  if (headerMenu instanceof HTMLElement && burger instanceof HTMLElement) {
    headerMenu.classList.remove('header__menu_active');
    burger.classList.remove('menu-active');
  }
}

export const addListenerForMenu = ():void => {
  const menuBtn = document.querySelector('.header__main-nav');
  if (menuBtn instanceof HTMLElement) {
    menuBtn.addEventListener('click', () => {
      toggleActiveClasessForMenu();
    });
    const arrMenuItems = document.querySelectorAll('.menu-item');
    arrMenuItems.forEach((elem) => {
      elem.addEventListener('click', removeActiveClassesForMenu);
    });
  }
}


export default headerElement;