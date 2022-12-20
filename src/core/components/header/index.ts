import stringToElement from '../../../utils/htmlToElement';
import HEADERTEMLATE from './header.template';
import './header.scss';

const headerElement: HTMLTemplateElement = stringToElement(HEADERTEMLATE);


export const addActiveClasess = ():void => {
  const headerMenu = document.querySelector('.header__menu')as HTMLElement;
  const burger = document.querySelector('.header__burger-img')as HTMLElement;
  headerMenu.classList.toggle('header__menu_active');
  burger.classList.toggle('menu-active');
}

export default headerElement;