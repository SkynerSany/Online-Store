const CATALOG_TEMPLATE = `<article class="catalog">
                            <div class="wrapper catalog__wrapper">
                              <h2 class="catalog__title">Каталог</h2>
                              <div class="catalog__container">
                                <section class="filters">
                                  <div class="filter filter-range">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Цена, р</p>
                                      <button class="filter__show"></button>
                                    </div>
                                    <div class="filter-range__numbers-container">
                                      от <input type="number" class="filter-range__from">
                                      до <input type="number" class="filter-range__to">
                                    </div>
                                    <div class="filter-range__input-container">
                                      <input type="range" class="filter-range__range">
                                    </div>
                                    <button class="filters__confirm"></button>
                                  </div>
                                  <div class="filter filter-range">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Колличество на складе</p>
                                      <button class="filter__show"></button>
                                    </div>
                                    <div class="filter-range__numbers-container">
                                      от <input type="number" class="filter-range__from">
                                      до <input type="number" class="filter-range__to">
                                    </div>
                                    <div class="filter-range__input-container">
                                      <input type="range" class="filter-range__range">
                                    </div>
                                    <button class="filters__confirm"></button>
                                  </div>
                                  <div class="filter filter-checkbox">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Категория</p>
                                      <button class="filter__show"></button>
                                    </div>
                                    <div class="filter-checkbox__container">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                    </div>
                                  </div>
                                  <div class="filter filter-checkbox">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Изготовитель</p>
                                      <button class="filter__show"></button>
                                    </div>
                                    <div class="filter-checkbox__container">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                      <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                    </div>
                                  </div>
                                </section>
                                <section class="products">
                                  <div class="products__header">
                                    <div class="products__filters-list"></div>
                                    <div class="products__sort-container"></div>
                                  </div>
                                  <div class="products__container">
                                    <div class="product">
                                      <div class="product__container">
                                        <div class="labels">
                                          <p class="labels__new">Новинка</p>
                                        </div>
                                        <img src="" alt="" class="product__image">
                                        <div class="product__info">
                                          <p class="product__name">Гироскутер</p>
                                          <div class="product__stars">
                                            <div class="star"></div>
                                            <div class="star"></div>
                                            <div class="star"></div>
                                            <div class="star"></div>
                                            <div class="star"></div>
                                          </div>
                                          <div class="product__price">
                                            5000 Р
                                          </div>
                                          <div class="product__btns">
                                            <button class="product__buy">Купить в 1 клик</button>
                                            <button class="product__add"></button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </article>`;

export default CATALOG_TEMPLATE;