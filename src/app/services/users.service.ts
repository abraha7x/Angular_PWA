import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.services';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs-compat/Rx';
import {IUser} from '../structures/users';

import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';



@Injectable()

export class UserService {

    private users: AngularFirestoreCollection<IUser>;

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {

        this.users  = afs.collection<IUser>('users');

    }

    add(user: IUser): Promise<void> {

        return this.users.doc(user.uid).set(user).catch(console.log);

    }

    getUser(): Observable<IUser> {
        return this.afAuth.authState
        .take(1)
        .filter(user => !!user)
        .map((user: firebase.User) => {
            return user as IUser;
        });
    }

    addToken(token: string): Promise<any> {
        return new Promise((res, rej) => {
            this.getUser().subscribe(user => {
                this.saveToken(user, token).then(res).catch(rej);
            });
        });
    }

    saveToken(user: IUser, token: string): Promise <any> {
        // tslint:disable-next-line:prefer-const
        let tokens = user.tokens || {};

        // tslint:disable-next-line:curly
        if (tokens[token]) return Promise.resolve();

        tokens[token] = true;



        return this.users.doc(user.uid).update({tokens: tokens});
    }

}
