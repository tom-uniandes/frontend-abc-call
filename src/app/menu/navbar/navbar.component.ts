import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor() {
    this.filterCurrentClient();
  }

  selectedLanguage = 'Español';
  selectedMoney = '$-COP';
  currentClient: Client[] = [];

  changeLanguage(language: string) {
    this.selectedLanguage = language;
  }

  changeMoney(money: string) {
    this.selectedMoney = money;
  }

  filterCurrentClient() {
    this.currentClient = client
      .filter(client => client.name = "Uniandes")
  }
}

interface Client {
  name: string;
  pathLogo: string;
}

const client: Client[] = [
  { name: 'Uniandes', pathLogo: "assets/logo-client/logo-uniandes.png" }
];


