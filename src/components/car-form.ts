import TextField from './text-field';
import SelectField from './select-field';
import brands from '../data/brands';
import models from '../data/models';

export type Values = {
    brand: string,
    model: string,
    price: string,
    year: string,
  };

type CarFormProps = {
    values: Values,
    title: string,
    submitBtnText: string,
};

type Fields = {
    brand: SelectField,
    model: SelectField,
    price: TextField,
    year: TextField,
  };

class CarForm {
    private props: CarFormProps;

    public htmlElement: HTMLFormElement;

    private fields: Fields;

    constructor(props: CarFormProps) {
        this.props = props
        this.htmlElement = document.createElement('form')

        this.fields = {
          brand: new SelectField({
            name: 'brand',
            labelText: 'Markė',
            options: brands.map(({ id, title }) => ({ text: title, value: id })),
          }),
          model: new SelectField({
            name: 'model',
            labelText: 'Modelis',
            options: models.map(({ id, title }) => ({ text: title, value: id })),
          }),
          price: new TextField({
            name: 'price',
            labelText: 'Kaina',
            value: '',
          }),
          year: new TextField({
            name: 'year',
            labelText: 'Metai',
            value: '',
          }),
        };

        this.initialize();
        this.renderView();
    };

    private initialize() {

    };

    private renderView() {

    };

    public updateProps(props: Partial<CarFormProps>) {
        this.props = {
            ...this.props,
            ...props,
        };

        this.renderView();
    };
}

export default CarForm;