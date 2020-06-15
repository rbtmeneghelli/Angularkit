import { IBase, Base } from './base.model';

export interface IAgenda extends IBase {
    descricao?: string;
    local?: string;
    data?: Date;
    hora?: string;
    alert?: boolean;
}

export class Agenda extends Base {
    descricao?: string;
    local?: string;
    data?: Date;
    hora?: string;
    alert?: boolean;
}
