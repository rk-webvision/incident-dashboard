import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { IncidentsStore } from '../state/incidents.store';
import { IncidentApiService } from '../../../core/services/incident-api.service';
import { LoaderService } from '../../../core/services/loader.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: IncidentsStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [IncidentApiService, LoaderService],
    }).compileComponents();

    store = TestBed.inject(IncidentsStore);
    spyOn(store, 'loadIncidents');

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load incidents on init', () => {
    expect(store.loadIncidents).toHaveBeenCalledWith(component.copy.loadingError);
  });

  it('should open and close incident selection through the store', () => {
    const incident = { id: 'INC-1', title: 'Test', description: '', status: 'OPEN', severity: 'LOW', service: 'Auth', createdAt: new Date().toISOString() } as any;

    spyOn(store, 'selectIncident');
    spyOn(store, 'deselectIncident');

    component.openIncident(incident);
    expect(store.selectIncident).toHaveBeenCalledWith(incident);

    component.closeModal();
    expect(store.deselectIncident).toHaveBeenCalled();
  });
});
