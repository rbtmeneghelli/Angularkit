import { BaseFilterData } from './base-filter';
import { Estados } from './estados.model';

export class EstadosFilterData extends BaseFilterData {
    public data?: Estados[];
    constructor() {
        super();
    }
}
