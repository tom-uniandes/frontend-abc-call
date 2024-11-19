import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { ResponseAuthorization } from './response-authorization';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createCommonHeader(): HttpHeaders {
    let token = localStorage.getItem("abcall-token");
    return new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('X-Abcall-Transaction', this.generateTransactionKey())
    .set('X-Abcall-Origin-Request', 'web');
  }

  verifyAuthorization(): Observable<ResponseAuthorization> {
    let headers = this.createCommonHeader()
    return this.http.get<ResponseAuthorization>(`${environment.baseUrl}/auth/verify-authorization?uri=/auth/verify-authorization`, { headers });
  }

  generateTransactionKey(): string {
    let hash = CryptoJS.SHA3(environment.publicKey, { outputLength: 256 });
    return hash.toString(CryptoJS.enc.Base64);
  }
}
