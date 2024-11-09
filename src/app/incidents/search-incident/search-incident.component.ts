import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  incidents: any[] = []; // Array to store search results

  constructor(
    private formBuilder: FormBuilder,
    private incidentsService: IncidentsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the search form
    this.searchForm = this.formBuilder.group({
      userId: [''],
      incidentId: ['']
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
          this.toastr.error('Failed to fetch incidents', 'Error');
        }
      );
    } else {
      this.toastr.warning('No company found in session', 'Warning');
    }
  }

  viewIncidentDetail(incidentId: string): void {
    // Navigate to the incident detail page with the selected incident ID
    this.router.navigate(['/incidents/incident-detail', incidentId]);
  }

  searchIncident(): void {
    // Logic for next interation to search the incident
  }

  getCompanyFromSession(): string | null {
    const company = sessionStorage.getItem("abcall-company");
    return company || null;
  }
}
