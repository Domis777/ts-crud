export type TableProps<Type> = {
    title: string,
    column: Type,
    rowsData: Type[],
}

class Table<>{
    public htmlElement: HTMLTableElement;
    private props: TableProps<Type>;
    private thead: HTMLTableSectionElement;
    private tbody: HTMLTableSectionElement;

    public constructor(props: TableProps<Type>){
        this.props = props
        this.htmlElement = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
        
        this.initialize();
    }

    private initializeThead = (): void => {
        const { title, columns } = this.props;

        const theadArr = Object.values(columns);
        const theadRowHtmlStr = theadArr.map((thead) => `<th>${thead}</th>`).join('');

        this.thead.innerHTML = 
        `<tr>
            <th>${title}</th>
        </tr>
        <tr>${theadRowHtmlStr}</tr>`;
    }

    private initialize = (): void => {
        this.initializeThead();

        this.htmlElement.className = 'table table-striped order border p-3';
        this.htmlElement.append(
            this.thead,
        );
    };
}

export default Table;