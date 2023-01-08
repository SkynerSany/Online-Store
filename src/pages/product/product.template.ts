const PRODUCT_PAGE_TEMPLATE = `<article class="product-page">
<div class="wrapper product-page__nav">
  <a href="#catalog" class="product-page__nav-item">Каталог</a>
  <span class="product-page__nav-arrow"></span>
  <span class="product-page__nav-item"></span>
  <span class="product-page__nav-arrow"></span>
  <span class="product-page__nav-item"></span>
  <span class="product-page__nav-arrow"></span>
  <span class="product-page__nav-item"></span>
</div>
<div class="wrapper product-page__wrapper">
  <section class="product-page__slider">
    <div class="product-page__slider-image">
      <img class="product__image product-page__image" src="" alt="">
    </div>
    <div class="slider-settings">
      <div class="product__slider-container"></div>
    </div>
  </section>
  <section class="product-page__information">
    <h2 class="product__name product-page__info-title"></h2>
    <div class="product-page__info-text">
      <div class="product-page__info">
        <p>
          <span>Брэнд:</span>
          <span class="product__brand-text"></span>
        </p>
        <p>
          <span>Категория:</span>
          <span class="product__category-text"></span>
        </p>
        <p>
          <span>Колличество на складе:</span>
          <span class="product__stock-text"></span>
        </p>
      </div>
      <div class="product__stars product-page__stars"></div>
      <div class="product__buy-container">
        <div class="product__price product-page__price">
          <div class="product__discount-container">
            <p class="product__price-before"></p>
            <div class="product__discount-wrapper">
              <p class="product__discount-percent"></p>
            </div>
          </div>
          <p class="product__price-after"></p>
        </div>
        <div class="product__btns product-page__btns">
          <button class="product__buy product-page__buy">Купить в 1 клик</button>
          <button class="product__add product-page__add" aria-label="add to cart"><div></div></button>
        </div>
      </div>
    </div>
    <p class="product__description product-page__description"></p>
  </section>
</div>
</article>`;

export default PRODUCT_PAGE_TEMPLATE;