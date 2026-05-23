import { Incident } from '../models/incident.model';

/*
 * Static fixtures live outside services intentionally.
 *
 * Keeps transport concerns separate from test data.
 */

export const INCIDENTS: Incident[] = [
  {
    id: 'INC-101',
    title: 'Payment gateway timeout',
    description: 'Checkout requests are showing elevated latency.',
    status: 'OPEN',
    severity: 'HIGH',
    service: 'Payments',
    createdAt: '2026-05-23T08:30:00Z',
  },
  {
    id: 'INC-102',
    title: 'Authentication failures',
    description: 'Users intermittently unable to log in.',
    status: 'INVESTIGATING',
    severity: 'CRITICAL',
    service: 'Authentication',
    createdAt: '2026-05-22T14:00:00Z',
  },
  {
    id: 'INC-103',
    title: 'Notification delivery delay',
    description: 'Email processing slower than expected.',
    status: 'RESOLVED',
    severity: 'MEDIUM',
    service: 'Notifications',
    createdAt: '2026-05-21T10:00:00Z',
  },
  {
    id: 'INC-104',
    title: 'Reporting API degradation',
    description: 'Analytics endpoints responding slowly.',
    status: 'OPEN',
    severity: 'LOW',
    service: 'Analytics',
    createdAt: '2026-05-20T09:00:00Z',
  },
];