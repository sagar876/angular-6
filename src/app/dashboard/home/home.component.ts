import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { annoucementData } from '../../../Model/announcement.model';
import { Observable } from 'rxjs';
import { birthdayData } from '../../../Model/birthday.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ann_data: Observable<annoucementData[]>;
  bday_data : Observable<birthdayData[]>;
  constructor( private af : AngularFirestore) { }

  ngOnInit() {
    this.getannouncements();
    this.getBirthdays();
  }

  getannouncements(){
    this.ann_data =this.af.collection<annoucementData>('announcements',ref => ref.limit(5)).valueChanges();
    console.log(this.ann_data)  
  }

  getBirthdays(){
    this.bday_data =this.af.collection<birthdayData>('birthday').valueChanges();
    console.log(this.ann_data) 
  }

}
