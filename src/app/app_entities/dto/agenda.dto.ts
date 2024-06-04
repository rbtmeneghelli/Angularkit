import { IGenericDTO } from '../generic/genericDTO.model';

export interface IAgendaDTO extends IGenericDTO {
    descricao?: string;
    local?: string;
    data?: Date;
    hora?: string;
    alerta?: boolean;
}

export class AgendaDTO implements IAgendaDTO {
    descricao?: string;
    local?: string;
    data?: Date;
    hora?: string;
    alerta?: boolean;
}
