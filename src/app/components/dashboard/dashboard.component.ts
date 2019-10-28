
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

  @ViewChild('loadFilterModal', {static: false}) loadFilterModal: ElementRef;

  @ViewChild('lockModalCancel', {static: false}) lockModalCancel: ElementRef;


  @ViewChild('lockModal', {static: false}) lockModal: ElementRef;

  @ViewChild('editCommentModalBtn', {static: false}) editCommentModalBtn: ElementRef;

  @ViewChild('finalForecastCommentModalCancel', {static: false}) finalForecastCommentModalCancel: ElementRef;


  @ViewChild('editCommentModalBtnCancel', {static: false}) editCommentModalBtnCancel: ElementRef;
  // Save and Load Filter
  @ViewChild('saveFilterModalCancel', {static: false}) saveFilterModalCancel: ElementRef;
  @ViewChild('loadFilterModalCancel', {static: false}) loadFilterModalCancel: ElementRef;

  public createPlanRequestData: any;


  public avgselected=0;

  public createPlanRequestData_temp: any;

  public inter: any;
  public reactivate_filter_button = 0;

public up=0;
  public greystart;

public countselected=0;
public minselected=0;
public maxselected=0;
  public brandstext;

  public selectallcpg = 0;


  public searchplant;
  public selecteddblclick;

  public granular1 = 'week';
  public createPlanRequestData_featurechange: any;

//public graphData;
  public edit_comment;

  public selectedWeekIndex: number;
  public currentWeek: number;

  public searchText1;
  public searchText34;
  public searchText345;
  public commentSearchText;
  public dropdown_table = 'allweek';


  public selectallskus = 0;
  public skus_search = [];

  public sumselected=0;


  public selected_array=[];

  public pressed = false;


  public searchcpg;

  public UOM = 'HL';
  public loading = false;
  // Filters
  public loadedFilters: any = [];

  public plants = [];

  public selectallplant = 0;

  public selectedskus = [];

  public secondgraph = 'Promo';

  public cpgss;
  public plantss;

  public fgssselected;


  public createdata: any = [];

  public allLogs: any = [];

  public allComments: any = [];


  public main = true;
  public plant_string;
  public cpg_string;
  public log = false;

  public table_up = true;

  public table_down = false;

  public materialgroupfilter = false;
  public second_sku: any = [];
  public weeklycomment = false;


  public planningtable = 'Planning table (HL)';

  public forecastinganalysis = 'Forecast Analysis (HL)';

// [(ngModel)]="planningtable"

// forecastinganalysis


  public comment12 = false;
  public weeks = [];

  public filters1 = [];

  public filters1_brands = [];

  public filters_plant = [];

  public filters2 = [];
  public forecastadd = 0;

  public forecastadd_table = 0;

  public valuestring = '';
  // Loader
  public savePlanLoader = false;

  public saveViewLoader = false;

  // EventEmitter
  public eventsSubject: Subject<any> = new Subject<any>();

  // Constants
  private lastyearDataPointColor = '#1e64aa';
  private finalForecastPointColor = '#17b169';
  private aopDataPointColor = '#B49132';
  private actualDataPointColor = '#00321E';
  private mlDataPointColor = '#46a6b9';

  // Charts
  public chart1;
  public chart2;

  public up_table = false;


  public down_table = false;


  // Graph Data Data points
  public graphData: any = [];
  public finalForecastArray: any = [];
  private actualDataPoints: any = [];




  //public graphData: any = [];
  public finalForecastArray_table: any = [];
  private actualDataPoints_table: any = [];


//HARSHIT

  private property: any = [];
  private property2: any = [];
  private property3: any = [];


  public update;
  private hh: any = [];
  public endWeek;

  public prevactuals;

  private mlDataPoints: any = [];
  private aopDataPoints: any = [];


  private mlDataPoints_table: any = [];
  private aopDataPoints_table: any = [];



  private fvaDataPoints: any = [];


  private fvaDataPoints_table: any = [];

  public abc123 = true;
  public middle = true;

  public second = true;
  private lastYearDataPoints: any = [];
  public finalForecastDataPoints = [];



  private lastYearDataPoints_table: any = [];
  public finalForecastDataPoints_table = [];



  public totalData: any = {
    finalCastTotal: 0,
    harshit: 0,
    fsvtValueAdd: 0,
    apoTotal: 0,
    mlTotal: 0,
    actuals: 0,
    lastYearTotal: 0,
  };





  public totalData_table: any = {
    finalCastTotal: 0,
    harshit: 0,
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

  public allCommentshtml: any = [];

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


    this.skuService.getPlants().subscribe((response: any) => {
      this.plants = response;
      // this.filters_plant=response;


      console.log('Dfsfg---' + JSON.stringify(response));
      const plant = this.plants;
      console.log('HAHA---' + JSON.stringify(plant));
      this.filters_plant.push({
        name: 'Plants',
        key: 'plant',
        isExpanded: false,
        values: response.map(item => {
          return {name: item, isChecked: false};
        })
      });


      for (const b of this.filters_plant[0].values) {
        console.log('fgsfg12345-' + JSON.stringify(b));
        if (b.name.name == 'G001') {
          b.isChecked = true;
        }
      }


      this.createdata.plants;


    });


///////////////////////////////////////////////////////////////////


    this.filterService.getFilters({
      user: 'admin'
    }).subscribe((res: any) => {
      this.loadedFilters = res.map((item) => {
        item.isSelected = false;
        return item;
      });


      // this.endWeek="2020-W04";
      // this.prevactuals="2019-W11";
      //   this.createdata = {
      //     prevactuals:201911,
      //   startWeek: 201942,
      //   endWeek: 202004,
      //   forecastingGroups: [{"id":0,"name":"Grimb Blonde BOT 4X6X0_25  ","isFiltered":true,"isChecked":true}],
      //   customerPlanningGroup: ['G01'],
      //   plants: ['G001']
      // };

      // var temp_fg=[];
      // var temp_cpg=[];
      // var temp_plant=[];
      // for(const abc of this.loadedFilters)
      // {
      //     if(abc.default_Val!=null)
      //     {
      //         temp_fg=JSON.parse(JSON.stringify(abc.sku));

      //         temp_cpg=JSON.parse(JSON.stringify(abc.cpg));

      //         console.log("3454555555-----"+JSON.stringify(abc));
      //         console.log("DSfs23456fs-----"+JSON.stringify(abc.cpg));

      //         temp_plant=JSON.parse(JSON.stringify(abc.plant));
      //     }
      // }


//   console.log("DSfsfs-----"+JSON.stringify(temp_fg));

//   console.log("DSfs23456fs-----"+JSON.stringify(temp_plant));


//   console.log("DSfs23456fs2345-----"+JSON.stringify(temp_cpg));
//   if(temp_cpg.length>0)
//   {
//     var a :any=[];
//  //   this.createdata.forecastingGroups=JSON.parse(JSON.stringify());
// var index=0;
//  for(const abc of temp_fg)
//  {
//      a.push({
//        id:index,
//        name:abc,
//        isFiltered:true,
//        isChecked:true
//      });
//      index++;
//  }


//     console.log("DSfsfs123456-----"+JSON.stringify(a));
//     this.createdata.forecastingGroups=JSON.parse(JSON.stringify(a));
//     this.createdata.plants=JSON.parse(JSON.stringify(temp_plant));

//     console.log("DSfs23456fs345-----"+JSON.stringify(this.createdata.plants));
//     this.createdata.customerPlanningGroup=JSON.parse(JSON.stringify(temp_cpg));


//   console.log("DSfs23456fs234534-----"+JSON.stringify(this.createdata.customerPlanningGroup));
//   }

// this.cpgss=JSON.parse(JSON.stringify(this.createdata.customerPlanningGroup));

// this.plantss=JSON.parse(JSON.stringify(this.createdata.plants));

// this.fgssselected=this.createdata.forecastingGroups;

//   this.skus=JSON.parse(JSON.stringify(this.createdata.forecastingGroups));


// // this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups)).map(item => item.name).map((item) => {
// //       item.isChecked = true;
// //       return item;
// //     });

//   console.log("sdfshbr---"+JSON.stringify(this.createdata));
//    this.createPlan(this.createdata);


    });


/////////////////////////////////////////////////////////////////////////


    this.skuService.getCustomerPlanningGroup().subscribe((response: any) => {

      // this.filters_plant=response;


      const a = response.map(item => {
        return {name: item, isChecked: false};
      });

      console.log('JKHFRR---' + JSON.stringify(response));

      console.log('shbfsh--');
      this.filters.push({
        name: 'CPG',
        key: 'customerPlanningGroup',
        isExpanded: false,
        values: a
      });


      console.log('khguyg-' + JSON.stringify(this.filters));

      for (const b of this.filters[0].values) {
        console.log('fgsfg12345-' + JSON.stringify(b));
        if (b.name.name == 'G04 - CH Aldi') {
          b.isChecked = true;
        }
      }
    });


    this.loading = true;


    this.skuService.getSales().subscribe((response: any) => {

      // this.filters_plant=response;


      console.log('shbfsh--');
      this.filters2.push({
        name: 'Sales Office',
        key: 'salesoffice',
        isExpanded: false,
        values: response.map(item => {
          return {name: item, isChecked: false};
        })
      });


    });


    this.loading = true;
    this.skuService.getTradetype().subscribe((response: any) => {
      this.filters2.push({
        name: 'Trade Type',
        key: 'tradetype',
        isExpanded: false,
        values: response.map(item => {
          return {name: item, isChecked: false};
        })
      });

    });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.loading = true;
    this.skuService.getMaterialgroup().subscribe((response: any) => {

      this.filters1.push({
        name: 'Material Group',
        key: 'materialgroup',
        isExpanded: false,
        values: response
      });


      this.skuService.getBrands().subscribe((response: any) => {

        this.filters1_brands.push({
          name: 'Brands',
          key: 'brands',
          isExpanded: false,
          values: response
        });


        this.loading = true;
        // this.skuService.getSubbrand().subscribe((response: any) => {

        //   this.filters1.push({
        //     name: 'Sub-Brand',
        //     key: 'subbrand',
        //     isExpanded: false,
        //     values: response
        //   });


        this.loading = true;
        this.skuService.getglobalbev().subscribe((response: any) => {

          this.filters1.push({
            name: 'Category',
            key: 'globalbev',
            isExpanded: false,
            values: response
          });


          this.skuService.getbaseunit().subscribe((response: any) => {

            this.filters1.push({
              name: 'Primary Unit',
              key: 'baseunit',
              isExpanded: false,
              values: response
            });

            this.skuService.getpacktype().subscribe((response: any) => {

              this.filters1.push({
                name: 'Pack Type',
                key: 'packtype',
                isExpanded: false,
                values: response
              });


              this.skuService.getAlcP().subscribe((response: any) => {

                this.filters1.push({
                  name: 'ABV',
                  key: 'alcoholper',
                  isExpanded: false,
                  values: response
                });


                this.skuService.getAnimalFlag().subscribe((response: any) => {

                  this.filters1.push({
                    name: 'Segment',
                    key: 'Animal_Flags',
                    isExpanded: false,
                    values: response
                  });


                  this.skuService.getForecastingGroup().subscribe((res: any) => {
                    //  this.plants = response;
                    console.log('767868675-' + JSON.stringify(res));
                    this.skus_search = res;

                    this.skus_search.push({
                      isChecked: true,
                      isFiltered: true,
                      name: 'Testing'
                    });
                  });


                  //////////////////////////////////////////

                  // Load Filters
                  //  this.loadFilters();


                  this.filterService.getFilters({
                    user: 'admin'
                  }).subscribe((res: any) => {
                    this.loadedFilters = res.map((item) => {
                      item.isSelected = false;
                      return item;
                    });


                    this.endWeek = '2020-W04';
                    this.prevactuals = '2019-W35';
                    this.createdata = {
                      prevactuals: 201935,
                      startWeek: 201942,
                      endWeek: 202004,
                      forecastingGroups: [{'id': 0, 'name': 'EVE GrapefCosm BOT 6X4X0_275', 'isFiltered': true, 'isChecked': true}],
                      customerPlanningGroup: ['G04 - CH Aldi'],
                      plants: ['G001']
                    };
                    
                    var temp_fg = [];
                    var temp_cpg = [];
                    var temp_plant = [];
                    for (const abc of this.loadedFilters) {
                      if (abc.default_Val != null) {
                        temp_fg = JSON.parse(JSON.stringify(abc.sku));

                        temp_cpg = JSON.parse(JSON.stringify(abc.cpg));

                        temp_plant = JSON.parse(JSON.stringify(abc.plant));
                      }
                    }

                    if (temp_cpg.length > 0) {
                      //   this.createdata.forecastingGroups=JSON.parse(JSON.stringify());

                      // var a=temp_fg.filter(item => item.isChecked).map(item => item.name);

                      var a: any = [];
                      //   this.createdata.forecastingGroups=JSON.parse(JSON.stringify());
                      var index = 0;
                      for (const abc of temp_fg) {
                        a.push({
                          id: index,
                          name: abc,
                          isFiltered: true,
                          isChecked: true
                        });
                        index++;
                      }
                      this.createdata.forecastingGroups = JSON.parse(JSON.stringify(a));
                      this.createdata.plants = JSON.parse(JSON.stringify(temp_plant));
                      this.createdata.customerPlanningGroup = JSON.parse(JSON.stringify(temp_cpg));
                    }

                    this.cpgss = JSON.parse(JSON.stringify(this.createdata.customerPlanningGroup));

                    this.plantss = JSON.parse(JSON.stringify(this.createdata.plants));

                    this.fgssselected = this.createdata.forecastingGroups;

                    this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups));


                    // this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups)).map(item => item.name).map((item) => {
                    //       item.isChecked = true;
                    //       return item;
                    //     });

                   

                    this.createdata.customerPlanningGroup[0]= this.createdata.customerPlanningGroup[0].split('-')[0];
                    console.log('sdfshbr234---' + JSON.stringify(this.createdata.customerPlanningGroup[0].split("-")));
                    console.log('sdfshbr---' + JSON.stringify(this.createdata));
                    this.createPlan(this.createdata);


                  });


                  //////////////////////////////////////////////


                });


              });


            });


            //});


          });


        });


      });


    });


///////////////////////////////////////////////////////////////////////////////////////////////////////////


//   this.filterService.getFilters({
//     user: 'admin'
//   }).subscribe((res: any) => {
//     this.loadedFilters = res.map((item) => {
//       item.isSelected = false;
//       return item;
//     });


//     this.endWeek="2020-W04";
//     this.prevactuals="2019-W11";
//       this.createdata = {
//         prevactuals:201911,
//       startWeek: 201942,
//       endWeek: 202004,
//       forecastingGroups: [{"id":0,"name":"Grimb Blonde BOT 4X6X0_25  ","isFiltered":true,"isChecked":true}],
//       customerPlanningGroup: ['G01'],
//       plants: ['G001']
//     };

//     var temp_fg=[];
//     var temp_cpg=[];
//     var temp_plant=[];
//     for(const abc of this.loadedFilters)
//     {
//         if(abc.default_Val!=null)
//         {
//             temp_fg=JSON.parse(JSON.stringify(abc.sku));

//             temp_cpg=JSON.parse(JSON.stringify(abc.cpg));

//             temp_plant=JSON.parse(JSON.stringify(abc.plant));
//         }
//     }

//     if(temp_cpg.length>0)
//     {
//    //   this.createdata.forecastingGroups=JSON.parse(JSON.stringify());

//      // var a=temp_fg.filter(item => item.isChecked).map(item => item.name);

//          var a :any=[];
//  //   this.createdata.forecastingGroups=JSON.parse(JSON.stringify());
// var index=0;
//  for(const abc of temp_fg)
//  {
//      a.push({
//        id:index,
//        name:abc,
//        isFiltered:true,
//        isChecked:true
//      });
//      index++;
//  }
//       this.createdata.forecastingGroups=JSON.parse(JSON.stringify(a));
//       this.createdata.plants=JSON.parse(JSON.stringify(temp_plant));
//       this.createdata.customerPlanningGroup=JSON.parse(JSON.stringify(temp_cpg));
//     }

//   this.cpgss=JSON.parse(JSON.stringify(this.createdata.customerPlanningGroup));

//   this.plantss=JSON.parse(JSON.stringify(this.createdata.plants));

//   this.fgssselected=this.createdata.forecastingGroups;

//     this.skus=JSON.parse(JSON.stringify(this.createdata.forecastingGroups));


//   // this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups)).map(item => item.name).map((item) => {
//   //       item.isChecked = true;
//   //       return item;
//   //     });

//     console.log("sdfshbr---"+JSON.stringify(this.createdata));
//      this.createPlan(this.createdata);


