import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SKUService } from '../../services/sku.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(
    private router: Router,
    private skuService: SKUService,
  ) { }

  public allLogs: any = [];
  columnDefs = [
    { headerName: 'Username/Email', field: 'username', filter: true, sortable: true, width: 510 },
    { headerName: 'Activity', field: 'activity', filter: true, sortable: true, width: 510 },
    { headerName: 'Date/Time Stamp', field: 'datetimestamp', filter: true, sortable: true, width: 510 }
  ];


  columnDefs2 = [
    { headerName: 'Username', field: 'username', filter: true, sortable: true, width: 500 },
    { headerName: 'Password', field: 'password', filter: true, sortable: true, width: 500 },
    { headerName: 'Role', field: 'role', filter: true, sortable: true, width: 200 },
    {
      headerName: 'Delete', field: 'deleteit', width: 50,
      cellRenderer: function (params) {
        return '<i class="fa fa-trash" ></i>'
      }
    }
  ];


  columnDefs1 = [
    { headerName: 'Week', field: 'week', width: 200, sortable: true, filter: true },
    { headerName: 'Comment', field: 'comment', width: 200, sortable: true, filter: true },
    { headerName: 'Forecasting group', field: 'forecasting', width: 250, sortable: true, filter: true },
    { headerName: 'Cpg', field: 'cpg', width: 200, sortable: true, filter: true },
    { headerName: 'Plant', field: 'plant', width: 200, sortable: true, filter: true },
    {
      headerName: 'User', field: 'btn', width: 200,
      cellRenderer: function (params) {
        return '<p>admin@gmail.com</p>'
      }
    }
  ];

  rowData: any;

  rowData1: any;


  rowData2: any;

  public allusers: any = [];


  public allComments;
  public username;

  public datafetch1;

  public block12 = false;

  public password;
  public role = "Admin";


  public block;

  public final_role;

  public allCommentshtml;
  public comments_table = false;
  public up_table = false;
  public last_apo_display = false;
  public last_data_display = false;
  public info_page = false;
  public prevactuals;
  public plan;
  public horizon = false;
  ngOnInit() {

    //document.body.style.zoom = "75%";

    this.final_role = sessionStorage.getItem("role");

    console.log("TYTMANANANAAN" + this.role);

    if (this.final_role === 'Admin' || this.final_role == "Admin") {
      this.block = true;
    }
    else {
      this.block = false;
    }




    this.skuService.fetchHorizon().subscribe((response: any) => {

      this.prevactuals = response.horizon.toString().substr(0, 4) + "-W" + response.horizon.toString().substr(4, 6);


      this.plan = response.plan.toString().substr(0, 4) + "-W" + response.plan.toString().substr(4, 6);
    });



    this.skuService.getCommnents().subscribe((res: any) => {

      var ghj = [];


      for (const yh in this.allComments) {
        console.log("1111", yh);
      }

      // for (const yh of this.allComments)
      // {
      //   ghj.push({
      //     week:yh.name.split('|')[1],
      //     comment:yh.name.split('|')[0],
      //     forecasting:yh.name.split('|')[2],
      //     cpg:yh.name.split('|')[3],
      //     plant:yh.name.split('|')[4],

      //   });
      // }

      console.log("urfuer", this.rowData1);


      this.allComments = res.map((item) => {
        item.isSelected = false;
        item.isFiltered = false;
        return item;
      });

      for (const g of this.allComments) {
        console.log("dsfdfsfsdf------" + JSON.stringify(g));

        ghj.push({
          week: g.name.split('|')[1],
          comment: g.name.split('|')[0],
          forecasting: g.name.split('|')[2],
          cpg: g.name.split('|')[3],
          plant: g.name.split('|')[4],

        });
      }


      this.rowData1 = ghj;
      console.log("sjkhfgksfgrg234---" + JSON.stringify(this.allComments));

    }, (error) => {
      // this.allComments = res.map((item) => {
      //   item.isSelected = false;
      //   item.isFiltered=false;
      //   return item;
      // });
      // console.log("fgfgfgfg-----"+this.allComments);
    });

    this.skuService.getlogs().subscribe((res: any) => {
      this.allLogs = res;
      this.rowData = res;

      console.log("sjkhfgksfgrg---" + JSON.stringify(this.allLogs));

    });



    this.skuService.fetchuser().subscribe((res: any) => {
      this.allusers = res;
      this.rowData2 = res;

      console.log("sjkhfgksfgrg---" + JSON.stringify(this.allLogs));

    });


  }

  public deleteuser(username) {
    this.skuService.deleteuser(username).subscribe((res: any) => {
      window.location.reload();
    });
  }

  onCellClickedBro(params) {
    console.log("oncellclicked");
    console.log(params);
    if (params.colDef.field == "deleteit") {
      if (confirm("Are you sure you want to delete this user?")) {
        this.deleteuser(params.data.username);
      }
    }
  }

  public adduser() {

    for (const abc of this.allusers) {
      if (this.username == abc.username) {
        window.alert("User already exists, please try a different username");
        return;
      }
    }

    var a = {
      username: this.username,
      password: this.password,
      role: this.role
    }

    console.log("dsfs--" + JSON.stringify(a));


    this.skuService.adduser(a).subscribe((res: any) => {



      // this.allComments = res.map((item) => {
      //   item.isSelected = false;
      //   item.isFiltered=false;
      //   return item;
      // });

      // for (const g of this.allComments) {
      //   this.allCommentshtml.push(g.name);
      // }


      console.log("sjkhfgksfgrg234---" + JSON.stringify(res));

      window.alert("Successfully added");

      this.skuService.fetchuser().subscribe((res: any) => {
        this.allusers = res;

        console.log("sjkhfgksfgrg---" + JSON.stringify(this.allLogs));

      });

    }, (error) => {
      // this.allComments = res.map((item) => {
      //   item.isSelected = false;
      //   item.isFiltered=false;
      //   return item;
      // });
      // console.log("fgfgfgfg-----"+this.allComments);

      //console.log("sjkhfgksfgrg234---"+JSON.stringify(res));

      window.alert("Successfully added");

      this.skuService.fetchuser().subscribe((res: any) => {
        this.allusers = res;

        console.log("sjkhfgksfgrg---" + JSON.stringify(this.allLogs));

      });


    });



  }

  public download1() {
    this.skuService.download1('{}').subscribe((res: any) => {

    });

  }

  public download() {
    this.skuService.download('{}').subscribe((res: any) => {

      console.log("CHECKK---" + JSON.stringify(res));
      let data, filename, link;
      let csv = '';
      const columns = ['APO Product', 'APO Location', 'Customer Planning Group', 'Company Code', 'Technical Period', 'Machine Learning', 'Forecast Value Add', 'Final Forecast', 'UOM'];

      columns.push(" ");
      // //columns.push(JSON.stringify)


      // csv += JSON.stringify(this.skus);
      // csv +='\n';
      csv += columns.join(',');
      csv += '\n';


      for (const point of res.row) {
        const first = "ML";


        const row = [
          point.id,
          point.plant,
          point.cpg,
          'G001',
          point.calenderYearWeek,
          point.ml,
          point.fva,
          point.final_Forecast,
          "HL"
        ];
        csv += row.join(',');
        csv += '\n';



      }





      // for(const point of res.row1)
      // {    
      //     const first="ML";


      //     const row = [
      //       point.id,
      //       point.plant,
      //       point.cpg,
      //       'G001',
      //       point.calenderYearWeek,
      //       point.ml,
      //       0,
      //       point.ml,
      //       "HL"
      //     ];
      //     csv += row.join(',');
      //     csv += '\n';



      //   }
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

      filename = 'chart-data.csv';

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

    });
  }


  public done() {
    this.prevactuals;

    console.log("Harsht---" + this.prevactuals);

    var a = this.prevactuals.substr(6);
    var b = this.prevactuals.substr(0, 4);
    var c = b + a;


    var a1 = this.plan.substr(6);
    var b1 = this.plan.substr(0, 4);
    var c1 = b1 + a1;

    console.log("fdfdf--" + c);

    var y = {
      user: "admin",
      horizon: parseInt(c),
      plan: parseInt(c1)
    };

    console.log("TYUI--" + JSON.stringify(y));

    this.skuService.saveHorizon(y).subscribe((res: any) => {
      console.log("Done --");
      window.alert("Updated horizon");
    });


  }


  public datefield() {
    if (this.horizon == false) {
      this.last_apo_display = false;
      this.last_data_display = false;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = true;
      this.info_page = false;
    }
    else {
      this.horizon = false;
    }
  }

  public logs1() {
    if (this.up_table == false) {
      this.horizon = false;
      this.block12 = false;
      this.up_table = true;
      this.comments_table = false;
      this.last_data_display = false;
      this.last_apo_display = false;
      this.info_page = false;
    }
    else {
      this.up_table = false;
    }

  }

  public apo_display() {
    if (this.last_apo_display == false) {
      this.last_apo_display = true;
      this.last_data_display = false;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = false;
      this.info_page = false;
    }
    else {
      this.last_apo_display = false;
    }
  }

  public data_display() {
    if (this.last_data_display == false) {
      this.last_apo_display = false;
      this.last_data_display = true;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = false;
      this.info_page = false;
    }
    else {
      this.last_data_display = false;
    }
  }

  public comments1() {

    if (this.comments_table == false) {
      this.last_apo_display = false;
      this.last_data_display = false;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = true;
      this.horizon = false;
      this.info_page = false;
    }
    else {
      this.comments_table = false;
    }

  }

  public openuser() {

    if (this.block12 == false) {
      this.last_apo_display = false;
      this.last_data_display = false;
      this.block12 = true;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = false;
      this.info_page = false;
    }
    else {
      this.block12 = false;
    }

  }

  public infopage() {

    if (this.info_page == false) {
      this.last_apo_display = false;
      this.last_data_display = false;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = false;
      this.info_page = true;
    }
    else {
      this.info_page = false;
    }

  }

}
