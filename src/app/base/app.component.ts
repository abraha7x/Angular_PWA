import { PushNotificationsService } from './../services/push-notifications.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: `app.component.html`,
  styles: []
})
export class AppComponent {

  // tslint:disable-next-line:no-inferrable-types
  public token: any;
  // tslint:disable-next-line:no-inferrable-types
  public showPanel: boolean = false;

  constructor(public afAuth: AngularFireAuth, private router: Router, public PushS: PushNotificationsService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit () {
    this.token = this.PushS.getSubscription();
    this.PushS.watchMessages();
    this.PushS.refreshToken();
  }

  requestPushPermission() {
    this.PushS.requestPermission().then(() => {
      this.token = this.PushS.getSubscription();
      this.toggleNotificationsWindow();
    });

  }

  cancelPermission() {
    this.PushS.cancelPermission().then(() => {
      this.token = this.PushS.getSubscription();
      this.toggleNotificationsWindow();
    });
  }

  toggleNotificationsWindow() {
    this.showPanel = !this.showPanel;
  }

  rejectPushPermissions() {}

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
