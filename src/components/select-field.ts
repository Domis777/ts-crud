export type Option = {
    value: string;
    text: string;
};

type SelectFieldProps = {
    options: Option[],
    ChangeOption: (value: string) => void,
};

class SelectField {
    private props: SelectFieldProps;

    public htmlElement: HTMLSelectElement;

    constructor(props: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.props = props;

        this.initialize();
    }

    initialize = () => {
        this.htmlElement.className = 'form-select';
        this.htmlElement.innerHTML = this.props.options
        .map(({ value, text }) => `
        <option value="${value}">${text}</option>
        `).join('');
        this.htmlElement.addEventListener(
            'change',
             () => this.props.ChangeOption(this.htmlElement.value),
        );
    };
}

export default SelectField;
