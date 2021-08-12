export interface ICookie {
    tipoacao: string;
    funcionalidade: string;
    urlChamada: string;
    iP: string;
    navegador: string;
    sistemaOperacional: string;
    items: CookieItem[];
}

export interface ICookieItem {
    dataHora: Date;
    urlChamada: string;
    funcionalidade: string;
    tipoAcao: string;
    iP: string;
    navegador: string;
    sistemaOperacional: string;
    nivel: string;
    request: string;
    response: string;
}

export class Cookie implements ICookie {
    public tipoacao: string;
    public funcionalidade: string;
    public urlChamada: string;
    public iP: string;
    public navegador: string;
    public sistemaOperacional: string;
    public items: CookieItem[];

    constructor(tipoacao: string, funcionalidade: string, urlChamada: string, ip: string, navegador: string, sistemaOperacional: string, items: CookieItem[]) {
        this.tipoacao = tipoacao;
        this.funcionalidade = funcionalidade;
        this.urlChamada = urlChamada;
        this.iP = ip;
        this.navegador = navegador;
        this.sistemaOperacional = sistemaOperacional;
        this.items = items;
    }
}

export class CookieItem implements ICookieItem {
    public dataHora: Date;
    public urlChamada: string;
    public funcionalidade: string;
    public tipoAcao: string;
    public iP: string;
    public navegador: string;
    public sistemaOperacional: string;
    public nivel: string;
    public request: string;
    public response: string;

    constructor(urlChamada: string, funcionalidade: string, tipoAcao: string, iP: string, navegador: string, sistemaOperacional: string, nivel: string, request: any, response: any) {
        this.dataHora = new Date();
        this.urlChamada = urlChamada;
        this.funcionalidade = funcionalidade;
        this.tipoAcao = tipoAcao;
        this.iP = iP;
        this.navegador = navegador;
        this.sistemaOperacional = sistemaOperacional;
        this.nivel = nivel;
        this.request = !!request ? JSON.stringify(request) : '';
        this.response = !!response ? JSON.stringify(response) : '';
    }
}