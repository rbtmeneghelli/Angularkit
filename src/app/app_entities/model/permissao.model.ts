import { Base } from '../generic/base.model';

export interface IPermissao {
    nome?: string;
    status?: boolean;
}

export class Permissao extends Base implements IPermissao {
    nome: string;
    status: boolean;
}
