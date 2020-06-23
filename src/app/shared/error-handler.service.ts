import { Injectable } from '@angular/core';
import{AuthenticationService} from'./authentication.service';
import{Router} from'@angular/router';
import{SecureSessionStoragService } from'./secure-session-storag.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private authenticationService:AuthenticationService, private router:Router,
    private secureSessionStoragService:SecureSessionStoragService,
    private  toster: ToastrService
    ) { }

 errorHandler(error){
  //  switch(error.status){
  //   case 401:
  //   console.log("erorrrrrrrrr")
  //     this.authenticationService.logOut()
  //  }
  if(error.status == 401){
    this.authenticationService.logOut()
    this.toster.error("Invalid Token")
  }
  if(error.status == 404){
    console.log("404 error")
    this.toster.error("Some thing went wrong")
    this.authenticationService.logOut()
  }
  if(error.status == 500){
    this.secureSessionStoragService.remove("token")
    this.secureSessionStoragService.remove("user_id")
    this.router.navigate(['dashboard/error'])
  }

 }
}
