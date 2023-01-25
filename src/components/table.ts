type TableProps<Type> = {
    title: string,
    column: Type,
    rowsData: type[],
}

class Table{
    public htmlElement: HTMLTableElement;
    private thead: HTMLTableSectionElement;
    private tbody: HTMLTableSectionElement;

    public constructor(){
        this.htmlElement = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
    }
}