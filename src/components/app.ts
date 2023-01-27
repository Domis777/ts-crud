import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import strProps, { type StrObjProps } from '../helpers/stringify-objects';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';

const brandToOption = ({ id, title }: Brand): Option => ({
 value: id,
 text: title,
});

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private selectedBrandId: string;

  private carsTable: Table<StrObjProps<CarJoined>>;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    this.carsCollection = new CarsCollection({ cars, brands, models });

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.selectedBrandId = '-1';
    this.htmlElement = foundElement;

    this.carsTable = new Table({
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
  }

  private handleBrandChange = (carId: string): void => {
    this.selectedBrandId = carId;

    this.update();
  };

  public initialize = (): void => {
  const select = new SelectField({
    options: [
      { value: '-1', text: 'All Cars' },
      ...brands.map(brandToOption),
    ],
    onChange: this.handleBrandChange,
  });

  const container = document.createElement('div');
  container.className = 'container d-flex flex-column my-5 gap-3';
  container.append(
    select.htmlElement,
    this.carsTable.htmlElement,
    );

    this.htmlElement.append(container);
  };

  private update = (): void => {
    const { selectedBrandId, carsCollection } = this;

    if (this.selectedBrandId === '-1') {
      this.carsTable.updateProps({
        title: 'All Cars',
        rowsData: carsCollection.all.map(strProps),
      });
    } else {
      const brand = this.carsCollection.getBrandTitleById(selectedBrandId);

      this.carsTable.updateProps({
        title: brand.title,
        rowsData: carsCollection
        .getByBrandId(selectedBrandId)
        .map(strProps),
      });
    }
  };
}

export default App;