//   });


    //  this.skuService.getbaseunit().subscribe((response: any) => {

    //   this.filters1.push({
    //     name: 'Base Unit',
    //     key: 'baseunit',
    //     isExpanded: false,
    //     values: response
    //   });

    //  });


    // this.createPlanRequestData.baseunit = res.req.baseunit;


    // const pack_size = this.createPlanRequestData.pack_size;
    // this.filters1.push({
    //   name: 'Pack Size',
    //   key: 'pack_size',
    //   isExpanded: false,
    //   values: pack_size.map(item => {
    //     return {name: item, isChecked: false};
    //   })
    // });


    //  const materialgroup = this.createPlanRequestData.materialgroup;
    //  this.filters1.push({
    //    name: 'Material Group',
    //    key: 'materialgroup',
    //    isExpanded: false,
    //    values: materialgroup.map(item => {
    //      return {name: item, isChecked: false};
    //    })
    //  });


    //  const globalBev = this.createPlanRequestData.globalBev;
    //  this.filters1.push({
    //    name: 'Global-Bev-Cat',
    //    key: 'GlobalBev',
    //    isExpanded: false,
    //    values: globalBev.map(item => {
    //      return {name: item, isChecked: false};
    //    })
    //  });


    this.skuService.getForecastingGroup().subscribe((res: any) => {
      //  this.plants = response;
      console.log('767868675-' + JSON.stringify(res));
      this.skus_search = res;

      this.skus_search.push({
        isChecked: true,
        isFiltered: true,
        name: 'Testing'
      });


    });


    this.skuService.getSkUList({
      filterBrands: []
    }).subscribe((res: any) => {

      console.log('909090==' + JSON.stringify(res));
      this.skus_search = JSON.parse(JSON.stringify(res)).map(item => item.name),
        this.skus = res;
    });


    this.skuService.getEvents().subscribe((res: any) => {
      this.events = res;
    });

    this.skuService.getWeathers().subscribe((res: any) => {
      this.weathers = res;
    });


    this.endWeek = '2020-W04';
    this.prevactuals = '2019-W35';
    this.createdata = {
      prevactuals: 201935,
      startWeek: 201942,
      endWeek: 202004,
      forecastingGroups: [{'id': 0, 'name': 'EVE GrapefCosm BOT 6X4X0_275', 'isFiltered': true, 'isChecked': true}],
      customerPlanningGroup: ['G01'],
      plants: ['G001']
    };

    this.cpgss = JSON.parse(JSON.stringify(this.createdata.customerPlanningGroup));

    this.plantss = JSON.parse(JSON.stringify(this.createdata.plants));

    this.fgssselected = this.createdata.forecastingGroups;

    this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups));

   
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


  }

  ngAfterViewInit(): void {
    //  this.selectOptionsModalBtn.nativeElement.click();


// this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups)).map(item => item.name).map((item) => {
//       item.isChecked = true;
//       return item;
//     });

    // document.getElementsByClassName('canvasjs-chart-toolbar')[0].remove();
    // document.getElementsByClassName('canvasjs-chart-toolbar').
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


  public reactivate_filter(a: number) {


    console.log('Graph - ' + JSON.stringify(this.graphData));


    this.reactivate_filter_button = 1;
    console.log('FGSSSSS2345ytujhnbv_initial---' + JSON.stringify(this.fgssselected));
    document.getElementById('apply_filter').style.background = '#17b169';


    this.cpgss = this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]);
    this.plantss = this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name);


    var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name);
    var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name);

    for (const abc of fgssselected2) {
      fgssselected1.push(abc);
    }
    this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));


    console.log('FGSSSSS2345ytujhnbv---' + JSON.stringify(this.fgssselected));

