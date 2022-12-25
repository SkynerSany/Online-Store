const CATALOG_TEMPLATE = `<article class="catalog">
                            <div class="wrapper catalog__wrapper">
                              <h2 class="catalog__title">Каталог</h2>
                              <div class="catalog__container">
                                <section class="filters">
                                  <div class="filter filter-range">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Цена, р</p>
                                    </div>
                                    <div class="filter-range__numbers-container">
                                      <div class="filter-range__numbers">
                                        от <input type="number" class="filter-range__from">
                                      </div>
                                      <div class="filter-range__numbers">
                                        до <input type="number" class="filter-range__to">
                                      </div>
                                    </div>
                                    <div class="multi-range filter-range__multi-range">
                                    </div>
                                    <button class="filters__confirm">Применить</button>
                                  </div>
                                  <div class="filter filter-range">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Колличество на складе</p>
                                    </div>
                                    <div class="filter-range__numbers-container">
                                      <div class="filter-range__numbers">
                                        от <input type="number" class="filter-range__from">
                                      </div>
                                      <div class="filter-range__numbers">
                                        до <input type="number" class="filter-range__to">
                                      </div>
                                    </div>
                                    <div class="multi-range filter-range__multi-range">
                                    </div>
                                    <button class="filters__confirm">Применить</button>
                                  </div>
                                  <div class="filter filter-checkbox">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Категория</p>
                                    </div>
                                    <div class="filter-checkbox__container">
                                      <input type="checkbox" id="category" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="category">asd</label>
                                      <input type="checkbox" id="category1" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="category1">adfs</label>
                                      <input type="checkbox" id="category2" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="category2">dgdfd</label>
                                      <input type="checkbox" id="category3" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="category3">hjghdg</label>
                                      <input type="checkbox" id="category4" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="category4">f;erjrf;sm</label>
                                    </div>
                                  </div>
                                  <div class="filter filter-checkbox">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Изготовитель</p>
                                    </div>
                                    <div class="filter-checkbox__container">
                                      <input type="checkbox" id="brend" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="brend">400</label>
                                      <input type="checkbox" id="brend1" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="brend1">500</label>
                                      <input type="checkbox" id="brend2" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="brend2">600</label>
                                      <input type="checkbox" id="brend3" class="filter-checkbox__checkbox">
                                      <label class="filter-checkbox__label" for="brend3">700</label>
                                    </div>
                                  </div>
                                </section>
                                <section class="products">
                                  <div class="products__header">
                                    <div class="products__filters-show">
                                      <div class="products__filters-image"></div>
                                      Фильтры
                                    </div>
                                    <div class="products__filters-list">
                                      <div class="current-filter">
                                        <p class="current-filter__name">Подсветка: есть</p>
                                        <button class="current-filter__remove"></button>
                                      </div>
                                      <button class="current-filter__clear">Очистить фильтры</button>
                                    </div>
                                    <div class="products__sort-container">
                                      <p class="products__sort-title">Сначала дорогие</p>
                                      <div class="products__sort-show"></div>
                                    </div>
                                  </div>
                                  <div class="products__container"></div>
                                  <div class="pagination">
                                  </div>
                                </section>
                              </div>
                            </div>
                          </article>`;

export default CATALOG_TEMPLATE;