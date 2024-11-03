import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface CardContent {
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {

  constructor(private http: HttpClient) {}

  getCardContents(): Observable<CardContent[]> {
    return this.http.get<CardContent[]>(`${environment.baseUrl}/getsolutions`).pipe(
      catchError(() => {
        // Fallback data in case of error
        return of([
          { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
          { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
          { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        ]);
      })
    );
  }
}
