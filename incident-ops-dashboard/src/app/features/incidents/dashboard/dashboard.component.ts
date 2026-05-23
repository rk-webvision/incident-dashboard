// Demo: dashboard uses signals and a local store for incidents.
// Enterprise: centralize loading and data flow with RxJS/NgRx and effects.
import {
  Component,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Incident,
  IncidentStatus,
} from '../../../core/models/incident.model';

import {
  DASHBOARD_COPY,
} from '../../../core/constants/ui.constants';

import { AppLoaderComponent } from '../../../shared/components/app-loader/app-loader.component';

import { FiltersComponent } from '../filters/filters.component';
import { IncidentDetailsComponent } from '../incident-details/incident-details.component';
import { IncidentListComponent } from '../incident-list/incident-list.component';
import { IncidentsStore } from '../state/incidents.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    FiltersComponent,
    IncidentListComponent,
    IncidentDetailsComponent,
    AppLoaderComponent,
  ],

  providers: [IncidentsStore],

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent
  implements OnInit {

  readonly store = inject(IncidentsStore);

  readonly copy = DASHBOARD_COPY;

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.store.loadIncidents(this.copy.loadingError);
  }

  openIncident(incident: Incident): void {
    this.store.selectIncident(incident);
  }

  closeModal(): void {
    this.store.deselectIncident();
  }

  updateStatus(status: IncidentStatus): void {
    this.store.updateSelectedIncidentStatus(status);
  }

  @HostListener(
    'document:keydown.escape'
  )
  handleEscape(): void {

    this.closeModal();

  }
}