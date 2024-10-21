import {Component} from '@angular/core';
import {ChartConfiguration, ChartOptions, Chart, registerables} from "chart.js";

Chart.register(...registerables)

import data from '../incidentes_data.json';
import {FormsModule} from "@angular/forms";
import {BaseChartDirective} from "ng2-charts";

interface Agente {
  id: number;
  nombre: string;
}

interface Resultados {
  id:string;
  fecha:string;
  idAgente: string;
  idUsuario:number;
  tipoIncidente:number;
  resuelto:boolean;
  canal:number;
}


@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    FormsModule,
    BaseChartDirective
  ],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {

  resultados: Resultados[]=[];
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

  dataIncXCanal: any = null;
  opcIncXCanal: any = null;

  dataIncConSolucion: any = null;
  opcIncConSolucion: any = null;

  dataIncSinSolucion: any = null;
  opcIncSinSolucion: any = null;

  listaIncSinSolucion: any[] = [];

  canales = [
    {'id': 1, 'label': 'Web'},
    {'id': 2, 'label': 'Movil'},
    {'id': 3, 'label': 'Correo'},
    {'id': 4, 'label': 'Telefono'}
  ]

  dias_semana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
  ]

  ngOnInit(): void {
    this.initDiagramaIncXcanal();
    this.initDiagramaIncSinSolucion();
    this.initDiagramaIncConSolucion();

    this.loadchartdata();
  }

  loadchartdata() {
    this.resultados = (data as Resultados[])
      .filter(value => {
        return this.fechaInicio ? new Date(value.fecha) >= new Date(this.fechaInicio) : true
      })
      .filter(value => {
        return this.fechaFin ? new Date(value.fecha) <= new Date(this.fechaFin) : true
      })
      .filter(value => {
        return this.tipoIncidente ? value.tipoIncidente == this.tipoIncidente : true
      })
      .filter(value => {
        return this.agente ? value.idAgente == this.agente : true
      })

    this.total_usuarios = new Set(this.resultados.map(x => x.idUsuario)).size
    this.incidentes_resueltos = this.resultados.filter(x => x.resuelto).length

    this.calcularDataXCanal()
    this.calcularDataSinSolucion()
    this.calcularDataConSolucion()
    this.calcularDataAgentes(2)
  }

  // DIAGRAMA DE INCIDENTES POR CANAL
  calcularDataXCanal() {
    let contador = new Array(this.canales.length);
    this.resultados.forEach( value => {
      const {canal} = value;
      const index = this.canales.findIndex(x => x.id == canal);
      if (index >= 0) {
        contador[index] = (contador[index] || 0) + 1;
      }
    })
    this.setDataXCanal(contador)
  }

  // DIAGRAMA DE INCIDENTES NO RESUELTOS POR SEMANA
  calcularDataSinSolucion() {
    let contador = new Array(this.dias_semana.length);
    this.resultados.filter(value => !value.resuelto).forEach( value => {
      const diaSemana = new Date(value.fecha).getDay();
      contador[diaSemana] = (contador[diaSemana] || 0) + 1;
    })
    this.setDataSinSolucion(contador)
  }

  // DIAGRAMA DE INCIDENTES RESUELTOS POR SEMANA
  calcularDataConSolucion() {
    let contador = new Array(this.dias_semana.length);
    this.resultados.filter(value => value.resuelto).forEach( value => {
      const diaSemana = new Date(value.fecha).getDay();
      contador[diaSemana] = (contador[diaSemana] || 0) + 1;
    })
    this.setDataConSolucion(contador)
  }

  // Calcular incidentes sin resolver por agente
  calcularDataAgentes(n=2) {
    let contador:any = {};
    this.agentes.forEach( value => {
      contador[value.id] = {...value, 'sinSolucion': 0}
    })
    this.resultados.filter(value => !value.resuelto).forEach( value => {
      const idAgente =value.idAgente;
      if (contador.hasOwnProperty(idAgente)) {
        contador[idAgente]['sinSolucion'] += 1;
      }
    })
    this.listaIncSinSolucion = Object.values(contador).sort((a: any, b: any) => b['sinSolucion'] - a['sinSolucion']).slice(0, n);
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

}
