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
  public token: boolean = false;

  constructor(public afAuth: AngularFireAuth, private router: Router, public PushS: PushNotificationsService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit () {
    this.PushS.getSuscription().then(console.log);
  }

  requestPushPermission() {
    this.PushS.requestPermission().then(console.log);
  }

  rejectPushPermissions() {}

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
