import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentDetailComponent } from './incident-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IncidentsService } from '../incidents.service';
import { NavbarComponent } from '../../menu/navbar/navbar.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('IncidentDetailComponent', () => {
  let component: IncidentDetailComponent;
  let fixture: ComponentFixture<IncidentDetailComponent>;
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
        RouterModule.forRoot([]),
        ToastrModule.forRoot() // Add ToastrModule with default configuration
      ],
      declarations: [
        IncidentDetailComponent,
        NavbarComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        IncidentsService,
        ToastrService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog when button is clicked', () => {
    spyOn(component, 'openSolutionsDialog');

    component.openSolutionsDialog();

    expect(component.openSolutionsDialog).toHaveBeenCalled();
  });

});