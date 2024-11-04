import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionsService, CardContent } from './solutions.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { IncidentsService } from '../incidents/incidents.service';

@Component({
  selector: 'app-solutions-dialog',
  templateUrl: './solutions-dialog.component.html',
  styleUrls: ['./solutions-dialog.component.css']
})
export class SolutionsDialogComponent implements OnInit {
  cardContents: CardContent[] = [];
  incidentId: string;
  company: string;

  constructor(
    public dialogRef: MatDialogRef<SolutionsDialogComponent>,
    private solutionsService: SolutionsService,
    private incidentsService: IncidentsService,
    private toastr: ToastrService, // Use ToastrService
    @Inject(MAT_DIALOG_DATA) public data: { id: string, company: string }
  ) {
    this.incidentId = data.id;
    this.company = data.company;
  }

  ngOnInit(): void {
    this.fetchCardContents();
  }

  fetchCardContents(): void {
    this.solutionsService.getCardContents().subscribe(
      (data) => {
        this.cardContents = data;
      },
      (error) => {
        console.error('Error fetching card contents:', error);
      }
    );
  }

  sendCardContent(card: CardContent): void {
    const requestBody = {
      response: card.text,
      incidentId: this.incidentId,
      company: this.company
    };

    this.incidentsService.update_incident_response(requestBody).subscribe(
      (response) => {
        console.log('Card content sent successfully:', response);
        this.toastr.success('Incidente actualizado exitosamente!', 'Éxito');
      },
      (error) => {
        console.error('Error sending card content:', error);
        this.toastr.error('Error al actualizar el incidente.', 'Error');
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
