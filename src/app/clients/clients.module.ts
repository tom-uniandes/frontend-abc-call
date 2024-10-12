import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePlanComponent } from './manage-plan/manage-plan.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    ManagePlanComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [
    ManagePlanComponent
  ]
})
export class ClientsModule { }
