import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseIncidentComponent } from './response-incident.component';
import { IncidentsService } from '../incidents.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

// Mock Services
class MockIncidentsService {
  getIncident = jasmine.createSpy('getIncident').and.returnValue(of({ solved: false, id: '1' }));
  update_incident_response = jasmine.createSpy('update_incident_response').and.returnValue(of({}));
}

class MockToastrService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}

class MockActivatedRoute {
  snapshot = { paramMap: new Map([['id', '1']]) };
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ResponseIncidentComponent', () => {
  let component: ResponseIncidentComponent;
  let fixture: ComponentFixture<ResponseIncidentComponent>;
  let incidentsService: IncidentsService;
  let toastrService: ToastrService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseIncidentComponent],
      providers: [
        FormBuilder,
        { provide: IncidentsService, useClass: MockIncidentsService },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseIncidentComponent);
    component = fixture.componentInstance;
    incidentsService = TestBed.inject(IncidentsService);
    toastrService = TestBed.inject(ToastrService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.responseForm).toBeDefined();
    expect(component.responseForm.controls['response']).toBeDefined();
    expect(component.responseForm.controls['company'].value).toBeTruthy();
    expect(component.responseForm.controls['incidentId'].value).toBe('1');
  });

  it('should load incident details on ngOnInit', () => {
    component.ngOnInit();
    expect(incidentsService.getIncident).toHaveBeenCalledWith('1', ''); // empty company from session
    expect(component.incident).toEqual({ solved: false, id: '1' });
  });

  it('should show error if the incident is solved', () => {
    component.ngOnInit();
    expect(incidentsService.getIncident).toHaveBeenCalledWith('1', '1');
    expect(component.incident).toEqual({ solved: true, id: '1' });
    expect(toastrService.error).toHaveBeenCalledWith('El incidente ya se encuentra resuelto');
    expect(router.navigate).toHaveBeenCalledWith(['/incidents/incident-detail', '1']);
  });

  it('should submit form and call incidentsService.update_incident_response', () => {
    component.responseForm.controls['response'].setValue('Response to the incident');
    component.responseIncident();
    expect(incidentsService.update_incident_response).toHaveBeenCalledWith({
      response: 'Response to the incident',
      company: null, // As returned by sessionStorage
      incidentId: '1'
    });
    expect(toastrService.success).toHaveBeenCalledWith('Respuesta del incidente registrado con éxito');
  });

  it('should handle error when updating incident response', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Test error' },
      status: 400,
      statusText: 'Bad Request'
    });
    incidentsService.update_incident_response(throwError(errorResponse));

    component.responseIncident();
    expect(toastrService.error).toHaveBeenCalledWith('Test error');
  });

  it('should navigate to incident detail page after success', () => {
    component.incident = { id: '1' };
    component.returnViewDetalleIncident();
    expect(router.navigate).toHaveBeenCalledWith(['/incidents/incident-detail', '1']);
  });
});
