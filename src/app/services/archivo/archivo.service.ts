/**
 * Contiene las funciones para la carga de archivos
 */

import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/variables.config';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor() { }

  subirArchivo(archivo: File, coleccion: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };

      const url = `${URL_SERVICIOS}/upload/${coleccion}/${id}`;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
