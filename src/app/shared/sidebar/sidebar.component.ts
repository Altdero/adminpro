import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  /**
   * Crea una instancia de SidebarComponent
   *
   * @param _sidebarService - Servicio de barra lateral
   * @param _usuarioService - Servicio de usuario
   */
  constructor(
    private _sidebarService: SidebarService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
