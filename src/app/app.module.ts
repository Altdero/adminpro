import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutes } from './app.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { SettingsService } from './services/settings.service';
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  // providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
