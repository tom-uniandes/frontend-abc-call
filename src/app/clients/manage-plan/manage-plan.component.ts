import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-plan',
  templateUrl: './manage-plan.component.html',
  styleUrl: './manage-plan.component.css'
})
export class ManagePlanComponent implements OnInit {

  constructor(private location: Location,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    if(sessionStorage.getItem("abcall-rol") != "CLIENTE") {
      this.toastr.error('Acceso denegado');
      this.location.back();
    }
  }
}
