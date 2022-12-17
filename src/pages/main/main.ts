import Page from "../../core/templates/page";

class MainPage extends Page {
  static TextObject = {
    title: 'Main Page',
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.title);
    this.container.append(title);
    return this.container;
  }
}

export default MainPage;