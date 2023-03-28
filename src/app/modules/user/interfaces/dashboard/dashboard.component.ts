import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'nucleo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('doughnutCanvas2') doughnutCanvas: ElementRef | undefined;
  doughnutChart: any

  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any

  @ViewChild('barCanvas2') barCanvas2: ElementRef | undefined;
  barChart2: any

  @ViewChild('areaCanvas') areaCanvas: ElementRef | undefined;
  areaChart: any

  @ViewChild('doughnutCanvas1') doughnutCanvas1: ElementRef | undefined;
  doughnutChart1: any


  constructor(private readonly router: Router) {
  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart1 = new Chart(this.doughnutCanvas1?.nativeElement, {
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

    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jefe', 'Prevencionista', 'Trabajador'],
        datasets: [{
          data: [120, 40, 320],
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
          }
        }
      }
    });

    this.barChart2 = new Chart(this.barCanvas2?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Minera SPENCE S.A.', 'Minera Escondida', 'Minera Cerro Colorado'],
        datasets: [{
          data: [120, 320, 150],
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
        }
      }
    });

    const $grafica = document.querySelector("#grafica");
    // Las etiquetas son las que van en el eje X. 
    const etiquetas = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"]
    // Podemos tener varios conjuntos de datos. Comencemos con uno
    const datosVentas2020 = {
      label: "Minera SPENCE S.A",
      data: [5000, 1500, 8000, 5102,9000], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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

      /*   type: 'line',
        data: {
          labels: ['Minera SPENCE S.A.', 'Minera Escondida', 'Minera Cerro Colorado'],
          datasets: [{
            data: [120, 320, 150],
            label: '',
            backgroundColor: ["#F2B600"]         
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
            }
          }
        } */
    });

  }

  ngOnInit(): void {
  }


}
