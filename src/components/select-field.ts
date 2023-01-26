type Option = {
    value: string;
    text: string;
};

type SelectFieldProps = {
    options: Option[]
};

class SelectField {
    private options: Option[];

    public htmlElement: HTMLSelectElement;

    constructor({ options }: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.htmlElement.className = 'form-select';
        this.options = options;
        this.htmlElement.innerHTML = `
        <option value="">BMW</option>
        <option value="">Volvo</option>
        <option value="">Audi</option>
        `;
    }
}

export default SelectField;
