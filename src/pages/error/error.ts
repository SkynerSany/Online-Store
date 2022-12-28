import stringToElement from '../../utils/htmlToElement';
import Page from "../../core/templates/page";
import ERROR_PAGE_TEMPLATE from "./error.template";
import './error.scss';

export const enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page {

  private errorType: ErrorTypes | string;

  constructor(id:string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }


  render(): HTMLElement {
    const errorPage: HTMLTemplateElement = stringToElement(ERROR_PAGE_TEMPLATE);
    this.container.append(errorPage);
    return this.container;
  }
}

export default ErrorPage;