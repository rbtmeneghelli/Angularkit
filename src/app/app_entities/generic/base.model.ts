export interface IBase {
    id?: number;
    status?: boolean;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    acoes?: string;
}

export class Base implements IBase {
    id?: number;
    status?: boolean;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    acoes?: string;
}
