import { AuthHttp, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { ProductService } from './services/product.service';
import { MockBackend } from '@angular/http/testing';
import { fakeBackendProvider } from './helpers/fake-backend';
import { Auth } from './auth/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminAuthGuard } from './auth/admin-auth-guard.';
import { AuthGuard } from './auth/auth-guard';


export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', component: HomeComponent },
  { path: 'admin/products', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'no-access', component: NoAccessComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    NotFoundComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService,

    Auth,
    AuthGuard,
    AdminAuthGuard,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },

    // Used just for a mock back-end.
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
