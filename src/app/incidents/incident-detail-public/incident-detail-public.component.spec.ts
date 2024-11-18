import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailPublicComponent } from './incident-detail-public.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarPublicComponent } from '../../menu/navbar-public/navbar-public.component';
import { IncidentsService } from '../incidents.service';

describe('IncidentDetailPublicComponent', () => {
  let component: IncidentDetailPublicComponent;
  let fixture: ComponentFixture<IncidentDetailPublicComponent>;
  let activatedRouteMock: any;

  beforeEach(waitForAsync(() => {
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (key: string) => key === 'id' ? 'some-id' : null,
        }
      }
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule
      ],
      declarations: [
        IncidentDetailPublicComponent,
        NavbarPublicComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        IncidentsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentDetailPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
