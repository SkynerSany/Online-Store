const CATALOG_TEMPLATE = `<article class="catalog">
                            <div class="wrapper catalog__wrapper">
                              <h2 class="catalog__title">Каталог</h2>
                              <div class="catalog__container">
                                <section class="filters">
                                  <div class="filters__header">
                                    <h3>Фильтры</h3>
                                    <button class="filters__close"></button>
                                  </div>
                                  <form class="filter filter-text" id="search-form">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Поиск</p>
                                    </div>
                                    <div class="filter-text__container">
                                      <input id="search" class="filter-text__input" type="search" placeholder="Поиск..." autofocus/>
                                      <button class="filter-text__btn" aria-label="search"></button>  
                                    </div>
                                  </form>
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
                                  <button class="filters__btn-clear">Очистить фильтры</button>
                                </section>
                                <section class="products">
                                  <div class="products__header">
                                    <p class="products__count-container">
                                      <span>Найдено: </span>
                                      <span class="products__count"></span>
                                    </p>
                                    <button class="mode-view mode-table"></button>
                                    <div class="products__filters-show">
                                      <div class="products__filters-image"></div>
                                      <span>Фильтры</span>
                                    </div>
                                    <div class="products__sort-container dropdown-list">
                                      <p class="products__sort-title">Сначала дешевые</p>
                                    </div>
                                  </div>
                                  <p class="not-found">Товары не обноружены</p>
                                  <div class="products__container"></div>
                                  <div class="pagination">
                                  </div>
                                </section>
                              </div>
                            </div>
                          </article>`;

export default CATALOG_TEMPLATE;