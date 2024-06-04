import { IGenericDTO } from '../generic/genericDTO.model';

export interface IEmpresaDTO extends IGenericDTO {
    cnpj?: string;
    nomeEmpresa?: string;
    nomeFantasia?: string;
}

export class EmpresaDTO implements IEmpresaDTO {
    cnpj?: string;
    nomeEmpresa?: string;
    nomeFantasia?: string;
}
