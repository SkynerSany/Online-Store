import stringToElement from '../../../utils/htmlToElement';
import HEADER_TEMLATE from './header.template';
import './header.scss';

const headerElement: HTMLTemplateElement = stringToElement(HEADER_TEMLATE);

export default headerElement;