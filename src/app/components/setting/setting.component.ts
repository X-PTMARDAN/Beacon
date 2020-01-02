import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SKUService} from '../../services/sku.service';
import {Router} from '@angular/router';




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


  public allusers: any = [];


  public allComments;
  public username;

  public block12=false;

  public password;
  public role="Admin";


  public block;

  public final_role;

  public allCommentshtml;
  public comments_table=false;

  public up_table=false;


  public prevactuals;


  public horizon=false;
  ngOnInit() {


    this.final_role=sessionStorage.getItem("role");

    console.log("TYTMANANANAAN"+this.role);

    if(this.final_role==='Admin' || this.final_role=="Admin")
    {
        this.block=true;
    }
    else{
      this.block=false;
    }


    this.skuService.getCommnents().subscribe((res: any) => {



      this.allComments = res.map((item) => {
        item.isSelected = false;
        item.isFiltered=false;
        return item;
      });

      // for (const g of this.allComments) {
      //   this.allCommentshtml.push(g.name);
      // }


 console.log("sjkhfgksfgrg234---"+JSON.stringify(this.allComments));

    }, (error) => {
      // this.allComments = res.map((item) => {
      //   item.isSelected = false;
      //   item.isFiltered=false;
      //   return item;
      // });
      // console.log("fgfgfgfg-----"+this.allComments);
    });

    this.skuService.getlogs().subscribe((res: any) => {
      this.allLogs=res;

      console.log("sjkhfgksfgrg---"+JSON.stringify(this.allLogs));
  
    });



    this.skuService.fetchuser().subscribe((res: any) => {
      this.allusers=res;

      console.log("sjkhfgksfgrg---"+JSON.stringify(this.allLogs));
  
    });


  }

public adduser()
{

for(const abc of this.allusers)
{
  if(this.username == abc.username)
  {
      window.alert("Please enter a different username");
      return;
  }
}
 
    var a={
      username:this.username,
      password:this.password,
      role:this.role
    }

    console.log("dsfs--"+JSON.stringify(a));

 
    this.skuService.adduser(a).subscribe((res: any) => {



      // this.allComments = res.map((item) => {
      //   item.isSelected = false;
      //   item.isFiltered=false;
      //   return item;
      // });

      // for (const g of this.allComments) {
      //   this.allCommentshtml.push(g.name);
      // }


 console.log("sjkhfgksfgrg234---"+JSON.stringify(res));

 window.alert("Successfully added");

 this.skuService.fetchuser().subscribe((res: any) => {
  this.allusers=res;

  console.log("sjkhfgksfgrg---"+JSON.stringify(this.allLogs));

});

    }, (error) => {
      // this.allComments = res.map((item) => {
      //   item.isSelected = false;
      //   item.isFiltered=false;
      //   return item;
      // });
      // console.log("fgfgfgfg-----"+this.allComments);

      //console.log("sjkhfgksfgrg234---"+JSON.stringify(res));

      window.alert("Successfully added"+JSON.stringify(error));
     
      this.skuService.fetchuser().subscribe((res: any) => {
       this.allusers=res;
     
       console.log("sjkhfgksfgrg---"+JSON.stringify(this.allLogs));
     
     });


    });



}

  public download()
  {
    this.skuService.download('{}').subscribe((res: any) => {

      console.log("CHECKK---"+JSON.stringify(res));
      let data, filename, link;
      let csv = '';
      const columns = ['APO Product', 'APO Location', 'Customer Planning Group', 'Company Code', 'Technical Period', 'Machine Learning','Forecast Value Add','Final Forecast','UOM'];
    
      columns.push(" ");
      // //columns.push(JSON.stringify)
  
     
      // csv += JSON.stringify(this.skus);
      // csv +='\n';
      csv += columns.join(',');
      csv += '\n';

  
      for(const point of res.row)
      {    
          const first="ML";
    
    
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


  public done()
  {
    this.prevactuals;

    console.log("Harsht---"+this.prevactuals);

    var a=this.prevactuals.substr(6);
    var b=this.prevactuals.substr(0,4);
    var c=b+a;

    console.log("fdfdf--"+c);

    var y={
      user:"admin",
      horizon:parseInt(c)
    };

    console.log("TYUI--"+JSON.stringify(y));

    this.skuService.saveHorizon(y).subscribe((res: any) => {
            console.log("Done --");
    });


  }


  public datefield()
  {
    this.horizon=true;
  }

  public logs1()
  {
    if(this.up_table==false)
    {
      this.up_table=true;
    }
    else{
      this.up_table=false;
    }
   
  }


  public comments1()
  {

    if(this.comments_table==false)
    {
      this.comments_table=true;
    }
    else{
      this.comments_table=false;
    }
      
  }




  public openuser()
  {

    if(this.block12==false)
    {
      this.block12=true;
    }
    else{
      this.block12=false;
    }
      
  }

}
