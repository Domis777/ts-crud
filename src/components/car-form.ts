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

  private htmlFormHeader: HTMLHeadingElement;

  private htmlFieldsContainer: HTMLDivElement;

  private htmlSubmitBtn: HTMLButtonElement;

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
      this.htmlFormHeader.className = 'h3 text-center';

    const fieldsArr = Object.values(this.fields);
    this.htmlFieldsContainer.className = 'd-flex flex-column gap-2';
    this.htmlFieldsContainer.append(...fieldsArr.map((field) => field.htmlElement));

    this.htmlSubmitBtn.className = 'btn btn-primary';

    this.htmlElement.className = 'card d-flex flex-column gap-3 p-3';
    this.htmlElement.append(
      this.htmlFormHeader,
      this.htmlFieldsContainer,
      this.htmlSubmitBtn,
    );
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