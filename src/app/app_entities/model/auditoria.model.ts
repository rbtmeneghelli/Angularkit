export interface IAuditoria {
    id?: number;
    tela?: string;
    classe?: string;
    metodo?: string;
    parametros?: string;
    erro?: string;
    erroSistema?: string;
    idUsuario?: number;
    dataCriacao?: Date;
}

export class Auditoria implements IAuditoria{
    id?: number;
    tela?: string;
    classe?: string;
    metodo?: string;
    parametros?: string;
    erro?: string;
    erroSistema?: string;
    idUsuario?: number;
    dataCriacao?: Date;
}
