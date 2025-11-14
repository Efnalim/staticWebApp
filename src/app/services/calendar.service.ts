import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class IcalService {
  private eventsUrl = `${environment.apiUrl}/events`;
  private birthdaysUrl = `${environment.apiUrl}/birthdays`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventsUrl);
  }

  getBirthdays(): Observable<any[]> {
    return this.http.get<any[]>(this.birthdaysUrl);
  }
}
