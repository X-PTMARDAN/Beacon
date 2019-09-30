import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private apiGatewayUrl: string = environment.apiGatewayUrl;

  constructor(private http: HttpClient) {
  }

  public saveView(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}saveView`, data);
  }

  public getViews() {
    return this.http.post(`${this.apiGatewayUrl}fetchView`,{});
  }
}
