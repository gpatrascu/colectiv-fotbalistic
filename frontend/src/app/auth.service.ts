import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export interface UserInfo {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
  // Additional optional properties that Facebook might provide
  name?: string;
  displayName?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  [key: string]: any; // Allow for any additional properties Facebook might send
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserInfo | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    this.getUserInfo().subscribe(user => {
      this.userSubject.next(user);
    });
  }

  getUserInfo(): Observable<UserInfo | null> {
    return this.http.get<any>('/.auth/me').pipe(
      map(response => {
        console.log('=== FACEBOOK AUTH DEBUG ===');
        console.log('Full auth response:', JSON.stringify(response, null, 2));
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response || {}));

        if (response.clientPrincipal) {
          console.log('Client principal found:', JSON.stringify(response.clientPrincipal, null, 2));
          console.log('Client principal keys:', Object.keys(response.clientPrincipal));
          console.log('User details value:', response.clientPrincipal.userDetails);
          console.log('User ID value:', response.clientPrincipal.userId);
          console.log('Identity provider:', response.clientPrincipal.identityProvider);
          return response.clientPrincipal;
        } else {
          console.log('No client principal found in response');
          console.log('Available response properties:', Object.keys(response || {}));
        }
        return null;
      }),
      catchError(error => {
        console.error('=== AUTH ERROR ===');
        console.error('Error details:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        return of(null);
      })
    );
  }

  loginWithFacebook(): void {
    // Create a completely new location assignment that bypasses Angular router
    const loginUrl = '/.auth/login/facebook';
    this.document.defaultView?.open(loginUrl, '_self');
  }

  logout(): void {
    // Create a completely new location assignment that bypasses Angular router
    const logoutUrl = '/.auth/logout';
    this.document.defaultView?.open(logoutUrl, '_self');
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  getUser(): UserInfo | null {
    return this.userSubject.value;
  }

  getUserName(): string {
    const user = this.userSubject.value;
    if (!user) return '';

    // Try different possible properties where the name might be stored
    return user.userDetails ||
           user.name ||
           user.displayName ||
           user.given_name ||
           user.family_name ||
           'Facebook User';
  }
}
