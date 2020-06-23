import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTimesheetComponent } from './display-timesheet/display-timesheet.component';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastrModule } from 'ngx-toastr'
import { from } from 'rxjs';
import{TokenInterceptor} from'../app/shared/token-interceptor';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { HttpModule } from '@angular/http';
import{DashboardRoutingModule} from'../app/dashboard/dashboard-routing.module';
import { ErrorComponent } from './error/error.component'
import{AuthGaurd} from './shared/auth-gaurd'

@NgModule({
  declarations: [
    AppComponent,
    DisplayTimesheetComponent,
    SignupComponent,
    LoginComponent,
    UserListComponent,
    UserProfileComponent,
    DashboardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'top-right',
      preventDuplicates: true,
    }),
    
    DashboardRoutingModule
  ],
  providers: [
    AuthGaurd,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
