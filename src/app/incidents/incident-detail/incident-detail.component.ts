import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolutionsDialogComponent } from '../../solutions-dialog/solutions-dialog.component';


@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrl: './incident-detail.component.css'
})
export class IncidentDetailComponent {
  constructor(public dialog: MatDialog) {}

  openSolutionsDialog(): void {
    this.dialog.open(SolutionsDialogComponent, {
      width: '80%', // Use a percentage for responsive design
      maxWidth: '800px', // Set a max width for larger screens
    });
  }
}
