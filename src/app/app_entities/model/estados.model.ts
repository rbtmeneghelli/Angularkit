import { Base } from "../generic/base.model";

export interface IEstados{
    sigla?: string;
    nome?: string;
}

export class Estados extends Base implements IEstados {
    sigla?: string;
    nome?: string;
}
