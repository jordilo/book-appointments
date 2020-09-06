import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeetingsExtended, MeetingSort } from './meetings';
import { ORDER } from './api-helpers';

@Injectable({
  providedIn: 'root'
})
export class MeetingsServiceService {

  private readonly CRUD_BASE = 'meetings';
  constructor(private http: HttpClient) { }


  public getMeetings(field: MeetingSort = 'start', order: ORDER = 'asc'): Observable<MeetingsExtended[]> {
    return this.http.get<MeetingsExtended[]>(`${this.CRUD_BASE}/?_expand=user&_sort=${field}&_order=${order}`);
  }
}
