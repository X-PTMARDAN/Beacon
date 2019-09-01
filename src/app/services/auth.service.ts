import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public isLoggedIn() {
    return !!sessionStorage.getItem('username');
  }
}
