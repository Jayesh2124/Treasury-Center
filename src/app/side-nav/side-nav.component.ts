import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAnglesRight, faGauge, faChartSimple, faDollarSign, faBell, faStore, faWallet, faArrowRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  angles_right = faAnglesRight;
  gauge = faGauge
  chart = faChartSimple
  dollar = faDollarSign
  bell = faBell
  store = faStore
  wallet = faWallet
  gear = faGear
  signOut = faArrowRightFromBracket

   @ViewChild('sidebar') sidebar !: ElementRef<HTMLElement>
   @ViewChild('sidebar_toggle') sidebar_toggle !: ElementRef<HTMLElement>

  sidebarActive : boolean = false
  ngOnInit(): void {
  
  }

  toggle_sidebar()
  {
    debugger;
    // this.sidebarActive = !this.sidebarActive
    this.sidebar.nativeElement.classList.toggle("active");
  }
  
}
