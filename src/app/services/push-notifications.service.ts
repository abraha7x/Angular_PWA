import { UserService } from './users.service';
import { Observable } from 'rxjs-compat/Rx';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';


import {Subject} from 'rxjs-compat/Subject';



@Injectable()

export class PushNotificationsService {

    public messaging = firebase.messaging();

    public sub: Subject <any> = new Subject();

    public notification: Observable<any> = this.sub.asObservable();

    constructor(private uS: UserService) {
    }

    refreshToken() {
        this.messaging.onTokenRefresh(() => {
            this.messaging.getToken().then(token => this.uS.addToken(token));
        // tslint:disable-next-line:semicolon
        })
    }

    watchMessages() {
        this.messaging.onMessage((notification) => {
            console.log(notification);
            this.sub.next(notification);
        // tslint:disable-next-line:semicolon
        })
    }



    getSubscription(): Promise<any> {
        if (!navigator) { return; }

        return navigator.serviceWorker.getRegistrations().then(registrations => {
            const firebaseSWs = registrations.filter(sw => {
                // tslint:disable-next-line:semicolon
                // tslint:disable-next-line:no-unused-expression
                return sw.active && sw.active.scriptURL.includes('firebase-messaging');
            // tslint:disable-next-line:semicolon
            })

            // tslint:disable-next-line:curly
            if (firebaseSWs.length < 1) return Promise.resolve(null);

            return firebaseSWs[0].pushManager.getSubscription();
        });
    }

    cancelPermission(): Promise<any> {
        const suscriptionPr = this.getSubscription();
        return suscriptionPr.then((pushS: PushSubscription) => {
            // tslint:disable-next-line:curly
            if (!pushS) return Promise.resolve(null);

            return pushS.unsubscribe();



        // tslint:disable-next-line:semicolon
        })
    }

    requestPermission(): Promise<string> {
        return this.messaging.requestPermission().then(() => {
            return this.messaging.getToken();
        }).then(token => {
            return this.uS.addToken(token);
        });
    }

}
