import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlanComponent } from './manage-plan.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ClientsService } from '../clients.service';
import { NavbarComponent } from '../../menu/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';

describe('ManagePlanComponent', () => {
  let component: ManagePlanComponent;
  let fixture: ComponentFixture<ManagePlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        MatCardModule
      ],
      declarations: [
        ManagePlanComponent,
        NavbarComponent
      ],
      providers: [
        ClientsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
