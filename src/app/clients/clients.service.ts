import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl: string = `${environment.baseUrl}/clients`;

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

  updateClientPlan(company: string, plan: string): Observable<any> {
    const url = `${this.apiUrl}/update_client_plan`;
    const body = { company, plan };
    let headers = this.createCommonHeader();
    headers.set('Content-Type', 'application/json')

    return this.http.put(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
