import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationRoot: string = 'https://fcm.googleapis.com/fcm/send';

  constructor(private http: HttpClient) { }

  sendNotification(notificationBody){
    console.log("POST");
    let url = this.notificationRoot;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'key=AAAAbk1T2Cs:APA91bFHXaICsJIfMrFYynD4taGyn8aoQrUdI90OVcafb7pov6CXkeA3x58tU1n2sVkXhgGp_tdSa3s18OoCyWQvlBVYCc1MoFvOkxtqBu9rgLDHg99zE4hxfm86h3wrP49eqxPNtDVc'
      })
    };
    this.http.post(url,notificationBody,httpOptions).subscribe(res => console.log(JSON.stringify(res)));
  }
}
