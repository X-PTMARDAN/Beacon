import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.component.html',
  styleUrls: ['./comingsoon.component.css']
})
export class ComingsoonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public iframe=true;
  public link=true;

  public fourth=false;
  public third=false;

  public second=false;

  public first=false;


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
