import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailPublicComponent } from './incident-detail-public.component';

describe('IncidentDetailPublicComponent', () => {
  let component: IncidentDetailPublicComponent;
  let fixture: ComponentFixture<IncidentDetailPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentDetailPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentDetailPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
