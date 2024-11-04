import {Component} from '@angular/core';
import {ChartConfiguration, ChartOptions, Chart, registerables} from "chart.js";

Chart.register(...registerables)

import {FormsModule} from "@angular/forms";
import {BaseChartDirective} from "ng2-charts";
import { MenuModule } from "../../menu/menu.module";
import {Agente, FilterIncidente} from "../model";
import {AnaliticaService} from "../services/analitica.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    FormsModule,
    BaseChartDirective,
    MenuModule
],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {

  constructor(
    private toastr: ToastrService,
    private analiticaService: AnaliticaService) {
  }

  agentes: Agente[] = [
    {'id': 1, 'nombre': 'Tomas'},
    {'id': 2, 'nombre': 'Santiago'},
    {'id': 3, 'nombre': 'Andres'},
    {'id': 4, 'nombre': 'Alvaro'},
  ];

  fechaInicio: any = '';
  fechaFin: any = '';
  tipoIncidente: any = '';
  agente: any = '';

  total_usuarios = 0
  incidentes_resueltos = 0
  total_incidentes = 0

  dataIncXCanal: any = null;
  opcIncXCanal: any = null;

  dataIncConSolucion: any = null;
  opcIncConSolucion: any = null;

  dataIncSinSolucion: any = null;
  opcIncSinSolucion: any = null;

  listaIncSinSolucion: string[] = [];

  canales = [
    {'id': 1, 'label': 'Web'},
    {'id': 2, 'label': 'Mobile'},
    {'id': 3, 'label': 'Correo'},
    {'id': 4, 'label': 'Telefono'}
  ]

  dias_semana = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ]

  ngOnInit(): void {
    this.initDiagramaIncXcanal();
    this.initDiagramaIncSinSolucion();
    this.initDiagramaIncConSolucion();

    this.loadchartdata();
  }

  loadchartdata() {
    let filtrado : FilterIncidente = new FilterIncidente();
    if (this.agente) {
      filtrado.agenteId = this.agente;
    }
    if (this.fechaInicio) {
      filtrado.fechaInicio = this.fechaInicio;
    }
    if (this.fechaFin) {
      filtrado.fechaFin = this.fechaFin;
    }
    if (this.tipoIncidente) {
      filtrado.tipoIncidente = this.tipoIncidente;
    }
    const company = this.getCompanyFromSession();
    if (company) {
      this.analiticaService.getIncidents(company, filtrado).subscribe({
        next: value => {

          this.total_usuarios = value.total_usuarios;
          this.incidentes_resueltos = value.incidentes_resueltos;
          this.total_incidentes = value.total_incidentes
          this.setDataXCanal(value.incidentes_canal)
          this.setDataSinSolucion(value.sin_solucion)
          this.setDataConSolucion(value.con_solucion)
          this.listaIncSinSolucion = value.lista_agentes
        }
      })
    } else {
      this.toastr.warning('No company found in session', 'Warning');
    }

  }

  getCompanyFromSession(): string | null {
    const company = sessionStorage.getItem("abcall-company");
    return company || null;
  }

  initDiagramaIncXcanal() {
    this.opcIncXCanal = <ChartOptions<'pie'>>{
      plugins: {
        legend: {
          position: 'right'
        }
      }
    };
    this.setDataXCanal([25, 25, 25, 25])
  }

  initDiagramaIncSinSolucion() {
    this.opcIncSinSolucion = <ChartOptions<'bar'>>{
      scales: {
        x: {
          beginAtZero: false
        }
      }
    };
    this.setDataSinSolucion([0, 0, 0, 0, 0, 0, 0])
  }

  initDiagramaIncConSolucion() {
    this.opcIncConSolucion = <ChartOptions<'bar'>>{
      scales: {
        y: {
          beginAtZero: false
        }
      },
      indexAxis: 'y',
    };
    this.setDataConSolucion([0, 0, 0, 0, 0, 0, 0])
  }

  setDataXCanal(data: number[]) {
    this.dataIncXCanal = <ChartConfiguration<'pie'>['data']>{
      labels: this.canales.map(x => x.label),
      datasets: [
        {
          data: data,
          label: 'Total'
        }
      ]
    };
  }

  setDataSinSolucion(data: number[]) {
    this.dataIncSinSolucion = <ChartConfiguration<'bar'>['data']>{
      labels: this.dias_semana,
      datasets: [
        {
          data: data,
          label: 'Total'
        }
      ]
    };
  }

  setDataConSolucion(data: number[]) {
    this.dataIncConSolucion = <ChartConfiguration<'bar'>['data']>{
      labels: this.dias_semana,
      datasets: [
        {
          data: data,
          label: 'Total'
        }
      ]
    };
  }

  getAgentes(): Array<Agente> {
    return this.agentes;
  }

}
