import { Base, IBase } from '../generic/base.model';

export interface IFuncionario {
    nome?: string;
    cargo?: string;
    salario?: string;
}

export class Funcionario extends Base implements IFuncionario {
    nome: string;
    cargo: string;
    salario: string;
}
