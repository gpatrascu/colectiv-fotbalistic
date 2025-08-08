import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface UserInfo {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserInfo | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    this.getUserInfo().subscribe(user => {
      this.userSubject.next(user);
    });
  }

  getUserInfo(): Observable<UserInfo | null> {
    return this.http.get<{ clientPrincipal: UserInfo }>('/.auth/me').pipe(
      map(response => response.clientPrincipal),
      catchError(() => of(null))
    );
  }

  loginWithFacebook(): void {
    window.location.href = '/.auth/login/facebook';
  }

  logout(): void {
    window.location.href = '/.auth/logout';
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  getUser(): UserInfo | null {
    return this.userSubject.value;
  }

  getUserName(): string {
    const user = this.userSubject.value;
    return user ? user.userDetails : '';
  }
}
