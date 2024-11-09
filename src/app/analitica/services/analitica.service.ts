import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {FilterIncidente, ResultadoIncidente} from "../model";
import { environment } from '../../../environments/environment';
import {catchError} from "rxjs/operators";

let headers = new HttpHeaders({ 'Content-Type': 'application/json' })

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {

  private apiUrl: string = environment.baseUrl + '/analitica';

  constructor(private http: HttpClient) { }

  getIncidents(company: string|null, filters: FilterIncidente|undefined): Observable<ResultadoIncidente> {
    let parametros = {}
    if (filters) {
      parametros = filters
    }
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
