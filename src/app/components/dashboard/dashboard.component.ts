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
  @ViewChild('commentFormModalBtn') commentFormModalBtn: ElementRef;
  // @ts-ignore
  @ViewChild('commentFormModalCancel') commentFormModalCancel: ElementRef;

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

  // Selected Data point
  public selectedDataPoint: any = {};

  private static getCurrentWeek(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
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
        color: '#09C29B',
        legendMarkerColor: 'grey',
        dataPoints: [{y: 10, x: 1}, {y: 15, x: 2}, {y: 17, x: 3}, {y: 12, x: 4}, {y: 6, x: 5}, {
          y: 2,
          x: 6
        }, {y: 18, x: 7}, {y: 1, x: 8}, {y: 15, x: 9}, {y: 4, x: 10}, {y: 13, x: 11}, {y: 16, x: 12}, {
          y: 3,
          x: 13
        }, {y: 19, x: 14}, {y: 9, x: 15}, {y: 15, x: 16}, {y: 16, x: 17}, {y: 11, x: 18}, {y: 9, x: 19}, {
          y: 5,
          x: 20
        }, {y: 7, x: 21}, {y: 2, x: 22}, {y: 11, x: 23}, {y: 5, x: 24}, {y: 19, x: 25}, {y: 11, x: 26}, {
          y: 2,
          x: 27
        }, {y: 15, x: 28}, {y: 17, x: 29}, {y: 10, x: 30}, {y: 19, x: 31}, {y: 6, x: 32}, {y: 5, x: 33}, {
          y: 14,
          x: 34
        }, {y: 19, x: 35}, {y: 19, x: 36}, {y: 18, x: 37}, {y: 1, x: 38}, {y: 17, x: 39}, {y: 4, x: 40}, {
          y: 8,
          x: 41
        }, {y: 14, x: 42}, {y: 2, x: 43}, {y: 11, x: 44}, {y: 9, x: 45}, {y: 15, x: 46}, {y: 4, x: 47}, {
          y: 0,
          x: 48
        }, {y: 6, x: 49}, {y: 1, x: 50}, {y: 3, x: 51}, {y: 6, x: 52}, {y: 3, x: 53}, {y: 4, x: 54}, {
          y: 18,
          x: 55
        }, {y: 5, x: 56}, {y: 0, x: 57}, {y: 13, x: 58}, {y: 15, x: 59}, {y: 17, x: 60}, {y: 5, x: 61}, {
          y: 10,
          x: 62
        }, {y: 19, x: 63}, {y: 7, x: 64}, {y: 6, x: 65}, {y: 10, x: 66}, {y: 8, x: 67}, {y: 13, x: 68}, {
          y: 17,
          x: 69
        }, {y: 0, x: 70}, {y: 10, x: 71}]
      }]
    });
    this.chart2.render();

    this.currentWeek = DashboardComponent.getCurrentWeek(new Date());
  }

  ngOnDestroy(): void {

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
        toolTip: {
          content: '{name}: {y}'
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
          color: this.actualDataPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.actuals += week.actuals;
      }

      if (week.ml) {
        newPoint.ml = week.ml;
        this.mlDataPoints.push({
          x: key,
          y: week.ml,
          color: this.mlDataPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.mlTotal += week.ml;
      }

      if (week.apo) {
        newPoint.apo = week.apo;
        this.aopDataPoints.push({
          x: key,
          y: week.apo,
          color: this.aopDataPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.apoTotal += week.apo;
      }

      if (week.lastyear) {
        newPoint.lastyear = week.lastyear;
        this.totalData.lastYearTotal += week.lastyear;
      }

      this.graphData.push(newPoint);
    }
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
        color: this.finalForcastPointColor,
        click: this.dataPointClick.bind(this),
      });
    }
    this.chart1.render();
  }

  // Canvas Data points on click
  public dataPointClick(e) {
    if (this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment) {
      alert(this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment);
    } else {
      // Show Comment Form
      this.selectedDataPoint = e;
      this.commentFormModalBtn.nativeElement.click();
    }
  }

  public onCommentFormSubmit(data: any) {
    const e = this.selectedDataPoint;
    this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].markerType = 'triangle';
    this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment = data.comment;
    this.chart1.render();
    this.commentFormModalCancel.nativeElement.click();
    this.selectedDataPoint = null;
  }
}
