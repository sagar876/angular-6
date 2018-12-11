import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from '../environments/firebase.config';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './dashboard/employee/employee-details/employee-details.component';
import { AuthService } from './services/auth_service/auth.service';
import { FormsModule } from '@angular/forms';
import { FirstoreService } from './services/firestore_service/firstore.service';
import { SharingService } from './services/storage/sharing-service.service';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { TopNavComponent } from './dashboard/top-nav/top-nav.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RequestComponent } from './dashboard/request/request.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { NotificationService } from './services/notify/notification.service';

import { AnnouncementsComponent } from './dashboard/announcements/announcements.component';
import { AnnouncementDetailComponent } from './dashboard/announcements/announcement-detail/announcement-detail.component';
import { AnnouncementCreateComponent } from './dashboard/announcements/announcement-create/announcement-create.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ErrorComponent,
    LoginComponent,
    DashboardComponent,
    EmployeeDetailsComponent,
    SideNavComponent,
    TopNavComponent,
    HomeComponent,
    RequestComponent,
    SettingsComponent,
    AnnouncementsComponent,
    AnnouncementDetailComponent,
    AnnouncementCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService,FirstoreService,SharingService,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
