import {
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  INCIDENT_SEVERITIES,
  INCIDENT_STATUSES,
  SERVICES,
} from '../../../core/constants/incident.constant';

@Component({
  selector: 'app-filters',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],

  templateUrl:
    './filters.component.html',

  styleUrls: [
    './filters.component.scss',
  ],
})
export class FiltersComponent {
  private readonly fb =
    inject(FormBuilder);

  readonly statuses =
    INCIDENT_STATUSES;

  readonly severities =
    INCIDENT_SEVERITIES;

  readonly services =
    SERVICES;

  @Output()
  searchChanged =
    new EventEmitter<string>();

  @Output()
  statusChanged =
    new EventEmitter<string>();

  @Output()
  severityChanged =
    new EventEmitter<string>();

  @Output()
  serviceChanged =
    new EventEmitter<string>();

  readonly form =
    this.fb.group({
      search: [''],
      status: [''],
      severity: [''],
      service: [''],
    });

  constructor() {
    this.form.controls.search.valueChanges.subscribe(
      (value) => {
        this.searchChanged.emit(
          value ?? ''
        );
      }
    );

    this.form.controls.status.valueChanges.subscribe(
      (value) => {
        this.statusChanged.emit(
          value ?? ''
        );
      }
    );

    this.form.controls.severity.valueChanges.subscribe(
      (value) => {
        this.severityChanged.emit(
          value ?? ''
        );
      }
    );

    this.form.controls.service.valueChanges.subscribe(
      (value) => {
        this.serviceChanged.emit(
          value ?? ''
        );
      }
    );
  }
}