import { Component, OnInit } from '@angular/core';
import{UserService} from'../shared/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import{Router} from'@angular/router';
import{AuthenticationService} from'../shared/authentication.service'
import { from } from 'rxjs';
import{ErrorHandlerService} from'../shared/error-handler.service'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
public cureentUser :any={};
public updateProfileShow = true;
updateProfileForm: FormGroup;
public updateobje: any ={};
public currentUser_delete;
public deleteAccountdialog = false;
  constructor(private userService: UserService, private formBuilder:FormBuilder, 
  private toastr: ToastrService, private router: Router, 
  private authenticationService: AuthenticationService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
      this.userService.getCurrentUser().subscribe(data=>{
      console.log("cureent user=============>" + data)
      this.cureentUser = data;

    },
    error => {
      console.log(error.error.message)
        // this.errorHandlerService.errorHandler(error)
     
    }
    )

    this.updateProfileForm = this.formBuilder.group({
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      username:['', [Validators.required]],
    })
  }
  updateProfile(){
    this.updateProfileShow = !this.updateProfileShow
  }
back(){
  this.updateProfileShow = true
}

  onSubmit(){
    // this.userService.updateUserProfile()
    if(this.updateProfileForm.valid){
    this.userService.updateUserProfile(this.updateProfileForm.value).subscribe(data=>{
        this.updateobje = data;
        this.toastr.success("successfully update")
        this.userService.getCurrentUser().subscribe(data=>{
          this.cureentUser = data;
        })
        error=>{
          console.log(error)
          this.toastr.error("error.error.message")
        }
        
    })
   
  }
  else this.toastr.error("Please fill the details")
  }

  delete(){
    this.deleteAccountdialog = true;
  }
  
  deletCureentUSer(getUser_id, userName){
    this.userService.dltuser(getUser_id).subscribe(
      (data) =>{
        this.toastr.success(userName +  "Successfully dlete")
        // this.router.navigate(['/login'])
        this.authenticationService.logOut()
      }
     
    )
    
  }
}