//this.fgssselected
    console.log('DSfsdfsd234----' + JSON.stringify(this.filters[0].values.filter(item => item.isChecked).map(item => item.name)));
    //   data.forecastingGroups = this.skus.filter(item => item.isChecked).map(item => item.name);


  }

  public deactivate() {
    //  document.getElementById('apply_filter').style.background='#003228';
    //document.getElementById("apply_filter").disabled=true;
    this.reactivate_filter_button = 0;
    console.log('dfsdfsdfsdf----');
    document.getElementById('apply_filter').style.background = '#808080';


    const login = {
      Username: 'admin',
      activity: 'Applied Filter',
      datetimestamp: JSON.stringify(this.update)
    };

    this.skuService.sendLog(login).subscribe((res: any) => {

    });


  }

  // Event Handlers
  public onChangeParameters(name = 'change-horizon') {
    this.eventsSubject.next({
      page: name,
      data: JSON.parse(JSON.stringify(this.createPlanRequestData))
    });
    this.selectOptionsModalBtn.nativeElement.click();
  }


  public test(feature: any) {

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


    if (feature == 'Open' && this.granular1 == 'week') {

      this.createPlanRequestData.which_feature = 'Open';
      //   kjsfhksjhgsfhgdfsg
      this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {
        this.valuestring = 'Open Order';
        this.processFeatureGraphData(res);

        console.log('thhh->' + this.createPlanRequestData.startWeek);
        console.log('ISSE PTA--' + this.greystart);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,

          backgroundColor: '#FFFFFF',
          legend: {
            cursor: 'pointer',
            fontSize: 10,
            itemclick: this.toggleDataSeries1.bind(this)
          },
          axisX: {
            valueFormatString: '######',
            gridColor: '#ffffff',

            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201853,
                  endValue: 201900
                },
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
                startValue: 201942,
                endValue: 201953,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202053,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
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

            name: 'Open',
            type: 'column',
            showInLegend: true,
            gridColor: '#ffffff',
            labelFontColor: 'black',
            color: '#17b169',
            dataPoints: this.property
          }]
        });
        this.chart2.render();

      });
    } else if (feature == 'Open' && this.granular1 == 'month') {

      this.createPlanRequestData.which_feature = 'Open';
      this.skuService.getFeatureGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
        this.valuestring = 'Open Order';
        this.processFeatureGraphData(res);

        console.log('thhh->' + this.createPlanRequestData.startWeek);
        console.log('ISSE PTA--' + this.greystart);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,

          backgroundColor: '#FFFFFF',
          legend: {
            cursor: 'pointer',
            fontSize: 10,
            itemclick: this.toggleDataSeries1.bind(this)
          },
          axisX: {
            valueFormatString: '######',
            gridColor: '#ffffff',

            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201813,
                  endValue: 201900
                },
                {
                  startValue: 201913,
                  endValue: 202000
                },
                {
                  startValue: 202013,
                  endValue: 202100
                },
                {
                  startValue: 202113,
                  endValue: 202200
                },
                {
                  startValue: 202213,
                  endValue: 202300
                }
              ]
            },
            stripLines: [
              {
                startValue: 201909,
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
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

            name: 'Open',
            type: 'line',
            showInLegend: true,
            gridColor: '#ffffff',
            labelFontColor: 'black',
            color: '#17b169',
            dataPoints: this.property
          }]
        });
        this.chart2.render();

      });
    } else if (feature == 'Baseline' && this.granular1 == 'month') {

      this.createPlanRequestData.which_feature = 'Baseline';
      this.skuService.getFeatureGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {

        //this.createPlanRequestData.brands = res.req.brands;

        if (feature == 'Baseline') {

          this.valuestring = 'Baseline';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Weather') {
          this.valuestring = 'Weather';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Promo') {
          this.valuestring = 'Promo';
          this.processFeatureGraphData_open(res);
        }

        //  this.createFilterObject(res);


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
          backgroundColor: '#FFFFFF',
          legend: {
            cursor: 'pointer',
            itemclick: this.toggleDataSeries1.bind(this)
          },
          axisX: {
            valueFormatString: '######',
            gridColor: '#ffffff',

            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201813,
                  endValue: 201900
                },
                {
                  startValue: 201913,
                  endValue: 202000
                },
                {
                  startValue: 202013,
                  endValue: 202100
                },
                {
                  startValue: 202113,
                  endValue: 202200
                },
                {
                  startValue: 202213,
                  endValue: 202300
                }
              ]
            },
            stripLines: [
              {
                startValue: 201909,
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },

          toolTip: {
            content: '{y}'


          },
          // toolTip: {
          //   shared: true,

          // },
          data: [
            {
              name: 'Baseline',
              type: 'stackedArea',
              gridColor: '#ffffff',

              showInLegend: true,
              color: '#17b169',
              lineColor: '#17b169',
              dataPoints: this.property
            },
            {
              name: 'Promo Effect',
              type: 'stackedArea',
              gridColor: '#ffffff',

              showInLegend: true,
              color: ' #46a6b9',
              lineColor: '#46a6b9',
              dataPoints: this.property3
            }

          ]
        });
        this.chart2.render();


      });
    } else if (feature == 'Baseline' && this.granular1 == 'week') {

      this.createPlanRequestData.which_feature = 'Baseline';
      this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {

        //this.createPlanRequestData.brands = res.req.brands;

        if (feature == 'Baseline') {

          this.valuestring = 'Baseline';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Weather') {
          this.valuestring = 'Weather';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Promo') {
          this.valuestring = 'Promo';
          this.processFeatureGraphData_open(res);
        }

        //  this.createFilterObject(res);


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
          backgroundColor: '#FFFFFF',
          legend: {
            cursor: 'pointer',
            itemclick: this.toggleDataSeries1.bind(this)
          },
          axisX: {
            valueFormatString: '######',
            gridColor: '#ffffff',

            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201853,
                  endValue: 201900
                },
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
                startValue: 201942,
                endValue: 201953,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202053,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },

          toolTip: {
            content: '{y}'


          },
          // toolTip: {
          //   shared: true,

          // },
          data: [
            {
              name: 'Baseline',
              type: 'stackedArea',
              gridColor: '#ffffff',

              showInLegend: true,
              color: '#17b169',
              lineColor: '#17b169',
              dataPoints: this.property
            },
            {
              name: 'Promo Effect',
              type: 'stackedArea',
              gridColor: '#ffffff',

              showInLegend: true,
              color: ' #46a6b9',
              lineColor: '#46a6b9',
              dataPoints: this.property3
            }

          ]
        });
        this.chart2.render();


      });
    } else if (feature == 'Promo' && this.granular1 == 'month') {


      this.createPlanRequestData.which_feature = 'Promo';
      this.skuService.getFeatureGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {

        //this.createPlanRequestData.brands = res.req.brands;

        if (feature == 'Baseline') {

          this.valuestring = 'Baseline';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Weather') {
          this.valuestring = 'Weather';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Promo') {
          this.valuestring = 'Promo';
          this.processFeatureGraphData_open(res);
        }

        //  this.createFilterObject(res);


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
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
                  startValue: 201813,
                  endValue: 201900
                },
                {
                  startValue: 201913,
                  endValue: 202000
                },
                {
                  startValue: 202013,
                  endValue: 202100
                },
                {
                  startValue: 202113,
                  endValue: 202200
                },
                {
                  startValue: 202213,
                  endValue: 202300
                }
              ]
            },
            stripLines: [
              {
                startValue: 201909,
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },

          toolTip: {
            content: '{y}'


          },
          // toolTip: {
          //   shared: true,

          // },
          data: [
            {
              name: 'Average',
              type: 'line',
              gridColor: '#ffffff',
              labelFontColor: 'black',
              showInLegend: true,
              lineColor: '#17b169',
              dataPoints: this.property
            }

          ]
        });
        this.chart2.render();


      });
    } else if (feature == 'Promo' && this.granular1 == 'week') {

      this.createPlanRequestData.which_feature = 'Promo';
      this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {

        //this.createPlanRequestData.brands = res.req.brands;

        if (feature == 'Baseline') {

          this.valuestring = 'Baseline';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Weather') {
          this.valuestring = 'Weather';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Promo') {
          this.valuestring = 'Promo';
          this.processFeatureGraphData_open(res);
        }

        //  this.createFilterObject(res);


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                startValue: 201942,
                endValue: 201953,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202053,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },

          toolTip: {
            content: '{y}'


          },
          // toolTip: {
          //   shared: true,

          // },
          data: [
            {
              name: 'Average',
              type: 'line',
              gridColor: '#ffffff',
              labelFontColor: 'black',
              showInLegend: true,
              lineColor: '#17b169',
              dataPoints: this.property
            }

          ]
        });
        this.chart2.render();


      });
    } else if (feature == 'Weather' && this.granular1 == 'month') {
      this.skuService.getFeatureGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {

        //this.createPlanRequestData.brands = res.req.brands;

        if (feature == 'Baseline') {

          this.valuestring = 'Baseline';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Weather') {
          this.valuestring = 'Weather';
          this.processFeatureGraphData_open_boolean(res);
        } else if (feature == 'Promo') {
          this.valuestring = 'Promo';
          this.processFeatureGraphData_open(res);
        }

        //  this.createFilterObject(res);


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
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
                  startValue: 201813,
                  endValue: 201900
                },
                {
                  startValue: 201913,
                  endValue: 202000
                },
                {
                  startValue: 202013,
                  endValue: 202100
                },
                {
                  startValue: 202113,
                  endValue: 202200
                },
                {
                  startValue: 202213,
                  endValue: 202300
                }
              ]
            },
            stripLines: [
              {
                startValue: 201909,
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },

          toolTip: {
            content: '{y}'


          },
          // toolTip: {
          //   shared: true,

          // },
          data: [
            {
              type: 'column',
              color: '#46a5b9',
              showInLegend: true,
              gridColor: '#ffffff',
              labelFontColor: 'black',

              dataPoints: this.property
            }
          ]
        });
        this.chart2.render();


      });
    } else if (feature == 'Weather' && this.granular1 == 'week') {
      this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {

        //this.createPlanRequestData.brands = res.req.brands;

        if (feature == 'Baseline') {

          this.valuestring = 'Baseline';
          this.processFeatureGraphData_open(res);
        } else if (feature == 'Weather') {
          this.valuestring = 'Weather';
          this.processFeatureGraphData_open_boolean(res);
        } else if (feature == 'Promo') {
          this.valuestring = 'Promo';
          this.processFeatureGraphData_open(res);
        }

        //  this.createFilterObject(res);


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              }, {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
            valueFormatString: '######',
            gridColor: '#ffffff',
          },

          toolTip: {
            content: '{y}'


          },
          // toolTip: {
          //   shared: true,

          // },
          data: [
            {
              type: 'column',
              color: '#46a5b9',
              showInLegend: true,
              gridColor: '#ffffff',
              labelFontColor: 'black',

              dataPoints: this.property
            }
          ]
        });
        this.chart2.render();


      });
    }


  }


  public refresh() {
    window.location.reload();
  }


  public addItems(itemId: number) {

    console.log('TESTIGN^&*IH---' + JSON.stringify(this.fgssselected));
    const itemIndex = this.skus_search.findIndex((item) => item.id === itemId);
    var item1 = this.skus_search[itemIndex];

    var arr = item1.name.split('-');

    var fin_item = arr[0];

    item1.name = fin_item;

    console.log('sdfjs---' + JSON.stringify(item1));

    console.log('sdfjs---' + JSON.stringify(this.skus));
    item1.isFiltered = false;
    this.selectedskus.push(item1);
    this.skus_search.splice(itemIndex, 1);
    var flag = 0;
    for (const ab of this.skus) {
      console.log('ITEM -' + item1.name);
      console.log('ITEM_SKU -' + ab.name);

      if (item1.name === ab.name) {
        flag = 1;

      }
    }
    console.log('FLAGGER--' + flag);
    if (flag == 0) {
      document.getElementById('apply_filter').style.background = '#17b169';
      this.second_sku.push(item1);
    } else if (flag == 1) {
      console.log('nhi ha');
    }


    console.log('TESTIGN^&*IH_END---' + JSON.stringify(this.fgssselected));

  }


  public fgshow() {
    this.pressed = true;
  }


  public fghide() {
    this.pressed = false;
  }


  public uom(feature: string) {

    console.log('Harsh134->' + feature);

    console.log('GRANUALLLL---' + this.granular1);

    if (this.reactivate_filter_button == 1) {
      window.alert('Please try to choose plan selection first');
      return;
    }

    if(feature =='L' && this.granular1=="week")
    {

      this.planningtable = 'Planning table (L)';

      document.getElementById('planningtable').innerHTML = 'Planning table (L)';

      document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (L)';


      this.forecastinganalysis = 'Forecast Analysis (L)';

      // this.prevactuals = '2019-W01';
      // this.endWeek = '2019-W52';
      //const data=this.createPlanRequestData;
      console.log('Create_Plan->' + JSON.stringify(this.createPlanRequestData));
      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        prevactuals: this.createPlanRequestData.prevactuals,
        // forecastingGroups: data.forecastingGroups,
        forecastingGroups: JSON.parse(JSON.stringify(this.hh)).map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
      };
      //this.test();
      this.loading = true;
      this.skuService.getGraphData_L(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;

        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;

        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.processGraphData(res);
        //this.processgraphData(res);

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
        //    color: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.secondgraph='Open order';
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              },

            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',

              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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


    if(feature =='L' && this.granular1=="month")
    {

      this.planningtable = 'Planning table (L)';

      document.getElementById('planningtable').innerHTML = 'Planning table (L)';

      document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (L)';


      this.forecastinganalysis = 'Forecast Analysis (L)';

      // this.prevactuals = '2019-W01';
      // this.endWeek = '2019-W52';
      //const data=this.createPlanRequestData;
      console.log('Create_Plan->' + JSON.stringify(this.createPlanRequestData));
      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        prevactuals: this.createPlanRequestData.prevactuals,
        // forecastingGroups: data.forecastingGroups,
        forecastingGroups: JSON.parse(JSON.stringify(this.hh)).map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
      };
      //this.test();
      this.loading = true;
      this.skuService.getGraphData_L_month(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;

        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;

        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.processGraphData(res);
      //  //this.processgraphData(res);

        //this.processFeatureGraphData(res);
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
        //    color: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.secondgraph='Open order';
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              },

            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',

              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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

    if (feature == 'PC') {


      this.planningtable = 'Planning table (PC)';

      document.getElementById('planningtable').innerHTML = 'Planning table (PC)';

      document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (PC)';


      this.forecastinganalysis = 'Forecast Analysis (PC)';

      this.prevactuals = '2019-W01';
      this.endWeek = '2019-W52';
      //const data=this.createPlanRequestData;
      console.log('Create_Plan->' + JSON.stringify(this.createPlanRequestData));
      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        prevactuals: this.createPlanRequestData.prevactuals,
        // forecastingGroups: data.forecastingGroups,
        forecastingGroups: JSON.parse(JSON.stringify(this.hh)).map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
      };
      //this.test();
      this.loading = true;
      this.skuService.getGraphData_week_uom(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;

        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;

        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.processGraphData(res);
        //this.processgraphData(res);

        //this.processFeatureGraphData(res);
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
        //    color: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.secondgraph='Open order';
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              },

            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',

              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
              lineColor: this.finalForecastPointColor,
              dataPoints: this.finalForecastDataPoints
            }
          ]
        });
        this.chart1.render();
        this.CanvasJSDataAsCSV();
        this.selectOptionsModalCancel.nativeElement.click();
      });


    } else if (feature == 'year' && this.granular1 == 'month') {

      console.log('MONTH-234567>' + JSON.stringify(this.hh));
      //  const data=this.createPlanRequestData;


      console.log('Create_Plan1234->' + JSON.stringify(this.hh));

      this.prevactuals = '2019-W01';
      this.endWeek = '2019-W52';

      this.createPlanRequestData = {
        startWeek: 201942,
        endWeek: 201952,
        prevactuals: 201901,
        forecastingGroups: this.fgssselected.map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
      };
      //this.test();

      console.log('WOW->' + JSON.stringify(this.createPlanRequestData));
      this.loading = true;
      this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.processGraphData(res);
        //this.processgraphData(res);

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
        //
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
        //    color: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.chart2.render();
        console.log('ISSE PTA--' + this.greystart);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
          backgroundColor: '#FFFFFF',
          legend: {
            cursor: 'pointer',
            fontSize: 10,
            itemclick: this.toggleDataSeries1.bind(this)
          },
          axisX: {
            valueFormatString: '######',
            gridColor: '#ffffff',
            theme: 'light2',
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201813,
                  endValue: 201900
                },
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
                startValue: this.greystart,
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },
          axisY: {
            title: ' ',
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

          data: [
            {
              name: 'Average ',
              showInLegend: true,
              type: 'spline',
              color: '#46a5b9',
              lineColor: '#46a5b9',
              dataPoints: this.property3
            }


          ]
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
            interval: 1,
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201812,
                  endValue: 201900
                },
                {
                  startValue: 201913,
                  endValue: 202000
                },
                {
                  startValue: 202013,
                  endValue: 202099
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
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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
    } else if (feature == 'month') {


      console.log('MONTH->' + JSON.stringify(this.hh));
      //  const data=this.createPlanRequestData;


      console.log('Create_Plan1234->' + JSON.stringify(this.hh));


      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        prevactuals: this.createPlanRequestData.prevactuals,
        forecastingGroups: this.fgssselected.map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
      };
      //this.test();


      this.skus = JSON.parse(JSON.stringify(this.fgssselected));
      console.log('WOW->' + JSON.stringify(this.createPlanRequestData));
      this.loading = true;
      this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.processGraphData(res);
        //this.processgraphData(res);

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
        //     //   ,
        //     //     endValue: 202003,
        //     //     color: '#F2F3F5'
        //     //   }
        //     // ]
        //   },
        //   axisY: {
        //
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
        //    color: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.chart2.render();

        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
          backgroundColor: '#FFFFFF',
          legend: {
            cursor: 'pointer',
            fontSize: 10,
            itemclick: this.toggleDataSeries1.bind(this)
          },
          axisX: {
            valueFormatString: '######',
            gridColor: '#ffffff',
            theme: 'light2',
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201813,
                  endValue: 201900
                },
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
                startValue: this.greystart,
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },
          axisY: {
            title: ' ',
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

          data: [
            {
              name: 'Average ',
              showInLegend: true,
              type: 'spline',
              color: '#46a5b9',
              lineColor: '#46a5b9',
              dataPoints: this.property3
            }


          ]
        });


        this.chart2.render();

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
            interval: 1,
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201813,
                  endValue: 201900
                },
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
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              }, {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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
    } else if (feature == 'HL') {

      if (this.fgssselected.length == 0) {
        window.alert('Please select atleast one FG');
        return;
      }

      // const data=this.createPlanRequestData;
//  console.log("Create_Plan->"+JSON.stringify(data));
      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        prevactuals: this.createPlanRequestData.prevactuals,
        forecastingGroups: this.fgssselected.map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
      };

      //this.skus=JSON.parse(JSON.stringify(this.fgssselected));
      //this.test();
      this.loading = true;
      this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.processGraphData(res);
        //this.processgraphData(res);

       // this.processFeatureGraphData(res);
        this.createFilterObject(res);
        // this.skus = this.createPlanRequestData.forecastingGroups.map((item) => {
        //   item.isChecked = true;
        //   return item;
        // });


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        // // console.log("ISSE PTA--"+this.greystart);
        // this.chart2 = new CanvasJS.Chart('chartContainer2', {
        //   animationEnabled: true,
        //   showInLegend: true,
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
        //           startValue: 201853,
        //           endValue: 201900
        //         },
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
        //         endValue: 202053,
        //         color: '#F2F3F5'
        //       }, {
        //         startValue: 202100,
        //         endValue: 202153,
        //         color: '#F2F3F5'
        //       }, {
        //         startValue: 202200,
        //         endValue: 202253,
        //         color: '#F2F3F5'
        //       }
        //     ]
        //   },
        //   axisY: {
        //     title: ' ',
        //     valueFormatString: '######',
        //     gridColor: '#ffffff',
        //   },

        //   toolTip: {
        //     content: '{y}'
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
        //   // },

        //   data: [
        //     {
        //       type: 'line',
        //       gridColor: '#ffffff',
        //       showInLegend: true,
        //       labelFontColor: 'black',
        //       color: '#000',
        //       dataPoints: this.property
        //     },
        //     {
        //       type: 'line',
        //       gridColor: '#ffffff',
        //       showInLegend: true,
        //       labelFontColor: 'black',
        //       color: '#000',
        //       dataPoints: this.property2
        //     },
        //     {
        //       type: 'line',
        //       gridColor: '#ffffff',
        //       showInLegend: true,
        //       labelFontColor: 'black',
        //       color: '#000',
        //       dataPoints: this.property3
        //     }

        //   ]
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              }, {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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
    //           startValue: 201942,
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
    //
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
    //      color: '#000',
    //       dataPoints: this.property
    //     }]
    //   });
    //   this.chart2.render();


    // });
  }


  public test1(feature: string) {
    if (this.reactivate_filter_button == 1) {
      window.alert('Please try to choose plan selection first');
      return;
    }
    console.log('Harsh134->' + feature);

    console.log('GRANUALLLL---' + this.granular1);


    if (feature == 'year' && this.granular1 == 'week') {

      console.log('dsfsdffgsf--' + document.getElementById('granular').innerHTML);
      this.prevactuals = '2019-W01';
      this.endWeek = '2019-W52';
      //const data=this.createPlanRequestData;
      console.log('Create_Plan->' + JSON.stringify(this.createPlanRequestData));
      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        prevactuals: this.createPlanRequestData.prevactuals,
        // forecastingGroups: data.forecastingGroups,
        forecastingGroups: JSON.parse(JSON.stringify(this.hh)).map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name)
      };
      //this.test();
      this.loading = true;
      this.skuService.getGraphData_yearly(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;

        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;

        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.processGraphData(res);
        //this.processgraphData(res);

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
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              }, {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },
          axisY: {

            valueFormatString: '######',
            gridColor: '#ffffff',
          },

          toolTip: {
            content: 'Value: {y}'
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

            color: '#17b169',
            labelFontColor: 'black',
            dataPoints: this.property
          }]
        });
        this.secondgraph = 'Open';
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',

              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
              lineColor: this.finalForecastPointColor,
              dataPoints: this.finalForecastDataPoints
            }
          ]
        });
        this.chart1.render();
        this.CanvasJSDataAsCSV();
        this.selectOptionsModalCancel.nativeElement.click();
      });


    } else if (feature == 'year' && this.granular1 == 'month') {

      console.log('MONTH-234567>' + JSON.stringify(this.hh));
      //  const data=this.createPlanRequestData;


      console.log('Create_Plan1234->' + JSON.stringify(this.hh));

      this.prevactuals = '2019-W01';
      this.endWeek = '2019-W52';

      this.createPlanRequestData = {
        startWeek: 201942,
        endWeek: 201952,
        prevactuals: 201901,
        forecastingGroups: this.fgssselected.map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
      };
      //this.test();

      console.log('WOW->' + JSON.stringify(this.createPlanRequestData));
      this.loading = true;
      this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.processGraphData(res);
        //this.processgraphData(res);

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
        //
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
        //    color: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.chart2.render();


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
                  startValue: 201813,
                  endValue: 201900
                },
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
                startValue: this.createPlanRequestData.startWeek,
                endValue: 201953,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202053,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              }, {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },
          axisY: {

            valueFormatString: '######',
            gridColor: '#ffffff',
          },

          toolTip: {
            content: 'Value: {y}'
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

            color: '#17b169',
            labelFontColor: 'black',
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
            interval: 1,
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201812,
                  endValue: 201900
                },
                {
                  startValue: 201913,
                  endValue: 202000
                },
                {
                  startValue: 202013,
                  endValue: 202099
                },
                {
                  startValue: 202113,
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
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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
    } else if (feature == 'month') {


      console.log('MONTH->' + JSON.stringify(this.hh));
      //  const data=this.createPlanRequestData;


      console.log('Create_Plan1234->' + JSON.stringify(this.hh));


      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        prevactuals: this.createPlanRequestData.prevactuals,
        forecastingGroups: this.fgssselected.map(item => item.name),
        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
      };
      //this.test();


      //  this.skus=JSON.parse(JSON.stringify(this.fgssselected));
      console.log('WOW->' + JSON.stringify(this.createPlanRequestData));
      this.loading = true;
      this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.processGraphData(res);
        //this.processgraphData(res);

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
        //
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
        //    color: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.chart2.render();

        console.log('ISSE PTA--' + this.greystart);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
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
                  startValue: 201813,
                  endValue: 201900
                },
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
                startValue: this.greystart,
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              },

            ]
          },
          axisY: {
            title: ' ',
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

          data: [
            //   {
            //   type: 'line',
            //   gridColor: '#ffffff',
            //   showInLegend: true,
            //   labelFontColor: 'black',
            //  color: '#000',
            //   dataPoints: this.property
            // },
            // {
            //   type: 'line',
            //   gridColor: '#ffffff',
            //   showInLegend: true,
            //   labelFontColor: 'black',
            //  color: '#000',
            //   dataPoints: this.property2
            // },
            {
              name: 'Average ',
              showInLegend: true,
              type: 'spline',
              color: '#46a5b9',
              lineColor: '#46a5b9',
              dataPoints: this.property3
            }

          ]
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
            interval: 1,
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201813,
                  endValue: 201900
                },
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
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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
    } else if (feature == 'week') {

      if (this.fgssselected.length == 0) {
        window.alert('Please select atleast one FG');
        return;
      }

      // const data=this.createPlanRequestData;
      //  console.log("Create_Plan->"+JSON.stringify(data));
      this.createPlanRequestData = {
        startWeek: this.createPlanRequestData.startWeek,
        endWeek: this.createPlanRequestData.endWeek,
        prevactuals: this.createPlanRequestData.prevactuals,
        forecastingGroups: this.fgssselected.map(item => item.name),
        customerPlanningGroup: this.createPlanRequestData.customerPlanningGroup,
        plants: this.createPlanRequestData.plants,
      };

      //this.skus=JSON.parse(JSON.stringify(this.fgssselected));
      //this.test();
      this.loading = true;
      this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.processGraphData(res);
        //this.processgraphData(res);

        this.processFeatureGraphData(res);
        this.createFilterObject(res);
        // this.skus = this.createPlanRequestData.forecastingGroups.map((item) => {
        //   item.isChecked = true;
        //   return item;
        // });


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        console.log('ISSE PTA--' + this.greystart);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                startValue: this.greystart,
                endValue: 201953,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202053,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },
          axisY: {
            title: ' ',
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

          data: [
            {
              type: 'line',
              gridColor: '#ffffff',
              showInLegend: true,
              labelFontColor: 'black',
              color: '#000',
              dataPoints: this.property
            },
            {
              type: 'line',
              gridColor: '#ffffff',
              showInLegend: true,
              labelFontColor: 'black',
              color: '#000',
              dataPoints: this.property2
            },
            {
              type: 'line',
              gridColor: '#ffffff',
              showInLegend: true,
              labelFontColor: 'black',
              color: '#000',
              dataPoints: this.property3
            }

          ]
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
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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
    //           startValue: 201942,
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
    //
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
    //      color: '#000',
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


  public comment1() {


    document.getElementById('m').style.background = '';
    document.getElementById('l').style.background = '';
    document.getElementById('w').style.background = '';
    document.getElementById('c').style.background = '#fff';

    this.update = new Date().toJSON('yyyy/MM/dd HH:mm');

    console.log('Hhsdfh--' + JSON.stringify(this.update));
    this.main = false;
    this.comment12 = true;
    this.weeklycomment = false;
    this.log = false;
  }


  public unexpanded1() {


    this.pressed = false;
    document.getElementById('salesofficefilter').className = 'panel-collapse collapse';

    document.getElementById('tradetypefilter').className = 'panel-collapse collapse';

    this.filters2[0].isExpanded = false;
    this.filters2[1].isExpanded = false;
  }

  public unexpanded() {
    this.pressed = false;
    document.getElementById('materialgroupfilter').className = 'panel-collapse collapse';

    this.filters1[0].isExpanded = false;
    this.filters1[1].isExpanded = false;
    this.filters1[2].isExpanded = false;
    this.filters1[3].isExpanded = false;
    this.filters1[4].isExpanded = false;
    this.filters1[5].isExpanded = false;

    this.filters1_brands[0].isExpanded = false;
    // this.filters1[7].isExpanded=false;
    //this.filters1[6].isExpanded=false;


    document.getElementById('brandsfilter').className = 'panel-collapse collapse';

    document.getElementById('globalbevfilter').className = 'panel-collapse collapse';

    //   document.getElementById('subbrandfilter').className='panel-collapse collapse';


    document.getElementById('baseunitfilter').className = 'panel-collapse collapse';

    document.getElementById('packtypefilter').className = 'panel-collapse collapse';


    document.getElementById('alcoholperfilter').className = 'panel-collapse collapse';

    document.getElementById('Animal_Flagsfilter').className = 'panel-collapse collapse';


  }


  public log1() {

    document.getElementById('m').style.background = '';
    document.getElementById('l').style.background = '#fff';
    document.getElementById('c').style.background = '';
    document.getElementById('w').style.background = '';


    this.update = new Date().toJSON('yyyy/MM/dd HH:mm');

    console.log('Hhsdfh--' + JSON.stringify(this.update));
    this.main = false;
    this.comment12 = false;
    this.weeklycomment = false;
    this.log = true;
  }


  public main1() {

    document.getElementById('m').style.background = '#fff';
    document.getElementById('l').style.background = '';
    document.getElementById('c').style.background = '';
    document.getElementById('w').style.background = '';

    this.update = new Date().toJSON('yyyy/MM/dd HH:mm');

    console.log('Hhsdfh--' + JSON.stringify(this.update));
    this.main = true;
    this.comment12 = false;
    this.weeklycomment = false;
    this.log = false;
  }

  public weeklycomment1() {


    if (this.up_table == false) {
      this.up_table = true;
      this.down_table = false;
    } else if (this.up_table == true) {
      this.up_table = false;
      this.down_table = true;
    }


    // document.getElementById('m').style.background='';
    // document.getElementById('l').style.background='';
    // document.getElementById('w').style.background='#fff';
    // document.getElementById('c').style.background='';

    // this.update = new Date().toJSON("yyyy/MM/dd HH:mm");

    // console.log("Hhsdfh--"+JSON.stringify(this.update));
    // this.main=false;
    // this.comment12=false;
    // this.weeklycomment=true;
    // this.log=false;
  }


  public hide_all_comments() {
    if (this.up_table == false && this.down_table == false) {
      this.up_table = true;
      this.down_table = false;
    } else {
      this.up_table = false;
      this.down_table = false;
      this.dropdown_table = 'allweek';
    }


  }


  public changecomment(feature) {
    if (feature == 'allweek') {
      this.up_table = true;
      this.down_table = false;
    } else {
      this.up_table = false;
      this.down_table = true;
    }
  }

  public abc12() {

    if (this.abc123 == true) {
      this.abc123 = false;
      this.second = false;
      document.getElementById('middle').style.margin = '0 20px';

      document.getElementById('upper_middle').style.margin = '0 20px';
      this.chart1.render();
      this.chart2.render();
    } else {
      this.abc123 = true;
      this.second = true;
      document.getElementById('middle').style.margin = '0 200px';

      document.getElementById('upper_middle').style.margin = '0 200px';
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


  public tick() {

    console.log('THIS Prev--' + this.endWeek);

    if (DashboardComponent.transformWeek(this.endWeek) < 201942) {
      window.alert('Please choose end week correctly');
      return;
    }
    if (DashboardComponent.transformWeek(this.prevactuals) > 201942) {
      window.alert('Please choose Actual week correctly');
      return;
    }

    this.createPlanRequestData.endWeek = DashboardComponent.transformWeek(this.endWeek);


    this.createPlanRequestData.prevactuals = DashboardComponent.transformWeek(this.prevactuals);


    console.log('FINALLLLLLLTCK--' + JSON.stringify(this.createPlanRequestData));

    console.log('SDfsfgsdg--' + JSON.stringify(this.createPlanRequestData));

    this.granular1 = 'week';


    //  var fgssselected1=this.skus.filter(item => item.isChecked).map(item => item.name);
    //  var fgssselected2=this.second_sku.filter(item => item.isChecked).map(item => item.name);

    //  for(const abc of fgssselected2)
    //  {
    //    fgssselected1.push(abc);
    //  }
    //  this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));

    console.log('Harshit12121-----' + this.reactivate_filter_button);
    if (this.reactivate_filter_button == 0) {
      this.createPlanRequestData.forecastingGroups = JSON.parse(JSON.stringify(this.fgssselected));

      console.log('TICKKK---' + JSON.stringify(this.fgssselected));
      this.createPlan(this.createPlanRequestData);

    } else {
      window.alert('Please plan selection first, then only you can click this');
    }


  }

  public createPlan(data: any) {


    console.log('GFSECELE---' + JSON.stringify(this.fgssselected));

    // document.getElementById('apply_filter').style.background='#17b169';
    this.loading = true;
    //this.reactivate_filter(2);
    this.createPlanRequestData = {
      startWeek: data.startWeek,
      endWeek: data.endWeek,
      prevactuals: data.prevactuals,
      forecastingGroups: this.fgssselected.map(item => item.name),
      customerPlanningGroup: data.customerPlanningGroup,
      plants: data.plants,
    };

    this.hh = data.forecastingGroups;

    // this.skus=JSON.parse(JSON.stringify(this.fgssselected))

    console.log('hhhh---' + JSON.stringify(this.createPlanRequestData));
    //this.test();


    this.loading = true;
    if (this.granular1 == 'month') {
      this.loading = true;
      this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });

        console.log('CHCHHCHCHC-----' + JSON.stringify(res));
        this.loading = false;
        this.greystart = res.start;
        this.createPlanRequestData.brands = res.req.brands;
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;


        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;


        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.processGraphData(res);
        //this.processgraphData(res);
        
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
        //
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
        //    color: '#000',
        //     dataPoints: this.property
        //   }]
        // });
        // this.chart2.render();


        console.log('ISSE PTA--' + this.greystart);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
          backgroundColor: '#FFFFFF',
          legend: {
            cursor: 'pointer',
            fontSize: 10,
            itemclick: this.toggleDataSeries1.bind(this)
          },
          axisX: {
            valueFormatString: '######',
            gridColor: '#ffffff',
            theme: 'light2',

            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201813,
                  endValue: 201900
                },
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
                startValue: this.greystart,
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },
          axisY: {
            title: ' ',
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

          data: [
            {
              name: 'Average ',
              showInLegend: true,
              type: 'spline',
              color: '#46a5b9',
              lineColor: '#46a5b9',
              dataPoints: this.property3
            }


          ]
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
            interval: 1,
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201813,
                  endValue: 201900
                },
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
                endValue: 201913,
                color: '#F2F3F5'
              },
              {
                startValue: 202000,
                endValue: 202013,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202113,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202213,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',

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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,

              type: 'line',
              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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
    } else {


      this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
        this.eventsSubject.next({
          page: null,
          reset: true,
        });

        if (res.res.length == 0) {
          console.log('CHCHHCHCHC-----' + JSON.stringify(res.res));
          window.alert('No Combination is available');
          this.loading = false;
          return;
        }

        this.createPlanRequestData.brands = res.req.brands;
        this.greystart = res.start;
        this.inter = (res.res.length / 10);
        console.log('GREYSTART--' + this.greystart);
        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
        this.createPlanRequestData.subbrand = res.req.subbrand;
        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
        this.createPlanRequestData.Trade = res.req.trade;
        this.createPlanRequestData.Sales = res.req.sales;

        this.createPlanRequestData.globalBev = res.req.globalBev;
        this.createPlanRequestData.materialgroup = res.req.materialgroup;
        this.createPlanRequestData.baseunit = res.req.baseunit;
        this.createPlanRequestData.pack_type = res.req.pack_type;

        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


        this.createPlanRequestData.pack_size = res.req.pack_size;
        this.createPlanRequestData.cpgname = res.req.cpgname;

        this.loading = false;

        console.log('FIIFIFIIF---' + JSON.stringify(this.createPlanRequestData));


        this.processGraphData(res);
        //this.processgraphData(res);
        document.getElementById('arrow').style.color = 'grey';

        this.processFeatureGraphData(res);
        this.valuestring = 'Promo';
        this.createFilterObject(res);
        // this.skus = data.forecastingGroups.map((item) => {
        //   item.isChecked = true;
        //   return item;
        // });


        console.log('thhh->' + this.createPlanRequestData.startWeek);
        console.log('ISSE PTA--' + this.greystart);
        this.chart2 = new CanvasJS.Chart('chartContainer2', {
          animationEnabled: true,
          showInLegend: true,
          backgroundColor: '#FFFFFF',
          legend: {
            cursor: 'pointer',
            fontSize: 10,
            itemclick: this.toggleDataSeries1.bind(this)
          },
          axisX: {
            valueFormatString: '######',
            gridColor: '#ffffff',
            interval: this.inter,
            theme: 'light2',
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              }, {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },
          axisY: {
            title: ' ',
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

          data: [
            {
              name: 'Average ',
              showInLegend: true,
              type: 'spline',
              color: '#46a5b9',
              lineColor: '#46a5b9',
              dataPoints: this.property3
            }


          ]
        });
        this.chart2.render();

        this.loading = false;
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
            interval: this.inter,
            scaleBreaks: {
              type: 'blank',
              spacing: 0,
              customBreaks: [
                {
                  startValue: 201853,
                  endValue: 201900
                },
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
                endValue: 202053,
                color: '#F2F3F5'
              },
              {
                startValue: 202100,
                endValue: 202153,
                color: '#F2F3F5'
              },
              {
                startValue: 202200,
                endValue: 202253,
                color: '#F2F3F5'
              }
            ]
          },

          axisY: {
            title: ' ',
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
              color: this.actualDataPointColor,
              lineColor: this.actualDataPointColor,
              dataPoints: this.actualDataPoints
            },
            {
              name: 'Actual LY',
              showInLegend: true,
              visible: false,
              type: 'line',
              lineDashType: 'dash',
              color: this.lastyearDataPointColor,
              lineColor: this.lastyearDataPointColor,
              dataPoints: this.lastYearDataPoints
            },
            {
              name: 'ML Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.mlDataPointColor,
              lineColor: this.mlDataPointColor,
              dataPoints: this.mlDataPoints
            },
            {
              name: 'APO Forecast',
              showInLegend: true,
              visible: false,
              type: 'line',
              lineDashType: 'dash',
              color: this.aopDataPointColor,
              lineColor: this.aopDataPointColor,
              dataPoints: this.aopDataPoints
            },
            {
              name: 'Final Forecast',
              showInLegend: true,
              type: 'line',
              lineDashType: 'dash',
              color: this.finalForecastPointColor,
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


    this.skuService.getlogs().subscribe((res: any) => {
      this.allLogs = res;

      console.log('sjkhfgksfgrg---' + JSON.stringify(this.allLogs));

    });

    // this.skuService.getCommnents().subscribe((res: any) => {

    //   console.log("Ffgfgfg----");


    this.skuService.getCommnents().subscribe((res: any) => {
      this.allComments = res.map((item) => {
        item.isSelected = false;
        item.isFiltered=false;
        return item;
      });

      for (const g of this.allComments) {
        this.allCommentshtml.push(g.name);
      }

    }, (error) => {
      // this.allComments = res.map((item) => {
      //   item.isSelected = false;
      //   item.isFiltered=false;
      //   return item;
      // });
      // console.log("fgfgfgfg-----"+this.allComments);
    });
  }


  public hide_comments() {
    if (this.up_table == false) {
      this.up_table = true;
      this.down_table = false;
    } else if (this.up_table == true) {
      this.up_table = false;
      this.down_table = true;
    }
  }


  public table_up_click() {
    this.table_up = false;
    this.table_down = true;
  }


  public table_down_click() {
    this.table_up = true;
    this.table_down = false;
  }

  public viewPlan(data: any) {
    Object.assign(this.createPlanRequestData, {
      startWeek: data.startWeek,
      endWeek: data.endWeek,
      prevactuals: data.prevactuals,
      forecastingGroups: data.forecastingGroups,
      customerPlanningGroup: data.customerPlanningGroup,
      plants: data.plants,
    });

    this.loading = true;
    this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
      this.eventsSubject.next({
        page: null,
        reset: true,
      });

      this.loading = false;
      this.greystart = res.start;
      this.createPlanRequestData.brands = res.req.brands;
      this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
      this.createPlanRequestData.subbrand = res.req.subbrand;
      this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
      this.createPlanRequestData.Trade = res.req.trade;
      this.createPlanRequestData.Sales = res.req.sales;


      this.createPlanRequestData.globalBev = res.req.globalBev;
      this.createPlanRequestData.materialgroup = res.req.materialgroup;
      this.createPlanRequestData.baseunit = res.req.baseunit;
      this.createPlanRequestData.pack_type = res.req.pack_type;

      this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


      this.createPlanRequestData.pack_size = res.req.pack_size;
      this.createPlanRequestData.cpgname = res.req.cpgname;

      //      this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
      this.processGraphData(res);
      //this.processgraphData(res);
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
                startValue: 201853,
                endValue: 201900
              },
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
          title: ' ',

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
            color: this.actualDataPointColor,
            lineColor: this.actualDataPointColor,
            dataPoints: this.actualDataPoints
          },
          {
            name: 'Actual LY',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            color: this.lastyearDataPointColor,
            lineColor: this.lastyearDataPointColor,
            dataPoints: this.lastYearDataPoints
          },
          {
            name: 'ML Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            color: this.mlDataPointColor,
            lineColor: this.mlDataPointColor,
            dataPoints: this.mlDataPoints
          },
          {
            name: 'APO Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            color: this.aopDataPointColor,
            lineColor: this.aopDataPointColor,
            dataPoints: this.aopDataPoints
          },
          {
            name: 'Final Forecast',
            showInLegend: true,
            type: 'line',
            lineDashType: 'dash',
            color: this.finalForecastPointColor,
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


  public down() {
    console.log('Fsgfsg');
    this.downloadCSV({filename: 'planning_table.csv'});
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
      this.downloadCSV({filename: 'planning_table.csv'});
    });

    toolBar.lastChild.appendChild(exportCSV);
  }

  public downloadCSV(args) {
    console.log('CHECKING----' + JSON.stringify(this.graphData));
    let data, filename, link;
    let csv = '';

    csv += '\n';
    csv += 'Start Week ' + this.createPlanRequestData.startWeek;
    csv += '\n';
    csv += 'End Week ' + this.createPlanRequestData.endWeek;
    csv += '\n';
    csv += 'Prev Week ' + this.createPlanRequestData.prevactuals;
    csv += '\n';
    csv += 'Forecasting  ' + JSON.stringify(this.createPlanRequestData.forecastingGroups);
    csv += '\n';
    csv += 'CPG ' + JSON.stringify(this.createPlanRequestData.customerPlanningGroup);
    csv += '\n';
    csv += 'plant' + JSON.stringify(this.createPlanRequestData.plants);
    csv += '\n';

    // const columns = ['CalendarYearWeek', 'Actuals', 'APO', 'ML', 'Actuals Last Year', 'Final Forecast'];

    // columns.push(" ");
    // //columns.push(JSON.stringify)


    // csv += JSON.stringify(this.skus);
    // csv +='\n';
    // csv += columns.join(',');
    // csv += '\n';


    csv += '\n';


    csv += '\n';


    var weeks = [];
    weeks.push('Week');
    for (const point of this.graphData) {
      weeks.push(point.calenderYearWeek);
    }
    weeks.push('Total');

    csv += weeks.join(',');
    csv += '\n';

    console.log('JHGJDGFBVV-----' + JSON.stringify(this.totalData));
    var ml = [];
    ml.push('ML');
    for (const point of this.graphData) {
      ml.push(point.ml);
    }
    ml.push(this.totalData.mlTotal);


    csv += ml.join(',');
    csv += '\n';


    var apo = [];
    apo.push('APO');
    for (const point of this.graphData) {
      apo.push(point.apo);
    }
    apo.push(this.totalData.apoTotal);

    csv += apo.join(',');
    csv += '\n';


    var finalforecast = [];
    finalforecast.push('Final forecast');
    for (const point of this.graphData) {
      finalforecast.push(point.finalForecast);
    }
    finalforecast.push(this.totalData.finalCastTotal);

    csv += finalforecast.join(',');
    csv += '\n';


    var fcsvt = [];
    fcsvt.push('FVA');
    for (const point of this.graphData) {
      fcsvt.push(point.fcstValueAdd);
    }
    fcsvt.push(this.forecastadd);

    csv += fcsvt.join(',');
    csv += '\n';


    var actualslastyear = [];
    actualslastyear.push('Actual Last Year');
    for (const point of this.graphData) {
      actualslastyear.push(point.actualslastyear);
    }
    actualslastyear.push(this.totalData.lastYearTotal);

    csv += actualslastyear.join(',');
    csv += '\n';


    var actualslastyear1 = [];
    actualslastyear1.push('---');
    for (const point of this.graphData) {
      actualslastyear1.push('---');
    }
    actualslastyear1.push('---');

    csv += actualslastyear1.join(',');
    csv += '\n';


    var actuals = [];
    actuals.push('Actuals');
    for (const point of this.graphData) {
      actuals.push(point.actuals);
    }

    actuals.push(this.totalData.actuals);

    csv += '\n';


    //  var total=[];
    //  actuals.push("Total");
    //   for (const point of this.graphData) {
    //     actuals.push(point.actuals);
    //   }


    csv += actuals.join(',');
    csv += '\n';


    // for (const point of this.graphData) {


    //   const first="ML";

    //   ar.splice(0, 0, "three");
    //   const row = [
    //     point.calenderYearWeek,
    //     point.actuals,
    //     point.apo,
    //     point.ml,
    //     point.actualslastyear,
    //     point.finalForecast
    //   ];
    //   csv += row.join(',');
    //   csv += '\n';
    // }

    filename = args.filename || 'planning_table.csv';

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

  private toggleDataSeries1(e) {
    e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
    this.chart2.render();
  }


  public processGraphData(res) {


    // const abc12;
    //   console.log("JOKER12-?"+JSON.stringify(res.req.forecastingGroups));
    // this.skus = res.req.forecastingGroups;

    console.log('JOKER12345678-?' + JSON.stringify(this.skus));
    const data = res.res;


    //  this.filters2=[];


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
      harshit: 0,
      fsvtValueAdd: 0,

      apoTotal: 0,
      mlTotal: 0,
      actuals: 0,
      lastYearTotal: 0,
    };

    this.forecastadd = 0;


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
        newPoint.ml = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(2));
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
        newPoint.initialFinalForecast = week.fva === undefined ? newPoint.ml : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(2)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(2)));

        //newPoint.finalForecast = newData;
        newPoint.finalForecast = parseFloat(DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast).toFixed(2));
        console.log('Debug -' + newPoint.finalForecast);

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
        newPoint.actuals = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(2));
        this.actualDataPoints.push({
          x: key,
          y: newPoint.actuals,
          color: this.actualDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData.actuals += newPoint.actuals;
      }


      console.log('tyt!@#$%^&-------' + JSON.stringify(week));
      if (week.fva !== undefined) {


        const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(2));
        // newPoint.fcstValueAdd = value ? '' : value.toString();
        // console.log('MAN RAMTA->' + value);
        if (value !== undefined) {
          // console.log("343"+JSON.stringify(newPoint));

          console.log('34567890--->' + newPoint.initialFinalForecast.toString());

          console.log('dfghjk-->' + this.totalData.fsvtValueAdd);


          console.log('dfghjk1-->' + this.forecastadd);

          this.forecastadd = parseFloat(this.forecastadd.toFixed(2)) + parseFloat(value.toFixed(2));


          console.log('dfghjk345-->' + this.forecastadd);
          //  this.totalData.fcstValueAdd += newPoint.ml;
          this.totalData.fsvtValueAdd = this.totalData.fsvtValueAdd + newPoint.initialFinalForecast;
          this.totalData.fsvtValueAdd += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
          console.log('TEs23%^&->' + this.totalData.fcstValueAdd);
          newPoint.fcstValueAdd = value;
          this.totalData.fsvtValueAdd += newPoint.fcstValueAdd;
          console.log('3545%^&->' + this.totalData.fcstValueAdd);
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

        console.log('Weeks comment -- ' + week.comment);
        newPoint.comments = week.comment;
      }


      if (week.lockcell) {

        console.log('Suit-------' + week.lockcell);
        newPoint.lockcell = week.lockcell;
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













  public processgraphData(res) {


    // const abc12;
    //   console.log("JOKER12-?"+JSON.stringify(res.req.forecastingGroups));
    // this.skus = res.req.forecastingGroups;

    console.log('JOKER12345678344343-?' + JSON.stringify(this.skus));
    const data = res.res_table;


    //  this.filters2=[];


    console.log('Testing_TABLE__Dfd->' + JSON.stringify(data));
    const newData = [];

    this.aopDataPoints_table.length = 0;

    this.fvaDataPoints_table.length = 0;
    this.mlDataPoints_table.length = 0;
    this.actualDataPoints_table.length = 0;


    this.lastYearDataPoints_table.length = 0;
    this.finalForecastDataPoints_table.length = 0;
    this.graphData = [];


    this.totalData_table = {
      finalCastTotal: 0,
      harshit: 0,
      fsvtValueAdd: 0,

      apoTotal: 0,
      mlTotal: 0,
      actuals: 0,
      lastYearTotal: 0,
    };

    this.forecastadd_table = 0;


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
        newPoint.ml = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(2));
        this.mlDataPoints_table.push({

          x: key,
          y: newPoint.ml,
          color: this.mlDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData_table.mlTotal += newPoint.ml;

        //  console.log("RANG--->"+this.totalData.mlTotal);
      }

      if (week.ml !== undefined) {
        newPoint.initialFinalForecast = week.fva === undefined ? newPoint.ml : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(2)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(2)));

        //newPoint.finalForecast = newData;
        newPoint.finalForecast = parseFloat(DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast).toFixed(2));
        console.log('Debug -' + newPoint.finalForecast);

//        newPoint.fva = week.finalforecast === undefined ? newPoint.ml : DashboardComponent.parseStringToFloat(week.fva);


        //   newPoint.finalForecast = newPoint.initialFinalForecast;
        this.finalForecastDataPoints_table.push({
          x: key,
          y: newPoint.finalForecast,
          color: this.finalForecastPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData_table.finalCastTotal += newPoint.finalForecast;
      }

      if (week.actuals !== undefined) {
        newPoint.actuals = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(2));
        this.actualDataPoints_table.push({
          x: key,
          y: newPoint.actuals,
          color: this.actualDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData_table.actuals += newPoint.actuals;
      }


      console.log('tyt!@#$%^&-------' + JSON.stringify(week));
      if (week.fva !== undefined) {


        const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(2));
        // newPoint.fcstValueAdd = value ? '' : value.toString();
        // console.log('MAN RAMTA->' + value);
        if (value !== undefined) {
          // console.log("343"+JSON.stringify(newPoint));

          console.log('34567890--->' + newPoint.initialFinalForecast.toString());

          console.log('dfghjk-->' + this.totalData_table.fsvtValueAdd);


          console.log('dfghjk1-->' + this.forecastadd_table);

          this.forecastadd_table = parseFloat(this.forecastadd.toFixed(2)) + parseFloat(value.toFixed(2));


          console.log('dfghjk345-->' + this.forecastadd_table);
          //  this.totalData.fcstValueAdd += newPoint.ml;
          this.totalData_table.fsvtValueAdd = this.totalData_table.fsvtValueAdd + newPoint.initialFinalForecast;
          this.totalData_table.fsvtValueAdd += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
          console.log('TEs23%^&->' + this.totalData_table.fcstValueAdd);
          newPoint.fcstValueAdd = value;
          this.totalData_table.fsvtValueAdd += newPoint.fcstValueAdd;
          console.log('3545%^&->' + this.totalData_table.fcstValueAdd);
        }

      }

      if (week.apo !== undefined) {
        newPoint.apo = DashboardComponent.parseStringToFloat(week.apo);
        this.aopDataPoints_table.push({
          x: key,
          y: newPoint.apo,
          color: this.aopDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key,
        });
        this.totalData_table.apoTotal += newPoint.apo;
      }

      if (week.actualslastyear !== undefined) {
        newPoint.actualslastyear = DashboardComponent.parseStringToFloat(week.actualslastyear);
        this.lastYearDataPoints_table.push({
          x: key,
          y: newPoint.actualslastyear,
          color: this.lastyearDataPointColor,
          click: this.dataPointClick.bind(this),
          calenderYear: key
        });
        this.totalData_table.lastYearTotal += newPoint.actualslastyear;
      }

      if (week.harshit !== undefined) {
        newPoint.harshit = DashboardComponent.parseStringToFloat(week.harshit);

        this.totalData_table.harshit += newPoint.harshit;
      }

      if (week.comment) {

        console.log('Weeks comment -- ' + week.comment);
        newPoint.comments = week.comment;
      }


      if (week.lockcell) {

        console.log('Suit-------' + week.lockcell);
        newPoint.lockcell = week.lockcell;
      }

      this.graphData.push(newPoint);
    }

    this.totalData_table.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(2));
    this.totalData_table.lastYearTotal = parseFloat(this.totalData.lastYearTotal.toFixed(2));
    this.totalData_table.actuals = parseFloat(this.totalData.actuals.toFixed(2));
    this.totalData_table.mlTotal = parseFloat(this.totalData.mlTotal.toFixed(2));
    this.totalData_table.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(2));

    this.totalData_table.harshit = parseFloat(this.totalData.harshit.toFixed(2));

    // this.totalData.fcstValueAdd = parseFloat(this.totalData.fcstValueAdd.toFixed(2));
  }


  // Harshit


  public processFeatureGraphData(res) {
    const data1 = res.secondGraphRes;

    var a = document.getElementById('checking').innerHTML;
    console.log('KCUH AUR PANGAA HAI');
    this.property.length = 0;

    this.property2.length = 0;
    this.property3.length = 0;

//    this.graphData = [];

    for (const week1 of data1) {


      if (week1.property !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property.push({
          x: week1.calenderYearWeek,
          color: '#17b169',
          y: DashboardComponent.parseStringToFloat(week1.property),

        });
        //this.totalData.actuals += newPoint.actuals;
      }


      if (week1.property2 !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property2.push({
          x: week1.calenderYearWeek,
          color: '#00321E',
          y: DashboardComponent.parseStringToFloat(week1.property2),

        });
        //this.totalData.actuals += newPoint.actuals;
      }


      if (week1.property3 !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property3.push({
          x: week1.calenderYearWeek,
          color: '#46a5b9',
          y: DashboardComponent.parseStringToFloat(week1.property3),

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
      //     x:key,
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


  public processFeatureGraphData_open_boolean(res) {
    const data1 = res.secondGraphRes;

    var a = document.getElementById('checking').innerHTML;
    console.log('CHECK-->' + a);
    this.property.length = 0;
    this.property2.length = 0;
    this.property3.length = 0;

//    this.graphData = [];

    for (const week1 of data1) {


      if (week1.property !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);

        if (DashboardComponent.parseStringToFloat(week1.property2) > 1.5) {
          this.property.push({
            x: week1.calenderYearWeek,
            y: 1,

          });
        } else {
          (DashboardComponent.parseStringToFloat(week1.property2) > 1.5);
        }
        {
          this.property.push({
            x: week1.calenderYearWeek,
            y: 0,

          });
        }

        //this.totalData.actuals += newPoint.actuals;
      }


      if (week1.property2 !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property2.push({
          x: week1.calenderYearWeek,
          y: DashboardComponent.parseStringToFloat(week1.property2),

        });
        //this.totalData.actuals += newPoint.actuals;
      }


      if (week1.property3 !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property3.push({
          x: week1.calenderYearWeek,
          y: DashboardComponent.parseStringToFloat(week1.property3),

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
      //     x:key,
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

    var a = document.getElementById('checking').innerHTML;
    console.log('CHECK-->' + a);
    this.property.length = 0;
    this.property2.length = 0;
    this.property3.length = 0;

//    this.graphData = [];

    for (const week1 of data1) {


      if (week1.property !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property.push({
          x: week1.calenderYearWeek,
          color: '#17b169',
          y: DashboardComponent.parseStringToFloat(week1.property),

        });
        //this.totalData.actuals += newPoint.actuals;
      }


      if (week1.property2 !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property2.push({
          x: week1.calenderYearWeek,
          color: '#00321E',
          y: DashboardComponent.parseStringToFloat(week1.property2),

        });
        //this.totalData.actuals += newPoint.actuals;
      }


      if (week1.property3 !== undefined) {
        //   newPoint.actuals = DashboardComponent.parseStringToFloat(week.actuals);
        this.property3.push({
          x: week1.calenderYearWeek,
          color: '#46a5b9',
          y: DashboardComponent.parseStringToFloat(week1.property3),

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
      //     x:key,
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


  public sku_map() {

  }

  public color_change() {
    document.getElementById('arrow').style.color = 'green';
  }


  public createFilterObject(res: any) {


    // Push customer Planning Group


    // console.log("32454--"+JSON.stringify(customerPlanningGroup));

    // // Push plant


    // Push Brands


    // const cpgname = this.createPlanRequestData.cpgname;
    // this.filters2.push({
    //   name: 'CPG Name',
    //   key: 'cpgname',
    //   isExpanded: false,
    //   values: cpgname.map(item => {
    //     return {name: item, isChecked: false};
    //   })
    // });

    const forecastingGroups = this.createPlanRequestData.forecastingGroups;
    this.fetched_forecasting.push({
      name: 'Forecas',
      key: 'subbrand',
      isExpanded: false,
      values: forecastingGroups.map(item => {
        return {name: item, isChecked: true};
      })
    });


    this.fetched_forecasting = this.createPlanRequestData.forecastingGroups;


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


  public locking1(form: NgForm, data: any) {
    this.lockModalCancel.nativeElement.click();
    var a = this.selecteddblclick;
    // this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].markerType = 'triangle';
    //  this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment = data.comment;

    this.graphData;
    this.chart1.render();

    form.resetForm();
    this.selectedDataPoint = null;
  }

  // Filter SKU Handlers
  public getCallback() {
    return this.filterSKUs.bind(this);
  }

  public getCallback_brands() {
    return this.filterSKUs_brands.bind(this);
  }


  public filterSKUs_brands(sku: string) {
    if (!this.brandstext || !this.brandstext.trim()) {
      return true;
    }
    const regex = new RegExp(this.brandstext && this.brandstext.trim(), 'ig');
    return regex.test(sku);
  }

  public filterSKUs(sku: string) {
    if (!this.searchText || !this.searchText.trim()) {
      return true;
    }
    const regex = new RegExp(this.searchText && this.searchText.trim(), 'ig');
    return regex.test(sku);
  }

  public getCallback_comm() {
    return this.filterSKUs_comm.bind(this);
  }


  public getCallback_plant() {
    return this.filterSKUs_plant.bind(this);
  }


  public getCallback_cpg() {
    return this.filterSKUs_cpg.bind(this);
  }



  public changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        console.log('harshit---' + csv);
        console.log('harshit1212----' + csv.split('\n').length);
        var g = csv.split('\n');
        console.log('popop---' + g);
        var g = csv.split('\n').splice(1);
        console.log('popop121---' + g);
        var g1 = [];


        for (const ab of csv.split('\n').splice(1)) {
          if (ab === 'Forecasting Group' || ab == 'Forecasting Group') {

          } else {
            this.second_sku = [];
            this.skus = [];
            console.log('SFsgfg---' + ab);
            g1.push(ab);

          }
          //this.skus
        }
        this.reactivate_filter(1);
        this.skus = g1.map(item => {
          return {
            name: item,
            isChecked: true
          };
        });
        this.fgssselected=JSON.parse(JSON.stringify(this.skus));

        console.log('harshit1212----' + csv.split('\n')[1]);
      };
    }
  }



  public start_drag_ml(cell :any)
  {
    this.selected_array=[];
    console.log("Start Drag--");
    var num1=this.graphData[cell].ml;
    this.sumselected=0;
    this.avgselected=0;
 //   this.avgselected=num1
 //   this.sumselected=this.sumselected+num1;
    this.selected_array.push(num1);

  //  this.avgselected=parseFloat((this.avgselected).toFixed(2));
 //   this.sumselected=parseFloat((this.sumselected).toFixed(2));
    this.up=1;
  }



  public start_drag_final(cell :any)
  {

    this.selected_array=[];
    console.log("Start Drag--");
    var num1=this.graphData[cell].ml;
    this.sumselected=0;
    this.avgselected=0;
 //   this.avgselected=num1
 //   this.sumselected=this.sumselected+num1;
    this.selected_array.push(num1);

  //  this.avgselected=parseFloat((this.avgselected).toFixed(2));
 //   this.sumselected=parseFloat((this.sumselected).toFixed(2));
    this.up=1;
  }


  public start_drag_apo(cell :any)
  {

    this.selected_array=[];
    console.log("Start Drag--");
    var num1=this.graphData[cell].apo;
    this.sumselected=0;
    this.avgselected=0;
 //   this.avgselected=num1
 //   this.sumselected=this.sumselected+num1;
    this.selected_array.push(num1);

  //  this.avgselected=parseFloat((this.avgselected).toFixed(2));
 //   this.sumselected=parseFloat((this.sumselected).toFixed(2));
    this.up=1;
  }




  public start_drag_actuals(cell :any)
  {

    this.selected_array=[];
    console.log("Start Drag--");
    var num1=this.graphData[cell].actuals;
    this.sumselected=0;
    this.avgselected=0;
 //   this.avgselected=num1
 //   this.sumselected=this.sumselected+num1;
    this.selected_array.push(num1);

  //  this.avgselected=parseFloat((this.avgselected).toFixed(2));
 //   this.sumselected=parseFloat((this.sumselected).toFixed(2));
    this.up=1;
  }






  public start_drag_actualsly(cell :any)
  {


    this.selected_array=[];
    console.log("Start Drag--");
    var num1=this.graphData[cell].actualslastyear;
    this.sumselected=0;
    this.avgselected=0;
 //   this.avgselected=num1
 //   this.sumselected=this.sumselected+num1;
    this.selected_array.push(num1);

  //  this.avgselected=parseFloat((this.avgselected).toFixed(2));
 //   this.sumselected=parseFloat((this.sumselected).toFixed(2));
    this.up=1;
  }





  public start_drag_open(cell :any)
  {


    this.selected_array=[];
    console.log("Start Drag--");
    var num1=this.graphData[cell].harshit;
    this.sumselected=0;
    this.avgselected=0;
 //   this.avgselected=num1
 //   this.sumselected=this.sumselected+num1;
    this.selected_array.push(num1);

  //  this.avgselected=parseFloat((this.avgselected).toFixed(2));
 //   this.sumselected=parseFloat((this.sumselected).toFixed(2));
    this.up=1;
  }



  

  

  

  


  

  public end_drag()
  {
    console.log("End Drag--");
    this.up=0;


    console.log("DFdfd--"+JSON.stringify(this.selected_array));
   // this.selected_array;
    this.sumselected = this.selected_array.reduce((a, b)=>a + b); 
    this.maxselected = this.selected_array.reduce((a, b)=>Math.max(a, b)); 
    this.minselected = this.selected_array.reduce((a, b)=>Math.min(a, b)); 
    this.avgselected = (this.sumselected / this.selected_array.length);
    this.countselected =this.selected_array.length;


    this.avgselected=parseFloat((this.avgselected).toFixed(2));
    this.sumselected=parseFloat((this.sumselected).toFixed(2));

  }

  

  public addvalues(cell : any)
  {
    if(this.up==1){
    console.log("Cell----"+cell);
    var num1=this.graphData[cell].ml;
  //  console.log("Graph----"+JSON.stringify(this.graphData));
  // this.avgselected= (this.sumselected+num1)/2;
  //   this.sumselected=this.sumselected+num1;


  //   this.avgselected=parseFloat((this.avgselected).toFixed(2));
  //   this.sumselected=parseFloat((this.sumselected).toFixed(2));


  this.selected_array.push(num1);
   // (this.avgselected).toFixed(2);
    //this.avgselected=
console.log("Checkiiigg--"+this.sumselected)
  //  this.sumselected=this.fetch_values.bind(this);

  }
}


public addvalues_actuals(cell : any)
  {
    if(this.up==1){
    console.log("Cell----"+cell);
    var num1=this.graphData[cell].actuals;
  //  console.log("Graph----"+JSON.stringify(this.graphData));
  this.avgselected= (this.sumselected+num1)/2;
    this.sumselected=this.sumselected+num1;


    this.avgselected=parseFloat((this.avgselected).toFixed(2));
    this.sumselected=parseFloat((this.sumselected).toFixed(2));
   // (this.avgselected).toFixed(2);
    //this.avgselected=
console.log("Checkiiigg--"+this.sumselected)
  //  this.sumselected=this.fetch_values.bind(this);

  }
}



public addvalues_harshit(cell : any)
  {
    if(this.up==1){
    console.log("Cell----"+cell);
    var num1=this.graphData[cell].harshit;
  //  console.log("Graph----"+JSON.stringify(this.graphData));
  this.avgselected= (this.sumselected+num1)/2;
    this.sumselected=this.sumselected+num1;


    this.avgselected=parseFloat((this.avgselected).toFixed(2));
    this.sumselected=parseFloat((this.sumselected).toFixed(2));
   // (this.avgselected).toFixed(2);
    //this.avgselected=
console.log("Checkiiigg--"+this.sumselected)
  //  this.sumselected=this.fetch_values.bind(this);

  }
}

public addvalues_actualslastyear(cell : any)
  {
    if(this.up==1){
    console.log("Cell----"+cell);
    var num1=this.graphData[cell].actualslastyear;
  //  console.log("Graph----"+JSON.stringify(this.graphData));
  this.avgselected= (this.sumselected+num1)/2;
    this.sumselected=this.sumselected+num1;


    this.avgselected=parseFloat((this.avgselected).toFixed(2));
    this.sumselected=parseFloat((this.sumselected).toFixed(2));
   // (this.avgselected).toFixed(2);
    //this.avgselected=
console.log("Checkiiigg--"+this.sumselected)
  //  this.sumselected=this.fetch_values.bind(this);

  }
}







public addvalues_apo(cell : any)
  {
    if(this.up==1){
    console.log("Cell----"+cell);
  //  console.log("Graph----"+JSON.stringify(this.graphData));
    var num1=this.graphData[cell].apo;
 
  this.avgselected= (this.sumselected+num1)/2;
    this.sumselected=this.sumselected+num1;


    this.avgselected=parseFloat((this.avgselected).toFixed(2));
    this.sumselected=parseFloat((this.sumselected).toFixed(2));
   // (this.avgselected).toFixed(2);
    //this.avgselected=
console.log("Checkiiigg--"+this.sumselected)
  //  this.sumselected=this.fetch_values.bind(this);

  }
}



public addvalues_finaldforecast(cell : any)
{
  if(this.up==1){
  console.log("Cell----"+cell);
  var num1=this.graphData[cell].ml;
//  console.log("Graph----"+JSON.stringify(this.graphData));
this.avgselected= (this.sumselected+num1)/2;
  this.sumselected=this.sumselected+num1;


  this.avgselected=parseFloat((this.avgselected).toFixed(2));
  this.sumselected=parseFloat((this.sumselected).toFixed(2));
 // (this.avgselected).toFixed(2);
  //this.avgselected=
console.log("Checkiiigg--"+this.sumselected)
//  this.sumselected=this.fetch_values.bind(this);

}
}


  public fetch_values(num)
  {
    console.log("FetchValues_num--"+num);
    var num1=this.graphData.ml[num];
    console.log("num1 values--"+num1);
      this.sumselected=this.sumselected+num1;

      console.log("Final Selection--"+num1);
  }


  public filterSKUs_cpg(skuComment: string) {
    if (!this.searchcpg || !this.searchcpg.trim()) {
      return true;
    }
    const regex = new RegExp(this.searchcpg && this.searchcpg.trim(), 'ig');
    return regex.test(skuComment);
  }

  public filterSKUs_comm(skuComment: string) {
    if (!this.commentSearchText || !this.commentSearchText.trim()) {
      return true;
    }
    const regex = new RegExp(this.commentSearchText && this.commentSearchText.trim(), 'ig');
    return regex.test(skuComment);
  }



  public filterSKUs_plant(skuComment: string) {
    if (!this.searchplant || !this.searchplant.trim()) {
      return true;
    }
    const regex = new RegExp(this.searchplant && this.searchplant.trim(), 'ig');
    return regex.test(skuComment);
  }

  public onFilterCheckBoxChange() {

    const data = Object.assign({leadSkus: []}, this.createPlanRequestData);
    /*
       Customer Planning Group 0
       Plants Index  1
       Brands Index 3
     */
    this.granular1 = 'week';


// this.granular1='te';dfdfdsfsdf

    this.secondgraph = 'Promo';

    console.log('Sfsgf34sg---' + JSON.stringify(this.createPlanRequestData));
    this.cpgss = this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]);
    this.plantss = this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name);

    var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name);
    var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name);

    for (const abc of fgssselected2) {
      fgssselected1.push(abc);
    }
    this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));


    this.fgssselected = this.fgssselected.map(item => {
      return {name: item, isChecked: true};
    });


    console.log('FGSSSSS---' + JSON.stringify(this.fgssselected));

//this.fgssselected
    console.log('DSfsdfsd234----' + JSON.stringify(this.filters[0].values.filter(item => item.isChecked).map(item => item.name)));
    //   data.forecastingGroups = this.skus.filter(item => item.isChecked).map(item => item.name);
    data.forecastingGroups = JSON.parse(JSON.stringify(this.fgssselected));
    data.customerPlanningGroup = this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]);
    data.plants = this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name);

    data.startWeek = 201942;
    data.endWeek = this.createPlanRequestData.endWeek;
    // data.brands = this.filters[2].values.filter(item => item.isChecked).map(item => item.name);

    this.plant_string = JSON.stringify(this.filters_plant[0].values.map(item => item.name));

    this.cpg_string = JSON.stringify(this.filters[0].values.map(item => item.name));


    if (this.fgssselected.length == 0 || this.plant_string.length == 0 || this.cpg_string.length == 0) {
      window.alert('Please select all CPG, Plant, Forecasting Group');
      return;
      //   window.alert("hi!");
    }

    this.loading = true;

    console.log('CHECKKKK---' + JSON.stringify(data));


    this.createPlan(data);

    //  this.skuService.getGraphData(data).subscribe((res: any) => {
    //   this.eventsSubject.next({
    //     page: null,
    //     reset: true,
    //   });
    //   this.processGraphData(res);
    //   this.loading=false;
    //   this.chart1.render();


    //   this.loading=false;
    // });


// if(this.granular1=='month')
// {
//   console.log("MONTH->"+JSON.stringify(this.hh));
//   //  const data=this.createPlanRequestData;


//     console.log("Create_Plan1234->"+JSON.stringify(this.hh));


//     this.createPlanRequestData = {
//       startWeek: this.createPlanRequestData.startWeek,
//       endWeek: this.createPlanRequestData.endWeek,
//       prevactuals:this.createPlanRequestData.prevactuals,
//       forecastingGroups: JSON.parse(JSON.stringify(this.hh)).map(item => item.name),
//       customerPlanningGroup: this.createPlanRequestData.customerPlanningGroup,
//       plants: this.createPlanRequestData.plants,
//     };
//     //this.test();

//     console.log("WOW->"+JSON.stringify(this.createPlanRequestData));
// this.loading=true;
//     this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
//       this.eventsSubject.next({
//         page: null,
//         reset: true,
//       });
//       this.loading=false;
//       this.createPlanRequestData.brands = res.req.brands;
//       this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
//       this.createPlanRequestData.subbrand = res.req.subbrand;
//       this.createPlanRequestData.Trade = res.req.trade;
//       this.createPlanRequestData.Sales = res.req.sales;


//       this.createPlanRequestData.globalBev = res.req.globalBev;
//       this.createPlanRequestData.materialgroup = res.req.materialgroup;
//       this.createPlanRequestData.baseunit = res.req.baseunit;
//       this.createPlanRequestData.pack_type = res.req.pack_type;

//       this.createPlanRequestData.animal_Flags = res.req.animal_Flags;


//       this.createPlanRequestData.pack_size = res.req.pack_size;
//       this.createPlanRequestData.cpgname = res.req.cpgname;


//       this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
//       this.processGraphData(res);

//       this.processFeatureGraphData(res);
//       this.createFilterObject(res);
//    //   this.skus = this.createPlanRequestData.forecastingGroups;

//   //  this.skus = JSON.parse(JSON.stringify(this.hh)).map(item => item.name).map((item) => {
//   //   item.isChecked = true;
//   //   return item;
//   // });

//       console.log('thhh->' + this.createPlanRequestData.startWeek);
//       // this.chart2 = new CanvasJS.Chart('chartContainer2', {
//       //   animationEnabled: true,

//       //   backgroundColor: '#FFFFFF',
//       //   legend: {
//       //     cursor: 'pointer',
//       //     itemclick: this.toggleDataSeries.bind(this)
//       //   },
//       //   axisX: {
//       //     valueFormatString: '######',
//       //     gridColor: '#ffffff',
//       //     scaleBreaks: {
//       //       type: 'blank',
//       //       spacing: 0,
//       //       customBreaks: [
//       //         {
//       //           startValue: 201913,
//       //           endValue: 202000
//       //         },
//       //         {
//       //           startValue: 202012,
//       //           endValue: 202100
//       //         },
//       //         {
//       //           startValue: 202153,
//       //           endValue: 202200
//       //         },
//       //         {
//       //           startValue: 202253,
//       //           endValue: 202300
//       //         }
//       //       ]
//       //     },
//       //     // stripLines: [
//       //     //   {
//       //     //     startValue: 201909,
//       //     //     endValue: 201912,
//       //     //     color: '#F2F3F5'
//       //     //   },
//       //     //   {
//       //     //     startValue: 202000,
//       //     //     endValue: 202003,
//       //     //     color: '#F2F3F5'
//       //     //   }
//       //     // ]
//       //   },
//       //   axisY: {
//       //
//       //     valueFormatString: '######',
//       //     gridColor: '#ffffff',
//       //   },

//       //   toolTip: {
//       //     content: 'Value: {y}'
//       //   },

//       //   // toolTip: {
//       //   //   shared: true,
//       //   //   contentFormatter: function(e) {
//       //   //     var content = ' ';
//       //   //     console.log(JSON.stringify(e));
//       //   //     content = e.entries.dataPoint.x.toString.slice(4, 6) + '-' + e.entries.dataPoint.x.toString.slice(0, 4);
//       //   //     for (var i = 0; i < e.entries.length; i++) {
//       //   //       content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
//       //   //       content += '<br/>';
//       //   //     }
//       //   //     return content;
//       //   //   }
//       //  // },

//       //   data: [{
//       //     type: 'line',
//       //     gridColor: '#ffffff',
//       //     labelFontColor: 'black',
//       //    color: '#000',
//       //     dataPoints: this.property
//       //   }]
//       // });
//       // this.chart2.render();

//       this.chart2 = new CanvasJS.Chart('chartContainer2', {
//         animationEnabled: true,
//         showInLegend: true,
//         backgroundColor: '#FFFFFF',
//         legend: {
//           cursor: 'pointer',
//           fontSize: 10,
//           itemclick: this.toggleDataSeries1.bind(this)
//         },
//         axisX: {
//           valueFormatString: '######',
//           gridColor: '#ffffff',
//           theme: "light2",
//           scaleBreaks: {
//             type: 'blank',
//             spacing: 0,
//             customBreaks: [
//               {
//                 startValue: 201813,
//                 endValue: 201900
//               },
//               {
//                 startValue: 201913,
//                 endValue: 202000
//               },
//               {
//                 startValue: 202053,
//                 endValue: 202100
//               },
//               {
//                 startValue: 202153,
//                 endValue: 202200
//               },
//               {
//                 startValue: 202253,
//                 endValue: 202300
//               }
//             ]
//           },
//           stripLines: [
//             {
//               startValue: this.createPlanRequestData.startWeek,
//               endValue: 201953,
//               color: '#F2F3F5'
//             },
//             {
//               startValue: 202000,
//               endValue: this.createPlanRequestData.endWeek,
//               color: '#F2F3F5'
//             }
//           ]
//         },
//         axisY: {
//           title: " ",
//           valueFormatString: '######',
//           gridColor: '#ffffff',
//         },

//         toolTip: {
//           content: '{y}'
//         },

//         // toolTip: {
//         //   shared: true,
//         //   contentFormatter: function(e) {
//         //     var content = ' ';
//         //     console.log(JSON.stringify(e));
//         //     content = e.entries.dataPoint.x.toString.slice(4, 6) + '-' + e.entries.dataPoint.x.toString.slice(0, 4);
//         //     for (var i = 0; i < e.entries.length; i++) {
//         //       content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
//         //       content += '<br/>';
//         //     }
//         //     return content;
//         //   }
//        // },

//         data: [
//         {
//           name: 'Average ',
//           showInLegend: true,
//           type: 'spline',
//          color: "#46a5b9",
//           lineColor: '#46a5b9',
//           dataPoints: this.property3
//         }


//       ]
//       });
//       this.chart2.render();
//       console.log('132456->' + this.createPlanRequestData.startWeek);
//       this.chart1 = new CanvasJS.Chart('chartContainer1', {
//         animationEnabled: true,
//         exportEnabled: true,
//         backgroundColor: '#FFFFFF',
//         legend: {
//           cursor: 'pointer',
//           itemclick: this.toggleDataSeries.bind(this)
//         },
//         axisX: {
//           valueFormatString: '######',
//           gridColor: '#ffffff',
//           interval: 1,
//           scaleBreaks: {
//             type: 'blank',
//             spacing: 0,
//             customBreaks: [
//               {
//                 startValue: 201913,
//                 endValue: 201999
//               },
//               {
//                 startValue: 202053,
//                 endValue: 202100
//               },
//               {
//                 startValue: 202153,
//                 endValue: 202200
//               },
//               {
//                 startValue: 202253,
//                 endValue: 202300
//               }
//             ]
//           },
//         },

//         axisY: {
//           title: " ",

//           valueFormatString: '######',
//           gridColor: '#ffffff',
//         },

//         // toolTip: {
//         //   content: 'Week: {x} | {name}: {y}'
//         // },

//         toolTip: {
//           shared: true,
//           contentFormatter: function(e) {
//             var content = ' ';
//             //console.log(e.dataPoint);
//             content = e.entries[0].dataPoint.x.toString().slice(4, 6) + '-' + e.entries[0].dataPoint.x.toString().slice(0, 4) + '<br/>';
//             for (var i = 0; i < e.entries.length; i++) {
//               content += e.entries[i].dataSeries.name + ' ' + '<strong>' + e.entries[i].dataPoint.y + '</strong>';
//               content += '<br/>';
//             }
//             return content;
//           }
//         },
//         data: [
//           {
//             name: 'Actuals',
//             showInLegend: true,
//             type: 'spline',
//            color: this.actualDataPointColor,
//             lineColor: this.actualDataPointColor,
//             dataPoints: this.actualDataPoints
//           },
//           {
//             name: 'Actual LY',
//             showInLegend: true,
//             type: 'line',
//             lineDashType: 'dash',
//            color: this.lastyearDataPointColor,
//             lineColor: this.lastyearDataPointColor,
//             dataPoints: this.lastYearDataPoints
//           },
//           {
//             name: 'ML Forecast',
//             showInLegend: true,
//             type: 'line',
//             lineDashType: 'dash',
//            color: this.mlDataPointColor,
//             lineColor: this.mlDataPointColor,
//             dataPoints: this.mlDataPoints
//           },
//           {
//             name: 'APO Forecast',
//             showInLegend: true,
//             type: 'line',
//             lineDashType: 'dash',
//            color: this.aopDataPointColor,
//             lineColor: this.aopDataPointColor,
//             dataPoints: this.aopDataPoints
//           },
//           {
//             name: 'Final Forecast',
//             showInLegend: true,
//             type: 'line',
//             lineDashType: 'dash',
//            color: this.finalForecastPointColor,
//             lineColor: this.finalForecastPointColor,
//             dataPoints: this.finalForecastDataPoints
//           }
//         ]
//       });
//       this.chart1.render();
//       this.CanvasJSDataAsCSV();
//       this.selectOptionsModalCancel.nativeElement.click();
//     });


//     this.chart1.render();
//     this.chart1.render();
// }
// else{


// }


  }


  public onFilterCheckBoxChange2() {


    const reqBody = this.getFiltersObject1();

    console.log('WOW-->' + JSON.stringify(reqBody));
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

      response = response.map(item => {
        return {name: item, isChecked: true};
      });

      console.log('REsss--' + JSON.stringify(response));
      for (const abc of this.filters) {
        console.log('HH--' + JSON.stringify(abc));
        if (abc.key == 'customerPlanningGroup') {
          console.log('RIGHT NOW' + JSON.stringify(abc.values));

          console.log('AFTER NOW' + JSON.stringify(response));
          abc.values = JSON.parse(JSON.stringify(response));
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


  public getFiltersObject_color() {

    const brands = [];

    const Subbrand = [];
    // const Unitperpack = [];


    const AlcoholPercentage = [];

    const AnimalFlag = [];
    const packtype = [];
    const baseunit = [];

    const materialgroup = [];

    const salesoffice = [];

    const tradetype = [];


    const cpgname = [];

    const globalbev = [];

    console.log('TESTTT-----' + JSON.stringify(this.filters1));
    for (const brand of this.filters1) {

      if (brand.key == 'brands') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            console.log('JKNFBJHBFHJBHJFBVHFF');
            flag = 0;
          }
        }

        if (flag == 1) {
          document.getElementById('brands').style.background = '#f4f5f9';
        } else {
          document.getElementById('brands').style.background = '#05d7be';
        }
      } else if (brand.key == 'alcoholper') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }
        if (flag == 1) {
          document.getElementById('alcoholper').style.background = '#f4f5f9';
        } else {
          document.getElementById('alcoholper').style.background = '#05d7be';
        }
      } else if (brand.key == 'subbrand') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }

        if (flag == 1) {
          document.getElementById('subbrand').style.background = '#f4f5f9';
        } else {
          document.getElementById('subbrand').style.background = '#05d7be';
        }
      } else if (brand.key == 'Animal_Flags') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }
        if (flag == 1) {
          document.getElementById('Animal_Flags').style.background = '#f4f5f9';
        } else {
          document.getElementById('Animal_Flags').style.background = '#05d7be';
        }
      } else if (brand.key == 'packtype') {

        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }
        if (flag == 1) {
          document.getElementById('packtype').style.background = '#f4f5f9';
        } else {
          document.getElementById('packtype').style.background = '#05d7be';
        }
      } else if (brand.key == 'baseunit') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }
        if (flag == 1) {
          document.getElementById('baseunit').style.background = '#f4f5f9';
        } else {
          document.getElementById('baseunit').style.background = '#05d7be';
        }
      } else if (brand.key == 'materialgroup') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }

        if (flag == 1) {
          document.getElementById('materialgroup').style.background = '#f4f5f9';
        } else {
          document.getElementById('materialgroup').style.background = '#05d7be';
        }
      } else if (brand.key == 'globalbev') {

        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }

        if (flag == 1) {
          document.getElementById('globalbev').style.background = '#f4f5f9';
        } else {
          document.getElementById('globalbev').style.background = '#05d7be';
        }
      }


    }



    for (const brand of this.filters1_brands) {

      if (brand.key == 'brands') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            console.log('JKNFBJHBFHJBHJFBVHFF');
            flag = 0;
          }
        }

        if (flag == 1) {
          document.getElementById('brands').style.background = '#f4f5f9';
        } else {
          document.getElementById('brands').style.background = '#05d7be';
        }
      } 

    }


    return {
      brands: brands,
      alcoholper: AlcoholPercentage,
      subbrand: Subbrand,
      materialGroup: materialgroup,
      animalFlag: AnimalFlag,
      packType: packtype,
      baseunit: baseunit,
      globalbev: globalbev

    };
  }


  private getFiltersObject() {

    const brands = [];

    const Subbrand = [];
    // const Unitperpack = [];


    const AlcoholPercentage = [];

    const AnimalFlag = [];
    const packtype = [];
    const baseunit = [];

    const materialgroup = [];

    const salesoffice = [];

    const tradetype = [];


    const cpgname = [];

    const globalbev = [];

    console.log('TESTTT-----' + JSON.stringify(this.filters1));
    for (const brand of this.filters1) {

      if (brand.key == 'brands') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            brands.push(aa.name);
          }
        }
      } else if (brand.key == 'alcoholper') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            AlcoholPercentage.push(aa.name);
          }
        }
      } else if (brand.key == 'subbrand') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            Subbrand.push(aa.name);
          }
        }
      } else if (brand.key == 'Animal_Flags') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            AnimalFlag.push(aa.name);
          }
        }
      } else if (brand.key == 'packtype') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            packtype.push(aa.name);
          }
        }
      } else if (brand.key == 'baseunit') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            baseunit.push(aa.name);
          }
        }
      } else if (brand.key == 'materialgroup') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            materialgroup.push(aa.name);
          }
        }
      } else if (brand.key == 'globalbev') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            globalbev.push(aa.name);
          }
        }
      }


    }

    
    for (const brand of this.filters1_brands) {


      if (brand.key == 'brands') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            brands.push(aa.name);
          }
        }
      } 
    }

    return {
      brands: brands,
      alcoholper: AlcoholPercentage,
      subbrand: Subbrand,
      materialGroup: materialgroup,
      animalFlag: AnimalFlag,
      packType: packtype,
      baseunit: baseunit,
      globalbev: globalbev

    };
  }


  private getFiltersObject1_sku() {

    const Sales = [];

    const Trade = [];
    // const Unitperpack = [];


    console.log('TESTTT-----' + JSON.stringify(this.filters1));
    for (const brand of this.filters2) {

      if (brand.key == 'tradetype') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }

        if (flag == 1) {
          document.getElementById('tradetype').style.background = '#f4f5f9';
        } else {
          document.getElementById('tradetype').style.background = '#05d7be';
        }


      } else if (brand.key == 'salesoffice') {

        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            flag = 0;
          }
        }

        if (flag == 1) {
          document.getElementById('salesoffice').style.background = '#f4f5f9';
        } else {
          document.getElementById('salesoffice').style.background = '#05d7be';
        }

      }


    }





    return {
      salesOffice: Sales,
      tradeType: Trade
    };
  }


  private getFiltersObject1() {

    const Sales = [];

    const Trade = [];
    // const Unitperpack = [];


    console.log('TESTTT-----' + JSON.stringify(this.filters1));
    for (const brand of this.filters2) {

      if (brand.key == 'tradetype') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            Trade.push(aa.name);
          }
        }
      } else if (brand.key == 'salesoffice') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            Sales.push(aa.name);
          }
        }
      }


    }


    return {
      salesOffice: Sales,
      tradeType: Trade
    };
  }


  public onFilterCheckBoxChange121() {


    this.cpgss = [];

    this.getFiltersObject1_sku();

//     //SKU
//     const reqBody = this.getFiltersObject();

//     console.log("BODyyyy---"+JSON.stringify(reqBody));

// //CPG
//     const reqBody1 = this.getFiltersObject1();


//     console.log("tftuf76---"+JSON.stringify(reqBody1));

//      if(reqBody1.salesOffice.length>0)
//      {
//        document.getElementById('salesoffice').style.background='#05d7be';
//      }
//      else{
//        console.log("34567iuhjk");
//       document.getElementById('salesoffice').style.background='#f4f5f9';
//      }
//      if(reqBody1.tradeType.length>0)
//      {
//        document.getElementById('tradetype').style.background='#05d7be';
//      }
//      else{
//       console.log("34567iuhjk");
//      document.getElementById('salesoffice').style.background='#f4f5f9';
//     }

//      if(reqBody.alcoholper.length>0)
//      {
//       document.getElementById('alcoholper').style.background='#05d7be';
//      }
//      else{
//       console.log("34567iuhjk");
//      document.getElementById('salesoffice').style.background='#f4f5f9';
//     }


//      if(reqBody.animalFlag.length>0)
//      {
//       document.getElementById('Animal_Flags').style.background='#b5d7be';
//      }
//      else{
//       console.log("34567iuhjk");
//      document.getElementById('salesoffice').style.background='#f4f5f9';
//     }


//      if(reqBody.baseunit.length>0)
//      {
//       document.getElementById('baseunit').style.background='#b5d7be';
//      }
//      else{
//       console.log("34567iuhjk");
//      document.getElementById('salesoffice').style.background='#f4f5f9';
//     }


//      if(reqBody.brands.length>0)
//      {
//       document.getElementById('brands').style.background='#b5d7be';
//      }
//      else{
//       console.log("34567iuhjk");
//      document.getElementById('salesoffice').style.background='#f4f5f9';
//     }

//      if(reqBody.materialGroup.length>0)
//      {
//       document.getElementById('materialgroup').style.background='#b5d7be';
//      }
//      else{
//       console.log("34567iuhjk");
//      document.getElementById('salesoffice').style.background='#f4f5f9';
//     }


//      if(reqBody.packType.length>0)
//      {
//       document.getElementById('packtype').style.background='#b5d7be';
//      }
//      else{
//       console.log("34567iuhjk");
//      document.getElementById('salesoffice').style.background='#f4f5f9';
//     }


//      if(reqBody.subbrand.length>0)
//      {
//       document.getElementById('subbrand').style.background='#b5d7be';
//      }
//      else{
//       console.log("34567iuhjk");
//      document.getElementById('salesoffice').style.background='#f4f5f9';
//     }


    //SKU
    //  const reqBody = this.getFiltersObject();

//CPG
    const reqBody1 = this.getFiltersObject1();

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

    // this.skuService.getSkUList1(reqBody).subscribe((response: any) => {

    //   console.log("JSss--"+JSON.stringify(this.skus));
    //   this.skus = response;

    this.skuService.getCPGlist2(reqBody1).subscribe((response1: any) => {


      console.log('jkdsfks----' + JSON.stringify(response1));
      let response2 = response1.map(item => {
        return {name: {name: item}, isChecked: false};
      });


      let response3 = response1.map(item => {
        return {name: item, isChecked: false};
      });

      // let response3=response1.map(item,index => {
      //   return {name: {name:item,id:}, isChecked: false};
      // })
      let g = response1.map(item => item.name);
      console.log('REsss--' + JSON.stringify(response2));
      console.log('REs3456ss--' + JSON.stringify(g));
      for (const abc of this.filters) {
        console.log('HH--' + JSON.stringify(abc));
        if (abc.key == 'customerPlanningGroup') {
          console.log('REsss123456--' + JSON.stringify(abc.values));
          abc.values = JSON.parse(JSON.stringify(response2));

          console.log('REsss12345678767876--' + JSON.stringify(abc.values));
        }


      }


      // this.createPlanRequestData.forecastingGroups= response;
      // console.log("sdfsfsfgsfgsfgsfgsfg---"+JSON.stringify(this.createPlanRequestData.forecastingGroups));
      // this.createPlanRequestData.customerPlanningGroup=response1.map(item => item.name);


      // this.createPlan(this.createPlanRequestData);


      //  this.selectedSKUs = [];
    });

    //  this.selectedSKUs = [];
    // });


  }


  public onFilterCheckBoxChange121_sku() {

    this.getFiltersObject_color();


    this.fgssselected = [];
    //     //SKU
    //     const reqBody = this.getFiltersObject();

    //     console.log("BODyyyy---"+JSON.stringify(reqBody));

    // //CPG
    //     const reqBody1 = this.getFiltersObject1();


    //     console.log("tftuf76---"+JSON.stringify(reqBody1));

    //      if(reqBody1.salesOffice.length>0)
    //      {
    //        document.getElementById('salesoffice').style.background='#05d7be';
    //      }
    //      else{
    //        console.log("34567iuhjk");
    //       document.getElementById('salesoffice').style.background='#f4f5f9';
    //      }
    //      if(reqBody1.tradeType.length>0)
    //      {
    //        document.getElementById('tradetype').style.background='#05d7be';
    //      }
    //      else{
    //       console.log("34567iuhjk");
    //      document.getElementById('salesoffice').style.background='#f4f5f9';
    //     }

    //      if(reqBody.alcoholper.length>0)
    //      {
    //       document.getElementById('alcoholper').style.background='#05d7be';
    //      }
    //      else{
    //       console.log("34567iuhjk");
    //      document.getElementById('salesoffice').style.background='#f4f5f9';
    //     }


    //      if(reqBody.animalFlag.length>0)
    //      {
    //       document.getElementById('Animal_Flags').style.background='#b5d7be';
    //      }
    //      else{
    //       console.log("34567iuhjk");
    //      document.getElementById('salesoffice').style.background='#f4f5f9';
    //     }


    //      if(reqBody.baseunit.length>0)
    //      {
    //       document.getElementById('baseunit').style.background='#b5d7be';
    //      }
    //      else{
    //       console.log("34567iuhjk");
    //      document.getElementById('salesoffice').style.background='#f4f5f9';
    //     }


    //      if(reqBody.brands.length>0)
    //      {
    //       document.getElementById('brands').style.background='#b5d7be';
    //      }
    //      else{
    //       console.log("34567iuhjk");
    //      document.getElementById('salesoffice').style.background='#f4f5f9';
    //     }

    //      if(reqBody.materialGroup.length>0)
    //      {
    //       document.getElementById('materialgroup').style.background='#b5d7be';
    //      }
    //      else{
    //       console.log("34567iuhjk");
    //      document.getElementById('salesoffice').style.background='#f4f5f9';
    //     }


    //      if(reqBody.packType.length>0)
    //      {
    //       document.getElementById('packtype').style.background='#b5d7be';
    //      }
    //      else{
    //       console.log("34567iuhjk");
    //      document.getElementById('salesoffice').style.background='#f4f5f9';
    //     }


    //      if(reqBody.subbrand.length>0)
    //      {
    //       document.getElementById('subbrand').style.background='#b5d7be';
    //      }
    //      else{
    //       console.log("34567iuhjk");
    //      document.getElementById('salesoffice').style.background='#f4f5f9';
    //     }


    //SKU
    const reqBody = this.getFiltersObject();

    //CPG
    // const reqBody1 = this.getFiltersObject1();

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


    this.skuService.getSkUList1(reqBody).subscribe((response: any) => {

      console.log('JSss--' + JSON.stringify(this.skus));
      this.skus = response;

      this.fgssselected = [];


      //  this.selectedSKUs = [];
    });


  }


  public onFilterCheckBoxChange1() {


    //SKU
    const reqBody = this.getFiltersObject();

//CPG
    const reqBody1 = this.getFiltersObject1();

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

    this.skuService.getSkUList1(reqBody).subscribe((response: any) => {

      console.log('JSss--' + JSON.stringify(this.skus));
      this.skus = response;

      this.skuService.getCPGlist2(reqBody1).subscribe((response1: any) => {


        console.log('jkdsfks----' + JSON.stringify(response1));
        response1 = response1.map(item => {
          return {name: item, isChecked: true};
        });

        console.log('REsss--' + JSON.stringify(response1));
        for (const abc of this.filters) {
          console.log('HH--' + JSON.stringify(abc));
          if (abc.key == 'customerPlanningGroup') {
            console.log('REsss123456--' + JSON.stringify(abc.values));
            abc.values = JSON.parse(JSON.stringify(response1));
          }
        }


        this.createPlanRequestData.forecastingGroups = response;
        console.log('sdfsfsfgsfgsfgsfgsfg---' + JSON.stringify(this.createPlanRequestData.forecastingGroups));
        this.createPlanRequestData.customerPlanningGroup = response1.map(item => item.name);


        this.createPlan(this.createPlanRequestData);


        //  this.selectedSKUs = [];
      });

      //  this.selectedSKUs = [];
    });


  }


  public clearAllSKUs() {

    if (this.selectallskus == 0) {
      console.log('ffddghd--' + this.selectallskus);
      this.selectallskus = 1;
      let requestData = false;

      for (const sku of this.skus) {
        sku.isChecked = true;
      }

      for (const sku of this.second_sku) {
        sku.isChecked = true;

      }
    } else if (this.selectallskus == 1) {
      this.selectallskus = 0;
      let requestData = false;

      for (const sku of this.skus) {
        sku.isChecked = false;
      }

      for (const sku of this.second_sku) {
        sku.isChecked = false;

      }
    }
    this.reactivate_filter(1);
  }


  public selectAllplant() {


    if (this.selectallplant == 1) {
      let requestData = false;
      this.selectallplant = 0;
      console.log('dfsdf12--' + JSON.stringify(this.filters_plant[0]));
      for (const sku of this.filters_plant[0].values) {
        sku.isChecked = true;
      }

      // for (const sku of this.second_sku) {
      //   sku.isChecked=true;

      // }
      this.reactivate_filter(1);
    } else if (this.selectallplant == 0) {
      let requestData = false;
      this.selectallplant = 1;
      console.log('dfsdf12--' + JSON.stringify(this.filters_plant[0]));

      for (const sku of this.filters_plant[0].values) {
        sku.isChecked = false;
      }

      // for (const sku of this.second_sku) {
      //   sku.isChecked=true;

      // }
      this.reactivate_filter(1);
    }

  }


  public selectAllcpg() {


    if (this.selectallcpg == 0) {


      let requestData = false;
      this.selectallcpg = 1;
      console.log('dfsdf1244--' + JSON.stringify(this.filters[0]));

      // for (const sku of this.) {
      //   sku.name.isChecked=true;
      // }

      for (const sku of this.filters[0].values) {
        sku.isChecked = true;
      }

      // for (const sku of this.second_sku) {
      //   sku.isChecked=true;

      // }
      this.reactivate_filter(1);

    } else if (this.selectallcpg == 1) {
      let requestData = false;
      this.selectallcpg = 0;
      console.log('dfsdf1244--' + JSON.stringify(this.filters[0]));

      // for (const sku of this.) {
      //   sku.name.isChecked=true;
      // }

      for (const sku of this.filters[0].values) {
        sku.isChecked = false;
      }

      // for (const sku of this.second_sku) {
      //   sku.isChecked=true;

      // }
      this.reactivate_filter(1);
    }


  }


  public isInt(n) {
    return Number(n) === n && n % 1 === 0;
  }

  public isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }


  public how(s) {
    var pointExists = false;

    if (s == null) {
      return true;
    }

    for (const i in s) {
      var ch = s.charAt(i);
      console.log('Checking--' + ch);
      if (ch >= '0' && ch <= '9') {
        continue;
      }
      if (ch == '.') {
        if (pointExists) {
          return false;
        } else {
          pointExists = true;
        }
      } else {
        return false;
      }
    }
    return true;
  }


  // Final Forecast
  public onValueInput(calenderYearWeek: string, index: number) {


    console.log('FDfd12---' + index);

    const dpIndex = this.finalForecastDataPoints.findIndex(item => item.calenderYear === calenderYearWeek);
    if (dpIndex > -1) {


    


    //  console.log("Check"+(this.graphData);




      const value = parseFloat(this.graphData[index].fcstValueAdd);
      console.log('FDfd123---' + value);
      var decimal = /^[-+]?[0-9]+\.[0-9]+$/;
      //   if(value===undefined || value==undefined)
      // {
      //   console.log("dfdf12");
      //   this.graphData[index].fcstValueAdd=0;
      //   // window.alert("These values are not allowed, please enter any float value")
      //   return;
      // }
      // var a=document.getElementById(''+index+'').innerHTML;
      console.log('43retwf234567---' + this.graphData[dpIndex].fcstValueAdd);


      var s = this.graphData[index].fcstValueAdd;
      var r = this.how(s);
      //console.log('Hbhbgt---' + r);
      if (r == false) {
        this.graphData[index].fcstValueAdd = 0;
        window.alert('You have added a wrong number or empty string, it will be treated as 0');

       // console.log('Really---' + this.graphData[tableindex].fcstValueAdd);
        return;

      }
      console.log('check---' + this.graphData[index].fcstValueAdd);

      if (!isNaN(value)) {
        console.log('43retwf---' + this.graphData[index].fcstValueAdd);
        if (this.graphData[index].initialFinalForecast + value < 0) {
          this.finalForecastDataPoints[dpIndex].y = 0;
          this.graphData[index].finalForecast = 0;


          this.finalForecastDataPoints[dpIndex].y = 0;
          this.graphData[index].finalForecast = 0;
        } else {
          this.finalForecastDataPoints[dpIndex].y = this.graphData[index].initialFinalForecast + value;
         // console.log('Check0--' + this.graphData[index].initialFinalForecast + value);
       //   console.log('Check0345--' + (this.graphData[index].initialFinalForecast + value).toFixed(2));
          this.graphData[index].finalForecast = parseFloat((this.graphData[index].initialFinalForecast + value).toFixed(2));




          this.finalForecastDataPoints[index].y = this.graphData[index].initialFinalForecast + value;
        //  console.log('Check0--' + this.graphData[index].initialFinalForecast + value);
          //console.log('Check0345--' + (this.graphData[index].initialFinalForecast + value).toFixed(2));
          this.graphData[index].finalForecast = parseFloat((this.graphData[index].initialFinalForecast + value).toFixed(2));
        }
      } else {

      //  console.log('YFTGHJBKUIYGVHJKH---' + this.graphData[index].fcstValueAdd);
        //this.graphData[index].fcstValueAdd=null;
        //  this.graphData[index].fcstValueAdd=0;
        //window.alert("You have added a wrong number or empty string, please add integer or decimal value");
        this.finalForecastDataPoints[index].y = this.graphData[index].initialFinalForecast;
        this.graphData[index].finalForecast = this.graphData[index].initialFinalForecast;




        this.finalForecastDataPoints[index].y = this.graphData[index].initialFinalForecast;
        this.graphData[index].finalForecast = this.graphData[index].initialFinalForecast;
      }


    //  console.log('CH!@--' + JSON.stringify(this.graphData));
      this.totalData.finalCastTotal = 0;
      for (const data of this.graphData) {
        if (data.finalForecast) {
          //console.log("Mush->"+this.totalData.finalCastTotal);
          this.totalData.finalCastTotal += parseFloat(data.finalForecast);
        }
      }
      this.totalData.finalCastTotal = 0;
      for (const data of this.graphData) {
        if (data.finalForecast) {
          //console.log("Mush->"+this.totalData.finalCastTotal);
          this.totalData.finalCastTotal += parseFloat(data.finalForecast);
        }
      }
      this.forecastadd = 0;
      for (const data of this.graphData) {


        if (data.fcstValueAdd) {
          //console.log("Mush->"+JSON.stringify(data));
          this.forecastadd += parseFloat(data.fcstValueAdd);
        }
      }



      // for (const data of this.graphData) {


      //   if (data.fcstValueAdd) {
      //     //console.log("Mush->"+JSON.stringify(data));
      //     this.forecastadd += parseFloat(data.fcstValueAdd);
      //   }
      // }

      //  this.forecastadd = this.totalData.finalCastTotal;

      this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(2));

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


//       var fgssselected1=this.skus.filter(item => item.isChecked).map(item => item.name);
// var fgssselected2=this.second_sku.filter(item => item.isChecked).map(item => item.name);

// for(const abc of fgssselected2)
// {
//   fgssselected1.push(abc);
// }
// this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));

// console.log("FGSSSSS---"+JSON.stringify(this.fgssselected));


      console.log('DEBUG1->' + value);

      const reqBody = {
        cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),

        sku: this.fgssselected.map(item => item.name),

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


  public commenting() {


    this.lockModalCancel.nativeElement.click();
    this.finalForecastCommentModalBtn.nativeElement.click();
  }


  public locking() {
    //
  }

  public onDblClickInput(selectedWeekIndex: number) {

    console.log('Sgsfgsfgsg1234');

    this.selecteddblclick = selectedWeekIndex;
    this.lockModal.nativeElement.click();
    this.selectedWeekIndex = selectedWeekIndex;
    //   this.finalForecastCommentModalBtn.nativeElement.click();
  }


  public Dbledit(selectedWeekIndex: number) {

    console.log('HHHH---' + selectedWeekIndex);
    this.selectedWeekIndex = selectedWeekIndex;
    this.editCommentModalBtn.nativeElement.click();

    this.edit_comment = this.finn[selectedWeekIndex].comment;


  }


  // comments
  public comments(i) {

    this.dropdown_table = 'week';
    this.finn = [];
    this.selectedWeekComments = this.graphData[i].comments;

    console.log('Pyar--' + JSON.stringify(this.selectedWeekComments));
    console.log('Check01234567---' + JSON.stringify(this.selectedWeekComments));
    for (var p = 0; p < this.selectedWeekComments.length; p++) {
      console.log('yj-:' + p);
      this.comm1 = this.selectedWeekComments[p].split('|');

      console.log('KJKHU---' + this.comm1[1]);
      if (this.comm1[1] == undefined || this.comm1 == null) {
        console.log('@$#%^&*');

        this.comm1[1] = 'All SKU';
      }
      console.log('Test133--' + JSON.stringify(this.fgssselected));
      console.log('Test133443--' + JSON.stringify(this.skus));
      for (const ab of this.fgssselected) {
        console.log('Chefking---' + JSON.stringify(ab));
        if (ab.isChecked) {
          this.finn.push({
            sku: ab.name,
            plant: 'Plant',
            cpg: 'CPG',
            comment: this.comm1[0]
          });
        }

      }
      console.log('CHECKING_LAST---' + this.finn);
    }
    console.log('Check000000---' + JSON.stringify(this.finn));

    this.weeklycomment1();

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


  public locking_final() {
    if (this.selectedWeekIndex) {

      console.log('TYUFHRF---' + this.selecteddblclick);

      console.log('TYertyUFHRF---' + JSON.stringify(this.graphData[this.selecteddblclick]));
      this.graphData[this.selecteddblclick].lockcell = '12';
      // this.graphData[this.selectedWeekIndex].userComment.push(data.comment);

    }
    this.lockModalCancel.nativeElement.click();
  }


  public editCommentSubmit(data: any, pk_com: any) {


    this.finn[pk_com].comment = data.comment;

    console.log('764rt3g8uihr--' + JSON.stringify(this.comm1));

    console.log('CHECK---' + JSON.stringify(data));


    console.log('CHECK1234565---' + JSON.stringify(this.finn));
    //  pk_com="admin"+pk_com;

    const finaldata = {
      key: pk_com,
      data: data.comment
    };

    //   this.finn=[];

    //   this.finn.push({
    //     sku:pk_com,
    //     plant:this.comm1[2],
    //     cpg:this.comm1[3],
    //     comment:data.comment
    //  });


    this.skuService.editComment(finaldata).subscribe((res: any) => {
      this.editCommentModalBtnCancel.nativeElement.click();

    }, (error) => {
      this.editCommentModalBtnCancel.nativeElement.click();

    });


  }


  public deletecomment(selectedWeekIndex: number) {

    console.log('HHHH---' + selectedWeekIndex);
    this.selectedWeekIndex = selectedWeekIndex;
    //this.editCommentModalBtn.nativeElement.click();

    this.finn.splice(selectedWeekIndex);


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


      var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name);
      var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name);

      for (const abc of fgssselected2) {
        fgssselected1.push(abc);
      }
      this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));


      if (JSON.stringify(commentsObj) !== '{}') {
        const obj = {
          calendarWeek: data.calenderYearWeek,
          sku: JSON.parse(JSON.stringify(this.fgssselected)),
          user: 'admin',
          cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
          plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
        };
        reqBody.data.push(Object.assign(obj, commentsObj));
      }
    }
    if (reqBody.data.length == 0) {
      const obj = {
        calendarWeek: 201942,
        sku: JSON.parse(JSON.stringify(this.fgssselected)),
        user: 'admin',
        cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0]),
        plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name),
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


    const login = {
      Username: 'admin',
      activity: 'Saved Plan',
      datetimestamp: JSON.stringify(this.update)
    };

    this.skuService.sendLog(login).subscribe((res: any) => {

    });


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


  public saveFilter(filterName: string) {


    const login = {
      Username: 'admin',
      activity: 'Saved Filter',
      datetimestamp: JSON.stringify(this.update)
    };

    this.skuService.sendLog(login).subscribe((res: any) => {

    });

    console.log('SUfdf--' + JSON.stringify(this.filters[0].values));
    const ahg = {
      user: 'admin',
      filterName,
      plant: this.createFilterString(this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name)),
      cpg: this.createFilterString(this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split('-')[0])),
      sku: this.createFilterString(this.fgssselected.filter(item => item.isChecked).map(item => item.name))
    };

    console.log('CHECKING---' + JSON.stringify(ahg));

    var data12 = {
      user: 'admin',
      filterName,
      plant: this.createFilterString(this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name)),
      cpg: this.createFilterString(this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name)),
      sku: this.createFilterString(this.fgssselected.filter(item => item.isChecked).map(item => item.name))
    };

    // this.filterService.saveFilter({
    //   user: 'admin',
    //   filterName,
    //   plant: this.createFilterString(this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.name)),
    //   cpg: this.createFilterString(this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split("-")[0])),
    //   sku: this.createFilterString(this.fgssselected.filter(item => item.isChecked).map(item => item.name))
    // }).subscribe((res: any) => {
    //   console.log('SUBSCRIBE');

    //   //this.loadFilters();
    //   this.filterService.getFilters({
    //     user: 'admin'
    //   }).subscribe((res: any) => {
    //     this.loadedFilters = res.map((item) => {
    //       item.isSelected = false;
    //       return item;
    //     });
    //   });
    //   this.loadFilters();
    // });


    this.filterService.saveFilter(data12).subscribe((res: any) => {
      // this.editCommentModalBtnCancel.nativeElement.click();
      this.saveFilterModalCancel.nativeElement.click();
      this.filterService.getFilters({
        user: 'admin'
      }).subscribe((res: any) => {
        this.loadedFilters = res.map((item) => {
          item.isSelected = false;
          return item;
        });
      });

    }, (error) => {
      this.saveFilterModalCancel.nativeElement.click();
      //  this.editCommentModalBtnCancel.nativeElement.click();
      this.filterService.getFilters({
        user: 'admin'
      }).subscribe((res: any) => {
        this.loadedFilters = res.map((item) => {
          item.isSelected = false;
          return item;
        });
      });

    });


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


  public default() {


    let selectedFilter;
    for (const filter of this.loadedFilters) {
      if (filter.isSelected) {
        selectedFilter = filter;
        break;
      }
    }


    var name;
    for (const filter of this.loadedFilters) {

      if (filter.default_Val != null) {
        name = filter.name;
      }
      //filter.isSelected = false;
    }
    for (const filter of this.loadedFilters) {

      if (filter.default_Val != null) {
        filter.default_Val = null;
      }
      //filter.isSelected = false;
    }

    var final_default = selectedFilter.name;
    selectedFilter.default_Val = 'Default';
    var final_def = {
      val: final_default
    };
    if (name == null) {
      this.skuService.setdefault(final_def).subscribe((res: any) => {


      });
    } else {
      var a = {
        val: name
      };
      // this.skuService.defaultnull(a).subscribe((res: any) => {


      // });


      this.skuService.defaultnull(a).subscribe((res: any) => {
        this.skuService.setdefault(final_def).subscribe((res: any) => {


        });

      }, (error) => {
        this.skuService.setdefault(final_def).subscribe((res: any) => {


        });

      });


    }


    //this.loadedFilters[filterIndex].isSelected = !this.loadedFilters[filterIndex].isSelected;
  }


  public loadSelectedFilter() {


    const login = {
      Username: 'admin',
      activity: 'Filter Loaded',
      datetimestamp: JSON.stringify(this.update)
    };

    this.skuService.sendLog(login).subscribe((res: any) => {

    });


    this.second_sku = [];
    let selectedFilter;
    for (const filter of this.loadedFilters) {
      if (filter.isSelected) {
        selectedFilter = filter;
        break;
      }
    }


    console.log('Tftdfwf---' + JSON.stringify(selectedFilter));
    // Todo: Change keys
    // this.filters_plant[0].values = selectedFilter.plant.map(item => {
    //   return {
    //     name: item,
    //     isChecked: true
    //   };
    // });;

    // this.filters[0].values = selectedFilter.cpg.map(item => {
    //   return {
    //     name: item,
    //     isChecked: true
    //   };
    // });;


    this.skus = selectedFilter.sku.map(item => {
      return {
        name: item,
        isChecked: true
      };
    });


    this.fgssselected = selectedFilter.sku.map(item => {
      return {
        name: item,
        isChecked: true
      };
    });

    this.second_sku = [];


    console.log('TOCKKKK--' + JSON.stringify(this.skus));

//this.fgssselected = JSON.parse(JSON.stringify(this.skus));


    console.log('TJHGHYKJH---' + JSON.stringify(this.fgssselected));
    for (const brand of this.filters2) {

      if (brand.key == 'tradetype') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }
        document.getElementById('tradetype').style.background = '#f4f5f9';


      } else if (brand.key == 'salesoffice') {

        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }
        document.getElementById('salesoffice').style.background = '#f4f5f9';

      }


    }


    for (const brand of this.filters1) {

      if (brand.key == 'brands') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }
        document.getElementById('brands').style.background = '#f4f5f9';

      } else if (brand.key == 'alcoholper') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }
        document.getElementById('brands').style.background = '#f4f5f9';

      } else if (brand.key == 'subbrand') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }

        document.getElementById('subbrand').style.background = '#f4f5f9';

      } else if (brand.key == 'Animal_Flags') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }
        document.getElementById('Animal_Flags').style.background = '#f4f5f9';

      } else if (brand.key == 'packtype') {

        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }
        document.getElementById('packtype').style.background = '#f4f5f9';

      } else if (brand.key == 'baseunit') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }


        document.getElementById('baseunit').style.background = '#f4f5f9';

      } else if (brand.key == 'materialgroup') {
        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }
        document.getElementById('materialgroup').style.background = '#f4f5f9';


      } else if (brand.key == 'globalbev') {

        var flag = 1;
        for (const aa of brand.values) {
          if (aa.isChecked) {
            aa.isChecked = false;
          }
        }
        document.getElementById('globalbev').style.background = '#f4f5f9';

      }


    }



    for (const brand of this.filters1_brands) {

      if (brand.key == 'brands') {
        console.log("poopoo");
        var flag = 1;
        for (const aa of brand.values) {
          console.log("poopoo12121");
          if (aa.isChecked) {
            console.log("fgetgte");
            aa.isChecked = false;
          }
        }
        document.getElementById('brands').style.background = '#f4f5f9';

      }

    }


    


    selectedFilter.isSelected = false;
    const data = Object.assign({leadSkus: []}, this.createPlanRequestData);
    /*
       Customer Planning Group 0
       Plants Index  1
       Brands Index 3
     */


    this.cpgss = JSON.parse(JSON.stringify(selectedFilter.cpg));
    this.plantss = selectedFilter.plant;

    console.log('CPG-----' + JSON.stringify(this.cpgss));
    this.filters = [];
    this.filters_plant = [];

    this.skuService.getCustomerPlanningGroup().subscribe((response: any) => {

      // this.filters_plant=response;


      const a = response.map(item => {
        return {name: item, isChecked: false};
      });

      console.log('JKHFRR---' + JSON.stringify(response));

      console.log('shbfsh--');
      this.filters.push({
        name: 'CPG',
        key: 'customerPlanningGroup',
        isExpanded: false,
        values: a
      });


      console.log('khguyg-' + JSON.stringify(this.filters[0].values));

      console.log('Sgfgsg--' + JSON.stringify(this.cpgss));
      for (const a of this.cpgss) {
        for (const b of this.filters[0].values) {
          console.log('32r34435345-' + JSON.stringify(b));
          console.log('32r34435345-  cpgss-' + JSON.stringify(a));
          if (b.name.name == a) {
            b.isChecked = true;
          }
        }
      }
    });


