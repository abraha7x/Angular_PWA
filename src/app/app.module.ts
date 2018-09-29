import { AuthGuard } from './guards/auth.guard.service';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


// Conguracion de modulos.
import {environment} from '../environments/environment';
import {routes} from './routes';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
// Fin.

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.services';
import {UserService} from './services/users.service';

import {TransferHttpCacheModule} from '@nguniversal/common';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
