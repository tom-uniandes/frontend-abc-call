import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-manage-plan',
  templateUrl: './manage-plan.component.html',
  styleUrls: ['./manage-plan.component.css']
})
export class ManagePlanComponent implements OnInit {

  showSubscribeEmprendedor = true
  showPlanEmprendedorSelected = false

  showSubscribeEmpresario = true
  showPlanEmpresarioSelected = false

  showSubscribeEmpresarioPlus = true
  showPlanEmpresarioPlusSelected = false

  priceEmprendedor = ""
  priceEmpresario = ""
  priceEmpresarioPlus = ""

  constructor(
    private toastr: ToastrService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.getPlanSelected()
    this.getMoneySelected()

    if (!sessionStorage.getItem("abcall-money")) {
      this.priceEmprendedor = "COP 99.000"
      this.priceEmpresario = "COP 149.000"
      this.priceEmpresarioPlus = "COP 199.000"
    }
  }

  changePlan(plan: string) {
    const company = sessionStorage.getItem("abcall-company");
    if (!company) {
      this.toastr.error('Company information is missing');
      return;
    }

    this.clientsService.updateClientPlan(company, plan).subscribe(
      response => {
        this.toastr.success('Plan actualizado exitosamente');
        sessionStorage.setItem("abcall-plan", plan);
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      },
      error => {
        this.toastr.error('Error al actualizar el plan: ' + error);
      }
    );
  }

  getPlanSelected() {
    let plan = sessionStorage.getItem("abcall-plan") || ""

    if (plan == "EMPRENDEDOR") {
      this.showSubscribeEmprendedor = false
      this.showPlanEmprendedorSelected = true
    }

    if (plan == "EMPRESARIO") {
      this.showSubscribeEmpresario = false
      this.showPlanEmpresarioSelected = true
    }

    if (plan == "EMPRESARIO_PLUS") {
      this.showSubscribeEmpresarioPlus = false
      this.showPlanEmpresarioPlusSelected = true
    }

  }

  getMoneySelected() {
    this.priceEmprendedor = sessionStorage.getItem("abcall-money-emprendedor") || ""
    this.priceEmpresario = sessionStorage.getItem("abcall-money-empresario") || ""
    this.priceEmpresarioPlus = sessionStorage.getItem("abcall-money-empresario-plus") || ""
  }
}
