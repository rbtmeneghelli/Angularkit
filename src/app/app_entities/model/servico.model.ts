import { IBase, Base } from './base.model';
import { EnumTipoServico } from '../enum/EnumTipoServico';

export interface IServico extends IBase {
    descricao?: string;
    tipoServico?: EnumTipoServico;
}

export class Servico extends Base {
    descricao?: string;
    tipoServico?: EnumTipoServico;
}


