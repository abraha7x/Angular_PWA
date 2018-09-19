import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()

export class AuthService {

    constructor(private afAuth: AngularFireAuth) {}

    login(): Promise<void> {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(result => {
                console.log(result);
            }).catch(console.log);


    }

}
