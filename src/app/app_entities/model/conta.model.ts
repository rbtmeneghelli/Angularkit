import { Base } from '../generic/base.model';
import { EnumTipoConta } from '../enum/EnumTipoConta';

export interface IConta {
    descricao?: string;
    tipoConta?: EnumTipoConta;
}

export class Conta extends Base implements IConta {
    descricao?: string;
    tipoConta?: EnumTipoConta;
}


