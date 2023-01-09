const MODAL_TEMPLATE =  `<div class="modal-backDrop">
<div class="modal">
  <h2 class="modal__title">Офрмление заказа</h2>
  <form action="" class="modal__form">
    <div class="modal__personal-details">
      <input type="text" name="" id="person-name" placeholder="Имя" class="modal__input-name" required>
      <input type="tel" name="" pattern="[+]+[0-9]{9,}" title="Формат +123456789" id="person-tel" placeholder="Телефон" class="modal__input-name" required>
      <input type="text" name="" id="person-address" placeholder="Адрес доставки" class="modal__input-name" required>
      <input type="email" name="" id="person-email" placeholder="Электронный адрес" class="modal__input-name" required>
    </div>
    <div class="modal__card">
      <p class="modal__card-title"></p>
      <div class="card__container">
        <div class="card__number-container">
          <label for="card-number" class="card__input-label">Номер карты</label>
          <input type="text" name="" maxlength="16" pattern="[0-9]{16}" title="Должно быть 16 цифр без пробелов" id="card-number" placeholder="•••• •••• •••• ••••" class="card__input" required>
        </div>
        <div class="card__row-container">
          <div class="card__input-container">
            <label for="card-cvv" class="card__input-label">Срок действия</label>
            <input type="text" name="" pattern="[0-9]+/[0-9]{2}" title="Формат 12/12" maxlength="5" id="card-cvv" placeholder="MM/YY" class="card__input" required>
          </div>
          <div class="card__input-container">
            <label for="card-date" class="card__input-label">CVC</label>
            <input type="text" name="" maxlength="3" id="card-date" pattern="[0-9]{3}" title="Должно быть 3 цифры" placeholder="•••" class="card__input" required>
          </div>
        </div>
      </div>
    </div>
    <button class="modal__confirm">Оплатить</button>
  </form>
</div>
</div>`

export default MODAL_TEMPLATE;