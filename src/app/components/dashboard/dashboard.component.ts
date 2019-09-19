import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import {SKUService} from '../../services/sku.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {SidebarService} from '../../services/sidebar.service';
import {FilterService} from '../../services/filter.service';
import {ViewService} from '../../services/view.service';

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

  @ViewChild('editCommentModalBtn', {static: false}) editCommentModalBtn: ElementRef;

  @ViewChild('finalForecastCommentModalCancel', {static: false}) finalForecastCommentModalCancel: ElementRef;


  @ViewChild('editCommentModalBtnCancel', {static: false}) editCommentModalBtnCancel: ElementRef;
  // Save and Load Filter
  @ViewChild('saveFilterModalCancel', {static: false}) saveFilterModalCancel: ElementRef;
  @ViewChild('loadFilterModalCancel', {static: false}) loadFilterModalCancel: ElementRef;

  public createPlanRequestData: any;


  public createPlanRequestData_featurechange: any;


  public selectedWeekIndex: number;
  public currentWeek: number;

  // Filters
  public loadedFilters: any = [];


  public createdata: any = [];



  public weeks = [];

  public filters1 = [];

  public filters2 = [];
  public forecastadd=0;

  public valuestring="";
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


//HARSHIT

  private property: any = [];

  private hh: any = [];
public endWeek;

  private mlDataPoints: any = [];
  private aopDataPoints: any = [];

  private fvaDataPoints: any = [];

public abc123=true;
public middle=true;

public second=true;
  private lastYearDataPoints: any = [];
  public finalForecastDataPoints = [];
  public totalData: any = {
    finalCastTotal: 0,
    harshit:0,
    fsvtValueAdd: 0,
    apoTotal: 0,
    mlTotal: 0,
    actuals: 0,
    lastYearTotal: 0,
  };

  // Filter Options
  public skus: any = [];
  public filters: any = [];

  public comm1: any = [];

  public finn: any = [];

  public comm2: any = [];

  public fetched_forecasting: any = [];
  
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
    private filterService: FilterService,
    private viewService: ViewService
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


    // this.chart2 = new CanvasJS.Chart('chartContainer2', {
    //   animationEnabled: true,

    //   backgroundColor: '#FFFFFF',
    //   legend: {
    //     cursor: 'pointer',
    //     itemclick: this.toggleDataSeries.bind(this)
    //   },
    //   axisX: {
    //     valueFormatString: '######',
    //     gridColor: '#ffffff',
    //     scaleBreaks: {
    //       type: 'blank',
    //       spacing: 0,
    //       customBreaks: [
    //         {
    //           startValue: 201953,
    //           endValue: 202000
    //         },
    //         {
    //           startValue: 202053,
    //           endValue: 202100
    //         },
    //         {
    //           startValue: 202153,
    //           endValue: 202200
    //         },
    //         {
    //           startValue: 202253,
    //           endValue: 202300
    //         }
    //       ]
    //     },
    //     stripLines: [
    //       {
    //         startValue: 201938,
    //         endValue: 201953,
    //         color: '#F2F3F5'
    //       },
    //       {
    //         startValue: 202000,
    //         endValue: 201959,
    //         color: '#F2F3F5'
    //       }
    //     ]
    //   },
    //   axisY: {
    //     title: 'In HL',
    //     valueFormatString: '######',
    //     gridColor: '#ffffff',
    //   },
    //   toolTip: {
    //     content: 'Value : {y}'
    //   },


    //   data: [{
    //     type: 'line',
    //     gridColor: '#ffffff',
    //     labelFontColor: 'black',
    //     legendMarkerColor: '#000',
    //     dataPoints: [


    //       {y: 10, x: 201912},
    //       {y: 10, x: 201913},
    //       {y: 10, x: 201914},
    //       {y: 10, x: 201915},
    //       {y: 10, x: 201916},
    //       {y: 10, x: 201917},
    //       {y: 10, x: 201918},
    //       {y: 10, x: 201919},
    //       {y: 10, x: 201920},
    //       {y: 20, x: 201921},
    //       {y: 35, x: 201922},
    //       {y: 17, x: 201923},
    //       {y: 20, x: 201924},
    //       {y: 13, x: 201925},
    //       {y: 18, x: 201926},
    //       {y: 21, x: 201927},
    //       {y: 10, x: 201928},
    //       {y: 20, x: 201929},
    //       {y: 35, x: 201930},
    //       {y: 17, x: 201931},
    //       {y: 20, x: 201932},
    //       {y: 13, x: 201933},
    //       {y: 18, x: 201934},
    //       {y: 21, x: 201935},
    //       {y: 10, x: 201936},
    //       {y: 20, x: 201937},
    //       {y: 35, x: 201938},
    //       {y: 17, x: 201939},
    //       {y: 20, x: 201940},
    //       {y: 13, x: 201941},
    //       {y: 18, x: 201942},
    //       {y: 21, x: 201943},
    //       {y: 10, x: 201944},
    //       {y: 20, x: 201945},
    //       {y: 35, x: 201946},
    //       {y: 17, x: 201947},
    //       {y: 20, x: 201948},
    //       {y: 13, x: 201949},
    //       {y: 13, x: 201950},

    //     ]
    //   }]
    // });
    // this.chart2.render();

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + (1 + 7 - currentDate.getDay()) % 7);
    this.currentWeek = DashboardComponent.getCurrentWeek(currentDate);

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
 //  this.selectOptionsModalBtn.nativeElement.click();
  
    this.createdata = {
    startWeek: 201938,
    endWeek: 202004,
    forecastingGroups: [{"id":0,"name":"Grimb Blonde BOT 4X6X0_25 ","isFiltered":true,"isChecked":false}],
    customerPlanningGroup: ['G01'],
    plants: ['G001']
  };

   this.createPlan(this.createdata);
  }

  ngOnDestroy(): void {

  }

  private static getCurrentWeek(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  private static parseStringToFloat(text) {
    return parseFloat(parseFloat(text).toFixed(2));
  }

  // Event Handlers
  public onChangeParameters(name = 'change-horizon') {
    this.eventsSubject.next({
      page: name,
      data: JSON.parse(JSON.stringify(this.createPlanRequestData))
    });
    this.selectOptionsModalBtn.nativeElement.click();
  }


  public test(feature: String) {

    console.log('Harsh134->' + feature);

    // if(feature == "Baseline")
    // {

    // }
    // else if(feature == "Promo")

    // console.log("Harshit--->"+JSON.stringify(this.createPlanRequestData.startWeek));
    // this.createPlanRequestData_featurechange.startWeek=this.createPlanRequestData.startWeek;

    // this.createPlanRequestData_featurechange.endWeek=this.createPlanRequestData.endWeek;

    // this.createPlanRequestData_featurechange.plants=this.createPlanRequestData.plants;

    // this.createPlanRequestData_featurechange.customerPlanningGroup=this.createPlanRequestData.customerPlanningGroup;

    // this.createPlanRequestData_featurechange.forecastingGroups=this.createPlanRequestData.forecastingGroups;

    // this.createPlanRequestData_featurechange.property=feature;


    if(feature =="Open")
    {
      this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
        this.valuestring="Open Order";
              this.processFeatureGraphData(res);
  
        console.log('thhh->' + this.createPlanRequestData.startWeek);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
  
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
                startValue: 201938,
                endValue: 201953,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: this.createPlanRequestData.endWeek,
                color: '#F2F3F5'
              }
            ]
          },
  
          axisY: {
            title: 'In HL',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },
  
          toolTip: {
           content: '{y}'
  
          
          },
          // toolTip: {
          //   shared: true,
   
          // },
          data: [{
            type: 'line',
            gridColor: '#ffffff',
            labelFontColor: 'black',
            legendMarkerColor: '#000',
            dataPoints: this.property
          }]
        });
        this.chart2.render();
  
      });
    }

   

