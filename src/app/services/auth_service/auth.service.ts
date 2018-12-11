import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
} from 'angularfire2/firestore'
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import * as firebase from 'firebase';
import { SharingService } from '../storage/sharing-service.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //set authstate as null
  private user: Observable<firebase.User>;
  userId: string;


  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore, private storage: SharingService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.storage.setData(this.storage.userID, this.userId);
        this.storage.setData(this.storage.authState, true);
      }
      else {
        return this.storage.setData(this.storage.authState, false);
      }
    })
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  getCurrentUser() {
    this.user = this.afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userId = user.uid;
          this.storage.setData(this.storage.userID, this.userId);
          this.storage.setData(this.storage.authState, true);
          return this.userId;
        }
        else {
          return this.storage.setData(this.storage.authState, false);
        }
      }
    );
  }

  getCurrentUserData() {
    if (this.isLoggedIn()) {
      return this.storage.getData(this.storage.userID);
    } else {
      console.log('No logged in user');
      this.getCurrentUser();
    }
  }

  isLoggedIn() {
    if (this.storage.getData(this.storage.authState) == null || this.storage.getData(this.storage.authState) == false) {
      return false;
    } else {
      return true;
    }
  }
}
