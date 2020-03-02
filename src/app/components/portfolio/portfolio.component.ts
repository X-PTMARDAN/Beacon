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

  @ViewChild('addsku', {static: false}) addsku: ElementRef;

  @ViewChild('gantchart_open', {static: false}) gantchart_open: ElementRef;

  @ViewChild('saveFilterModal', {static: false}) saveFilterModal: ElementRef;



  @ViewChild('saveFilterModal12', {static: false}) saveFilterModal12: ElementRef;


  @ViewChild('myModal_gant', {static: false}) myModal_gant: ElementRef;


  

  @ViewChild('mapsku', {static: false}) mapsku: ElementRef;

  public events: any = [];

  public date;







  public fromsku_transistion_apply;

public tosku_transistion_apply;
  
public logic_transistion_apply;
  
  
public startweek_transistion_apply;
  
  
public forecasting_fgid;













  public material_len=0;

  public fg_len=0;

public maxweek;
  public newsku=false;

  public abc12='fshjg';

  public pipo: any =[];

  public materialidnumber='1990';

  public materialidqwe;
  public skunamenew;

  public texthide=false;

  public pipoMapping: any =[];

public drop2;
  public option='sku';

  public drop =[];

  public phase =false;

  public phase_second =false;

  public phase_third =false;

  public newsku12=false;

public pipo_map=false;
public sku_map=true;

  public fromsku='select';
  public tosku='select';

  public mappedFG;
  public logic='select';


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
              console.log("Checking-----"+JSON.stringify(this.pipo));
              for(const abc of this.pipo)
              {
                var g=abc.material + "-" + abc.fgid;
                console.log("121---"+g);
                if(abc.prime=="PRIMARY")
                {
                  this.drop.push(g);
                }
                else{
                  console.log("DFdfdfdf-");
                }
                
              }

              this.material_len=this.drop.length;
              this.material_len=932;
              console.log("Dfdfdfd---"+JSON.stringify(response));
          });


          this.skuService.getPIPOMapping().subscribe((response: any) => {  
            this.pipoMapping=response;
          });




          this.skuService.getmaxweek().subscribe((response: any) => {  
            this.maxweek=response;
          });



          this.skuService.getfgid().subscribe((response: any) => { 
           
            this.mappingdrop=response;
            this.fg_len=this.mappingdrop.length; 
          });



          
  }


  public test1()
  {
    this.materialidnumber='';

    this.skunamenew='';
  }
public addingSKU()
{
  console.log("gfhgfh12---"+this.materialidnumber);

  if(this.materialidnumber===null ||  this.materialidnumber=='')
  {
    window.alert("Please enter Material ID");
    return;
  }
  if(this.skunamenew===null || this.skunamenew=='' )
  {
    window.alert("Please enter SKU Name");
    return;
  }
  this.pipo.push({
    material:this.materialidnumber,
    sku:this.skunamenew,
 
  });


  var a={
    material:this.materialidnumber,
    sku:this.skunamenew,
      
  };

console.log("Fsfsfss----"+JSON.stringify(this.pipo));

this.newsku12=true;
document.getElementById('newsku123').style.display='block';

this.skuService.addSKU_pipo_final(a).subscribe((res: any) => {
    

  console.log("RESPONSE");
  //  this.drop2=res;
}, (error) => {
 

});

this.addsku.nativeElement.click();

  //this.texthide=true;
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


  public populate_drop2()
  {
  //  this.skuService.fetch_material_list_pipo(drop1)



// console.log("Checkng---"+this.fromsku);

// var a={
//   mat123:JSON.stringify(this.fromsku.toString())
// };


console.log("Dfsfgfsg---"+JSON.stringify(this.fromsku));
var sku=this.fromsku.split('-');
var a={
  fromid:sku[0],
}

console.log("CHEK000--"+JSON.stringify(a));



console.log("dsfheg---"+JSON.stringify(a));
  this.skuService.fetch_material_list_pipo(a).subscribe((res: any) => {
    

    console.log("RESPONSE");
      this.drop2=res;
  }, (error) => {
   

  });



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
      material: this.skuname,
      fg:this.mappedFG
    };





    this.skuService.mapFG(data).subscribe((res: any) => {
      //this.editCommentModalBtnCancel.nativeElement.click();

      window.alert("Mapped");


      this.skuService.getPIPO().subscribe((response: any) => {    
        this.pipo=response;
        for(const abc of this.pipo)
        {

          var g=abc.material + "-" + abc.fgid;
          console.log("121---"+g);
          this.drop.push(g);
        }
        console.log("Dfdfdfd---"+JSON.stringify(this.drop));
    });

    this.skuService.getPIPOMapping().subscribe((response: any) => {  
      this.pipoMapping=response;
    });


    
    }, (error) => {
    
      window.alert("Mapped");


      this.skuService.getPIPO().subscribe((response: any) => {    
        this.pipo=response;
        for(const abc of this.pipo)
        {
          var g=abc.material + "-" + abc.fgid;
          console.log("121---"+g);
          this.drop.push(g);
        }
        console.log("Dfdfdfd---"+JSON.stringify(this.drop));
    });

    this.skuService.getPIPOMapping().subscribe((response: any) => {  
      this.pipoMapping=response;
    });
    
     // this.editCommentModalBtnCancel.nativeElement.click();
    
    });

    


    // this.skuService.mapFG(data).subscribe((response: any) => {  
    //   //
      


    this.mapsku.nativeElement.click();


    // });


  }



  // NOT TO BE USED
  public add_sku()
  {

console.log("Check ---"+this.skuname);

this.pipo.push({
  material:this.materialid,
  //minimum:201940,
  sku:this.skuname,
});


var a={
  material:this.materialid,
  //minimum:201940,
  sku:this.skuname,
};
//this.drop.push(this.skuname);

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

      document.getElementById('newsku123').style.display='none';
  }


  public gantchart1(num: number)
  {


    console.log("Fdfd--"+JSON.stringify(this.pipoMapping[num]));
    this.fromsku_transistion_apply=this.pipoMapping[num].fromid;

    this.tosku_transistion_apply=this.pipoMapping[num].toid;

    console.log("12345678----"+JSON.stringify(this.pipoMapping[num]));

    this.forecasting_fgid=this.pipoMapping[num].fgid;

    this.startweek_transistion_apply=this.pipoMapping[num].fromweek;



   

    console.log("DFdfdf---"+this.date);

    this.logic=this.pipoMapping[num].state;


      this.saveFilterModal.nativeElement.click();
    
    

  }
