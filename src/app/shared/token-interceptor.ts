import{Injectable} from'@angular/core';
import {HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse } from'@angular/common/http';
import { Observable, from } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import{AuthenticationService} from'./authentication.service';
import{UserService} from'./user.service';
import{SecureSessionStoragService} from'./secure-session-storag.service';
import{ErrorHandlerService } from'./error-handler.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
@Injectable()

export class TokenInterceptor implements  HttpInterceptor {

    constructor(private authService: AuthenticationService, 
        private userService:UserService, private secureSessionStoragService:SecureSessionStoragService,
        private errorHandlerService: ErrorHandlerService) { }
    //function which will be called for all http calls
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const authS  = this.authService.
        let  authReq = request
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        console.log("tokennnn" +this.secureSessionStoragService.gets('token'))
        if(this.authService.isLoggedIn()){
             authReq = request.clone({
                headers: request.headers.set('Authorization', "Bearer " + this.secureSessionStoragService.gets('token'))
                .set('user_code', this.secureSessionStoragService.gets('user_id'))
                .set('org-name', "timesheet-interceptor-logedin")
                
              });

              console.log("request"+ authReq)
        }
        else{
            authReq = request.clone({
                headers: request.headers.set('org-name', "timesheet-interceptor")
               
              });

              console.log("request"+ authReq)
        }
       

        return next.handle(authReq).catch((error: HttpErrorResponse) => {
        let data = {};
        data = {
            // reason: error && error.error.reason ? error.error.reason : '',
            status: error.status
        };
        this.errorHandlerService.errorHandler(data)
        console.log("calling from interceptor" + error.status)
        return Observable.throwError(error);
    })

     


    }

}
