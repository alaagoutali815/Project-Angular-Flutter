import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartsComponent } from './routes/charts/charts.component';
import { LoginComponent } from './routes/login/login.component';
import { PasswordComponent } from './routes/password/password.component';
import { RegisterComponent } from './routes/register/register.component';
import { ToggleComponent } from './toggle/toggle.component';

const routes: Routes = [
  /*{path: '',component: NavbarComponent},
  {path: 'static',component: ToggleComponent, pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'changepassword', component: PasswordComponent},
  //{path: 'charts', component:ChartsComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
