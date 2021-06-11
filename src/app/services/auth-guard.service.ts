import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute,   } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

constructor(protected router: Router, protected authService: AuthService) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLoggedIn()) return true;

    this.router.navigate(['/admin/products'], { queryParams: { returnUrl : state.url}});
    return false;
  }
}

