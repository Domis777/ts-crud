type RowData = {
    id: string,
    [key: string]: string,
};

export type TableProps<Type> = {
    title: string,
    columns: Type,
    rowsData: Type[],
};

class Table<Type extends RowData> {
    public htmlElement: HTMLTableElement;

    private props: TableProps<Type>;

    private thead: HTMLTableSectionElement;

    private tbody: HTMLTableSectionElement;

    public constructor(props: TableProps<Type>) {
        this.props = props;
        this.htmlElement = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');

        this.initialize();
    }

    private initializeThead = (): void => {
        const { title, columns } = this.props;

        const theadArr = Object.values(columns);
        const theadRowHtmlStr = theadArr.map((thead) => `<th>${thead}</th>`).join('');

        this.thead.innerHTML = `<tr>
            <th>${title}</th>
        </tr>
        <tr>${theadRowHtmlStr}</tr>`;
    };

    private initializeTbody = (): void => {
        const { rowsData, columns } = this.props;

        this.tbody.innerHTML = '';
        const rowsHtlmElements = rowsData.map(
            (rowData) => {
                const rowHtmlElement = document.createElement('tr');
                const cellsHtmlString = Object.keys(columns).map(
                    (key) => `<td>${rowData[key]}</td>`,
                ).join(' ');

                rowHtmlElement.innerHTML = cellsHtmlString;
                return rowHtmlElement;
            },
        );

        this.tbody.append(...rowsHtlmElements);
    };

    private initialize = (): void => {
        this.initializeThead();
        this.initializeTbody();

        this.htmlElement.className = 'table table-striped order border p-3';
        this.htmlElement.append(
            this.thead,
            this.tbody,
        );
    };
}

export default Table;
