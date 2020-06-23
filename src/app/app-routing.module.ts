import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{DisplayTimesheetComponent} from'./display-timesheet/display-timesheet.component';
import{SignupComponent} from'./signup/signup.component';
import{LoginComponent} from'./login/login.component';
import{UserListComponent} from'./user-list/user-list.component';
import{DashboardComponent} from'./dashboard/dashboard.component';
import{UserProfileComponent} from'./user-profile/user-profile.component';
import{ErrorComponent}  from'./error/error.component'
import { from } from 'rxjs';
import{AuthGaurd} from './shared/auth-gaurd'



const appRoutes: Routes =[
  {path:"", redirectTo:"login", pathMatch: 'full'},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"timesheet",  component: DisplayTimesheetComponent,  canActivate: ['AuthGaurd']},
  // {path:'user-list', component: UserListComponent},
  // {path:'user-profile', component:UserProfileComponent},
  {path: 'dashboard',component:DashboardComponent,
  children: [  
    {path:"timesheet",  component: DisplayTimesheetComponent, pathMatch: 'full', },
    {path:'user-list', component: UserListComponent, pathMatch: 'full', canActivate: ['AuthGaurd']},
    {path:'user-profile', component:UserProfileComponent, pathMatch: 'full'},
    {path:'error', component:ErrorComponent}
  ]
}

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
