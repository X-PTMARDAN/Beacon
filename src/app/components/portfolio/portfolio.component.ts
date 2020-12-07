import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SKUService } from '../../services/sku.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

import { Observable } from 'rxjs';
import { ViewService } from '../../services/view.service';
import { FilterService } from 'src/app/services/filter.service';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { FusionChartsModule } from "angular-fusioncharts";
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { RowNode } from 'ag-grid-community';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
/*
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FusionChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
*/

enum STEPS {
  'SELECT_OPTION' = 1,
}


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private skuService: SKUService,
    private viewService: ViewService,
    private filterService: FilterService
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

  @ViewChild('addsku', { static: false }) addsku: ElementRef;

  @ViewChild('gantchart_open', { static: false }) gantchart_open: ElementRef;

  @ViewChild('saveFilterModal', { static: false }) saveFilterModal: ElementRef;

  @ViewChild('AddNew', { static: false }) AddNew: ElementRef;



  @ViewChild('AddNew_1', { static: false }) AddNew_1: ElementRef;


  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @ViewChild('UpdateNew', { static: false }) UpdateNew: ElementRef;



  @ViewChild('myModal4_1', { static: false }) myModal4_1: ElementRef;
  @ViewChild('myModal4_pipodetails', { static: false }) myModal4_pipodetails: ElementRef;




  @ViewChild('saveFilterModal12', { static: false }) saveFilterModal12: ElementRef;


  @ViewChild('myModal_gant', { static: false }) myModal_gant: ElementRef;




  @ViewChild('mapsku', { static: false }) mapsku: ElementRef;

  public events: any = [];

  public date;

  public zzzcvcID;
  public zzzstate;
  public zzzdateModified;

  public md_1 = [];

  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];


  public loading = false;
  public from_date;

  public to_date;

  public dispPIPOdetails = false;

  public second_week;

  public dates_1;

  public searchfilter;
  public skus_search = [];

  public dates_1_prev = [];
  public dates_1_next = [];

  public gridApi;
  public gridColumnApi;

  public dates1 = [{
    fromid: "0",
    toid: 0,
    week: 0,
    one: 0,
    two: 0
  }];

  public searchTextFG = '';

  public fromsku_transistion_apply;

  public tosku_transistion_apply;

  public logic_transistion_apply;



  public material_1;


  public lead_sku;

  public startweek_transistion_apply;
  public forecasting_fgid;
  public val_selected = 0;
  public hideSharedLinkCopyMessage = false;

  columnDefs: any = [];
  columnDefs3: any = [];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];


  public material_len = 0;

  public fg_len = 0;

  public maxweek;
  public newsku = false;

  public od = 1;




  public second_type = false;

  public first_type = true;


  public type_value = 0;

  public date_table = false;


  public edit_fromsku = '';
  public edit_tosku = '';

  public edit_from_sku = '';

  public edit_to_sku = '';





  public abc12 = 'fshjg';

  public pipo: any = [];

  public materialidnumber = '1990';

  public materialidqwe;
  public skunamenew;

  public texthide = false;

  public pipoMapping: any = [];

  public drop2;
  public option = 'sku';

  public drop = [];

  public pressed = false;

  public dates = [];
  public edit_type_2 = '';

  public edit_type = '';

  public phase = false;

  public phase_second = false;

  public phase_third = false;

  public newsku12 = false;

  public pipo_map = false;
  public sku_map = true;
  public cvc_map = false;

  public fromsku = 'select';
  public tosku = 'select';

  public mappedFG;


  public mappedFG_1;

  public logic = 'select';


  public startweek;

  public selectedPlants = [];


  public materialid;
  public skuname;
  public fgid;
  public fgname;

  public mappingdrop;

  public columnDefsCVC;
  public mappingdrop_1;

  public cvcData: any = [];
  public cvcDataAll: any = [];

  public fgname_column;
  public material_column;
  public fgid_column;
  public min_column;
  public max_column;
  public switch;

  rowData6: any;

  columnDefs35 = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];


  rowData3 = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];




  public table = false;

  public rowStateChange() {
    window.alert("throughout his life the same \nhe's battled constantly");
    //window.alert("id " + this.zzzcvcID + "dm " + this.zzzdateModified + "st " + this.zzzstate);
  }
  //table
  ngOnInit() {
    //document.body.style.zoom = "75%";
    this.switch = false;

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

    this.skuService.getanimal().subscribe((response: any) => {

      this.mappingdrop_1 = response;
      var str = this.mappingdrop_1.toString();
      this.md_1 = str.split(",");
      this.md_1 = Object.values(this.md_1);
      
      
      this.columnDefs = [
        { headerName: 'FGID', field: 'fgid', sortable: true, filter: true, width: 90 },
        { headerName: 'Forecasting group Name', field: 'forecastinggroup', sortable: true, filter: true, width: 345 }, //300
        { headerName: 'Material', field: 'material', sortable: true, filter: true, width: 120 },  //shud be 100
        { headerName: 'Material Name', field: 'sku', sortable: true, filter: true, width: 345 }, //370
        { headerName: 'Primary', field: 'prime', sortable: true, filter: true, width: 130 },
        { headerName: 'Segment', field: 'animal_FLAG2', sortable: true, filter: true, width: 150, editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            values: this.md_1,
          },
        },
        { headerName: 'First Seen', field: 'minimum', sortable: true, filter: true, width: 140 },
        { headerName: 'Last Seen', field: 'maximum', sortable: true, filter: true, width: 140 },
        /*
        {
          headerName: ' ', field: 'btn', width: 100,  //shud be 100
          cellRenderer: function (params) {
            return '<p>Edit Segment</p>'
          }
        }, 
        */ 
        {
          headerName: ' ', field: 'btn2', width: 120,
          cellRenderer: function (params) {
            return '<p>PIPO Details</p>'
          }
        },  
        
      ];

      this.columnDefs3 = [
        { headerName: 'From ID', field: 'fromid', sortable: true, filter: true, width: 360 }, //260
        { headerName: 'To ID', field: 'toid', sortable: true, filter: true, width: 360 }, //260
        { headerName: 'State', field: 'state', sortable: true, filter: true, width: 200 },  //260
        { headerName: 'From Week', field: 'fromweek', sortable: true, filter: true, width: 150 },  //260
        { headerName: 'FGID', field: 'fgid', sortable: true, filter: true, width: 170 },  //260
        { headerName: 'Status', field: 'status', sortable: true, filter: true, width: 140 },  //150
        { headerName: 'Date', field: 'date', sortable: true, filter: true, width: 110 },  //110
        {
          headerName: 'Edit', field: 'notes', width: 50,
          cellRenderer: function (params) {
            return '<i class="fa fa-pencil" ></i>'
          }
        },
        {
          headerName: 'Delete', field: 'deleteit', width: 50,
          cellRenderer: function (params) {
            return '<i class="fa fa-trash" ></i>'
          }
        }
      ];

      this.columnDefsCVC = [
        { width: 10 },
        { headerName: 'FGID', field: 'leadSku', sortable: true, filter: true, width: 110 }, //260
        { headerName: 'Forecasting Group', field: 'leadSkuName', sortable: true, filter: true, width: 360 }, //260
        { headerName: 'CPG', field: 'cpg', sortable: true, filter: true, width: 360 },  //260
        { headerName: 'Plant', field: 'plant', sortable: true, filter: true, width: 360 },  //260
        { headerName: 'CVC ID', field: 'id', sortable: true, filter: true, width: 110 },  //260
        { headerName: 'Date Modified', field: 'dateModified', sortable: true, filter: true, width: 200 },  //150
        // { headerName: 'State', field: 'state', sortable: true, filter: true, width: 100 },  //110
        {
          headerName: 'State', field: 'state', 
          width: 32,
          //width: 67,
          cellRenderer: function (params) {
            if (params.data.state == 'active') {
              return '<style>.switch { margin-top: 10px; position: relative; display: inline-block; width: 32px; height: 18px; margin-left: 0px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #2196F3; } input:focus + .slider { box-shadow: 0 0 1px #2196F3; } input:checked + .slider:before { -webkit-transform: translateX(14px); -ms-transform: translateX(14px); transform: translateX(14px); } /* Rounded sliders */ .slider.round { border-radius: 18px; } .slider.round:before { border-radius: 50%; }</style><label class="switch"><input type="checkbox" onchange="this.rowStateChange()" checked><span class="slider round"></span></label>';
              //return '<style>.switch {  position: relative; display: inline-block; width: 65px; height: 40px; margin-left: 0px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 34px; width: 30px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #2196F3; } input:focus + .slider { box-shadow: 0 0 1px #2196F3; } input:checked + .slider:before { -webkit-transform: translateX(30px); -ms-transform: translateX(30px); transform: translateX(30px); } /* Rounded sliders */ .slider.round { border-radius: 18px; } .slider.round:before { border-radius: 50%; }</style><label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>';
              }
            else if(params.data.state == 'inactive') {
              return '<style>.switch { margin-top: 10px; position: relative; display: inline-block; width: 32px; height: 18px; margin-left: 0px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #2196F3; } input:focus + .slider { box-shadow: 0 0 1px #2196F3; } input:checked + .slider:before { -webkit-transform: translateX(14px); -ms-transform: translateX(14px); transform: translateX(14px); } /* Rounded sliders */ .slider.round { border-radius: 18px; } .slider.round:before { border-radius: 50%; }</style><label class="switch"><input type="checkbox" onchange="this.rowStateChange()"><span class="slider round"></span></label>';
              //return '<style>.switch {  position: relative; display: inline-block; width: 65px; height: 40px; margin-left: 0px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 34px; width: 30px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #2196F3; } input:focus + .slider { box-shadow: 0 0 1px #2196F3; } input:checked + .slider:before { -webkit-transform: translateX(30px); -ms-transform: translateX(30px); transform: translateX(30px); } /* Rounded sliders */ .slider.round { border-radius: 18px; } .slider.round:before { border-radius: 50%; }</style><label class="switch"><input type="checkbox"><span class="slider round"></span></label>';
            }
            else {
              return params.data.state;
            }
          },
        }
      ];

      let win = (window as any);
      console.log('dfdf->' + win.location.search);
      
      this.skuService.getPIPO().subscribe((response: any) => {
        this.pipo = response;
        console.log("Checking-----" + JSON.stringify(this.pipo));
        for (const abc of this.pipo) {
          var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
          console.log("121---" + g);
  
          this.drop.push(g);
  
  
        }
  
        this.material_len = this.drop.length;
        this.material_len = 932;
        console.log("Dfdfdfd---" + JSON.stringify(response));
      });
  
      this.skuService.getPIPOMapping().subscribe((response: any) => {
        //this.pipoMapping = response;
        
        this.pipoMapping = [];
        var fromids = [];
        var toids = [];
        var fmweeks = [];
        var count=0;
        var flag;
        for (var key in response) {
          console.log("key: " + key);
          flag = 0;
          if (response.hasOwnProperty(key)) {
            var fid = response[key].fromid;
            var tid = response[key].toid;
            var wk = response[key].fromweek;
            for (count=0; count<fromids.length; count++) {
              if (fid == toids[count] && tid == fromids[count] && wk == fmweeks[count]) {
                console.log("found one jo delete ho raha hai: " + fid + " ||| " + tid + " ||| " + wk);
                for (var key in this.pipoMapping) {
                  if (response.hasOwnProperty(key)) {
                    if (this.pipoMapping[key].fromid == tid && this.pipoMapping[key].toid == fid && this.pipoMapping[key].fromweek == wk) {
                      console.log("also deleting " + this.pipoMapping[key].fromid + " ||| " + this.pipoMapping[key].toid + " ||| " + this.pipoMapping[key].fromweek);
                      this.pipoMapping.splice(key, 1);
                      break;
                    }
                  }
                }
                flag = 1;
                break;
              }
            }
            if (flag == 0) {
              fromids.push(fid);
              toids.push(tid);
              fmweeks.push(wk);
              if (tid == '0 - null' || tid == '0 - ') {
                console.log("found a 0-null one: fromid: " + fid);
                response[key].toid = '';
              }
              this.pipoMapping.push(response[key]);
            }
          }
        }
        
      });
      
      /*
      this.skuService.getCVC().subscribe((response: any) => {
        this.cvcData = response;
        this.cvcDataAll = response;
      });
      */
  
      this.skuService.getmaxweek().subscribe((response: any) => {
        this.maxweek = response;
      });
  
      this.skuService.getfgid().subscribe((response: any) => {
  
        this.mappingdrop = response;
        //this.fg_len=this.mappingdrop.length; 
      });
    });

  }
  
  public fgshow() {
    this.pressed = true;
  }

  public getCallbackFG() {
    return this.filterSKUs.bind(this);
  }

  public filterSKUs(sku: string) {
    if (!this.searchTextFG || !this.searchTextFG.trim()) {
        return true;
    }
    const regex = new RegExp(this.searchTextFG && this.searchTextFG.trim(), 'ig');
    return regex.test(sku);
  }

  public selectallFG_CVC() {
    
  }

  public stateSwitch() {
    this.switch = !this.switch;
    if (this.switch) {
      this.cvcData = [];
      for (var key in this.cvcDataAll) {
        if (this.cvcDataAll.hasOwnProperty(key)) {
          if (this.cvcDataAll[key].state == 'active') {
            this.cvcData.push(this.cvcDataAll[key]);
          }
        }
      }
      this.gridApi.redrawRows({ rowNodes: this.cvcData });
    }
    else {
      this.cvcData = this.cvcDataAll;
      this.gridApi.redrawRows({ rowNodes: this.cvcData });
    }
  }

  public onCellClickedCVC(params) {
    this.zzzcvcID = null;
    this.zzzdateModified = null;
    this.zzzstate = null;
    if (params.colDef.field == "state") {
      this.zzzcvcID = params.data.id;
      var fulldate = new Date();
      var year = fulldate.getFullYear();
      var month = fulldate.getMonth() + 1;
      var date = fulldate.getDate();
      this.zzzdateModified = year.toString() + "-" + month.toString() + "-" + date.toString();
      if (params.data.state == "active") {
        this.zzzstate = "inactive";
      }
      else if(params.data.state == "inactive") {
        this.zzzstate = "active";
      }
      else {
        console.log("weird state encountered");
      }
      //var ask = confirm("CVC ID: " + this.zzzcvcID + "\nAre you sure you want to change the state to " + this.zzzstate + "?");
      if (this.zzzcvcID && this.zzzdateModified && this.zzzstate) {
        var data = {
          "id":this.zzzcvcID,
          "leadSku":null,
          "leadSkuName":null,
          "cpg":null,
          "plant":null,
          "dateModified":this.zzzdateModified,
          "state":this.zzzstate 
        }
        this.skuService.updateCVCState(data).subscribe((response: String) => {
          params.data.state = this.zzzstate;
          //window.alert("CVC ID: " + this.zzzcvcID + "\nState changed to " + this.zzzstate);
          this.hideSharedLinkCopyMessage = true;
          setTimeout( () => {
            this.hideSharedLinkCopyMessage = false;
          }, 5000);
        })
      }
    }
  }

  public onCellValueChangedCVC(params) {
    if (params.node.id == "state") {
      window.alert(params.data.state);
    }
  }

  
  public firstDataRenderedCVC(params) {
    var threebars = Array.from(document.getElementsByClassName('ag-icon-menu') as HTMLCollectionOf<HTMLElement>);
    threebars[0].style.display = 'none'; //remove ag-icon in first column
    threebars[7].style.display = 'none'; //remove ag-icon in last column
    var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
        headercells[i].style.paddingLeft = '0px';
        headercells[i].style.paddingRight = '0px';
    }
    var agcells = Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells.length; i++) {
        agcells[i].style.paddingLeft = '0px';
        agcells[i].style.paddingRight = '0px';
    }
  }
  
  public onCellClicked(params) {

    console.log("Checking123", params);
    if (params.colDef.field == "notes") {
      this.schedule_1(params.data.fromid, params.data.toid, params.data.state);
    }
    if (params.colDef.field == "deleteit") {
      if (confirm("Are you sure you want to delete this PIPO rule?")) {
        this.reversepipo(params.data.fromid, params.data.toid, params.data.state, params.data.fgid);
      }
    }
  }



  public dates2;
  public frweek;

  onCellDoubleClickedSM() {
    //here
    var virtualList = Array.from(document.getElementsByClassName('ag-virtual-list-viewport') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < virtualList.length; i++) {
      virtualList[i].style.zoom = '133%';
    }
  }

  onCellValueChangedSM(params) {

    if (params.colDef.field == "animal_FLAG2") {

      var isLegit = false;

      this.md_1.forEach(element => {
        if (params.data.animal_FLAG2 == element) {
          isLegit = true;
        }
      });

      if (isLegit) {
        var confirmationStr = "Change the segment to " + params.data.animal_FLAG2 + "?";
        if (confirm(confirmationStr)) {

          this.lead_sku = params.data.fgid;
          this.material_1 = params.data.material;
          this.mappedFG_1 = params.data.animal_FLAG2;
          var data = {
            lead: this.lead_sku,
            animal: this.mappedFG_1,
            material: this.material_1
          }; 
          this.loading = true;
          this.skuService.mapFG_1(data).subscribe((res: any) => {
            window.alert("Segment mapped");
            this.loading = false;
          }, (error) => {
            window.alert("Segment mapped");
            this.loading = false;
          });
        }
      }
      else {
        window.alert("Segment cannot be edited to " + params.data.animal_FLAG2 + "\nPlease choose a valid segment.")
      }
    }
  }

  public reversepipo(tpfromid, tptoid, pstate, pfgid) {

    var pfromid = tpfromid.split(" - ")[0]; //reversing
    var ptoid = tptoid.split(" - ")[0]; //reversing
    
    var abc = {
      from: pfromid,
      to: ptoid
    }

    this.dates2 = [];
    var count=0;

    this.skuService.getschedule_value(abc).subscribe((response2: any) => {
      for (var key in response2) {
        if (response2.hasOwnProperty(key)) {
          count = count + 1;
          var val = response2[key];
          var a = {
            week: val.fromweek,
            one: val.one,
            two: val.two,
            fromid: val.toid,
            toid: val.fromid
          };
          this.dates2.push(a);
          if (count == 1) {
            this.frweek = val.fromweek;
          }
        }
      }

      var data = {
        fromid: ptoid,
        toid: pfromid,
        state: pstate,
        fromweek: this.frweek,
        fgid: pfgid
      };

      this.skuService.savePIPOvalue(this.dates2).subscribe((response2: any) => { 
  
        this.skuService.savePIPOsku(data).subscribe((res: any) => {
          this.loading = false;
          window.alert("Delete PIPO rule request successfully added to queue!");          
        }, (error) => {
  
          var d = new Date();
          var n = d.getTime();
          
          window.alert("Delete PIPO rule request successfully added to queue!");
          this.loading = false;
        });
      }); 
    });

  }

  public revpq() {
    window.alert(JSON.stringify(this.dates));
  }

  //dumdum
  public dataSource;
  public gotten_material_details;
  public thematerialid;
  public thefgname;
  public thematerialname;
  public thesegment;
  public thesince;
  public thefgid;
  public fromFull;
  public toFull;
  public fromid;
  public toid;
  public fromweek=0;
  //get the below from request 
  public thebrand;
  public theown3pp;
  public theprimaryunit;
  public theabv;
  public thesubbrand;
  public theglobalcategory;
  public thepacksize;
  public thematerialgroup;
  public thelocalcategory;
  public thepacktype;
  public gridOptions;

  public onCellClicked1(params) {

    //here
    var virtualList = Array.from(document.getElementsByClassName('ag-virtual-list-viewport') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < virtualList.length; i++) {
      virtualList[i].style.zoom = '133%';
    }

    console.log("\n\n\n khalid \n", params.node.id);

    console.log("Checking123", params);
    console.log("Checking");
    if (params.colDef.field == "btn") {
      this.edit_1(params.data.fgid, params.data.material); 
    }
    if (params.colDef.field == "btn2") {
      this.clearPIPOdetails();
      this.displayPIPODetails(params.data.fgid, params.data.material, params.data.forecastinggroup, params.data.sku, params.data.animal_FLAG2, params.data.minimum);
    }
    // this.schedule_1(params.data.fromid,params.data.toid,params.data.state);
  }

  public edit_1(num: string, num2: string) {
    this.lead_sku = num;
    this.material_1 = num2;
    this.myModal4_1.nativeElement.click();
  }

  public clearPIPOdetails() {
    this.thematerialid = null;
    this.thefgname = null;
    this.thematerialname = null;
    this.thesegment = null;
    this.thesince = null;
    this.thefgid = null;
    this.thebrand = null;
    this.theown3pp = null;
    this.theprimaryunit = null;
    this.theabv = null;
    this.thesubbrand = null;
    this.theglobalcategory = null;
    this.thepacksize = null;
    this.thematerialgroup = null;
    this.thelocalcategory = null;
    this.thepacktype = null;
    this.fromid = null;
    this.toid = null;
    this.fromname = null;
    this.toname = null;
    this.fromwls = null;
    this.towls = null;
    this.fromFull = null;
    this.toFull = null;
  }

  public displayPIPODetails(fgid, materialid, fgname, materialname, segment, since) {
    this.thematerialid = materialid;
    this.thefgname = fgname;
    this.thematerialname = materialname;
    this.thesegment = segment;
    this.thesince = since;
    this.thefgid = fgid;
    this.loading = true;
    

    this.skuService.getSomeMaterialDetails(this.thematerialid).subscribe((response: any) => {
      this.gotten_material_details = response[0];
      this.thebrand = this.gotten_material_details.a;
      this.theown3pp = this.gotten_material_details.b;
      this.theprimaryunit = this.gotten_material_details.c;
      this.theabv = this.gotten_material_details.d;
      this.thesubbrand = this.gotten_material_details.e;
      this.theglobalcategory = this.gotten_material_details.f;
      this.thepacksize = this.gotten_material_details.g;
      this.thematerialgroup = this.gotten_material_details.h;
      this.thelocalcategory = this.gotten_material_details.i;
      this.thepacktype = this.gotten_material_details.j;
    
      var count=0;
      for (var key in this.pipoMapping) {
        if (this.thefgid == this.pipoMapping[key].fgid) {
          if (this.pipoMapping[key].fromweek > this.fromweek) {
            this.fromFull = this.pipoMapping[key].fromid;
            this.toFull = this.pipoMapping[key].toid;
          }
        }
      }

      if (this.fromFull == null) {
        this.loading = false;
      }

      if (this.fromFull != null && this.toFull != null) {
        this.loading = true;
        this.fromid = this.fromFull.split(" - ")[0];
        this.toid = this.toFull.split(" - ")[0];
        this.fromname = this.fromFull.split(" - ")[1];
        this.toname = this.toFull.split(" - ")[1];
        
        var ids = {
          from: this.fromid,
          to: this.toid
        }

        this.skuService.getschedule_value(ids).subscribe((response2: any) => {
          this.ssssss = response2;
          
          var cats = [];
          var valuesfrom = [];
          var valuesto = [];

          for (var key in this.ssssss) {
            this.fromwls = this.ssssss[key].fromweek;            
            
            var cat = {
              "label": this.ssssss[key].fromweek
            }
            cats.push(cat);
            var valfrom = {
              "value": this.ssssss[key].one
            }
            valuesfrom.push(valfrom);
            var valto = {
              "value": this.ssssss[key].two
            }
            valuesto.push(valto);
            
          }
          this.towls = 202208;
          
          
          var categories = [{
            "category": cats
          }];

          var dataset = [
            {
              "seriesname": this.fromid,
              "data": valuesfrom
            },
            {
              "seriesname": this.toid,
              "data": valuesto
            }
          ]

          var dataSource = {
            "chart": {
                "theme": "fusion",
                "caption": "PIPO visualization",
                "xAxisname": "Week",
                "yAxisName": "Percentage",
                //"numberPrefix": "$",
                //"plotFillAlpha": "80",
                //"divLineIsDashed": "1",
                //"divLineDashLen": "1",
                //"divLineGapLen": "1"
                },
                "categories": categories,
                "dataset": dataset,
          };

          this.dataSource = dataSource;
          this.loading = false;
        });
      }
    })
    this.myModal4_pipodetails.nativeElement.click();

  }

  public ssssss;
  public fromname;
  public toname;
  public fromwls;
  public towls;

  public sortComments1(keyIndex: number) {
    this.pipo = this.pipo.sort((a, b) => {
      var value1;
      var value2;
      if (keyIndex == 1) {
        value1 = a.fgid;
        value2 = b.fgid;
      }
      else {
        value1 = a.material;
        value2 = b.material;
      }

      console.log("Checking12121--" + value1);

      if (value1 === value2) {
        return 0;
      }

      return value1 > value2 ? 1 : -1;
    });
  }


  public test1() {
    this.materialidnumber = '';

    this.skunamenew = '';
  }
  public addingSKU() {
    console.log("gfhgfh12---" + this.materialidnumber);

    if (this.materialidnumber === null || this.materialidnumber == '') {
      window.alert("Please enter Material ID");
      return;
    }
    if (this.skunamenew === null || this.skunamenew == '') {
      window.alert("Please enter SKU Name");
      return;
    }
    this.pipo.push({
      material: this.materialidnumber,
      sku: this.skunamenew,

    });


    var a = {
      material: this.materialidnumber,
      sku: this.skunamenew,

    };

    console.log("Fsfsfss----" + JSON.stringify(this.pipo));

    this.newsku12 = true;
    document.getElementById('newsku123').style.display = 'block';

    this.skuService.addSKU_pipo_final(a).subscribe((res: any) => {


      console.log("RESPONSE");
      //  this.drop2=res;
    }, (error) => {


    });

    this.addsku.nativeElement.click();

    //this.texthide=true;
  }

  public abc() {
    this.table = true;
    this.phase = false;
  }



  public show_phase() {

    console.log("Dfdfd");
    if (this.phase_second == false && this.phase_third == false) {
      this.phase_second = true;
      this.phase_third = false;
    }
    else if (this.phase_second == true && this.phase_third == false) {
      this.phase_second = true;
      this.phase_third = true;
    }


  }


  public populate_drop2() {
    //  this.skuService.fetch_material_list_pipo(drop1)



    // console.log("Checkng---"+this.fromsku);

    // var a={
    //   mat123:JSON.stringify(this.fromsku.toString())
    // };


    console.log("Dfsfgfsg---" + JSON.stringify(this.fromsku));
    var sku = this.fromsku.split('-');
    var a = {
      fromid: sku[0],
    }

    console.log("CHEK000--" + JSON.stringify(a));



    console.log("dsfheg---" + JSON.stringify(a));
    this.skuService.fetch_material_list_pipo(a).subscribe((res: any) => {


      console.log("RESPONSE");
      this.drop2 = res;
    }, (error) => {


    });



  }

  public test(feature) {
    if (feature == "sku") {
      this.pipo_map = false;
      this.sku_map = true;
      // document.getElementById('pipo_bar').style.background='#17b169';

      // document.getElementById('sku_bar').style.background='#f4f5f9';
    }
    else {
      this.pipo_map = true;
      this.sku_map = false;
    }
  }


  public changelogic(feature) {
    if (feature == 'delist') {
      this.newsku = false;
    }
    else {
      this.newsku = true;
    }
  }


  public pipo_click() {
    this.sku_map = false;
    this.cvc_map = false;
    this.pipo_map = true;
    //document.getElementById('pipo_bar').style.background = '#17b169';
    //document.getElementById('sku_bar').style.background = '#f4f5f9';
  }


  public sku_click() {
    this.pipo_map = false;
    this.cvc_map = false;
    this.sku_map = true;
    document.getElementById('sku_bar').style.background = '#17b169';
    document.getElementById('pipo_bar').style.background = '#f4f5f9';
  }

  public cvc_click() {
    this.sku_map = false;
    this.pipo_map = false;
    this.cvc_map = true;
  }

  public map_sku_1() {
    var data = {
      lead: this.lead_sku,
      animal: this.mappedFG_1,
      material: this.material_1
    };





    this.skuService.mapFG_1(data).subscribe((res: any) => {
      //this.editCommentModalBtnCancel.nativeElement.click();

      window.alert("Mapped");
      //window.location.reload();
      /*
      this.skuService.getPIPO().subscribe((response: any) => {
        this.pipo = response;

        this.rowData6 = response;

        for (const abc of this.pipo) {

          var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
          console.log("121---" + g);
          this.drop.push(g);
        }
        console.log("Dfdfdfd---" + JSON.stringify(this.drop));
      });

      this.skuService.getPIPOMapping().subscribe((response: any) => {
        this.pipoMapping = response;
      });
      */


    }, (error) => {

      window.alert("Mapped");

      /*
      this.skuService.getPIPO().subscribe((response: any) => {
        this.pipo = response;
        for (const abc of this.pipo) {
          var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
          console.log("121---" + g);
          this.drop.push(g);
        }
        console.log("Dfdfdfd---" + JSON.stringify(this.drop));
      });

      this.skuService.getPIPOMapping().subscribe((response: any) => {
        this.pipoMapping = response;
      });

      // this.editCommentModalBtnCancel.nativeElement.click();
      */
    });









  }

  public map_sku() {
    this.materialid;
    this.skuname;
    this.mappedFG;


    var data = {
      material: this.skuname,
      fg: this.mappedFG
    };





    this.skuService.mapFG(data).subscribe((res: any) => {
      //this.editCommentModalBtnCancel.nativeElement.click();

      window.alert("Mapped");


      this.skuService.getPIPO().subscribe((response: any) => {
        this.pipo = response;
        for (const abc of this.pipo) {

          var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
          console.log("121---" + g);
          this.drop.push(g);
        }
        console.log("Dfdfdfd---" + JSON.stringify(this.drop));
      });

      this.skuService.getPIPOMapping().subscribe((response: any) => {
        this.pipoMapping = response;
      });



    }, (error) => {

      window.alert("Mapped");


      this.skuService.getPIPO().subscribe((response: any) => {
        this.pipo = response;
        for (const abc of this.pipo) {
          var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
          console.log("121---" + g);
          this.drop.push(g);
        }
        console.log("Dfdfdfd---" + JSON.stringify(this.drop));
      });

      this.skuService.getPIPOMapping().subscribe((response: any) => {
        this.pipoMapping = response;
      });

      // this.editCommentModalBtnCancel.nativeElement.click();

    });




    // this.skuService.mapFG(data).subscribe((response: any) => {  
    //   //



    this.mapsku.nativeElement.click();


    // });


  }

  public second_type1() {

    if (this.od % 2 == 0) {
      this.first_type = true;
      this.second_type = false;
      this.od = 1;
      document.getElementById('harshit').style.backgroundColor = '#fff';
    }
    else {

      this.first_type = false;
      this.second_type = true;
      this.od = 0;
      document.getElementById('harshit').style.backgroundColor = '#f1f1f1';
    }
  }


  public type(a) {
    this.val_selected = a;

    this.type_value = a;
    this.newsku = true;

    this.second_week = true;

    if (a == 4) {
      this.second_week = false;
    }
    if (a == 9) {
      this.second_week = false;
    }

    this.dates = [];
    this.from_date = '';
    this.to_date = '';
  }


  public onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(this.searchfilter);
  }

  // NOT TO BE USED
  public add_sku() {

    console.log("Check ---" + this.skuname);

    this.pipo.push({
      material: this.materialid,
      //minimum:201940,
      sku: this.skuname,
    });


    var a = {
      material: this.materialid,
      //minimum:201940,
      sku: this.skuname,
    };
    //this.drop.push(this.skuname);

    this.skuService.savePIPO(a).subscribe((response: any) => {



    });

    //  materialid;
    //  skuname;
    //  fgid;
    //  fgname;
  }



  public edit(num: number) {


    var a = this.pipo[num];
    console.log("SDFsfs---" + JSON.stringify(a));

    this.skuname = a.material;
    this.materialid = a.sku;

    document.getElementById('newsku123').style.display = 'none';
  }


  public gantchart1(num: number) {


    console.log("Fdfd--" + JSON.stringify(this.pipoMapping[num]));
    this.fromsku_transistion_apply = this.pipoMapping[num].fromid;

    this.tosku_transistion_apply = this.pipoMapping[num].toid;

    var abc = {
      from: this.fromsku_transistion_apply,
      to: this.tosku_transistion_apply
    };
    this.skuService.getPIPOvalue(abc).subscribe((response2: any) => {
      console.log("DFdf---");

      this.dates1 = response2;

      this.UpdateNew.nativeElement.click();

      //window.alert("Done!");
    });

    //  this.saveFilterModal.nativeElement.click();



  }


  public apply1() {
    this.AddNew.nativeElement.click();



  }

  public delete_1(a, b) {


    var abc = {
      from: a,
      to: b
    }
    this.skuService.delete_value(abc).subscribe((response2: any) => {
      console.log("DFdf---");
      window.location.reload();

      //window.alert("Done!");
    });


  }


  public schedule_1(a, b, c) {


    this.edit_from_sku = a;
    this.edit_fromsku = a;
    this.edit_to_sku = b;
    this.edit_tosku = b;

    this.edit_type_2 = c;
    this.edit_type = c;


    var abc = {
      from: a,
      to: b
    }
    this.skuService.getschedule_value(abc).subscribe((response2: any) => {
      console.log("DFdf---");
      this.dates_1 = [];
      this.dates_1_next = [];
      this.dates_1_prev = [];
      this.dates_1 = response2;

      var h = this.dates_1[0].fromweek;
      for (var y = 0; y < this.dates_1.length; y++) {
        console.log("Dfdfd--" + y);

        //alert(this.dates_1[y].fromweek);
        if (parseInt(this.dates_1[y].fromweek) <= 202023) {

          var gh = {
            week: h,
            one: this.dates_1[y].one,
            two: this.dates_1[y].two,
            fromid: this.dates_1[y].fromid,
            toid: this.dates_1[y].toid
          };
          this.dates_1_prev.push(gh);
        }
        else {
          var gh = {
            week: h,
            one: this.dates_1[y].one,
            two: this.dates_1[y].two,
            fromid: this.dates_1[y].fromid,
            toid: this.dates_1[y].toid
          };
          this.dates_1_next.push(gh);
        }
        h++;
      }


      this.AddNew_1.nativeElement.click();

      //window.alert("Done!");
    });


  }

  public from_date_table() {
    if (this.val_selected == 4) {
      this.to_date = "202020";
    }



    if (!(this.from_date == " " || this.from_date == " " || this.from_date == null || this.to_date == null || this.to_date == "")) {

      if (this.from_date > this.to_date) {
        window.alert("Please choose valid dates");
        return;
      }
      this.date_table = true;
      var str = this.from_date;

      str = str.substring(0, 4);


      var str1 = this.from_date;

      str1 = str1.substring(6, str1.length);

      // alert(str+"-"+str1);

      var str2 = str + str1;

      var str3 = parseInt(str2); //str3 = 202010




      var str_1 = this.to_date;

      str_1 = str_1.substring(0, 4);


      var str1_1 = this.to_date;

      str1_1 = str1_1.substring(6, str1_1.length);

      // alert(str_1+"-"+str1_1);

      var str2_1 = str_1 + str1_1; 

      var str3_1 = parseInt(str2_1); //str3_1 = 202023


      this.dates = [];


      if (this.val_selected == 1) {
        var j = 0;
        for (var i = str3; i <= str3_1; i++) {

          if(i>202053 && i<=202100) {
            console.log("i in loop " + i);
            continue;
          }
          console.log("in out of loop " + i);
          j++;
          var k = Math.round(100 * j / (str3_1 - str3 + 1));
          var a = {
            week: i,
            one: 100 - k,
            two: k,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku
          };
          console.log("Harshit - " + i);

          this.dates.push(a);
        }
      }


      else if (this.val_selected == 2) {
        var j = 0
        for (var i = str3; i <= str3_1; i++) {
          if(i>202053 && i<=202100) {
            console.log("i in loop " + i);
            continue;
          }
          console.log("in out of loop " + i);
          j++;
          var k = (str3_1 - str3 + 1);

          var f = Math.log(j) / Math.log(k);


          f = f * 100;
          f = Math.round(f);


          var a = {
            week: i,
            one: 100 - f,
            two: f,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku
          };
          console.log("Harshit - " + i);

          this.dates.push(a);
        }
      }


      else if (this.val_selected == 4) {
        
        var j = 0

        j++;
        var k = (str3_1 - str3 + 1);
        //var k=Math.log(str3,h);

        var a = {
          week: str3,
          one: 0,
          two: 100,
          fromid: this.fromsku.split("-")[0],
          toid: this.tosku
        };
        console.log("Harshit - " + i);

        this.dates.push(a);

      }




      else if (this.val_selected == 6) {
        var j = 0
        for (var i = str3; i <= str3_1; i++) {
          if(i>202053 && i<=202100) {
            console.log("i in loop " + i);
            continue;
          }
          console.log("in out of loop " + i);
          j++;
          var k = Math.round(100 * j / (str3_1 - str3 + 1));

          var a1 = {
            week: i,
            one: 100 - k,
            two: 0,
            fromid: this.fromsku.split("-")[0],
            toid: 0
          };
          console.log("Harshit - " + i);

          this.dates.push(a1);
        }
      }

      else if (this.val_selected == 7) {
        var j = 0
        for (var i = str3; i <= str3_1; i++) {
          if(i>202053 && i<=202100) {
            console.log("i in loop " + i);
            continue;
          }
          console.log("in out of loop " + i);
          j++;
          var k = (str3_1 - str3 + 1);

          var f = Math.log(j) / Math.log(k);


          f = f * 100;
          f = Math.round(f);


          var a2 = {
            week: i,
            one: 100 - f,
            two: 0,
            fromid: this.fromsku.split("-")[0],
            toid: 0
          };
          console.log("Harshit - " + i);

          this.dates.push(a2);
        }
      }


      else if (this.val_selected == 9) {
        var j = 0;


        j++;
        var k = (str3_1 - str3 + 1);
        //var k=Math.log(str3,h);

        var a90 = {
          week: str3,
          one: 100,
          two: 0,
          fromid: this.fromsku.split("-")[0],
          toid: this.tosku
        };
        console.log("Harshit - " + i);

        this.dates.push(a90);

      }

      else if (this.val_selected < 6) {
        for (var i = str3; i <= str3_1; i++) {
          if(i>202053 && i<=202100) {
            console.log("i in loop " + i);
            continue;
          }
          console.log("in out of loop " + i);

          var a = {
            week: i,
            one: 10,
            two: 90,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku
          };
          console.log("Harshit - " + i);

          this.dates.push(a);
        }
      }
      else {

        for (var i = str3; i <= str3_1; i++) {
          if(i>202053 && i<=202100) {
            console.log("i in loop " + i);
            continue;
          }
          console.log("in out of loop " + i);

          var a = {
            week: i,
            one: 10,
            two: 0,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku
          };
          console.log("Harshit - " + i);

          this.dates.push(a);
        }


      }


    }
    if (this.second_type == true && this.from_date != null && this.from_date != "" && this.from_date != " ") {
      this.date_table = true;
    }
  }

  public hello2(i) {
    var a = this.dates[i].one;
    this.dates[i].two = 100 - a;
  }


  public hello2_1(i) {
    var a = this.dates_1_next[i].one;
    this.dates_1_next[i].two = 100 - a;
  }



  public apply_1() {
    this.loading = true;
    this.skuService.savePIPOvalue_1(this.dates_1_next).subscribe((response2: any) => {

      this.loading = false;
      window.alert("Value Updated");
      window.location.reload();
    });
  }


  public onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }

  public apply() {

    this.loading = true;

    console.log("Dfsfgfsg---" + JSON.stringify(this.fromsku));

    console.log("Dfsfgfsg1---" + JSON.stringify(this.tosku));
    console.log("Dfsfgfsg2---" + JSON.stringify(this.logic));
    console.log("Dfsfgfsg3---" + JSON.stringify(this.startweek));

    this.fromsku_transistion_apply = this.fromsku.split('-')[0];

    this.tosku_transistion_apply = this.tosku;

    this.logic_transistion_apply = this.logic;


    this.startweek_transistion_apply = this.startweek;


    this.forecasting_fgid = this.fromsku.split('-')[2];

    console.log("3434343--" + this.tosku_transistion_apply);

    var state;
    this.date = parseInt(this.from_date.substr(0, 4) + this.from_date.substr(6));

    //this.final=201952;

    console.log("34354ythrgbfd---" + this.date);

    state = "Transistion";



    var gh = this.val_selected;


    if (gh == 1) {
      state = "Linear Transistion";
    }
    else if (gh == 2) {
      state = "Log Transistion";
    }

    else if (gh == 3) {
      state = "Log Transistion";
    }

    else if (gh == 4) {
      state = "Step Transistion";
    }
    else if (gh == 5) {
      state = "Custom Transistion";
    }
    else if (gh == 6) {
      state = "Linear Delisting";
    }
    else if (gh == 7) {
      state = "Log Delisting";
    }

    else if (gh == 8) {
      state = "Log Delisting";
    }
    else if (gh == 9) {
      state = "Step Delisting";
    }
    else if (gh == 10) {
      state = "Custom Delisting";
    }

    if (this.tosku == 'select') {
      window.alert("in it");
      this.tosku = '0';
    }

    var data = {
      fromid: this.fromsku.split("-")[0],
      toid: this.tosku,
      state: state,
      fromweek: this.date,
      fgid: this.fromsku.split("-")[2]
    };

    console.log("CHEK000--" + JSON.stringify(data));
    
    
    //this.myModal_gant.nativeElement.click();
    this.skuService.savePIPOvalue(this.dates).subscribe((response2: any) => {
      console.log("DFdf---");


      this.skuService.savePIPOsku(data).subscribe((res: any) => {
        //this.editCommentModalBtnCancel.nativeElement.click();
        this.loading = false;
        window.alert("Save PIPO rule request successfully added to queue!");
        /*
        this.skuService.getPIPO().subscribe((response1: any) => {
          this.pipo = response1;
          console.log("Check--------" + JSON.stringify(response1));
          for (const abc of this.pipo) {
            var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
            //console.log("121---"+JSON.stringify(abc));

            console.log("Fdfdfdfdfd---" + abc.prime);
            if (abc.prime === 'PRIMARY') {
              this.drop.push(g);
            }
            else {
              console.log("0909we3434343");
            }

          }
          console.log("Dfdfdfd---" + JSON.stringify(this.drop));
        });


        this.skuService.getPIPOMapping().subscribe((response2: any) => {
          this.pipoMapping = response2;
          this.fromsku = '';
          this.tosku = '';
          this.logic = ''
          this.startweek = '';
          this.dates = [];
          this.from_date = '';
          this.to_date = '';
          console.log("DFdf---");
          window.alert("Done!");

          this.loading = false;

          window.location.reload();
        });
        */
        
      }, (error) => {

        var d = new Date();
        var n = d.getTime();
        
        window.alert("Save PIPO rule request successfully added to queue!");
        this.loading = false;
        /*
        console.log("Check--------");
        this.skuService.getPIPO().subscribe((response1: any) => {
          this.pipo = response1;

          // let xi=0;

          // let xy=0;

          // for(const abc1 of this.pipo)
          // {

          //     if(xi==)
          // }


          for (const abc of this.pipo) {
            var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
            console.log("121---" + g);
            this.drop.push(g);
          }
          console.log("Dfdfdfd---" + JSON.stringify(this.drop));
        });


        this.skuService.getPIPOMapping().subscribe((response2: any) => {
          this.pipoMapping = response2;
          this.fromsku = '';
          this.tosku = '';
          this.logic = ''
          this.startweek = '';
          console.log("DFdf---");
          window.alert("Done!");

          window.location.reload();
          this.loading = false;
        });
        

        // this.editCommentModalBtnCancel.nativeElement.click();
        */
      });


      //window.alert("Done!");
    });
    
    // this.skuService.savePIPOsku(data).subscribe((response: any) => {  
    //   this.fromsku='';
    //   this.tosku='';
    //   this.logic=''
    //   this.startweek='';
    //   console.log("Check--------");
    //   this.skuService.getPIPO().subscribe((response1: any) => {    
    //     this.pipo=response1;
    //     for(const abc of this.pipo)
    //     {
    //       this.drop.push(abc.material);
    //     }
    //     console.log("Dfdfdfd---"+JSON.stringify(this.drop));
    //   });


    // this.skuService.getPIPOMapping().subscribe((response2: any) => {  
    //   this.pipoMapping=response2;
    // });


    //   console.log("DFdf---");
    //   window.alert("Done!");

    // });

    this.loading = false;

    this.fromsku;
    this.tosku;
    this.logic;
    this.startweek;
  }

  public abc_phase() {
    this.table = false;
    this.phase = true;
  }

  /*
  //sparks
  public yoyo;
  public getSomeYoyos() {

    this.skuService.getSomeYoyos().subscribe((response: String) => {
      this.yoyo = response;
      window.alert(this.yoyo);
    })

  }
  */

  ngOnDestroy(): void {
  }
}