const HEADER_TEMPLATE =  `<header class="header flex-col">
                          <div class="header__wrap flex-col">
                            <div class="wrapper header__top-row flex-row">
                              <a href="#catalog" class="header__logo" aria-label="logo"></a>
                              <div class="header__contact">
                                <a href="tel:+375 29 999 99 99" class="header__number">+375 29 999 99 99</a>
                                <a href="tel:+375 29 11 11 11" class="header__number">+375 29 11 11 11</a>
                                <p class="header__work-time">Пн-вс: с 10:00 до 21:00</p>
                              </div>
                              <a href="#cart" class="header__cart" aria-label="cart">
                                <span class="cart-count">0</span>
                              </a>
                            </div>
                            <div class="header__bottom-row flex-row">
                              <div class="wrapper header__main-menu flex-row">
                                <nav class="header__main-nav flex-col">
                                  <div class="header__burger-menu flex-row">
                                    <div class="header__burger-img"></div>
                                    <span class="header__menu-name">Каталог товаров</span>
                                  </div>
                                </nav>
                                <p class="cart-total">
                                  <span>Всего в корзине на</span>
                                  <span class="cart-total__price"></span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </header>`

export default HEADER_TEMPLATE;