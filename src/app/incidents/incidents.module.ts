import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { MenuModule } from "../menu/menu.module";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SolutionsDialogComponent } from '../solutions-dialog/solutions-dialog.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    IncidentDetailComponent,
    SolutionsDialogComponent,
  ],
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    MenuModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class IncidentsModule { }
