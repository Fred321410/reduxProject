import { Injectable } from '@angular/core';
import { User, Authenticate } from '../model/user';
import { Observable, of  } from 'rxjs';

@Injectable()
export class AuthService {
  constructor() {}

  login({ username, password }: Authenticate): Observable<User> {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'test') {
      Observable.throw('error');
    }

    return of({ name: 'User' });
  }

  logout() {
    return of(true);
  }
}
