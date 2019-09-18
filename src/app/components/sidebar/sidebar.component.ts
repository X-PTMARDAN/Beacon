import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {
  }


  
  ngOnInit() {
   
  }



  public onClick(name: string) {
    console.log("Harshit-->"+name);
    console.log("YHYHY-->"+window.location.href);
    if(window.location.href=="http://localhost:4200/portfolio?%2F=")
    {
      window.location.href="http://localhost:4200/dashboard";
    }
    this.sidebarService.emit(name);
  }

  public goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
