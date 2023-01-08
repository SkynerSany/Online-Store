import { Iproduct, IproductList } from '../../../app/interfaces';

export default function getProductsData(): Promise<void | Iproduct[]> {
  return fetch('../../data/products.json')
    .then(
      (response) => response.json(),
      (err) => console.error(err))
    .then((result: IproductList) => result.products,
    (err) => console.error(err));
}