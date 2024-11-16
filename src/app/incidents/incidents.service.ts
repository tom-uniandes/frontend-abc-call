import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from './incident';
import { User } from './user'; // Assuming you have a `User` model defined
import { environment } from '../../environments/environment';
import { IncidentPublic } from './incidents-public';
import { AuthService } from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  private apiUrl: string = environment.baseUrl + '/incidents';

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

  /**
   * Creates a new incident.
   * @param incident The incident to be created.
   * @returns An observable containing the created incident.
   */
  createIncident(incident: Incident): Observable<Incident> {
    let headers = this.createCommonHeader()
    headers.set('Content-Type', 'application/json')
    return this.http.post<Incident>(`${this.apiUrl}/create_incident`, incident, { headers });
  }

  /**
   * Gets an incident by ID.
   * @param id The ID of the incident.
   * @returns An observable containing the incident details.
   */
  getIncident(id: string, company: string): Observable<Incident> {
    let headers = this.createCommonHeader()
    return this.http.get<Incident>(`${this.apiUrl}/get_incident/${id}/${company}`, { headers });
  }

  /**
   * Get an incident by ID without login.
   * @param id The ID of the incident.
   * @returns An observable containing the incident details.
   */
  getIncidentPublic(id: string): Observable<IncidentPublic> {
    let headers = this.createCommonPublicHeader()
    return this.http.get<IncidentPublic>(`${this.apiUrl}/public/get_incident/${id}`, { headers });
  }

  /**
   * Gets a user by ID.
   * @param userId The ID of the user.
   * @returns An observable containing the user details.
   */
  getUser(userId: string, company: string): Observable<User> {
    let headers = this.createCommonHeader()
    return this.http.get<User>(`${this.apiUrl}/get_user/${userId}/${company}`, { headers });
  }

  /**
   * Creates a new user.
   * @param user The user to be created.
   * @returns An observable containing the created user.
   */
  createUser(user: User): Observable<User> {
    let headers = this.createCommonHeader();
    headers.set('Content-Type', 'application/json')
    return this.http.post<User>(`${this.apiUrl}/create_user`, user, { headers });
  }

  /**
   * Gets all incidents for a company.
   * @param company The name of the company.
   * @returns An observable containing the list of incidents.
   */
  getIncidents(company: string): Observable<Incident[]> {
    let headers = this.createCommonHeader()
    return this.http.get<Incident[]>(`${this.apiUrl}/get_incidents/${company}`, { headers });
  }

   /**
   * Creates a new incident.
   * @param incident The incident to be created.
   * @returns An observable containing the created incident.
   */
   update_incident_response(incident: any): Observable<Incident> {
    let headers = this.createCommonHeader()
    headers.set('Content-Type', 'application/json')
    return this.http.put<Incident>(`${this.apiUrl}/update_incident_response`, incident, { headers });
  }

  searchIncident(incident: Incident): Observable<Incident> {
    let headers = this.createCommonHeader()
    headers.set('Content-Type', 'application/json')
    return this.http.post<Incident>(`${this.apiUrl}/search_incident`, incident, { headers });
  }

  searchIncidentPublic(incident: IncidentPublic): Observable<IncidentPublic> {
    let headers = this.createCommonPublicHeader()
    headers.set('Content-Type', 'application/json')
    return this.http.post<IncidentPublic>(`${this.apiUrl}/public/search_incident`, incident, { headers });
  }
}
