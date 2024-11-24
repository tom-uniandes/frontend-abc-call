import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SessionStartedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,) {}

  canActivate(): boolean {
    if(localStorage.getItem("abcall-token")) {
      this.toastr.info('La sesión está iniciada');
      if(sessionStorage.getItem("abcall-rol")) {
        this.redirectSession()
      } else {
        this.authService.verifyAuthorization().subscribe((response) => {
          sessionStorage.setItem("abcall-rol", response.rol);
          this.redirectSession()
        });
      }
      return false;
    }
    return true;
  }

  redirectSession() {
    if(sessionStorage.getItem("abcall-rol") == "CLIENTE") {
      this.router.navigateByUrl('/clients/manage-plan');
    }

    if(sessionStorage.getItem("abcall-rol") == "AGENTE") {
      this.router.navigateByUrl('/incidents/create-incident');
    }
  }
}
