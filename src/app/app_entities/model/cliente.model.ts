import { Base } from '../generic/base.model';

export interface ICliente {
    cpf?: string;
    nomeCliente?: string;
}

export class Cliente extends Base implements ICliente {
    cpf?: string;
    nomeCliente?: string;
}
