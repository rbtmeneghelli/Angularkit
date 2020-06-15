
import { EnumTipoConta } from '../enum/EnumTipoConta';
import { IBase, Base } from '../model/base.model';

export interface IConta extends IBase {
    descricao?: string;
    tipoConta?: EnumTipoConta;
}

export class Conta extends Base {
    descricao?: string;
    tipoConta?: EnumTipoConta;
}
