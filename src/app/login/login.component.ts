import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from '@angular/forms'
import{ AuthenticationService} from '../shared/authentication.service'
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submited = false;
  public passwordShowIcon = true;
  // token: any
  userinfo: any = []
  constructor(private formbuilder: FormBuilder, private authenticationService:AuthenticationService,  private route: ActivatedRoute, 
     private router: Router, private toastr: ToastrService)
      { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  get f(){ 
    return this.loginForm.controls
  };

  async login(){
    this.submited = true;
    if(this.loginForm.valid){
      await  this.authenticationService.loginApi(this.loginForm.value)
   
      .subscribe(
          (data) => {
            this.toastr.success("login is succsesfully done")
            // this.router.navigate(['dashboard/timesheet'])
            // setTimeout(()=>this.router.navigate(['dashboard/timesheet']), 4000) 
            console.log(data)
            console.log("login Api calling")
   
          
          console.log("data =======>" + this.userinfo)
      
             
          },
          error => {
            this.toastr.error(error.error.message)
            // console.log("some thing is going wrong")

          }
          );
  
      
    }

  }

 
  passwordShow(){
    if(this.loginForm.valid){
      document.getElementById('pwd').setAttribute("type", "text");
      this.passwordShowIcon = false;
    }

  }
  passwordNotShow(){
     if(this.loginForm.valid){
    document.getElementById('pwd').setAttribute("type", "password");
    this.passwordShowIcon = true;
  }
  }
}
