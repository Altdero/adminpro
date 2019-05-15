import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioService } from '../usuario/usuario.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Medico } from '../../models/medico.model';

import { URL_SERVICIOS } from '../../config/variables.config';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private httpClient: HttpClient,
    private _usuarioService: UsuarioService
  ) { }

  cargarMedico(idMedico: string): Observable<Medico> {
    const url = `${URL_SERVICIOS}/medico/${idMedico}`;

    return this.httpClient.get(url).pipe(
      map((res: any) => res.medico)
    );
  }

  cargarMedicos(desde: number = 0): Observable<object> {
    const url = `${URL_SERVICIOS}/medico?desde=${desde}`;

    return this.httpClient.get(url);
  }

  borrarMedico(id: string): Observable<boolean> {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;

    return this.httpClient.delete(url).pipe(
      map((res: any) => {
        Swal.fire('Médico borrado', 'Eliminado correctamente', 'success');

        return true;
      })
    );
  }

  buscarMedico(termino: string): Observable<Medico[]> {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this.httpClient.get(url).pipe(map((res: any) => res.medicos));
  }

  guardarMedico(medico: Medico): Observable<Medico> {
    let url = `${URL_SERVICIOS}/medico`;

    if (medico._id) {
      url += `/${medico._id}?token=${this._usuarioService.token}`;

      return this.httpClient.put(url, medico).pipe(
        map((res: any) => {
          Swal.fire('Médico actualizado', medico.nombre, 'success');

          return res.medico;
        })
      );
    } else {
      url += `?token=${this._usuarioService.token}`;

      return this.httpClient.post(url, medico).pipe(
        map((res: any) => {
          Swal.fire('Médico creado', medico.nombre, 'success');

          return res.medico;
        })
      );
    }
  }
}
