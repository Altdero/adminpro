import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this._usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenovacion(payload.exp);
  }

  expirado(fecha: number) {
    const ahora = new Date().getTime() / 1000;

    if (fecha < ahora) {
      return true;
    } else {
      return false;
    }
  }

  verificaRenovacion(fecha: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fecha * 1000);
      const ahora = new Date(); // ---> Lo ideal es traer la fecha del back-end

      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe(() => resolve(true), () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }
    });
  }

}
