import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent} from './reporte/reporte.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuModule } from "../menu/menu.module";



@NgModule({
  declarations: [
    ReporteComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MenuModule
],
  exports: [
    ReporteComponent
  ]
})
export class AnaliticaModule {}
