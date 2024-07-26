import { Component, Input, OnInit } from '@angular/core';
import { BaseUtilityModule } from '../Modules/base-utility/base-utility.module';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BaseUtilityModule, SideNavComponent,MatIconModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Input ('title') title !: string 

  currentUser : any 
  magnify = faMagnifyingGlass
  bell = faBell
  accountBalance :number = 20000

  constructor(private router: Router){}

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('LoggedIn_User') || '{}' )
    if(typeof this.currentUser.name === 'undefined' )
    {
      this.currentUser.name = 'Default User'
      this.currentUser.picture = '../../assets/investment.png'
    }
    if(this.currentUser == '{}' )
      this.router.navigate(['/'])
  }
  
}
