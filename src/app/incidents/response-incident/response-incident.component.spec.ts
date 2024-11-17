import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseIncidentComponent } from './response-incident.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../incidents.service';
import { NavbarComponent } from '../../menu/navbar/navbar.component';

describe('ResponseIncidentComponent', () => {
  let component: ResponseIncidentComponent;
  let fixture: ComponentFixture<ResponseIncidentComponent>;
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
        ToastrModule.forRoot(),
        RouterModule.forRoot([])
      ],
      declarations: [
        ResponseIncidentComponent, 
        NavbarComponent
      ],
      providers: [
        IncidentsService,
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});