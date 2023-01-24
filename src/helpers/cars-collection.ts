type CarsCollectionProps = {
    carArr: Car[],
    brandArr: Brand[],
    modelArr: Model[] 
};

class CarsCollection {
    private props: CarsCollectionProps;
    
    constructor(props: CarsCollectionProps) {
        this.props = props;
    }
}

export default CarsCollection;
