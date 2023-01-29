import { v4 as uuidv4 } from 'uuid';
import type Car from '../types/car';
import type Brand from '../types/brand';
import type Model from '../types/model';
import type CarJoined from '../types/car-joined';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

export type CarProps = {
  brandId: string,
  modelId: string,
  price: number,
  year: number
};

class CarsCollection {
  private props: CarsCollectionProps;

  constructor(props: CarsCollectionProps) {
    this.props = props;
  }

  private joinCars = ({ modelId, ...car }: Car) => {
    const { brands, models } = this.props;
    const carsModel = models.find((model) => model.id === modelId);
    const carsBrand = brands.find((brand) => brand.id === carsModel?.brandId);

    return {
      ...car,
      brand: (carsBrand && carsBrand.title) ?? 'unknown',
      model: (carsModel && carsModel.title) ?? 'unknown',
    };
  };

  public get all(): CarJoined[] {
    return this.props.cars.map(this.joinCars);
  }

  public getByBrandId = (brandId: string): CarJoined[] => {
    const { cars, models } = this.props;

    const brandModelIds = models
    .filter((model) => model.brandId === brandId)
    .map((model) => model.id);

    const carsModelIds = cars
    .filter((car) => brandModelIds
    .includes(car.modelId))
    .map(this.joinCars);

    return carsModelIds;
  };

  public getByBrandTitleId = (brandId: string) => {
    const { brands } = this.props;

    const foundBrand = brands.find((b) => b.id === brandId);

    if (foundBrand === undefined) throw new Error(`Brand is not found "${brandId}"`);

    return foundBrand;
  };

  public deleteCarById = (brandId: string) => {
    const { cars } = this.props;

    this.props.cars = cars.filter((car) => car.id !== brandId);
  };

  public add = ({ modelId, brandId, ...carProps }: CarProps): void => {
    const { models, brands, cars } = this.props;
    const model = models.find((m) => m.id === modelId);
    const brand = brands.find((b) => b.id === brandId);

    if (!model || !brand) {
      throw new Error('Bad data input to create a car');
    }

    const newCar: Car = {
      id: uuidv4().toLocaleUpperCase(),
      ...carProps,
      modelId,
    };

    cars.push(newCar);
  };

  public update = (carId: string, { brandId, modelId, ...props }: CarProps) => {
    const { cars, models, brands } = this.props;

    console.log({
      carId, brandId, modelId, ...props,
    });

    const updatedCarIndex = cars.findIndex((c) => c.id === carId);
    if (updatedCarIndex === -1) {
      throw new Error(`Atnaujinimo klaida: nerasta mašina su id: '${carId}'`);
    }

    const model = models.find((m) => m.id === modelId);
    if (!model) {
      throw new Error(`Atnaujinimo klaida: nerastas mašinos modelis su id: '${modelId}'`);
    }

    const brand = brands.find((b) => b.id === brandId);
    if (!brand) {
      throw new Error(`Atnaujinimo klaida: nerasta mašinos markė su id: '${brandId}'`);
    }

    const updatedCar: Car = {
      ...cars[updatedCarIndex],
      ...props,
      modelId,
    };

    this.props.cars.splice(updatedCarIndex, 1, updatedCar);
  };
}

export default CarsCollection;
