const CATALOG_TEMPLATE = `<article class="catalog">
                            <div class="wrapper catalog__wrapper">
                              <h2 class="catalog__title">Каталог</h2>
                              <div class="catalog__container">
                                <section class="filters">
                                  <form class="filter filter-range" id="price-form">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Цена, р</p>
                                    </div>
                                    <div class="filter-range__numbers-container">
                                      <div class="filter-range__numbers">
                                        от <input type="number" id="price-from" class="filter-range__from" value="0">
                                      </div>
                                      <div class="filter-range__numbers">
                                        до <input type="number" id="price-to" class="filter-range__to" value="100">
                                      </div>
                                    </div>
                                    <div class="multi-range filter-range__multi-range">
                                    </div>
                                  </form>
                                  <form class="filter filter-range" id="stock-form">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Колличество на складе</p>
                                    </div>
                                    <div class="filter-range__numbers-container">
                                      <div class="filter-range__numbers">
                                        от <input type="number" id="stock-from" class="filter-range__from" value="0">
                                      </div>
                                      <div class="filter-range__numbers">
                                        до <input type="number" id="stock-to" class="filter-range__to" value="100">
                                      </div>
                                    </div>
                                    <div class="multi-range filter-range__multi-range">
                                    </div>
                                  </form>
                                  <form class="filter filter-checkbox" id="category-form">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Категории</p>
                                    </div>
                                    <div class="filter-checkbox__container" id="category-container">
                                    </div>
                                  </form>
                                  <form class="filter filter-checkbox" id="brand-form">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Изготовители</p>
                                    </div>
                                    <div class="filter-checkbox__container" id="brand-container">
                                    </div>
                                  </form>
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
                                    <div class="products__sort-container dropdown-list">
                                      <p class="products__sort-title">Сначала дешевые</p>
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