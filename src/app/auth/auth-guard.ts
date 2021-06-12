import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute,   } from '@angular/router';
import { Auth } from 'app/auth/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(protected router: Router, protected authService: Auth) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLoggedIn()) return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl : state.url}});
    return false;
  }
}

