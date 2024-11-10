import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIncidentComponent } from './search-incident.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IncidentsService } from '../incidents.service';
import { NavbarComponent } from '../../menu/navbar/navbar.component';

describe('SearchIncidentComponent', () => {
  let component: SearchIncidentComponent;
  let fixture: ComponentFixture<SearchIncidentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        RouterModule
      ],
      declarations: [
        SearchIncidentComponent,
        NavbarComponent
      ],
      providers: [
        IncidentsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
