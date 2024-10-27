import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { RequestLogin } from './request-login';
import { ResponseLogin } from './response-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = environment.baseUrl + '/auth';
  constructor(private http: HttpClient) { }

  verifyLogin(login: RequestLogin): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(this.apiUrl + '/login', login);
  }
}
