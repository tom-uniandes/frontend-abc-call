import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentsService } from '../incidents.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-incident-public',
  templateUrl: './search-incident-public.component.html',
  styleUrl: './search-incident-public.component.css'
})
export class SearchIncidentPublicComponent implements OnInit {
  searchForm!: FormGroup;
  incidents: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private incidentsService: IncidentsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      incidentId: ['', Validators.required]
    });
  }

  viewIncidentDetail(incidentId: string): void {
    this.router.navigate(['/public/incident-detail', incidentId]);
  }

  searchIncident(): void {

    if (this.searchForm.invalid) {
      const invalidFields = Array.from(document.getElementsByClassName('ng-invalid')) as HTMLElement[];
      if (invalidFields.length > 1) {
        invalidFields[1].focus();
      } else if (invalidFields.length > 0) {
        invalidFields[0].focus();
      }
      this.toastr.error('Completa los campos de búsqueda correctamente');
      return;
    }

    const searchCriteria = this.searchForm.value;

    this.incidentsService.searchIncidentPublic({ ...searchCriteria}).subscribe(
      (data) => {
        this.incidents = [data];
        if (this.incidents.length === 0) {
          this.toastr.info('No se encontraron incidentes que coincidan con los criterios', 'Información');
        } else {
          this.toastr.success('Incidente encontrado');
        }
      },
      (error) => {
        let errorMessage = error.error?.message || 'Ocurrió algún error al buscar el incidente, intente nuevamente';
        this.toastr.error(errorMessage);
      }
    );

  }

  cleanField() {
    this.searchForm.reset()
    this.incidents = []
  }
}
