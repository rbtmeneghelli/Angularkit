export interface IAuditoria {
    dataCriacao?: string;
    tela?: string;
    classe?: boolean;
    metodo?: string;
    nomeUsuario?: string;
}

export class Auditoria implements IAuditoria {
    dataCriacao?: string;
    tela?: string;
    classe?: boolean;
    metodo?: string;
    nomeUsuario?: string;
}
