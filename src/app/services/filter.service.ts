import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private apiGatewayUrl: string = environment.apiGatewayUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public saveFilter(data: any) {
    console.log(data);
    return this.http.post('http://34.244.0.110:5450/v1/saveFilter', data);
  }

  
  public getFilters(data: any) {
    return this.http.post('http://34.244.0.110:5450/v1/fetchFilter', data);
  }
}
