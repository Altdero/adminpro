import { Component, OnInit } from '@angular/core';
import { ArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  foto: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    private _archivoService: ArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.foto = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.foto = null;
      return;
    }

    this.foto = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  ocultarModal() {
    this.foto = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal(true);
  }

  subirImagen() {
    this._archivoService.subirArchivo(this.foto, this._modalUploadService.coleccion, this._modalUploadService.id)
      .then((res: any) => {
        this._modalUploadService.notificacion.emit(res);
        this.ocultarModal();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

}
