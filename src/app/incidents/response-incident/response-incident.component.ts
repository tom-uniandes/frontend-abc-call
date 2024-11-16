import {Component, Input, OnInit} from '@angular/core';
import {Incident} from "../incident";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncidentsService} from "../incidents.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-response-incident',
  templateUrl: './response-incident.component.html',
  styleUrl: './response-incident.component.css'
})
export class ResponseIncidentComponent implements OnInit {
  incident: any = null; // To store incident data

  responseForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private incidentsService: IncidentsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {}


  ngOnInit(): void {
    const incidentId = this.route.snapshot.paramMap.get('id') || '';
    this.loadIncidentDetails(incidentId);

    // Response incident form
    this.responseForm = this.formBuilder.group({
      response: ["", [Validators.required]],
      company: [this.getCompanyFromSession()],
      incidentId: [incidentId]
    });
  }

  loadIncidentDetails(incidentId: string): void {
    var company = this.getCompanyFromSession() || '';
    this.incidentsService.getIncident(incidentId, company).subscribe(
      (data) => {
        if (data.solved) {
          this.toastr.error('El incidente ya se encuentra resuelto');
          this.router.navigate(['/incidents/incident-detail', incidentId]);
          return;
        }
        this.incident = data;
      },
      (error) => {
        console.error('Error fetching incident details:', error);
      }
    );
  }

  responseIncident(): void {
    if (this.responseForm.invalid) {
      this.toastr.error('Por favor, complete correctamente el formulario');
      return;
    }

    const responseData: Incident = this.responseForm.value;

    this.incidentsService.update_incident_response(responseData).subscribe({
      next: value => {
        this.toastr.success('Respuesta del incidente registrado con éxito');
        this.responseForm.reset(); // Reset the form to the initial state

        this.returnViewDetalleIncident()
      }, error: (error: HttpErrorResponse) => {
        console.error('Error al registrar la respuesta de incidente:', error);
        const errorMessage = error.error?.message || 'Ocurrió un error al registrar la respuesta del incidente';
        this.toastr.error(errorMessage);
      }
    });
  }

  returnViewDetalleIncident() {
    // Navega a la página de detalles del incidente con el ID seleccionado
    this.router.navigate(['/incidents/incident-detail', this.incident.id]);
  }

  getCompanyFromSession(): string | null {
    const company = sessionStorage.getItem("abcall-company");
    return company || null;
  }

}
