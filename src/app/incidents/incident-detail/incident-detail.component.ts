import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncidentsService } from '../incidents.service';
import { SolutionsDialogComponent } from '../../solutions-dialog/solutions-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  incident: any = null; // To store incident data

  constructor(
    public dialog: MatDialog,
    private incidentsService: IncidentsService,
    private route: ActivatedRoute
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

  openSolutionsDialog(): void {
    this.dialog.open(SolutionsDialogComponent, {
      width: '80%', // Use a percentage for responsive design
      maxWidth: '800px', // Set a max width for larger screens
    });
  }

  getCompanyFromSession(): string | null {
    const company = sessionStorage.getItem("abcall-company");
    return company || null;
  }
}
