import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';

import {SKUService} from '../../services/sku.service';


import {FormBuilder, FormControl, FormGroup,NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private skuService: SKUService,
    private fb: FormBuilder
      ) {
  }
  // @ts-ignore
  @ViewChild('createPlanModalCancel') createPlanModalCancel: ElementRef;
  // @ts-ignore
  @ViewChild('createPlanModalBtn') createPlanModalBtn: ElementRef;
  // @ts-ignore
  @ViewChild('PlanNameModalBtn') PlanNameModalBtn: ElementRef;
 // @ts-ignore
 @ViewChild('commentFormModalBtn') commentFormModalBtn: ElementRef;
  // @ts-ignore
  @ViewChild('commentFormModalCancel') commentFormModalCancel: ElementRef;

  // Constants
  public mlDataPointColor = '#D8B1FD';
  public lastyearDataPointColor = '#C0504E';
  
  private aopDataPointColor = '#77A5F3';
  private actualDataPointColor = '#09C29B';
  private finalForcastPointColor = '#000000';
  public currentWeek: number;


  

  // Charts
  public chart1;
  public chart2;

  // Graph Data Data points
  public graphData: any = [];
  public weekArray: any =[];
  public finalForcastArray: any =[];
  public mlForcastArray: any = [];
  public apoForcastArray: any = [];
  public actualsForcastArray: any = [];
  public lastyearForcastArray: any = [];
  private actualDataPoints: any = [];
  private mlDataPoints: any = [];
  private aopDataPoints: any = [];
  private lastyearDataPoints: any = [];
  public finalForcastDataPoints = [];
  public plan_data = [];
  private totalData: any = {
    finalCastTotal: 0,
    apoTotal: 0,
    mlTotal: 0,
    actuals: 0,
    lastYearTotal: 0,
  };

  // Filter Options
  public skus: any = [];
  public filters: any = [];
  public searchText = '';

  // Events
  public promos: any = [];
  public weathers: any = [];
  public events: any = [];
  
    // Selected Data point
  public selectedDataPoint: any = {};

  ngOnInit() {
  
    let win = (window as any);
    console.log("dfdf->"+win.location.search);
   // win.location.search = '/?loaded';
    if(win.location.search !== '?%2F=' ) {
      win.location.search = '/?loaded';
      //win.location.reload();
  }
  //   setTimeout(function() {
  //     let win = (window as any);
  //   console.log("dfdf->"+win.location.search);
  //   if(win.location.search !== '?%2F=' ) {
  //       win.location.search = '/?loaded';
  //       //win.location.reload();
  //   }
  // }, 8000);
    
    
    
  }

  ngOnDestroy(): void {

  }
  



}