public apply()
{

  if(this.fromsku=='' ||  this.fromsku===null || state===null || state=='' || this.date===null || this.date=='' || this.fromsku=='select' )
{
  window.alert("Please select all the values");
  return;
}






console.log("Dfsfgfsg---"+JSON.stringify(this.fromsku));

console.log("Dfsfgfsg1---"+JSON.stringify(this.tosku));
console.log("Dfsfgfsg2---"+JSON.stringify(this.logic));
console.log("Dfsfgfsg3---"+JSON.stringify(this.startweek));
console.log("Dfsfgfsg3---"+JSON.stringify(this.startweek.substr(0,4)));




this.fromsku_transistion_apply=this.fromsku.split('-')[0];

this.tosku_transistion_apply=this.tosku;

this.logic_transistion_apply=this.logic;


this.startweek_transistion_apply=this.startweek;


this.forecasting_fgid=this.fromsku.split('-')[1];

console.log("3434343--"+this.tosku_transistion_apply);

var state;
 this.date=parseInt(this.startweek.substr(0,4)+this.startweek.substr(6));

//this.final=201952;

console.log("34354ythrgbfd---"+this.date);
if(this.logic=='delist')
{
   state="Delist";
   this.saveFilterModal12.nativeElement.click();
}
else {
  state ="Transistion";
  this.saveFilterModal.nativeElement.click();
}
var data={
  fromid:this.fromsku.split("-")[0],
  toid:this.tosku,
  state:state,
  fromweek:this.date,
  fgid:this.fromsku.split("-")[1]
}





console.log("CHEK000--"+JSON.stringify(data));

//this.myModal_gant.nativeElement.click();



this.skuService.savePIPOsku(data).subscribe((res: any) => {
  //this.editCommentModalBtnCancel.nativeElement.click();

 
  this.skuService.getPIPO().subscribe((response1: any) => {    
    this.pipo=response1;
    console.log("Check--------"+JSON.stringify(response1));
    for(const abc of this.pipo)
    {
      var g=abc.material + "-" + abc.fgid;
      //console.log("121---"+JSON.stringify(abc));

      console.log("Fdfdfdfdfd---"+abc.prime);
      if(abc.prime==='PRIMARY')
      {
        this.drop.push(g);
      }
      else{
        console.log("0909we3434343");
      }
    
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

}, (error) => {

  
  console.log("Check--------");
  this.skuService.getPIPO().subscribe((response1: any) => {    
    this.pipo=response1;
    for(const abc of this.pipo)
    {
      var g=abc.material + "-" + abc.fgid;
      console.log("121---"+g);
      this.drop.push(g);
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

  this.fromsku;
  this.tosku;
  this.logic;
  this.startweek;



 


}

  public abc_phase()
  {
    this.table=false;
    this.phase=true;
  }

  ngOnDestroy(): void {
  }
}
