import { Base } from '../generic/base.model';

export interface IBanco {
    nomeBanco?: string;
    url?: string;
    login?: string;
    senha?: string;
    senhaAlt?: string;
    credito?: number;
    debito?: number;
    saldo?: number;
}

export class Banco extends Base implements IBanco {
    nomeBanco?: string;
    url?: string;
    login?: string;
    senha?: string;
    senhaAlt?: string;
    credito?: number;
    debito?: number;
    saldo?: number;
}
