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
import { RoleAndPlanGuard } from './auth-guard/role-plan.guard';
import { HomeComponent } from './home/home/home.component';
import { SearchIncidentPublicComponent } from './incidents/search-incident-public/search-incident-public.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  { path: 'register',
    component: RegisterClientComponent,
    pathMatch: 'full'
  },
  {
    path: 'clients/manage-plan',
    component: ManagePlanComponent,
    pathMatch: 'full',
    canActivate: [RoleAndPlanGuard],
    data: {
      roles: {
        "CLIENTE": ['EMPRENDEDOR', 'EMPRESARIO', 'EMPRESARIO_PLUS'],
      }
    }
  },
  {
    path: 'analitica/reporte',
    component: ReporteComponent,
    pathMatch: 'full',
    canActivate: [RoleAndPlanGuard],
    data: {
      roles: {
        "CLIENTE": ['EMPRESARIO', 'EMPRESARIO_PLUS'],
      }
    }
  },
  {
    path: 'incidents/incident-detail',
    component: IncidentDetailComponent,
    pathMatch: 'full',
    canActivate: [RoleAndPlanGuard],
    data: {
      roles: {
        "AGENTE": ['EMPRENDEDOR', 'EMPRESARIO', 'EMPRESARIO_PLUS'],
      }
    }
  },
  {
    path: 'register-agent',
    component: RegisterAgentComponent,
    pathMatch: 'full',
    canActivate: [RoleAndPlanGuard],
    data: {
      roles: {
        "CLIENTE": ['EMPRENDEDOR', 'EMPRESARIO', 'EMPRESARIO_PLUS'],
      }
    }
  },
  {
    path: 'incidents/create-incident',
    component: CreateIncidentComponent,
    pathMatch: 'full',
    canActivate: [RoleAndPlanGuard],
    data: {
      roles: {
        "AGENTE": ['EMPRENDEDOR', 'EMPRESARIO', 'EMPRESARIO_PLUS'],
      }
    }
  },
  {
    path: 'incidents/search-incident',
    component: SearchIncidentComponent,
    pathMatch: 'full',
    canActivate: [RoleAndPlanGuard],
    data: {
      roles: {
        "AGENTE": ['EMPRENDEDOR', 'EMPRESARIO', 'EMPRESARIO_PLUS'],
      }
    }
  },
  {
    path: 'incidents/incident-detail/:id',
    component: IncidentDetailComponent,
    pathMatch: 'full',
    canActivate: [RoleAndPlanGuard],
    data: {
      roles: {
        "AGENTE": ['EMPRENDEDOR', 'EMPRESARIO', 'EMPRESARIO_PLUS'],
      }
    }
  },
  {
    path: 'search-incident',
    component: SearchIncidentPublicComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
