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
    return this.http.get('https://vmxmz2s8t4.execute-api.eu-west-1.amazonaws.com/sdf');
  }

  public getCustomerPlanningGroup() {
    return this.http.get('https://faqgousuyk.execute-api.eu-west-1.amazonaws.com/New');
  }

  public getItems(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}sku`, data);
  }

  public getFilters() {
    return this.http.get(`${this.apiGatewayUrl}filters`);
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

  public getPromos() {
    return of([
      {
        name: 'Promo Uplift',
        isChecked: false
      },
      {
        name: 'Promo Plan',
        isChecked: false
      },
      {
        name: 'Shelf Discount',
        isChecked: false
      },
      {
        name: 'Promo in Brand',
        isChecked: false
      },
      {
        name: 'Promotion Type',
        isChecked: false
      },
      {
        name: 'Promo in Unit Per Pack',
        isChecked: false
      },
    ]);
    // return this.http.get('', {});
  }
}
