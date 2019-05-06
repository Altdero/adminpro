/**
 * Contiene las rutas secundarias de la aplicación, a las cuales sólo se tendran acceso
 * si el usuario se ha logeado previamente
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from '../services/service.index';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PagenotfoundComponent } from '../shared/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './profile/profile.component';

const routesPages: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de progreso' } },
      { path: 'graph1', component: Graph1Component, data: { titulo: 'Gráficos' } },
      { path: 'promises', component: PromisesComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Preferencias' } },
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', component: PagenotfoundComponent, data: { titulo: 'Error 404' } }
];

@NgModule({
  imports: [RouterModule.forChild(routesPages)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
