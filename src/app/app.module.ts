import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { AdminComponent } from './admin/admin.component';
import { AuthentificationComponent } from './authentification/authentification.component';




@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AdminComponent,
    AuthentificationComponent,
 
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
