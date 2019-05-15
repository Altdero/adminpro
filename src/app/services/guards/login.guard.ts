/**
 * Permite validar que los usuarios se hayan logeado previamente para permitir
 * el acceso a las rutas de la página
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  /**
   * Crea una instancia de LoginGuard.
   *
   * @param router - Módulo que provee la navegación entre rutas y la manipulación de la URL
   * @param _usuarioService - Servicio de usuario
   */
  constructor(
    private router: Router,
    private _usuarioService: UsuarioService
  ) {}

  /**
   * Crea la instancia de la interfaz
   *
   * @returns - True en caso de que el usuario si se encuentre logeado,
   *            false en caso contrario
   */
  canActivate(): boolean {
    if (this._usuarioService.estaLogeado()) {
      return true;
    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
