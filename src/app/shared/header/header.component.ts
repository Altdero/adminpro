import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  /**
   * Crea una instancia de HeaderComponent
   *
   * @param _usuarioService - Servicio de usuario
   */
  constructor(
    public _usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }

}
