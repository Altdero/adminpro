/**
 * Contiene las rutas principales de la aplicación
 */
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './services/service.index';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: PagenotfoundComponent, data: { titulo: 'Error 404' } }
];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: true });
