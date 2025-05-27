import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ResultsComponent } from '../results/results.component';
import { ContactComponent } from '../contact/contact.component';
import { LoginComponent } from '../login.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },

  // implementing lazy loading to routes

  {
    path: 'results',
    // component: ResultsComponent,
    loadComponent: () =>
      import('../results/results.component').then(
        (mod) => mod.ResultsComponent
      ),
  },
  {
    path: 'contact',
    // component: ContactComponent,
    loadComponent: () =>
      import('../contact/contact.component').then(
        (mod) => mod.ContactComponent
      ),
  },
  {
    path: 'recently-viewed',
    // component: RecentlyViewedComponent,
    loadComponent: () =>
      import('../recently-viewed/recently-viewed.component').then(
        (mod) => mod.RecentlyViewedComponent
      ),
  },
  {
    path: 'favorites',
    // component: FavoritesComponent,
    loadComponent: () =>
      import('../favorites/favorites.component').then(
        (mod) => mod.FavoritesComponent
      ),
  },
];
