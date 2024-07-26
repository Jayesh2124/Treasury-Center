import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  SideNavComponent,FormsModule ],
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
    
  }
}