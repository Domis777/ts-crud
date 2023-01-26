import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import strProps from '../helpers/stringify-objects';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';

const brandToOption = ({ id, title }: Brand): Option => ({
 value: id,
 text: title,
});

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    this.carsCollection = new CarsCollection({ cars, brands, models });

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
  }

  handleOptionBrands = () => {
    console.log(this);
    console.log('Change Option');
  };

  initialize = (): void => {
    const select = new SelectField({
      options: brands.map(brandToOption),
      ChangeOption: this.handleOptionBrands,
    });

   const carTable = new Table({
    title: 'All CARS',
    columns: {
      id: 'Id',
      brand: 'Brand',
      model: 'Model',
      price: 'Price',
      year: 'Year',
    },
    rowsData: this.carsCollection.all.map(strProps),
   });

   const container = document.createElement('div');
   container.className = 'container d-flex flex-column my-5 gap-3';
   container.append(
    select.htmlElement,
    carTable.htmlElement,
    );

   this.htmlElement.append(container);
  };
}

export default App;
