// Demo: lightweight local store using Angular signals.
// Enterprise: move to RxJS/NgRx and expose a facade API.
import { Injectable, computed, signal } from '@angular/core';
import { take } from 'rxjs';

import { IncidentApiService } from '../../../core/services/incident-api.service';
import { LoaderService } from '../../../core/services/loader.service';
import { Incident, IncidentStatus } from '../../../core/models/incident.model';

@Injectable()
export class IncidentsStore {
  readonly incidents = signal<Incident[]>([]);
  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  readonly selectedIncident =
    signal<Incident | null>(null);

  readonly search = signal('');
  readonly statusFilter = signal('');
  readonly severityFilter = signal('');
  readonly serviceFilter = signal('');

  constructor(
    private readonly api: IncidentApiService,
    private readonly loader: LoaderService
  ) {}

  readonly filteredIncidents = computed(() => {
    const query =
      this.search().toLowerCase();

    return this.incidents().filter(
      (incident) => {
        const matchesSearch =
          incident.title
            .toLowerCase()
            .includes(query) ||
          incident.id
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          !this.statusFilter() ||
          incident.status ===
            this.statusFilter();

        const matchesSeverity =
          !this.severityFilter() ||
          incident.severity ===
            this.severityFilter();

        const matchesService =
          !this.serviceFilter() ||
          incident.service ===
            this.serviceFilter();

        return (
          matchesSearch &&
          matchesStatus &&
          matchesSeverity &&
          matchesService
        );
      }
    );
  });

  readonly openCount = computed(
    () =>
      this.incidents().filter(
        (i) => i.status === 'OPEN'
      ).length
  );

  readonly criticalCount = computed(
    () =>
      this.incidents().filter(
        (i) => i.severity === 'CRITICAL'
      ).length
  );

  readonly serviceCount = computed(
    () =>
      new Set(
        this.incidents().map(
          (i) => i.service
        )
      ).size
  );

  readonly mttr = computed(
    () => '42m'
  );

  // Small helper APIs to mutate state from components.
  // Keep these thin; move logic to a service/store if behavior grows.
  loadIncidents(errorMessage: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.loader.show();

    this.api.getIncidents()
      .pipe(take(1))
      .subscribe({
        next: (incidents) => {
          this.incidents.set(incidents);
          this.loading.set(false);
          this.loader.hide();
        },
        error: () => {
          this.error.set(errorMessage);
          this.loading.set(false);
          this.loader.hide();
        },
      });
  }

  setIncidents(incidents: Incident[]): void {
    this.incidents.set(incidents);
  }

  setError(message: string | null): void {
    this.error.set(message);
  }

  updateIncident(updated: Incident): void {
    this.incidents.update((items) =>
      items.map((i) => (i.id === updated.id ? updated : i))
    );
  }

  selectIncident(incident: Incident): void {
    this.selectedIncident.set(incident);
  }

  deselectIncident(): void {
    this.selectedIncident.set(null);
  }

  updateSelectedIncidentStatus(status: IncidentStatus): void {
    const selected = this.selectedIncident();
    if (!selected) {
      return;
    }

    const updated = { ...selected, status };
    this.selectedIncident.set(updated);
    this.updateIncident(updated);
  }

  setSearch(value: string): void {
    this.search.set(value);
  }

  setStatusFilter(value: string): void {
    this.statusFilter.set(value);
  }

  setSeverityFilter(value: string): void {
    this.severityFilter.set(value);
  }

  setServiceFilter(value: string): void {
    this.serviceFilter.set(value);
  }
}