import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component'
import { RouterModule, Routes } from '@angular/router';
import {ResponseIncidentComponent} from "./response-incident/response-incident.component";

const routes: Routes = [
  { path: 'incident-detail', component: IncidentDetailComponent },
  { path: 'incident-response', component: ResponseIncidentComponent },
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
