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
      idNumber: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(150)]],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9.]+$/), Validators.maxLength(50)]],
      company: ["", [Validators.required, Validators.maxLength(60)]],
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

    this.registerService.createUserClient(userClient)
      .subscribe(createdUserClient => {
        this.toastr.success('Registro exitoso');
        console.log('User client created');
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1000);
    });
  }

}
