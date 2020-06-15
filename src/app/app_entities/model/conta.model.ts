import { IBase, Base } from './base.model';
import { EnumTipoConta } from '../enum/EnumTipoConta';

export interface IConta extends IBase {
    descricao?: string;
    tipoConta?: EnumTipoConta;
}

export class Conta extends Base {
    descricao?: string;
    tipoConta?: EnumTipoConta;
}


