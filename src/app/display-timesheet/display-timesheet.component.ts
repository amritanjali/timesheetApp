import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TimeSheet, DispalyTimeService } from './dispaly-time.service';
import { error } from '@angular/compiler/src/util';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service'
import { UserService } from '../shared/user.service'
import { __await } from 'tslib';



@Component({
  selector: 'app-display-timesheet',
  templateUrl: './display-timesheet.component.html',
  styleUrls: ['./display-timesheet.component.scss']
})
export class DisplayTimesheetComponent implements OnInit {
  val: number;
  public timesheets: any
  headerCols: string[] = [];
  contentBody = [];
  display: boolean = false;
  public updateTimeSheetDesription: any
  public updateTimeSheetHour: any
  public differentd: any
  public popdate: any
  public getSaveData: any
  public updateTimeSheetId: any
  public isDataSave = false
  public getdayNumb: any
  public updateData: any
  public checkShowMe: boolean = true
  public getdate: any
  public daysIdN: any
  public loaderShow: boolean = true;
  public isChecked: boolean = false;
  public displayApprovalSheet: boolean = false;
  public timehr: any;
  public daysCheck = false;
  public approvalTimeSheetData = [];
  public approvalTimesheet: any
  public craetedData: any;
  public satDay: string = "Saturday";
  public sunDay: string = "Sunday";
  public cureentUser: any = {};
  public displayTimesheet: boolean = true;
  public updateProfileShow = false;
  public allDataCheck = false;
  public checkedLabe = "";
  public updateHour;
  checklist:any
  selectedAll: any;
  constructor(private displayTimeSheet: DispalyTimeService, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService,
    @Inject(DOCUMENT) private _document: Document
  ) { }
  ngOnInit() {
    this.checklist = [
      {selected:false},
    ]
    this.getTimesheeetdata()
  }
  async getTimesheeetdata() {
    await this.displayTimeSheet.getTimeSheet().subscribe((data) => {


      this.timesheets = data;
      this.loaderShow = false

      // console.log(this.timesheets)
      if (this.timesheets.day = "Saturday") {
        // this.bgCss  = true

      }
    })
  }
  openDialogBox(days, daysNumb, daysId, hr) {
    this.display = true;
    this.popdate = days;
    this.getdayNumb = daysNumb
    this.daysIdN = daysId
    this.timehr = hr



    this.displayTimeSheet.getUpdatedTimesheet(this.daysIdN).subscribe(
      (data: any) => {
        this.getSaveData = data;
        this.updateTimeSheetDesription = this.getSaveData.description;
        this.updateTimeSheetHour = this.timehr;
        // console.log(this.getSaveData)
        // console.log(this.getSaveData.id )
        // console.log(this.getSaveData.description)
      })


  }

  saveUpdateTimesheet(dysN, dyI) {
    this.getdate = dysN,
      this.daysIdN = dyI
    this.displayTimeSheet.postUpdatedTimesheet(this.updateTimeSheetHour, this.updateTimeSheetDesription, this.daysIdN).subscribe((data: any) => {

      this.updateData = data
      this.updateTimeSheetHour = this.timehr
      this.updateTimeSheetDesription = this.updateData.description;
      this.display = false;
      this.isDataSave === true
      // console.log(this.updateData.description)
      this.displayTimeSheet.updatedResource(dyI).subscribe(
        res => {
          this.updateHour = res.hour
          console.log(this.timesheets)
          document.getElementById(dyI).innerHTML = this.updateHour;
          //  this.updateTimeSheetHour = this.updateHour;
        }
      )

    })


  }
  refreshPage() {
    this._document.defaultView.location.reload();
  }

  toggleEditable(event, days, daysNumb, hr, updateTimeSheetDesription, daysId) {

    let timesheetObj = {
      "day": days,
      "date": daysNumb,
      "hour": hr,
      "id": daysId,
      "description": updateTimeSheetDesription
    };

    if (event.target.checked ||  this.checklist.selected=== true) {
      this.approvalTimeSheetData.push(timesheetObj);
    } else {
      this.approvalTimeSheetData = this.approvalTimeSheetData.filter((item) => item.id !== daysId);
    }

    console.log(this.approvalTimeSheetData)
    // this.selectedAll = this.approvalTimeSheetData.every(function(item:any) {
    //   return item.selected == true;
    // })

  }

  sendApproval() {
    this.displayApprovalSheet = true;
  }
  updateProfile() {
    this.updateProfileShow = true;
    this.displayTimesheet = true
  }
  selectAll() {
    // console.log("all select")
    // for (var i = 0; i < this.approvalTimeSheetData.length; i++) {
    //   this.approvalTimeSheetData[i].selected = this.selectedAll;
    //   console.log("asdfghj" +this.approvalTimeSheetData[i])
    // }
    // this.selectedAll = this.approvalTimeSheetData.every(function(item:any) {
    //   console.log("selectttttttt" +item.selected)
    //   return item.selected == true;
    // })
    this.checklist.selected = true;
   this.toggleEditable(event, this.timesheets.day, this.timesheets.daysNumb, this.timesheets.hour, this.timesheets.description, this.timesheets.id)
  }
  sendMail() {
    this.userService.sendMail(this.getdate).subscribe(
      data => {
        console.log(data)

      }
    )
  }
}
