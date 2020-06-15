import { Base, IBase } from './base.model';

export interface IEmpresa extends IBase {
    cnpj?: string;
    nomeEmpresa?: string;
    nomeFantasia?: string;
}

export class Empresa extends Base {
    cnpj?: string;
    nomeEmpresa?: string;
    nomeFantasia?: string;
}
