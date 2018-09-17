import { HomeComponent } from './home/home.component';


export const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: 'login', component: HomeComponent}
  ];

