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
    this.sidebarService.emit(name);
  }

  public goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
