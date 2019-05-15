import { Injectable, EventEmitter } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  coleccion: string;
  id: string;

  notificacion = new EventEmitter<any>();

  constructor() {}

  ocultarModal(desdeSubir: boolean = false): void {
    this.coleccion = null;
    this.id = null;

    if (desdeSubir) {
      $('#modalImagen').modal('hide');
    }
  }

  mostrarModal(coleccion: string, id: string): void {
    this.coleccion = coleccion;
    this.id = id;

    $('#modalImagen').modal({
      backdrop: 'static',
      keyboard: false
    });
  }
}
