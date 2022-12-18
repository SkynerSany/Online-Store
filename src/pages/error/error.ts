import stringToElement from '../../utils/htmlToElement';
import Page from "../../core/templates/page";
import ERRORPAGETEMPLATE from "./error.template";
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
    const errorPage: HTMLTemplateElement = stringToElement(ERRORPAGETEMPLATE);
    this.container.append(errorPage);
    return this.container;
  }
}

export default ErrorPage;