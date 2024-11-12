import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { ResponseAuthorization } from './response-authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  verifyAuthorization(): Observable<ResponseAuthorization> {
    const token = localStorage.getItem("abcall-token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ResponseAuthorization>(`${environment.baseUrl}/auth/verify-authorization`, { headers });
  }
}
