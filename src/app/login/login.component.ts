import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserData } from '../../Model/user.model';
import { AuthService } from '../services/auth_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private user: UserData;
  private is_admin: boolean;

  constructor(private route: Router, private auth: AuthService, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  //#region Login
  onSubmit(e) {
    //fetching form data
    e.preventDefault();
    var email = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    //login call
    var result = this.auth.emailLogin(email, password);
    result.then(() => {
      if (this.auth.isLoggedIn()) {
        this.onPostAuthentication();
      }
    })
      .catch(error => {
        console.log(error);
        alert("Wrong credentials !")
      });
  }


  onPostAuthentication() {
    var uid = this.auth.getCurrentUserData();
    if (uid != null) {
      const docref = firebase.firestore().collection('user_data').where("user_id", '==', uid);
      docref.get().then(snapshot => {
        snapshot.forEach(element => {
          this.is_admin = element.get('is_admin');
          console.log("is_admin: " + this.is_admin);
          if (this.is_admin == true) {
            this.route.navigate(['./ansatt']);
            console.log("lets go to next page");
          }
          else {
            console.log("Not an admin:  " + this.is_admin)
          }
        });
      })
    }
  }
  //#endregion 

}
