import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { LayoutService } from 'src/app/config/services/layout.service';

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
  
  constructor(private layoutService: LayoutService, private readonly router: Router) {
    this.layoutService.configuration = { header: true, menu: true };
  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
    this.circleChartMethod();
  }

  circleChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement, {
      type: 'doughnut',
      data: {
        /*   labels: ['Check', 'Avances'], */
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

  doughnutChartMethod(){
    const etiquetas = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
    const datosVentas2020 = {
      label: "Minera SPENCE S.A",
      data: [5000, 1500, 8000, 5102, 9000], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
      backgroundColor: '#01595C', // Color de fondo
      borderColor: '#01595C', // Color del borde
      borderWidth: 1,// Ancho del borde
    };
    this.areaChart = new Chart(this.areaCanvas?.nativeElement, {

      type: 'line',// Tipo de gráfica
      data: {
        labels: etiquetas,
        datasets: [
          datosVentas2020,
          // Aquí más datos...
        ]
      },
      options: {
        scales: {

        },
      }
    });
  }
  ngOnInit(): void {
    
  }

  

}
