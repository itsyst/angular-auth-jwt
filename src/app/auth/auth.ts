import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { User } from 'app/types/user';
import { Router } from '@angular/router';

@Injectable()
export class Auth {
  currentUser: User;

  constructor(private router: Router, private http: Http) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials: User) {
   return this.http.post('/api/authenticate', JSON.stringify(credentials))
    .map(response => {
      let result = response.json();

      if (result && result.token) {
        localStorage.setItem('token', result.token);

        let jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

        return true;
      }
      else return false;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }
}

