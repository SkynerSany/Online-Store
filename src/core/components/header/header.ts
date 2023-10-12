import stringToElement from '../../../utils/htmlToElement';
import HEADER_TEMPLATE from './header.template';
import './header.scss';
import getProductsData from '../get-data/get-data';

const BTN_CART = '.cart-count';
const BTN_MENU = '.header__main-nav';
const CART_TOTAL = '.cart-total__price';
const CATALOG_HASH = '#catalog';
const STORAGE_NAME = 'storeCart';

const headerElement: HTMLTemplateElement = stringToElement(HEADER_TEMPLATE);

export function getTotalPrice(): void {
  const cartTotal = document.querySelector(CART_TOTAL);
  if (!cartTotal) return;

  getProductsData()
  .then((productsData) => {
    const storage = localStorage.getItem(STORAGE_NAME);
    if (!productsData) return;
  
    const storageArr = JSON.parse(storage || `[]`) as string[];
    const currentProducts = productsData.filter((product) => storageArr.includes(`${ product.id }`));
    const productTotal = currentProducts.reduce((prev, cur) => prev + cur.price, 0);
    cartTotal.textContent = `${ productTotal || 0 } р.`;
  },
  (err) => console.error(err));
}

export function showCartCount(): void {
  const btnCart = document.querySelector(BTN_CART);
  const storage = localStorage.getItem(STORAGE_NAME);
  if (!storage || !btnCart) return;

  const storageArr = JSON.parse(storage) as string[];
  getTotalPrice();
  btnCart.textContent = `${ storageArr.length }`;
}

export const addListenerForMenu = (): void => {
  const menuBtn = document.querySelector(BTN_MENU);
  
  menuBtn?.addEventListener('click', () => {
    window.location.hash = CATALOG_HASH;
  });

  showCartCount();
  getTotalPrice();
}

export const hideHeaderLineMenu = (idPage: string):void => {
  const menuLine = document.querySelector('.header__bottom-row');
  if (menuLine instanceof HTMLElement && idPage === 'cart-page') {
    menuLine.classList.add('menu-line_not-active');
  } else menuLine?.classList.remove('menu-line_not-active');
}


export default headerElement;