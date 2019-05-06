/**
 * Contiene las rutas principales de la aplicación
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

const routesRoot: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routesRoot, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
