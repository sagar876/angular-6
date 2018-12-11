import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserData } from '../../../Model/user.model';
import { AuthService } from '../auth_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirstoreService {

  public currentUser: string
  private currentUserData: Observable<UserData[]>


  constructor(private afAuth: AuthService,
    private db: AngularFirestore) {
  }

  queryUserList(): Observable<UserData[]> {
    this.currentUser = this.afAuth.getCurrentUserData();
    var query = this.db.collection<UserData>('user_data', ref => ref.where("user_id", '==', this.currentUser).limit(1)).snapshotChanges();
    return query.pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as UserData;
        data.doc_id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getCurrentUserID(){
    return this.afAuth.getCurrentUserData();
  }

  getUserList(): Observable<UserData[]> {
    return this.queryUserList();
  }

  getCompanyUserList(companyNode): Observable<UserData[]> {
    var query = this.db.collection<UserData>('user_data', ref => ref.where("node_key", '==', companyNode)).snapshotChanges();
    return query.pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as UserData;
        data.doc_id = a.payload.doc.id;
        return data;
      });
    }));
  }


  getUserDetails(userID: string): Observable<UserData[]> {
    var query = this.db.collection<UserData>('user_data', ref => ref.where("user_id", '==', userID)).snapshotChanges();
    return query.pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as UserData;
        data.doc_id = a.payload.doc.id;
        return data;
      });
    }));
  }

  updateReportingManager(docID, RM, DOJ) {
    var docRef = this.db.collection('user_data').doc(docID);
    if (DOJ != null && DOJ != "") {
      docRef.update({ "date_of_joining": DOJ });
    }
    if (RM != null && RM != "") {
      docRef.update({ "reporting_manager": RM });
    }
  }

  updateUserBlocking(docID) {
    var isdeleted;
    var docRef = this.db.collection('user_data').doc(docID);
    docRef.ref.get().then(element => {
      isdeleted = element.get('is_deleted');
      if (isdeleted == true) {
        docRef.update({ "is_deleted": false });
      }
      else if (isdeleted == false) {
        docRef.update({ "is_deleted": true });
      }
      else {
        const data = { 'is_deleted': true };
        docRef.set(data, { merge: true })
      }
    });
  }

  getAdminList(node_key) {
    return this.db.collection<UserData>('user_data', ref => ref.where('node_key', '==', node_key).where('is_admin', '==', true)).valueChanges();
  }

}
