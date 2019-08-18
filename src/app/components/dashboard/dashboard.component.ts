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
  private finalForcastPointColor = '#000000';
  public currentWeek: number;

  // Charts
  public chart1;
  public chart2;

  // Graph Data Data points
  public graphData: any = [];
  private actualDataPoints: any = [];
  private mlDataPoints: any = [];
  private aopDataPoints: any = [];
  private finalForcastDataPoints = [];
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

  constructor(
    private router: Router,
    private skuService: SKUService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createPlanModalBtn.nativeElement.click();

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
      this.skus = data.leadSkus;
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
            name: 'Final Forcast',
            showInLegend: true,
            type: 'spline',
            lineColor: this.finalForcastPointColor,
            dataPoints: this.finalForcastDataPoints
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
    this.graphData = [];
    for (const week of data) {
      const newPoint: any = {
        finalForcast: ''
      };
      const key: string = week.calenderYear;
      newPoint.week = key.toString().slice(-2);
      newPoint.calenderYear = key;

      if (week.actuals) {
        newPoint.actuals = week.actuals;
        this.actualDataPoints.push({
          x: key,
          y: week.actuals,
          color: this.actualDataPointColor
        });
        this.totalData.actuals += week.actuals;
      }

      if (week.ml) {
        newPoint.ml = week.ml;
        this.mlDataPoints.push({
          x: key,
          y: week.ml,
          color: this.mlDataPointColor
        });
        this.totalData.mlTotal += week.ml;
      }

      if (week.apo) {
        newPoint.apo = week.apo;
        this.aopDataPoints.push({
          x: key,
          y: week.apo,
          color: this.aopDataPointColor
        });
        this.totalData.apoTotal += week.apo;
      }

      if (week.lastyear) {
        newPoint.lastyear = week.lastyear;
        this.totalData.lastYearTotal += week.lastyear;
      }

      this.graphData.push(newPoint);
    }
    console.log(this.graphData);
  }

  // Filter SKU Handlers
  public getCallback() {
    return this.filterSKUs.bind(this);
  }

  public filterSKUs(sku: string) {
    if (!this.searchText || !this.searchText.trim()) {
      return true;
    }
    const regex = new RegExp(this.searchText && this.searchText.trim(), 'ig');
    return regex.test(sku);
  }

  // Final Forcast
  public onValueInput(calenderYear: string, index: number) {

    const dpIndex = this.finalForcastDataPoints.findIndex(item => item.x === calenderYear);
    if (dpIndex > -1) {
      this.finalForcastDataPoints[dpIndex].y = parseInt(this.graphData[index].finalForcast, 10);
    } else {
      this.finalForcastDataPoints.push({
        x: calenderYear,
        y: parseInt(this.graphData[index].finalForcast, 10),
        color: this.finalForcastPointColor
      });
    }
    this.chart1.render();
  }
}
