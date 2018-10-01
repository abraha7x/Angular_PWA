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

  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit () {
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
