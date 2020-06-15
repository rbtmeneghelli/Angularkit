import { Base, IBase } from './base.model';

export interface IFuncionario extends IBase {
    nome?: string;
    cargo?: string;
    salario?: string;
}

export class Funcionario extends Base {
    nome: string;
    cargo: string;
    salario: string;
}
