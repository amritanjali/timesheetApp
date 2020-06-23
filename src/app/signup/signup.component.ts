import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../shared/user.service'
import { from } from 'rxjs';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';

// import 'rxjs/add/operator/catch'; // don't forget this, or you'll get a runtime error



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastr: ToastrService, private router: Router) { }
  userForm: FormGroup;
  submited = false
  sucessMessage = false;
  errorMessage = false;
  errorObj: any = [];
  public passwordShowIcon = true

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['',  [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8),
        // Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$!%*?&]).{8,30}$/)
      ]]
    })
    // ^ - start of string (implicit in string regex pattern)
    // (?=\D*\d) - there must be 1 digit
    // (?=[^a-z]*[a-z]) - there must be 1 lowercase ASCII letter
    // (?=[^A-Z]*[A-Z]) - there must be 1 uppercase ASCII letter
    // .{8,30} - any 8 to 30 chars other than line break chars
    // $ - end of string (implicit in string regex pattern)
  }

  get f() {
    // console.log("controls" + this.userForm.controls)
    return this.userForm.controls

  }
  onSubmit() {
    console.log(this.userForm.value)
    this.submited = true
    if (this.userForm.valid) {
      this.userService.signUp(this.userForm.value).subscribe(data => {
        console.log(data)
        this.toastr.success(" congratulations you have register in our system !!!")
        this.router.navigate(['/login'])
      },
        error => {
          console.log(error)
          this.errorObj = error
          this.errorMessage = true
          this.toastr.error(error.error.message)
        }
      )
    }
  }

   
  passwordShow(){
    if(this.userForm.valid){
      this.passwordShowIcon = true;
      document.getElementById('pwd').setAttribute("type", "text");
      this.passwordShowIcon = false;
    }

  }
  passwordNotShow(){
    if(this.userForm.valid){
    document.getElementById('pwd').setAttribute("type", "password");
    this.passwordShowIcon = true;
    }
  }

//   static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
//     if((control.value as string).indexOf(' ') >= 0){
//         return {cannotContainSpace: true}
//     }

//     return null;
// }
}
