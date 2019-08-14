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
    return this.http.get('https://prxis6bi09.execute-api.eu-west-1.amazonaws.com/Stage1/').pipe(
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

  public getItems(data = {}) {
    // return of(['Tub 1660KRO', 'THU 1785', 'KRO TUB 1668', 'Tub 109', 'Tub 101', 'Tub 103', 'RTYT 109', 'KRO ']);
    return this.http.post(this.apiGatewayUrl + `/Stage1`, data);
  }
}
