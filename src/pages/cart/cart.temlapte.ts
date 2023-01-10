const totalBox = `<div class="cart__total-box flex-col">
                    <h3 class="cart__title">Итого</h3>
                    <div class="cart__number-products flex-row">
                      <span class="cart__summ-product">товар(a) на сумму</span>
                      <span class="cart__amount">0 р.</span>
                    </div>
                    <div class="cart__delivery-box flex-row">
                      <span>Стоимость доставки</span>
                      <span>бесплатно</span>
                    </div>
                    <div class="cart__promo-box flex-col">
                      <input class="cart__promo" placeholder="Введите промо-код" type="search" name="promocode">
                      <div class="cart__promo-desc flex-col">
                        <span>Rolling Scopes School - 10%</span>
                        <button class="cart__promo-btn" type="button">Добавить</button>
                      </div>
                      <span>Промо для теста: 'RS', 'EPAM'</span>
                    </div>
                    <div class="cart__summ-box flex-row">
                      <span class="cart__payment">К оплате</span>
                      <span class="cart__summ">0 р.</span>
                    </div>
                    <div class="cart__summ-box cart__summ-box_not-active flex-row">
                      <span class="cart__payment">К оплате</span>
                      <span class="cart__summ">0 р.</span>
                    </div>
                    <button class="cart__order">Оформить заказ</button>
                  </div>`;

export default totalBox;