import stringToElement from '../../../utils/htmlToElement';
import FOOTER_TEMPLATE from './footer.template';
import './footer.scss';

const footerElement: HTMLTemplateElement = stringToElement(FOOTER_TEMPLATE);

export default footerElement;