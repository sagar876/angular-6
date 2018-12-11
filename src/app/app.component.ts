import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //user: Observable<firebase.User>;
  user_data: Observable<any[]>;

  constructor(public afAuth: AngularFireAuth, db: AngularFirestore){
    this.user_data = db.collection('user_data').valueChanges();
  }
}


