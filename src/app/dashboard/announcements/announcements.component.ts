import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { annoucementData } from '../../../Model/announcement.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  ann_data: Observable<annoucementData[]>;
  selectedData: annoucementData;

  constructor(private af: AngularFirestore) { }

  ngOnInit() {
    this.ann_data = this.getannouncements();
  }

  getannouncements() {
    var query = this.af.collection<annoucementData>('announcements').snapshotChanges();
    return query.pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as annoucementData;
        data.doc_id = a.payload.doc.id;
        return data;
      });
    }));
  }
  AnnouncementClicked(items: annoucementData) {
    //this.af.collection<annoucementData>('announcements').doc(items.doc_id).delete();
    this.selectedData = items
    console.log(this.selectedData)
  }
}
