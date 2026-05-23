import { of, throwError } from 'rxjs';

import { IncidentsStore } from './incidents.store';
import { Incident } from '../../../core/models/incident.model';
import { INCIDENTS } from '../../../core/mock-data/incidents.mock';

describe('IncidentsStore', () => {
  let store: IncidentsStore;
  let api: { getIncidents: jasmine.Spy };
  let loader: { show: jasmine.Spy; hide: jasmine.Spy };

  beforeEach(() => {
    api = {
      getIncidents: jasmine.createSpy('getIncidents').and.returnValue(of(INCIDENTS)),
    };

    loader = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };

    store = new IncidentsStore(api as any, loader as any);
  });

  it('should load incidents and clear loading state', () => {
    store.loadIncidents('Failed to load');

    expect(api.getIncidents).toHaveBeenCalled();
    expect(loader.show).toHaveBeenCalled();
    expect(store.incidents()).toEqual(INCIDENTS);
    expect(store.loading()).toBeFalse();
    expect(store.error()).toBeNull();
    expect(loader.hide).toHaveBeenCalled();
  });

  it('should set an error message when load fails', () => {
    api.getIncidents.and.returnValue(throwError(() => new Error('network')));
    store.loadIncidents('Failed to load');

    expect(store.error()).toBe('Failed to load');
    expect(store.loading()).toBeFalse();
    expect(loader.hide).toHaveBeenCalled();
  });

  it('should update selected incident status and keep the list in sync', () => {
    const incident: Incident = {
      id: 'INC-42',
      title: 'Example Incident',
      description: 'Details',
      status: 'OPEN',
      severity: 'HIGH',
      service: 'Payments',
      createdAt: new Date().toISOString(),
    };

    store.setIncidents([incident]);
    store.selectIncident(incident);
    store.updateSelectedIncidentStatus('RESOLVED');

    expect(store.selectedIncident()?.status).toBe('RESOLVED');
    expect(store.incidents()[0].status).toBe('RESOLVED');
  });

  it('should filter incidents by search and selected values', () => {
    store.setIncidents(INCIDENTS);
    store.setSearch('database');
    store.setStatusFilter('OPEN');

    const result = store.filteredIncidents();
    expect(result.every((item) => item.status === 'OPEN')).toBeTrue();
    expect(result.every((item) => item.title.toLowerCase().includes('database') || item.id.toLowerCase().includes('database'))).toBeTrue();
  });
});
