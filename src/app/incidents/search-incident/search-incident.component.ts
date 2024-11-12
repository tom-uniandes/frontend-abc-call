import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentsService } from '../incidents.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-incident',
  templateUrl: './search-incident.component.html',
  styleUrls: ['./search-incident.component.css']
})
export class SearchIncidentComponent implements OnInit {
  searchForm!: FormGroup;
  incidents: any[] = []; // Array para almacenar los resultados de la búsqueda

  constructor(
    private formBuilder: FormBuilder,
    private incidentsService: IncidentsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario de búsqueda con validaciones
    this.searchForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      incidentId: ['', Validators.required]
    });
    this.getIncidents();
  }

  getIncidents(): void {
    const company = this.getCompanyFromSession();
    if (company) {
      this.incidentsService.getIncidents(company).subscribe(
        (data) => {
          this.incidents = data;
        },
        (error) => {
          this.toastr.error('No se pudo obtener la lista de incidentes', 'Error');
        }
      );
    } else {
      this.toastr.warning('No se encontró una compañía en la sesión', 'Advertencia');
    }
  }

  viewIncidentDetail(incidentId: string): void {
    // Navega a la página de detalles del incidente con el ID seleccionado
    this.router.navigate(['/incidents/incident-detail', incidentId]);
  }

  searchIncident(): void {
    if (this.searchForm.invalid) {
      this.toastr.error('Por favor, complete correctamente el formulario de búsqueda', 'Error');
      return;
    }

    const searchCriteria = this.searchForm.value;
    const company = this.getCompanyFromSession();

    if (company) {
      this.incidentsService.searchIncident({ ...searchCriteria, company }).subscribe(
        (data) => {
          this.incidents = [data];
          if (this.incidents.length === 0) {
            this.toastr.info('No se encontraron incidentes que coincidan con los criterios', 'Información');
          }
        },
        (error) => {
          let errorMessage = error.error?.message || 'Ocurrió algún error al buscar el incidente, intente nuevamente';
          this.toastr.error(errorMessage);
        }
      );
    } else {
      this.toastr.warning('No se encontró una compañía en la sesión', 'Advertencia');
    }
  }

  getCompanyFromSession(): string | null {
    const company = sessionStorage.getItem("abcall-company");
    return company || null;
  }
}
