import Page from "../../core/templates/page";

class BasketPage extends Page {
  static TextObject = {
    title: 'Bascet Page',
  }

  render() {
    const title = this.createHeaderTitle(BasketPage.TextObject.title);
    this.container.append(title);
    return this.container;
  }
}

export default BasketPage;