const createCustomElement = (tagName:string, className:string, text:string, type:string, value: string): HTMLElement => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  if (element instanceof HTMLInputElement) {
    element.type = type;
    element.value = value;
  }
  return element;
}

export const appendElement = (node: HTMLElement, element: HTMLElement | HTMLTemplateElement): void => {
  node.append(element);
}

export default createCustomElement;