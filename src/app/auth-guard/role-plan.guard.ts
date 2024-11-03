import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RoleAndPlanGuard implements CanActivate {
  constructor(private authService: AuthService,
    private location: Location,
    private toastr: ToastrService,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data['roles'];

    const userRole = this.authService.getUserRole();
    const userPlan = this.authService.getUserPlan();

    const hasRequiredRole = userRole in allowedRoles;
    const hasRequiredPlan = allowedRoles[userRole]?.includes(userPlan);

    if (!hasRequiredRole || !hasRequiredPlan) {
      this.toastr.info('Verifica si el plan ' + userPlan?.toLowerCase() + " y el rol pueden acceder a esta funcionalidad");
      this.toastr.error('Rol ' + userRole?.toLowerCase() + " NO permitido");
      this.toastr.error('Acceso denegado');
      setTimeout(() => {
        this.location.back();
      }, 5000);
      return false;
    }

    return true;
  }
}
