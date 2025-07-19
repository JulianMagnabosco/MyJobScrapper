import { Routes } from '@angular/router';
import { Search } from './components/search/search';

export const routes: Routes = [
  {
    path: '',
    component: Search
  },
  {
    path: '*',
    redirectTo: ''
  }
];
