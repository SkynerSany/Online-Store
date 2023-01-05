import stringToElement from '../../../utils/htmlToElement';
import HEADER_TEMPLATE from './header.template';
import './header.scss';

const BTN_CART = '.cart-count';
const BTN_MENU = '.header__main-nav';
const CATALOG_HASH = '#catalog';
const STORAGE_NAME = 'storeCart';

const headerElement: HTMLTemplateElement = stringToElement(HEADER_TEMPLATE);

export function showCartCount(): void {
  const btnCart = document.querySelector(BTN_CART);
  const storage = localStorage.getItem(STORAGE_NAME);
  if (!storage || !btnCart) return;

  const storageArr = JSON.parse(storage) as string[];
  btnCart.textContent = `${ storageArr.length }`;
}

export const addListenerForMenu = (): void => {
  const menuBtn = document.querySelector(BTN_MENU);
  
  menuBtn?.addEventListener('click', () => {
    window.location.hash = CATALOG_HASH;
  });

  showCartCount();
}


export default headerElement;