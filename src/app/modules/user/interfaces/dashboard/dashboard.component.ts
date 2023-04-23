import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';
import Chart from 'chart.js/auto';
import { UserInfrastructure } from '../../infrastructure/user.infraestructure';

@Component({
  selector: 'nucleo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /*   @ViewChild('doughnutCanvas2') doughnutCanvas: ElementRef | undefined;
    doughnutChart: any */

  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any

  @ViewChild('barCanvas2') barCanvas2: ElementRef | undefined;
  barChart2: any

  @ViewChild('areaCanvas') areaCanvas: ElementRef | undefined;
  areaChart: any

  @ViewChild('doughnutCanvas1') doughnutCanvas1: ElementRef | undefined;
  doughnutChart1: any

  registrados = 0;
  activos = 0;
  pausados = 0;
  jefe = 0;
  prevencionista = 0;
  trabajador = 0;
  sucursales = 0;

  enero: any;
  febrero: any;
  marzo: any;
  abril: any;
  mayo: any;
  junio: any;
  julio: any;
  agosto: any;
  septiembre: any;
  octubre: any;
  noviembre: any;
  diciembre: any;

  constructor(private readonly router: Router, private readonly userAdmin: UserInfrastructure) {
  }


  async ngOnInit() {
    this.userAdmin.reporte().subscribe((data: any) => {
      this.registrados = data.todos.toString().padStart(2, 0);
      this.activos = data.activo.toString().padStart(2, 0);
      this.pausados = data.pausado.toString().padStart(2, 0);
      this.jefe = data.jefe;
      this.prevencionista = data.prevencionista;
      this.trabajador = data.trabajador;
      this.sucursales = data.sucursales;
      this.cargo(this.jefe, this.prevencionista, this.trabajador)
      this.sucursal(this.sucursales)
    });

    this.userAdmin.reporteUsabilidad().subscribe((data: any) => {
      console.log(data);
      this.enero = data?.enero;
      this.febrero = data?.febrero;
      this.marzo = data?.marzo;
      this.abril = data?.abril;
      this.mayo = data?.mayo;
      this.junio = data?.junio;
      this.julio = data?.julio;
      this.agosto = data?.agosto;
      this.septiembre = data?.septiembre;
      this.octubre = data?.octubre;
      this.noviembre = data?.noviembre;
      this.diciembre = data?.diciembre;
      this.usabilidad();
    });

  }

  usabilidad() {
 
    const etiquetas = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
    const data = {
      label: "Logs",
      data: [this.enero,
      this.febrero,
      this.marzo,
      this.abril,
      this.mayo,
      this.junio,
      this.julio,
      this.agosto,
      this.septiembre,
      this.octubre,
      this.noviembre,
      this.diciembre,], 
      backgroundColor: '#01595C', 
      borderColor: '#01595C',
      borderWidth: 1,
    };

    this.areaChart = new Chart(this.areaCanvas?.nativeElement, {

      type: 'line',
      data: {
        labels: etiquetas,
        datasets: [
          data,

        ]
      },
      options: {
        scales: {

        },
      }


    });
  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
  }

  sucursal(sucursales: any) {
    let listaSucursales = sucursales.map((data: any) => data.nombre);
    let cantidadUsers: any = [];

    sucursales.map((data: any) => {
      this.userAdmin.reporteSucursal(data.id).subscribe((data: any) => {
        cantidadUsers.push(data?.sucursal);
      });

    })

    this.barChart2 = new Chart(this.barCanvas2?.nativeElement, {
      type: 'bar',
      data: {
        labels: listaSucursales,
        datasets: [{
          data: cantidadUsers,
          label: '',
          backgroundColor: ["#01595C"],

        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            position: 'center',
          },
          title: {
            display: false,
            text: ''
          }
        },
        scales: {
          x: {
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  cargo(jefe = 0, prevencionista = 0, trabajador = 0) {
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jefe', 'Prevencionista', 'Trabajador'],
        datasets: [{
          data: [jefe, prevencionista, trabajador],
          label: '',
          backgroundColor: ["#229a8e"]
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            position: 'center',
          },
          title: {
            display: true,
            text: ''
          },

        },
        scales: {
          x: {
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  doughnutChartMethod() {
    this.doughnutChart1 = new Chart(this.doughnutCanvas1?.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Jefe', 'Prevencionista', 'Trabajador'],
        datasets: [
          {

            data: [30, 70],
            backgroundColor: [
              '#F2B600',
              '#FF6B00'
            ],
            hoverBackgroundColor: [
              '#F2B600',
              '#FF6B00'
            ],
          },
        ],
      },
    });
  }

}
