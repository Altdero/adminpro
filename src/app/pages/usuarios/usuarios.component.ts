import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { Usuario } from '../../models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  loading = false;
  usuarios: Usuario[] = [];
  desde = 0;

  totalUsuarios = 0;

  constructor(
    private _usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe((res: any) => this.cargarUsuarios());
  }

  cargarUsuarios(): void {
    this.loading = true;

    this._usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
      this.totalUsuarios = res.total;
      this.usuarios = res.usuarios;
      this.loading = false;
    });
  }

  paginacion(desde: number): void {
    const pagina = this.desde + desde;

    if (pagina < 0 || pagina >= this.totalUsuarios) {
      return;
    }

    this.desde = pagina;

    this.cargarUsuarios();
  }

  buscarUsuario(termino: string): void {
    this.loading = true;

    if (termino.length >= 1) {
      this._usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.loading = false;
      });
    } else {
      this.cargarUsuarios();
    }
  }

  borrarUsuario(usuario: Usuario): void {
    // console.log(usuario);
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('Acción prohibida', 'No te puedes borrar a tí mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de borrar a "${usuario.nombre}"`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe((res: any) => {
          this.cargarUsuarios();
        });
      }
    });
  }

  actualizarUsuario(usuario: Usuario): void {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string): void {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
