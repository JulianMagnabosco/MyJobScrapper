import { Routes } from '@angular/router';
import { Search } from './components/search/search';
import { Settings } from './components/settings/settings';

export const routes: Routes = [
  {
    path: '',
    component: Search
  },
  {
    path: 'settings',
    component: Settings
  },
  {
    path: '*',
    redirectTo: ''
  }
];
