import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { LayoutService } from 'src/app/config/services/layout.service';
import { UserInfrastructure } from 'src/app/modules/user/infrastructure/user.infraestructure';

@Component({
  selector: 'nucleo-dashboard-principal',
  templateUrl: './dashboard-principal.component.html',
  styleUrls: ['./dashboard-principal.component.scss']
})
export class DashboardPrincipalComponent implements OnInit {

  @ViewChild('areaCanvas') areaCanvas: ElementRef | undefined;
  areaChart: any

  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef | undefined;

  doughnutChart: any
  propietarios: any;
  empresas: any;
  sucursales: any;
  proyectos: any;

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

  constructor(private layoutService: LayoutService, private readonly router: Router, private readonly userAdmin: UserInfrastructure) {
    this.layoutService.configuration = { header: true, menu: true };
  }

  ngAfterViewInit() {
    this.circleChartMethod();
  }

  circleChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement, {
      type: 'doughnut',
      data: {
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

  doughnutChartMethod() {
    const etiquetas = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const data = {
      label: "Logs",
      data: [
        this.enero,
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
        this.diciembre,
      ], 
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
          x: {
            ticks: {
              precision: 0
            }
          },
          y: {
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.userAdmin.reporteEmpresas().subscribe((data: any) => {

      this.propietarios = data?.propietarios.toString().padStart(2, 0);
      this.empresas = data?.empresas.toString().padStart(2, 0);
      this.sucursales = data?.sucursales.toString().padStart(2, 0);
      this.proyectos = data?.proyectos.toString().padStart(2, 0);
    }
    );

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
      this.doughnutChartMethod();
    });
   
  }
  
}
