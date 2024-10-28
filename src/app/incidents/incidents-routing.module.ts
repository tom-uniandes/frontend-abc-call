import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'incident-detail', component: IncidentDetailComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class IncidentsRoutingModule { }
