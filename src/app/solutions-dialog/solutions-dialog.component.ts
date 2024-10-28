import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

interface CardContent {
  text: string;
}

@Component({
  selector: 'app-solutions-dialog',
  templateUrl: './solutions-dialog.component.html',
  styleUrls: ['./solutions-dialog.component.css']
})
export class SolutionsDialogComponent implements OnInit {
  cardContents: CardContent[] = [];

  constructor(
    public dialogRef: MatDialogRef<SolutionsDialogComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchCardContents();
  }

  fetchCardContents(): void {
    this.http.get<CardContent[]>('https://api.example.com/card-contents')
      .subscribe(
        (data) => {
          this.cardContents = data;
        },
        () => {
          // Fallback data in case of error
          this.cardContents = [
            { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
          ];
        }
      );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
