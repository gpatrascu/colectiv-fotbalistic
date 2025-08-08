import { Routes } from '@angular/router';
import { PlayersPageComponent } from './players-page.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { DataDeletionComponent } from './data-deletion.component';

export const routes: Routes = [
  { path: 'players', component: PlayersPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'data-deletion', component: DataDeletionComponent },
  { path: '', redirectTo: '/players', pathMatch: 'full' },
];
