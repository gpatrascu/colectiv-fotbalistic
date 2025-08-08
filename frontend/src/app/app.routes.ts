import { Routes } from '@angular/router';
import { PlayersPageComponent } from './players-page.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { DataDeletionComponent } from './data-deletion.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'players', component: PlayersPageComponent, canActivate: [AuthGuard] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'data-deletion', component: DataDeletionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
