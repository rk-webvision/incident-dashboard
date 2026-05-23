// Demo: incident models are shared across components and services.
// Enterprise: use DTOs at the boundary and enums/constants for status values.

export type IncidentStatus =
  | 'OPEN'
  | 'INVESTIGATING'
  | 'RESOLVED';

export type IncidentSeverity =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';

export interface Incident {

  /*
  Using string IDs because most incident systems
  expose human-readable identifiers.

  Example:
  INC-101
  INC-2048
  */

  id:string;

  title:string;

  description:string;

  status:IncidentStatus;

  severity:IncidentSeverity;

  service:string;

  /*
  ISO strings keep mocked data simple and predictable.

  A real backend would typically own timestamp creation.
  */

  createdAt:string;
}