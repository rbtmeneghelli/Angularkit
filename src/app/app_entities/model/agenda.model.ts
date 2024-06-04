import { Base } from '../generic/base.model';

export interface IAgenda {
    descricao?: string;
    local?: string;
    data?: Date;
    hora?: string;
    alert?: boolean;
}

export class Agenda extends Base implements IAgenda {
    descricao?: string;
    local?: string;
    data?: Date;
    hora?: string;
    alert?: boolean;
}
