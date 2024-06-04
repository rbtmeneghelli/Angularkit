export class BaseFilterData {
    public pageIndex?: number;
    public pageSize?: number;
    constructor() {
        this.pageIndex = 1;
        this.pageSize = 10;
    }
}
