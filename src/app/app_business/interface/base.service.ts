import { DropDownList } from 'src/app/app_entities/generic/dropdownlist';
import { EnumTypeAction } from 'src/app/app_entities/enum/EnumTypeAction';
import { EnumTypeCookie } from 'src/app/app_entities/enum/EnumTypeCookie';
import { Cookie, CookieItem } from 'src/app/app_entities/model/cookie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {

  constructor(protected http: HttpClient, protected actionUrl: string) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.actionUrl, { headers: this.getOptions() });
  }

  getAllFilter(filter?: T): Observable<any> {
    return this.http.post<any>(`${this.actionUrl}/getall`, filter, { headers: this.getOptions() });
  }

  getById(clienteid: number): Observable<T> {
    return this.http.get<T>(`${this.actionUrl}/GetById/${clienteid}`, { headers: this.getOptions() });
  }

  create(model: T): Observable<T> {
    return this.http.post<T>(this.actionUrl, model, { headers: this.getOptions() });
  }

  update(id: number, model: T): Observable<T> {
    const apiUrl = this.actionUrl + '/' + id;
    return this.http.put<T>(apiUrl, model, { headers: this.getOptions() });
  }

  deleteById(id: number): Observable<any> {
    const apiUrl = this.actionUrl + '/' + id;
    return this.http.delete<any>(apiUrl, { headers: this.getOptions() });
  }

  updateStatus(id: number): Observable<T> {
    const apiUrl = this.actionUrl + '/' + id;
    return this.http.put<T>(apiUrl, { headers: this.getOptions() });
  }

  getList(url: string): Observable<DropDownList[]> {
    return this.http.get<DropDownList[]>(this.actionUrl + url, { headers: this.getOptions() });
  }
  
  getListToCookie(url: string): Observable<DropDownList[]> {
    return this.http.get<DropDownList[]>(this.actionUrl + url, { headers: this.getOptions() }).pipe(tap(response => console.log('retorno do backend: ', response)));
  }

  protected getOptions(): HttpHeaders {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let httpOptions: HttpHeaders = new HttpHeaders();
    httpOptions = httpOptions.set('Content-Type', 'application/json');
    httpOptions = httpOptions.set('Access-Control-Allow-Origin', '*');
    httpOptions = httpOptions.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // tslint:disable-next-line: max-line-length
    httpOptions = httpOptions.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    // if (!!sessionStorage.getItem('usuarioLogado')) {
    //   httpOptions = httpOptions.append('Authorization', `Bearer ${'TOKEN'}`);
    // }
    return httpOptions;
  }

  // Configuração para gravar request/response dos passos do usuario pelo sistema
  // Para capturar o resultado do response (retorno do backend apos request do front), utilizar o comando tap dentro do comando pipe

  protected addCookieMenu(funcionalidade: string, tipoAcao: EnumTypeAction) {
    let cookie: Cookie;
    this.getIpAddress().toPromise().then(ipMachine => {
      cookie = new Cookie(
        this.getMapActions(tipoAcao),
        funcionalidade,
        this.getUrl(),
        ipMachine,
        this.getUserBrowser(),
        this.getUserOperationSystem(),
        new Array<CookieItem>());
      this.saveAuditoriaMenu(cookie);
    });
  }

  public addCookieFuncionalidade(tipoFuncionalidade: EnumTypeCookie, tipoAcao: EnumTypeAction) {
    let cookie: Cookie;
    this.getIpAddress().toPromise().then(ipMachine => {
      cookie = new Cookie(
        this.getMapActions(tipoAcao),
        this.getMapFunctionality(tipoFuncionalidade),
        this.getUrl(),
        ipMachine,
        this.getUserBrowser(),
        this.getUserOperationSystem(),
        new Array<CookieItem>());
      localStorage.setItem(this.getCookieFunctionality(tipoFuncionalidade), JSON.stringify(cookie));
    });
  }

  protected addCookieItemFromFuncionalidade(tipoFuncionalidade: EnumTypeCookie, urlChamada: string, tipoAcao: EnumTypeAction, nivel: string, request: any, response: any): void {
    const cookieName = this.getCookieFunctionality(tipoFuncionalidade);
    if (localStorage.getItem(cookieName) === null || localStorage.getItem(cookieName) === undefined) {
      this.addCookieFuncionalidade(tipoFuncionalidade, tipoAcao);
    } else {
      const cookie: Cookie = JSON.parse(localStorage.getItem(cookieName));
      if (!!cookie) {
        cookie.items.push(new CookieItem(urlChamada, this.getMapFunctionality(tipoFuncionalidade), this.getMapActions(tipoAcao), cookie.iP, cookie.navegador, cookie.sistemaOperacional, nivel, request, response));
      }
      localStorage.setItem(cookieName, JSON.stringify(cookie));
    }
  }

  protected removeCookie(tipoFuncionalidade: EnumTypeCookie) {
    localStorage.removeItem(this.getCookieFunctionality(tipoFuncionalidade));
  }

  protected saveAuditoria(tipoFuncionalidade: EnumTypeCookie) {
    const cookie: Cookie[] = [];
    cookie.push(JSON.parse(localStorage.getItem(this.getCookieFunctionality(tipoFuncionalidade))));
    return this.http.post<any>(`${this.actionUrl}/Audit/SaveAuditoriaData`, cookie);
  }

  protected saveAuditoriaMenu(cookie: Cookie) {
    this.http.post<any>(`${this.actionUrl}/Audit/SaveAuditoriaMenu`, cookie).pipe(take(1)).toPromise().then(response => { });
  }

  private getMapFunctionality(key: EnumTypeCookie): string {
    const map: Map<EnumTypeCookie, string> = new Map<EnumTypeCookie, string>();
    map.set(EnumTypeCookie.Menu, 'Menu');
    map.set(EnumTypeCookie.Login, 'Login');
    map.set(EnumTypeCookie.Home, 'Home');
    return map.get(key);
  }

  private getIpAddress(): Observable<string> {
    // Deixar a responsabilidade de pegar o IP pro backend, fazer isso dentro do codigo.
    return this.http.get('http://api.ipify.org/?format=json').pipe(map((res: any) => { return res.ip }), catchError((error: any) => { return 'Erro ao capturar seu IP' }));
  }

  private getUrl(): string {
    return window.location.href;
  }

  private getMapActions(key: EnumTypeAction): string {
    const map: Map<EnumTypeAction, string> = new Map<EnumTypeAction, string>();
    map.set(EnumTypeAction.Menu, 'Menu');
    map.set(EnumTypeAction.Others, 'Outros');
    map.set(EnumTypeAction.Create, 'Inserir');
    map.set(EnumTypeAction.Update, 'Editar');
    map.set(EnumTypeAction.Delete, 'Deletar');
    map.set(EnumTypeAction.Research, 'Consultar');
    map.set(EnumTypeAction.Authenticate, 'Autenticar');
    map.set(EnumTypeAction.View, 'Visualizar');
    map.set(EnumTypeAction.Disable, 'Desativar');
    return map.get(key);
  }

  private getCookieFunctionality(key: EnumTypeCookie): string {
    const map: Map<EnumTypeCookie, string> = new Map<EnumTypeCookie, string>();
    map.set(EnumTypeCookie.Menu, 'CookieMenu');
    map.set(EnumTypeCookie.Login, 'CookieLogin');
    map.set(EnumTypeCookie.Home, 'CookieHome');
    return map.get(key);
  }

  private getUserOperationSystem(): string {
    const agent: string = window.navigator.userAgent.toString();
    switch (true) {
      case agent.indexOf('Windows NT 10.0') != -1: return 'Windows 10';
      case agent.indexOf('Windows NT 6.3') != -1: return 'Windows 8.1';
      case agent.indexOf('Windows NT 6.2') != -1: return 'Windows 8';
      case agent.indexOf('Windows NT 6.1') != -1: return 'Windows 7';
      case agent.indexOf('Windows NT 6.0') != -1: return 'Windows Vista';
      case agent.indexOf('Windows NT 5.1') != -1: return 'Windows XP';
      case agent.indexOf('Windows NT 5.0') != -1: return 'Windows 2000';
      case agent.indexOf('Mac') != -1: return 'Mac/iOS';
      case agent.indexOf('X11') != -1: return 'UNIX';
      case agent.indexOf('Linux') != -1: return 'Linux';
      default: return 'Unknown';
    }
  }

  private getUserBrowser(): string {
    const agent: string = window.navigator.userAgent.toString();
    switch (true) {
      case agent.indexOf('edge') > -1: return 'edge';
      case agent.indexOf('edg') > -1: return 'chromium based edge (dev or canary)';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr: return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome: return 'chrome';
      case agent.indexOf('trident') > -1: return 'ie';
      case agent.indexOf('firefox') > -1: return 'firefox';
      case agent.indexOf('safari') > -1: return 'safari';
      default: return 'other';
    }
  }
}
function tap(arg0: (response: any) => void): any {
  throw new Error('Function not implemented.');
}

function take(arg0: number): any {
  throw new Error('Function not implemented.');
}

