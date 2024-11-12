import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { CreateIncidentComponent } from './create-incident/create-incident.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuModule } from '../menu/menu.module';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SolutionsDialogComponent } from '../solutions-dialog/solutions-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchIncidentComponent } from './search-incident/search-incident.component';
import { SearchIncidentPublicComponent } from './search-incident-public/search-incident-public.component';
import { IncidentDetailPublicComponent } from './incident-detail-public/incident-detail-public.component';


@NgModule({
  declarations: [
    CreateIncidentComponent,
    IncidentDetailComponent,
    SolutionsDialogComponent,
    SearchIncidentComponent,
    SearchIncidentPublicComponent,
    IncidentDetailPublicComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MenuModule,
    IncidentsRoutingModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateIncidentComponent,
    IncidentDetailComponent,
    SolutionsDialogComponent,
    SearchIncidentComponent
  ]
})
export class IncidentsModule { }
