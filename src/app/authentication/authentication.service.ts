import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { RequestLogin } from './request-login';
import { ResponseLogin } from './response-login';
import { AuthService } from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = environment.baseUrl + '/auth';
  constructor(private http: HttpClient,
    private authService: AuthService,
  ) { }

  verifyLogin(login: RequestLogin): Observable<ResponseLogin> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('X-Abcall-Transaction', this.authService.generateTransactionKey());
    return this.http.post<ResponseLogin>(this.apiUrl + '/login', login, { headers });
  }
}
