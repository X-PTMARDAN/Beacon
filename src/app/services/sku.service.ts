import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SKUService {
  private apiGatewayUrl: string = environment.apiGatewayUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public getBrands() {
    return this.http.get(`${this.apiGatewayUrl}brands`).pipe(
      map((brands: any) => {
        return brands.map((brand) => {
          return {name: brand, isChecked: false};
        });
      })
    );
  }

  public getAlcP() {
    return this.http.get(`${this.apiGatewayUrl}alcoholPercentage`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }




  public getAnimalFlag() {
    return this.http.get(`${this.apiGatewayUrl}animalFlag`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }



  public getMaterialgroup() {
    return this.http.get(`${this.apiGatewayUrl}materialgroup`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }




  public getglobalbev() {
    return this.http.get(`${this.apiGatewayUrl}globalbevcat`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }




  public getbaseunit() {
    return this.http.get(`${this.apiGatewayUrl}baseunit`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }




  public getpacktype() {
    return this.http.get(`${this.apiGatewayUrl}packtype`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }



  // public getPacktype() {
  //   return this.http.get(`${this.apiGatewayUrl}unitPerPack`).pipe(
  //     map((Unitperpack: any) => {
  //       return Unitperpack.map((Unitperpack) => {
  //         return {name: Unitperpack, isChecked: false};
  //       });
  //     })
  //   );
  // }





  public getUnitperpack() {
    return this.http.get(`${this.apiGatewayUrl}unitPerPack`).pipe(
      map((Unitperpack: any) => {
        return Unitperpack.map((Unitperpack) => {
          return {name: Unitperpack, isChecked: false};
        });
      })
    );
  }

  public getSubbrand() {
    return this.http.get(`${this.apiGatewayUrl}subBrand`).pipe(
      map((subBrand: any) => {
        return subBrand.map((subBrand) => {
          return {name: subBrand, isChecked: false};
        });
      })
    );
  }

  public getSegments() {
    return of([
      {
        name: 'Mule',
        isChecked: false
      },
      {
        name: 'Mad Bull',
        isChecked: false
      },
      {
        name: 'Jack Rabbit',
        isChecked: false
      },
      {
        name: 'Horse',
        isChecked: false
      }
    ]);
    // return this.http.get('', {});
  }

  public getPacks() {
    return of([
      {
        name: 'CAN',
        isChecked: false
      },
      {
        name: 'TIN',
        isChecked: false
      },
      {
        name: 'Bottle',
        isChecked: false
      },
    ]);
    // return this.http.get('', {});
  }

  public getPlants() {
    return this.http.get(`${this.apiGatewayUrl}plants`).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
          };
        });
      })
    );
  }



  

  public getCustomerPlanningGroup() {
    return this.http.get(`${this.apiGatewayUrl}cpg`).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
          };
        });
      })
    );
  }

  public getSkUList(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}forecastingGroup`, data).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
            isFiltered: false,
            isChecked: false,
          };
        });
      })
    );
  }




  public getSkUList1(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}changedfilterSKU`, data).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
            isFiltered: false,
            isChecked: false,
          };
        });
      })
    );
  }




  public getCPGList2(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}changedfilterSKU`, data).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
            isFiltered: false,
            isChecked: false,
          };
        });
      })
    );
  }




  public getForecastingGroup(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}forecastingGroup12`, data).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
            isFiltered: false,
            isChecked: false,
          };
        });
      })
    );
  }


  // public getForecastingGroup(data = {}) {
  //   return this.http.post(`${this.apiGatewayUrl}forecastingGroup12`, data);
  // }


  

  public getFilters() {
    return this.http.get(`${this.apiGatewayUrl}filters`).pipe(
      map((data: any) => {
        for (const filter of data.filters) {
          filter.isExpanded = false;
        }
        return data;
      })
    );
  }

  public getEvents() {
    return of([
      {
        name: 'Holidays',
        isChecked: false
      },
      {
        name: 'Major Support Event',
        isChecked: false
      },
      {
        name: 'Festival',
        isChecked: false
      },
      {
        name: 'Worldcup',
        isChecked: false
      },
      {
        name: 'Other support Events',
        isChecked: false
      },
    ]);
    // return this.http.get('', {});
  }

  public getWeathers() {
    return of([
      {
        name: 'Average Temperature',
        isChecked: false
      },
      {
        name: 'Seasonality',
        isChecked: false
      },
    ]);
    // return this.http.get('', {});
  }

  public getGraphData(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable`, data);
  }



  public getGraphData_week_uom(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_UOM`, data);
  }



  public getSales(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}sales`, data);
  }


  public defaultnull(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}prevnull`, data);
  }


  public setdefault(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}setdefault`, data);
  }


  public savePIPOsku(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePIPOsku`, data);
  }

  public getPIPOMapping(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}fetchpipoMapping`, data);
  }

  

  public getPIPO(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}pipo`, data);
  }


  public getTradetype(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}tradetype`, data);
  }




  // PORTFOLIO
  public getforecastinggroup(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}forecastinggroup`);
  }


  public getfgid(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}forecastinggroup`);
  }
//




  public sendLog(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savelog`, data);
  }


  public getGraphData_yearly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_yearly`, data);
  }



  public download(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}download`, data);
  }


  public mapFG(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}mapFG`, data);
  }


  


   public getGraphData_monthly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_monthly`, data);
  }



  public savePIPO(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePIPO`, data);
  }



  

  public deleteTemp(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}deleteTempData`, data);
  }



  public getlogs(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}logs`, data);
  }


  public getCommnents(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}allcomments`, data);
  }


  public getFeatureGraphData(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_feature_analysis`, data);
  }


  public getFeatureGraphData_monthly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_feature_analysis_monthly`, data);
  }



  


  public getCPGlist(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}cpg`, data);
  }






  

  public getCPGlist2(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}changedfilterCPG`, data);
  }



  public savePlan(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePlanData`, data);
  }

  public confirmPlan(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}confirmPlanData`, data);
  }

  public editComment(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}editcomment`, data);
  }

}
