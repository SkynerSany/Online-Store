import stringToElement from '../../../utils/htmlToElement';
import FOOTER_TEMLATE from './footer.template';
import './footer.scss';

const footerElement: HTMLTemplateElement = stringToElement(FOOTER_TEMLATE);

export default footerElement;