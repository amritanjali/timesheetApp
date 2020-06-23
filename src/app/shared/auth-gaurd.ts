import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import{AuthenticationService} from './authentication.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate{

  constructor(private authService:AuthenticationService) { }

  canActivate(){
    console.log("gaurd is working=================>>>>>>>>")
    return this.authService.isLoggedIn();
  }
}
