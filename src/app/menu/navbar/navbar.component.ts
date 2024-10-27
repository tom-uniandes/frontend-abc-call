import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,) {
    this.filterCurrentClient();
  }

  ngOnInit() {
    const token = sessionStorage.getItem("abcall-token");
    if (!token) {
      this.router.navigateByUrl("/login")
    }
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


