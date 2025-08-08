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
            <span class="user-name">{{ authService.getUserName() }}</span>
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

    .user-name {
      color: #1c1e21;
      font-weight: 500;
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
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
