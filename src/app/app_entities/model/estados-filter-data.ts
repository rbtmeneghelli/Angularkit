import { BaseFilterData } from '../generic/base-filter.model';
import { Estados } from './estados.model';

export class EstadosFilterData extends BaseFilterData {
    public data?: Estados[];
    constructor() {
        super();
    }
}
