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

  public pipoMapping: any =[];


  public option='sku';

  public drop =[];

  public phase =false;

  public phase_second =false;

  public phase_third =false;

  public newsku=true;

public pipo_map=false;
public sku_map=true;

  public fromsku;
  public tosku;

  public mappedFG;
  public logic;
  public startweek;

public selectedPlants=[];


  public materialid;
  public skuname;
  public fgid;
  public fgname;


public mappingdrop;
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
                this.drop.push(abc.material);
              }
              console.log("Dfdfdfd---"+JSON.stringify(this.drop));
          });


          this.skuService.getPIPOMapping().subscribe((response: any) => {  
            this.pipoMapping=response;
          });



          this.skuService.getfgid().subscribe((response: any) => {  
            this.mappingdrop=response;
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


  public test(feature)
  {
      if(feature == "sku")
      {
        this.pipo_map=false;
        this.sku_map=true;
        // document.getElementById('pipo_bar').style.background='#17b169';
    
        // document.getElementById('sku_bar').style.background='#f4f5f9';
      }
      else
      {
        this.pipo_map=true;
        this.sku_map=false;
      }
  }


  public changelogic(feature)
  {
    if(feature=='delist')
    {
      this.newsku=false;
    }
    else{
      this.newsku=true;
    }
  }


  public pipo_click()
  {
    this.pipo_map=true;
    this.sku_map=false;
    document.getElementById('pipo_bar').style.background='#17b169';

    document.getElementById('sku_bar').style.background='#f4f5f9';
  }


  public sku_click()
  {

    this.pipo_map=false;
    this.sku_map=true;

    document.getElementById('sku_bar').style.background='#17b169';

    document.getElementById('pipo_bar').style.background='#f4f5f9';
  }


  public map_sku()
  {
    this.materialid;
    this.skuname;
    this.mappedFG;


    var data={
      material: this.materialid,
      fg:this.mappedFG
    };

    this.skuService.mapFG(data).subscribe((response: any) => {  
      //
      window.alert("Mapped");


      this.skuService.getPIPO().subscribe((response: any) => {    
        this.pipo=response;
        for(const abc of this.pipo)
        {
          this.drop.push(abc.material);
        }
        console.log("Dfdfdfd---"+JSON.stringify(this.drop));
    });


    this.skuService.getPIPOMapping().subscribe((response: any) => {  
      this.pipoMapping=response;
    });


    });


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



  public edit(num: number)
  {
      var a=this.pipo[num];
      console.log("SDFsfs---"+JSON.stringify(a));

      this.skuname=a.material;
      this.materialid=a.sku;
  }
public apply()
{
  
  
console.log("Dfsfgfsg---"+JSON.stringify(this.fromsku));

console.log("Dfsfgfsg1---"+JSON.stringify(this.tosku));
console.log("Dfsfgfsg2---"+JSON.stringify(this.logic));
console.log("Dfsfgfsg3---"+JSON.stringify(this.startweek));
console.log("Dfsfgfsg3---"+JSON.stringify(this.startweek.substr(0,4)));
var state;
var date=parseInt(this.startweek.substr(0,4)+this.startweek.substr(6));
console.log("34354ythrgbfd---"+date);
if(this.logic=='delist')
{
   state=0;
}
else {
  state =1;
}
var data={
  fromid:this.fromsku,
  toid:this.tosku,
  state:state,
  fromweek:date
}

console.log("CHEK000--"+JSON.stringify(data));





this.skuService.savePIPOsku(data).subscribe((res: any) => {
  //this.editCommentModalBtnCancel.nativeElement.click();

}, (error) => {

  
  console.log("Check--------");
  this.skuService.getPIPO().subscribe((response1: any) => {    
    this.pipo=response1;
    for(const abc of this.pipo)
    {
      this.drop.push(abc.material);
    }
    console.log("Dfdfdfd---"+JSON.stringify(this.drop));
  });


this.skuService.getPIPOMapping().subscribe((response2: any) => {  
  this.pipoMapping=response2;
  this.fromsku='';
  this.tosku='';
  this.logic=''
  this.startweek='';
  console.log("DFdf---");
  window.alert("Done!");
});


 // this.editCommentModalBtnCancel.nativeElement.click();

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
