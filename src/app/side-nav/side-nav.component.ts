
declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAnglesRight, faGauge, faChartSimple, faDollarSign, faBell,  faWallet, faArrowRightFromBracket, faGear, faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  angles_right = faAnglesRight;
  gauge = faGauge
  chart = faChartSimple
  dollar = faDollarSign
  bell = faBell
  profileIcon = faAddressCard
  wallet = faWallet
  gear = faGear
  signOut = faArrowRightFromBracket
  sidebarActive : boolean = false 

   @ViewChild('sidebar') sidebar !: ElementRef<HTMLElement>
   @ViewChild('sidebar_toggle') sidebar_toggle !: ElementRef<HTMLElement>

   constructor(private router:Router, private render : Renderer2 ){}
  ngOnInit(): void {
   
  }

  toggle_sidebar()
  {
    debugger;
    let element = this.sidebar.nativeElement.classList
    element.toggle("active");
  }
  
  logOut(){
    debugger;
    if(sessionStorage.length > 0 )
    {
      google.accounts.id.disableAutoSelect();
      sessionStorage.clear();
    }
    this.router.navigate(['/'])    
  }
}
