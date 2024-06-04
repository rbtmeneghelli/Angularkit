import { EnumTypeAction } from 'src/app/app_entities/enum/EnumTypeAction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { arrDropDownList, arrString } from 'src/app/app_entities/shared/shared-types';

export abstract class BaseService<T> {

  constructor(
    protected readonly http: HttpClient, 
    protected actionUrl: string
  ) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.actionUrl, { headers: this.getOptions() });
  }

  getAllFilter(filter?: T): Observable<any> {
    return this.http.post<any>(`${this.actionUrl}/getall`, filter, { headers: this.getOptions() });
  }

  getById(id?: number): Observable<T> {
    return this.http.get<T>(`${this.actionUrl}/GetById/${id}`, { headers: this.getOptions() });
    // Example using function to convert special Characters in Base64 (Utilizar comando tap or map)
    //return this.http.get<ResponseResult<T>>(`${this.actionUrl}/${id}`, { headers: this.getOptions() })
    //.pipe(map(response => ConvertDataBase64ToString(response)));
  }

  create(model: T): Observable<T> {
    return this.http.post<T>(this.actionUrl, model, { headers: this.getOptions() });
    // Example using function to convert special Characters in Base64
    // return this.http.post<T>(this.actionUrl, ConvertDataStringToBase64(model), { headers: this.getOptions() });
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

  getList(url: string): Observable<arrDropDownList> {
    return this.http.get<arrDropDownList>(this.actionUrl + url, { headers: this.getOptions() });
  }

  getListToCookie(url: string): Observable<arrDropDownList> {
    return this.http.get<arrDropDownList>(this.actionUrl + url, { headers: this.getOptions() }).pipe(tap(response => console.log('retorno do backend: ', response)));
  }

  exportExcel(sheet?: string, data?: arrString, dataFilters?: arrString): Observable<any> {
    const objectJSON = { columns: data, filters: dataFilters };
    const columns = { columns: data };
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>(`${this.actionUrl}v1/sheet/${sheet}/download`, columns, { headers: this.getOptions(), responseType: 'blob' as 'json' });
  }

  protected getOptions(): HttpHeaders {
    let httpOptions: HttpHeaders = new HttpHeaders();
    httpOptions = httpOptions.set('Content-Type', 'application/json');
    httpOptions = httpOptions.set('Access-Control-Allow-Origin', '*');
    httpOptions = httpOptions.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // tslint:disable-next-line: max-line-length
    httpOptions = httpOptions.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    if (!!sessionStorage.getItem('usuarioLogado')) {
      httpOptions = httpOptions.set('Authorization', `Bearer ${'TOKEN'}`);
    }
    return httpOptions;
  }

  private getIpAddress(): Observable<string> {
    // Deixar a responsabilidade de pegar o IP pro backend, fazer isso dentro do codigo.
    return this.http.get('http://api.ipify.org/?format=json').pipe(map((res: any) => { return res.ip }), catchError((error: any) => { return 'Erro ao capturar seu IP' }));
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
}


