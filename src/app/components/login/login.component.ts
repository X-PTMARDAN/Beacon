import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SKUService} from '../../services/sku.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private skuService: SKUService

  ) {
  }

  ngOnInit() {
  }

  public allusers: any = [];

  login(formValue: any) {
    console.log("hhh--"+formValue.username);
    console.log("hhh12--"+formValue.password);

   
    this.skuService.fetchuser().subscribe((res: any) => {
      
      this.allusers=res;
      
        var flag=0;
      for(const abc of this.allusers)
      {

        console.log("DFdf---"+JSON.stringify(abc));

          if(abc.username==formValue.username)
          {
              if(abc.password==formValue.password)
              {
                flag=1;
                sessionStorage.setItem('role', abc.role);
                sessionStorage.setItem('username', formValue.username);
                let update = new Date().toJSON("yyyy/MM/dd HH:mm");

                 console.log("23456--"+JSON.stringify(update));

                if(JSON.stringify(update)==null)
                {
                  update="No time recorded";
                }

                const login={
                  Username:"admin",
                  activity:"Logged In",
                  datetimestamp:JSON.stringify(update)
                }

                this.skuService.sendLog(login).subscribe((res: any) => {

                 });

                this.router.navigate(['/dashboard']);
              }
          }
      }
      if(flag==0)
      {
        window.alert("No username");
      }

    }, (error) => {
   

  


    });


   
   
  }
}
