import stringToElement from '../../utils/htmlToElement';
import Page from "../../core/templates/page";
import CATALOG_TEMPLATE from './catalog.template';
import './catalog.scss';

class CatalogPage extends Page {
  render() {
    const catalogPage: HTMLTemplateElement = stringToElement(CATALOG_TEMPLATE);
    this.container.append(catalogPage);
    return this.container;
  }
}

export default CatalogPage;