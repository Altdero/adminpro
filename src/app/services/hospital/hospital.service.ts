import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioService } from '../usuario/usuario.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hospital } from '../../models/hospital.model';

import { URL_SERVICIOS } from '../../config/variables.config';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private httpClient: HttpClient,
    private _usuarioService: UsuarioService
  ) { }

  cargarHospitales(desde?: number): Observable<object> {
    let url = `${URL_SERVICIOS}/hospital`;
    url += (desde >= 0) ? `?desde=${desde}` : '';

    return this.httpClient.get(url);
  }

  obtenerHospital(id: string): Observable<Hospital> {
    const url = `${URL_SERVICIOS}/hospital/${id}`;

    return this.httpClient.get(url).pipe(
      map((res: any) => res.hospital)
    );
  }

  crearHospital(nombre: string): Observable<boolean> {
    const url = `${URL_SERVICIOS}/hospital?token=${this._usuarioService.token}`;

    return this.httpClient.post(url, {nombre}).pipe(
      map((res: any) => {
        Swal.fire('Hospital creado', nombre, 'success');

        return true;
      })
    );
  }

  borrarHospital(id: string): Observable<boolean> {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;

    return this.httpClient.delete(url).pipe(
      map((res: any) => {
        Swal.fire('Hospital borrado', 'Eliminado correctamente', 'success');

        return true;
      })
    );
  }

  buscarHospital(termino: string): Observable<Hospital[]> {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;

    return this.httpClient.get(url).pipe(map((res: any) => res.hospitales));
  }

  actualizarHospital(hospital: Hospital): Observable<boolean> {
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this._usuarioService.token}`;

    return this.httpClient.put(url, hospital).pipe(
      map((res: any) => {
        Swal.fire('Usuario actualizado', res.hospital.nombre, 'success');

        return true;
      })
    );
  }
}
