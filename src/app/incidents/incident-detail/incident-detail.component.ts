import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncidentsService } from '../incidents.service';
import { SolutionsDialogComponent } from '../../solutions-dialog/solutions-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  incident: any = null; // To store incident data
  agentId: string | null = this.getAgentIdFromToken(); // To store agent ID
  plan: string | null = this.getPlanFromSession(); // To store plan information
  incidentBelongsToAgent: boolean = false; // To check if incident belongs to agent
  replyButtonsEnabled: boolean = false; // To enable reply buttons
  assignButtonEnabled: boolean = false; // To enable assign button
  enableSolutionsButton: boolean = false; // To enable solutions button

  constructor(
    public dialog: MatDialog,
    private incidentsService: IncidentsService,
    private toastr: ToastrService,
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

        console.log('Incident details:', this.incident);
        if (this.incident.agentId === this.agentId) {
          console.log('Incident belongs to agent');
          this.incidentBelongsToAgent = true;
          this.replyButtonsEnabled = true;
          this.assignButtonEnabled = false;
        }
        if (this.incident.agentId === null || this.incident.agentId === '') {
          this.assignButtonEnabled = true;
          this.replyButtonsEnabled = false;
        }
        if (this.incident.solved === true) {
          this.replyButtonsEnabled = false
          this.assignButtonEnabled = false
        }
        this.enableSolutionsButton = this.plan==="EMPRESARIO_PLUS" && this.incidentBelongsToAgent && this.replyButtonsEnabled; // To enable solutions button
        console.log('Incident belongs to agent:', this.incidentBelongsToAgent);
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

  // Method to assign incident to agent
  assignIncident(): void {
    var company = this.getCompanyFromSession() || '';
    var agentId = this.getAgentIdFromToken() || '';
    var incidentId = this.incident.id || '';
    var requestBody = {
      incidentId: incidentId,
      agentId: agentId,
      company: company
    };

    this.incidentsService.updateIncidentAgent(requestBody).subscribe(
      (response) => {
        this.toastr.success('Incident assigned successfully');
        console.log('Incident assigned successfully:', response);
        this.loadIncidentDetails(incidentId);
      },
      (error) => {
        this.toastr.error('Error assigning incident');
        console.error('Error assigning incident:', error);
      }
    );
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

  getPlanFromSession(): string | null {
    const plan = sessionStorage.getItem("abcall-plan");
    return plan || null;
  }
}
