import { IBase, Base } from '../model/base.model';

export interface IClienteDTO extends IBase {
    cpf?: string;
    nomeCliente?: string;
    status?: boolean;
}

export class ClienteDTO extends Base {
    cpf?: string;
    nomeCliente?: string;
    status?: boolean;
}
