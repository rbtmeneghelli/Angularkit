import { IBase, Base } from './base.model';

export interface IUsuario extends IBase {
    email?: string;
    senha?: string;
}

export class Usuario {
    email: string;
    senha: string;
}
