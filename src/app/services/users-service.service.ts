import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/definitions/user';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  private readonly CRUD_BASE = 'users';
  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> {
    // mocking a user logged with id 1
    return this.http.get<User>(`${this.CRUD_BASE}/1`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.CRUD_BASE);
  }
  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.CRUD_BASE}/${id}`);
  }
}
