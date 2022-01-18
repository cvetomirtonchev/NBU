import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
// import { User } from '@app/_models';

import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { Users } from 'src/app/shared/models/users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private refreshTokenTimeout;
  private tokenSubject: BehaviorSubject<any>;
  token;
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService
  ) {
    this.tokenSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
    this.token = this.tokenSubject.asObservable();
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/authenticate/login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.stopRefreshTokenTimer();
    this.router.navigate(['/account/login']);
  }

  tokenExpired() {
    const token = localStorage.getItem('token');
    if (token) {
      const expiry = JSON.parse(atob(token.split('.')[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
    return true;
  }

  startRefreshTokenTimer() {
    //private
    const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.stopRefreshTokenTimer();
    this.refreshTokenTimeout = setTimeout(() => {
      this.logout(), this.alertService.warn('La session a expiré!');
    }, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
  register(user: User): any {
    return this.http.post(`${environment.apiUrl}/authenticate/register`, user);
  }

  sendLink(email) {
    return this.http.post(
      `${environment.apiUrl}/mail/sendConfirmationEmail`,
      email
    );
  }

  getAll() {
    return this.http.get<Users[]>(`${environment.apiUrl}/users/getAll`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  forgotPassword(email: string) {
    return this.http.get<User>(`${environment.apiUrl}/forgotPassword/${email}`);
  }
  resetPassword(token, password, confirmPassword) {
    return this.http.post<User>(`${environment.apiUrl}/resetPassword`, {
      token,
      password,
      confirmPassword,
    });
  }
}
