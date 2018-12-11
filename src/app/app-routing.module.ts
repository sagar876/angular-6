import { NgModule } from '@angular/core';
import {RouterModule, Route } from '@angular/router';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDetailsComponent } from './dashboard/employee/employee-details/employee-details.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RequestComponent } from './dashboard/request/request.component';
import { AnnouncementsComponent } from './dashboard/announcements/announcements.component';

const indexRoute : Route = {
  path: "",
  component: LoginComponent
};


const fallbackRoute : Route ={
  path: '**',
  component: ErrorComponent
};

const routes = [
  { path: 'ansatt', component: EmployeeComponent },
  {path: 'dashboard', component: DashboardComponent}, 
  {path: 'login', component: LoginComponent}, 
  {path: 'detalj', component: EmployeeDetailsComponent}, 
  {path:'home', component: HomeComponent},
  {path:'request', component: RequestComponent},  
  {path:'announcements', component: AnnouncementsComponent},  
  indexRoute,
  fallbackRoute
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) //ADDED
  ],
  exports: [RouterModule] //ADDED
})
export class AppRoutingModule { }
