import { Component, OnInit, Input } from '@angular/core';
import { annoucementData } from '../../../../Model/announcement.model';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css']
})
export class AnnouncementDetailComponent implements OnInit {

 private selectedData : annoucementData;

  @Input()
  set detail(selectedData :annoucementData ){
    this.selectedData = selectedData;
  } 

  constructor() { }

  ngOnInit() {
    console.log("details" + this.selectedData.doc_id)
  }

}
