// Demo: mock transport returning fixtures via RxJS observable.
// Enterprise: replace with HttpClient and centralized retry/error handling.
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { INCIDENTS } from '../mock-data/incidents.mock';
import { Incident } from '../models/incident.model';

@Injectable({
  providedIn: 'root',
})
export class IncidentApiService {
  // Mock transport for development. Swap with HttpClient in real apps.

  getIncidents(): Observable<Incident[]> {
    return of(INCIDENTS).pipe(delay(800));
  }
}