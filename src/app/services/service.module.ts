/**
 * Contiene la inyección de los servicios de la aplicación
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard, AdminGuard, UsuarioService, HospitalService, MedicoService, ArchivoService, SettingsService,
  SharedService, SidebarService } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    AdminGuard,
    UsuarioService,
    HospitalService,
    MedicoService,
    ArchivoService,
    SettingsService,
    SharedService,
    SidebarService,
    ModalUploadService
  ]
})
export class ServiceModule { }
