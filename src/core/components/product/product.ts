import stringToElement from '../../../utils/htmlToElement';
import PRODUCT_TEMPLATE from './product.template';
import './product.scss';

const productElement: HTMLTemplateElement = stringToElement(PRODUCT_TEMPLATE);

export default productElement;