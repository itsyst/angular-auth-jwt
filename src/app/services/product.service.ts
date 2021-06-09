import { Injectable } from '@angular/core';
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class ProductService {

  constructor(private authHttp: AuthHttp) {
  }

  getProducts() {
    return this.authHttp.get('/api/products')
      .map(response => response.json());
  }
}
