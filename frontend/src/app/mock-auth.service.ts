import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UserInfo {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private userSubject = new BehaviorSubject<UserInfo | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user was "logged in" in localStorage
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      this.userSubject.next(JSON.parse(mockUser));
    }
  }

  getUserInfo(): Observable<UserInfo | null> {
    const mockUser = localStorage.getItem('mockUser');
    return of(mockUser ? JSON.parse(mockUser) : null);
  }

  loginWithFacebook(): void {
    // Simulate Facebook login with a mock user
    const mockUser: UserInfo = {
      identityProvider: 'facebook',
      userId: 'mock-user-123',
      userDetails: 'John Doe',
      userRoles: ['authenticated']
    };

    // Simulate network delay
    setTimeout(() => {
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      this.userSubject.next(mockUser);
      console.log('Mock Facebook login successful!');
    }, 1000);
  }

  logout(): void {
    localStorage.removeItem('mockUser');
    this.userSubject.next(null);
    console.log('Mock logout successful!');
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
