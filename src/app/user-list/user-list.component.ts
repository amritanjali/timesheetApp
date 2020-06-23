import { Component, OnInit } from '@angular/core';
import {UserService} from'../shared/user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
public allUserData : any =[]
public showingUserCard = true
  constructor( private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(data=>{
      console.log("data listtttttttt" + data)
      this.allUserData =  data
    },
    (error)=>{
      console.log("user-listtttttt error")
    }
    )
  }
  deleteUser(getId, cardID){
      this.userService.dltuser(getId).subscribe(data=>{
        console.log(data)
        // document.getElementById(cardID).style.display ="none"
        // this.showingUserCard = cardID
        // console.log(this.showingUserCard)
        // this.showingUserCard = false
        this.userService.getAllUser().subscribe(data=>{
          this.allUserData =  data
        })
      })
  }

}
