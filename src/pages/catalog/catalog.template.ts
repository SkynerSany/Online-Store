const CATALOG_TEMPLATE = `<article class="catalog">
                            <div class="wrapper catalog__wrapper">
                              <h2 class="catalog__title">Каталог</h2>
                              <div class="catalog__container">
                                <section class="filters">
                                  <div class="filter filter-range">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Цена, р</p>
                                      <div class="filter__show">▲</div>
                                    </div>
                                    <div class="filter-range__numbers-container">
                                      <div class="filter-range__numbers">
                                        от <input type="number" class="filter-range__from">
                                      </div>
                                      <div class="filter-range__numbers">
                                        до <input type="number" class="filter-range__to">
                                      </div>
                                    </div>
                                    <div class="filter-range__input-container">
                                      <input type="range" class="filter-range__range">
                                    </div>
                                    <button class="filters__confirm">Применить</button>
                                  </div>
                                  <div class="filter filter-range">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Колличество на складе</p>
                                      <div class="filter__show">▲</div>
                                    </div>
                                    <div class="filter-range__numbers-container">
                                      <div class="filter-range__numbers">
                                        от <input type="number" class="filter-range__from">
                                      </div>
                                      <div class="filter-range__numbers">
                                        до <input type="number" class="filter-range__to">
                                      </div>
                                    </div>
                                    <div class="filter-range__input-container">
                                      <input type="range" class="filter-range__range">
                                    </div>
                                    <button class="filters__confirm">Применить</button>
                                  </div>
                                  <div class="filter filter-checkbox">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Категория</p>
                                      <div class="filter__show"></div>
                                    </div>
                                    <div class="filter-checkbox__container">
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        asd
                                      </label>
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        adfs
                                      </label>
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        dgdfd
                                      </label>
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        hjghdg
                                      </label>
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        f;erjrf;sm
                                      </label>
                                    </div>
                                  </div>
                                  <div class="filter filter-checkbox">
                                    <div class="filter__title-container">
                                      <p class="filter__name">Изготовитель</p>
                                      <div class="filter__show"></div>
                                    </div>
                                    <div class="filter-checkbox__container">
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        400
                                      </label>
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        500
                                      </label>
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        600
                                      </label>
                                      <label class="filter-checkbox__label">
                                        <input type="checkbox" name="" id="" class="filter-checkbox__checkbox">
                                        700
                                      </label>
                                    </div>
                                  </div>
                                </section>
                                <section class="products">
                                  <div class="products__header">
                                    <div class="products__filters-list"></div>
                                    <div class="products__sort-container"></div>
                                  </div>
                                  <div class="products__container">
                                  </div>
                                  <div class="pagination">
                                    <div class="pagination__btn"><</div>
                                    <div class="pagination__btn">1</div>
                                    <div class="pagination__btn">2</div>
                                    <div class="pagination__btn">3</div>
                                    <div class="pagination__btn">></div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </article>`;

export default CATALOG_TEMPLATE;