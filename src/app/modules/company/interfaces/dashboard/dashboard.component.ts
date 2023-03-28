import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'nucleo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef | undefined;
  doughnutChart: any

  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any

  @ViewChild('barCanvas2') barCanvas2: ElementRef | undefined;
  barChart2: any

  @ViewChild('barCanvas3') barCanvas3: ElementRef | undefined;
  barChart3: any

  constructor(private readonly router: Router) {
  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
    this.barChartMethod();
  }

  doughnutChartMethod() {
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

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Check’s'],
        datasets: [{
          data: [550],
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
        labels: ['Procesos'],
        datasets: [{
          data: [250],
          label: '',
          backgroundColor: ["#FDC829"]         
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

    this.barChart3 = new Chart(this.barCanvas3?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Procesos'],
        datasets: [{
          data: [850],
          label: '',
          backgroundColor: ["#01595C"]         
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
  }
  ngOnInit(): void {

  }


}
