import { Base, IBase } from './base.model';

export interface IBanco extends IBase {
    nomeBanco?: string;
    url?: string;
    login?: string;
    senha?: string;
    senhaAlt?: string;
    credito?: number;
    debito?: number;
    saldo?: number;
}

export class Banco extends Base {
    nomeBanco?: string;
    url?: string;
    login?: string;
    senha?: string;
    senhaAlt?: string;
    credito?: number;
    debito?: number;
    saldo?: number;
}
