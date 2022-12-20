const HEADERTEMLATE =  `<header class="header flex-col">
                          <div class="header__wrap flex-col">
                            <div class="header__top-row flex-row">
                              <a href="#main-page" class="header__logo"></a>
                                <div class="header__contact">
                                  <a href="tel:+375 29 999 99 99" class="header__number">+375 29 999 99 99</a>
                                  <a href="tel:+375 29 11 11 11" class="header__number">+375 29 11 11 11</a>
                                  <p class="header__work-time">Пн-вс: с 10:00 до 21:00</p>
                                </div>
                                <nav class="header__nav">
                                  <input type="text" placeholder="Поиск" class="header__search">
                                  <a href="#cart-page" class="header__cart"></a>
                                </nav>
                            </div>
                            <div class="header__bottom-row flex-row">
                              <div class="header__main-menu flex-row">
                                <nav class="header__main-nav flex-col">
                                  <div class="header__burger-menu flex-row">
                                    <div class="header__burger-img"></div>
                                    <span class="header__menu-name">Каталог товаров</span>
                                  </div>
                                  <ul class="header__menu">
                                    <li class="menu-item"><a href="#">Product</a></li>
                                    <li class="menu-item"><a href="#">Product</a></li>
                                    <li class="menu-item"><a href="#">Product</a></li>
                                    <li class="menu-item"><a href="#">Product</a></li>
                                    <li class="menu-item"><a href="#">Product</a></li>
                                  </ul>
                                </nav>
                                <nav class="header__sub-nav">
                                  <ul class="header__sub-menu flex-row">
                                    <li><a href="#">Акции</a></li>
                                    <li><a href="#">Контакты</a></li>
                                  </ul>
                                </nav>
                              </div>
                            </div>
                          </div>
                        </header>`

export default HEADERTEMLATE;