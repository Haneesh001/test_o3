import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8085/userApi/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(users_email: string, users_password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      users_email,
      users_password
    }, httpOptions);
  }

  register(users_name: string, users_email: string, users_password: string): Observable<any> {
    return this.http.post(AUTH_API + 'createUserApi', {
      users_name,
      users_email,
      users_password
    }, httpOptions);
  }
}
