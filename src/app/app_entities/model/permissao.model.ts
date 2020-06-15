import { Base, IBase } from './base.model';

export interface IPermissao extends IBase {
    nome?: string;
    status?: boolean;
}

export class Permissao extends Base {
    nome: string;
    status: boolean;
}
