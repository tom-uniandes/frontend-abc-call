import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";

Chart.register(...registerables)

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  data1 = [
    {'label': 'Enero', 'value': 10},
    {'label': 'Febrero', 'value': 32},
    {'label': 'Marzo', 'value': 45},
    {'label': 'Abril', 'value': 87},
    {'label': 'Mayo', 'value': 12},
    {'label': 'Junio', 'value': 90},
  ]
  data2 = [
    {'label': 'Enero', 'value': 10},
    {'label': 'Febrero', 'value': 32},
    {'label': 'Marzo', 'value': 45},
    {'label': 'Abril', 'value': 87},
    {'label': 'Mayo', 'value': 12},
    {'label': 'Junio', 'value': 90},
    {'label': 'Julio', 'value': 98},
    {'label': 'Agosto', 'value': 32},
    {'label': 'Septiembre', 'value': 12},
    {'label': 'Octubre', 'value': 65},
    {'label': 'Noviembre', 'value': 34},
    {'label': 'Diciembre', 'value': 78},
  ]
  data3 = [
    {'label': 'Enero', 'value': 10},
    {'label': 'Febrero', 'value': 32},
    {'label': 'Marzo', 'value': 45},
    {'label': 'Abril', 'value': 87},
    {'label': 'Mayo', 'value': 12},
    {'label': 'Junio', 'value': 90},
    {'label': 'Julio', 'value': 98},
    {'label': 'Agosto', 'value': 32},
    {'label': 'Septiembre', 'value': 12},
    {'label': 'Octubre', 'value': 65},
    {'label': 'Noviembre', 'value': 34},
    {'label': 'Diciembre', 'value': 78},
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.loadchartdata();
  }

  loadchartdata() {
    this.Renderpiechart('Incidentes por canal', 'data1', this.data1);
    this.RenderbarchartX('Incidentes Resueltos', 'data2', this.data2);
    this.RenderbarchartY('Total Incidentes', 'data3', this.data3);
  }

  RenderbarchartX(label: string, id: string, data: any[]) {
    const dataChart = {
      labels: data.map(x => x.label),
      datasets: [{
        label: label,
        data: data.map(x => x.value),
      }]
    };
    const mychar = new Chart(id, {
      type: 'bar',
      data: dataChart,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  RenderbarchartY(label: string, id: string, data: any[]) {
    const dataChart = {
      labels: data.map(x => x.label),
      datasets: [{
        label: label,
        data: data.map(x => x.value),
      }]
    };
    const mychar = new Chart(id, {
      type: 'bar',
      data: dataChart,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        indexAxis: 'y',
      },
    });
  }

  Renderpiechart(label: string, id: string, data: any[]) {
    const dataChart = {
      labels: data.map(x => x.label),
      datasets: [{
        label: label,
        data: data.map(x => x.value),
      }]
    }
    const mychar = new Chart(id, {
      type: 'pie',
      data: dataChart,
      options: {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

}
