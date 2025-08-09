import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="app-title">
          <a routerLink="/">Colectiv Fotbalistic</a>
        </h1>

        <div class="nav-links">
          <a routerLink="/players" routerLinkActive="active">Players</a>
          <a routerLink="/privacy-policy" routerLinkActive="active">Privacy Policy</a>
          <a routerLink="/data-deletion" routerLinkActive="active">Data Deletion</a>

          <div *ngIf="authService.isLoggedIn()" class="user-section">
            <div class="user-info">
              <div class="user-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div class="user-details">
                <span class="user-name">{{ authService.getUserName() }}</span>
                <span class="user-provider">via {{ getProviderName() }}</span>
              </div>
            </div>
            <button class="logout-btn" (click)="logout()">Logout</button>
          </div>

          <a *ngIf="!authService.isLoggedIn()" routerLink="/login" routerLinkActive="active" class="login-link">
            Login
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      padding: 0 20px;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      height: 60px;
    }

    .app-title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }

    .app-title a {
      color: #1877f2;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .nav-links a {
      color: #65676b;
      text-decoration: none;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover,
    .nav-links a.active {
      background: #e7f3ff;
      color: #1877f2;
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f0f2f5;
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid #ddd;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      background: #1877f2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .user-details {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .user-name {
      color: #1c1e21;
      font-weight: 600;
      font-size: 14px;
    }

    .user-provider {
      color: #65676b;
      font-size: 12px;
      font-weight: 400;
    }

    .logout-btn {
      background: #42b883;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    .logout-btn:hover {
      background: #369870;
    }

    .login-link {
      background: #1877f2;
      color: white !important;
    }

    .login-link:hover {
      background: #166fe5 !important;
    }

    @media (max-width: 768px) {
      .nav-container {
        flex-direction: column;
        height: auto;
        padding: 10px 0;
      }

      .nav-links {
        flex-wrap: wrap;
        justify-content: center;
      }

      .user-details {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  getProviderName(): string {
    const user = this.authService.getUser();
    if (user?.identityProvider) {
      return user.identityProvider.charAt(0).toUpperCase() + user.identityProvider.slice(1);
    }
    return 'Unknown';
  }
}
