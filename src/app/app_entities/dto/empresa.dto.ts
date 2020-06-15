import { IBase, Base } from '../model/base.model';

export interface IEmpresaDTO extends IBase {
    cnpj?: string;
    nomeEmpresa?: string;
    nomeFantasia?: string;
}

export class EmpresaDTO extends Base {
    cnpj?: string;
    nomeEmpresa?: string;
    nomeFantasia?: string;
}
