import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import {SKUService} from '../../services/sku.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {SidebarService} from '../../services/sidebar.service';
import {FilterService} from '../../services/filter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  public createPlanRequestData: any;
  public selectedWeekIndex: number;

  // Filters
  public loadedFilters: any = [];

  // Loader
  public savePlanLoader = false;

  constructor(
    private router: Router,
    private skuService: SKUService,
    private sidebarService: SidebarService,
    private filterService: FilterService
  ) {
  }

  @ViewChild('selectOptionsModalCancel', {static: false}) selectOptionsModalCancel: ElementRef;
  @ViewChild('selectOptionsModalBtn', {static: false}) selectOptionsModalBtn: ElementRef;
  @ViewChild('PlanNameModalBtn', {static: false}) PlanNameModalBtn: ElementRef;
  // Graph Comment
  @ViewChild('commentFormModalBtn', {static: false}) commentFormModalBtn: ElementRef;
  @ViewChild('commentFormModalCancel', {static: false}) commentFormModalCancel: ElementRef;
  // Final Forecast Comment
  @ViewChild('finalForecastCommentModalBtn', {static: false}) finalForecastCommentModalBtn: ElementRef;
  @ViewChild('finalForecastCommentModalCancel', {static: false}) finalForecastCommentModalCancel: ElementRef;
  // Save and Load Filter
  @ViewChild('saveFilterModalCancel', {static: false}) saveFilterModalCancel: ElementRef;
  @ViewChild('loadFilterModalCancel', {static: false}) loadFilterModalCancel: ElementRef;


  // EventEmitter
  private eventsSubject: Subject<any> = new Subject<any>();

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
  public finalForecastArray: any = [];
  private actualDataPoints: any = [];
  private mlDataPoints: any = [];
  private aopDataPoints: any = [];
  private lastYearDataPoints: any = [];
  public finalForecastDataPoints = [];
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
  public weathers: any = [];
  public events: any = [];

  // Selected Data point
  public selectedDataPoint: any = {};
  public selectedWeekComments: any = [];

  private static getCurrentWeek(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  ngOnInit() {
    this.skuService.getSkUList({
      filterBrands: []
    }).subscribe((res: any) => {
      this.skus = res;
    });

    this.skuService.getEvents().subscribe((res: any) => {
      this.events = res;
    });

    this.skuService.getWeathers().subscribe((res: any) => {
      this.weathers = res;
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

    // SideBar Service
    this.sidebarService.getSideBarClickEvent$().subscribe((page) => {
      this.eventsSubject.next({
        page
      });
      this.selectOptionsModalBtn.nativeElement.click();
    });

    // Load Filters
    this.loadFilters();
  }

  ngAfterViewInit(): void {
    this.selectOptionsModalBtn.nativeElement.click();
  }

  ngOnDestroy(): void {

  }

  public createPlan(data: any) {
    this.createPlanRequestData = {
      startWeek: data.startWeek,
      endWeek: data.endWeek,
      forecastingGroups: data.forecastingGroups.map(item => item.name),
      customerPlanningGroup: data.customerPlanningGroup,
      plants: data.plants,
    };
    this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
      this.eventsSubject.next({
        page: null,
        reset: true,
      });
      this.processGraphData(res);
      this.createFilterObject(res);
      this.skus = data.forecastingGroups.map((item) => {
        item.isChecked = true;
        return item;
      });
      this.chart1 = new CanvasJS.Chart('chartContainer1', {
        animationEnabled: true,
        backgroundColor: '#FFFFFF',
        legend: {
          cursor: 'pointer',
          itemclick: this.toggleDataSeries.bind(this)
        },
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
      this.selectOptionsModalCancel.nativeElement.click();
    });
  }

  private toggleDataSeries(e) {
    e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
    this.chart1.render();
  }

  public processGraphData(res) {
    const data = res.res;
    this.aopDataPoints.length = 0;
    this.mlDataPoints.length = 0;
    this.actualDataPoints.length = 0;
    this.lastYearDataPoints.length = 0;
    this.finalForecastDataPoints.length = 0;
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
        fcstValueAdd: '',
        comments: [],
      };
      const key: string = week.calenderYearWeek;
      newPoint.calenderYearWeek = key;
      newPoint.week = key.toString().slice(-2);
      newPoint.calenderYear = key;

      if (week.ml !== undefined) {
        newPoint.ml = DashboardComponent.parseStringToFloat(week.ml);
        this.mlDataPoints.push({
          x: key,
          y: week.ml,
          color: this.mlDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData.mlTotal += newPoint.ml;
      }

      if (week.ml !== undefined) {
        newPoint.initialFinalForecast = week.finalforecast === undefined ? newPoint.ml : DashboardComponent.parseStringToFloat(week.finalforecast);
        newPoint.finalForecast = newPoint.initialFinalForecast;
        this.finalForecastDataPoints.push({
          x: key,
          y: newPoint.finalForecast,
          color: this.finalForecastPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData.finalCastTotal += newPoint.finalForecast;
      }

      if (week.actuals !== undefined) {
        newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.actualDataPoints.push({
          x: key,
          y: newPoint.actuals,
          color: this.actualDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData.actuals += newPoint.actuals;
      }

      if (week.fva !== undefined) {
        const value = DashboardComponent.parseStringToFloat(week.fva);
        newPoint.fcstValueAdd = value ? '' : value.toString();
        this.totalData.fsvtValueAdd += newPoint.fcstValueAdd;
      }

      if (week.apo !== undefined) {
        newPoint.apo = DashboardComponent.parseStringToFloat(week.apo);
        this.aopDataPoints.push({
          x: key,
          y: newPoint.apo,
          color: this.aopDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key,
        });
        this.totalData.apoTotal += newPoint.apo;
      }

      if (week.actualslastyear !== undefined) {
        newPoint.actualslastyear = DashboardComponent.parseStringToFloat(week.actualslastyear);
        this.lastYearDataPoints.push({
          x: key,
          y: newPoint.actualslastyear,
          color: this.lastyearDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData.lastYearTotal += newPoint.actualslastyear;
      }

      if (week.comment) {
        newPoint.comments = week.comment;
      }

      this.graphData.push(newPoint);
    }

    this.totalData.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(2));
    this.totalData.lastYearTotal = parseFloat(this.totalData.lastYearTotal.toFixed(2));
    this.totalData.actuals = parseFloat(this.totalData.actuals.toFixed(2));
    this.totalData.mlTotal = parseFloat(this.totalData.mlTotal.toFixed(2));
    this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(2));
  }

  public createFilterObject(res: any) {
    this.filters = [];

    // Push customer Planning Group
    const customerPlanningGroup = this.createPlanRequestData.customerPlanningGroup;
    this.filters.push({
      name: 'Customer Planning Groups',
      key: 'customerPlanningGroup',
      isExpanded: false,
      values: customerPlanningGroup.map(item => {
        return {name: item, isChecked: true};
      })
    });

    // Push plant
    const plant = this.createPlanRequestData.plants;
    this.filters.push({
      name: 'Plants',
      key: 'plant',
      isExpanded: false,
      values: plant.map(item => {
        return {name: item, isChecked: true};
      })
    });
  }

  private static parseStringToFloat(text) {
    return parseFloat(parseFloat(text).toFixed(2));
  }

  // Comment on Graph
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
    data.forecastingGroups = this.skus.filter(item => item.isChecked).map(item => item.name);
    data.plants = this.filters[1].values.filter(item => item.isChecked).map(item => item.name);
    data.customerPlanningGroup = this.filters[0].values.filter(item => item.isChecked).map(item => item.name);
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

  // Final Forecast
  public onValueInput(calenderYearWeek: string, index: number) {
    const dpIndex = this.finalForecastDataPoints.findIndex(item => item.calenderYear === calenderYearWeek);
    if (dpIndex > -1) {
      const value = parseFloat(this.graphData[index].fcstValueAdd);
      if (!isNaN(value)) {
        if (this.graphData[index].initialFinalForecast + value < 0) {
          this.finalForecastDataPoints[dpIndex].y = 0;
          this.graphData[index].finalForecast = 0;
        } else {
          this.finalForecastDataPoints[dpIndex].y = this.graphData[index].initialFinalForecast + value;
          this.graphData[index].finalForecast = this.graphData[index].initialFinalForecast + value;
        }
      } else {
        this.finalForecastDataPoints[dpIndex].y = this.graphData[index].initialFinalForecast;
        this.graphData[index].finalForecast = this.graphData[index].initialFinalForecast;
      }

      this.totalData.finalCastTotal = 0;
      for (const data of this.graphData) {
        if (data.finalForecast) {
          this.totalData.finalCastTotal += data.finalForecast;
        }
      }

      this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(2));
    }
    this.chart1.render();
  }

  public onValueBlur(week: string, index: number) {
    const dpIndex = this.graphData.findIndex(item => item.calenderYearWeek === week);
    if (dpIndex > -1) {
      let finalValue = -1;
      const value = parseFloat(this.graphData[index].fcstValueAdd);
      if (!isNaN(value)) {
        finalValue = this.graphData[index].initialFinalForecast + value < 0 ? 0 : this.graphData[index].initialFinalForecast + value;
      } else {
        finalValue = this.graphData[index].initialFinalForecast;
      }

      const reqBody = {
        cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name),
        plant: this.filters[1].values.filter(item => item.isChecked).map(item => item.name),
        sku: this.skus.filter(item => item.isChecked).map(item => item.name),
        user: 'admin',
        finalForecast: this.graphData[index].initialFinalForecast + finalValue,
        fva: finalValue,
        calendarWeek: week,
        comments1: 'comment1'
      };

      this.skuService.savePlan(reqBody).subscribe((res: any) => {
        console.log(res);
      });
    }
  }

  public onDblClickInput(selectedWeekIndex: number) {
    this.selectedWeekIndex = selectedWeekIndex;
    this.finalForecastCommentModalBtn.nativeElement.click();
  }

  public onFinalForecastCommentSubmit(data: any) {
    if (this.selectedWeekIndex) {
      if (this.graphData[this.selectedWeekIndex].comments.length >= 1) {
        this.graphData[this.selectedWeekIndex].comments[0] = data.comment;
        while (this.graphData[this.selectedWeekIndex].comments.length > 1) {
          this.graphData[this.selectedWeekIndex].comments.pop();
        }
      } else {
        this.graphData[this.selectedWeekIndex].comments.push(data.comment);
      }
    }
    this.finalForecastCommentModalCancel.nativeElement.click();
  }

  public putValueInFinal(val) {
    this.finalForecastArray.length = 0;
    this.finalForecastDataPoints.length = 0;
    let value_to_insert = '';
    let value_calnder = '';
    for (let i = 0; i < this.graphData.length; i++) {
      this.graphData[i].finalForecast = null;
      if (val === 'ML') {

        this.graphData[i].finalForecast = this.graphData[i].ml;
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
        this.graphData[i].finalForecast = this.graphData[i].apo;
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
        this.finalForecastArray.push({finalForecast: value_to_insert, calenderYear: value_calnder});
      }

    }
    this.chart1.render();
  }

  public savePlan(planName: string) {
    this.savePlanLoader = true;
    let cnt = 0;
    const reqBody = {
      data: {}
    };

    for (const data of this.graphData) {
      const commentsObj = {};
      for (const index in data.comments) {
        commentsObj[`comments${parseInt(index, 10) + 1}`] = data.comments[index];
      }

      if (JSON.stringify(commentsObj) !== '{}') {
        reqBody.data[cnt] = (Object.assign({
          calendarWeek: data.calenderYearWeek,
          sku: this.skus.filter(item => item.isChecked).map(item => item.name),
          cpg: this.createPlanRequestData.customerPlanningGroup,
          plant: this.createPlanRequestData.plants,
        }, commentsObj));
        cnt++;
      }
    }

    console.log(JSON.stringify(reqBody.data));

    this.skuService.confirmPlan(reqBody.data).subscribe((res: any) => {
      this.PlanNameModalBtn.nativeElement.click();
      this.savePlanLoader = false;
    }, (error) => {
      console.log(error);
      this.savePlanLoader = false;
    });
  }

  // Save and Load Filter
  public saveFilter(filterName: string) {
    this.filterService.saveFilter({
      user: 'admin',
      filterName,
      plant: this.filters[1].values.filter(item => item.isChecked).map(item => item.name),
      customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name),
      forecastingGroups: this.skus.filter(item => item.isChecked).map(item => item.name)
    }).subscribe((res: any) => {
      this.loadFilters();
      this.saveFilterModalCancel.nativeElement.click();
    });
  }

  public loadFilters() {
    this.filterService.getFilters({
      user: 'admin'
    }).subscribe((res: any) => {
      this.loadedFilters = res.map((item) => {
        item.isSelected = false;
        return item;
      });
    });
  }

  public filterItemClick(filterIndex: number) {
    for (const filter of this.loadedFilters) {
      filter.isSelected = false;
    }

    this.loadedFilters[filterIndex].isSelected = !this.loadedFilters[filterIndex].isSelected;
  }

  public loadSelectedFilter() {
    let selectedFilter;
    for (const filter of this.loadedFilters) {
      if (filter.isSelected) {
        selectedFilter = filter;
        break;
      }
    }

    // Todo: Change keys
    this.filters[1].values = selectedFilter.plant.map(item => {
      return {
        name: item,
        isChecked: true
      };
    });
    this.filters[0].values = selectedFilter.cpg.map(item => {
      return {
        name: item,
        isChecked: true
      };
    });

    this.skus = selectedFilter.sku.map(item => {
      return {
        name: item,
        isChecked: true
      };
    });

    selectedFilter.isSelected = false;
    this.onFilterCheckBoxChange();
    this.loadFilterModalCancel.nativeElement.click();
  }
}
