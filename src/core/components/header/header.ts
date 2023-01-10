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

function getTotalPrice(storageArr: string[], cartTotal: HTMLElement): void {
  const total = cartTotal;
  getProductsData()
  .then((productsData) => {
    if (!productsData) return;
    const currentProducts = productsData.filter((product) => storageArr.includes(`${ product.id }`));
    const productTotal = currentProducts.reduce((prev, cur) => prev + cur.price, 0);
    total.textContent = `${ productTotal }р.`;
  },
  (err) => console.error(err));
}

export function showCartCount(): void {
  const btnCart = document.querySelector(BTN_CART);
  const storage = localStorage.getItem(STORAGE_NAME);
  const cartTotal = document.querySelector(CART_TOTAL);
  if (!storage || !btnCart) return;

  const storageArr = JSON.parse(storage) as string[];
  if (cartTotal instanceof HTMLElement) getTotalPrice(storageArr, cartTotal);
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