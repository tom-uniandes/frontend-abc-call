import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from './incident';
import { User } from './user'; // Assuming you have a `User` model defined
import { environment } from '../../environments/environment';
import { IncidentPublic } from './incidents-public';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  private apiUrl: string = environment.baseUrl + '/incidents';

  constructor(private http: HttpClient) { }

  /**
   * Creates a new incident.
   * @param incident The incident to be created.
   * @returns An observable containing the created incident.
   */
  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(`${this.apiUrl}/create_incident`, incident);
  }

  /**
   * Gets an incident by ID.
   * @param id The ID of the incident.
   * @returns An observable containing the incident details.
   */
  getIncident(id: string, company: string): Observable<Incident> {
    return this.http.get<Incident>(`${this.apiUrl}/get_incident/${id}/${company}`);
  }

  /**
   * Get an incident by ID without login.
   * @param id The ID of the incident.
   * @returns An observable containing the incident details.
   */
  getIncidentPublic(id: string): Observable<IncidentPublic> {
    return this.http.get<IncidentPublic>(`${this.apiUrl}/public/get_incident/${id}`);
  }

  /**
   * Gets a user by ID.
   * @param userId The ID of the user.
   * @returns An observable containing the user details.
   */
  getUser(userId: string, company: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get_user/${userId}/${company}`);
  }

  /**
   * Creates a new user.
   * @param user The user to be created.
   * @returns An observable containing the created user.
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create_user`, user);
  }

  /**
   * Gets all incidents for a company.
   * @param company The name of the company.
   * @returns An observable containing the list of incidents.
   */
  getIncidents(company: string): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/get_incidents/${company}`);
  }

   /**
   * Creates a new incident.
   * @param incident The incident to be created.
   * @returns An observable containing the created incident.
   */
   update_incident_response(incident: any): Observable<Incident> {
    return this.http.put<Incident>(`${this.apiUrl}/update_incident_response`, incident);
  }

  searchIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(`${this.apiUrl}/search_incident`, incident);
  }

  searchIncidentPublic(incident: IncidentPublic): Observable<IncidentPublic> {
    return this.http.post<IncidentPublic>(`${this.apiUrl}/public/search_incident`, incident);
  }
}
