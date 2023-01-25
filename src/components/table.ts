type TableProps<Type> = {
    title: string,
    column: Type,
    rowsData: type[],
}

class Table{
    public htmlElement: HTMLTableElement;
    private props: TableProps<Type>;
    private thead: HTMLTableSectionElement;
    private tbody: HTMLTableSectionElement;

    public constructor(props: TableProps<Type>){
        this.props = props
        this.htmlElement = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
    }

    this.initialize();
}