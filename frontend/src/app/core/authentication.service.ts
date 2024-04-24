import { Injectable, afterNextRender } from '@angular/core';
import { LoggedInUser, User } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedInUser: LoggedInUser = {
    id: 0,
    username: '',
    email: '',
    isLoggedIn: false
  }

  constructor() {
    afterNextRender(() => {

      const storedData = localStorage.getItem('auth');
      if (storedData) {
        try {
          this.loggedInUser = JSON.parse(storedData);
        }
        catch (err) {

        }
      }
    });
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = {
      ...user,
      isLoggedIn: true
    }

    localStorage.setItem('auth', JSON.stringify(this.loggedInUser))
  }
}