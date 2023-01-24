import type Car from '../types/car'
import type Brand from '../types/brand'
import type Model from '../types/model'
import type CarJoined from '../types/car-joined'

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

    private joinCar = ()
}

export default CarsCollection;
