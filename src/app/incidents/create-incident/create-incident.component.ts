import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentsService } from '../incidents.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Incident } from '../incident';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.css']
})
export class CreateIncidentComponent implements OnInit {
  incidentForm!: FormGroup;
  userForm!: FormGroup;
  searchForm!: FormGroup;
  searchMode = false;
  userCreationMode = false;
  userNotFound: boolean = false;
  user: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private incidentsService: IncidentsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Incident Form
    this.incidentForm = this.formBuilder.group({
      userId: ["", [Validators.required]],
      date: ["", [Validators.required]],
      type: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.maxLength(300)]],
      channel: ["WEB"]
    });

    // User Form for Creating New Users
    this.userForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    });

    // Search Form for Finding Existing Users
    this.searchForm = this.formBuilder.group({
      searchId: ["", [Validators.required]]
    });
  }

  toggleSearch(): void {
    this.searchMode = !this.searchMode;
    this.userCreationMode = false;
  }

  toggleUserCreation(): void {
    this.userCreationMode = !this.userCreationMode;
    this.searchMode = false;
  }

  searchUser(): void {
    const searchId = this.searchForm.get('searchId')?.value;
    this.incidentsService.getUser(searchId).subscribe(
      user => {
        this.user = user;
        this.userNotFound = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.userNotFound = true;
          this.user = null;
        } else {
          this.toastr.error('Error al buscar usuario');
        }
      }
    );
  }

  selectUser(): void {
    if (this.user) {
      this.incidentForm.patchValue({ userId: this.user.id });
      this.searchMode = false;
      this.toastr.success('Usuario seleccionado con éxito');
    }
  }

  createUser(): void {
    if (this.userForm.invalid) {
      this.toastr.error('Por favor complete el formulario de usuario correctamente.');
      return;
    }

    const newUser = this.userForm.value;
    console.log("LOG: Trying to create the user: " + JSON.stringify(newUser));
    this.incidentsService.createUser(newUser).subscribe(
      user => {
        this.toastr.success('Usuario creado con éxito');
        this.userNotFound = false;
        this.incidentForm.patchValue({ userId: user.id });
        this.userCreationMode = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Error al crear usuario:', error);
        this.toastr.error('Ocurrió un error al crear el usuario');
      }
    );
  }

  createIncident(): void {
    if (this.incidentForm.invalid) {
      this.toastr.error('Por favor, complete correctamente el formulario');
      return;
    }

    const incidentData: Incident = this.incidentForm.value;

    this.incidentsService.createIncident(incidentData).subscribe(
      response => {
        this.toastr.success('Incidente registrado con éxito');
        this.router.navigateByUrl('/incidents');
      },
      (error: HttpErrorResponse) => {
        console.error('Error al registrar incidente:', error);
        const errorMessage = error.error?.message || 'Ocurrió un error al registrar el incidente';
        this.toastr.error(errorMessage);
      }
    );
  }
}
