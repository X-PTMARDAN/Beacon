import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import {SKUService} from '../../services/sku.service';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public activeStepNum: number;
  public activeStep = 'plan';

  public createPlanRequestData: any;

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

  // EventEmitter
  private eventsSubject: Subject<void> = new Subject<void>();

  // Constants
  public mlDataPointColor = '#D8B1FD';
  public lastyearDataPointColor = '#C0504E';

  private aopDataPointColor = '#77A5F3';
  private actualDataPointColor = '#09C29B';
  private finalForecastPointColor = '#000000';
  public currentWeek: number;

  // Charts
  public chart1;
  public chart2;

  // Graph Data Data points
  public graphData: any = [];
  public weekArray: any = [];
  public finalForcastArray: any = [];
  public mlForcastArray: any = [];
  public apoForcastArray: any = [];
  public actualsForcastArray: any = [];
  public lastyearForcastArray: any = [];
  private actualDataPoints: any = [];
  private mlDataPoints: any = [];
  private aopDataPoints: any = [];
  private lastYearDataPoints: any = [];
  public finalForecastDataPoints = [];
  public plan_data = [];
  private totalData: any = {
    finalCastTotal: 0,
    fsvtValueAdd: 0,
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
        }, {y: 18, x: 7}, {y: 1, x: 8}, {y: 15, x: 9}, {y: 4, x: 2}, {y: 13, x: 11}, {y: 16, x: 12}, {
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

  public createPlan_visit(data: any) {
    this.skuService.getGraphData(data).subscribe((res: any) => {
      this.processGraphData_cook(res);
      this.skus = data.leadSkus;
      this.chart1 = new CanvasJS.Chart('chartContainer1', {
        animationEnabled: true,
        backgroundColor: '#FFFFFF',
        axisX: {
          valueFormatString: '######',
          gridColor: '#ffffff',
        },
        axisY: {
          valueFormatString: '######',
          gridColor: '#ffffff',
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
            name: 'Actual Last Year',
            showInLegend: true,
            type: 'spline',
            lineColor: this.lastyearDataPointColor,
            dataPoints: this.lastYearDataPoints
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
            name: 'Final Forecast',
            showInLegend: true,
            type: 'spline',
            lineColor: this.finalForecastPointColor,
            dataPoints: this.finalForecastDataPoints
          }
        ]
      });
      this.chart1.render();
      this.createPlanModalCancel.nativeElement.click();
    });
  }

  public createPlan(data: any) {
    this.createPlanRequestData = {
      startWeek: data.startWeek,
      endWeek: data.endWeek,
      leadSkus: data.leadSkus.map(item => item.name),
      customerPlanningGroup: data.customerPlanningGroup,
      plant: data.plant,
    };
    this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
      this.eventsSubject.next();
      this.processGraphData(res);
      this.skus = data.leadSkus.map((item) => {
        item.isChecked = true;
        return item;
      });
      this.chart1 = new CanvasJS.Chart('chartContainer1', {
        animationEnabled: true,
        backgroundColor: '#FFFFFF',
        axisX: {
          valueFormatString: '######',
          gridColor: '#ffffff',
        },
        axisY: {
          valueFormatString: '######',
          gridColor: '#ffffff',
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
            name: 'Actual Last Year',
            showInLegend: true,
            type: 'spline',
            lineColor: this.lastyearDataPointColor,
            dataPoints: this.lastYearDataPoints
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
            name: 'Final Forecast',
            showInLegend: true,
            type: 'spline',
            lineColor: this.finalForecastPointColor,
            dataPoints: this.finalForecastDataPoints
          }
        ]
      });
      this.chart1.render();
      this.createPlanModalCancel.nativeElement.click();
    });
  }

  public processGraphData(res) {
    const data = res[1].data;
    this.aopDataPoints = [];
    this.mlDataPoints = [];
    this.actualDataPoints = [];
    this.lastYearDataPoints = [];
    this.graphData = [];

    this.totalData = {
      finalCastTotal: 0,
      fsvtValueAdd: 0,
      apoTotal: 0,
      mlTotal: 0,
      actuals: 0,
      lastYearTotal: 0,
    };

    for (const week of data) {
      const newPoint: any = {
        fcstValueAdd: ''
      };
      const key: string = week.calenderYearWeek;
      newPoint.week = key.toString().slice(-2);
      newPoint.calenderYear = key;

      if (week.finalforecast) {
        newPoint.initialFinalForecast = parseFloat(week.finalforecast.toFixed(2));
        newPoint.finalForecast = parseFloat(week.finalforecast.toFixed(2));
        this.finalForecastDataPoints.push({
          x: key,
          y: newPoint.finalForecast,
          color: this.finalForecastPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.finalCastTotal += newPoint.finalForecast;
      }

      if (week.actuals) {
        newPoint.actuals = parseFloat(week.actuals.toFixed(2));
        this.actualDataPoints.push({
          x: key,
          y: week.actuals,
          color: this.actualDataPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.actuals += newPoint.actuals;
      }

      if (week.ml) {
        newPoint.ml = parseFloat(week.ml.toFixed(2));
        this.mlDataPoints.push({
          x: key,
          y: week.ml,
          color: this.mlDataPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.mlTotal += newPoint.ml;
      }

      if (week.fva) {
        newPoint.fcstValueAdd = week.fva;
        this.totalData.fsvtValueAdd += newPoint.fcstValueAdd;
      }

      if (week.apo) {
        newPoint.apo = parseFloat(week.apo.toFixed(2));
        this.aopDataPoints.push({
          x: key,
          y: newPoint.apo,
          color: this.aopDataPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.apoTotal += newPoint.apo;
      }

      if (week.actualslastyear) {
        newPoint.actualslastyear = parseFloat(week.actualslastyear.toFixed(2));
        this.lastYearDataPoints.push({
          x: key,
          y: newPoint.actualslastyear,
          color: this.lastyearDataPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.lastYearTotal += newPoint.actualslastyear;
      }

      this.graphData.push(newPoint);
    }
  }

  public dataPointClick(e) {
    if (this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment) {
      alert(this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment);
    } else {
      // Show Comment Form
      this.selectedDataPoint = e;
      this.commentFormModalBtn.nativeElement.click();
    }
  }

  public onCommentFormSubmit(form: NgForm, data: any) {
    this.commentFormModalCancel.nativeElement.click();
    const e = this.selectedDataPoint;
    this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].markerType = 'triangle';
    this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment = data.comment;
    this.chart1.render();

    form.resetForm();
    this.selectedDataPoint = null;
  }

  public processGraphData_cook(data) {

    // console.log('DEEPAK DATA : '+JSON.stringify(data));

    const graphData = this.getCookie('graphData');
    console.log('COOKIE GRAPH DATA : ' + graphData);

    if (graphData.length != 0) {
      data = JSON.parse(graphData);
      const finalForArr = this.getCookie('finalForecast');
      const finalForDataPoint = this.getCookie('finalForecastDataPoint');

      this.finalForcastArray = JSON.parse(finalForArr);
      this.finalForecastDataPoints = JSON.parse(finalForDataPoint);
    }


    this.aopDataPoints = [];
    this.mlDataPoints = [];
    this.actualDataPoints = [];
    this.lastYearDataPoints = [];
    this.graphData = [];

    this.weekArray = [];
    this.finalForcastArray = [];
    this.mlForcastArray = [];
    this.apoForcastArray = [];
    this.actualsForcastArray = [];
    this.lastyearForcastArray = [];

    let pushobj;
    for (const week of data) {


      const year = week.calenderYear;
      const weeknumber = year.toString().slice(-2);

      if (weeknumber < 41 && weeknumber > 24 && week.lastyear != undefined) {
        this.weekArray.push({week: weeknumber});
        this.finalForcastArray.push({calenderYear: '', finalForcast: ''});
      }

      if (week.ml != undefined) {
        pushobj = {calenderYear: week.calenderYear, ml: week.ml};
        this.mlForcastArray.push(pushobj);
      }

      if (week.apo != undefined) {
        pushobj = {calenderYear: week.calenderYear, apo: week.apo};
        this.apoForcastArray.push(pushobj);
      }

      if (week.actuals != undefined) {
        pushobj = {calenderYear: week.calenderYear, actuals: week.actuals};
        this.actualsForcastArray.push(pushobj);
      }

      if (week.lastyear != undefined) {
        pushobj = {calenderYear: week.calenderYear, lastyear: week.lastyear};
        this.lastyearForcastArray.push(pushobj);
      }


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
        this.lastYearDataPoints.push({
          x: key,
          y: week.lastyear,
          color: this.lastyearDataPointColor,
          click: this.dataPointClick.bind(this),
        });
        this.totalData.lastYearTotal += week.lastyear;


        // newPoint.lastyear = week.lastyear;
        // this.totalData.lastYearTotal += week.lastyear;
      }

      this.graphData.push(newPoint);
    }

    console.log(' weekArray DATA :  ' + JSON.stringify(this.weekArray));
    console.log(' mlForcastArray DATA :  ' + JSON.stringify(this.mlForcastArray));
    console.log(' apoForcastArray DATA :  ' + JSON.stringify(this.apoForcastArray));
    console.log(' actualsForcastArray DATA :  ' + JSON.stringify(this.actualsForcastArray));
    console.log(' lastyearForcastArray DATA :  ' + JSON.stringify(this.lastyearForcastArray));
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

  public onFilterCheckBoxChange() {
    const data = Object.assign({leadSkus: []}, this.createPlanRequestData);
    data.leadSkus = this.skus.filter(item => item.isChecked).map(item => item.name);
    this.skuService.getGraphData(data).subscribe((res: any) => {
      this.processGraphData(res);
      this.chart1.render();
    });
  }

  public clearAllSKUs() {
    let requestData = false;

    for (const sku of this.skus) {
      if (sku.isChecked) {
        sku.isChecked = false;
        requestData = true;
      }
    }

    if (requestData) {
      const data = Object.assign({leadSkus: []}, this.createPlanRequestData);
      data.leadSkus = [];
      this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
        this.processGraphData(res);
        this.chart1.render();
      });
    }
  }

  // Final Forcast
  public onValueInput(week: string, index: number) {

    const dpIndex = this.graphData.findIndex(item => item.week === week);
    if (dpIndex > -1) {
      const value = parseInt(this.graphData[index].fcstValueAdd, 10);
      if (!isNaN(value)) {
        this.finalForecastDataPoints[dpIndex].y += value;
      } else {
        this.finalForecastDataPoints[dpIndex].y = this.graphData[index].initialFinalForecast;
      }
    }
    this.chart1.render();
  }

  public putValueInFinal(val) {
    this.finalForcastArray.length = 0;
    this.finalForecastDataPoints.length = 0;
    let value_to_insert = '';
    let value_calnder = '';
    for (let i = 0; i < this.graphData.length; i++) {
      this.graphData[i].finalForcast = null;
      if (val === 'ML') {

        this.graphData[i].finalForcast = this.graphData[i].ml;
        this.finalForecastDataPoints.push({
          x: this.graphData[i].calenderYear,
          y: this.graphData[i].ml,
          color: this.finalForecastPointColor
        });
        if (this.graphData[i].ml !== undefined) {
          value_to_insert = this.graphData[i].ml;
          value_calnder = this.graphData[i].calenderYear;
        }


      }
      if (val === 'APO') {
        this.graphData[i].finalForcast = this.graphData[i].apo;
        this.finalForecastDataPoints.push({
          x: this.graphData[i].calenderYear,
          y: this.graphData[i].apo,
          color: this.finalForecastPointColor
        });

        if (this.graphData[i].ml !== undefined) {
          value_to_insert = this.graphData[i].apo;
          value_calnder = this.graphData[i].calenderYear;
        }
      }

      if (value_to_insert !== '' && value_calnder !== '') {
        this.finalForcastArray.push({finalForcast: value_to_insert, calenderYear: value_calnder});
      }

    }
    this.chart1.render();

    console.log('finalForecastDataPoints : ' + val + JSON.stringify(this.finalForecastDataPoints));


  }

  public savePlan() {
    // let plan_name = document.getElementById('plan_name').value;
    this.setCookie('graphData', JSON.stringify(this.graphData), 30);

    this.setCookie('finalForecast', JSON.stringify(this.finalForcastArray), 30);
    this.setCookie('finalForecastDataPoint', JSON.stringify(this.finalForecastDataPoints), 30);

    this.PlanNameModalBtn.nativeElement.click();

  }

  public setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';

  }

  public getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  public promptComment() {
    this.commentFormModalBtn.nativeElement.click();
  }
}
