/**
 * Contiene las funciones para el login y logout de los usuarios
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ArchivoService } from '../archivo/archivo.service';

import { Usuario } from '../../models/usuario.models';

import { URL_SERVICIOS } from '../../config/variables.config';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  /**
   * Crea una instancia de UsuarioService.
   *
   * @param router - Módulo que provee la navegación entre rutas y la manipulación de la URL
   * @param httpClient - Librería para realizar peticiones HTTP (GET, PUT, POST, DELETE)
   * @param _archivoService - Servicio de archivo
   */
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private _archivoService: ArchivoService
  ) {
    this.cargarLocalStorage();
  }

  /**
   * Guarda la información del usuario en el LS
   *
   * @param id - ID del usuario
   * @param token - Tóken generado en las funciones de login
   * @param usuario - Datos del usuario logeado
   */
  guardarLocalStorage(id: string, token: string, usuario: Usuario): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  /**
   * Carga valores del tóken y del usuario desde el LS
   */
  cargarLocalStorage(): void {
    this.token = '';
    this.usuario = null;

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  /**
   * Valida si el tóken ya se encuentra inicializado
   *
   * @returns - Regresa un "true" o "false" dependiendo de si existe un tóken
   */
  estaLogeado(): boolean {
    return (this.token.length > 5) ? true : false;
  }

  /**
   * Logout y redirección a pantalla de LogIn
   */
  logout(): void {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  /**
   * Login
   *
   * @param usuario - Contiene los datos del usuario que desea ingresar
   * @param [recordar=false] - Indica si se deben recordar los datos de acceso del usuario
   * @returns - Observable de un booleano que indica si el login es válido
   */
  login(usuario: Usuario, recordar: boolean = false): Observable<boolean> {
    if (recordar) {
      localStorage.setItem('correo', usuario.email);
    } else {
      localStorage.removeItem('correo');
    }

    const url = `${URL_SERVICIOS}/login`;

    return this.httpClient.post(url, usuario).pipe(
      map((res: any) => {
        this.guardarLocalStorage(res.id, res.token, res.usuario);

        return true;
      })
    );
  }

  /**
   * Login Google
   *
   * @param token - Token generado por Google
   * @returns - Observable de un booleano que indica si el login es válido
   */
  loginGoogle(token: string): Observable<boolean> {
    const url = `${URL_SERVICIOS}/login/google`;

    return this.httpClient.post(url, { token }).pipe(
      map((res: any) => {
        this.guardarLocalStorage(res.id, res.token, res.usuario);

        return true;
      })
    );
  }

  /**
   * Envía la petición al back-end para crear un usuario con los datos de la pantalla de registro
   *
   * @param usuario - Contiene los datos del usuario que desea registrarse
   * @returns - Observable de un objeto que contiene la respuesta del back-end
   */
  crearUsuario(usuario: Usuario): Observable<object> {
    const url = `${URL_SERVICIOS}/usuario`;

    return this.httpClient.post(url, usuario).pipe(
      map((res: any) => swal.fire('Usuario creado', res.usuario.correo, 'success'))
    );
  }

  /**
   * Actualiza nombre y correo del usuario
   *
   * @param usuario - Datos del usuario a actualizar
   * @returns - Observable de un objeto que contiene la respuesta del back-end
   */
  actualizarUsuario(usuario: Usuario): Observable<boolean> {
    let url = `${URL_SERVICIOS}/usuario/${usuario._id}`;
    url += '?token=' + this.token;

    return this.httpClient.put(url, usuario).pipe(
      map((res: any) => {
        this.guardarLocalStorage(usuario._id, this.token, res.usuario);
        swal.fire('Usuario actualizado', res.usuario.nombre, 'success');

        return true;
      })
    );
  }

  actualizarFoto(archivo: File, id: string): void {
    this._archivoService.subirArchivo(archivo, 'usuarios', id).then((res: any) => {
      this.usuario.img = res.usuario.img;
      this.guardarLocalStorage(id, this.token, this.usuario);

      swal.fire('Foto actualizada', this.usuario.nombre, 'success');
    }).catch((err: any) => {
      console.log(err);
    });
  }
}
