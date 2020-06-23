import { Component, OnInit } from '@angular/core';
import{UserService} from'../shared/user.service'
import { from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import{SecureSessionStoragService} from'../shared/secure-session-storag.service';
import{AuthenticationService} from'../shared/authentication.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
public cureentUser:any ={}
public displayTimesheet = true
  constructor(private userService: UserService, private router: Router, private secureSessionStoragService: SecureSessionStoragService,
    private authenticationService: AuthenticationService
    ) { }

  async ngOnInit() {
    // if()
    this.userService.getCurrentUser().subscribe(data=>{
      console.log("cureent user=============>" + data)
      this.cureentUser = data;

    },
    )
    this.idleLogout();
  }
  logoutClick(){
  this.authenticationService.logOut()
  }
  userList(){
    this.router.navigate(['dashboard/user-list'])
  }
  seeProfile(){
    this.router.navigate(['dashboard/user-profile'])
}
timesheetShow(){
this.router.navigate(['dashboard/timesheet'])
}
idleLogout() {
  var t;
  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;  // catches touchscreen presses as well      
  window.ontouchstart = resetTimer; // catches touchscreen swipes as well 
  window.onclick = resetTimer;      // catches touchpad clicks as well
  window.onkeypress = resetTimer;   
  window.addEventListener('scroll', resetTimer, true); // improved; see comments

  function yourFunction() {
      // your function for too long inactivity goes here
      // e.g. window.location.href = 'logout.php';
      alert("timeouttttttt")
  }

  function resetTimer() {
      clearTimeout(t);
      t = setTimeout(yourFunction, 10000);  // time is in milliseconds
  }
}


}
