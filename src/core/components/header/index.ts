import stringToElement from '../../../utils/htmlToElement';
import './index.scss';

const header = `<header class="header">
                  <nav class="header__nav">
                    <a href="#main-page">Главная страница</a>
                    <a href="#product-page">Страница продукта</a>
                    <a href="#cart-page">Страница корзины</a>
                  </nav>
                </header>`;

const headerElement: HTMLTemplateElement = stringToElement(header);

export default headerElement;