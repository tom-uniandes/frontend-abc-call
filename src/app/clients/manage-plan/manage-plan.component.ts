import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-manage-plan',
  templateUrl: './manage-plan.component.html',
  styleUrls: ['./manage-plan.component.css']
})
export class ManagePlanComponent implements OnInit {

  constructor(
    private location: Location,
    private toastr: ToastrService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    
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
      },
      error => {
        this.toastr.error('Error al actualizar el plan: ' + error);
      }
    );
  }
}
