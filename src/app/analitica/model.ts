

export interface Agente {
  id: number;
  nombre: string;
}

export interface Resultados {
  id:string;
  fecha:string;
  idAgente: string;
  idUsuario:number;
  tipoIncidente:number;
  resuelto:boolean;
  canal:number;
}

export class FilterIncidente {
  agenteId: string = '';
  tipoIncidente: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
}

export interface ResultadoIncidente {
  total_incidentes: number;
  total_usuarios: number;
  incidentes_resueltos:number;
  incidentes_canal: number[];
  sin_solucion: number[];
  con_solucion: number[];
  lista_agentes: string[];
}
/***
 {
 total_incidentes: number,
 total_usuarios: number,
 incidentes_resueltos: number,
incidentes_canal: [0,0,0,0],
   sin_solucion: [0,0,0,0,0,0,0],
 con_solucion: [0,0,0,0,0,0,0],
   lista_agentes: ['Juan', 'Pedro'],

 }
 */
