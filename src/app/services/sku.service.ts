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

  public savePlan(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePlanData`, data);
  }

  public confirmPlan(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}confirmPlanData`, data);
  }
}
