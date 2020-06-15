import { IBase, Base } from '../model/base.model';

export interface IAgendaDTO extends IBase {
    descricao?: string;
    local?: string;
    data?: Date;
    hora?: string;
    alerta?: boolean;
}

export class AgendaDTO extends Base {
    descricao?: string;
    local?: string;
    data?: Date;
    hora?: string;
    alerta?: boolean;
}
