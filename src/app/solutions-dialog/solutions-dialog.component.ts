import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionsService, CardContent } from './solutions.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient.
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private http: HttpClient,
    private solutionsService: SolutionsService,
    private snackBar: MatSnackBar,
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
      isSolved: true,
      description: card.text,
      incidentId: this.incidentId,
      company: this.company
    };

    this.http.post(`${environment.baseUrl}/update_incident_response`, requestBody).subscribe(
      (response) => {
        console.log('Card content sent successfully:', response);
        this.snackBar.open('Incidente actualizado exitosamente!', 'Cerrar', {
          duration: 3000
        });
      },
      (error) => {
        console.error('Error sending card content:', error);
        this.snackBar.open('Error al actualizar el incidente.', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
