import type Car from '../types/car';
import type Brand from '../types/brand';
import type Model from '../types/model';
import type CarJoined from '../types/car-joined';

type CarsCollectionProps = {
    carArr: Car[],
    brandArr: Brand[],
    modelArr: Model[],
};

class CarsCollection {
    private props: CarsCollectionProps;

    constructor(props: CarsCollectionProps) {
        this.props = props;
    }

    private joinCars = ({ modelID, ...car }: Car) => {
        const { brandArr, modelArr } = this.props;
        const carsModel = modelArr.find((model) => model.id === modelID);
        const carsBrand = brandArr.find((brand) => brand.id === carsModel?.brandID);

        return {
            ...car,
            brand: (carsBrand && carsBrand.title) ?? 'unknown',
            model: (carsModel && carsModel.title) ?? 'unknown',
        };
    };

    public get all(): CarJoined[] {
        return this.props.carArr.map(this.joinCars);
    }
}

export default CarsCollection;
