import { Component, OnInit} from '@angular/core';
import { UserClient } from '../user-client';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';


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
      name: ["", [Validators.required, Validators.maxLength(150)]],
      idType: ["", [Validators.required]],
      idNumber: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(150)]],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^[0-9.]+$/), Validators.maxLength(50)]],
      company: ["", [Validators.required, Validators.maxLength(60)]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  createUserClient(userClient: UserClient): void {

    userClient.rol = "CLIENTE"
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

    this.registerService.createUserClient(userClient)
      .subscribe(() => {
        this.toastr.success('Registro exitoso');
        console.log('User client created');
        this.router.navigateByUrl('/login');
    },
    error => {
      console.error('Error al crear el usuario:', error);
      const errorMessage = error.error?.message || 'Ocurrió un error al crear el usuario';
      this.toastr.error(errorMessage);
    });
  }

}
