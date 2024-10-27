import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { UserClient } from './user-client';
import { UserAgent } from './user-agent';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl: string = environment.baseUrl + '/auth';
  constructor(private http: HttpClient) { }

  createUserClient(userClient: UserClient): Observable<UserClient> {
    return this.http.post<UserClient>(this.apiUrl + '/register', userClient);
  }

  createUserAgent(userAgent: UserAgent): Observable<UserAgent> {
    return this.http.post<UserAgent>(this.apiUrl + '/register', userAgent);
  }

}
