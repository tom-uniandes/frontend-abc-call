import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseIncidentComponent } from './response-incident.component';

describe('ResponseIncidentComponent', () => {
  let component: ResponseIncidentComponent;
  let fixture: ComponentFixture<ResponseIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
