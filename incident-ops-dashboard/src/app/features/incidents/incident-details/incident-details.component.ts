// Demo: presentational incident details component emitting events.
// Enterprise: keep it dumb and move update logic into a container/store.
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Incident,
  IncidentStatus,
} from '../../../core/models/incident.model';

import {
  INCIDENT_STATUSES,
} from '../../../core/constants/incident.constant';

@Component({
  selector: 'app-incident-details',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './incident-details.component.html',

  styleUrls: ['./incident-details.component.scss'],
})
export class IncidentDetailsComponent {
  private _incident!: Incident;

  @Input({ required: true })
  set incident(value: Incident) {
    this._incident = value;
    this.selectedStatus = value.status;
  }

  get incident(): Incident {
    return this._incident;
  }

  readonly statuses = INCIDENT_STATUSES;

  selectedStatus!: IncidentStatus;

  @Output() statusChanged = new EventEmitter<IncidentStatus>();

  @Output() closeRequested = new EventEmitter<void>();

  saveChanges(): void {
    this.statusChanged.emit(this.selectedStatus);
    this.closeRequested.emit();
  }
}