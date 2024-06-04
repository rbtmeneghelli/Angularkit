import { Base, IBase } from '../generic/base.model';

export interface IUsuario {
    email?: string;
    senha?: string;
}

export class Usuario extends Base implements IUsuario {
    email: string;
    senha: string;
}
