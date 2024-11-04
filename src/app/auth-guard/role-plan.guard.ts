import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleAndPlanGuard implements CanActivate {
  constructor(private authService: AuthService,
    private location: Location,
    private toastr: ToastrService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.verifyAuthorization().pipe(
      map((response) => {
        let userRole = response.rol
        let userPlan = response.plan

        sessionStorage.setItem("abcall-rol", userRole)
        sessionStorage.setItem("abcall-company", response.company)
        sessionStorage.setItem("abcall-plan", userPlan)

        const allowedRoles = route.data['roles'];

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
      }),
      catchError((error) => {
        sessionStorage.clear()
        this.toastr.error("La sesión expiró");
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
