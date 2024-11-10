import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAgentComponent } from './register-agent.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterService } from '../register.service';
import { NavbarComponent } from '../../menu/navbar/navbar.component';

describe('RegisterAgentComponent', () => {
  let component: RegisterAgentComponent;
  let fixture: ComponentFixture<RegisterAgentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        RouterModule
      ],
      declarations: [
        RegisterAgentComponent,
        NavbarComponent
      ],
      providers: [
        RegisterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
