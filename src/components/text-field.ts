export type TextFieldProps = {
    lableText: string,
    name: string,
    value: string,
}

class TextField {
    private props: TextFieldProps;

    public htmlElement: HTMLDivElement;

    constructor(props: TextFieldProps) {
        this.props = props;
        this.htmlElement = document.createElement('');
    }

    initialize = () => {
    }
}

export default TextField