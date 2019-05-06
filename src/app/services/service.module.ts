/**
 * Contiene la inyección de los servicios de la aplicación
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard, UsuarioService, ArchivoService, SettingsService, SharedService, SidebarService } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    UsuarioService,
    ArchivoService,
    SettingsService,
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }
