import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjetsComponent } from './projets/projets.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'department',component:DepartmentComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'projets',component:ProjetsComponent},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
