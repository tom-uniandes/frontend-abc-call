import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIncidentPublicComponent } from './search-incident-public.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IncidentsService } from '../incidents.service';
import { NavbarPublicComponent } from '../../menu/navbar-public/navbar-public.component';

describe('SearchIncidentPublicComponent', () => {
  let component: SearchIncidentPublicComponent;
  let fixture: ComponentFixture<SearchIncidentPublicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        RouterModule
      ],
      declarations: [
        SearchIncidentPublicComponent,
        NavbarPublicComponent
      ],
      providers: [
        IncidentsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIncidentPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
