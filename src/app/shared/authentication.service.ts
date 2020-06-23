import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject, Observable } from 'rxjs';
import { SecureSessionStoragService } from '../shared/secure-session-storag.service';
import { UtilsService } from './utils.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

export interface User {
  _id: string;
  username: string;
  password: string;
  token: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // ApiUrl = "http://localhost:4000";
constructor(private htpp: HttpClient, private secureSessionStoragService: SecureSessionStoragService, 
  private utilsService: UtilsService, private router: Router) { }
  public user_code: any;
  public token: any;
  loginApi(customBody) {

    let url = this.utilsService.ApiLinkGeneration(environment.auth, environment.auth.resourcelogin);

    // for error status testing
    // let url = this.utilsService.ApiLinkGeneration(environment.auth, environment.auth.registersignup);
    // let url = this.utilsService.ApiLinkGeneration(environment.auth, environment.auth.currentuser);
    
    // const httpOption = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': " Bearer " + this.secureSessionStoragService.gets('token'),
    //   })
    // }



    return this.htpp.post<User>(url, customBody)
      .pipe(
        // share(),
        map(user => {
          this.secureSessionStoragService.sets('token', user.token)
          // this.secureSessionStoragService.sets('user_id', user._id)

          return user

        })
      )


  }
  logOut(){
    this.secureSessionStoragService.remove('token')
    this.secureSessionStoragService.remove('user_id')
    this.router.navigate(['/login'])
  }
  isLoggedIn(){
    this.user_code = this.secureSessionStoragService.gets('token')
     this.token =this.secureSessionStoragService.gets('user_id')
     if (this.user_code !== null && this.token !== null){
       return true
     }
     return false
  }
}