// for(const b of this.filters[0].values)
// {
//      for(const a of this.cpgss) {
//       console.log("fgsfg12345-"+JSON.stringify(b));
//             if(b.name.name==a)
//             {
//               console.log("Kuch aur");
//               b.isChecked=true;
//             }
//           }
// }


    this.skuService.getPlants().subscribe((response: any) => {
      this.plants = response;
      // this.filters_plant=response;


      console.log('Dfsfg---' + JSON.stringify(response));
      const plant = this.plants;
      console.log('HAHA---' + JSON.stringify(plant));
      this.filters_plant.push({
        name: 'Plants',
        key: 'plant',
        isExpanded: false,
        values: response.map(item => {
          return {name: item, isChecked: false};
        })
      });

      for (const a of this.plantss) {
        for (const b of this.filters_plant[0].values) {
          console.log('4354674-' + JSON.stringify(b));
          console.log('4354674-  plants-' + JSON.stringify(a));
          if (b.name.name == a) {
            b.isChecked = true;
          }
        }
      }


    });


    this.granular1 = 'week';


//this.fgssselected=this.skus.filter(item => item.isChecked).map(item => item.name);


    // console.log("DSfsdfsd234----"+JSON.stringify(this.filters[0].values.filter(item => item.isChecked).map(item => item.name.name.split("-")[0])));
    data.forecastingGroups = selectedFilter.sku;
    data.customerPlanningGroup = selectedFilter.cpg;
    data.plants = selectedFilter.plant;

    data.startWeek = 201942;
    data.endWeek = 202004;

    this.loading = true;

    console.log('sfsgfs--' + JSON.stringify(data.forecastingGroups));


    data.forecastingGroups = data.forecastingGroups.map(item => {
      return {name: item, isChecked: true};
    });
    console.log('sfsgf435tyhgns--' + JSON.stringify(data));


    for(const a in data.customerPlanningGroup)
    {
       console.log("Loadingggggggg---"+a);
    }
    data.customerPlanningGroup[0]=data.customerPlanningGroup[0].split("-")[0];
    this.createPlan(data);

    // this.skuService.getGraphData(data).subscribe((res: any) => {
    //   this.processGraphData(res);
    //   this.loading=false;
    //   this.chart1.render();
    //   this.loading=false;
    // });

    this.loadFilterModalCancel.nativeElement.click();
  }
}
