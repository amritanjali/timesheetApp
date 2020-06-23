import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable, Subject, from } from 'rxjs';
import{UtilsService} from'./utils.service';
import{SecureSessionStoragService}  from'../shared/secure-session-storag.service'
import { environment } from 'src/environments/environment';
export interface User{
firstName: string,
lastName: string,
username: string,
password: any,
token: string,
_id: number
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
// userApiUrl = "http://localhost:4000";

  constructor(private http: HttpClient, private utilsService:UtilsService, private secureSessionStoragService: SecureSessionStoragService) { }
  
signUp(user){
  let url = this.utilsService.ApiLinkGeneration(environment.auth, environment.auth.registersignup)
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Authorization': 'my-auth-token'
  //   })
  // };
  
 return  this.http.post<User>(url, user, this.utilsService.setHeaders())
  
}

getAllUser(){
  let url = this.utilsService.ApiLinkGeneration(environment.auth, environment.auth.alldata)
  // this.utilsService.setHeaders();
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Authorization':   "Bearer " + this.secureSessionStoragService.gets('token')
  //   })
  // };
  return this.http.get<User>(url)
}

dltuser(getId){
  let url = this.utilsService.ApiLinkGeneration(environment.auth, environment.auth.id)
  url = url.replace(':id', getId)
  return this.http.delete<User>(url, this.utilsService.setHeaders())
}

getCurrentUser(){
  console.log("interceptor calling")
  const apiUrlCureentUser ='http://localhost:4000/users/current';
 const httpOptions = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Authorization' : "Bearer " + this.secureSessionStoragService.gets('token'),
     'orgName': "timesheet"
     
   })
 }

 return this.http.get<User>(apiUrlCureentUser,httpOptions)

}

updateUserProfile(formValue){
  let url = this.utilsService.ApiLinkGeneration(environment.auth, environment.auth.id)
  const user_id = this.secureSessionStoragService.gets('user_id')
  console.log("update userid" + user_id)
  url=url.replace(':id', user_id)
  console.log(url)
return this.http.put(url, formValue, this.utilsService.setHeaders())

}
sendMail(dateId){
  let url = "http://localhost:4000/users/mail"
console.log("date====>" + dateId)
  return this.http.post(url, this.utilsService.setHeaders())
  
}
}
