import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterIncidente, ResultadoIncidente} from "../model";

let headers = new HttpHeaders({ 'Content-Type': 'application/json' })

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {

  constructor(private http: HttpClient) { }

  getIncidents(company: string|null, filters: FilterIncidente|undefined): Observable<ResultadoIncidente> {
    let parametros = {}
    if (filters) {
      parametros = filters
    }
    return this.http.get<ResultadoIncidente>(`http://analitica-microservice:5005/analitica/get_incidents/${company}`, { params: parametros, headers: headers})
  }
}
