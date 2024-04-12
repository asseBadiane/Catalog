import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


import * as uuid from 'uuid';
import { Observable, of, throwError } from 'rxjs';

let myId = uuid.v4();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users: User[] = [];
  authenticated!: User;

  constructor() {
    this.users.push({userId: myId, username: 'admin', password: 'admin', roles: ['USER', 'ADMIN']});

    for (let i = 0; i < 5; i++) {
      this.users.push({userId: myId, username: 'user' + i, password: 'user' + i, roles: ['USER']});
    }
  }

  // function to login
  public login(username: string, password: string): Observable<User> {
    let user = this.users.find((u) => u.username === username);
    if (!user) return throwError(() => new Error('User not found'));
    if (user.password !== password) return throwError(() => new Error('Bad Credentials'));
    return of(user);
  }

  //  function to authenticate user
  public authenticatedUser(user: User): Observable<boolean> {
    this.authenticated = user;
    localStorage.setItem('authUser', JSON.stringify({
      userId: user.userId,
      username: user.username,
      roles: user.roles,
      jwtToken: 'fake-jwt-token'
    }));
    return of(true);
  }

  // function to check if user has a role 
  public hasRole(role: string): boolean {
    return this.authenticated.roles.includes(role);
  }

  // function to check if user is authenticated
  public isAuthenticated(): boolean {
    return this.authenticated != undefined;
  }
}

