import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {FilterIncidente, ResultadoIncidente} from "../model";
import { environment } from '../../../environments/environment';
import {catchError} from "rxjs/operators";
import { AuthService } from '../../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {

  private apiUrl: string = environment.baseUrl + '/analitica';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  createCommonHeader(): HttpHeaders {
    let token = localStorage.getItem("abcall-token");
    return new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('X-Abcall-Transaction', this.authService.generateTransactionKey())
    .set('X-Abcall-Origin-Request', 'web');
  }

  getIncidents(company: string|null, filters: FilterIncidente|undefined): Observable<ResultadoIncidente> {
    let parametros = {}
    if (filters) {
      parametros = filters
    }
    let headers = this.createCommonHeader()
    return this.http.get<ResultadoIncidente>(`${this.apiUrl}/get_incidents/${company}`, { params: parametros, headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage;
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
