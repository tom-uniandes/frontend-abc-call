import { Component, OnInit } from '@angular/core';
import { UserAgent } from '../user-agent';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-agent',
  templateUrl: './register-agent.component.html',
  styleUrl: './register-agent.component.css'
})
export class RegisterAgentComponent implements OnInit {

  userAgentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService,
  ) { this.userAgentForm = this.formBuilder.group({}) }

  ngOnInit() {
    this.userAgentForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(150)]],
      idType: ["", [Validators.required]],
      idNumber: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(150)]],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^[0-9.]+$/), Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  createUserAgent(userAgent: UserAgent): void {

    console.log(userAgent)
    if (this.userAgentForm.invalid) {
      const invalidFields = Array.from(document.getElementsByClassName('ng-invalid')) as HTMLElement[];
      if (invalidFields.length > 1) {
        invalidFields[1].focus();
      } else if (invalidFields.length > 0) {
        invalidFields[0].focus();
      }
      this.toastr.error('Completa el formulario correctamente');
      return;
    }

    this.registerService.createUserAgent(userAgent)
      .subscribe(() => {
        this.toastr.success('Nuevo agente registrado correctamente');
        console.log('User agent created');
    },
    error => {
      console.error('Error al registrar el agente:', error);
      const errorMessage = error.error?.message || 'Ocurrió un error al registrar el nuevo agente';
      this.toastr.error(errorMessage);
    });
  }

}
