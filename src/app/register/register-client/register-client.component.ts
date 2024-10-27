import { Component } from '@angular/core';
import { UserClient } from '../user-client';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})

export class RegisterClientComponent {
  newUserClient: UserClient = new UserClient('', '', '', '', '');
  errorMessages: { [key: string]: string } = {};


  constructor(private registerService: RegisterService, private router: Router) { }

  createUserClient() {
    if (this.validateUserClient()) {
      this.registerService.createUserClient(this.newUserClient)
      .subscribe(createdUser => {
        console.log('User created:', createdUser);
        this.newUserClient = new UserClient('', '', '', '', '');
        this.router.navigateByUrl('/login');
      });
    }
  }

  validateUserClient(): boolean {

    console.log(this.newUserClient.name)
    if (!this.newUserClient.name || this.newUserClient.name.trim().length === 0) {
      this.errorMessages["name"] = 'El campo nombre es requerido.';
    } else if (this.newUserClient.name.length > 255) {
      this.errorMessages["name"] = 'El campo nombre no puede exceder los 255 caracteres';
    }

    return Object.keys(this.errorMessages).length === 0;
  }
}
