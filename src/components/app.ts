import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import CarsCollection, { CarProps } from '../helpers/cars-collection';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';
import strProps, { type StrObjProps } from '../helpers/stringify-objects';
import SelectField, { type OptionType } from './select-field';
import CarForm, { type Values } from './car-form';

const ALL_BRAND_ID = '-1' as const;
const ALL_BRAND_TITLE = 'All Cars';

const brandToOption = ({ id, title }: Brand): OptionType => ({
  value: id,
  text: title,
});

class App {
  private carsCollection: CarsCollection;

  private brandSelect: SelectField;

  private selectedBrandId: string;

  private carsTable: Table<StrObjProps<CarJoined>>;

  private carForm: CarForm;

  private editedCarId: null | string;

  private htmlElement: HTMLElement;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Element not found in selector: '${selector}'`);

    this.selectedBrandId = ALL_BRAND_ID;
    this.editedCarId = null;
    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({ cars, brands, models });

    this.carsTable = new Table({
      title: ALL_BRAND_TITLE,
      columns: {
        id: 'Id',
        brand: 'Brand',
        model: 'Model',
        price: 'Price',
        year: 'Year',
      },
      rowsData: this.carsCollection.all.map(strProps),
      onDelete: this.handleCarDelete,
      onEdit: this.handleEditBrand,
      editedCarId: this.editedCarId,
    });

    this.brandSelect = new SelectField({
      labelText: 'Brands',
      options: [
        { value: ALL_BRAND_ID, text: ALL_BRAND_TITLE },
        ...brands.map(brandToOption),
      ],
      onChange: this.handleBrandChange,
    });

    const initialBrandId = brands[0].id;
    this.carForm = new CarForm({
      title: 'Create new car',
      submitBtnText: 'Create',
      values: {
        brand: initialBrandId,
        model: models.filter((m) => m.brandId === initialBrandId)[0].id,
        price: '',
        year: '',
      },
      isEdited: 'Create',
      onSubmit: this.handleCreateCar,
    });
  }

  private handleBrandChange = (carId: string): void => {
    this.selectedBrandId = carId;

    this.renderView();
  };

  private handleCarDelete = (carId: string) => {
    this.carsCollection.deleteCarById(carId);
    this.editedCarId = null;

    this.renderView();
  };

  private handleEditBrand = (carId: string) => {
    this.editedCarId = carId === this.editedCarId ? null : carId;

    this.renderView();
  };

  private handleCreateCar = ({
    brand, model, price, year,
  }: Values): void => {
    const carProps: CarProps = {
      brandId: brand,
      modelId: model,
      price: Number(price),
      year: Number(year),
    };

    this.carsCollection.add(carProps);

    this.renderView();
  };

  private handleUpdateCar = ({
    brand, model, price, year,
  }: Values): void => {
    if (this.editedCarId) {
      const carProps: CarProps = {
        brandId: brand,
        modelId: model,
        price: Number(price),
        year: Number(year),
      };

      this.carsCollection.update(this.editedCarId, carProps);
      this.editedCarId = null;

      this.renderView();
    }
  };

  private renderView = (): void => {
    const { selectedBrandId, carsCollection } = this;

    if (this.selectedBrandId === ALL_BRAND_ID) {
      this.carsTable.updateProps({
        title: ALL_BRAND_TITLE,
        rowsData: carsCollection.all.map(strProps),
        editedCarId: this.editedCarId,
      });
    } else {
      const brand = brands.find((b) => b.id === selectedBrandId);
      if (brand === undefined) throw new Error('Pasirinkta neegzistuojanti mark??');

      this.carsTable.updateProps({
        title: brand.title,
        rowsData: carsCollection
        .getByBrandId(selectedBrandId)
        .map(strProps),
        editedCarId: this.editedCarId,
      });
    }

    if (this.editedCarId) {
      const editedCar = cars.find((c) => c.id === this.editedCarId);
      if (!editedCar) {
        alert('N??ra rasta ma??ina kuri?? bandote redaguoti');
        return;
      }

      const model = models.find((m) => m.id === editedCar.modelId);

      if (!model) {
        alert('N??ra rasta ma??ina kuri?? bandote redaguoti');
        return;
      }

      this.carForm.updateProps({
        title: 'Update car',
        submitBtnText: 'Update',
        values: {
          brand: model.brandId,
          model: model.id,
          price: String(editedCar.price),
          year: String(editedCar.year),
        },
        isEdited: 'Update',
        onSubmit: this.handleUpdateCar,
      });
    } else {
      const initialBrandId = brands[0].id;
      this.carForm.updateProps({
        title: 'Create new car',
        submitBtnText: 'Create',
        values: {
          brand: initialBrandId,
          model: models.filter((m) => m.brandId === initialBrandId)[0].id,
          price: '',
          year: '',
        },
        isEdited: 'Create',
        onSubmit: this.handleCreateCar,
      });
    }
  };

  public initialize = (): void => {
  const uxContainer = document.createElement('div');
  uxContainer.className = 'd-flex gap-3 align-items-start my-3';
  uxContainer.append(
    this.carsTable.htmlElement,
    this.carForm.htmlElement,
    );

  const container = document.createElement('div');
  container.className = 'container d-flex flex-column my-5 gap-3';
  container.append(
    this.brandSelect.htmlElement,
    uxContainer,
    );

    this.htmlElement.append(container);
  };
}

export default App;
