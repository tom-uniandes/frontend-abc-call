import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentsService } from '../incidents.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs';

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
  
  filterIncidents(event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const filter = target.value;
    
    const agentId = this.getAgentIdFromToken(); // Get the logged-in agent ID
    if (!agentId) {
      this.toastr.warning('No se encontró el ID del agente en sesión', 'Advertencia');
      return;
    }
  
    switch (filter) {
      case 'all':
        this.getIncidents(); // Fetch all incidents
        break;
  
      case 'open':
        this.getIncidents();
        setTimeout(() => {
          this.incidents = this.incidents.filter((incident) => !incident.solved);
        }, 500);
        break;

      case 'closed':
        this.getIncidents();
        setTimeout(() => {
          this.incidents = this.incidents.filter((incident) => incident.solved);
        }, 500);
        break;

      case 'assignedToMe':
        this.getIncidents();
        setTimeout(() => {
          this.incidents = this.incidents.filter((incident) => incident.agentId === agentId);
        }, 500);
        break;
  
      case 'unassigned':
        this.getIncidents();
        setTimeout(() => {
          this.incidents = this.incidents.filter((incident) => !incident.agentId || incident.agentId === '');
        }, 500);
        break;
  
      default:
        this.getIncidents(); // Default case to fetch all incidents
    }
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
}
