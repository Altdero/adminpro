import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

import { URL_SERVICIOS } from 'src/app/config/variables.config';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.activatedRoute.params.subscribe(params => {
      const termino = params.termino;

      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;

    this.httpClient.get(url).subscribe((res: any) => {
      this.usuarios = res.usuarios;
      this.medicos = res.medicos;
      this.hospitales = res.hospitales;
    });
  }

}
