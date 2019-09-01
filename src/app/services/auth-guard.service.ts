import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return of(true);
    }
    this.router.navigate(['/login']);
    return of(false);
  }
}
