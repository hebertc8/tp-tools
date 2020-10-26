import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { ToolsComponent } from './components/tools/tools.component';
import { LoginComponent } from './components/login/login.component';
import { InterceptorService } from './services/interceptor.service';
import { ROUTES } from "./app.routes";
import { CookieService } from "ngx-cookie-service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'CSRF-Token',
    })
  ],
  providers: [ 
    CookieService,
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
