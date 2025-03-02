import { CountryPageComponent } from './country/pages/country-page/country-page.component';
import { reactiveRoutes } from './reactive/country.routes';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'country',
    component: CountryPageComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/country.routes')
  },
  {
    path: '**',
    redirectTo: 'reactive'
  }
];
