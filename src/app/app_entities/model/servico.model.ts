import { Base } from '../generic/base.model';
import { EnumTipoServico } from '../enum/EnumTipoServico';

export interface IServico {
    descricao?: string;
    tipoServico?: EnumTipoServico;
}

export class Servico extends Base implements IServico{
    descricao?: string;
    tipoServico?: EnumTipoServico;
}


