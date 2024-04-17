import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: ":id",
        component: UserDetailComponent
      }
    ]
  },
];
