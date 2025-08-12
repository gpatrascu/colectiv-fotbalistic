import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, catchError, switchMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

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
  private authCheckInterval: any;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.checkAuthStatus();
    this.startAuthPolling();
  }

  private startAuthPolling(): void {
    // Poll for auth status every 2 seconds when not authenticated
    // This helps catch the callback from Facebook
    this.user$.subscribe(user => {
      if (!user && !this.authCheckInterval) {
        console.log('Starting auth status polling...');
        this.authCheckInterval = setInterval(() => {
          this.checkAuthStatus();
        }, 2000);
      } else if (user && this.authCheckInterval) {
        console.log('User authenticated, stopping polling');
        clearInterval(this.authCheckInterval);
        this.authCheckInterval = null;
      }
    });
  }

  private checkAuthStatus(): void {
    this.getUserInfo().subscribe(user => {
      const currentUser = this.userSubject.value;
      if (!currentUser && user) {
        console.log('User authentication detected, redirecting to players page');
        this.userSubject.next(user);
        this.router.navigate(['/players']);
      } else if (currentUser && !user) {
        console.log('User logged out');
        this.userSubject.next(null);
      } else if (!currentUser && !user) {
        // No change, still not authenticated
      } else {
        this.userSubject.next(user);
      }
    });
  }

  getUserInfo(): Observable<UserInfo | null> {
    return this.http.get<any>('/.auth/me').pipe(
      map(response => {
        console.log('=== FACEBOOK AUTH DEBUG ===');
        console.log('Current URL:', window.location.href);
        console.log('Full auth response:', JSON.stringify(response, null, 2));
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response || {}));

        if (response && response.clientPrincipal) {
          console.log('✅ Client principal found:', JSON.stringify(response.clientPrincipal, null, 2));
          console.log('Client principal keys:', Object.keys(response.clientPrincipal));
          console.log('User details value:', response.clientPrincipal.userDetails);
          console.log('User ID value:', response.clientPrincipal.userId);
          console.log('Identity provider:', response.clientPrincipal.identityProvider);
          return response.clientPrincipal;
        } else {
          console.log('❌ No client principal found in response');
          console.log('Available response properties:', Object.keys(response || {}));
        }
        return null;
      }),
      catchError(error => {
        console.error('=== AUTH ERROR ===');
        console.error('Error details:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Current URL:', window.location.href);
        return of(null);
      })
    );
  }

  loginWithFacebook(): void {
    console.log('Initiating Facebook login...');
    const loginUrl = '/.auth/login/facebook?post_login_redirect_uri=' + encodeURIComponent(window.location.origin);
    console.log('Redirecting to:', loginUrl);
    window.location.href = loginUrl;
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
