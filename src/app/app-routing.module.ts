import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePlanComponent } from './clients/manage-plan/manage-plan.component';
import { ReporteComponent } from './analitica/reporte/reporte.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterClientComponent } from './register/register-client/register-client.component';


const routes: Routes = [
  // { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'clients/manage-plan', component: ManagePlanComponent,  pathMatch: 'full' },
  { path: 'analitica/reporte', component: ReporteComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterClientComponent, pathMatch: 'full' },
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
