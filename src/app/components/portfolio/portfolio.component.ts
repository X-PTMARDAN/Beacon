import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SKUService} from '../../services/sku.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private skuService: SKUService,
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

  public events: any = [];

  public pipo: any =[];


  public drop =[];

  public phase =false;

  public phase_second =false;

  public phase_third =false;


  public fromsku;
  public tosku;
  public logic;
  public startweek;

public selectedPlants=[];


  public materialid;
  public skuname;
  public fgid;
  public fgname;



  public fgname_column;
  public material_column;
  public fgid_column;
  public min_column;
  public max_column;



public table=false;
  //table
  ngOnInit() {
    let win = (window as any);
    console.log('dfdf->' + win.location.search);
    // win.location.search = '/?loaded';
    // if (win.location.search !== '?%2F=') {

    //   if(win.location.search=='?a')
    //   {
    //     win.location.search = '/?a';
    //   }
    //   else if(win.location.search=='?b')
    //   {
    //     win.location.search = '/?b';
    //   }
    //   else{
    //     win.location.search = '/';
    //   }
      
    //   //win.location.reload();
    // }
    //   setTimeout(function() {
    //     let win = (window as any);
    //   console.log("dfdf->"+win.location.search);
    //   if(win.location.search !== '?%2F=' ) {
    //       win.location.search = '/?loaded';
    //       //win.location.reload();
    //   }
    // }, 8000);




         this.skuService.getPIPO().subscribe((response: any) => {    
              this.pipo=response;
              for(const abc of this.pipo)
              {
                this.drop.push(abc.sku);
              }
              console.log("Dfdfdfd---"+JSON.stringify(this.drop));
          });
  }


  public abc()
  {
    this.table=true;
    this.phase=false;
  }

  

  public show_phase()
  {

    console.log("Dfdfd");
    if(this.phase_second==false && this.phase_third==false)
    {
      this.phase_second=true;
      this.phase_third=false;
    }
    else if(this.phase_second==true && this.phase_third==false)
    {
      this.phase_second=true;
      this.phase_third=true;
    }

    
  }



  public add_sku()
  {

console.log("Check ---"+this.skuname);

this.pipo.push({
  material:this.materialid,
  minimum:201940,
  sku:this.skuname,
  fgid:this.fgid,
  forecastinggroup:this.fgname
});


var a={
  material:this.materialid,
  minimum:201940,
  sku:this.skuname,
  fgid:this.fgid,
  forecastinggroup:this.fgname
};
this.drop.push(this.skuname);

this.skuService.savePIPO(a).subscribe((response: any) => {  
  
  

});

  //  materialid;
  //  skuname;
  //  fgid;
  //  fgname;
  }
public apply()
{
  
  
console.log("Dfsfgfsg---"+JSON.stringify(this.fromsku));

console.log("Dfsfgfsg1---"+JSON.stringify(this.tosku));
console.log("Dfsfgfsg2---"+JSON.stringify(this.logic));
console.log("Dfsfgfsg3---"+JSON.stringify(this.startweek));
console.log("Dfsfgfsg3---"+JSON.stringify(this.startweek.substr(0,4)));

var date=parseInt(this.startweek.substr(0,4)+this.startweek.substr(6));
console.log("34354ythrgbfd---"+date);

var data={
  sku_from:this.fromsku,
  sku_to:this.tosku,
  reason:this.logic,
  week:date
}

  this.skuService.savePIPOsku(data).subscribe((response: any) => {  
    this.fromsku='';
    this.tosku='';
    this.logic=''
    this.startweek='';
    console.log("DFdf---");
    window.alert("Done!");
  
  });

  this.fromsku='';
  this.tosku='';
  this.logic=''
  this.startweek='';
}

  public abc_phase()
  {
    this.table=false;
    this.phase=true;
  }

  ngOnDestroy(): void {
  }
}
