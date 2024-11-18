import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RequestLogin } from '../request-login';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
  ) { this.loginForm = this.formBuilder.group({}) }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: ["", [Validators.required, Validators.maxLength(20)]],
    });
  }

  verifyLogin(login: RequestLogin): void {
    if (this.loginForm.invalid) {
      const invalidFields = Array.from(document.getElementsByClassName('ng-invalid')) as HTMLElement[];
      if (invalidFields.length > 1) {
        invalidFields[1].focus();
      } else if (invalidFields.length > 0) {
        invalidFields[0].focus();
      }
      this.toastr.error('Completa el formulario de inicio de sesión correctamente');
      return;
    }

    let password = login.password.trim()
    let hash = CryptoJS.SHA3(password, { outputLength: 256 });
    login.password = hash.toString(CryptoJS.enc.Hex);
    login.email.trim()

    this.authenticationService.verifyLogin(login)
      .subscribe((response) => {
        localStorage.setItem("abcall-token", response.token);
        sessionStorage.setItem("abcall-company", response.company);
        sessionStorage.setItem("abcall-rol", response.rol);
        sessionStorage.setItem("abcall-plan", response.plan);
        this.toastr.success('Bienvenido');
        if(response.rol == "CLIENTE") {
          this.router.navigateByUrl('/clients/manage-plan');
        }

        if(response.rol == "AGENTE") {
          this.router.navigateByUrl('/incidents/create-incident');
        }
    },
    error => {
      login.password = password
      console.error('Error al iniciar sesión:', error);
      const errorMessage = error.error?.message || 'Ocurrió un error al iniciar sesión';
      this.toastr.error(errorMessage);
    });
  }
}
