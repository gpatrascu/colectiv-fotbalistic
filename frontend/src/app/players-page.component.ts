import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayersService, Player } from './players.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-players-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent {
  groupId = '';
  players$: Observable<Player[]> | null = null;

  constructor(
    private playersService: PlayersService,
    public authService: AuthService
  ) {}

  loadPlayers() {
    if (!this.groupId) return;
    this.players$ = this.playersService.getPlayers(this.groupId);
  }

  getUserProvider(): string {
    const user = this.authService.getUser();
    return user?.identityProvider ?
      user.identityProvider.charAt(0).toUpperCase() + user.identityProvider.slice(1) :
      'Unknown';
  }

  getUserId(): string {
    const user = this.authService.getUser();
    return user?.userId || 'N/A';
  }
}
