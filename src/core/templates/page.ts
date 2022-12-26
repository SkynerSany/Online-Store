abstract class Page {
  protected container: HTMLElement;

  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement('main');
    this.container.id = id;
  }

  protected createHeaderTitle(text: string) {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  customCreateElement(tagName:string, className:string, text:string, value:string, type:string, min:string, max:string, step:string): HTMLElement {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    if (value && element instanceof HTMLInputElement) element.value = value;
    if (type && element instanceof HTMLInputElement || element instanceof HTMLButtonElement) element.type = type;
    if (min && element instanceof HTMLInputElement) element.min = min;
    if (max && element instanceof HTMLInputElement) element.max = max;
    if (step && element instanceof HTMLInputElement) element.step = step;
    return element;
  }

  appendElement(node: HTMLElement, element: HTMLElement | HTMLTemplateElement): void {
    node.append(element);
  }

  render() {
    return this.container;
  }

}

export default Page;