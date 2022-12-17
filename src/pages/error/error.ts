import Page from "../../core/templates/page";
import './error.scss';

export const enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page {

  private errorType: ErrorTypes | string;

  static TextObject: { [prop: string]: string } = {
    '404': 'Error! The page was not found...'
  };

  constructor(id:string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(ErrorPage.TextObject[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;