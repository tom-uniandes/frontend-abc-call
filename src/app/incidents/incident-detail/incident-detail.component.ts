import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncidentsService } from '../incidents.service';
import { SolutionsDialogComponent } from '../../solutions-dialog/solutions-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  incident: any = null; // To store incident data
  show_form_response: boolean = false;

  constructor(
    public dialog: MatDialog,
    private incidentsService: IncidentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const incidentId = this.route.snapshot.paramMap.get('id') || '';
    this.loadIncidentDetails(incidentId);
  }

  loadIncidentDetails(incidentId: string): void {
    var company = this.getCompanyFromSession() || '';
    this.incidentsService.getIncident(incidentId, company).subscribe(
      (data) => {
        this.incident = data;
      },
      (error) => {
        console.error('Error fetching incident details:', error);
      }
    );
  }

  viewIncidentResponse(): void {
    // Navega a la página de respuesta del incidente con el ID seleccionado
    this.router.navigate(['/incidents/incident-response', this.incident.id]);
  }

  openSolutionsDialog(): void {
    this.dialog.open(SolutionsDialogComponent, {
      width: '80%', // Use a percentage for responsive design
      maxWidth: '800px', // Set a max width for larger screens
      data: this.incident
    });
  }

  getCompanyFromSession(): string | null {
    const company = sessionStorage.getItem("abcall-company");
    return company || null;
  }
}
