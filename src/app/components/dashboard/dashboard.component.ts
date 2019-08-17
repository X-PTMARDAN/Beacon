import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import {SKUService} from '../../services/sku.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild('createPlanModalCancel') createPlanModalCancel: ElementRef;
  // @ts-ignore
  @ViewChild('createPlanModalBtn') createPlanModalBtn: ElementRef;

  // Constants
  public mlDataPointColor = '#D8B1FD';
  private aopDataPointColor = '#77A5F3';
  private actualDataPointColor = '#09C29B';
  public currentWeek: number;

  // Charts
  public chart1;
  public chart2;

  // Data points
  private actualDataPoints = [];
  private mlDataPoints = [];
  private aopDataPoints = [];

  // Filter Options
  public skus: any = [];
  public filters: any = [];

  // Events
  public promos: any = [];
  public weathers: any = [];
  public events: any = [];

  constructor(
    private router: Router,
    private skuService: SKUService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    // this.createPlanModalBtn.nativeElement.click();

    this.skuService.getSkUList({
      filterBrands: []
    }).subscribe((res: any) => {
      this.skus = res;
    });

    this.skuService.getEvents().subscribe((res: any) => {
      this.events = res;
    });

    this.skuService.getPromos().subscribe((res: any) => {
      this.promos = res;
    });

    this.skuService.getWeathers().subscribe((res: any) => {
      this.weathers = res;
    });

    this.skuService.getFilters().subscribe((res: any) => {
      this.filters = res.filters;
    });

    this.chart2 = new CanvasJS.Chart('chartContainer2', {
      animationEnabled: true,
      theme: 'light2',
      data: [{
        type: 'column',
        showInLegend: true,
        legendMarkerColor: 'grey',
        dataPoints: [
          {y: 300878, label: 'Venezuela'},
          {y: 266455, label: 'Saudi'},
          {y: 169709, label: 'Canada'},
          {y: 158400, label: 'Iran'},
          {y: 142503, label: 'Iraq'},
          {y: 101500, label: 'Kuwait'},
          {y: 97800, label: 'UAE'},
          {y: 80000, label: 'Russia'}
        ]
      }]
    });
    this.chart2.render();

    this.currentWeek = DashboardComponent.getCurrentWeek(new Date());
  }

  ngOnDestroy(): void {

  }

  private static getCurrentWeek(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  public createPlan(data: any) {
    this.skuService.getGraphData(data).subscribe((res: any) => {
      this.processGraphData(res);
      this.chart1 = new CanvasJS.Chart('chartContainer1', {
        animationEnabled: true,
        backgroundColor: '#FFFFFF',
        axisX: {
          valueFormatString: '######',
          gridColor: '#E3E4E8',
        },
        data: [
          {
            name: 'Actual',
            showInLegend: true,
            type: 'spline',
            lineColor: this.actualDataPointColor,
            dataPoints: this.actualDataPoints
          },
          {
            name: 'ML Fcst',
            showInLegend: true,
            type: 'spline',
            lineDashType: 'dash',
            lineColor: this.mlDataPointColor,
            dataPoints: this.mlDataPoints
          },
          {
            name: 'APO Fcst',
            showInLegend: true,
            type: 'spline',
            lineDashType: 'dash',
            lineColor: this.aopDataPointColor,
            dataPoints: this.aopDataPoints
          },
          {
            name: 'Your',
            showInLegend: true,
            type: 'spline',
            dataPoints: []
          }
        ]
      });
      this.chart1.render();
      this.createPlanModalCancel.nativeElement.click();
    });
  }

  public processGraphData(data) {
    this.aopDataPoints = [];
    this.mlDataPoints = [];
    this.actualDataPoints = [];
    for (const week of data) {
      const key = week.calenderYear;

      if (week.actuals) {
        this.actualDataPoints.push({
          x: key,
          y: week.actuals,
          color: this.actualDataPointColor
        });
      }

      if (week.ml) {
        this.mlDataPoints.push({
          x: key,
          y: week.ml,
          color: this.mlDataPointColor
        });
      }

      if (week.apo) {
        this.aopDataPoints.push({
          x: key,
          y: week.apo,
          color: this.aopDataPointColor
        });
      }
    }
  }
}

