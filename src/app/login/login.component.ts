import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import Swal from 'sweetalert2'; // ---> Librería para las alertas visuales

declare function blabla(): any; // ---> Inicialización de las funciones del template de Admin Pro
declare const gapi: any; // ---> Constante para utilizar la librería de Google SignIn

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  correo: string;
  auth2: any; // The Sign-In object.

  /**
   * Crea una instancia de LoginComponent.
   *
   * @param ngZone - Servicio que permite ejecutar tareas dentro y fuera de la zona de Angular
   * @param router - Librería para navegar entre componentes
   * @param _usuarioService - Servicio de usuario
   */
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    blabla();
    this.googleInit();

    this.correo = localStorage.getItem('correo') || '';
  }

  /**
   * Realiza el ingreso del usuario
   *
   * @returns - Sin retorno
   */
  ingresar(forma: NgForm): void {
    if (forma.valid) {
      const usuario = new Usuario(
        null,
        forma.value.correo,
        forma.value.contrasena
      );

      this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(
        () => this.router.navigate(['/dashboard'])/* ,
        (err: any) => Swal.fire('¡Lo sentimos!', err.error.mensaje, 'error') */
      );
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '25060988439-g4mvssf6l35c83vgq4b50k5k8e6vflbu.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token).subscribe(
        () => this.ngZone.run(() => this.router.navigate(['/dashboard'])).then(),
        (err: any) => Swal.fire('¡Lo sentimos!', err.error.mensaje, 'error')
      );
    });
  }

}
