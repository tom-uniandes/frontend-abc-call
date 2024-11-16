import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { UserClient } from './user-client';
import { UserAgent } from './user-agent';
import { AuthService } from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl: string = environment.baseUrl + '/auth';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createCommonHeader(): HttpHeaders {
    let token = localStorage.getItem("abcall-token");
    return new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('X-Abcall-Transaction', this.authService.generateTransactionKey());
  }

  createCommonPublicHeader(): HttpHeaders {
    return new HttpHeaders()
    .set('X-Abcall-Transaction', this.authService.generateTransactionKey());
  }

  createUserClient(userClient: UserClient): Observable<UserClient> {
    let headers = this.createCommonPublicHeader()
    headers.set('Content-Type', 'application/json')
    return this.http.post<UserClient>(this.apiUrl + '/register', userClient, { headers });
  }

  createUserAgent(userAgent: UserAgent): Observable<UserAgent> {
    let headers = this.createCommonHeader()
    headers.set('Content-Type', 'application/json')
    return this.http.post<UserAgent>(this.apiUrl + '/register', userAgent, { headers });
  }

}
