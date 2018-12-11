import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FirstoreService } from '../../services/firestore_service/firstore.service';
import { UserData } from '../../../Model/user.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  encodedID :string;
  currentUser: string;
  user: firebase.User;
  userDataList: Observable<UserData[]>;

  userdata: UserData;

  constructor(public fsService: FirstoreService, private route: Router) {
    this.user = this.fsService.getCurrentUserID();
  }


  ngOnInit() {
    this.fsService.getUserList().subscribe(task => {
      task.forEach(element => {
        if (this.fsService.currentUser == element.user_id) {
          this.userDataList = this.fsService.getCompanyUserList(element.node_key)
        }
      });
    });
  }


  //Selected row data
  setClickedRow(id: string):void {
    this.encodedID = id;
  }
}
