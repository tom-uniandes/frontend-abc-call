import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class CreateIncidentComponent implements OnInit, OnDestroy {
  incidentForm!: FormGroup;
  userForm!: FormGroup;
  searchForm!: FormGroup;
  searchMode = false;
  userCreationMode = false;
  userNotFound = false;
  user: any = null;

  // Timer variables
  timerRunning = false;
  timeElapsed = 0; // In seconds
  formattedTime = '00:00:00';
  intervalId: any;

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
      channel: [this.getChannel()],
      agentId: [this.getAgentIdFromToken()],
      company: [this.getCompanyFromSession()]
    });

    // Initially disable the incident form
    this.incidentForm.disable();

    // User Form for Creating New Users
    this.userForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      company: [this.getCompanyFromSession()]
    });

    // Search Form for Finding Existing Users
    this.searchForm = this.formBuilder.group({
      searchId: ["", [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    // Clear the interval if the component is destroyed
    if (this.intervalId) clearInterval(this.intervalId);
  }

  // Toggle search mode
  toggleSearch(): void {
    this.searchMode = !this.searchMode;
    this.userCreationMode = false;
  }

  // Toggle user creation mode
  toggleUserCreation(): void {
    this.userCreationMode = !this.userCreationMode;
    this.searchMode = false;
  }

  // Search for a user by ID
  searchUser(): void {
    const searchId = this.searchForm.get('searchId')?.value;
    const company = this.getCompanyFromSession() || '';
    this.incidentsService.getUser(searchId, company).subscribe(
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

  // Select a user from the search result
  selectUser(): void {
    if (this.user) {
      this.incidentForm.patchValue({ userId: this.user.id });
      this.searchMode = false;
      this.toastr.success('Usuario seleccionado con éxito');
    }
  }

  // Create a new user
  createUser(): void {
    if (this.userForm.invalid) {
      this.toastr.error('Por favor complete el formulario de usuario correctamente.');
      return;
    }

    const newUser = this.userForm.value;
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
        this.incidentForm.reset(); // Reset the form to the initial state
        this.incidentForm.disable();

        // adding values to channel, agentId and company
        this.incidentForm.patchValue({
          channel: this.getChannel(),
          agentId: this.getAgentIdFromToken(),
          company: this.getCompanyFromSession()
        });

        // Reset the timer only upon successful submission
        this.timerRunning = false;
        clearInterval(this.intervalId);
        this.intervalId = null; // Reset intervalId
        this.timeElapsed = 0; // Reset the elapsed time
        this.formattedTime = '00:00:00'; // Reset the displayed time

        this.router.navigateByUrl('/incidents/create-incident'); // Optionally refresh the page
      },
      (error: HttpErrorResponse) => {
        console.error('Error al registrar incidente:', error);
        const errorMessage = error.error?.message || 'Ocurrió un error al registrar el incidente';
        this.toastr.error(errorMessage);
      }
    );
  }

  // Timer controls
  toggleTimer(): void {
    if (this.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer(): void {
    this.timerRunning = true;
    this.incidentForm.enable(); // Enable the form when the timer starts
    this.intervalId = setInterval(() => {
      this.timeElapsed++;
      this.formattedTime = this.formatTime(this.timeElapsed);
    }, 1000);
  }

  stopTimer(): void {
    this.timerRunning = false;
    this.incidentForm.disable(); // Disable the form when the timer stops
    clearInterval(this.intervalId);
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  }

  // Helper methods to retrieve agent ID and company information from session or token
  getAgentIdFromToken(): string | null {
    const token = localStorage.getItem("abcall-token");
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getCompanyFromSession(): string | null {
    const company = sessionStorage.getItem("abcall-company");
    return company || null;
  }

  getChannel(): string | null {
    return "WEB";
  }
}
