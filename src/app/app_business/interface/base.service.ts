import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {

  constructor(protected http: HttpClient, protected actionUrl: string) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.actionUrl, { headers: this.getOptions() });
  }

  getAllFilter(filter?: T): Observable<any> {
    return this.http.post<any>(this.actionUrl, filter, { headers: this.getOptions() });
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

  getOptions(): HttpHeaders {
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
}
