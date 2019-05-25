/**
 * Contiene las rutas secundarias de la aplicación, a las cuales sólo se tendran acceso
 * si el usuario se ha logeado previamente
 */
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard, VerificaTokenGuard } from '../services/service.index';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de progreso' } },
  { path: 'graph1', component: Graph1Component, data: { titulo: 'Gráficos' } },
  { path: 'promises', component: PromisesComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Preferencias' } },
  { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
  // ---> Mantenimientos
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuard],
    data: {
      titulo: 'Mantenimiento de usuarios'
    }
  },
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de un médico' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PagesRoutes = RouterModule.forChild(routes);
