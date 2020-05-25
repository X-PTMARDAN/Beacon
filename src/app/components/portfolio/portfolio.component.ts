import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SKUService} from '../../services/sku.service';
import {Router} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';





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

  @ViewChild('AddNew', {static: false}) AddNew: ElementRef;



  @ViewChild('UpdateNew', {static: false}) UpdateNew: ElementRef;



  
  
  @ViewChild('saveFilterModal12', {static: false}) saveFilterModal12: ElementRef;


  @ViewChild('myModal_gant', {static: false}) myModal_gant: ElementRef;


  

  @ViewChild('mapsku', {static: false}) mapsku: ElementRef;

  public events: any = [];

  public date;


public loading=false;
public from_date;

public to_date;

public second_week;

public dates1=[{
  fromid:"0",
  toid:0,
  week:0,
  one:0,
  two:0
}];



  public fromsku_transistion_apply;

public tosku_transistion_apply;
  
public logic_transistion_apply;
  
  
public startweek_transistion_apply;
  
  
public forecasting_fgid;



public val_selected=0;









  public material_len=0;

  public fg_len=0;

public maxweek;
  public newsku=false;

  public od=1;




  public second_type=false;

  public first_type=true;


 public type_value=0;

  public date_table=false;


  

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

  public dates=[];

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


  public sortComments1(keyIndex: number) {
    this.pipo = this.pipo.sort((a, b) => {
      var value1;
      var value2;
      if(keyIndex==1)
      {
        value1=a.fgid;
        value2=b.fgid;
      }
      else{
        value1=a.material;
        value2=b.material;
      }
 
      console.log("Checking12121--"+value1);

      if (value1 === value2) {
        return 0;
      }

      return value1 > value2 ? 1 : -1;
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

  public second_type1()
  {

      if(this.od%2==0)
      {
        this.first_type=true;
        this.second_type=false;
        this.od=1;
        document.getElementById('harshit').style.backgroundColor='#fff';
     
        
      }
      else{

        this.first_type=false;
        this.second_type=true;
      this.od=0;
      document.getElementById('harshit').style.backgroundColor='#f1f1f1';
     
      }
  }


  public type(a)
  {
    this.val_selected=a;

    this.type_value=a;
    this.newsku=true;

    this.second_week=true;

    if(a==4)
    {
      this.second_week=false;
    }
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

    var abc={
      from:this.fromsku_transistion_apply,
      to:this.tosku_transistion_apply
    };
    this.skuService.getPIPOvalue(abc).subscribe((response2: any) => {  
      console.log("DFdf---");

      this.dates1=response2;

      this.UpdateNew.nativeElement.click();

      //window.alert("Done!");
    });

    //  this.saveFilterModal.nativeElement.click();
    
    

  }


  public apply1()
  {
    this.AddNew.nativeElement.click();


    
  }


  public from_date_table()
  {
        if(this.val_selected==4)
        {
            this.to_date="202020";
        }
        if(!(this.from_date==" " || this.from_date==" " || this.from_date==null || this.to_date==null || this.to_date==""))
        {
              this.date_table=true;
              var str = this.from_date;

              str=str.substring(0, 4);


              var str1 = this.from_date;

              str1=str1.substring(6,str1.length);

             // alert(str+"-"+str1);
              
              var str2=str+str1;

              var str3=parseInt(str2);




              var str_1 = this.to_date;

              str_1=str_1.substring(0, 4);


              var str1_1 = this.to_date;

              str1_1=str1_1.substring(6,str1_1.length);

             // alert(str_1+"-"+str1_1);
              
              var str2_1=str_1+str1_1;

              var str3_1=parseInt(str2_1);


             this.dates=[];


              if(this.val_selected==1)
              {
                        var j=0
                        for(var i=str3;i<=str3_1;i++)
                        {
                        j++;
                        var k=Math.round(100*j/(str3_1-str3+1));
                      
                            var a={
                              week:i,
                              one:100-k,
                              two:k,
                              fromid:this.fromsku.split("-")[0],
                              toid:this.tosku
                            };
                            console.log("Harshit - "+i);
                  
                           this.dates.push(a);
                        }
              }


              else if(this.val_selected==2)
              {
                        var j=0
                        for(var i=str3;i<=str3_1;i++)
                        {
                        j++;
                        var k=(str3_1-str3+1);
                        
                          var f=Math.log(j)/Math.log(k);


                            f=f*100;
                            f=Math.round(f);


                            var a={
                              week:i,
                              one:100-f,
                              two:f,
                              fromid:this.fromsku.split("-")[0],
                              toid:this.tosku
                            };
                            console.log("Harshit - "+i);
                  
                           this.dates.push(a);
                        }
              }


              else if(this.val_selected==4)
              {
                        var j=0
                        
                        j++;
                        var k=(str3_1-str3+1);
                        //var k=Math.log(str3,h);
                      
                            var a={
                              week:str3,
                              one:0,
                              two:100,
                              fromid:this.fromsku.split("-")[0],
                              toid:this.tosku
                            };
                            console.log("Harshit - "+i);
                  
                           this.dates.push(a);
                        
              }

            else if(this.val_selected<6)
            {
              for(var i=str3;i<=str3_1;i++)
              {
                
                var a={
                  week:i,
                  one:10,
                  two:90,
                  fromid:this.fromsku.split("-")[0],
                  toid:this.tosku
                };
                console.log("Harshit - "+i);
           
                this.dates.push(a);
              }
            }
            else{

              for(var i=str3;i<=str3_1;i++)
              {
                
                var a={
                  week:i,
                  one:10,
                  two:0,
                  fromid:this.fromsku.split("-")[0],
                  toid:this.tosku
                };
                console.log("Harshit - "+i);
           
                this.dates.push(a);
              }


            }

              
        }
  }

  public hello2(i)
  {
    var a=this.dates[i].one;
    this.dates[i].two=100-a;
  }
public apply()
{

 




  this.loading = true;

console.log("Dfsfgfsg---"+JSON.stringify(this.fromsku));

console.log("Dfsfgfsg1---"+JSON.stringify(this.tosku));
console.log("Dfsfgfsg2---"+JSON.stringify(this.logic));
console.log("Dfsfgfsg3---"+JSON.stringify(this.startweek));





this.fromsku_transistion_apply=this.fromsku.split('-')[0];

this.tosku_transistion_apply=this.tosku;

this.logic_transistion_apply=this.logic;


this.startweek_transistion_apply=this.startweek;


this.forecasting_fgid=this.fromsku.split('-')[1];

console.log("3434343--"+this.tosku_transistion_apply);

var state;
 this.date=parseInt(this.from_date.substr(0,4)+this.from_date.substr(6));

//this.final=201952;

console.log("34354ythrgbfd---"+this.date);

  state ="Transistion";

var data={
  fromid:this.fromsku.split("-")[0],
  toid:this.tosku,
  state:state,
  fromweek:this.date,
  fgid:this.fromsku.split("-")[1]
};





console.log("CHEK000--"+JSON.stringify(data));

//this.myModal_gant.nativeElement.click();
this.skuService.savePIPOvalue(this.dates).subscribe((response2: any) => {  
  console.log("DFdf---");


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
  
                    this.loading=false;
  
                    window.location.reload();
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
  
    window.location.reload();
    this.loading=false;
  });
  
  
   // this.editCommentModalBtnCancel.nativeElement.click();
  
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
