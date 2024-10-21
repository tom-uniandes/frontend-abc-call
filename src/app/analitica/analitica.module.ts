import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuModule } from "../menu/menu.module";
import { ReporteComponent } from './reporte/reporte.component';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatGridListModule } from '@angular/material/grid-list';
// import {FormsModule, ReactiveFormsModule} from "@angular/forms";


// MatToolbarModule,
//   MatCardModule,
//   MatButtonModule,
//   MatGridListModule,

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MenuModule,
    ReporteComponent
],
  exports: [
    ReporteComponent
  ]
})
export class AnaliticaModule {}
