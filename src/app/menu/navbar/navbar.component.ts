import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  showIncidents = false;
  showAgents = false;
  showPlan = false;
  showAnalytics = false;
  showChangeMoney = false;

  styleGroupOptions = {}

  constructor(private router: Router,) {
    this.filterCurrentClient();
  }

  ngOnInit() {
    const token = sessionStorage.getItem("abcall-token");
    if (!token) {
      sessionStorage.clear()
      this.router.navigateByUrl("/login")
    }

    if(sessionStorage.getItem("abcall-plan") == "EMPRENDEDOR") {
      this.accessResourceEmprendedor();
    }

    if(sessionStorage.getItem("abcall-plan") == "EMPRESARIO") {
      this.accessResourceEmpresario();
    }

    if(sessionStorage.getItem("abcall-plan") == "EMPRENDEDOR_PLUS") {
      this.accessResourceEmprendedorPlus();
    }

  }

  accessResourceEmpresario() {
    if(sessionStorage.getItem("abcall-rol") == "CLIENTE") {
      this.styleGroupOptions = this.router.url === '/clients/manage-plan' ? {"margin-left": "32%"} : {"margin-left": "39%"}
      this.showChangeMoney = this.router.url === '/clients/manage-plan' ? true : false
      this.showPlan = true
      this.showAgents = true
    }

    if(sessionStorage.getItem("abcall-rol") == "AGENTE") {
      this.styleGroupOptions = {"margin-left": "43%"}
      this.showIncidents = true
    }
  }

  accessResourceEmprendedor() {
    if(sessionStorage.getItem("abcall-rol") == "CLIENTE") {
      this.styleGroupOptions = this.router.url === '/clients/manage-plan' ? {"margin-left": "25%"} : {"margin-left": "31%"}
      this.showChangeMoney = this.router.url === '/clients/manage-plan' ? true : false
      this.showPlan = true
      this.showAgents = true
      this.showAnalytics = true
    }

    if(sessionStorage.getItem("abcall-rol") == "AGENTE") {
      this.styleGroupOptions = {"margin-left": "43%"}
      this.showIncidents = true
    }
  }

  accessResourceEmprendedorPlus() {
    if(sessionStorage.getItem("abcall-rol") == "CLIENTE") {
      this.styleGroupOptions = this.router.url === '/clients/manage-plan' ? {"margin-left": "25%"} : {"margin-left": "31%"}
      this.showChangeMoney = this.router.url === '/clients/manage-plan' ? true : false
      this.showPlan = true
      this.showAgents = true
      this.showAnalytics = true
    }

    if(sessionStorage.getItem("abcall-rol") == "AGENTE") {
      this.styleGroupOptions = {"margin-left": "43%"}
      this.showIncidents = true
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
      .filter(client => client.name === this.getNameCompany() || "")

    if (this.currentClient.length == 0)
      this.currentClient = [{ name: 'unknown', pathLogo: "assets/logo-client/logo-unknown.png" }]
  }

  getNameCompany() {
      return sessionStorage.getItem("abcall-company")
  }

  logout() {
    sessionStorage.clear()
    this.router.navigateByUrl("/login")
  }
}

interface Client {
  name: string;
  pathLogo: string;
}

const client: Client[] = [
  { name: 'uniandes', pathLogo: "assets/logo-client/logo-uniandes.png" }
];


