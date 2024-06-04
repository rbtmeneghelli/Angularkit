
import { EnumTipoConta } from '../enum/EnumTipoConta';
import { IGenericDTO } from '../generic/genericDTO.model';

export interface IConta extends IGenericDTO {
    descricao?: string;
    tipoConta?: EnumTipoConta;
}

export class Conta implements IConta {
    descricao?: string;
    tipoConta?: EnumTipoConta;
}
