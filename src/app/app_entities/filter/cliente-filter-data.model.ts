import { BaseFilterData } from './base-filter-data.model';

export class ClienteFilterData extends BaseFilterData {
    public cpf ?: string;
    public nomeCliente ?: string;
    constructor() {
        super();
        this.cpf = null;
        this.nomeCliente = null;
    }
}
