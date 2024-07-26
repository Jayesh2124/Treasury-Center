import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faBell, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js';
import { BaseUtilityModule } from '../Modules/base-utility/base-utility.module';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseUtilityModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  
  componentTitle :string =  'Dashboard'
 

  currentUser : any 

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('LoggedIn_User') || '{}' )
    if(typeof this.currentUser.name === 'undefined' )
    {
      this.currentUser.name = 'Default User'
      this.currentUser.picture = '../../assets/investment.png'
    }
    
  }
}