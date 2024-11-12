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
    const token = localStorage.getItem("abcall-token");
    if (!token) {
      localStorage.clear()
      sessionStorage.clear()
      this.router.navigateByUrl("/login")
    }

    let plan = sessionStorage.getItem("abcall-plan") || ""
    let rol = sessionStorage.getItem("abcall-rol") || ""
    if(plan == "EMPRENDEDOR") {
      this.accessResourceEmprendedor(rol);
    }

    if(plan == "EMPRESARIO") {
      this.accessResourceEmpresario(rol);
    }

    if(plan == "EMPRESARIO_PLUS") {
      this.accessResourceEmpresarioPlus(rol);
    }
  }

  accessResourceEmprendedor(rol: string) {
    if(rol == "CLIENTE") {
      this.styleGroupOptions = this.router.url === '/clients/manage-plan' ? {"margin-left": "32%"} : {"margin-left": "39%"}
      this.showChangeMoney = this.router.url === '/clients/manage-plan' ? true : false
      this.showPlan = true
      this.showAgents = true
    }

    if(rol == "AGENTE") {
      this.styleGroupOptions = {"margin-left": "43%"}
      this.showIncidents = true
    }
  }

  accessResourceEmpresario(rol: string) {
    if(rol == "CLIENTE") {
      this.styleGroupOptions = this.router.url === '/clients/manage-plan' ? {"margin-left": "25%"} : {"margin-left": "31%"}
      this.showChangeMoney = this.router.url === '/clients/manage-plan' ? true : false
      this.showPlan = true
      this.showAgents = true
      this.showAnalytics = true
    }

    if(rol == "AGENTE") {
      this.styleGroupOptions = {"margin-left": "43%"}
      this.showIncidents = true
    }
  }

  accessResourceEmpresarioPlus(rol: string) {
    if(rol == "CLIENTE") {
      this.styleGroupOptions = this.router.url === '/clients/manage-plan' ? {"margin-left": "25%"} : {"margin-left": "31%"}
      this.showChangeMoney = this.router.url === '/clients/manage-plan' ? true : false
      this.showPlan = true
      this.showAgents = true
      this.showAnalytics = true
    }

    if(rol == "AGENTE") {
      this.styleGroupOptions = {"margin-left": "43%"}
      this.showIncidents = true
    }
  }

  selectedLanguage = 'Español';
  selectedMoney = sessionStorage.getItem("abcall-money") || '$-COP';
  currentClient: Client[] = [];

  changeLanguage(language: string) {
    this.selectedLanguage = language;
  }

  changeMoney(money: string) {

    if (money == "$-COP") {
      sessionStorage.setItem("abcall-money", "$-COP")
      sessionStorage.setItem("abcall-money-emprendedor", "COP 99.000")
      sessionStorage.setItem("abcall-money-empresario", "COP 149.000")
      sessionStorage.setItem("abcall-money-empresario-plus", "COP 199.000")
    }

    if (money == "USD") {
      sessionStorage.setItem("abcall-money", "USD")
      sessionStorage.setItem("abcall-money-emprendedor", "USD 22,47")
      sessionStorage.setItem("abcall-money-empresario", "USD 31,37")
      sessionStorage.setItem("abcall-money-empresario-plus", "USD 45,17")
    }

    if (money == "€-EUR") {
      sessionStorage.setItem("abcall-money", "€-EUR")
      sessionStorage.setItem("abcall-money-emprendedor", "EUR 20,85")
      sessionStorage.setItem("abcall-money-empresario", "EUR 33,82")
      sessionStorage.setItem("abcall-money-empresario-plus", "EUR 41,90")
    }

    this.selectedMoney = money;
    window.location.reload()
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
    localStorage.clear()
    sessionStorage.clear()
    this.router.navigateByUrl("/home")
  }
}

interface Client {
  name: string;
  pathLogo: string;
}

const client: Client[] = [
  { name: 'uniandes', pathLogo: "assets/logo-client/logo-uniandes.png" }
];


