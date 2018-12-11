import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from '../../../../Model/user.model';
import { FirstoreService } from '../../../services/firestore_service/firstore.service';
import { NotificationService } from '../../../services/notify/notification.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private pageID: any;
  private userData: UserData;
  private adminUserList: Observable<UserData[]>;
  private _selectedID: string;

  @Input()
  set selectedID(value: string) {
    console.log('Value: ', value);
    this._selectedID = value;
    this.getuserDetail();
  }

  constructor(private route: ActivatedRoute, private afs: FirstoreService, private notify: NotificationService) { }

  ngOnInit() {
  }

  getuserDetail(): void {
    this.pageID = this._selectedID;
    if (this.pageID) {
      this.afs.getUserDetails(this.pageID).subscribe(data => {
        data.forEach(element => {
          if (this.pageID == element.user_id) {
            this.userData = element;
            this.getAdminList();
          }
        });
      })
    }

  }


  getAdminList(): void {
    this.adminUserList = this.afs.getAdminList(this.userData.node_key);
  }


  onSubmit(e) {
    //fetching form data
    e.preventDefault();
    var DOJ = e.target.elements[0].value;
    var RM = e.target.elements[1].value;
    console.log(RM);
    console.log(DOJ);

    // setting reporting manager data   
    const docref = this.afs.updateReportingManager(this.userData.doc_id, RM, DOJ);    
  }

  Disableuser() {
    const docref = this.afs.updateUserBlocking(this.userData.doc_id);   
  }

  onNotify(isAadhar: boolean) {
    var notificationBody = {
      "to": this.userData.device_token,
      "collapse_key": "type_a",
      "notification": {
        "body": "Please upload your " + (isAadhar ? "Aadhar card" : "PAN card") + " scanned copy",
        "title": "Upload document"
      }
    };
    this.notify.sendNotification(notificationBody)
  }
}
