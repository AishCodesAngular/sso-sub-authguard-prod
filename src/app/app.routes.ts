import { Routes } from '@angular/router';
import { FirstForm } from '../first-form/first-form';
import { SecondForm } from '../second-form/second-form';
import { ThirdForm } from '../third-form/third-form';
import { authGuard } from './guard/auth-guard';
import { ErrorPage } from '../error-page/error-page';


export const routes: Routes = [
  { path: 'first', component: FirstForm, canActivate: [authGuard] },            // default route
  { path: 'second', component: SecondForm, canActivate: [authGuard] },      // /about
  { path: 'third', component: ThirdForm, canActivate: [authGuard] }, 
  { path: 'error', component: ErrorPage }, 

];