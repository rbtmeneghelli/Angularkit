import { Base } from '../generic/base.model';

export interface IFuncionalidade {
    descricao?: string;
    role?: string;
}

export class Funcionalidade extends Base implements IFuncionalidade {
    descricao?: string;
    role?: string;
}

