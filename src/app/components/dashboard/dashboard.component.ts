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
  @ViewChild('selectOptionsModalCancel', {static: false}) selectOptionsModalCancel: ElementRef;
  @ViewChild('selectOptionsModalBtn', {static: false}) selectOptionsModalBtn: ElementRef;
  @ViewChild('PlanNameModalBtn', {static: false}) PlanNameModalBtn: ElementRef;
  @ViewChild('ViewNameModalBtn', {static: false}) ViewNameModalBtn: ElementRef;
  // Graph Comment
  @ViewChild('commentFormModalBtn', {static: false}) commentFormModalBtn: ElementRef;
  @ViewChild('commentFormModalCancel', {static: false}) commentFormModalCancel: ElementRef;
  // Final Forecast Comment
  @ViewChild('finalForecastCommentModalBtn', {static: false}) finalForecastCommentModalBtn: ElementRef;
  @ViewChild('finalForecastCommentModalCancel', {static: false}) finalForecastCommentModalCancel: ElementRef;
  // Save and Load Filter
  @ViewChild('saveFilterModalCancel', {static: false}) saveFilterModalCancel: ElementRef;
  @ViewChild('loadFilterModalCancel', {static: false}) loadFilterModalCancel: ElementRef;

  public createPlanRequestData: any;
  public selectedWeekIndex: number;
  public currentWeek: number;

  // Filters
  public loadedFilters: any = [];

  // Loader
  public savePlanLoader = false;
  public saveViewLoader = false;

  // EventEmitter
  public eventsSubject: Subject<any> = new Subject<any>();

  // Constants
  private lastyearDataPointColor = '#C0504E';
  private finalForecastPointColor = '#000000';
  private aopDataPointColor = '#6495ED';
  private actualDataPointColor = '#006400';
  private mlDataPointColor = '#ADD8E6';

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
  public totalData: any = {
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

  constructor(
    private router: Router,
    private skuService: SKUService,
    private sidebarService: SidebarService,
    private filterService: FilterService
  ) {
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


      data: [{
        type: 'line',
        gridColor: '#ffffff',
        labelFontColor: 'black',
        legendMarkerColor: '#000',
        dataPoints: [


          {y: 10, x: 201912},
          {y: 10, x: 201913},
          {y: 10, x: 201914},
          {y: 10, x: 201915},
          {y: 10, x: 201916},
          {y: 10, x: 201917},
          {y: 10, x: 201918},
          {y: 10, x: 201919},
          {y: 10, x: 201920},
          {y: 20, x: 201921},
          {y: 35, x: 201922},
          {y: 17, x: 201923},
          {y: 20, x: 201924},
          {y: 13, x: 201925},
          {y: 18, x: 201926},
          {y: 21, x: 201927},
          {y: 10, x: 201928},
          {y: 20, x: 201929},
          {y: 35, x: 201930},
          {y: 17, x: 201931},
          {y: 20, x: 201932},
          {y: 13, x: 201933},
          {y: 18, x: 201934},
          {y: 21, x: 201935},
          {y: 10, x: 201936},
          {y: 20, x: 201937},
          {y: 35, x: 201938},
          {y: 17, x: 201939},
          {y: 20, x: 201940},
          {y: 13, x: 201941},
          {y: 18, x: 201942},
          {y: 21, x: 201943},
          {y: 10, x: 201944},
          {y: 20, x: 201945},
          {y: 35, x: 201946},
          {y: 17, x: 201947},
          {y: 20, x: 201948},
          {y: 13, x: 201949},
          {y: 13, x: 201950},

        ]
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

  private static getCurrentWeek(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
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
        exportEnabled: true,
        backgroundColor: '#FFFFFF',
        legend: {
          cursor: 'pointer',
          itemclick: this.toggleDataSeries.bind(this)
        },
        axisX: {
          valueFormatString: '######',
          gridColor: '#ffffff',
          scaleBreaks: {
            type: 'blank',
            spacing: 0,
            customBreaks: [
              {
                startValue: 201953,
                endValue: 202000
              },
              {
                startValue: 202053,
                endValue: 202100
              },
              {
                startValue: 202153,
                endValue: 202200
              },
              {
                startValue: 202253,
                endValue: 202300
              }
            ]
          },
          stripLines: [
            {
              startValue: this.createPlanRequestData.startWeek,
              endValue: this.createPlanRequestData.endWeek,
              color: '#F2F3F5'
            }
          ]
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
            name: 'Actuals',
            showInLegend: true,
            type: 'spline',
            legendMarkerColor: this.actualDataPointColor,
            lineColor: this.actualDataPointColor,
            dataPoints: this.actualDataPoints
          },
          {
            name: 'Actual LY',
            showInLegend: true,
            type: 'line',
            lineDashType: "dash",
            legendMarkerColor: this.lastyearDataPointColor,
            lineColor: this.lastyearDataPointColor,
            dataPoints: this.lastYearDataPoints
          },
          {
            name: 'ML Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: "dash",
            legendMarkerColor: this.mlDataPointColor,
            lineColor: this.mlDataPointColor,
            dataPoints: this.mlDataPoints
          },
          {
            name: 'APO Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: "dash",
            legendMarkerColor: this.aopDataPointColor,
            lineColor: this.aopDataPointColor,
            dataPoints: this.aopDataPoints
          },
          {
            name: 'Final Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: "dash",
            legendMarkerColor: this.finalForecastPointColor,
            lineColor: this.finalForecastPointColor,
            dataPoints: this.finalForecastDataPoints
          }
        ]
      });
      this.chart1.render();
      this.CanvasJSDataAsCSV();
      this.selectOptionsModalCancel.nativeElement.click();
    });
  }

  public CanvasJSDataAsCSV() {


    var toolBar = document.getElementsByClassName('canvasjs-chart-toolbar')[0];

    var exportCSV = document.createElement('div');
    var text = document.createTextNode('Save as CSV');
    exportCSV.setAttribute('style', 'padding: 12px 8px; ');

    exportCSV.appendChild(text);
    toolBar.lastChild.appendChild(exportCSV);
    // var newEle = angular.element("<div class='red'></div>");
    //   var target = document.getElementById('target');
    //   angular.element(target).append(newEle);

    //       var exportCSV = document.createElement('div');
    //       var text = document.createTextNode("Save as CSV");
    //       console.log(chart)
    //    //   exportCSV.setAttribute("style", "padding: 12px 8px; background-color: " + chart.toolbar.backgroundColor + "; color: " + chart.toolbar.fontColor);
    //       exportCSV.appendChild(text);

    //  this.chart1._toolBar.lastChild.appendChild("<div class='red'>Save as CSV</div>");

  }

  public convertChartDataToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }
    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';
    keys = Object.keys(data[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
        if (ctr > 0) {
          result += columnDelimiter;
        }
        result += (!(typeof item[key] === 'undefined' || item[key] === null) ? item[key] : '');
        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }

  public parseCSV(args) {
    var csv = '';
    for (var i = 0; i < args.chart.options.data.length; i++) {
      // csv += convertChartDataToCSV({
      //     data: args.chart.options.data[i].dataPoints
      // });
    }
    if (csv == null) {
      return;
    }
    var filename = args.filename || 'chart-data.csv';
    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    this.downloadFile(csv, filename);
  }

  public downloadFile(extData, filename) {
    var data = encodeURI(extData);
    var link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
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
      newPoint.week = key;
      newPoint.calenderYear = key;

      if (week.ml !== undefined) {
        newPoint.ml = DashboardComponent.parseStringToFloat(week.ml);
        this.mlDataPoints.push({

          x: key,
          y: newPoint.ml,
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
    const reqBody = {
      data: []
    };

    for (const data of this.graphData) {
      const commentsObj = {};
      for (const index in data.comments) {
        commentsObj[`comments${parseInt(index, 10) + 1}`] = data.comments[index];
      }

      if (JSON.stringify(commentsObj) !== '{}') {
        reqBody.data.push(Object.assign({
          calendarWeek: data.calenderYearWeek,
          sku: this.skus.filter(item => item.isChecked).map(item => item.name),
          cpg: this.createPlanRequestData.customerPlanningGroup,
          plant: this.createPlanRequestData.plants,
        }, commentsObj));
      }
    }

    console.log(JSON.stringify(reqBody.data));

    this.skuService.confirmPlan(reqBody.data).subscribe((res: any) => {
      this.PlanNameModalBtn.nativeElement.click();
      this.savePlanLoader = false;

    }, (error) => {
      console.log(error);
      this.PlanNameModalBtn.nativeElement.click();
      this.savePlanLoader = false;
    });

    this.PlanNameModalBtn.nativeElement.click();
  }

  public saveView(planName: string) {
    this.saveViewLoader = true;
    const reqBody = {
      data: []
    };

    for (const data of this.graphData) {
      const commentsObj = {};
      for (const index in data.comments) {
        commentsObj[`comments${parseInt(index, 10) + 1}`] = data.comments[index];
      }

      if (JSON.stringify(commentsObj) !== '{}') {
        reqBody.data.push(Object.assign({
          calendarWeek: data.calenderYearWeek,
          sku: this.skus.filter(item => item.isChecked).map(item => item.name),
          cpg: this.createPlanRequestData.customerPlanningGroup,
          plant: this.createPlanRequestData.plants,
        }, commentsObj));
      }
    }

    console.log(JSON.stringify(reqBody.data));

    this.skuService.confirmPlan(reqBody.data).subscribe((res: any) => {
      this.ViewNameModalBtn.nativeElement.click();
      this.savePlanLoader = false;

    }, (error) => {
      console.log(error);
      this.savePlanLoader = false;
    });

    this.ViewNameModalBtn.nativeElement.click();
  }

  // Save and Load Filter
  public saveFilter(filterName: string) {
    this.filterService.saveFilter({

      user: 'admin',
      filterName,
      plant: this.createFilterString(this.filters[1].values.filter(item => item.isChecked).map(item => item.name)),
      cpg: this.createFilterString(this.filters[0].values.filter(item => item.isChecked).map(item => item.name)),
      sku: this.createFilterString(this.skus.filter(item => item.isChecked).map(item => item.name))
    }).subscribe((res: any) => {
      console.log('Harshit');
      this.loadFilters();

    });
    this.saveFilterModalCancel.nativeElement.click();

  }

  public createFilterString(filters: string[]): string {
    let resultString = '';
    for (const filter of filters) {
      resultString = `${resultString},${filter}`;
    }
    return resultString.slice(1);
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
