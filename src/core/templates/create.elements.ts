const createCustomElement = (tagName:string, className:string, text:string): HTMLElement => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

export const appendElement = (node: HTMLElement, element: HTMLElement | HTMLTemplateElement): void => {
  node.append(element);
}

export default createCustomElement;