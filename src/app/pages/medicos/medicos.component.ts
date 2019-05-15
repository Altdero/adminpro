import { Component, OnInit } from '@angular/core';

import { MedicoService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { Medico } from '../../models/medico.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  loading = false;
  totalMedicos = 0;
  medicos: Medico[] = [];
  desde = 0;

  constructor(
    private _medicoService: MedicoService,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion.subscribe((res: any) => this.cargarMedicos());
  }

  cargarMedicos(): void {
    this.loading = true;

    this._medicoService.cargarMedicos(this.desde).subscribe((res: any) => {
      this.totalMedicos = res.total;
      this.medicos = res.medicos;
      this.loading = false;
    });
  }

  paginacion(desde: number): void {
    const pagina = this.desde + desde;

    if (pagina < 0 || pagina >= this.totalMedicos) {
      return;
    }

    this.desde = pagina;

    this.cargarMedicos();
  }

  buscarMedico(termino: string): void {
    this.loading = true;

    if (termino.length >= 1) {
      this._medicoService.buscarMedico(termino).subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
        this.loading = false;
      });
    } else {
      this.cargarMedicos();
    }
  }

  borrarMedico(medico: Medico): void {
    // ---> Sweetalert2 con botones de Bootstrap
    /* const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    }); */

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de borrar "${medico.nombre}"`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._medicoService.borrarMedico(medico._id).subscribe((res: any) => {
          this.cargarMedicos();
        });
      }
    });
  }

  mostrarModal(id: string): void {
    this._modalUploadService.mostrarModal('medicos', id);
  }

}
