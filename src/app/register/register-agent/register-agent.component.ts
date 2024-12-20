import { Component, OnInit } from '@angular/core';
import { UserAgent } from '../user-agent';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';


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
      name: ["", [Validators.required, Validators.maxLength(100)]],
      idType: ["", [Validators.required]],
      idNumber: ["", [Validators.required, Validators.maxLength(30)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(100)]],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^[0-9.]+$/), Validators.minLength(4), Validators.maxLength(15)]],
      password: ["", [Validators.required, Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/)]],
    });
  }

  createUserAgent(userAgent: UserAgent): void {

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

    let password = userAgent.password.trim()
    let hash = CryptoJS.SHA3(password, { outputLength: 256 });
    userAgent.password = hash.toString(CryptoJS.enc.Hex);

    userAgent.rol = "AGENTE"
    userAgent.company = sessionStorage.getItem("abcall-company") || ""
    userAgent.plan = sessionStorage.getItem("abcall-plan") || ""

    this.registerService.createUserAgent(userAgent)
      .subscribe(() => {
        this.toastr.success('Nuevo agente registrado correctamente');
        this.userAgentForm.reset()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    error => {
      userAgent.password = password
      console.error('Error al registrar el agente:', error);
      const errorMessage = error.error?.message || 'Ocurrió un error al registrar el nuevo agente';
      this.toastr.error(errorMessage);
    });
  }

}
