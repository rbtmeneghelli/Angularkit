import { BaseFilterData } from './base-filter-data';

export class ClienteFilterData extends BaseFilterData {
    public cpf ?: string;
    public nome ?: string;
    constructor() {
        super();
        this.cpf = null;
        this.nome = null;
    }
}
