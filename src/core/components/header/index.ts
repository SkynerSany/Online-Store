import stringToElement from '../../../utils/htmlToElement';
import HEADERTEMLATE from './header.template';
import './header.scss';

const headerElement: HTMLTemplateElement = stringToElement(HEADERTEMLATE);

const addActiveClasessForMenu = ():void => {
  const headerMenu = document.querySelector('.header__menu')as HTMLElement;
  const burger = document.querySelector('.header__burger-img')as HTMLElement;
  headerMenu.classList.toggle('header__menu_active');
  burger.classList.toggle('menu-active');
}

export const removeActiveClassesForMenu = (): void => {
  const headerMenu = document.querySelector('.header__menu')as HTMLElement;
  const burger = document.querySelector('.header__burger-img')as HTMLElement;
  headerMenu.classList.remove('header__menu_active');
  burger.classList.remove('menu-active');
}

export const addListenerForMenu = ():void => {
  const menuBtn = document.querySelector('.header__burger-menu')as HTMLElement;
  menuBtn.addEventListener('click', () => {
    addActiveClasessForMenu();
  });
  const arrMenuItems = document.querySelectorAll('.menu-item');
  arrMenuItems.forEach((elem) => {
    elem.addEventListener('click', removeActiveClassesForMenu);
  })
}


export default headerElement;