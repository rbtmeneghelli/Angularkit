import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { BaseService } from '../interface/base.service';
import { Agenda } from 'src/app/app_entities/model/agenda.model';

@Injectable()
export class ExampleAngularV17 extends BaseService<Agenda> {

    private cache: Agenda[] = [];
    //Link de referência >> https://github.com/loiane/crud-angular-spring/blob/main/crud-angular/src/app/courses/services/courses.service.ts
    
    constructor(http: HttpClient) {
        super(http, `${environment.API}agenda`);
    }

    list(filter?: any) {
        return this.http.post<any>(`${`${environment.API}agenda`}/GetAllFilter`, filter, { headers: this.getOptions() }).pipe(
            first(),
            tap(response => (this.cache = response?.data as Agenda[]))
        );
    }

    loadById(id: number) {
        if (this.cache.length > 0) {
            const record = this.cache.find(course => `${course.id}` === `${id}`);
            return record != null ? of(record) : this.getById(id);
        }
        return this.getById(id);
    }

    save(record: Partial<Agenda>) {
        if (record.id) {
            return this.update(record.id, record);
        } else {
            return this.create(record);
        }
    }
}