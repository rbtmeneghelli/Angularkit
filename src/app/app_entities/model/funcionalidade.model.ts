import { IBase, Base } from './base.model';

export interface IFuncionalidade extends IBase {
    descricao?: string;
    role?: string;
}

export class Funcionalidade extends Base {
    descricao?: string;
    role?: string;
}

