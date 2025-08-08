import { Routes } from '@angular/router';
import { PlayersPageComponent } from './players-page.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';

export const routes: Routes = [
  { path: 'players', component: PlayersPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '', redirectTo: '/players', pathMatch: 'full' },
];
