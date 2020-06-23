import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import{AuthenticationService} from'../shared/authentication.service';
import{ SecureSessionStoragService} from'../shared/secure-session-storag.service'
import { from } from 'rxjs';
export interface TimeSheet {
         day: number,
        dates: string,
        hour: number,
        statusMsg: string,
        newStatusMsg: string,
        dayName: string,
        dayStatus: string,
        holidayName: null,
        holidayTypeName: null,
        displayDate: string,
        description: string,
        id: number
}
export interface TimeSheetUpdate {
  description: string,
  hour: number,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class DispalyTimeService {

  constructor(private http:HttpClient, private auth:AuthenticationService, private secureSessionStoragService: SecureSessionStoragService) { }

  apiUrl =  'http://localhost:3000/timesheet'
  // apiUrlUpdateTimesheet: any = 'http://localhost:4000/timesheetUpdate';
  
  hour: number;
  description:string
 
  
   getTimeSheet(){
    const httpOptions = {
      headers: new HttpHeaders({
        'org-name':  'xyz',
        
      })
    };
//  console.log( this.http.get<TimeSheet>(this.apiUrl))
   return  this.http.get<TimeSheet>(this.apiUrl)
  }

  postUpdatedTimesheet(hour, description, id){
  //  console.log(id)
    let body = { "hour": hour, "description": description};
    // const apiUrlUpdateTimesheetId:any = this.apiUrl +"/" + "?" + "dates" + "=" + date
    const apiUrlUpdateTimesheetId = this.apiUrl +"/" + id
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    
    console.log(body)
    return this.http.patch<TimeSheetUpdate>(this.apiUrl +"/" + id, { "hour": hour, "description": description}, httpOptions )
  
  }

  getUpdatedTimesheet(date){
    const apiUrlUpdateTimesheetId:any = this.apiUrl+ "/" + date
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log("dialog" + apiUrlUpdateTimesheetId)
    return this.http.get<TimeSheet>(apiUrlUpdateTimesheetId, httpOptions )
  }

  getSatSunData(){
    const apiUrlUpdateTimesheetId:any = this.apiUrl +"/" + "?" + "day" + "=" + "Saturday"
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
//  console.log( this.http.get<TimeSheet>(this.apiUrl))
  return this.http.get<TimeSheet>(apiUrlUpdateTimesheetId, httpOptions)
  }

  updatedResource(id){
      const apiUrlUpdateTimesheetId = this.apiUrl +"/" + id
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };
      console.log("resourec url" + this.apiUrl +"/" + id)
      return this.http.get<TimeSheet>(this.apiUrl +"/" + id, httpOptions )
    
    }

}
