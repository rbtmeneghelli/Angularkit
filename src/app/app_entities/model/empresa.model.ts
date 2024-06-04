import { Base } from '../generic/base.model';

export interface IEmpresa {
    cnpj?: string;
    nomeEmpresa?: string;
    nomeFantasia?: string;
}

export class Empresa extends Base implements IEmpresa {
    cnpj?: string;
    nomeEmpresa?: string;
    nomeFantasia?: string;
}
