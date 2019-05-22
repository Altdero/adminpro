import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  /* menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard'
        },
        {
          titulo: 'ProgressBar',
          url: '/progress'
        },
        {
          titulo: 'Promesas',
          url: '/promises'
        },
        {
          titulo: 'RxJs',
          url: '/rxjs'
        },
        {
          titulo: 'Gráficas',
          url: '/graph1'
        }
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          titulo: 'Usuarios',
          url: '/usuarios'
        },
        {
          titulo: 'Hospitales',
          url: '/hospitales'
        },
        {
          titulo: 'Médicos',
          url: '/medicos'
        }
      ]
    }
  ]; */

  constructor(private _usuarioService: UsuarioService) { }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
