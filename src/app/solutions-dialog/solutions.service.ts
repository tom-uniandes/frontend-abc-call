import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth-guard/auth.service';

export interface CardContent {
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService

  ) {}

  createCommonHeader(): HttpHeaders {
    let token = localStorage.getItem("abcall-token");
    return new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('X-Abcall-Transaction', this.authService.generateTransactionKey())
    .set('X-Abcall-Origin-Request', 'web');
  }

  getCardContents(): Observable<CardContent[]> {
    let headers = this.createCommonHeader()
    return this.http.get<CardContent[]>(`${environment.baseUrl}/chatbot/getsolutions`, { headers }).pipe(
      catchError(() => {
        // Fallback data in case of error
        return of([
          { text: 'Respuesta sugerida 1.' },
          { text: 'Esta es la sugerencia de una respuesta' },
          { text: 'El inconveniente se puede resolver siguiendo los pasos de la guía' },
        ]);
      })
    );
  }
}
