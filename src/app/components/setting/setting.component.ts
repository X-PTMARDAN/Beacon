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


  public allComments;

  public allCommentshtml;
  public comments_table=false;

  public up_table=false;

  ngOnInit() {



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


  public logs1()
  {
      this.up_table=true;
  }


  public comments1()
  {
      this.comments_table=true;
  }

}
