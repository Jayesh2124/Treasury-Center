import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Treasury-Center';

  chart: any = []
  polarChart: any = []
  doughnutChart: any = []
  lineChart: any = []
  lineChart2: any = []

  pieChart : any = []
  pieChart_1 : any = []

  ngOnInit(): void {

    //  const labels = Utils.months({count: 7});
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'July'],
      datasets: [{
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const polarChartData = {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ],
      datasets: [{
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };
    this.polarChart = new Chart('polarCanvas', {
      type: 'polarArea',
      data: polarChartData,
      options: {
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });

    const doughnutData = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    this.doughnutChart = new Chart('doughnutCanvas', {
      type: 'doughnut',
      data: doughnutData,
      options: {
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'rgb(255, 99, 132)'
            }
          }
        }
      }
    });

    const lineData = {
      labels:  ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    // this.lineChart = new Chart('lineCanvas', {
    //   type: 'line',
    //   data: data,
    //   options: {
    //     plugins: {
    //       legend: {
    //         display: false,
    //       }
    //     }
    //   }
    // })
    this.lineChart2 = new Chart('lineCanvas_2', {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    })

    const pieData = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    this.pieChart = new Chart('pieCanvas',{
      type: 'pie',
      data: pieData,
      options: {
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
    this.pieChart_1 = new Chart('pieCanvas_1',{
      type: 'pie',
      data: pieData,
      options: {
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  }
}