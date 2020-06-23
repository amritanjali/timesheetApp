import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders, HttpRequest} from'@angular/common/http';
import{ SecureSessionStoragService} from './secure-session-storag.service'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor( private secureSessionStoragService:SecureSessionStoragService) { }

  setHeaders(){

    const user_code = this.secureSessionStoragService.gets('user_id')
    const token = "Bearer " + this.secureSessionStoragService.gets('token')
     const httpOptions = {
      headers :new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':   token,
      'user_code': user_code
    })};
    // headers.append('user_code' , user_code)
    // headers.append('Authorization', token)
    // headers.append( 'Content-Type',  'application/json')
    // console.log("headres=====>" + (JSON.stringify(headers)))
  
    // const options = { headers: headers };
       return httpOptions;

  }

  ApiLinkGeneration(param1, param2){
    const host = window.location.hostname
    // console.log( "dynamic link " + `${param1.protocol}//:${host}:${param1.port}${param1.apiPrefix}${param1.resourcelogin}`)
    return `${param1.protocol}://${host}:${param1.port}${param1.apiPrefix}${param2}`
  }
  
}
