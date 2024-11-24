import { Component, OnInit} from '@angular/core';
import { UserClient } from '../user-client';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})

export class RegisterClientComponent implements OnInit {

  userClientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService,
  ) { this.userClientForm = this.formBuilder.group({}) }

  ngOnInit() {
    this.userClientForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      idType: ["", [Validators.required]],
      idNumber: ["", [Validators.required, Validators.maxLength(30)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(150)]],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^[0-9.]+$/), Validators.minLength(4), Validators.maxLength(15)]],
      company: ["", [Validators.required, Validators.maxLength(60)]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/)]],
    });
  }

  createUserClient(userClient: UserClient): void {
    if (this.userClientForm.invalid) {
      const invalidFields = Array.from(document.getElementsByClassName('ng-invalid')) as HTMLElement[];
      if (invalidFields.length > 1) {
        invalidFields[1].focus();
      } else if (invalidFields.length > 0) {
        invalidFields[0].focus();
      }
      this.toastr.error('Completa el formulario de registro correctamente');
      return;
    }

    let password = userClient.password.trim()
    let hash = CryptoJS.SHA3(password, { outputLength: 256 });
    userClient.password = hash.toString(CryptoJS.enc.Hex);

    userClient.rol = "CLIENTE"
    userClient.plan = "EMPRENDEDOR"

    this.registerService.createUserClient(userClient)
      .subscribe(() => {
        this.toastr.success('Registro exitoso');
        this.router.navigateByUrl('/login');
    },
    error => {
      userClient.password = password
      console.error('Error al crear el usuario:', error);
      const errorMessage = error.error?.message || 'Ocurrió un error al crear el usuario';
      this.toastr.error(errorMessage);
    });
  }

}
