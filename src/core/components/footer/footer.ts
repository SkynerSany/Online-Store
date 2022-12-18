import stringToElement from '../../../utils/htmlToElement';
import FOOTERTEMLATE from './footer.template';
import './footer.scss';

const footerElement: HTMLTemplateElement = stringToElement(FOOTERTEMLATE);

export default footerElement;