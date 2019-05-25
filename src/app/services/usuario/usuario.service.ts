/**
 * Contiene las funciones para el login y logout de los usuarios
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ArchivoService } from '../archivo/archivo.service';

import { Usuario } from '../../models/usuario.model';

import { URL_SERVICIOS } from '../../config/variables.config';

// ---> Dependiendo del tipo de manejo de errores que se haga, se usa "throwError" u "of"
import { Observable, /* throwError, */ of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

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
   * @param menu - Menú del usuario logeado
   */
  guardarLocalStorage(id: string, token: string, usuario: Usuario, menu: any): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  /**
   * Carga valores del tóken y del usuario desde el LS
   */
  cargarLocalStorage(): void {
    this.token = '';
    this.usuario = null;
    this.menu = [];

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
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
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

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
        this.guardarLocalStorage(res.id, res.token, res.usuario, res.menu);

        return true;
      }),
      // ---> En esta forma no importa el tipo de retorno, pero muestra en consola lo que esté dentro del "throwError"
      /* catchError(err => {
        Swal.fire('¡Lo sentimos!', err.error.mensaje, 'error');
        // return throwError(err); // Regresa todo el error completo en la consola
        return throwError(''); // Regresa un valor en blanco
      }) */
      // ---> En esta forma no se muestra todo el error en consola, PREFIERO ESTA FORMA
      catchError(err => {
        Swal.fire('¡Lo sentimos!', err.error.mensaje, 'error');
        return of(false); // Si no se especifica el tipo de retorno, puede quedar vacío
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
        this.guardarLocalStorage(res.id, res.token, res.usuario, res.menu);

        return true;
      })
    );
  }

  renuevaToken() {
    const url = `${URL_SERVICIOS}/login/renuevatoken?token=${this.token}`;

    return this.httpClient.get(url).pipe(
      map((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        console.log('Tóken renovado');

        return true;
      }),
      catchError(err => {
        Swal.fire('¡Lo sentimos!', 'No fue posible renovar el tóken', 'error');
        this.router.navigate(['/login']);

        return of(false); // Si no se especifica el tipo de retorno, puede quedar vacío
      })
    );
  }

  /**
   * Envía la petición al back-end para crear un usuario con los datos de la pantalla de registro
   *
   * @param usuario - Contiene los datos del usuario que desea registrarse
   * @returns - Observable de un objeto que contiene la respuesta del back-end
   */
  crearUsuario(usuario: Usuario): Observable<boolean> {
    const url = `${URL_SERVICIOS}/usuario`;

    return this.httpClient.post(url, usuario).pipe(
      map((res: any) => {
        Swal.fire('Usuario creado', res.usuario.correo, 'success');

        return true;
      }),
      catchError(err => {
        Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        return of(false); // Si no se especifica el tipo de retorno, puede quedar vacío
      })
    );
  }

  /**
   * Actualiza nombre y correo del usuario
   *
   * @param usuario - Datos del usuario a actualizar
   * @returns - Observable de un objeto que contiene la respuesta del back-end
   */
  actualizarUsuario(usuario: Usuario): Observable<boolean> {
    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;

    return this.httpClient.put(url, usuario).pipe(
      map((res: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarLocalStorage(usuario._id, this.token, res.usuario, this.menu);
        }

        Swal.fire('Usuario actualizado', res.usuario.nombre, 'success');

        return true;
      }),
      catchError(err => {
        Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        return of(false); // Si no se especifica el tipo de retorno, puede quedar vacío
      })
    );
  }

  actualizarFoto(archivo: File, id: string): void {
    this._archivoService.subirArchivo(archivo, 'usuarios', id).then((res: any) => {
      this.usuario.img = res.usuario.img;
      this.guardarLocalStorage(id, this.token, this.usuario, this.menu);

      Swal.fire('Foto actualizada', this.usuario.nombre, 'success');
    }).catch((err: any) => {
      console.log(err);
    });
  }

  cargarUsuarios(desde: number = 0): Observable<object> {
    const url = `${URL_SERVICIOS}/usuario?desde=${desde}`;

    return this.httpClient.get(url);
  }

  buscarUsuarios(termino: string): Observable<Usuario[]> {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;

    return this.httpClient.get(url).pipe(map((res: any) => res.usuarios));
  }

  borrarUsuario(usuarioId: string): Observable<boolean> {
    const url = `${URL_SERVICIOS}/usuario/${usuarioId}?token=${this.token}`;

    return this.httpClient.delete(url).pipe(map((res: any) => {
      Swal.fire(
        '¡Usuario borrado!',
        'El usuario se ha borrado correctamente.',
        'success'
      );

      return true;
    }));
  }
}
