import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()

export class PushNotificationsService {

    public messaging = firebase.messaging();

    getSuscription(): Promise<any> {
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

    requestPermission(): Promise<string> {
        return this.messaging.requestPermission().then(() => {
            return this.messaging.getToken();
        });
    }

}
