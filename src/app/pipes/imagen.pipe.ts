import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/variables.config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, coleccion: string = 'usuario'): string {
    let url = `${URL_SERVICIOS}/imagenes`;

    // ---> En caso de no que envíen una imagen
    if (!img) {
      return url + '/usuarios/xxx';
    }

    // ---> En caso de que la imagen sea de Google
    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (coleccion) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';
        break;
    }

    return url;
  }

}
