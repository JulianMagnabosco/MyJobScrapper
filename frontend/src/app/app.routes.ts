import { Routes } from '@angular/router';
import { Search } from './components/search/search';
import { Settings } from './components/settings/settings';

export const routes: Routes = [
  {
    path: 'home',
    component: Search
  },
  {
    path: 'settings',
    component: Settings
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}
];
