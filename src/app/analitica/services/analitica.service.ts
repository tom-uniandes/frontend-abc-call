import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterIncidente, ResultadoIncidente} from "../model";
import { environment } from '../../../environments/environment';

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
    return this.http.get<ResultadoIncidente>(`${this.apiUrl}/get_incidents/${company}`, { params: parametros, headers: headers})
  }
}
