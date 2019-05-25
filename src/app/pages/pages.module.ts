import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutes } from './pages.routes';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

import { PipesModule } from '../pipes/pipes.module';

// import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  declarations: [
    // PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    IncreaserComponent,
    GraficoDonaComponent,
    PromisesComponent,
    RxjsComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsuariosComponent,
    // ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    PagesRoutes,
    FormsModule,
    SharedModule,
    ChartsModule,
    PipesModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component
  ]
})
export class PagesModule { }
