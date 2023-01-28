type CarFormProps {

}

class CarForm {
    private props: CarFormProps;

    public htmlElement: HTMLFormElement;

    constructor(props: CarFormProps) {
        this.htmlElement = document.createElement('form')

        this.initialize();
        this.renderView();
    }

    private initialize() {

    }

    private renderView() {

    }
}

export default CarForm;