else{
    this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {

      //this.createPlanRequestData.brands = res.req.brands;
      
         if(feature == "Baseline"){
            
            this.valuestring="Baseline";
            this.processFeatureGraphData_open(res);
          }
          else if(feature == "Weather"){
            this.valuestring="Weather";
            this.processFeatureGraphData_open(res);
          }

          else if(feature == "Promo"){
            this.valuestring="Promo";
            this.processFeatureGraphData_open(res);
          }
      
      //  this.createFilterObject(res);


      console.log('thhh->' + this.createPlanRequestData.startWeek);
      this.chart2 = new CanvasJS.Chart('chartContainer2', {
        animationEnabled: true,

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
              startValue: 201938,
              endValue: 201953,
              color: '#F2F3F5'
            },
            {
              startValue: 202000,
              endValue: this.createPlanRequestData.endWeek,
              color: '#F2F3F5'
            }
          ]
        },

        axisY: {
          title: 'In HL',
          valueFormatString: '######',
          gridColor: '#ffffff',
        },

        toolTip: {
         content: '{y}'

        
        },
        // toolTip: {
        //   shared: true,
 
        // },
        data: [{
          type: 'line',
          gridColor: '#ffffff',
          labelFontColor: 'black',
          legendMarkerColor: '#000',
          dataPoints: this.property
        }]
      });
      this.chart2.render();


    });
  }
  }






  public test1(feature: String) {

    console.log('Harsh134->' + feature);



    if(feature == "year")
    {
       


    //const data=this.createPlanRequestData;
      console.log("Create_Plan->"+JSON.stringify(this.createPlanRequestData));
      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
       // forecastingGroups: data.forecastingGroups,
       forecastingGroups: JSON.parse(JSON.stringify(this.hh)).map(item => item.name),
        customerPlanningGroup: this.createPlanRequestData.customerPlanningGroup,
        plants: this.createPlanRequestData.plants,
      };
      //this.test();
  
      this.skuService.getGraphData_yearly(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;

        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;

        
        this.processGraphData(res);
  
        this.processFeatureGraphData(res);
        this.createFilterObject(res);
      //  this.skus=data.forecastingGroups;

      // this.skus = this.createPlanRequestData.forecastingGroups.map((item) => {
      //     item.isChecked = true;
      //     return item;
      //   });


        // this.skus = data.forecastingGroups.map((item) => {
        //   item.isChecked = true;
        //   return item;
        // });
  
  
        console.log('thhh->' + this.createPlanRequestData.startWeek);
        // this.chart2 = new CanvasJS.Chart('chartContainer2', {
        //   animationEnabled: true,
  
        //   backgroundColor: '#FFFFFF',
        //   legend: {
        //     cursor: 'pointer',
        //     itemclick: this.toggleDataSeries.bind(this)
        //   },
        //   axisX: {
        //     valueFormatString: '######',
        //     gridColor: '#ffffff',
        //     scaleBreaks: {
        //       type: 'blank',
        //       spacing: 0,
        //       customBreaks: [
        //         {
        //           startValue: 201953,
        //           endValue: 202000
        //         },
        //         {
        //           startValue: 202053,
        //           endValue: 202100
        //         },
        //         {
        //           startValue: 202153,
        //           endValue: 202200
        //         },
        //         {
        //           startValue: 202253,
        //           endValue: 202300
        //         }
        //       ]
        //     },
        //     stripLines: [
        //       {
        //         startValue: this.createPlanRequestData.startWeek,
        //         endValue: 201953,
        //         color: '#F2F3F5'
        //       },
        //       {
        //         startValue: 202000,
        //         endValue: this.createPlanRequestData.endWeek,
        //         color: '#F2F3F5'
        //       }
        //     ]
        //   },
        //   axisY: {
        //     title: 'In HL',
        //     valueFormatString: '######',
        //     gridColor: '#ffffff',
        //   },
  
        //   toolTip: {
        //     content: 'Value: {y}'
        //   },
  
        //   // toolTip: {
        //   //   shared: true,
        //   //   contentFormatter: function(e) {
        //   //     var content = ' ';
        //   //     console.log(JSON.stringify(e));
        //   //     content = e.entries.dataPoint.x.toString.slice(4, 6) + '-' + e.entries.dataPoint.x.toString.slice(0, 4);
        //   //     for (var i = 0; i < e.entries.length; i++) {
        //   //       content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
        //   //       content += '<br/>';
        //   //     }
        //   //     return content;
        //   //   }
        //  // },
  
        //   data: [{
        //     type: 'line',
        //     gridColor: '#ffffff',
        //     labelFontColor: 'black',
        //     legendMarkerColor: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.chart2.render();
  
  
        console.log('132456->' + this.createPlanRequestData.startWeek);
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
                endValue: 201953,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: this.createPlanRequestData.endWeek,
                color: '#F2F3F5'
              }
            ]
          },
  
          axisY: {
            title: 'In HL',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },
  
          // toolTip: {
          //   content: 'Week: {x} | {name}: {y}'
          // },
  
          toolTip: {
            shared: true,
            contentFormatter: function(e) {
              var content = ' ';
              //console.log(e.dataPoint);
              content = e.entries[0].dataPoint.x.toString().slice(4, 6) + '-' + e.entries[0].dataPoint.x.toString().slice(0, 4) + '<br/>';
              for (var i = 0; i < e.entries.length; i++) {
                content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
                content += '<br/>';
              }
              return content;
            }
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
              lineDashType: 'dash',
              legendMarkerColor: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              legendMarkerColor: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              legendMarkerColor: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
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
    else if(feature == "month")
    {


      console.log("MONTH->"+JSON.stringify(this.hh));
    //  const data=this.createPlanRequestData;
      
     


      console.log("Create_Plan1234->"+JSON.stringify(this.hh));
     
      
      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        forecastingGroups: JSON.parse(JSON.stringify(this.hh)).map(item => item.name),
        customerPlanningGroup: this.createPlanRequestData.customerPlanningGroup,
        plants: this.createPlanRequestData.plants,
      };
      //this.test();

      console.log("WOW->"+JSON.stringify(this.createPlanRequestData));
  
      this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.processGraphData(res);
  
        this.processFeatureGraphData(res);
        this.createFilterObject(res);
     //   this.skus = this.createPlanRequestData.forecastingGroups;
        
    //  this.skus = JSON.parse(JSON.stringify(this.hh)).map(item => item.name).map((item) => {
    //   item.isChecked = true;
    //   return item;
    // });
  
        console.log('thhh->' + this.createPlanRequestData.startWeek);
        // this.chart2 = new CanvasJS.Chart('chartContainer2', {
        //   animationEnabled: true,
  
        //   backgroundColor: '#FFFFFF',
        //   legend: {
        //     cursor: 'pointer',
        //     itemclick: this.toggleDataSeries.bind(this)
        //   },
        //   axisX: {
        //     valueFormatString: '######',
        //     gridColor: '#ffffff',
        //     scaleBreaks: {
        //       type: 'blank',
        //       spacing: 0,
        //       customBreaks: [
        //         {
        //           startValue: 201913,
        //           endValue: 202000
        //         },
        //         {
        //           startValue: 202012,
        //           endValue: 202100
        //         },
        //         {
        //           startValue: 202153,
        //           endValue: 202200
        //         },
        //         {
        //           startValue: 202253,
        //           endValue: 202300
        //         }
        //       ]
        //     },
        //     // stripLines: [
        //     //   {
        //     //     startValue: 201909,
        //     //     endValue: 201912,
        //     //     color: '#F2F3F5'
        //     //   },
        //     //   {
        //     //     startValue: 202000,
        //     //     endValue: 202003,
        //     //     color: '#F2F3F5'
        //     //   }
        //     // ]
        //   },
        //   axisY: {
        //     title: 'In HL',
        //     valueFormatString: '######',
        //     gridColor: '#ffffff',
        //   },
  
        //   toolTip: {
        //     content: 'Value: {y}'
        //   },
  
        //   // toolTip: {
        //   //   shared: true,
        //   //   contentFormatter: function(e) {
        //   //     var content = ' ';
        //   //     console.log(JSON.stringify(e));
        //   //     content = e.entries.dataPoint.x.toString.slice(4, 6) + '-' + e.entries.dataPoint.x.toString.slice(0, 4);
        //   //     for (var i = 0; i < e.entries.length; i++) {
        //   //       content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
        //   //       content += '<br/>';
        //   //     }
        //   //     return content;
        //   //   }
        //  // },
  
        //   data: [{
        //     type: 'line',
        //     gridColor: '#ffffff',
        //     labelFontColor: 'black',
        //     legendMarkerColor: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.chart2.render();
  
  
        console.log('132456->' + this.createPlanRequestData.startWeek);
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
                  startValue: 201913,
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
                startValue: 201909,
                endValue: 201912,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202001,
                color: '#F2F3F5'
              }
            ]
          },
  
          axisY: {
            title: 'In HL',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },
  
          // toolTip: {
          //   content: 'Week: {x} | {name}: {y}'
          // },
  
          toolTip: {
            shared: true,
            contentFormatter: function(e) {
              var content = ' ';
              //console.log(e.dataPoint);
              content = e.entries[0].dataPoint.x.toString().slice(4, 6) + '-' + e.entries[0].dataPoint.x.toString().slice(0, 4) + '<br/>';
              for (var i = 0; i < e.entries.length; i++) {
                content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
                content += '<br/>';
              }
              return content;
            }
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
              lineDashType: 'dash',
              legendMarkerColor: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              legendMarkerColor: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              legendMarkerColor: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
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



      this.chart1.render();
      this.chart1.render();
    }


    else if(feature=="week")
    {

   // const data=this.createPlanRequestData;
  //  console.log("Create_Plan->"+JSON.stringify(data));
    this.createPlanRequestData = {
      startWeek: this.createPlanRequestData.startWeek,
      endWeek: this.createPlanRequestData.endWeek,
      forecastingGroups: this.createPlanRequestData.forecastingGroups.map(item => item.name),
      customerPlanningGroup: this.createPlanRequestData.customerPlanningGroup,
      plants: this.createPlanRequestData.plants,
    };
    //this.test();

    this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
      this.eventsSubject.next({
        page: null,
        reset: true,
      });
      this.createPlanRequestData.brands = res.req.brands;
      this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
      this.createPlanRequestData.subbrand = res.req.subbrand;
      this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
      this.processGraphData(res);

      this.processFeatureGraphData(res);
      this.createFilterObject(res);
      this.skus = this.createPlanRequestData.forecastingGroups.map((item) => {
        item.isChecked = true;
        return item;
      });


      console.log('thhh->' + this.createPlanRequestData.startWeek);
      this.chart2 = new CanvasJS.Chart('chartContainer2', {
        animationEnabled: true,

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
              endValue: 201953,
              color: '#F2F3F5'
            },
            {
              startValue: 202000,
              endValue: this.createPlanRequestData.endWeek,
              color: '#F2F3F5'
            }
          ]
        },
        axisY: {
          title: 'In HL',
          valueFormatString: '######',
          gridColor: '#ffffff',
        },

        toolTip: {
          content: '{y}'
        },

        // toolTip: {
        //   shared: true,
        //   contentFormatter: function(e) {
        //     var content = ' ';
        //     console.log(JSON.stringify(e));
        //     content = e.entries.dataPoint.x.toString.slice(4, 6) + '-' + e.entries.dataPoint.x.toString.slice(0, 4);
        //     for (var i = 0; i < e.entries.length; i++) {
        //       content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
        //       content += '<br/>';
        //     }
        //     return content;
        //   }
       // },

        data: [{
          type: 'line',
          gridColor: '#ffffff',
          labelFontColor: 'black',
          legendMarkerColor: '#000',
          dataPoints: this.property
        }]
      });
      this.chart2.render();


      console.log('132456->' + this.createPlanRequestData.startWeek);
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
              endValue: 201953,
              color: '#F2F3F5'
            },
            {
              startValue: 202000,
              endValue: this.createPlanRequestData.endWeek,
              color: '#F2F3F5'
            }
          ]
        },

        axisY: {
          title: 'In HL',
          valueFormatString: '######',
          gridColor: '#ffffff',
        },

        // toolTip: {
        //   content: 'Week: {x} | {name}: {y}'
        // },

        toolTip: {
          shared: true,
          contentFormatter: function(e) {
            var content = ' ';
            //console.log(e.dataPoint);
            content = e.entries[0].dataPoint.x.toString().slice(4, 6) + '-' + e.entries[0].dataPoint.x.toString().slice(0, 4) + '<br/>';
            for (var i = 0; i < e.entries.length; i++) {
              content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
              content += '<br/>';
            }
            return content;
          }
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
            lineDashType: 'dash',
            legendMarkerColor: this.lastyearDataPointColor,
            lineColor: this.lastyearDataPointColor,
            dataPoints: this.lastYearDataPoints
          },
          {
            name: 'ML Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            legendMarkerColor: this.mlDataPointColor,
            lineColor: this.mlDataPointColor,
            dataPoints: this.mlDataPoints
          },
          {
            name: 'APO Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            legendMarkerColor: this.aopDataPointColor,
            lineColor: this.aopDataPointColor,
            dataPoints: this.aopDataPoints
          },
          {
            name: 'Final Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
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

    // console.log("Harshit--->"+JSON.stringify(this.createPlanRequestData.startWeek));
    // this.createPlanRequestData_featurechange.startWeek=this.createPlanRequestData.startWeek;

    // this.createPlanRequestData_featurechange.endWeek=this.createPlanRequestData.endWeek;

    // this.createPlanRequestData_featurechange.plants=this.createPlanRequestData.plants;

    // this.createPlanRequestData_featurechange.customerPlanningGroup=this.createPlanRequestData.customerPlanningGroup;

    // this.createPlanRequestData_featurechange.forecastingGroups=this.createPlanRequestData.forecastingGroups;

    // this.createPlanRequestData_featurechange.property=feature;


    // this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {

    //   //this.createPlanRequestData.brands = res.req.brands;
    //   this.processFeatureGraphData(res);
    //   //  this.createFilterObject(res);


    //   console.log('thhh->' + this.createPlanRequestData.startWeek);
    //   this.chart2 = new CanvasJS.Chart('chartContainer2', {
    //     animationEnabled: true,

    //     backgroundColor: '#FFFFFF',
    //     legend: {
    //       cursor: 'pointer',
    //       itemclick: this.toggleDataSeries.bind(this)
    //     },
    //     axisX: {
    //       valueFormatString: '######',
    //       gridColor: '#ffffff',
    //       scaleBreaks: {
    //         type: 'blank',
    //         spacing: 0,
    //         customBreaks: [
    //           {
    //             startValue: 201953,
    //             endValue: 202000
    //           },
    //           {
    //             startValue: 202053,
    //             endValue: 202100
    //           },
    //           {
    //             startValue: 202153,
    //             endValue: 202200
    //           },
    //           {
    //             startValue: 202253,
    //             endValue: 202300
    //           }
    //         ]
    //       },
    //       stripLines: [
    //         {
    //           startValue: 201938,
    //           endValue: 201953,
    //           color: '#F2F3F5'
    //         },
    //         {
    //           startValue: 202000,
    //           endValue: this.createPlanRequestData.endWeek,
    //           color: '#F2F3F5'
    //         }
    //       ]
    //     },

    //     axisY: {
    //       title: 'In HL',
    //       valueFormatString: '######',
    //       gridColor: '#ffffff',
    //     },

    //     toolTip: {
    //       content: 'Value: {y}'
    //     },
    //     // toolTip: {
    //     //   shared: true,
 
    //     // },
    //     data: [{
    //       type: 'line',
    //       gridColor: '#ffffff',
    //       labelFontColor: 'black',
    //       legendMarkerColor: '#000',
    //       dataPoints: this.property
    //     }]
    //   });
    //   this.chart2.render();


    // });
  }



  // Create Plan Component Event Subscriber
  public eventListener(eventData: any) {
    if (eventData.type === 'create-plan') {
      this.createPlan(eventData.data);
    } else if (eventData.type === 'view-plan') {
      this.viewPlan(eventData.data);
    } else {

    }
  }



  public abc12()
  {

    if(this.abc123==true)
    {
      this.abc123=false;
      this.second=false;
      document.getElementById('middle').style.margin='0 20px';
  
      document.getElementById('upper_middle').style.margin='0 20px';
      this.chart1.render();
      this.chart2.render();
    }
    else{
      this.abc123=true;
      this.second=true;
      document.getElementById('middle').style.margin='0 200px';
  
      document.getElementById('upper_middle').style.margin='0 200px';
      this.chart1.render();
      this.chart2.render();
    }
   
     //this.middle.nativeElement.style.margin=''
  }


  private static transformWeek(weekString: string) {
    const data = weekString.split('-');
    const year = data[0];
    const week = data[1].substr(1);
    return parseInt(year + week, 10);
  }



  public tick()
  {
    console.log("THIS ENDWEEK--"+this.endWeek);

    this.createdata.endWeek=DashboardComponent.transformWeek(this.endWeek);
  
     this.createPlan(this.createdata);
  }

  public createPlan(data: any) {


    console.log("Create_Plan->"+JSON.stringify(data));
    this.createPlanRequestData = {
      startWeek: data.startWeek,
      endWeek: data.endWeek,
      forecastingGroups: data.forecastingGroups.map(item => item.name),
      customerPlanningGroup: data.customerPlanningGroup,
      plants: data.plants,
    };

    this.hh=data.forecastingGroups;
    console.log("hhhh---"+JSON.stringify(this.hh));
    //this.test();

    this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
      this.eventsSubject.next({
        page: null,
        reset: true,
      });
      this.createPlanRequestData.brands = res.req.brands;
      this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
      this.createPlanRequestData.subbrand = res.req.subbrand;
      this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
      this.createPlanRequestData.Trade = res.req.trade;
      this.createPlanRequestData.Sales = res.req.sales;
      this.processGraphData(res);

      this.processFeatureGraphData_open(res);
      this.valuestring="Open order";
      this.createFilterObject(res);
      this.skus = data.forecastingGroups.map((item) => {
        item.isChecked = true;
        return item;
      });


      console.log('thhh->' + this.createPlanRequestData.startWeek);
      this.chart2 = new CanvasJS.Chart('chartContainer2', {
        animationEnabled: true,

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
              endValue: 201953,
              color: '#F2F3F5'
            },
            {
              startValue: 202000,
              endValue: this.createPlanRequestData.endWeek,
              color: '#F2F3F5'
            }
          ]
        },
        axisY: {
          title: 'In HL',
          valueFormatString: '######',
          gridColor: '#ffffff',
        },

        toolTip: {
          content: '{y}'
        },

        // toolTip: {
        //   shared: true,
        //   contentFormatter: function(e) {
        //     var content = ' ';
        //     console.log(JSON.stringify(e));
        //     content = e.entries.dataPoint.x.toString.slice(4, 6) + '-' + e.entries.dataPoint.x.toString.slice(0, 4);
        //     for (var i = 0; i < e.entries.length; i++) {
        //       content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
        //       content += '<br/>';
        //     }
        //     return content;
        //   }
       // },

        data: [{
          type: 'line',
          gridColor: '#ffffff',
          labelFontColor: 'black',
          legendMarkerColor: '#000',
          dataPoints: this.property
        }]
      });
      this.chart2.render();


      console.log('132456->' + this.createPlanRequestData.startWeek);
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
              endValue: 201953,
              color: '#F2F3F5'
            },
            {
              startValue: 202000,
              endValue: this.createPlanRequestData.endWeek,
              color: '#F2F3F5'
            }
          ]
        },

        axisY: {
          title: 'In HL',
          valueFormatString: '######',
          gridColor: '#ffffff',
        },

        // toolTip: {
        //   content: 'Week: {x} | {name}: {y}'
        // },

        toolTip: {
          shared: true,
          contentFormatter: function(e) {
            var content = ' ';
            //console.log(e.dataPoint);
            content = e.entries[0].dataPoint.x.toString().slice(4, 6) + '-' + e.entries[0].dataPoint.x.toString().slice(0, 4) + '<br/>';
            for (var i = 0; i < e.entries.length; i++) {
              content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
              content += '<br/>';
            }
            return content;
          }
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
            lineDashType: 'dash',
            legendMarkerColor: this.lastyearDataPointColor,
            lineColor: this.lastyearDataPointColor,
            dataPoints: this.lastYearDataPoints
          },
          {
            name: 'ML Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            legendMarkerColor: this.mlDataPointColor,
            lineColor: this.mlDataPointColor,
            dataPoints: this.mlDataPoints
          },
          {
            name: 'APO Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            legendMarkerColor: this.aopDataPointColor,
            lineColor: this.aopDataPointColor,
            dataPoints: this.aopDataPoints
          },
          {
            name: 'Final Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
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

  public viewPlan(data: any) {
    Object.assign(this.createPlanRequestData, {
      startWeek: data.startWeek,
      endWeek: data.endWeek,
      forecastingGroups: data.forecastingGroups,
      customerPlanningGroup: data.customerPlanningGroup,
      plants: data.plants,
    });
    this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
      this.eventsSubject.next({
        page: null,
        reset: true,
      });
      this.createPlanRequestData.brands = res.req.brands;
      this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
      this.createPlanRequestData.subbrand = res.req.subbrand;
      this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
      this.processGraphData(res);
      this.createFilterObject(res);
      this.skus = data.forecastingGroups.map((item) => {
        return {
          isChecked: true,
          name: item
        };
      });

      console.log('hsfgerbe->' + this.currentWeek);
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
              startValue: this.currentWeek,
              endValue: this.createPlanRequestData.endWeek,
              color: '#F2F3F5'
            }
          ]
        },
        axisY: {
          title: 'In HL',
          valueFormatString: '######',
          gridColor: '#ffffff',
        },
        // toolTip: {
        //   content: 'Week: {x} | {name}: {y}'
        // },

        toolTip: {
          shared: true,
          contentFormatter: function(e) {
            var content = ' ';
            console.log(JSON.stringify(e));
            content = e.entries.dataPoint.x.toString.slice(4, 6) + '-' + e.entries.dataPoint.x.toString.slice(0, 4);
            for (var i = 0; i < e.entries.length; i++) {
              content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
              content += '<br/>';
            }
            return content;
          }
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
            lineDashType: 'dash',
            legendMarkerColor: this.lastyearDataPointColor,
            lineColor: this.lastyearDataPointColor,
            dataPoints: this.lastYearDataPoints
          },
          {
            name: 'ML Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            legendMarkerColor: this.mlDataPointColor,
            lineColor: this.mlDataPointColor,
            dataPoints: this.mlDataPoints
          },
          {
            name: 'APO Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            legendMarkerColor: this.aopDataPointColor,
            lineColor: this.aopDataPointColor,
            dataPoints: this.aopDataPoints
          },
          {
            name: 'Final Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
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

  // Download CSV Handlers
  public CanvasJSDataAsCSV() {

  //  document.getElementsByClassName('.canvasjs-chart-toolbar button')[0].innerHTML='Export';


    
//    toolBar2=document

    const toolBar = document.getElementsByClassName('canvasjs-chart-toolbar')[0];
    const exportCSV = document.createElement('div');
    const text = document.createTextNode('Save as CSV');
    exportCSV.setAttribute('style', 'padding: 12px 8px; ');
    exportCSV.appendChild(text);

    exportCSV.addEventListener('mouseover', function() {
      exportCSV.setAttribute('style', 'padding: 12px 8px; background-color: #2196F3; color: white');
    });
    exportCSV.addEventListener('mouseout', function() {
      exportCSV.setAttribute('style', 'padding: 12px 8px; background-color: white; color: black');
    });
    exportCSV.addEventListener('click', () => {
      this.downloadCSV({filename: 'chart-data.csv'});
    });

    toolBar.lastChild.appendChild(exportCSV);
  }

  public downloadCSV(args) {
    console.log(JSON.stringify(this.graphData));
    let data, filename, link;
    let csv = '';

    const columns = ['CalendarYearWeek', 'Actuals', 'APO', 'ML', 'Actuals Last Year', 'Final Forecast'];

    csv += columns.join(',');
    csv += '\n';

    for (const point of this.graphData) {
      const row = [
        point.calenderYearWeek,
        point.actuals,
        point.apo,
        point.ml,
        point.actualslastyear,
        point.finalForecast
      ];
      csv += row.join(',');
      csv += '\n';
    }

    filename = args.filename || 'chart-data.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }

    data = encodeURI(csv);
    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  }

  // Toggle Data Series from Graph
  private toggleDataSeries(e) {
    e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
    this.chart1.render();
  }



  public processGraphData(res) {


   // const abc12;
       console.log("JOKER12-?"+JSON.stringify(res.req.forecastingGroups));
       // this.skus = res.req.forecastingGroups;
        
        console.log("JOKER12345678-?"+JSON.stringify(this.skus));
    const data = res.res;

    this.filters1=[];

    this.filters2=[];


    console.log('Testing->' + JSON.stringify(data));
    const newData = [];

    this.aopDataPoints.length = 0;

    this.fvaDataPoints.length = 0;
    this.mlDataPoints.length = 0;
    this.actualDataPoints.length = 0;


    this.lastYearDataPoints.length = 0;
    this.finalForecastDataPoints.length = 0;
    this.graphData = [];

 

    this.totalData = {
      finalCastTotal: 0,
      harshit:0,
      fsvtValueAdd: 0,
      apoTotal: 0,
      mlTotal: 0,
      actuals: 0,
      lastYearTotal: 0,
    };


    const abc = [];
    for (const week of data) {
      const newPoint: any = {
        comments: [],
        userComment: []
      };
      const key: string = week.calenderYearWeek;


      newPoint.calenderYearWeek = key;
      newPoint.week = key;

      newPoint.newweek = key.toString().slice(4, 6) + '-' + key.toString().slice(0, 4);

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

      //  console.log("RANG--->"+this.totalData.mlTotal);
      }

      if (week.ml !== undefined) {
        newPoint.initialFinalForecast = week.finalforecast === undefined ? newPoint.ml : DashboardComponent.parseStringToFloat(week.finalforecast);
        newPoint.finalForecast = newPoint.initialFinalForecast;


//        newPoint.fva = week.finalforecast === undefined ? newPoint.ml : DashboardComponent.parseStringToFloat(week.fva);


        //   newPoint.finalForecast = newPoint.initialFinalForecast;
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


      console.log("tyt!@#$%^&-------"+JSON.stringify(week));
      if (week.fva !== undefined) {

     
        const value = DashboardComponent.parseStringToFloat(week.fva);
        // newPoint.fcstValueAdd = value ? '' : value.toString();
       // console.log('MAN RAMTA->' + value);
       if(value !== undefined)
       {
        // console.log("343"+JSON.stringify(newPoint));

         console.log("34567890--->"+newPoint.initialFinalForecast.toString());

         console.log("dfghjk-->"+this.totalData.fsvtValueAdd);


         console.log("dfghjk1-->"+this.forecastadd);

    this.forecastadd =this.forecastadd + value;


    console.log("dfghjk345-->"+this.forecastadd);
       //  this.totalData.fcstValueAdd += newPoint.ml;
       this.totalData.fsvtValueAdd = this.totalData.fsvtValueAdd + newPoint.initialFinalForecast;
        this.totalData.fsvtValueAdd += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
       console.log("TEs23%^&->"+this.totalData.fcstValueAdd);
        newPoint.fcstValueAdd = value;
        this.totalData.fsvtValueAdd += newPoint.fcstValueAdd;
       console.log("3545%^&->"+this.totalData.fcstValueAdd);
       }

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

      if (week.harshit !== undefined) {
        newPoint.harshit = DashboardComponent.parseStringToFloat(week.harshit);

        this.totalData.harshit += newPoint.harshit;
      }

      if (week.comment) {

        console.log("Suit-------"+week.comment);
        newPoint.comments = week.comment;
      }

      this.graphData.push(newPoint);
    }

    this.totalData.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(2));
    this.totalData.lastYearTotal = parseFloat(this.totalData.lastYearTotal.toFixed(2));
    this.totalData.actuals = parseFloat(this.totalData.actuals.toFixed(2));
    this.totalData.mlTotal = parseFloat(this.totalData.mlTotal.toFixed(2));
    this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(2));

    this.totalData.harshit = parseFloat(this.totalData.harshit.toFixed(2));

   // this.totalData.fcstValueAdd = parseFloat(this.totalData.fcstValueAdd.toFixed(2));
  }


  // Harshit


  public processFeatureGraphData(res) {
    const data1 = res.res;

    var a=document.getElementById("checking").innerHTML;
    console.log("KCUH AUR PANGAA HAI");
    this.property.length = 0;

//    this.graphData = [];

    for (const week1 of data1) {


      if (week1.harshit !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property.push({
          x: week1.calenderYearWeek,
          y: DashboardComponent.parseStringToFloat(week1.harshit),

        });
        //this.totalData.actuals += newPoint.actuals;
      }

      console.log('3456789--->' + JSON.stringify(this.property));

      console.log('TEST12--->' + week1.apo);
      console.log('TEST12--->' + week1.calendarWeek);


      // console.log("HARHS^&->"+week.apo);
      // const newPoint: any = {
      //   comments: [],
      //   userComment: []
      // };
      // const key: string = week.calenderYearWeek;
      // newPoint.calenderYearWeek = key;
      // newPoint.week = key;
      // newPoint.calenderYear = key;


      // if (week.apo !== undefined) {
      //   newPoint.apo = DashboardComponent.parseStringToFloat(week.apo);
      //   this.aopDataPoints.push({
      //     x: key,
      //     y: newPoint.apo,
      //     color: this.aopDataPointColor,
      //     click: this.dataPointClick.bind(this),
      //     calenderYear: key,
      //   });
      //   this.totalData.apoTotal += newPoint.apo;
      // }

      // this.graphData.push(newPoint);
    }

    //   this.totalData.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(2));

  }








  public processFeatureGraphData_open(res) {
    const data1 = res.secondGraphRes;

    var a=document.getElementById("checking").innerHTML;
    console.log('CHECK-->' + a);
    this.property.length = 0;

//    this.graphData = [];

    for (const week1 of data1) {


      if (week1.apo !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property.push({
          x: week1.calenderYearWeek,
          y: DashboardComponent.parseStringToFloat(week1.apo),

        });
        //this.totalData.actuals += newPoint.actuals;
      }

      console.log('3456789--->' + JSON.stringify(this.property));

      console.log('TEST12--->' + week1.apo);
      console.log('TEST12--->' + week1.calendarWeek);


      // console.log("HARHS^&->"+week.apo);
      // const newPoint: any = {
      //   comments: [],
      //   userComment: []
      // };
      // const key: string = week.calenderYearWeek;
      // newPoint.calenderYearWeek = key;
      // newPoint.week = key;
      // newPoint.calenderYear = key;


      // if (week.apo !== undefined) {
      //   newPoint.apo = DashboardComponent.parseStringToFloat(week.apo);
      //   this.aopDataPoints.push({
      //     x: key,
      //     y: newPoint.apo,
      //     color: this.aopDataPointColor,
      //     click: this.dataPointClick.bind(this),
      //     calenderYear: key,
      //   });
      //   this.totalData.apoTotal += newPoint.apo;
      // }

      // this.graphData.push(newPoint);
    }

    //   this.totalData.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(2));

  }


  //Harshit ENDS


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
    console.log("HAHA---"+JSON.stringify(plant));
    this.filters.push({
      name: 'Plants',
      key: 'plant',
      isExpanded: false,
      values: plant.map(item => {
        return {name: item, isChecked: true};
      })
    });

    // Push Brands
    const brands = this.createPlanRequestData.brands;

   

    this.filters1.push({
      name: 'Brands',
      key: 'brands',
      isExpanded: false,
      values: brands.map(item => {
        return {name: item, isChecked: false};
      })
    });


    const Alcohol_percentage = this.createPlanRequestData.Alcohol_percentage;
    console.log("CHECK-->"+JSON.stringify(this.createPlanRequestData));
    this.filters1.push({
      name: 'Alcohol Percentage',
      key: 'alcoholper',
      isExpanded: false,
      values: Alcohol_percentage.map(item => {
        return {name: item, isChecked: false};
      })
    });



    const Subbrand = this.createPlanRequestData.subbrand;
    this.filters1.push({
      name: 'Sub-Brand',
      key: 'subbrand',
      isExpanded: false,
      values: Subbrand.map(item => {
        return {name: item, isChecked: false};
      })
    });


     console.log("VBHKJ--"+JSON.stringify(this.createPlanRequestData));
    const Sales = this.createPlanRequestData.Sales;
    this.filters2.push({
      name: 'Sales Office',
      key: 'salesoffice',
      isExpanded: false,
      values: Sales.map(item => {
        return {name: item, isChecked: false};
      })
    });


    const Trade = this.createPlanRequestData.Trade;
    this.filters2.push({
      name: 'Trade Type',
      key: 'tradetype',
      isExpanded: false,
      values: Trade.map(item => {
        return {name: item, isChecked: false};
      })
    });

    const forecastingGroups = this.createPlanRequestData.forecastingGroups;
    this.fetched_forecasting.push({
      name: 'Forecas',
      key: 'subbrand',
      isExpanded: false,
      values: forecastingGroups.map(item => {
        return {name: item, isChecked: true};
      })
    });


    this.fetched_forecasting=this.createPlanRequestData.forecastingGroups;
    

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
    /*
       Customer Planning Group 0
       Plants Index  1
       Brands Index 3
     */
    data.forecastingGroups = this.skus.filter(item => item.isChecked).map(item => item.name);
    data.customerPlanningGroup = this.filters[0].values.filter(item => item.isChecked).map(item => item.name);
    data.plants = this.filters[1].values.filter(item => item.isChecked).map(item => item.name);
   // data.brands = this.filters[2].values.filter(item => item.isChecked).map(item => item.name);
    
    this.skuService.getGraphData(data).subscribe((res: any) => {
      this.processGraphData(res);
      this.chart1.render();
    });
  }




  public onFilterCheckBoxChange2() {


    const reqBody = this.getFiltersObject1();

    console.log("WOW-->"+JSON.stringify(reqBody));
  //  const data = Object.assign({leadSkus: []}, this.createPlanRequestData);
    /*
       Customer Planning Group 0
       Plants Index  1
       Brands Index 3
     */

  //   data.forecastingGroups = this.skus.filter(item => item.isChecked).map(item => item.name);
  //   data.customerPlanningGroup = this.filters[0].values.filter(item => item.isChecked).map(item => item.name);
  //   data.plants = this.filters[1].values.filter(item => item.isChecked).map(item => item.name);
  //  // data.brands = this.filters[2].values.filter(item => item.isChecked).map(item => item.name);
    
  //   this.skuService.getGraphData(data).subscribe((res: any) => {
  //     this.processGraphData(res);
  //     this.chart1.render();
  //   });

  // this.filters.push({
  //   name: 'Plants',
  //   key: 'plant',
  //   isExpanded: false,
  //   values: plant.map(item => {
  //     return {name: item, isChecked: true};
  //   })

  this.skuService.getCPGlist(reqBody).subscribe((response: any) => {

    response=response.map(item => {
          return {name: item, isChecked: true};
        })

        console.log("REsss--"+JSON.stringify(response));
    for(const abc of this.filters)
    {
      console.log("HH--"+JSON.stringify(abc));
           if(abc.key == 'customerPlanningGroup')
           {
            console.log("REsss123456--"+JSON.stringify(abc.values));
               abc.values=JSON.parse(JSON.stringify(response));
           }
    }
  //  this.selectedSKUs = [];
  });
  }



  // public onFilterCheckboxClick($event) {
  //   const reqBody = this.getFiltersObject();

  //   this.subs.items$ = this.skuService.getSkUList(reqBody).subscribe((response: any) => {
  //     this.SKUs = response;
  //     this.selectedSKUs = [];
  //   });
  // }

  private getFiltersObject() {

    const brands = [];

    const Subbrand = [];
    // const Unitperpack = [];

    const unitPerPack = [];

    const AlcoholPercentage = [];


    console.log("TESTTT-----"+JSON.stringify(this.filters1));
    for (const brand of this.filters1) {
        
      if(brand.key=='brands')
      {
        for (const aa of brand.values) {
           if(aa.isChecked)
           {
               brands.push(aa.name);
           }
        }
      }

      else if(brand.key=='alcoholper')
      {
        for (const aa of brand.values) {
           if(aa.isChecked)
           {
            AlcoholPercentage.push(aa.name);
           }
        }
      }


      else if(brand.key=='subbrand')
      {
        for (const aa of brand.values) {
           if(aa.isChecked)
           {
            Subbrand.push(aa.name);
           }
        }
      }
    }


    return {
      filterBrands: brands,
      filterSubBrandName: Subbrand,
      filterAcoholPerc: AlcoholPercentage,
      filterUnitsPerPack: unitPerPack
    };
  }
  





  private getFiltersObject1() {

    const Sales = [];

    const Trade = [];
    // const Unitperpack = [];



    console.log("TESTTT-----"+JSON.stringify(this.filters1));
    for (const brand of this.filters2) {
        
      if(brand.key=='tradetype')
      {
        for (const aa of brand.values) {
           if(aa.isChecked)
           {
            Trade.push(aa.name);
           }
        }
      }

      else if(brand.key=='salesoffice')
      {
        for (const aa of brand.values) {
           if(aa.isChecked)
           {
              Sales.push(aa.name);
           }
        }
      }

    }


    return {
      filterSales: Sales,
      filterTrade: Trade
    };
  }



  public onFilterCheckBoxChange1() {

    const reqBody = this.getFiltersObject();

    // const data = Object.assign({leadSkus: []}, this.createPlanRequestData);
    // /*
    //    Customer Planning Group 0
    //    Plants Index  1
    //    Brands Index 3
    //  */
    // data.forecastingGroups = this.skus.filter(item => item.isChecked).map(item => item.name);
    // data.customerPlanningGroup = this.filters[0].values.filter(item => item.isChecked).map(item => item.name);
    // data.plants = this.filters[1].values.filter(item => item.isChecked).map(item => item.name);
    // data.brands = this.filters[2].values.filter(item => item.isChecked).map(item => item.name);
    
    // this.skuService.getSkUList({
    //   filterBrands: [],
    //   filterSubBrandName: [],
    //   filterAcoholPerc: [],
    //   filterUnitsPerPack: []
    // }).subscribe((response: any) => {
    //   this.skus = response;
    // });

    this.skuService.getSkUList(reqBody).subscribe((response: any) => {
      this.skus = response;
    //  this.selectedSKUs = [];
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
      

      console.log("CH!@--"+JSON.stringify(this.graphData));
      this.totalData.finalCastTotal = 0;
      for (const data of this.graphData) {
        if (data.finalForecast) {
          //console.log("Mush->"+this.totalData.finalCastTotal);
          this.totalData.finalCastTotal += data.finalForecast;
        }
      }
    this.forecastadd=0;
      for (const data of this.graphData) {


        if (data.fcstValueAdd) {
          //console.log("Mush->"+JSON.stringify(data));
          this.forecastadd += parseFloat(data.fcstValueAdd);
        }
      }

    //  this.forecastadd = this.totalData.finalCastTotal;

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
        return;
      }


      console.log('DEBUG1->' + value);

      const reqBody = {
        cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name),
        plant: this.filters[1].values.filter(item => item.isChecked).map(item => item.name),
        sku: this.skus.filter(item => item.isChecked).map(item => item.name),
        user: 'admin',
        finalForecast: finalValue,
        fva: value,
        calendarWeek: week
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




  public Dbledit(selectedWeekIndex: number) {
    
    console.log("HHHH---"+selectedWeekIndex);
    this.selectedWeekIndex = selectedWeekIndex;
    this.editCommentModalBtn.nativeElement.click();
    
    
  }




  // comments 
  public comments(i)
  {
  

      this.finn=[];
      this.selectedWeekComments=this.graphData[i].comments;

      console.log("Pyar--"+JSON.stringify(this.selectedWeekComments));
      console.log("Check01234567---"+JSON.stringify(this.selectedWeekComments));
      for (var p=0;p<this.selectedWeekComments.length;p++) {
        console.log("yj-:"+p);
        this.comm1=this.selectedWeekComments[p].split('|');

        console.log("KJKHU---"+this.comm1[1])
        if(this.comm1[1]==undefined || this.comm1==null)
        {
          console.log("@$#%^&*");
          this.comm1[1]="All SKU";
        }
        this.finn.push({
           sku:this.comm1[1],
           comment:this.comm1[0]
        });

        

        
      }
      console.log("Check000000---"+JSON.stringify(this.finn));
   
  }

  public onFinalForecastCommentSubmit(data: any) {
    if (this.selectedWeekIndex) {
      if (this.graphData[this.selectedWeekIndex].comments.length >= 1) {
        this.graphData[this.selectedWeekIndex].comments[0] = data.comment;
        this.graphData[this.selectedWeekIndex].userComment[0] = data.comment;
        while (this.graphData[this.selectedWeekIndex].comments.length > 1) {
          this.graphData[this.selectedWeekIndex].comments.pop();
        }
      } else {
        this.graphData[this.selectedWeekIndex].comments.push(data.comment);
        this.graphData[this.selectedWeekIndex].userComment.push(data.comment);
      }
    }
    this.finalForecastCommentModalCancel.nativeElement.click();
  }








  public editCommentSubmit(data: any,pk_com:any) {

    pk_com="admin"+pk_com;

    const finaldata={
      key:pk_com,
      data:data.comment
    };

    this.finn[this.selectedWeekIndex].comment=data.comment;

    this.skuService.editComment(finaldata).subscribe((res: any) => {
      this.editCommentModalBtnCancel.nativeElement.click();

    }, (error) => {
      this.editCommentModalBtnCancel.nativeElement.click();

    });
   


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

  public savePlan() {
    this.savePlanLoader = true;
    const reqBody = {
      data: []
    };

    for (const data of this.graphData) {
      const commentsObj = {};
      for (const index in data.userComment) {
        commentsObj[`comments${parseInt(index, 10) + 1}`] = data.userComment[index];
      }

      if (JSON.stringify(commentsObj) !== '{}') {
        const obj = {
          calendarWeek: data.calenderYearWeek,
          sku: this.skus.filter(item => item.isChecked).map(item => item.name),
          user: 'admin',
          cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name),
          plant: this.filters[1].values.filter(item => item.isChecked).map(item => item.name),
        };
        reqBody.data.push(Object.assign(obj, commentsObj));
      }
    }
    if (reqBody.data.length == 0) {
      const obj = {
        calendarWeek: 201935,
        sku: this.skus.filter(item => item.isChecked).map(item => item.name),
        user: 'admin',
        cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name),
        plant: this.filters[1].values.filter(item => item.isChecked).map(item => item.name),
      };
      reqBody.data.push(Object.assign(obj, null));
      console.log('Debug -->' + reqBody.data);
      //   this.skuService.confirmPlan(reqBody.data).subscribe((res: any) => {
      //   this.savePlanLoader = false;
      //   this.PlanNameModalBtn.nativeElement.click();
      // }, (error) => {
      //   this.savePlanLoader = false;
      //   this.PlanNameModalBtn.nativeElement.click();
      // });
    }


    this.skuService.confirmPlan(reqBody.data).subscribe((res: any) => {
      this.savePlanLoader = false;
      this.PlanNameModalBtn.nativeElement.click();
    }, (error) => {
      this.savePlanLoader = false;
      this.PlanNameModalBtn.nativeElement.click();
    });
  }


  public saveView(viewName: string) {
    this.saveViewLoader = true;
    const reqBody: any = {
      user: 'admin',
      sku: this.skus.filter(item => item.isChecked).map(item => item.name).join(','),
      cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name).join(','),
      plant: this.filters[1].values.filter(item => item.isChecked).map(item => item.name).join(','),
      brand: this.filters[2].values.filter(item => item.isChecked).map(item => item.name).join(','),
      viewName,
      startWeek: this.createPlanRequestData.startWeek,
      endWeek: this.createPlanRequestData.endWeek,
      weeklyFinalForecast: []
    };

    for (const data of this.graphData) {
      if (data.week >= this.createPlanRequestData.startWeek) {
        reqBody.weeklyFinalForecast.push(data.finalForecast);
      }
    }


    reqBody.weeklyFinalForecast = reqBody.weeklyFinalForecast.join(',');

    this.viewService.saveView(reqBody).subscribe((res: any) => {
      this.saveViewLoader = false;
      this.ViewNameModalBtn.nativeElement.click();
    }, (error) => {
      console.log(error);
      this.saveViewLoader = false;
      this.ViewNameModalBtn.nativeElement.click();
    });
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
