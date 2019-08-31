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
    return this.http.post(`${this.apiGatewayUrl}saveFilter`, data);
  }

  public getFilters(data: any) {
    return this.http.post(`${this.apiGatewayUrl}fetchFilter`, data);
  }
}
