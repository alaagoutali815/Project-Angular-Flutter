import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ToggleComponent } from './toggle/toggle.component';
import { RoutesComponent } from './routes/routes.component';
import { ChartsComponent } from './routes/charts/charts.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { PasswordComponent } from './routes/password/password.component';





@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    NavbarComponent,
    ToggleComponent,
    RoutesComponent,
    ChartsComponent,
    LoginComponent,
    RegisterComponent,
    PasswordComponent,
 
 
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
