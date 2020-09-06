import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  private readonly CRUD_BASE = 'users';
  constructor(private http: HttpClient) { }


  public getUsers() {
    return this.http.get(this.CRUD_BASE);
  }
}
