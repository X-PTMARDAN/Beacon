import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import { Router } from '@angular/router';
import {SKUService} from '../../services/sku.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  constructor(
    private sidebarService: SidebarService,
    private skuService: SKUService,
    private router: Router
  ) {
  }

  public num=45;
  
  ngOnInit() {


    window.alert(window.location.hostname);
    
    if(window.location.href==window.location.hostname+'/portfolio')
    {
      document.getElementById("plan").style.background='#5A5F66';
      document.getElementById("portfolio").style.background='#797F87';
      document.getElementById("snop").style.background='#5A5F66';
      document.getElementById("setting").style.background='#5A5F66';
      document.getElementById("npd").style.background='#5A5F66';
      document.getElementById("planscene").style.background='#5A5F66';
    }
    else if(window.location.href==window.location.hostname+'/comingsoon?b=')
    {
      document.getElementById("npd").style.background='#797F87';
      document.getElementById("portfolio").style.background='#5A5F66';
      document.getElementById("plan").style.background='#5A5F66';
      document.getElementById("setting").style.background='#5A5F66';
      document.getElementById("snop").style.background='#5A5F66';
      document.getElementById("planscene").style.background='#5A5F66';
    }

    else if(window.location.href=='http://france-aurora.azurewebsites.net/comingsoon?bcd=')
    {
      document.getElementById("npd").style.background='#5A5F66';
      document.getElementById("portfolio").style.background='#5A5F66';
      document.getElementById("plan").style.background='#5A5F66';
      document.getElementById("setting").style.background='#5A5F66';
      document.getElementById("snop").style.background='#5A5F66';
      document.getElementById("planscene").style.background='#797F87';
    }
    else if(window.location.href=='http://france-aurora.azurewebsites.net/comingsoon?a=')
    {
      document.getElementById("snop").style.background='#797F87';
      document.getElementById("portfolio").style.background='#5A5F66';
      document.getElementById("plan").style.background='#5A5F66';
      document.getElementById("setting").style.background='#5A5F66';
      document.getElementById("npd").style.background='#5A5F66';
      document.getElementById("planscene").style.background='#5A5F66';
    }
    else if(window.location.href=='http://france-aurora.azurewebsites.net/setting')
    {
      document.getElementById("snop").style.background='#5A5F66';
      document.getElementById("portfolio").style.background='#5A5F66';
      document.getElementById("plan").style.background='#5A5F66';

      document.getElementById("setting").style.background='#797F87';
      document.getElementById("planscene").style.background='#5A5F66';

      document.getElementById("npd").style.background='#5A5F66';
    }


    



    else{
      document.getElementById("portfolio").style.background='#5A5F66';
      document.getElementById("plan").style.background='#797F87';
      document.getElementById("snop").style.background='#5A5F66';
      document.getElementById("setting").style.background='#5A5F66';
      document.getElementById("npd").style.background='#5A5F66';
      document.getElementById("planscene").style.background='#5A5F66';
    }
  
    

  }



  public onClick(name: string) {
    console.log("Harshit-->"+name);
    console.log("YHYHY-->"+window.location.href);
    if(window.location.href=="http://france-aurora.azurewebsites.net/portfolio?%2F=")
    {
      window.location.href="http://france-aurora.azurewebsites.net/dashboard";
    }
    this.sidebarService.emit(name);
  }



  public download()
  {
    this.skuService.download('{}').subscribe((res: any) => {
      let data, filename, link;
      let csv = '';
      const columns = ['CalendarYearWeek', 'CPG', 'PLANT', 'FVA', 'SKU', 'Final Forecast'];
    
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
            point.calenderYearWeek,
            point.cpg,
            point.plant,
            point.ml,
            point.fva,
            point.sku,
            point.final_Forecast
          ];
          csv += row.join(',');
          csv += '\n';
        
    
        
        }
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

  public goToPage(pageName:string){


    
    console.log("SENDII--"+pageName +"--"+this.num);
    if(pageName=='a')
    {
      this.num=1;
      window.location.href="http://france-aurora.azurewebsites.net/comingsoon?a"
     // this.router.navigate([`/portfolio`]);
    }
    else if(pageName=='b')
    {
      this.num=2;
      window.location.href="http://france-aurora.azurewebsites.net/comingsoon?b"
    }

    else if(pageName=='bcd')
    {
      this.num=56;
      window.location.href="http://france-aurora.azurewebsites.net/comingsoon?bcd"
    }

    else if(pageName=='ab')
    {
      this.num=2;
      window.location.href="http://france-aurora.azurewebsites.net/portfolio"
    }
    else if(pageName=='c')
    {
      this.num=3;
      window.location.href="http://france-aurora.azurewebsites.net/dashboard"
    }
    else if(pageName=='d')
    {
      this.num=4;
      this.onClick('revisit-plan')
    }

    else if(pageName=='e')
    {
      this.num=5;
      window.location.href="http://france-aurora.azurewebsites.net/setting"
    }


    else if(pageName=='f')
    {
      this.num=5;
      sessionStorage.removeItem('username');
      window.location.href="http://france-aurora.azurewebsites.net/login"
    }

    
    
  }
}
