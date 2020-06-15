import { Base, IBase } from './base.model';

export interface ICliente extends IBase {
    cpf?: string;
    nomeCliente?: string;
}

export class Cliente extends Base {
    cpf?: string;
    nomeCliente?: string;
}
