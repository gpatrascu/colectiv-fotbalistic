import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Welcome to Colectiv Fotbalistic</h1>
        <p>Please sign in with Facebook to continue</p>

        <button class="facebook-btn" (click)="loginWithFacebook()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Continue with Facebook
        </button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    h1 {
      color: #1c1e21;
      margin-bottom: 16px;
      font-size: 24px;
    }

    p {
      color: #65676b;
      margin-bottom: 32px;
      font-size: 16px;
    }

    .facebook-btn {
      background: #1877f2;
      color: white;
      border: none;
      padding: 14px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      transition: background-color 0.3s ease;
    }

    .facebook-btn:hover {
      background: #166fe5;
    }
  `]
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If user is already logged in, redirect to players page
    this.authService.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/players']);
      }
    });
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }
}
