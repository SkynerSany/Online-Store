const PRODUCT_TEMLATE =  `<div class="product">
                            <div class="product__container">
                              <div class="product__info">
                              <div class="product__image-wrapper">
                                <div class="labels">
                                  <p class="label label__new">Новинка</p>
                                </div>
                                <img src="" alt="product" class="product__image">
                              </div>
                                <div>
                                  <h3 class="product__name"></h3>
                                  <p class="product__description"></p>
                                  <div class="product__stars"></div>
                                </div>
                                <div class="product__price">
                                  <div class="product__discount-container">
                                    <p class="product__price-before"></p>
                                    <div class="product__discount-wrapper">
                                      <p class="product__discount-percent"></p>
                                    </div>
                                  </div>
                                  <p class="product__price-after"></p>
                                </div>
                              </div>
                              <div class="product__btns">
                                <button class="product__buy">Купить в 1 клик</button>
                                <button class="product__add" aria-label="add to cart"><div></div></button>
                              </div>
                            </div>
                          </div>`;

export default PRODUCT_TEMLATE;