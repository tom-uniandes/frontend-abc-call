import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-public',
  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css'
})
export class NavbarPublicComponent {
  selectedLanguage = 'Español';

  changeLanguage(language: string) {
    this.selectedLanguage = language;
  }
}
