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



@NgModule({
  declarations: [
    CreateIncidentComponent
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
    MenuModule
  ],
  exports: [
    CreateIncidentComponent
  ]
})
export class IncidentsModule { }
