import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.models';

import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  foto: File;
  imagenTemp: string | ArrayBuffer;

  constructor(private _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe((res: any) => {
      console.log(res);
    });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.foto = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.foto = null;
      return;
    }

    this.foto = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  actualizarFoto() {
    this._usuarioService.actualizarFoto(this.foto, this.usuario._id);
  }

}
