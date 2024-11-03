import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserRole(): string {
    const role = sessionStorage.getItem('abcall-rol');
    if (role) {
      return role;
    }
    return '';
  }

  getUserPlan(): string {
    const plan = sessionStorage.getItem('abcall-plan');
    if (plan) {
      return plan;
    }
    return '';
  }

  hasAccess(role: string, plan: string): boolean {
    return this.getUserRole() === role && this.getUserPlan() === plan;
  }
}
