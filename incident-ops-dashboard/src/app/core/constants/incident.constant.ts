import {
  IncidentSeverity,
  IncidentStatus,
} from '../models/incident.model';

export const INCIDENT_STATUSES: IncidentStatus[] = [
  'OPEN',
  'INVESTIGATING',
  'RESOLVED',
];

export const INCIDENT_SEVERITIES: IncidentSeverity[] =
  [
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL',
  ];

export const SERVICES = [
  'Payments',
  'Authentication',
  'Notifications',
  'Analytics',
];