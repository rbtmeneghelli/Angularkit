import { IGenericDTO } from '../generic/genericDTO.model';

export interface IClienteDTO extends IGenericDTO {
    cpf?: string;
    nomeCliente?: string;
    status?: boolean;
}

export class ClienteDTO implements IClienteDTO {
    cpf?: string;
    nomeCliente?: string;
    status?: boolean;
}
