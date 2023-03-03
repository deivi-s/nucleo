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

  constructor(private readonly router: Router) {
  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement, {
      type: 'doughnut',
      data: {
      /*   labels: ['Check', 'Avances'], */
        datasets: [
          {

            data: [30,70],
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

  ngOnInit(): void {
  }


}
