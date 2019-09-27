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

  public num=45;
  
  ngOnInit() {



    if(window.location.href=='http://localhost:4200/portfolio')
    {
      document.getElementById("plan").style.background='#5A5F66';
      document.getElementById("portfolio").style.background='#797F87';
      document.getElementById("snop").style.background='#5A5F66';
      document.getElementById("npd").style.background='#5A5F66';
    }
    else if(window.location.href=='http://localhost:4200/portfolio?b=')
    {
      document.getElementById("npd").style.background='#797F87';
      document.getElementById("portfolio").style.background='#5A5F66';
      document.getElementById("plan").style.background='#5A5F66';

      document.getElementById("snop").style.background='#5A5F66';
    }

    else if(window.location.href=='http://localhost:4200/portfolio?a=')
    {
      document.getElementById("snop").style.background='#797F87';
      document.getElementById("portfolio").style.background='#5A5F66';
      document.getElementById("plan").style.background='#5A5F66';

      document.getElementById("npd").style.background='#5A5F66';
    }
    else{
      document.getElementById("portfolio").style.background='#5A5F66';
      document.getElementById("plan").style.background='#797F87';
      document.getElementById("snop").style.background='#5A5F66';
      document.getElementById("npd").style.background='#5A5F66';
    }
  
    

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


    
    console.log("SENDII--"+pageName +"--"+this.num);
    if(pageName=='a')
    {
      this.num=1;
      window.location.href="http://localhost:4200/portfolio?a"
     // this.router.navigate([`/portfolio`]);
    }
    else if(pageName=='b')
    {
      this.num=2;
      window.location.href="http://localhost:4200/portfolio?b"
    }

    else if(pageName=='ab')
    {
      this.num=2;
      window.location.href="http://localhost:4200/portfolio"
    }
    else if(pageName=='c')
    {
      this.num=3;
      window.location.href="http://localhost:4200/dashboard"
    }
    else if(pageName=='d')
    {
      this.num=4;
      this.onClick('revisit-plan')
    }

    
    
  }
}
