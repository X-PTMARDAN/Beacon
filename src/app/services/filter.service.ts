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
    return this.http.post('https://jy6gh5jl44.execute-api.eu-west-1.amazonaws.com/Stage1', data);
  }

  public getFilters(data: any) {
    return this.http.post('https://jy6gh5jl44.execute-api.eu-west-1.amazonaws.com/Stage1', data);
  }
}
