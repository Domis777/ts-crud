import countObjProperties from '../helpers/count-object-properties';

type RowData = {
    id: string,
    [key: string]: string,
};

export type TableProps<Type> = {
    title: string,
    columns: Type,
    rowsData: Type[],
    onDelete: (id: string) => void
};

class Table<Type extends RowData> {
    public htmlElement: HTMLTableElement;

    private props: TableProps<Type>;

    private thead: HTMLTableSectionElement;

    private tbody: HTMLTableSectionElement;

    public constructor(props: TableProps<Type>) {
        this.props = props;
        this.columnCompatability();

        this.htmlElement = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');

        this.initialize();
        this.renderView();
    }

    private initialize = (): void => {
        this.htmlElement.className = 'table table-striped order border p-3';
        this.htmlElement.append(
            this.thead,
            this.tbody,
        );
    };

    private columnCompatability = (): void => {
        const { rowsData, columns } = this.props;

        if (this.props.rowsData.length === 0) return;
        const columnsCount = countObjProperties(columns);

        const columnCompatabilityWhitRowsData = rowsData.every(
            (row) => {
                const rowCellsCount = countObjProperties(row);
                return rowCellsCount === columnsCount;
            },
            );
            if (!columnCompatabilityWhitRowsData) {
            throw new Error('Wrong column number whit cell number');
        }
    };

    private renderThead = (): void => {
        const { title, columns } = this.props;

        const theadArr = Object.values(columns);
        const theadRowHtmlStr = theadArr.map((thead) => `<th class="bg-dark text-white">${thead}</th>`).join('');

        const columnLenght = theadArr.length + 1;

        this.thead.className = 'bg-dark text-white';
        this.thead.innerHTML = `
        <tr class="text-center h3">
            <th colspan="${columnLenght}">${title}</th>
        </tr>
        <tr>
            ${theadRowHtmlStr}
            <th></th>
        </tr>`;
    };

    private renderTbody = (): void => {
        const { rowsData, columns } = this.props;

        this.tbody.innerHTML = '';
        const rows = rowsData.map(
            (rowData) => {
                const deletebutton = document.createElement('button');
                deletebutton.className = 'btn btn-danger btn-sm text-white fw-bolder';
                deletebutton.innerText = '✕';
                deletebutton.addEventListener('click', () => this.props.onDelete(rowData.id));

                const td = document.createElement('td');
                td.append(deletebutton);

                const tr = document.createElement('tr');
                tr.innerHTML = Object.keys(columns)
                .map((key) => `<td>${rowData[key]}</td>`)
                .join(' ');
                tr.append(td);

                return tr;
            },
        );

        this.tbody.append(...rows);
    };

    private renderView = () => {
        this.renderThead();
        this.renderTbody();
    };

    public updateProps = (props: Partial<TableProps<Type>>) => {
        this.props = {
            ...this.props,
            ...props,
        };

        this.renderView();
    };
}

export default Table;
