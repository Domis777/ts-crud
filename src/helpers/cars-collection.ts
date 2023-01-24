import type Car from '../types/car';
import type Brand from '../types/brand';
import type Model from '../types/model';
import type CarJoined from '../types/car-joined';

type CarsCollectionProps = {
    cars: Car[],
    brands: Brand[],
    models: Model[],
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
}

export default CarsCollection;
