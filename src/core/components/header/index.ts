import stringToElement from '../../../utils/htmlToElement';
import HEADERTEMLATE from './header.template';
import './header.scss';

const headerElement: HTMLTemplateElement = stringToElement(HEADERTEMLATE);

export default headerElement;