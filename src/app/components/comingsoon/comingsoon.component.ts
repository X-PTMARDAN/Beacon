import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.component.html',
  styleUrls: ['./comingsoon.component.css']
})
export class ComingsoonComponent implements OnInit {

  constructor(private router: Router) {
    
  }

  public iframe=true;
  public link=true;

  public fourth=false;
  public third=false;

  public second=false;

  public first=false;

  public isReady=true;
  public isNotReady=false;

  ngOnInit() {
    

console.log("fgaf"+window.location.href);

    if( window.location.href == 'http://'+window.location.hostname+':4200/comingsoon?b=' || 
    window.location.href == 'http://'+window.location.hostname+':4200/comingsoon?bcd=' ||  window.location.href == 'https://'+window.location.hostname+':4200/comingsoon?bcd=' ||  window.location.href == 'https://'+window.location.hostname+':4200/comingsoon?b=')
    {
      this.isReady = false;
      this.isNotReady=true;
      console.log("Fgsdfgdgf");
    }
  }

  public graph(src1)
  {
    this.iframe=false;
    this.link=true;
    this.first=false;
    this.second=false;
    this.third=false;
    this.fourth=false;
    if(src1=='a')
    {
      this.first=true;
    }
    else if(src1=='b')
    {
      this.second=true;
    }
    else if(src1=='c')
    {
this.third=true;
    }
    else if(src1=='d')
    {
      this.fourth=true;
    }
  }

}
