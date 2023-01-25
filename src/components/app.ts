import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    this.carsCollection = new CarsCollection({ cars, brands, models });

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
  }

  initialize = (): void => {
   const carTable = new Table({
    title: 'All CARS',
    columns: {
      id: 'Id',
      brand: 'Brand',
      model: 'Model',
      price: 'Price',
      year: 'Year',
    },
    rowsData: this.carsCollection.all.map();
   });

   const container = document.createElement('div');
   container.className = 'container my-5',
   container.appendChild(carTable.htmlElement);

   this.htmlElement.append(container);
  };
}

export default App;
