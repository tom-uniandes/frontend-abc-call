import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePlanComponent } from './clients/manage-plan/manage-plan.component';
import { ReporteComponent } from './analitica/reporte/reporte.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterClientComponent } from './register/register-client/register-client.component';
import { RegisterAgentComponent } from './register/register-agent/register-agent.component';
import { CreateIncidentComponent } from './incidents/create-incident/create-incident.component';
import { IncidentDetailComponent } from './incidents/incident-detail/incident-detail.component';
import { SearchIncidentComponent } from './incidents/search-incident/search-incident.component';


const routes: Routes = [
  { path: 'clients/manage-plan', component: ManagePlanComponent,  pathMatch: 'full' },
  { path: 'analitica/reporte', component: ReporteComponent, pathMatch: 'full' },
  { path: 'incidents/incident-detail', component: IncidentDetailComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterClientComponent, pathMatch: 'full' },
  { path: 'register-agent', component: RegisterAgentComponent, pathMatch: 'full' },
  { path: 'incidents/create-incident', component: CreateIncidentComponent, pathMatch: 'full'},
  { path: 'incidents/search-incident', component: SearchIncidentComponent, pathMatch: 'full'},
  { path: 'incidents/incident-detail/:id', component: IncidentDetailComponent, pathMatch: 'full'},
  { path: '**', redirectTo: '/login' }  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
