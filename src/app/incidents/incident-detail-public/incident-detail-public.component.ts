import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncidentsService } from '../incidents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-incident-detail-public',
  templateUrl: './incident-detail-public.component.html',
  styleUrl: './incident-detail-public.component.css'
})
export class IncidentDetailPublicComponent implements OnInit {
  incident: any = null;

  constructor(
    public dialog: MatDialog,
    private incidentsService: IncidentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let incidentId = this.route.snapshot.paramMap.get('id') || '';
    this.loadIncidentDetails(incidentId);
  }

  loadIncidentDetails(incidentId: string): void {
    this.incidentsService.getIncidentPublic(incidentId).subscribe(
      (data) => {
        this.incident = data;
      },
      (error) => {
        console.error('Error fetching incident details:', error);
      }
    );
  }

  newSearch() {
    this.router.navigate(['/public/search-incident'])
  }
}
