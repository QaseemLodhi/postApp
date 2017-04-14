import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AppConfig } from './app.config';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard, UserService, AuthenticationService, AlertService, PostService } from './service/index';
import { AlertComponent } from './directive/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AlertService,
    AuthenticationService,
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
