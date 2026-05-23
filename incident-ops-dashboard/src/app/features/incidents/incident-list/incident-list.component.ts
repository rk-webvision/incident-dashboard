// Demo: presentational list component emitting selection events.
// Enterprise: use virtual scroll or a container/facade for complex behavior.
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Incident } from '../../../core/models/incident.model';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss',
})
export class IncidentListComponent {
  // Presentational: inputs in, events out.

  @Input({ required: true })
  incidents!: Incident[];

  @Output()
  selectIncident = new EventEmitter<Incident>();

  trackById(
    index: number,
    incident: Incident
  ): string {
    return incident.id;
  }
}