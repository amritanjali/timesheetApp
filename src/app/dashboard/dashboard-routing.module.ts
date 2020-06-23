import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import{DisplayTimesheetComponent} from'../display-timesheet/display-timesheet.component';
import{SignupComponent} from'../signup/signup.component';
import{LoginComponent} from'../login/login.component';
import{UserListComponent} from'../user-list/user-list.component';
import{DashboardComponent} from'../dashboard/dashboard.component';
import{UserProfileComponent} from'../user-profile/user-profile.component'

const routes: Routes =[]
export const dashboardRoutes: Routes= [
  // {path:'', redirectTo:'dashboard/timesheet'},
  // {path:'dashboard',component:DashboardComponent},
  // {path:"timesheet",  component: DisplayTimesheetComponent},
  // {path:'user-list', component: UserListComponent},
  // {path:'user-profile', component:UserProfileComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports:[RouterModule]
})
export class DashboardRoutingModule { }
